import { createServerFn } from "@tanstack/react-start";
import {
  type StripeEnv,
  createStripeClient,
  getStripeErrorMessage,
} from "@/lib/stripe.server";
import { getTrustedSiteOrigin } from "@/utils/payments.functions";
import { validateCartItems } from "@/lib/panier-validation";

// Panier d'achat — session Stripe multi-produits, même motif que
// createPdfCheckoutSession (fonctions serveur TanStack Start, déployées avec
// l'application par la publication Lovable). Les prix sont résolus côté
// serveur par lookup_key ; jamais un montant venu du client.
//
// Attention Stripe : prices.list n'accepte que 10 lookup_keys par appel.
// Le panier peut en contenir 20 : on résout par lots de 10.
async function resolvePriceIds(
  stripe: ReturnType<typeof createStripeClient>,
  priceIds: string[],
): Promise<Array<{ id: string; lookup_key: string | null }>> {
  const resolved: Array<{ id: string; lookup_key: string | null }> = [];
  for (let i = 0; i < priceIds.length; i += 10) {
    const page = await stripe.prices.list({
      lookup_keys: priceIds.slice(i, i + 10),
    });
    for (const p of page.data) resolved.push({ id: p.id, lookup_key: p.lookup_key });
  }
  return resolved;
}

// « Offrir » — support serveur préparé pour le panier (phase 2 : l'interface
// panier n'est pas dans ce lot, voir rapport). Même validation que les
// autres flux : destinataire facultatif, validé, jamais de débit sans
// destinataire valide quand la case sera cochée.
export const createCartCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      items: Array<{ priceId: string; quantity?: number }>;
      environment: StripeEnv;
      giftTo?: string;
    }) => {
      if (!Array.isArray(data.items)) throw new Error("Panier invalide");
      // La quantité du client est ignorée : un PDF = un exemplaire.
      const priceIds = validateCartItems(data.items.map((i) => i?.priceId));
      if (data.environment !== "sandbox" && data.environment !== "live") {
        throw new Error("Environnement invalide");
      }
      let giftTo: string | undefined;
      if (data.giftTo !== undefined && data.giftTo !== null && data.giftTo !== "") {
        if (typeof data.giftTo !== "string" || data.giftTo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.giftTo)) {
          throw new Error("Courriel du destinataire invalide");
        }
        giftTo = data.giftTo.toLowerCase();
      }
      return { priceIds, environment: data.environment, giftTo };
    },
  )
  .handler(async ({ data }) => {
    try {
      const stripe = createStripeClient(data.environment);
      const resolved = await resolvePriceIds(stripe, data.priceIds);
      if (resolved.length !== data.priceIds.length) {
        throw new Error("Un prix du panier est introuvable");
      }
      const byKey = new Map(
        resolved.map((p) => [p.lookup_key, p.id] as const),
      );
      const line_items = data.priceIds.map((key) => {
        const id = byKey.get(key);
        if (!id) throw new Error("Prix introuvable pour un article du panier");
        return { price: id, quantity: 1 };
      });

      const origin = getTrustedSiteOrigin();
      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        allow_promotion_codes: true,
        // Page Stripe hébergée en v1 : plus simple que l'Embedded
        // multi-produits. Valeur SDK : "hosted_page" (pas "hosted").
        // La page de retour existante (/checkout/return) est réutilisée,
        // avec session_id en paramètre.
        ui_mode: "hosted_page",
        success_url: `${origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/panier/`,
        // Même réglage que le flux mono-produit (Stripe Tax à partir de
        // l'adresse de facturation ; tax_code txcd_10000000).
        automatic_tax: { enabled: true },
        billing_address_collection: "required",
        metadata: data.giftTo
          ? { cart: "1", priceIds: data.priceIds.join(","), gift_to: data.giftTo }
          : { cart: "1", priceIds: data.priceIds.join(",") },
      });

      return { checkoutUrl: session.url ?? "" };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });
