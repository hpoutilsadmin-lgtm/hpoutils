import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { type StripeEnv, createStripeClient } from "@/lib/stripe.server";
import { getProduct } from "@/lib/products-catalog";

const PDF_BUCKET = "pdfs";
const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 jours

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
    returnUrl: string;
    environment: StripeEnv;
  }) => {
    if (!/^[a-zA-Z0-9_-]+$/.test(data.priceId)) throw new Error("Invalid priceId");
    if (!data.returnUrl.startsWith("http")) throw new Error("Invalid returnUrl");
    if (!getProduct(data.priceId)) throw new Error("Unknown product");
    return data;
  })
  .handler(async ({ data }) => {
    const stripe = createStripeClient(data.environment);

    const prices = await stripe.prices.list({ lookup_keys: [data.priceId] });
    if (!prices.data.length) throw new Error("Price not found");
    const stripePrice = prices.data[0];

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: stripePrice.id, quantity: 1 }],
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: data.returnUrl,
      // automatic_tax requires a head office address on the Stripe account.
      // The Lovable-managed sandbox account does not have one configured,
      // which causes checkout sessions to fail. Disabled for now; the 25 $ CAD
      // is treated as tax-inclusive until Stripe Tax is properly set up.
      automatic_tax: { enabled: false },
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
        downloadUrl: null as string | null,
        message:
          "Votre paiement est confirmé. Le fichier sera disponible sous peu — nous vous contacterons.",
      };
    }

    // Générer le lien signé
    const { data: signed, error: signErr } = await admin.storage
      .from(PDF_BUCKET)
      .createSignedUrl(product.pdfPath, SIGNED_URL_TTL_SECONDS, {
        download: product.downloadFileName,
      });

    if (signErr || !signed) {
      console.error("signed url error", signErr);
      return {
        status: "paid" as const,
        email,
        downloadUrl: null as string | null,
        message:
          "Votre paiement est confirmé. Le PDF sera disponible sous peu — Hélène vous l'enverra par courriel.",
      };
    }

    return {
      status: "paid" as const,
      email,
      downloadUrl: signed.signedUrl,
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
    const { data: orders, error } = await admin
      .from("orders")
      .select("id, price_id, pdf_path, created_at, status")
      .ilike("customer_email", data.email)
      .eq("status", "paid")
      .eq("environment", data.environment)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("recover lookup error", error);
      throw new Error("Erreur lors de la recherche");
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
      const { data: signed } = await admin.storage
        .from(PDF_BUCKET)
        .createSignedUrl(product.pdfPath, SIGNED_URL_TTL_SECONDS, {
          download: product.downloadFileName,
        });
      items.push({
        orderId: o.id as string,
        title: product.title,
        downloadUrl: signed?.signedUrl ?? null,
        purchasedAt: o.created_at as string,
      });
    }

    return { items };
  });