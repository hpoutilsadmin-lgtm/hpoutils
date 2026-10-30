// Fonctions serveur « À toi l'histoire » — même motif que le panier v1 et
// le flux PDF : fonctions serveur TanStack Start, prix résolus côté serveur
// par lookup_key, jamais un montant venu du client.
//
// La page de retour (/lire/merci) et le webhook appellent la même création
// de jetons, idempotente par session Stripe : si le webhook a déjà livré,
// la page de retour le signale sans renvoyer de doublon.

import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import {
  type StripeEnv,
  createStripeClient,
  getStripeErrorMessage,
} from "@/lib/stripe.server";
import { enqueueTransactionalEmail } from "@/lib/email/enqueue.server";

let _tomeAdmin: any = null;
function getTomeAdmin() {
  if (!_tomeAdmin) {
    _tomeAdmin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }
  return _tomeAdmin;
}

// Limite de débit : 5 tentatives / heure par courriel ou par IP, même
// motif que recoverOrdersByEmail (table recovery_attempts, déjà en base).
// Sans elle, le tome gratuit et la récupération de tomes acceptaient un
// nombre illimité d'appels — un jeton + un courriel neufs à chaque appel.
// Réponse neutre quand la limite est atteinte : aucun jeton, aucun
// courriel, mais { ok: true }. En cas d'erreur base, on laisse passer
// (fail-open journalisé) pour ne pas couper un accès légitime sur une
// panne de la table.
async function tomeRateLimitExceeded(email: string): Promise<boolean> {
  try {
    const admin = getTomeAdmin();
    const ip =
      getRequestHeader("cf-connecting-ip") ||
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
      null;
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: emailCount } = await admin
      .from("recovery_attempts")
      .select("id", { count: "exact", head: true })
      .eq("email", email)
      .gte("created_at", oneHourAgo);
    const { count: ipCount } = ip
      ? await admin
          .from("recovery_attempts")
          .select("id", { count: "exact", head: true })
          .eq("ip", ip)
          .gte("created_at", oneHourAgo)
      : { count: 0 };
    if ((emailCount ?? 0) >= 5 || (ipCount ?? 0) >= 5) return true;
    await admin.from("recovery_attempts").insert({ email, ip });
    return false;
  } catch (e) {
    console.error("tome rate-limit check failed, allowing (fail-open)", e);
    return false;
  }
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
import {
  BUNDLE,
  getTomeBySlug,
  validateBundleChoice,
  type Tome,
} from "@/lib/tomes-catalog";
import {
  createFreeTomeToken,
  createTomeTokensForSession,
  getTomeAccessByToken,
  mintRecoveryTomeTokens,
  readerUrl,
  resolveTomeSlugsForSession,
  isTomeSession,
} from "@/lib/tomes-tokens.server";
import { getTomeTextByToken } from "@/lib/tomes-texts.server";

type StripeClient = ReturnType<typeof createStripeClient>;

// Stripe : prices.list n'accepte que 10 lookup_keys par appel.
async function resolveTomePriceIds(
  stripe: StripeClient,
  lookupKeys: string[],
): Promise<Map<string, string>> {
  const byKey = new Map<string, string>();
  for (let i = 0; i < lookupKeys.length; i += 10) {
    const page = await stripe.prices.list({ lookup_keys: lookupKeys.slice(i, i + 10) });
    for (const p of page.data) {
      if (p.lookup_key) byKey.set(p.lookup_key, p.id);
    }
  }
  return byKey;
}

function validEmail(email: unknown): string {
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Courriel invalide");
  }
  return email.toLowerCase();
}

// « Offrir » (lot 28 oct. 2026, remplace les bons cadeaux oubliés) :
// courriel du destinataire, facultatif. Vide ou absent = achat pour soi.
// Un courriel invalide = erreur AVANT tout paiement, jamais de débit sans
// destinataire valide. La valeur est revalidée côté serveur à chaque usage
// (la métadonnée Stripe ne fait jamais foi seule).
function validGiftEmail(giftTo: unknown): string | undefined {
  if (giftTo === undefined || giftTo === null || giftTo === "") return undefined;
  if (typeof giftTo !== "string" || giftTo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(giftTo)) {
    throw new Error("Courriel du destinataire invalide");
  }
  return giftTo.toLowerCase();
}

// Destinataire effectif d'une session Stripe : la métadonnée gift_to si
// elle est bien formée, sinon le courriel du payeur. Si le destinataire
// est le payeur lui-même, on retombe sur le parcours normal (pas un cadeau).
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

