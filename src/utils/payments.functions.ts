import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { type StripeEnv, createStripeClient, getStripeErrorMessage } from "@/lib/stripe.server";
import {
  getProduct,
  COLLECTION_PRICE_ID,
  resolveKitSelection,
} from "@/lib/products-catalog";
import { signDownloadToken } from "@/lib/download-token.server";
import { enqueueTransactionalEmail } from "@/lib/email/enqueue.server";
import { settleGiftReservation } from "@/utils/cadeaux.functions";

function buildDownloadUrl(priceId: string, email: string): string {
  const token = signDownloadToken({ priceId, email });
  return `/api/public/download-pdf?token=${encodeURIComponent(token)}`;
}

const FALLBACK_SITE_ORIGIN = "https://www.hp-outils.com";

// Trusted site origin from server-side env. Never derived from request
// headers (Origin/Referer can be forged by clients). If the runtime secret is
// malformed in preview, fall back to the canonical app URL instead of crashing
// checkout. Exportée pour la fonction serveur du panier (même origine de
// confiance, une seule source).
export function getTrustedSiteOrigin(): string {
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

// « Offrir » (lot 28 oct. 2026) : même règle que pour les tomes —
// courriel destinataire facultatif, validé ici, jamais de débit sans
// destinataire valide quand la case est cochée.
function validGiftEmail(giftTo: unknown): string | undefined {
  if (giftTo === undefined || giftTo === null || giftTo === "") return undefined;
  if (typeof giftTo !== "string" || giftTo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(giftTo)) {
    throw new Error("Courriel du destinataire invalide");
  }
  return giftTo.toLowerCase();
}

function resolveGiftRecipient(session: any, payerEmail: string): { deliveryEmail: string; isGift: boolean } {
  const raw = session?.metadata?.gift_to;
  if (typeof raw === "string" && raw.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) {
    const giftTo = raw.toLowerCase();
    if (giftTo !== payerEmail.toLowerCase()) {
      return { deliveryEmail: giftTo, isGift: true };
    }
  }
  return { deliveryEmail: payerEmail, isGift: false };
}

export const createPdfCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: {
    priceId: string;
    environment: StripeEnv;
    kitSlugs?: string[];
    giftTo?: string;
  }) => {
    if (!/^[a-zA-Z0-9_-]+$/.test(data.priceId)) throw new Error("Invalid priceId");
    const product = getProduct(data.priceId);
    if (!product) throw new Error("Unknown product");
    // Achat suspendu (ex. prix affiché abaissé avant que le prix Stripe
    // correspondant existe) : aucune session ne peut être créée, même
    // via une requête forgée — jamais de paiement à l'ancien prix.
    if (product.purchaseHold) throw new Error("Achat suspendu pour ce produit");
    if (data.kitSlugs !== undefined) {
      // La sélection de kits n'a de sens que pour le bundle, et elle doit
      // être complète et valide (exactement 10 kits Sans Honte, uniques).
      if (data.priceId !== COLLECTION_PRICE_ID) {
        throw new Error("Sélection de kits invalide");
      }
      if (!resolveKitSelection(data.kitSlugs)) {
        throw new Error("Sélection de kits invalide");
      }
    }
    return { ...data, giftTo: validGiftEmail(data.giftTo) };
  })
  .handler(async ({ data }) => {
    try {
      const stripe = createStripeClient(data.environment);

      const prices = await stripe.prices.list({ lookup_keys: [data.priceId] });
      if (!prices.data.length) throw new Error("Price not found");
      const stripePrice = prices.data[0];

      // Build return_url from a trusted server-side SITE_URL secret so it
      // cannot be redirected to an attacker-controlled domain via a forged
      // Origin/Referer header.
      const returnUrl = `${getTrustedSiteOrigin()}/checkout/return?session_id={CHECKOUT_SESSION_ID}`;

      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: stripePrice.id, quantity: 1 }],
        mode: "payment",
        ui_mode: "embedded_page",
        return_url: returnUrl,
        // Stripe Tax calcule TPS/TVQ à partir de l'adresse de facturation.
        // Tous les produits doivent avoir un tax_code (txcd_10000000 — biens
        // numériques) — voir scripts/setup-tax-codes.functions.ts.
        automatic_tax: { enabled: true },
        billing_address_collection: "required",
        // « Offrir » : le destinataire voyage dans la métadonnée, jamais
        // dans un montant. La livraison (page de retour + webhook) le relit.
        metadata: {
          priceId: data.priceId,
          ...(data.kitSlugs ? { kitSlugs: data.kitSlugs.join(",") } : {}),
          ...(data.giftTo ? { gift_to: data.giftTo } : {}),
        },
      });

      return { clientSecret: session.client_secret ?? "" };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });

