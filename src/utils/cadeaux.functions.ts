// Bons cadeaux — fonctions serveur TanStack Start, même motif que
// createCartCheckoutSession (src/utils/cart.functions.ts) et
// createPdfCheckoutSession (src/utils/payments.functions.ts) :
// prix résolus côté serveur par lookup_key, jamais un montant venu du client.
// Validation du code CÔTÉ SERVEUR uniquement, contre la table Supabase
// `gift_cards` (migration jointe : supabase/migrations/20261025_gift_cards.sql).
// Sans cette migration appliquée, ces fonctions échouent proprement
// (erreur retournée, jamais de code inventé ni de crédit accordé).
//
// Règle d'or : le navigateur ne décide jamais du crédit. Il ne fait que
// saisir le code ; le serveur recalcule le total depuis le catalogue du
// dépôt, vérifie le solde, réserve, puis débite — dans cet ordre.

import { createServerFn } from "@tanstack/react-start";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import {
  type StripeEnv,
  createStripeClient,
  getStripeErrorMessage,
} from "@/lib/stripe.server";
import { validateCartItems } from "@/lib/panier-validation";
import { getCartProduct } from "@/lib/panier";
import { getProduct } from "@/lib/products-catalog";
import { signDownloadToken } from "@/lib/download-token.server";
import { enqueueTransactionalEmail } from "@/lib/email/enqueue.server";
import {
  GIFT_DENOMINATIONS,
  getGiftDenomination,
  generateGiftCode,
  normalizeGiftCode,
  availableCents,
  applyCredit,
  GIFT_RESERVATION_TTL_MS,
  type GiftBalance,
} from "@/lib/cadeaux";

type StripeClient = ReturnType<typeof createStripeClient>;

// Origine de confiance locale, copiée (comme tomes.functions.ts le fait)
// pour éviter un import circulaire avec payments.functions.ts, que le
// PATCH-payments fait appeler settleGiftReservation depuis ce fichier.
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

let _admin: ReturnType<typeof createClient> | null = null;
function getAdmin() {
  if (!_admin) {
    _admin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }
  return _admin;
}

function randomCode(): string {
  // crypto serveur Node, même motif que download-token.server.ts.
  return generateGiftCode((n: number) => new Uint8Array(crypto.randomBytes(n)));
}

async function resolveGiftPriceId(stripe: StripeClient, lookupKey: string): Promise<string | null> {
  const page = await stripe.prices.list({ lookup_keys: [lookupKey] });
  return page.data[0]?.id ?? null;
}

async function readGiftRow(admin: ReturnType<typeof createClient>, code: string) {
  const { data, error } = await admin
    .from("gift_cards")
    .select("code,balance_cents,reserved_cents,reserved_until,reserved_session_id,status")
    .eq("code", code)
    .maybeSingle();
  if (error) throw new Error("Base des bons cadeaux indisponible");
  return data as {
    code: string;
    balance_cents: number;
    reserved_cents: number;
    reserved_until: string | null;
    reserved_session_id: string | null;
    status: string;
  } | null;
}

function toBalance(row: { balance_cents: number; reserved_cents: number; reserved_until: string | null }): GiftBalance {
  return {
    balanceCents: row.balance_cents,
    reservedCents: row.reserved_cents,
    reservedUntilMs: row.reserved_until ? Date.parse(row.reserved_until) : null,
  };
}

/** Total serveur du panier, depuis le catalogue du dépôt (jamais le client). */
function cartTotalCents(priceIds: string[]): number {
  let total = 0;
  for (const key of priceIds) {
    const product = getCartProduct(key);
    if (!product) throw new Error("Article inconnu");
    total += product.priceCad * 100;
  }
  return total;
}

// Programme fermé, décision HP 28 oct. 2026 : plus aucune vente de bon cadeau.
// Les codes déjà émis restent utilisables ; aucune nouvelle session, aucun nouveau code.
export const GIFT_SALES_DISABLED = true;

// --- Achat d'un bon ---------------------------------------------------------

