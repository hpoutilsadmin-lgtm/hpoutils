import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { type StripeEnv, createStripeClient } from "@/lib/stripe.server";

const PDF_BUCKET = "pdfs";
const PDF_OBJECT_PATH = "enjeux-humanite.pdf";
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
      automatic_tax: { enabled: true },
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
        pdf_path: PDF_OBJECT_PATH,
        environment: data.environment,
      },
      { onConflict: "stripe_session_id" },
    );
    if (upsertErr) {
      console.error("orders upsert failed", upsertErr);
      throw new Error("Database error");
    }

    // Vérifier que le PDF existe dans le bucket
    const { data: signed, error: signErr } = await admin.storage
      .from(PDF_BUCKET)
      .createSignedUrl(PDF_OBJECT_PATH, SIGNED_URL_TTL_SECONDS, {
        download: "Les-enjeux-de-l-humanite.pdf",
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