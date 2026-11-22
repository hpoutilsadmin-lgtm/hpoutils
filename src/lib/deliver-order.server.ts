// Sécurité phase 2 — livraison unique, serveur seulement.
// Appelé UNIQUEMENT par le webhook Stripe vérifié. Jamais importé par
// une page, jamais appelé depuis le navigateur.
// Déplacé depuis fulfillPdfOrder (src/utils/payments.functions.ts) et la
// branche tomes du webhook, sans changement de comportement, sauf :
// - garde delivery_sent_at (migration 20261028, à appliquer AVANT ce code)
// - clé courriel par article : delivery-<session>-<priceId,...>
// - panier, bundle, seul, tome et Offrir traités par le webhook seul.
// Toute erreur base LÈVE : le webhook répond 400 et Stripe rejoue.
import { supabaseExternalAdmin } from "@/integrations/supabase/external.server";
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

// Accès base par le client service_role externe partagé (module
// external.server.ts, secrets HP_SUPABASE_*) — la fabrique locale
// admin a été retirée au recâblage Supabase externe (20 nov. 2026).

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

// LOT-ALERTE-EXPRESS (22 nov. 2026) — alerte interne quand une commande
// de jeu sur mesure est payée.
//
// Le sur-mesure n'a AUCUN courriel automatique au client : getProduct()
// ne connaît pas ces prix (absents de products-catalog.ts), donc emailItems
// reste vide et la commande reste « paid » avec delivery_sent_at NULL.
// Sans cette alerte, rien ne signale à la direction qu'une livraison
// manuelle attend (F5 du TEST 0 $ Express, 22 nov. 2026).
//
// Détection : lookup_key Stripe `jeu_sur_mesure_*` (convention de nommage
// des produits, cf. FAQ : Express 19 $, Événement 199 $, Saisonnier
// 299 $, Permanent 399 $) OU, pour l'Express, l'ID de prix Stripe vérifié
// pendant le TEST 0 $ Express (cas où le prix n'aurait pas de lookup_key).
// Les IDs de prix des 3 autres niveaux ne sont dans aucune source du
// dépôt : l'alerte ne les couvrira que si Mel crée leurs prix avec un
// lookup_key `jeu_sur_mesure_*` (à confirmer avec elle).
const ALERT_RECIPIENT = "hpoutils.admin@gmail.com";
const CUSTOM_GAME_PRICE_IDS: Record<string, string> = {
  // Express 19 $, prix vérifié pendant le TEST 0 $ Express (22 nov. 2026).
  price_1UaaRIFvicrYVGX9KqYw5uld: "Express",
};

function customGameLevelOf(priceId: string): string | null {
  const known = CUSTOM_GAME_PRICE_IDS[priceId];
  if (known) return known;
  if (!priceId.startsWith("jeu_sur_mesure_")) return null;
  const level = priceId.slice("jeu_sur_mesure_".length).split("_")[0];
  switch (level) {
    case "express":
      return "Express";
    case "evenement":
      return "Événement";
    case "saisonnier":
      return "Saisonnier";
    case "permanent":
      return "Permanent";
    default:
      // Clé inconnue : affichée telle quelle, jamais inventée.
      return priceId;
  }
}

function formatCad(cents: number): string {
  return `${(cents / 100).toFixed(2).replace(".", ",")} $ CAD`;
}

