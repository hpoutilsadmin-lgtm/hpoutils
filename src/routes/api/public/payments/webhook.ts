import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { type StripeEnv, verifyWebhook, createStripeClient } from "@/lib/stripe.server";
import { getProduct } from "@/lib/products-catalog";
import { signDownloadToken } from "@/lib/download-token.server";
import { enqueueTransactionalEmail } from "@/lib/email/enqueue.server";

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
  if (!raw) return "https://hp-outils.com";
  try {
    const parsed = new URL(raw);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      return parsed.origin;
    }
  } catch {
    console.warn("SITE_URL is invalid; using fallback site origin");
  }
  return "https://hp-outils.com";
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

  await getSupabase().from("orders").upsert(
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
    { onConflict: "stripe_session_id" },
  );

  // Envoi automatique du courriel de livraison avec un lien signé frais.
  // Idempotent grâce à idempotency_key = session.id : si Stripe rejoue
  // l'événement, le worker email n'enverra pas un doublon.
  if (product && email) {
    const token = signDownloadToken({ priceId, email });
    const downloadUrl = `/api/public/download-pdf?token=${encodeURIComponent(token)}`;
    await enqueueTransactionalEmail({
      templateName: "purchase-delivery",
      recipientEmail: email,
      idempotencyKey: `delivery-${session.id}`,
      templateData: {
        title: product.title,
        downloadUrl,
        siteOrigin: getTrustedSiteOrigin(),
      },
    });
  }
}

// charge.refunded / charge.refund.updated : marque la commande comme
// remboursée. /api/public/download-pdf vérifie ce statut et bloque le
// téléchargement quand status='refunded'.
async function handleChargeRefunded(charge: any, env: StripeEnv) {
  const paymentIntentId =
    typeof charge.payment_intent === "string" ? charge.payment_intent : null;
  if (!paymentIntentId) return;
  await getSupabase()
    .from("orders")
    .update({
      status: "refunded",
      refunded_at: new Date().toISOString(),
    })
    .eq("stripe_payment_intent_id", paymentIntentId)
    .eq("environment", env);
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