export const createGiftCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: { lookupKey: string; environment: StripeEnv }) => {
    const denomination = getGiftDenomination(data.lookupKey);
    if (!denomination) throw new Error("Bon cadeau introuvable");
    if (data.environment !== "sandbox" && data.environment !== "live") {
      throw new Error("Environnement invalide");
    }
    return { denomination, environment: data.environment };
  })
  .handler(async ({ data }) => {
    if (GIFT_SALES_DISABLED) {
      return { error: "Les bons cadeaux ne sont plus en vente." };
    }
    try {
      const stripe = createStripeClient(data.environment);
      const priceId = await resolveGiftPriceId(stripe, data.denomination.lookupKey);
      if (!priceId) throw new Error("Prix introuvable pour ce bon cadeau");
      const origin = getTrustedSiteOrigin();
      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: priceId, quantity: 1 }],
        mode: "payment",
        ui_mode: "hosted_page",
        success_url: `${origin}/cadeaux/merci?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cadeaux/`,
        // Même réglage que le panier v1 (voir README : alignement taxe à
        // confirmer par le coordinateur, le site affichant « aucune taxe »).
        automatic_tax: { enabled: true },
        billing_address_collection: "required",
        metadata: { gift: "1", giftLookupKey: data.denomination.lookupKey },
      });
      return { checkoutUrl: session.url ?? "" };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });

// --- Livraison du bon après paiement (page /cadeaux/merci) ------------------
// Idempotente par session Stripe : un rechargement de la page de merci
// relit le code existant, sans régénérer ni renvoyer de courriel.

export const fulfillGiftPurchase = createServerFn({ method: "POST" })
  .inputValidator((data: { sessionId: string }) => {
    if (!/^cs_[a-zA-Z0-9_]+$/.test(data.sessionId)) throw new Error("Invalid sessionId");
    return data;
  })
  .handler(async ({ data }) => {
    const env: StripeEnv = data.sessionId.startsWith("cs_test_") ? "sandbox" : "live";
    const stripe = createStripeClient(env);
    const session = await stripe.checkout.sessions.retrieve(data.sessionId, {
      expand: ["line_items", "line_items.data.price"],
    });
    if (session.payment_status !== "paid") return { status: "pending" as const };
    if (session.metadata?.gift !== "1") return { status: "not-gift" as const };
    const admin = getAdmin();
    const { data: existing } = await admin
      .from("gift_cards")
      .select("code,initial_cents")
      .eq("stripe_session_id", session.id)
      .maybeSingle();
    if (existing) {
      return {
        status: "paid" as const,
        code: (existing as { code: string }).code,
        amountCents: (existing as { initial_cents: number }).initial_cents,
        email: session.customer_details?.email ?? null,
      };
    }
    if (GIFT_SALES_DISABLED) {
      return { status: "disabled" as const };
    }
    const lookupKey = session.metadata?.giftLookupKey ?? null;
    const denomination = lookupKey ? getGiftDenomination(lookupKey) : null;
    const linePrice = session.line_items?.data?.[0]?.price;
    const fallbackKey =
      (linePrice?.lookup_key as string | null) ??
      (linePrice?.metadata?.lovable_external_id as string | undefined) ??
      null;
    const amountCents =
      denomination?.amountCents ??
      (fallbackKey ? getGiftDenomination(fallbackKey)?.amountCents : undefined) ??
      (typeof session.amount_total === "number" ? session.amount_total : 0);
    if (amountCents <= 0) throw new Error("Montant du bon introuvable");
    const email =
      session.customer_details?.email || (session.customer_email as string | null) || "";
    const code = randomCode();
    const { error } = await admin.from("gift_cards").insert({
      code,
      initial_cents: amountCents,
      balance_cents: amountCents,
      reserved_cents: 0,
      buyer_email: email || null,
      stripe_session_id: session.id,
      status: "active",
    });
    if (error) throw new Error("Création du bon impossible");
    if (email) {
      await enqueueTransactionalEmail({
        templateName: "gift-delivery",
        recipientEmail: email,
        idempotencyKey: `gift-delivery-${session.id}`,
        templateData: {
          title: "Ton bon cadeau HP Outils",
          code,
          amountLabel: `${amountCents / 100} $ CAD`,
          siteOrigin: getTrustedSiteOrigin(),
        },
      });
    }
    return { status: "paid" as const, code, amountCents, email: email || null };
  });

// --- Consultation du solde (saisie du code au panier) -----------------------
// Ne renvoie que le solde utilisable, jamais le courriel de l'acheteur.