// Une seule alerte par session Stripe. Idempotence (obligatoire : le
// webhook Stripe rejoue) : la file pgmq ne déduplique PAS (enqueue_email
// = pgmq.send brut, migration email_infra) et l'idempotency_key n'est
// que transmise au fournisseur d'envoi. La garde est donc une lecture
// de email_send_log AVANT la mise en file — même patron que la
// bienvenue Passeurs (passeurs.server.ts) : template + destinataire +
// statut 'pending'/'sent', avec en plus le filtre session dans
// metadata (la table n'a pas de colonne session). Un échec antérieur
// ('failed', 'dlq', …) ne bloque PAS : le rejeu retente l'alerte.
async function maybeSendCustomGameAlert(
  db: any,
  session: any,
  toDeliver: Array<{ priceId: string; amount: number }>,
  payer: string,
) {
  const customRows = toDeliver
    .map((r) => ({ ...r, level: customGameLevelOf(r.priceId) }))
    .filter((r) => r.level !== null);
  if (customRows.length === 0) return;
  // Un lien de paiement sur mesure = 1 article, quantité 1. Si jamais
  // plusieurs lignes arrivaient, une seule alerte par session.
  const first = customRows[0];
  if (customRows.length > 1) {
    console.warn("custom game alert: multiple custom rows in one session; alerting on the first only", {
      sessionId: session.id,
      priceIds: customRows.map((r) => r.priceId),
    });
  }
  const { data: prior, error: priorError } = await db
    .from("email_send_log")
    .select("id, metadata, status")
    .eq("template_name", "custom-game-alert")
    .eq("recipient_email", ALERT_RECIPIENT)
    .in("status", ["pending", "sent"]);
  if (priorError) throw new Error("Database error");
  const alreadyAlerted = (prior ?? []).some(
    (row: any) => row?.metadata?.stripe_session_id === session.id,
  );
  if (alreadyAlerted) {
    console.log("custom game alert already queued/sent for session; skipping", {
      sessionId: session.id,
    });
    return;
  }
  // ID de commande : ligne orders venant d'être enregistrée par l'upsert.
  const { data: orderRow, error: orderError } = await db
    .from("orders")
    .select("id")
    .eq("stripe_session_id", session.id)
    .eq("price_id", first.priceId)
    .maybeSingle();
  if (orderError) throw new Error("Database error");
  const orderId = (orderRow as any)?.id ?? null;
  if (!orderId) {
    console.error("custom game alert: order row not found after upsert", {
      sessionId: session.id,
      priceId: first.priceId,
    });
    throw new Error("Database error");
  }
  const paidAt =
    typeof session.created === "number"
      ? new Date(session.created * 1000).toISOString()
      : new Date().toISOString();
  const queued = await enqueueTransactionalEmail({
    templateName: "custom-game-alert",
    recipientEmail: ALERT_RECIPIENT,
    idempotencyKey: `custom-game-alert-${session.id}`,
    logMetadata: {
      stripe_session_id: session.id,
      price_id: first.priceId,
      order_id: orderId,
    },
    templateData: {
      level: first.level,
      amount: formatCad(first.amount),
      buyerEmail: payer || "non fourni",
      sessionId: session.id,
      orderId,
      paidAt,
      siteOrigin: origin(),
    },
  });
  // B-W2, même contrat que les livraisons : un échec de mise en file
  // lève AVANT la suite — le webhook répond 400, Stripe rejoue, et la
  // garde ci-dessus retente l'alerte (la tentative ratée est en
  // 'failed', donc non bloquante). La commande, elle, est déjà
  // enregistrée payée : rien n'est perdu.
  if (!queued) throw new Error("Custom game alert email enqueue failed");
  console.log("custom game alert queued", {
    sessionId: session.id,
    orderId,
    level: first.level,
  });
}

