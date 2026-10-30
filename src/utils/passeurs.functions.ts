// Fonctions serveur « Les Passeurs » — abonnement automatisé
// (décision HP MEL-017, 30 oct. 2026 : checkout automatisé d'abord,
// puis bouton d'annulation en 1 clic).
//
// Même motif que payments.functions.ts et tomes.functions.ts :
// fonctions serveur TanStack Start, prix résolus côté serveur par
// lookup_key, jamais un montant venu du client.
//
// IMPORTANT : le checkout Passeurs n'est branché à AUCUNE page tant que
// le TEST à 0 $ n'est pas fait et validé par HP. L'inscription reste
// manuelle par courriel jusqu'au go d'activation.

import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import {
  type StripeEnv,
  createStripeClient,
  getStripeErrorMessage,
} from "@/lib/stripe.server";

const FALLBACK_SITE_ORIGIN = "https://www.hp-outils.com";

export function getPasseursSiteOrigin(): string {
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

// lookup_key Stripe LIVE (vérifiés le 29 oct. 2026) :
// 3,00 $/mois récurrent, 28,00 $/an récurrent. Aucune taxe ajoutée
// (petit fournisseur — Stripe Tax calcule 0,00 $ sur ce compte).
const PASSEURS_PRICES = {
  mensuel: "passeurs_mensuel_3",
  annuel: "passeurs_annuel_28",
} as const;

export type PasseursFormule = keyof typeof PASSEURS_PRICES;

// ---------------------------------------------------------------------------
// 1) Création de la session de caisse (mode abonnement, paiement intégré)
// ---------------------------------------------------------------------------
export const createPasseursCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: { formule: string; environment: StripeEnv }) => {
    if (data.formule !== "mensuel" && data.formule !== "annuel") {
      throw new Error("Formule invalide");
    }
    if (data.environment !== "sandbox" && data.environment !== "live") {
      throw new Error("Environnement invalide");
    }
    return { formule: data.formule as PasseursFormule, environment: data.environment };
  })
  .handler(async ({ data }) => {
    try {
      const stripe = createStripeClient(data.environment);

      const lookupKey = PASSEURS_PRICES[data.formule];
      const prices = await stripe.prices.list({ lookup_keys: [lookupKey] });
      if (!prices.data.length) throw new Error("Price not found");
      const stripePrice = prices.data[0];

      const returnUrl = `${getPasseursSiteOrigin()}/passeurs/merci?session_id={CHECKOUT_SESSION_ID}`;

      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: stripePrice.id, quantity: 1 }],
        mode: "subscription",
        allow_promotion_codes: true,
        ui_mode: "embedded_page",
        return_url: returnUrl,
        // Petit fournisseur : aucune taxe perçue (Stripe Tax calcule 0,00 $).
        automatic_tax: { enabled: true },
        // [MEL-002 29 oct 2026] « auto » : Stripe n'exige l'adresse que si
        // le paiement l'exige vraiment.
        billing_address_collection: "auto",
        // La formule voyage dans la métadonnée : le webhook s'en sert pour
        // créer la ligne passeurs_abonnements. Jamais un montant.
        metadata: {
          passeurs_formule: data.formule,
        },
        subscription_data: {
          metadata: {
            passeurs_formule: data.formule,
          },
        },
      });

      return { clientSecret: session.client_secret ?? "" };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });

// ---------------------------------------------------------------------------
// 2) Lecture publique d'un abonnement par son jeton (page d'annulation)
//    Ne retourne JAMAIS le jeton lui-même, ni l'ID Stripe.
// ---------------------------------------------------------------------------
export const getPasseursSubscriptionByJeton = createServerFn({ method: "POST" })
  .inputValidator((data: { jeton: string }) => {
    const jeton = data.jeton?.trim() ?? "";
    if (!/^[a-f0-9]{64}$/.test(jeton)) throw new Error("Lien invalide");
    return { jeton };
  })
  .handler(async ({ data }) => {
    const db = getAdmin();
    const { data: row, error } = await db
      .from("passeurs_abonnements")
      .select("formule, date_fin_periode, statut")
      .eq("jeton_annulation", data.jeton)
      .maybeSingle();
    // Réponse neutre dans tous les cas : on ne révèle pas si un jeton
    // existe ou non.
    if (error || !row) return { found: false as const };
    return {
      found: true as const,
      formule: row.formule as PasseursFormule,
      dateFinPeriode: row.date_fin_periode as string,
      statut: row.statut as "actif" | "annule",
    };
  });

// ---------------------------------------------------------------------------
// 3) Annulation en 1 clic : effet à la fin de la période déjà payée.
//    - statut = 'annule', annule_le = maintenant
//    - abonnement Stripe annulé avec cancel_at_period_end = true
//      (l'accès continue jusqu'à la fin de la période payée, puis s'arrête,
//      sans frais, sans relance)
//    - confirmation immédiate retournée à la page
// ---------------------------------------------------------------------------
export const cancelPasseursSubscription = createServerFn({ method: "POST" })
  .inputValidator((data: { jeton: string; environment: StripeEnv }) => {
    const jeton = data.jeton?.trim() ?? "";
    if (!/^[a-f0-9]{64}$/.test(jeton)) throw new Error("Lien invalide");
    if (data.environment !== "sandbox" && data.environment !== "live") {
      throw new Error("Environnement invalide");
    }
    return { jeton, environment: data.environment };
  })
  .handler(async ({ data }) => {
    const db = getAdmin();

    // 1) Retrouver l'abonnement par son jeton. Réponse neutre si inconnu.
    const { data: row, error } = await db
      .from("passeurs_abonnements")
      .select("id, formule, date_fin_periode, statut, stripe_subscription_id")
      .eq("jeton_annulation", data.jeton)
      .maybeSingle();
    if (error || !row) {
      return { ok: false as const, reason: "not_found" as const };
    }
    if (row.statut === "annule") {
      // Déjà annulé : on confirme sans rien changer (idempotent).
      return {
        ok: true as const,
        alreadyCancelled: true as const,
        formule: row.formule as PasseursFormule,
        dateFinPeriode: row.date_fin_periode as string,
      };
    }

    // 2) Annuler côté Stripe à la fin de la période (jamais immédiatement).
    // Le jeton n'est JAMAIS journalisé.
    const stripe = createStripeClient(data.environment);
    try {
      await stripe.subscriptions.update(row.stripe_subscription_id, {
        cancel_at_period_end: true,
      });
    } catch (e) {
      console.error("cancelPasseursSubscription: Stripe cancel failed", {
        subscriptionPresent: !!row.stripe_subscription_id,
      });
      return { ok: false as const, reason: "stripe_error" as const };
    }

    // 3) Marquer annulé en base.
    const nowIso = new Date().toISOString();
    const { error: updateError } = await db
      .from("passeurs_abonnements")
      .update({ statut: "annule", annule_le: nowIso, updated_at: nowIso })
      .eq("id", row.id)
      .eq("statut", "actif"); // garde anti-double-clic
    if (updateError) {
      console.error("cancelPasseursSubscription: db update failed");
      return { ok: false as const, reason: "db_error" as const };
    }

    return {
      ok: true as const,
      alreadyCancelled: false as const,
      formule: row.formule as PasseursFormule,
      dateFinPeriode: row.date_fin_periode as string,
    };
  });
