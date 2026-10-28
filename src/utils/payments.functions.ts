import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { type StripeEnv, createStripeClient, getStripeErrorMessage } from "@/lib/stripe.server";
import {
  getProduct,
  COLLECTION_PRICE_ID,
  resolveKitSelection,
} from "@/lib/products-catalog";
import { signDownloadToken } from "@/lib/download-token.server";
import { enqueueTransactionalEmail } from "@/lib/email/enqueue.server";

function buildDownloadUrl(priceId: string, email: string): string {
  const token = signDownloadToken({ priceId, email });
  return `/api/public/download-pdf?token=${encodeURIComponent(token)}`;
}

const FALLBACK_SITE_ORIGIN = "https://www.hp-outils.com";

// Trusted site origin from server-side env. Never derived from request
// headers (Origin/Referer can be forged by clients). If the runtime secret is
// malformed in preview, fall back to the canonical app URL instead of crashing
// checkout. Exportée pour la fonction serveur du panier (même origine de
// confiance, une seule source).
export function getTrustedSiteOrigin(): string {
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

// « Offrir » (lot 28 oct. 2026) : même règle que pour les tomes —
// courriel destinataire facultatif, validé ici, jamais de débit sans
// destinataire valide quand la case est cochée.
function validGiftEmail(giftTo: unknown): string | undefined {
  if (giftTo === undefined || giftTo === null || giftTo === "") return undefined;
  if (typeof giftTo !== "string" || giftTo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(giftTo)) {
    throw new Error("Courriel du destinataire invalide");
  }
  return giftTo.toLowerCase();
}

function resolveGiftRecipient(session: any, payerEmail: string): { deliveryEmail: string; isGift: boolean } {
  const raw = session?.metadata?.gift_to;
  if (typeof raw === "string" && raw.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) {
    const giftTo = raw.toLowerCase();
    if (giftTo !== payerEmail.toLowerCase()) {
      return { deliveryEmail: giftTo, isGift: true };
    }
  }
  return { deliveryEmail: payerEmail, isGift: false };
}

export const createPdfCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: {
    priceId: string;
    environment: StripeEnv;
    kitSlugs?: string[];
    giftTo?: string;
  }) => {
    if (!/^[a-zA-Z0-9_-]+$/.test(data.priceId)) throw new Error("Invalid priceId");
    const product = getProduct(data.priceId);
    if (!product) throw new Error("Unknown product");
    // Achat suspendu (ex. prix affiché abaissé avant que le prix Stripe
    // correspondant existe) : aucune session ne peut être créée, même
    // via une requête forgée — jamais de paiement à l'ancien prix.
    if (product.purchaseHold) throw new Error("Achat suspendu pour ce produit");
    if (data.kitSlugs !== undefined) {
      // La sélection de kits n'a de sens que pour le bundle, et elle doit
      // être complète et valide (exactement 10 kits Sans Honte, uniques).
      if (data.priceId !== COLLECTION_PRICE_ID) {
        throw new Error("Sélection de kits invalide");
      }
      if (!resolveKitSelection(data.kitSlugs)) {
        throw new Error("Sélection de kits invalide");
      }
    }
    return { ...data, giftTo: validGiftEmail(data.giftTo) };
  })
  .handler(async ({ data }) => {
    try {
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
        // « Offrir » : le destinataire voyage dans la métadonnée, jamais
        // dans un montant. La livraison (page de retour + webhook) le relit.
        metadata: {
          priceId: data.priceId,
          ...(data.kitSlugs ? { kitSlugs: data.kitSlugs.join(",") } : {}),
          ...(data.giftTo ? { gift_to: data.giftTo } : {}),
        },
      });

      return { clientSecret: session.client_secret ?? "" };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
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

    // Escape LIKE metacharacters to prevent wildcard matching via user input.
    const escapedEmail = data.email.replace(/([\\%_])/g, "\\$1");
    const { data: orders, error } = await admin
      .from("orders")
      .select("id, price_id, pdf_path, created_at, status")
      .ilike("customer_email", escapedEmail)
      .eq("status", "paid")
      .eq("environment", data.environment)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("recover lookup error", error);
      // Stay neutral on errors.
      return { ok: true as const };
    }

    // « Offrir » : le destinataire peut aussi récupérer son cadeau avec
    // son propre courriel (migration 20261028_gift_recipient_email.sql).
    // Best-effort : si la colonne n'existe pas encore, on ignore l'erreur
    // et on continue — la récupération du payeur reste inchangée.
    const seenIds = new Set((orders ?? []).map((o) => o.id as string));
    const { data: giftOrders, error: giftErr } = await admin
      .from("orders")
      .select("id, price_id, pdf_path, created_at, status")
      .ilike("gift_recipient_email", escapedEmail)
      .eq("status", "paid")
      .eq("environment", data.environment)
      .order("created_at", { ascending: false });
    if (!giftErr && giftOrders && Array.isArray(orders)) {
      for (const o of giftOrders as typeof orders) {
        if (o && !seenIds.has(o.id as string)) {
          seenIds.add(o.id as string);
          (orders as unknown[]).push(o);
        }
      }
    }

    // Choix de kits des commandes bundle, relus en best-effort (colonne
    // kit_slugs ajoutée par migration ; si elle n'existe pas encore, la
    // requête échoue et on retombe sur le lien de la collection).
    const kitSlugsByOrder = new Map<string, string[]>();
    const orderIds = (orders ?? []).map((o) => o.id as string);
    if (orderIds.length > 0) {
      const { data: ksRows, error: ksErr } = await admin
        .from("orders")
        .select("id, kit_slugs")
        .in("id", orderIds);
      if (!ksErr && ksRows) {
        for (const row of ksRows as Array<{
          id: string;
          kit_slugs?: string | null;
        }>) {
          if (typeof row.kit_slugs === "string" && row.kit_slugs) {
            kitSlugsByOrder.set(
              row.id,
              row.kit_slugs.split(",").filter(Boolean),
            );
          }
        }
      }
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
      const slugs = kitSlugsByOrder.get(o.id as string);
      const kits =
        o.price_id === COLLECTION_PRICE_ID && slugs
          ? resolveKitSelection(slugs)
          : null;
      if (kits) {
        for (const kp of kits) {
          items.push({
            orderId: o.id as string,
            title: kp.title,
            downloadUrl: buildDownloadUrl(kp.priceId, data.email),
            purchasedAt: o.created_at as string,
          });
        }
      } else {
        items.push({
          orderId: o.id as string,
          title: product.title,
          downloadUrl: buildDownloadUrl(o.price_id, data.email),
          purchasedAt: o.created_at as string,
        });
      }
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