// delivered = false si déjà livré (delivery_sent_at posé) : on ne
// renvoie RIEN, on ne recrée RIEN.
export async function deliverStripeSession(session: any, env: StripeEnv) {
  const db = supabaseExternalAdmin;
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

  // LOT-ALERTE-EXPRESS : la commande est enregistrée payée ; si elle
  // contient un jeu sur mesure, alerter la direction (livraison
  // manuelle à faire). Ne change rien au parcours client : aucun
  // courriel à l'acheteur, emailItems inchangé ci-dessous.
  await maybeSendCustomGameAlert(db, session, toDeliver, payer);

  // Tomes : jetons + courriel, puis sortie (pas de courriel PDF).
  // Pertes journalisées en erreur, jamais silencieuses : si la session
  // est un tome mais qu'aucun courriel de livraison ni aucun tome
  // reconnaissable n'existe, on NE marque rien comme livré par la
  // branche tomes — le parcours ci-dessous ne doit pas non plus poser
  // delivery_sent_at sans courriel (voir garde en fin de fonction).
  if (isTomeSession(session) && !deliveryEmail) {
    console.error("tome session without delivery email; no tome email can be sent", session.id);
  }
  if (isTomeSession(session) && deliveryEmail) {
    const slugs = resolveTomeSlugsForSession(session);
    if (slugs.length === 0) {
      console.error("tome session with no resolvable slugs; no tome email can be sent", session.id);
    }
    if (slugs.length > 0) {
      const created = await createTomeTokensForSession({
        sessionId: session.id,
        email: deliveryEmail,
        slugs,
        environment: env,
      });
      const fresh = created.filter((c) => c.token !== null);
      // B-W2 : ne marquer livré QUE si le courriel est réellement mis
      // en file. Sans jeton frais, on ne peut pas renvoyer les liens
      // d'origine (bruts non retrouvables depuis leur empreinte) : une
      // livraison antérieure incomplète ne doit pas devenir « livrée »
      // par défaut. On ne lève PAS pour autant : les jetons existent
      // déjà, donc chaque rejeu retrouverait les mêmes jetons existants
      // et lèverait de nouveau — boucle 400 sans issue. On retourne
      // « non livré » sans marquer : le webhook répond 200, Stripe ne
      // rejoue plus, et l'acheteur récupère ses liens par courriel
      // (/lire, /recuperer-achat), qui forge de nouveaux jetons.
      // Fusion 3B+3J : le journal d'erreur de 3J est gardé avant le
      // retour de 3B (visibilité + non-marquage) ; le bloc d'envoi
      // « fire-and-forget » de 3J est abandonné, l'envoi ci-dessous
      // (chemin 3B, vérifié) l'englobe — sinon double courriel.
      if (fresh.length === 0) {
        console.error("tome session with pre-existing tokens only; no email can be resent from this run", session.id);
        return { delivered: false, email: payer, giftEmail: isGift ? deliveryEmail : null, itemCount: 0 };
      }
      const queued = await enqueueTransactionalEmail({
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
      if (!queued) throw new Error("Tome delivery email enqueue failed");
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
    `/api/public/download-pdf?token=${encodeURIComponent(signDownloadToken({ priceId, email: deliveryEmail, sessionId: session.id }))}`;
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

  // Garde M2 : une session tome arrivée ici n'a ni courriel de
  // livraison ni tome reconnaissable (voir gardes ci-dessus). La marquer
  // « livrée » sans courriel serait faux : on ne pose pas
  // delivery_sent_at, la commande reste « paid » (récupérable, et le
  // rejeu Stripe ne la fera pas passer pour livrée).
  if (isTomeSession(session) && emailItems.length === 0) {
    console.error("tome session delivered without any email item; delivery NOT marked", session.id);
    return { delivered: false, email: payer, giftEmail: isGift ? deliveryEmail : null, itemCount: 0 };
  }
  if (deliveryEmail && emailItems.length > 0) {
    // B-W2 : un échec de mise en file lève AVANT markDelivered — le
    // webhook répond 400, Stripe rejoue, et la commande reste
    // paid-sans-delivery_sent_at au lieu d'être faussement « livrée ».
    const queued = await enqueueTransactionalEmail({
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
    if (!queued) throw new Error("Purchase delivery email enqueue failed");
    await markDelivered(db, session.id, toDeliver);
    return { delivered: true, email: payer, giftEmail: isGift ? deliveryEmail : null, itemCount: emailItems.length };
  }
  // Rien n'a été envoyé (pas de courriel de livraison, ou aucun article
  // livrable — produit inconnu du catalogue, ou payeur sans courriel) :
  // on ne marque RIEN comme livré. Avant ce lot, markDelivered était
  // appelé quand même et la commande passait en « livrée » sans qu'aucun
  // lien soit parti. La commande reste « paid », récupérable par
  // courriel. Ne pas lever : un rejeu Stripe ne changerait rien.
  console.error("delivery with no email item; order NOT marked delivered", session.id);
  return { delivered: false, email: payer, giftEmail: isGift ? deliveryEmail : null, itemCount: 0 };
}