export const fulfillPdfOrder = createServerFn({ method: "POST" })
  .inputValidator((data: { sessionId: string; environment: StripeEnv }) => {
    if (!/^cs_[a-zA-Z0-9_]+$/.test(data.sessionId)) throw new Error("Invalid sessionId");
    return data;
  })
  .handler(async ({ data }) => {
    // Le préfixe de l'ID de session est la source de vérité : `cs_test_*` =
    // sandbox, sinon live. Cela évite les erreurs "No such checkout.session"
    // quand la page de retour s'ouvre sur le site publié (live) alors que la
    // session a été créée en sandbox (preview).
    const env: StripeEnv = data.sessionId.startsWith("cs_test_") ? "sandbox" : "live";
    const stripe = createStripeClient(env);
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

    // « Offrir » : la livraison va au destinataire, la facture reste chez
    // le payeur (lignes de commande : customer_email = payeur, inchangé
    // ci-dessous). Le jeton de téléchargement est signé avec le courriel
    // du destinataire, sinon le destinataire ne pourrait pas télécharger.
    const { deliveryEmail, isGift } = resolveGiftRecipient(session as any, email);
    const giftEmail = isGift ? deliveryEmail : null;

    // Enregistrement best-effort du destinataire (migration
    // 20261028_gift_recipient_email.sql) : il sert à la récupération par
    // le destinataire. Si la colonne n'existe pas encore, on journalise
    // et on continue — la livraison ne doit jamais en dépendre.
    async function recordGiftRecipient(admin: any) {
      if (!isGift) return;
      const { error } = await admin
        .from("orders")
        .update({ gift_recipient_email: deliveryEmail })
        .eq("stripe_session_id", session.id);
      if (error) {
        console.warn("gift_recipient_email not recorded (migration pending?)", error.message);
      }
    }

    // PANIER D'ACHAT : la session porte metadata.cart === "1". On livre
    // TOUS les articles, une ligne de commande par article, un seul
    // courriel avec un lien par article. Sans cette branche, un client
    // paierait plusieurs fichiers et n'en recevrait qu'un (l'ancien code
    // ne lisait que line_items[0]).
    if (session.metadata?.cart === "1") {
      const admin = getAdmin();
      const rows: Array<{
        priceId: string;
        productId: string;
        amount: number;
        pdfPath: string | null;
        title: string | null;
      }> = [];
      for (const li of session.line_items?.data ?? []) {
        const price = li?.price;
        const priceId =
          (price?.lookup_key as string | null) ||
          (price?.metadata?.lovable_external_id as string | undefined) ||
          (price?.id ?? "unknown");
        const productId =
          typeof price?.product === "string"
            ? price.product
            : ((price?.product as { id?: string } | null)?.id ?? "unknown");
        const product = getProduct(priceId);
        rows.push({
          priceId,
          productId,
          amount: typeof li?.amount_total === "number" ? li.amount_total : 0,
          pdfPath: product?.pdfPath ?? null,
          title: product?.title ?? null,
        });
      }

      // onConflict composite : exige la migration
      // 20261024_cart_orders.sql, appliquée AVANT la republication du code
      // (l'ancienne contrainte UNIQUE sur stripe_session_id seul interdit
      // deux lignes pour une même session).
      for (const row of rows) {
        const { error: upsertErr } = await admin.from("orders").upsert(
          {
            stripe_session_id: session.id,
            stripe_payment_intent_id:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : null,
            customer_email: email,
            product_id: row.productId,
            price_id: row.priceId,
            amount_total: row.amount,
            currency: session.currency ?? "cad",
            status: "paid",
            pdf_path: row.pdfPath,
            environment: env,
          },
          { onConflict: "stripe_session_id,price_id" },
        );
        if (upsertErr) {
          console.error("cart orders upsert failed", upsertErr);
          throw new Error("Database error");
        }
      }

      // Bon cadeau partiel : débite la réservation attachée à cette session
      // (idempotent : si la réservation est déjà à zéro, rien n'est débité
      // deux fois). Sans ce débit, un paiement partiel laisserait le solde
      // réservé puis disponible à nouveau.
      if (session.metadata?.giftRef) {
        const discountCents =
          typeof (session as { total_details?: { amount_discount?: number } })
            .total_details?.amount_discount === "number"
            ? (session.total_details as { amount_discount: number }).amount_discount
            : 0;
        await settleGiftReservation(session.id, discountCents);
      }

      await recordGiftRecipient(admin);

      const deliverable = rows.filter((r) => r.pdfPath && r.title);
      if (deliveryEmail && deliverable.length > 0) {
        const siteOrigin = getTrustedSiteOrigin();
        const items = deliverable.map((r) => ({
          title: r.title as string,
          downloadUrl: buildDownloadUrl(r.priceId, deliveryEmail),
        }));
        await enqueueTransactionalEmail({
          templateName: "purchase-delivery",
          recipientEmail: deliveryEmail,
          idempotencyKey: `delivery-${session.id}`,
          templateData: {
            title: "Ton panier HP Outils",
            siteOrigin,
            items,
            isGift,
          },
        });
      }

      return {
        status: "paid" as const,
        email,
        giftEmail,
        isGift,
        message:
          deliverable.length === rows.length
            ? null
            : "Votre paiement est confirmé. Un fichier sera disponible sous peu — nous vous contacterons.",
        itemCount: deliverable.length,
      };
    }

    const lineItem = session.line_items?.data?.[0];
    const price = lineItem?.price;
    const priceId =
      (price?.lookup_key as string | null) ||
      (price?.metadata?.lovable_external_id as string | undefined) ||
      (price?.id ?? "unknown");
    const productId =
      typeof price?.product === "string" ? price.product : (price?.product as any)?.id ?? "unknown";

    const product = getProduct(priceId);
    const pdfPath = product?.pdfPath ?? null;

    // Bundle « Choisis 10 kits parmi 15 » : la sélection voyage dans les
    // métadonnées de la session Stripe. On la revalide ici avant de livrer ;
    // si elle est absente ou invalide, on retombe sur la livraison standard
    // (le PDF de la collection), comme avant.
    const kitSlugsRaw =
      typeof session.metadata?.kitSlugs === "string"
        ? session.metadata.kitSlugs
        : "";
    const kitSlugs = kitSlugsRaw ? kitSlugsRaw.split(",").filter(Boolean) : [];
    const bundleKits =
      priceId === COLLECTION_PRICE_ID && kitSlugs.length > 0
        ? resolveKitSelection(kitSlugs)
        : null;
    if (priceId === COLLECTION_PRICE_ID && kitSlugs.length > 0 && !bundleKits) {
      console.error("bundle selection invalid for session", session.id);
    }

    const admin = getAdmin();

    // Upsert order (idempotent). Conflit composite (session + prix) :
    // même clé que la branche panier — exige la migration
    // 20261024_cart_orders.sql avant la republication du code.
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
        pdf_path: pdfPath,
        environment: env,
      },
      { onConflict: "stripe_session_id,price_id" },
    );
    if (upsertErr) {
      console.error("orders upsert failed", upsertErr);
      throw new Error("Database error");
    }

    await recordGiftRecipient(admin);

    if (bundleKits) {
      // Mémoriser le choix pour la récupération d'achat. Best-effort : la
      // colonne kit_slugs est ajoutée par la migration
      // 20261022_bundle_kit_slugs.sql ; si elle n'existe pas encore,
      // l'update échoue sans bloquer la livraison.
      const { error: ksErr } = await admin
        .from("orders")
        .update({ kit_slugs: kitSlugs.join(",") })
        .eq("stripe_session_id", session.id);
      if (ksErr) {
        console.warn("kit_slugs not recorded (migration pending?)", ksErr.message);
      }
    }

    if (!product) {
      return {
        status: "paid" as const,
        email,
        giftEmail,
        isGift,
        message:
          "Votre paiement est confirmé. Le fichier sera disponible sous peu — nous vous contacterons.",
        itemCount: 1,
      };
    }

    // Send the signed download link by email (never expose it in the HTTP
    // response body or page DOM). Idempotency key is per-session so retries
    // of /checkout/return don't enqueue duplicates.
    if (deliveryEmail && pdfPath) {
      const siteOrigin = getTrustedSiteOrigin();
      if (bundleKits) {
        // Livraison du bundle : un lien signé par kit choisi. Les liens
        // voyagent en chemin relatif ; le gabarit préfixe l'origine du site
        // (même convention que la récupération d'achat).
        const items = bundleKits.map((kp) => ({
          title: kp.title,
          downloadUrl: buildDownloadUrl(kp.priceId, deliveryEmail),
        }));
        await enqueueTransactionalEmail({
          templateName: "purchase-delivery",
          recipientEmail: deliveryEmail,
          idempotencyKey: `delivery-${session.id}`,
          templateData: {
            title: product.title,
            siteOrigin,
            items,
            isGift,
          },
        });
      } else {
        const downloadUrl = buildDownloadUrl(priceId, deliveryEmail);
        await enqueueTransactionalEmail({
          templateName: "purchase-delivery",
          recipientEmail: deliveryEmail,
          idempotencyKey: `delivery-${session.id}`,
          templateData: {
            title: product.title,
            downloadUrl,
            siteOrigin,
            isGift,
          },
        });
      }
    }

    return {
      status: "paid" as const,
      email,
      giftEmail,
      isGift,
      message: null as string | null,
      itemCount: 1,
    };
  });

