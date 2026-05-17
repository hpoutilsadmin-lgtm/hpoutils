import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { type StripeEnv, verifyWebhook } from "@/lib/stripe.server";

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

async function handleCheckoutCompleted(session: any, env: StripeEnv) {
  const email =
    session.customer_details?.email || session.customer_email || "";
  const lineItems = session.line_items?.data ?? [];
  const first = lineItems[0];
  const priceId =
    first?.price?.lookup_key ||
    first?.price?.metadata?.lovable_external_id ||
    first?.price?.id ||
    "unknown";
  const productId =
    typeof first?.price?.product === "string"
      ? first.price.product
      : first?.price?.product?.id || "unknown";

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
      pdf_path: "enjeux-humanite.pdf",
      environment: env,
    },
    { onConflict: "stripe_session_id" },
  );
}

async function handleWebhook(req: Request, env: StripeEnv) {
  const event = await verifyWebhook(req, env);

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      await handleCheckoutCompleted(event.data.object, env);
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