export const createTomeCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { kind: "tome"; slug: string; environment: StripeEnv; giftTo?: string } | { kind: "bundle"; tomes: string[]; environment: StripeEnv; giftTo?: string }) => {
      if (data.environment !== "sandbox" && data.environment !== "live") {
        throw new Error("Environnement invalide");
      }
      const giftTo = validGiftEmail((data as { giftTo?: unknown }).giftTo);
      if (data.kind === "tome") {
        const tome = getTomeBySlug(data.slug);
        if (!tome || !tome.lookupKey) throw new Error("Tome introuvable");
        return { kind: "tome" as const, slugs: [tome.slug], lookupKeys: [tome.lookupKey], environment: data.environment, giftTo };
      }
      if (data.kind === "bundle") {
        const slugs = validateBundleChoice(data.tomes);
        return { kind: "bundle" as const, slugs, lookupKeys: [BUNDLE.lookupKey], environment: data.environment, giftTo };
      }
      throw new Error("Achat invalide");
    },
  )
  .handler(async ({ data }) => {
    try {
      // L'environnement vient de la page (comme le flux PDF) :
      // pk_live_* = live, sinon sandbox.
      const stripe = createStripeClient(data.environment);
      const resolved = await resolveTomePriceIds(stripe, data.lookupKeys);
      const priceId = resolved.get(data.lookupKeys[0]);
      if (!priceId) throw new Error("Prix introuvable pour ce tome");
      const origin = getTrustedSiteOrigin();
      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: priceId, quantity: 1 }],
        mode: "payment",
        allow_promotion_codes: true,
        ui_mode: "hosted_page",
        success_url: `${origin}/lire/merci?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/lire/?paiement=annule`,
        automatic_tax: { enabled: false },
        // Fusion tête+3K : cancel_url de 3K (message d'annulation tome) +
        // automatic_tax de la tête (false, correctif post-6423e10) — le
        // true côté 3K n'était que le contexte de son ancienne base.
        // [MEL-002 29 oct 2026] « auto » : Stripe n exige l adresse que si le paiement
        // l exige vraiment. À 0,00 $ (coupon 100 %), le champ ne bloque plus.
        billing_address_collection: "auto",
        // « Offrir » : le destinataire voyage dans la métadonnée, jamais
        // dans un montant. La livraison (page de retour + webhook) le relit.
        metadata: data.giftTo
          ? { kind: "tome", tomes: data.slugs.join(","), gift_to: data.giftTo }
          : { kind: "tome", tomes: data.slugs.join(",") },
      });
      return { checkoutUrl: session.url ?? "" };
    } catch (e) {
      throw new Error(getStripeErrorMessage(e));
    }
  });

export const requestFreeTomeLink = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string }) => ({ email: validEmail(data.email) }))
  .handler(async ({ data }) => {
    if (await tomeRateLimitExceeded(data.email)) return { ok: true };
    const { tome, token } = await createFreeTomeToken(data.email);
    await enqueueTransactionalEmail({
      templateName: "tome-delivery",
      recipientEmail: data.email,
      idempotencyKey: `tome-free-${data.email}-${Date.now()}`,
      templateData: {
        title: "À toi l'histoire",
        items: [{ title: tome.title, readerUrl: readerUrl(token) }],
        siteOrigin: getTrustedSiteOrigin(),
      },
    });
    return { ok: true };
  });

export const recoverTomeLinks = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string }) => ({ email: validEmail(data.email) }))
  .handler(async ({ data }) => {
    // Réponse neutre : on ne révèle jamais si le courriel a des achats.
    if (await tomeRateLimitExceeded(data.email)) return { ok: true };
    const fresh = await mintRecoveryTomeTokens(data.email);
    if (fresh.length > 0) {
      await enqueueTransactionalEmail({
        templateName: "tome-delivery",
        recipientEmail: data.email,
        idempotencyKey: `tome-recovery-${data.email}-${Date.now()}`,
        templateData: {
          title: "À toi l'histoire",
          items: fresh.map((c) => ({ title: c.tome.title, readerUrl: readerUrl(c.token) })),
          siteOrigin: getTrustedSiteOrigin(),
        },
      });
    }
    return { ok: true };
  });

export const getTomeAccess = createServerFn({ method: "GET" })
  .inputValidator((data: { token: string }) => {
    if (typeof data.token !== "string") throw new Error("Jeton invalide");
    return data;
  })
  .handler(async ({ data }) => {
    const access = await getTomeAccessByToken(data.token);
    if (!access) return { valid: false as const };
    const tome: Tome = access.tome;
    return {
      valid: true as const,
      tome: {
        slug: tome.slug,
        title: tome.title,
        description: tome.description,
        paragraphes: tome.paragraphes,
        fins: tome.fins,
        public: tome.public ?? null,
      },
    };
  });

/**
 * Texte complet derrière jeton. La validation a lieu côté serveur dans
 * `getTomeTextByToken` AVANT tout accès au texte : un jeton invalide,
 * révoqué, ou d'un autre tome ne renvoie jamais de texte. Le texte
 * servi est celui du tome désigné par la ligne de jeton en base.
 */
export const getTomeText = createServerFn({ method: "GET" })
  .inputValidator((data: { token: string }) => {
    if (typeof data.token !== "string") throw new Error("Jeton invalide");
    return data;
  })
  .handler(async ({ data }) => {
    const result = await getTomeTextByToken(data.token);
    if (!result) return { valid: false as const };
    const tome: Tome = result.tome;
    return {
      valid: true as const,
      tome: {
        slug: tome.slug,
        title: tome.title,
        description: tome.description,
        paragraphes: tome.paragraphes,
        fins: tome.fins,
        public: tome.public ?? null,
      },
      html: result.html,
    };
  });
