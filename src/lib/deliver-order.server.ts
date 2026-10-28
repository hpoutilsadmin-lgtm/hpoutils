// Sécurité phase 2 — livraison unique, serveur seulement.
// Appelé UNIQUEMENT par le webhook Stripe vérifié. Jamais importé par
// une page, jamais appelé depuis le navigateur.
// Déplacé depuis fulfillPdfOrder (src/utils/payments.functions.ts) et la
// branche tomes du webhook, sans changement de comportement, sauf :
// - garde delivery_sent_at (migration 20261028, à appliquer AVANT ce code)
// - clé courriel par article : delivery-<session>-<priceId,...>
// - panier, bundle, seul, tome et Offrir traités par le webhook seul.
// Toute erreur base LÈVE : le webhook répond 400 et Stripe rejoue.
import { createClient } from "@supabase/supabase-js";
import { type StripeEnv } from "@/lib/stripe.server";
import {
  getProduct,
  COLLECTION_PRICE_ID,
  resolveKitSelection,
} from "@/lib/products-catalog";
import { signDownloadToken } from "@/lib/download-token.server";
import { enqueueTransactionalEmail } from "@/lib/email/enqueue.server";
import { settleGiftReservation } from "@/utils/cadeaux.functions";
import {
  createTomeTokensForSession,
  isTomeSession,
  readerUrl,
  resolveTomeSlugsForSession,
} from "@/lib/tomes-tokens.server";

let _admin: any = null;
function admin() {
  if (!_admin) {
    _admin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }
  return _admin;
}

function origin(): string {
  const raw = process.env.SITE_URL?.trim();
  if (!raw) return "https://www.hp-outils.com";
  try {
    const parsed = new URL(raw);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") return parsed.origin;
  } catch {
    console.warn("SITE_URL is invalid; using fallback site origin");
  }
  return "https://www.hp-outils.com";
}

function giftOf(session: any, payer: string) {
  const raw = session?.metadata?.gift_to;
  if (
    typeof raw === "string" &&
    raw.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw) &&
    raw.toLowerCase() !== payer.toLowerCase()
  ) {
    return { deliveryEmail: raw.toLowerCase(), isGift: true };
  }
  return { deliveryEmail: payer, isGift: false };
}

function priceIdOf(li: any): string {
  const price = li?.price;
  return (
    price?.lookup_key ||
    price?.metadata?.lovable_external_id ||
    price?.id ||
    "unknown"
  );
}

function productIdOf(li: any): string {
  const price = li?.price;
  return typeof price?.product === "string" ? price.product : price?.product?.id || "unknown";
}

async function markDelivered(db: any, sessionId: string, rows: Array<{ priceId: string }>) {
  // Poser delivery_sent_at UNIQUEMENT là où c'est encore NULL.
  // Si la colonne n'existe pas (migration non appliquée), l'erreur
  // remonte : le webhook répond 400 et Stripe rejoue après la migration.
  for (const r of rows) {
    const { error } = await db
      .from("orders")
      .update({ delivery_sent_at: new Date().toISOString() })
      .eq("stripe_session_id", sessionId)
      .eq("price_id", r.priceId)
      .is("delivery_sent_at", null);
    if (error) throw new Error("Database error");
  }
}

