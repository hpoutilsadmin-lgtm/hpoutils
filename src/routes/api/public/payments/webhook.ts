import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { type StripeEnv, verifyWebhook, createStripeClient } from "@/lib/stripe.server";
import { getProduct } from "@/lib/products-catalog";
import { signDownloadToken } from "@/lib/download-token.server";
import { enqueueTransactionalEmail } from "@/lib/email/enqueue.server";
import {
  createTomeTokensForSession,
  isTomeSession,
  readerUrl,
  resolveTomeSlugsForSession,
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

function getTrustedSiteOrigin(): string {
  const raw = process.env.SITE_URL?.trim();
  if (!raw) return "https://www.hp-outils.com";
  try {
    const parsed = new URL(raw);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      return parsed.origin;
    }
  } catch {
    console.warn("SITE_URL is invalid; using fallback site origin");
  }
  return "https://www.hp-outils.com";
}

async function handleCheckoutCompleted(rawSession: any, env: StripeEnv) {
  // L'événement checkout.session.completed n'inclut PAS line_items par défaut.
  // On récupère la session étendue pour obtenir le prix et le produit.
  const stripe = createStripeClient(env);
  const session = await stripe.checkout.sessions.retrieve(rawSession.id, {
    expand: ["line_items", "line_items.data.price"],
  });

  const email =
    session.customer_details?.email || (session.customer_email as string | null) || "";
  // « Offrir » : la livraison va au destinataire (métadonnée gift_to),
  // la facture reste chez le payeur (ligne de commande : customer_email =
  // payeur, inchangée ci-dessous). Si le destinataire est le payeur, on
  // retombe sur le parcours normal. La révocation en cas de remboursement
  // (handleChargeRefunded) est indépendante du courriel : elle passe par
  // le payment intent et le statut de la commande — elle coupe donc le
  // lien du destinataire comme celui du payeur.
  const giftRaw = session.metadata?.gift_to;
  const giftTo =
    typeof giftRaw === "string" &&
    giftRaw.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(giftRaw) &&
    giftRaw.toLowerCase() !== email.toLowerCase()
      ? giftRaw.toLowerCase()
      : null;
  const deliveryEmail = giftTo ?? email;
  const isGift = giftTo !== null;
  const first = session.line_items?.data?.[0];
  const priceId =
    first?.price?.lookup_key ||
    (first?.price?.metadata?.lovable_external_id as string | undefined) ||
    first?.price?.id ||
    "unknown";
  const productId =
    typeof first?.price?.product === "string"
      ? first.price.product
      : (first?.price?.product as any)?.id || "unknown";
  const product = getProduct(priceId);

  // Clé d'idempotence (session + prix), comme la migration
  // 20261024_cart_orders.sql et payments.functions.ts : l'ancienne clé
  // « session seule » n'existe plus en base, l'upsert échouait — et
  // l'erreur était ignorée, donc la commande n'était jamais enregistrée
  // sans que personne le voie (bug remboursement, oct. 2026).
  // Une erreur ici est JOURNALISÉE et BLOQUANTE : on lève, le POST
  // répond 400, Stripe rejoue l'événement, et AUCUNE livraison
  // (jetons, courriel) n'a lieu avant l'enregistrement.
  const { error: orderUpsertError } = await getSupabase().from("orders").upsert(
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
      pdf_path: product?.pdfPath ?? null,
      environment: env,
    },
    { onConflict: "stripe_session_id,price_id" },
  );
  if (orderUpsertError) {
    console.error("orders upsert failed", orderUpsertError);
    throw new Error("Database error");
  }

  // TOMES « À toi l'histoire » : la session porte metadata.kind === 'tome'
  // (ou un lookup_key de tome). On crée les jetons personnels et on envoie
  // le courriel de lecture — puis on sort, sans courriel PDF.
  // Idempotent : si la page de retour a déjà livré, les jetons existent et
  // on n'envoie pas de doublon.
  if (isTomeSession(session) && deliveryEmail) {
    const slugs = resolveTomeSlugsForSession(session);
    if (slugs.length > 0) {
      const created = await createTomeTokensForSession({
        sessionId: session.id,
        email: deliveryEmail,
        slugs,
        environment: env,
      });
      const fresh = created.filter((c) => c.token !== null);
      if (fresh.length > 0) {
        await enqueueTransactionalEmail({
          templateName: "tome-delivery",
          recipientEmail: deliveryEmail,
          idempotencyKey: `tome-delivery-${session.id}`,
          templateData: {
            title: "À toi l'histoire",
            items: fresh.map((c) => ({ title: c.tome.title, readerUrl: readerUrl(c.token!) })),
            siteOrigin: getTrustedSiteOrigin(),
            isGift,
          },
        });
      }
      return;
    }
  }

  // Envoi automatique du courriel de livraison avec un lien signé frais.
  // Idempotent grâce à idempotency_key = session.id : si Stripe rejoue
  // l'événement, le worker email n'enverra pas un doublon.
  // Pour un cadeau, le jeton est signé avec le courriel du destinataire.
  if (product && deliveryEmail) {
    const token = signDownloadToken({ priceId, email: deliveryEmail });
    const downloadUrl = `/api/public/download-pdf?token=${encodeURIComponent(token)}`;
    await enqueueTransactionalEmail({
      templateName: "purchase-delivery",
      recipientEmail: deliveryEmail,
      idempotencyKey: `delivery-${session.id}`,
      templateData: {
        title: product.title,
        downloadUrl,
        siteOrigin: getTrustedSiteOrigin(),
        isGift,
      },
    });
  }
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