import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { type StripeEnv, createStripeClient } from "@/lib/stripe.server";
import { getProduct } from "@/lib/products-catalog";
import { signDownloadToken } from "@/lib/download-token.server";
import { enqueueTransactionalEmail } from "@/lib/email/enqueue.server";

function buildDownloadUrl(priceId: string, email: string): string {
  const token = signDownloadToken({ priceId, email });
  return `/api/public/download-pdf?token=${encodeURIComponent(token)}`;
}

const FALLBACK_SITE_ORIGIN = "https://hp-outils.com";

// Trusted site origin from server-side env. Never derived from request
// headers (Origin/Referer can be forged by clients). If the runtime secret is
// malformed in preview, fall back to the canonical app URL instead of crashing
// checkout.
function getTrustedSiteOrigin(): string {
  const raw = process.env.SITE_URL?.trim();
  if (!raw) return FALLBACK_SITE_ORIGIN;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      return parsed.origin;
    }
  } catch {
    console.warn("SITE_URL is invalid; using fallback site origin");
  }
  return FALLBACK_SITE_ORIGIN;
}

let _admin: any = null;
function getAdmin() {
  if (!_admin) {
    _admin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }
  return _admin;
}

export const createPdfCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: {
    priceId: string;
    environment: StripeEnv;
  }) => {
    if (!/^[a-zA-Z0-9_-]+$/.test(data.priceId)) throw new Error("Invalid priceId");
    if (!getProduct(data.priceId)) throw new Error("Unknown product");
    return data;
  })
  .handler(async ({ data }) => {
    const stripe = createStripeClient(data.environment);

    const prices = await stripe.prices.list({ lookup_keys: [data.priceId] });
    if (!prices.data.length) throw new Error("Price not found");
    const stripePrice = prices.data[0];

    // Build return_url from a trusted server-side SITE_URL secret so it
    // cannot be redirected to an attacker-controlled domain via a forged
    // Origin/Referer header.
    const returnUrl = `${getTrustedSiteOrigin()}/checkout/return?session_id={CHECKOUT_SESSION_ID}`;

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: stripePrice.id, quantity: 1 }],
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: returnUrl,
      // Stripe Tax calcule TPS/TVQ à partir de l'adresse de facturation.
      // Tous les produits doivent avoir un tax_code (txcd_10000000 — biens
      // numériques) — voir scripts/setup-tax-codes.functions.ts.
      automatic_tax: { enabled: true },
      billing_address_collection: "required",
      metadata: { priceId: data.priceId },
    });

    return session.client_secret;
  });

export const fulfillPdfOrder = createServerFn({ method: "POST" })
  .inputValidator((data: { sessionId: string; environment: StripeEnv }) => {
    if (!/^cs_[a-zA-Z0-9_]+$/.test(data.sessionId)) throw new Error("Invalid sessionId");
    return data;
  })
  .handler(async ({ data }) => {
    const stripe = createStripeClient(data.environment);
    const session = await stripe.checkout.sessions.retrieve(data.sessionId, {
      expand: ["line_items", "line_items.data.price"],
    });

    if (session.payment_status !== "paid") {
      return { status: "pending" as const };
    }

    const email =
      session.customer_details?.email ||
      (session.customer_email as string | null) ||
      "";
    const lineItem = session.line_items?.data?.[0];
    const price = lineItem?.price;
    const priceId =
      (price?.lookup_key as string | null) ||
      (price?.metadata?.lovable_external_id as string | undefined) ||
      (price?.id ?? "unknown");
    const productId =
      typeof price?.product === "string" ? price.product : (price?.product as any)?.id ?? "unknown";

    const product = getProduct(priceId);
    const pdfPath = product?.pdfPath ?? null;

    const admin = getAdmin();

    // Upsert order (idempotent)
    const { error: upsertErr } = await admin.from("orders").upsert(
      {
        stripe_session_id: session.id,
        stripe_payment_intent_id:
          typeof session.payment_intent === "string" ? session.payment_intent : null,
        customer_email: email,
        product_id: productId,
        price_id: priceId,
        amount_total: session.amount_total ?? 0,
        currency: session.currency ?? "cad",
        status: "paid",
        pdf_path: pdfPath,
        environment: data.environment,
      },
      { onConflict: "stripe_session_id" },
    );
    if (upsertErr) {
      console.error("orders upsert failed", upsertErr);
      throw new Error("Database error");
    }

    if (!product) {
      return {
        status: "paid" as const,
        email,
        message:
          "Votre paiement est confirmé. Le fichier sera disponible sous peu — nous vous contacterons.",
      };
    }

    return {
      status: "paid" as const,
      email,
      message: null as string | null,
    };
  });

// Récupération de commandes par courriel (page /recuperer-achat).
// Retourne la liste des achats payés et un lien signé frais pour chacun.
export const recoverOrdersByEmail = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; environment: StripeEnv }) => {
    const email = data.email?.trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Courriel invalide");
    }
    if (email.length > 254) throw new Error("Courriel invalide");
    return { email, environment: data.environment };
  })
  .handler(async ({ data }) => {
    const admin = getAdmin();

    // Rate-limit: 5 attempts/hour per email or per IP.
    const ip =
      getRequestHeader("cf-connecting-ip") ||
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
      null;
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: emailCount } = await admin
      .from("recovery_attempts")
      .select("id", { count: "exact", head: true })
      .eq("email", data.email)
      .gte("created_at", oneHourAgo);
    const { count: ipCount } = ip
      ? await admin
          .from("recovery_attempts")
          .select("id", { count: "exact", head: true })
          .eq("ip", ip)
          .gte("created_at", oneHourAgo)
      : { count: 0 };
    if ((emailCount ?? 0) >= 5 || (ipCount ?? 0) >= 5) {
      // Neutral response — don't reveal rate-limit state.
      return { ok: true as const };
    }
    await admin.from("recovery_attempts").insert({ email: data.email, ip });

    // Trusted site origin for absolute download links in the recovery email.
    const siteOrigin = getTrustedSiteOrigin();

    const { data: orders, error } = await admin
      .from("orders")
      .select("id, price_id, pdf_path, created_at, status")
      .ilike("customer_email", data.email)
      .eq("status", "paid")
      .eq("environment", data.environment)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("recover lookup error", error);
      // Stay neutral on errors.
      return { ok: true as const };
    }

    const items: Array<{
      orderId: string;
      title: string;
      downloadUrl: string | null;
      purchasedAt: string;
    }> = [];

    for (const o of orders ?? []) {
      const product = getProduct(o.price_id);
      if (!product || !o.pdf_path) continue;
      items.push({
        orderId: o.id as string,
        title: product.title,
        downloadUrl: buildDownloadUrl(o.price_id, data.email),
        purchasedAt: o.created_at as string,
      });
    }

    // Only send an email if we actually found purchases. The page always
    // shows the same neutral message regardless, so an attacker can't
    // distinguish hits from misses by the response.
    if (items.length > 0) {
      await enqueueTransactionalEmail({
        templateName: "purchase-recovery",
        recipientEmail: data.email,
        idempotencyKey: `recover-${data.email}-${Date.now()}`,
        templateData: { items, siteOrigin },
      });
    }

    return { ok: true as const };
  });