export const checkGiftBalance = createServerFn({ method: "POST" })
  .inputValidator((data: { code: string }) => {
    const normalized = normalizeGiftCode(data.code);
    if (!normalized) throw new Error("Code invalide");
    return { code: normalized };
  })
  .handler(async ({ data }) => {
    try {
      const admin = getAdmin();
      const row = await readGiftRow(admin, data.code);
      if (!row || row.status !== "active") return { valid: false as const };
      const available = availableCents(toBalance(row), Date.now());
      return { valid: true as const, availableCents: available };
    } catch {
      return { valid: false as const, error: "Vérification impossible pour l'instant" };
    }
  });

// --- Échange au panier, cas 1 : le bon couvre tout --------------------------
// Aucune session Stripe : le serveur débite (mise à jour optimiste : la
// ligne n'est débitée que si le solde lu est toujours celui en base, sinon
// conflit et aucun débit), enregistre la commande, envoie les liens PDF.

export const payCartWithGift = createServerFn({ method: "POST" })
  .inputValidator((data: { items: Array<{ priceId: string }>; code: string; email: string }) => {
    const priceIds = validateCartItems(data.items.map((i) => i?.priceId));
    const normalized = normalizeGiftCode(data.code);
    if (!normalized) throw new Error("Code invalide");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new Error("Courriel invalide");
    return { priceIds, code: normalized, email: data.email.toLowerCase() };
  })
  .handler(async ({ data }) => {
    const admin = getAdmin();
    const row = await readGiftRow(admin, data.code);
    if (!row || row.status !== "active") throw new Error("Code invalide ou révoqué");
    const totalCents = cartTotalCents(data.priceIds);
    const available = availableCents(toBalance(row), Date.now());
    const applied = applyCredit(available, totalCents);
    if (!applied.fullyCovered) throw new Error("Le bon ne couvre pas tout le total");
    // Débit optimiste : échoue proprement si un autre paiement a bougé le solde.
    const { data: updated, error } = await admin
      .from("gift_cards")
      .update({ balance_cents: row.balance_cents - totalCents })
      .eq("code", data.code)
      .eq("balance_cents", row.balance_cents)
      .select("code");
    if (error || !updated || updated.length === 0) {
      throw new Error("Le solde a changé entre-temps, recommence");
    }
    const origin = getTrustedSiteOrigin();
    const items: Array<{ title: string; downloadUrl: string }> = [];
    for (const key of data.priceIds) {
      const product = getProduct(key);
      if (!product) continue;
      await admin.from("orders").insert({
        stripe_session_id: `gift-${data.code}-${Date.now()}`,
        customer_email: data.email,
        product_id: product.priceId,
        price_id: key,
        amount_total: product.priceCad * 100,
        currency: "cad",
        status: "paid",
        pdf_path: product.pdfPath ?? null,
        environment: "gift",
      });
      items.push({
        title: product.title,
        downloadUrl: `/api/public/download-pdf?token=${signDownloadToken({ priceId: key, email: data.email })}`,
      });
    }
    if (items.length > 0) {
      await enqueueTransactionalEmail({
        templateName: "purchase-delivery",
        recipientEmail: data.email,
        idempotencyKey: `gift-order-${data.code}-${totalCents}`,
        templateData: { title: "Ton panier HP Outils", siteOrigin: origin, items },
      });
    }
    return { ok: true as const, coveredCents: totalCents, remainingBalanceCents: applied.remainingBalanceCents };
  });

// --- Échange au panier, cas 2 : crédit partiel via Stripe --------------------
// Le serveur réserve le crédit, crée un coupon Stripe à usage unique
// (amount_off = crédit, CAD) appliqué à la session, puis attache la session
// à la réservation. Le débit réel a lieu au paiement confirmé, via
// settleGiftReservation (appelée depuis la branche panier de fulfillPdfOrder,
// voir PATCH-payments.md). Si la création de session échoue, la réservation
// est libérée immédiatement.