// delivered = false si déjà livré (delivery_sent_at posé) : on ne
// renvoie RIEN, on ne recrée RIEN.
export async function deliverStripeSession(session: any, env: StripeEnv) {
  const db = admin();
  const payer =
    session.customer_details?.email || session.customer_email || "";
  const { deliveryEmail, isGift } = giftOf(session, payer);
  const items = session.line_items?.data ?? [];
  if (items.length === 0) throw new Error("No line items");

  type Row = {
    priceId: string;
    productId: string;
    amount: number;
    pdfPath: string | null;
    title: string | null;
  };
  const rows: Row[] = [];
  for (const li of items) {
    const priceId = priceIdOf(li);
    const productId = productIdOf(li);
    const product = getProduct(priceId);
    rows.push({
      priceId,
      productId,
      amount: typeof li?.amount_total === "number" ? li.amount_total : 0,
      pdfPath: product?.pdfPath ?? null,
      title: product?.title ?? null,
    });
    const { error } = await db.from("orders").upsert(
      {
        stripe_session_id: session.id,
        stripe_payment_intent_id:
          typeof session.payment_intent === "string" ? session.payment_intent : null,
        customer_email: payer,
        product_id: productId,
        price_id: priceId,
        amount_total: typeof li?.amount_total === "number" ? li.amount_total : 0,
        currency: session.currency ?? "cad",
        status: "paid",
        pdf_path: product?.pdfPath ?? null,
        environment: env,
      },
      { onConflict: "stripe_session_id,price_id" },
    );
    if (error) throw new Error("Database error");
  }

  // Garde livraison : ne livrer que les lignes encore sans delivery_sent_at.
  const { data: sent, error: sentError } = await db
    .from("orders")
    .select("price_id")
    .eq("stripe_session_id", session.id)
    .not("delivery_sent_at", "is", null);
  if (sentError) throw new Error("Database error");
  const already = new Set((sent ?? []).map((r: any) => r.price_id));
  const toDeliver = rows.filter((r) => !already.has(r.priceId));
  if (toDeliver.length === 0) {
    return { delivered: false, email: payer, giftEmail: isGift ? deliveryEmail : null, itemCount: 0 };
  }

  // Tomes : jetons + courriel, puis sortie (pas de courriel PDF).
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
            siteOrigin: origin(),
            isGift,
          },
        });
      }
      await markDelivered(db, session.id, rows);
      return { delivered: true, email: payer, giftEmail: isGift ? deliveryEmail : null, itemCount: fresh.length };
    }
  }

  // Bundle : sélection revalidée, exactement 10 liens, sinon on journalise
  // et on livre le produit standard, comme aujourd'hui, sans inventer
  // de sélection.
  const kitSlugs =
    typeof session.metadata?.kitSlugs === "string"
      ? session.metadata.kitSlugs.split(",").filter(Boolean)
      : [];
  const single = rows[0];
  let emailItems: Array<{ title: string; downloadUrl: string }> = [];
  const buildUrl = (priceId: string) =>
    `/api/public/download-pdf?token=${encodeURIComponent(signDownloadToken({ priceId, email: deliveryEmail }))}`;
  if (single?.priceId === COLLECTION_PRICE_ID && kitSlugs.length > 0) {
    const kits = resolveKitSelection(kitSlugs);
    if (!kits) {
      console.error("bundle selection invalid", session.id);
      if (single?.pdfPath && single?.title) emailItems = [{ title: single.title, downloadUrl: buildUrl(single.priceId) }];
    } else {
      emailItems = kits.map((kp) => ({ title: kp.title, downloadUrl: buildUrl(kp.priceId) }));
    }
  } else if (session.metadata?.cart === "1") {
    emailItems = toDeliver
      .filter((r) => r.pdfPath && r.title)
      .map((r) => ({ title: r.title!, downloadUrl: buildUrl(r.priceId) }));
  } else if (single?.pdfPath && single?.title) {
    emailItems = [{ title: single.title, downloadUrl: buildUrl(single.priceId) }];
  }

  // Bon partiel : débiter la réservation, idempotent (déjà à zéro =
  // rien à débiter deux fois). Puis mémoriser destinataire + choix
  // bundle, en best-effort (colonnes issues des migrations).
  if (session.metadata?.giftRef) {
    const discount =
      typeof session.total_details?.amount_discount === "number"
        ? session.total_details.amount_discount
        : 0;
    await settleGiftReservation(session.id, discount);
  }
  if (isGift) {
    const { error } = await db
      .from("orders")
      .update({ gift_recipient_email: deliveryEmail })
      .eq("stripe_session_id", session.id);
    if (error) console.warn("gift_recipient_email not recorded (migration pending?)", error.message);
  }
  if (kitSlugs.length > 0) {
    const { error } = await db
      .from("orders")
      .update({ kit_slugs: kitSlugs.join(",") })
      .eq("stripe_session_id", session.id);
    if (error) console.warn("kit_slugs not recorded (migration pending?)", error.message);
  }

  if (deliveryEmail && emailItems.length > 0) {
    await enqueueTransactionalEmail({
      templateName: "purchase-delivery",
      recipientEmail: deliveryEmail,
      // Clé PAR ARTICLE : un panier ne perd plus son 2e article en cas de rejeu.
      idempotencyKey: `delivery-${session.id}-${toDeliver.map((r) => r.priceId).join(",")}`,
      templateData: {
        title: single?.title ?? "Votre achat HP Outils",
        siteOrigin: origin(),
        items: emailItems,
        isGift,
      },
    });
  }
  await markDelivered(db, session.id, toDeliver);
  return { delivered: true, email: payer, giftEmail: isGift ? deliveryEmail : null, itemCount: emailItems.length };
}
