import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { type StripeEnv, verifyWebhook, createStripeClient } from "@/lib/stripe.server";
import { deliverStripeSession } from "@/lib/deliver-order.server";
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
    console.warn("charge refunded without payment_intent; nothing revoked", {
      chargeId: charge.id ?? null,
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
  if (revokedFromOrders > 0) {
    console.log(
      `charge refunded: revoked ${revokedFromOrders} tome tokens via orders for payment_intent ${paymentIntentId}`,
    );
    return;
  }
  // Repli indépendant de orders : retrouver les sessions par Stripe.
  const stripe = createStripeClient(env);
  const sessions = await stripe.checkout.sessions.list({
    payment_intent: paymentIntentId,
    limit: 10,
  });
  const sessionIds = sessions.data.map((s) => s.id);
  if (sessionIds.length === 0) {
    console.warn(
      `charge refunded: no orders row and no Stripe checkout session for payment_intent ${paymentIntentId}; nothing to revoke`,
    );
    return;
  }
  const revokedFromStripe = await revokeTomeTokensForSessions(sessionIds);
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
        if (rawEnv !== "sandbox" && rawEnv !== "live") {
          console.error("Webhook with invalid env:", rawEnv);
          return Response.json({ received: true, ignored: "invalid env" });
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