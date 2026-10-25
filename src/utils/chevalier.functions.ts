// Fonctions serveur « Boutique Chevalier » — même motif que le panier v1
// et le flux PDF : fonctions serveur TanStack Start, prix résolus côté
// serveur par lookup_key, jamais un montant venu du client.
//
// La caisse est la page Stripe hébergée (hosted_page), comme le panier
// et les tomes : pas de carte saisie sur le site. La livraison ne passe
// par aucun suivi manuel : après paiement, la page de retour
// (/boutique-chevalier?session_id=…) vérifie la session côté serveur
// (payée + metadata chevalier) puis crédite la sauvegarde locale du jeu,
// sur le même appareil et le même navigateur que le jeu.
//
// PORTE FERMÉE : tant que CHEVALIER_VENTE_ACTIVE est false, la création
// de session est rejetée ici même — un appel forgé ne peut pas ouvrir
// un paiement. La vérification, elle, reste active : elle ne sert qu'à
// livrer une session déjà payée, jamais à vendre.

import { createServerFn } from "@tanstack/react-start";
import {
  type StripeEnv,
  createStripeClient,
  getStripeErrorMessage,
} from "@/lib/stripe.server";
import { getTrustedSiteOrigin } from "@/utils/payments.functions";
import {
  CHEVALIER_VENTE_ACTIVE,
  getChevalierPack,
  isValidChevalierSessionId,
} from "@/lib/chevalier-boutique";

export const createChevalierCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: { packId: string; environment: StripeEnv }) => {
    const pack = getChevalierPack(data.packId);
    if (!pack) throw new Error("Paquet Chevalier introuvable");
    if (data.environment !== "sandbox" && data.environment !== "live") {
      throw new Error("Environnement invalide");
    }
    if (!CHEVALIER_VENTE_ACTIVE) {
      throw new Error(
        "Boutique Chevalier en préparation : aucun paiement n'est pris pour l'instant.",
      );
    }
    return { pack, environment: data.environment };
  })
  .handler(async ({ data }) => {
    try {
      const stripe = createStripeClient(data.environment);
      const prices = await stripe.prices.list({
        lookup_keys: [data.pack.lookupKey],
      });
      if (!prices.data.length) {
        throw new Error("Prix introuvable pour ce paquet");
      }
      const origin = getTrustedSiteOrigin();
      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: prices.data[0].id, quantity: 1 }],
        mode: "payment",
        ui_mode: "hosted_page",
        success_url: `${origin}/boutique-chevalier?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/boutique-chevalier`,
        automatic_tax: { enabled: true },
        billing_address_collection: "required",
        metadata: { chevalier: "1", pack: data.pack.id },
      });
      return { checkoutUrl: session.url ?? "" };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });

export const verifierSessionChevalier = createServerFn({ method: "POST" })
  .inputValidator((data: { sessionId: string }) => {
    if (!isValidChevalierSessionId(data.sessionId)) {
      throw new Error("Identifiant de session invalide");
    }
    return data;
  })
  .handler(async ({ data }) => {
    // Le préfixe de l'ID de session est la source de vérité (comme les
    // flux PDF et tomes) : `cs_test_*` = sandbox, sinon live.
    const env: StripeEnv = data.sessionId.startsWith("cs_test_")
      ? "sandbox"
      : "live";
    const stripe = createStripeClient(env);
    const session = await stripe.checkout.sessions.retrieve(data.sessionId);
    if (session.payment_status !== "paid") {
      return { status: "pending" as const };
    }
    if (session.metadata?.chevalier !== "1") {
      throw new Error("Session invalide pour la boutique Chevalier");
    }
    const pack = getChevalierPack(session.metadata?.pack);
    if (!pack) {
      throw new Error("Session invalide pour la boutique Chevalier");
    }
    return { status: "paid" as const, packId: pack.id, sessionId: data.sessionId };
  });