// Récupération de commandes par courriel (page /recuperer-achat).
// Retourne la liste des achats payés et un lien signé frais pour chacun.
export const recoverOrdersByEmail = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; environment: StripeEnv }) => {
    const email = data.email?.trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Courriel invalide");
    }
    if (email.length > 254) throw new Error("Courriel invalide");
    return { email, environment: data.environment };
  })
  .handler(async ({ data }) => {
    const admin = getAdmin();

    // Rate-limit: 5 attempts/hour per email or per IP.
    const ip =
      getRequestHeader("cf-connecting-ip") ||
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
      null;
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: emailCount } = await admin
      .from("recovery_attempts")
      .select("id", { count: "exact", head: true })
      .eq("email", data.email)
      .gte("created_at", oneHourAgo);
    const { count: ipCount } = ip
      ? await admin
          .from("recovery_attempts")
          .select("id", { count: "exact", head: true })
          .eq("ip", ip)
          .gte("created_at", oneHourAgo)
      : { count: 0 };
    if ((emailCount ?? 0) >= 5 || (ipCount ?? 0) >= 5) {
      // Neutral response — don't reveal rate-limit state.
      return { ok: true as const };
    }
    await admin.from("recovery_attempts").insert({ email: data.email, ip });

    // Trusted site origin for absolute download links in the recovery email.
    const siteOrigin = getTrustedSiteOrigin();

    // Escape LIKE metacharacters to prevent wildcard matching via user input.
    const escapedEmail = data.email.replace(/([\\%_])/g, "\\$1");
    const { data: orders, error } = await admin
      .from("orders")
      .select("id, price_id, pdf_path, created_at, status")
      .ilike("customer_email", escapedEmail)
      .eq("status", "paid")
      .eq("environment", data.environment)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("recover lookup error", error);
      // Stay neutral on errors.
      return { ok: true as const };
    }

    // « Offrir » : le destinataire peut aussi récupérer son cadeau avec
    // son propre courriel (migration 20261028_gift_recipient_email.sql).
    // Best-effort : si la colonne n'existe pas encore, on ignore l'erreur
    // et on continue — la récupération du payeur reste inchangée.
    const seenIds = new Set((orders ?? []).map((o) => o.id as string));
    const { data: giftOrders, error: giftErr } = await admin
      .from("orders")
      .select("id, price_id, pdf_path, created_at, status")
      .ilike("gift_recipient_email", escapedEmail)
      .eq("status", "paid")
      .eq("environment", data.environment)
      .order("created_at", { ascending: false });
    if (!giftErr && giftOrders && Array.isArray(orders)) {
      for (const o of giftOrders as typeof orders) {
        if (o && !seenIds.has(o.id as string)) {
          seenIds.add(o.id as string);
          (orders as unknown[]).push(o);
        }
      }
    }

    // Choix de kits des commandes bundle, relus en best-effort (colonne
    // kit_slugs ajoutée par migration ; si elle n'existe pas encore, la
    // requête échoue et on retombe sur le lien de la collection).
    const kitSlugsByOrder = new Map<string, string[]>();
    const orderIds = (orders ?? []).map((o) => o.id as string);
    if (orderIds.length > 0) {
      const { data: ksRows, error: ksErr } = await admin
        .from("orders")
        .select("id, kit_slugs")
        .in("id", orderIds);
      if (!ksErr && ksRows) {
        for (const row of ksRows as Array<{
          id: string;
          kit_slugs?: string | null;
        }>) {
          if (typeof row.kit_slugs === "string" && row.kit_slugs) {
            kitSlugsByOrder.set(
              row.id,
              row.kit_slugs.split(",").filter(Boolean),
            );
          }
        }
      }
    }

    const items: Array<{
      orderId: string;
      title: string;
      downloadUrl: string | null;
      purchasedAt: string;
    }> = [];

    for (const o of orders ?? []) {
      const product = getProduct(o.price_id);
      if (!product || !o.pdf_path) continue;
      const slugs = kitSlugsByOrder.get(o.id as string);
      const kits =
        o.price_id === COLLECTION_PRICE_ID && slugs
          ? resolveKitSelection(slugs)
          : null;
      if (kits) {
        for (const kp of kits) {
          items.push({
            orderId: o.id as string,
            title: kp.title,
            downloadUrl: buildDownloadUrl(kp.priceId, data.email),
            purchasedAt: o.created_at as string,
          });
        }
      } else {
        items.push({
          orderId: o.id as string,
          title: product.title,
          downloadUrl: buildDownloadUrl(o.price_id, data.email),
          purchasedAt: o.created_at as string,
        });
      }
    }

    // Only send an email if we actually found purchases. The page always
    // shows the same neutral message regardless, so an attacker can't
    // distinguish hits from misses by the response.
    if (items.length > 0) {
      await enqueueTransactionalEmail({
        templateName: "purchase-recovery",
        recipientEmail: data.email,
        idempotencyKey: `recover-${data.email}-${Date.now()}`,
        templateData: { items, siteOrigin },
      });
    }

    return { ok: true as const };
  });