export const createCartCheckoutWithGift = createServerFn({ method: "POST" })
  .inputValidator((data: { items: Array<{ priceId: string }>; code: string; environment: StripeEnv }) => {
    const priceIds = validateCartItems(data.items.map((i) => i?.priceId));
    const normalized = normalizeGiftCode(data.code);
    if (!normalized) throw new Error("Code invalide");
    if (data.environment !== "sandbox" && data.environment !== "live") {
      throw new Error("Environnement invalide");
    }
    return { priceIds, code: normalized, environment: data.environment };
  })
  .handler(async ({ data }) => {
    const admin = getAdmin();
    const row = await readGiftRow(admin, data.code);
    if (!row || row.status !== "active") return { error: "Code invalide ou révoqué" };
    const totalCents = cartTotalCents(data.priceIds);
    const available = availableCents(toBalance(row), Date.now());
    const applied = applyCredit(available, totalCents);
    if (applied.coveredCents <= 0) return { error: "Ce bon n'a plus de solde" };
    if (applied.fullyCovered) {
      return { error: "Le bon couvre tout le total : utilise le paiement par bon seul" };
    }
    const ref = `gift-res-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
    const reservedUntil = new Date(Date.now() + GIFT_RESERVATION_TTL_MS).toISOString();
    const { data: reserved, error: reserveError } = await admin
      .from("gift_cards")
      .update({
        reserved_cents: row.reserved_cents + applied.coveredCents,
        reserved_until: reservedUntil,
        reserved_session_id: ref,
      })
      .eq("code", data.code)
      .eq("balance_cents", row.balance_cents)
      .eq("reserved_cents", row.reserved_cents)
      .select("code");
    if (reserveError || !reserved || reserved.length === 0) {
      return { error: "Le solde a changé entre-temps, recommence" };
    }
    const release = async () => {
      await admin
        .from("gift_cards")
        .update({ reserved_cents: 0, reserved_until: null, reserved_session_id: null })
        .eq("code", data.code)
        .eq("reserved_session_id", ref);
    };
    try {
      const stripe = createStripeClient(data.environment);
      const coupon = await stripe.coupons.create({
        amount_off: applied.coveredCents,
        currency: "cad",
        duration: "once",
        name: `Bon cadeau HP ****${data.code.slice(-4)}`,
      });
      const resolved: Array<{ id: string; lookup_key: string | null }> = [];
      for (let i = 0; i < data.priceIds.length; i += 10) {
        const page = await stripe.prices.list({ lookup_keys: data.priceIds.slice(i, i + 10) });
        for (const p of page.data) resolved.push({ id: p.id, lookup_key: p.lookup_key });
      }
      if (resolved.length !== data.priceIds.length) throw new Error("Un prix du panier est introuvable");
      const byKey = new Map(resolved.map((p) => [p.lookup_key, p.id] as const));
      const line_items = data.priceIds.map((key) => {
        const id = byKey.get(key);
        if (!id) throw new Error("Prix introuvable pour un article du panier");
        return { price: id, quantity: 1 };
      });
      const origin = getTrustedSiteOrigin();
      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        ui_mode: "hosted_page",
        discounts: [{ coupon: coupon.id }],
        success_url: `${origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/panier/`,
        automatic_tax: { enabled: true },
        billing_address_collection: "required",
        metadata: { cart: "1", priceIds: data.priceIds.join(","), giftRef: ref },
      });
      await admin
        .from("gift_cards")
        .update({ reserved_session_id: session.id })
        .eq("code", data.code)
        .eq("reserved_session_id", ref);
      return {
        checkoutUrl: session.url ?? "",
        coveredCents: applied.coveredCents,
        remainingToPayCents: applied.remainingToPayCents,
      };
    } catch (error) {
      await release();
      return { error: getStripeErrorMessage(error) };
    }
  });

// --- Débit après paiement Stripe confirmé (appelé par fulfillPdfOrder) ------
// Idempotent : si la réservation est déjà à zéro, rien n'est débité deux fois.

export async function settleGiftReservation(
  sessionId: string,
  discountCents: number,
): Promise<{ settled: boolean }> {
  const admin = getAdmin();
  const { data: row } = await admin
    .from("gift_cards")
    .select("code,balance_cents,reserved_cents")
    .eq("reserved_session_id", sessionId)
    .maybeSingle();
  if (!row) return { settled: false };
  const typed = row as { code: string; balance_cents: number; reserved_cents: number };
  if (typed.reserved_cents <= 0) return { settled: true };
  const spend = discountCents > 0 ? Math.min(typed.reserved_cents, discountCents) : typed.reserved_cents;
  const { data: updated, error } = await admin
    .from("gift_cards")
    .update({ balance_cents: typed.balance_cents - spend, reserved_cents: 0, reserved_until: null, reserved_session_id: null })
    .eq("code", typed.code)
    .eq("balance_cents", typed.balance_cents)
    .eq("reserved_cents", typed.reserved_cents)
    .select("code");
  if (error || !updated || updated.length === 0) return { settled: false };
  return { settled: true };
}

export { GIFT_DENOMINATIONS };
