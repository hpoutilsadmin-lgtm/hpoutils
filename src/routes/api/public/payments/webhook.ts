import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { type StripeEnv, verifyWebhook, createStripeClient } from "@/lib/stripe.server";
import { deliverStripeSession } from "@/lib/deliver-order.server";
import {
  isPasseursSession,
  fulfillPasseursSubscription,
} from "@/lib/passeurs.server";
import {
  revokeTomeTokensForPaymentIntent,
  revokeTomeTokensForSessions,
} from "@/lib/tomes-tokens.server";

let _supabase: any = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }
  return _supabase;
}

async function handleCheckoutCompleted(rawSession: any, env: StripeEnv) {
  // Sécurité phase 2 : le webhook vérifié est la SEULE source de
  // livraison. Il récupère la session étendue (line_items) puis délègue
  // au module serveur unique. Jamais de livraison d'une page de retour.
  const stripe = createStripeClient(env);
  const session = await stripe.checkout.sessions.retrieve(rawSession.id, {
    expand: ["line_items", "line_items.data.price"],
  });
  if (session.payment_status !== "paid") return; // jamais livrer un impayé
  // Les Passeurs (décision HP MEL-017, 30 oct. 2026) : la session porte la
  // métadonnée passeurs_formule. On crée l'abonnement + le jeton
  // d'annulation, puis on sort — pas de livraison PDF/tome.
  if (isPasseursSession(session)) {
    await fulfillPasseursSubscription(session, env); // lève sur erreur base -> 400 -> Stripe rejoue
    return;
  }
  await deliverStripeSession(session, env); // lève sur erreur base -> 400 -> Stripe rejoue
}

// charge.refunded / charge.refund.updated : marque la commande comme
// remboursée. /api/public/download-pdf vérifie ce statut et bloque le
// téléchargement quand status='refunded'.
//
// RÉVOCATION INDÉPENDANTE DE LA TABLE orders (bug remboursement, oct. 2026) :
// si la commande n'a jamais été enregistrée, la recherche par
// payment_intent dans orders ne trouve aucune session et l'ancienne
// révocation s'arrêtait là — le lien de lecture restait vivant.
// On passe donc par Stripe lui-même (sessions de caisse du payment_intent)
// quand orders ne donne rien : un remboursement coupe le lien même
// sans ligne orders. Rien ici n'est silencieux : chaque issue est
// journalisée (révoqués par orders, révoqués par repli Stripe, ou rien
// à révoquer).
async function handleChargeRefunded(charge: any, env: StripeEnv) {
  const paymentIntentId =
    typeof charge.payment_intent === "string" ? charge.payment_intent : null;
  if (!paymentIntentId) {
    // Abandon visible : sans payment_intent, ni la commande ni les liens
    // ne peuvent être retrouvés. Le 200 est conservé (rejouer ne
    // réparerait rien), mais l'événement est journalisé en erreur pour
    // qu'un suivi manuel soit possible — jamais silencieux.
    console.error("charge refunded without payment_intent; nothing revoked, manual follow-up required", {
      chargeId: charge.id ?? null,
    });
    return;
  }
  // Un remboursement annulé ou refusé ne rembourse rien : amount_refunded
  // à 0 ne doit ni marquer la commande comme remboursée ni révoquer un
  // lien. Seul un montant réellement remboursé (> 0) agit ici. Le cas
  // partiel (0 < remboursé < total) garde le comportement actuel —
  // commande marquée remboursée, liens révoqués — tant que la direction
  // n'a pas tranché le partiel (voir commentaire d'origine ci-dessous).
  if (typeof charge.amount_refunded !== "number" || charge.amount_refunded <= 0) {
    console.log("charge refund update with nothing refunded; nothing revoked", {
      chargeId: charge.id ?? null,
      amount_refunded: charge.amount_refunded ?? null,
    });
    return;
  }
  // Journalisation du remboursement partiel, sans changer le comportement
  // (révocation maintenue) tant qu'HP n'a pas tranché le partiel.
  console.log("charge refunded", {
    chargeId: charge.id,
    amount: charge.amount,
    amount_refunded: charge.amount_refunded,
    partial: charge.amount_refunded < charge.amount,
  });
  const { error: refundUpdateError } = await getSupabase()
    .from("orders")
    .update({
      status: "refunded",
      refunded_at: new Date().toISOString(),
    })
    .eq("stripe_payment_intent_id", paymentIntentId)
    .eq("environment", env);
  if (refundUpdateError) {
    console.error("orders refund update failed", refundUpdateError);
    throw new Error("Database error");
  }
  // Un remboursement révoque aussi les liens de lecture des tomes.
  const revokedFromOrders = await revokeTomeTokensForPaymentIntent(
    paymentIntentId,
    env,
  );
  console.log(
    `charge refunded: revoked ${revokedFromOrders} tome tokens via orders for payment_intent ${paymentIntentId}`,
  );
  // Lot 3L (F-W2) : le repli s'exécute TOUJOURS, même si la voie orders
  // a déjà révoqué au moins un jeton. Avant, le retour anticipé ci-dessus
  // laissait vivant tout jeton d'une session absente de orders.
  // La révocation est idempotente (revoked_at IS NULL) : un jeton déjà
  // révoqué par orders n'est pas compté deux fois.
  // Lot 3L (F-W1) : la liste Stripe est paginée (100 par page, 100 pages
  // maximum en garde-fou), au lieu d'un seul appel plafonné à 10 sessions.
  const stripe = createStripeClient(env);
  const sessionIds: string[] = [];
  let startingAfter: string | undefined;
  for (let page = 0; page < 100; page++) {
    const pageResult = await stripe.checkout.sessions.list({
      payment_intent: paymentIntentId,
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });
    for (const s of pageResult.data) sessionIds.push(s.id);
    if (!pageResult.has_more || pageResult.data.length === 0) break;
    startingAfter = pageResult.data[pageResult.data.length - 1].id;
  }
  if (sessionIds.length === 0) {
    console.error(
      `charge refunded: no Stripe checkout session for payment_intent ${paymentIntentId}; nothing to revoke via fallback, manual follow-up required`,
    );
    return;
  }
  const revokedFromStripe = await revokeTomeTokensForSessions(sessionIds, env);
  console.log(
    `charge refunded: revoked ${revokedFromStripe} tome tokens via Stripe session fallback for payment_intent ${paymentIntentId}`,
  );
}

async function handleWebhook(req: Request, env: StripeEnv) {
  const event = await verifyWebhook(req, env);

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      await handleCheckoutCompleted(event.data.object, env);
      break;
    case "charge.refunded":
    case "charge.refund.updated":
      await handleChargeRefunded(event.data.object, env);
      break;
    default:
      console.log("Unhandled event:", event.type);
  }
}

export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawEnv = new URL(request.url).searchParams.get("env");
        // B-W1 : un env invalide ne doit JAMAIS répondre 200 « ignored ».
        // Un 200 dit à Stripe « reçu, ne rejouez pas » : un événement
        // légitime arrivé avec un mauvais paramètre d'URL serait perdu
        // sans livraison et sans rejeu. Un non-200 (400, comme les
        // autres erreurs webhook ci-dessous) fait rejouer Stripe, et
        // rien n'est livré ici : on sort avant handleWebhook.
        if (rawEnv !== "sandbox" && rawEnv !== "live") {
          console.error("Webhook with invalid env:", rawEnv);
          return new Response("Webhook error: invalid env", { status: 400 });
        }
        try {
          await handleWebhook(request, rawEnv as StripeEnv);
          return Response.json({ received: true });
        } catch (e) {
          console.error("Webhook error:", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});