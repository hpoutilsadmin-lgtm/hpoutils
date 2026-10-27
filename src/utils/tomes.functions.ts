// Fonctions serveur « À toi l'histoire » — même motif que le panier v1 et
// le flux PDF : fonctions serveur TanStack Start, prix résolus côté serveur
// par lookup_key, jamais un montant venu du client.
//
// La page de retour (/lire/merci) et le webhook appellent la même création
// de jetons, idempotente par session Stripe : si le webhook a déjà livré,
// la page de retour le signale sans renvoyer de doublon.

import { createServerFn } from "@tanstack/react-start";
import {
  type StripeEnv,
  createStripeClient,
  getStripeErrorMessage,
} from "@/lib/stripe.server";
import { enqueueTransactionalEmail } from "@/lib/email/enqueue.server";

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

export const createTomeCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { kind: "tome"; slug: string; environment: StripeEnv } | { kind: "bundle"; tomes: string[]; environment: StripeEnv }) => {
      if (data.environment !== "sandbox" && data.environment !== "live") {
        throw new Error("Environnement invalide");
      }
      if (data.kind === "tome") {
        const tome = getTomeBySlug(data.slug);
        if (!tome || !tome.lookupKey) throw new Error("Tome introuvable");
        return { kind: "tome" as const, slugs: [tome.slug], lookupKeys: [tome.lookupKey], environment: data.environment };
      }
      if (data.kind === "bundle") {
        const slugs = validateBundleChoice(data.tomes);
        return { kind: "bundle" as const, slugs, lookupKeys: [BUNDLE.lookupKey], environment: data.environment };
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
        ui_mode: "hosted_page",
        success_url: `${origin}/lire/merci?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/lire/`,
        automatic_tax: { enabled: true },
        billing_address_collection: "required",
        metadata: { kind: "tome", tomes: data.slugs.join(",") },
      });
      return { checkoutUrl: session.url ?? "" };
    } catch (e) {
      throw new Error(getStripeErrorMessage(e));
    }
  });

export const requestFreeTomeLink = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string }) => ({ email: validEmail(data.email) }))
  .handler(async ({ data }) => {
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

export const fulfillTomeOrder = createServerFn({ method: "POST" })
  .inputValidator((data: { sessionId: string }) => {
    if (!/^cs_[a-zA-Z0-9_]+$/.test(data.sessionId)) throw new Error("Invalid sessionId");
    return data;
  })
  .handler(async ({ data }) => {
    // Le préfixe de l'ID de session est la source de vérité (comme le flux
    // PDF) : `cs_test_*` = sandbox, sinon live.
    const env: StripeEnv = data.sessionId.startsWith("cs_test_") ? "sandbox" : "live";
    const stripe = createStripeClient(env);
    const session = await stripe.checkout.sessions.retrieve(data.sessionId, {
      expand: ["line_items", "line_items.data.price"],
    });
    if (session.payment_status !== "paid") {
      return { status: "pending" as const };
    }
    if (!isTomeSession(session as any)) {
      return { status: "not-tome" as const };
    }
    const email =
      session.customer_details?.email || (session.customer_email as string | null) || "";
    const slugs = resolveTomeSlugsForSession(session as any);
    if (!email || slugs.length === 0) {
      return { status: "error" as const, message: "Commande introuvable" };
    }
    const created = await createTomeTokensForSession({
      sessionId: session.id,
      email,
      slugs,
      environment: env,
    });
    const fresh = created.filter((c) => c.token !== null);
    if (fresh.length > 0) {
      await enqueueTransactionalEmail({
        templateName: "tome-delivery",
        recipientEmail: email,
        idempotencyKey: `tome-delivery-${session.id}`,
        templateData: {
          title: "À toi l'histoire",
          items: fresh.map((c) => ({ title: c.tome.title, readerUrl: readerUrl(c.token!) })),
          siteOrigin: getTrustedSiteOrigin(),
        },
      });
      return {
        status: "paid" as const,
        email,
        links: fresh.map((c) => ({ slug: c.tome.slug, title: c.tome.title, url: readerUrl(c.token!) })),
      };
    }
    // Déjà livré par le webhook : pas de doublon, les liens sont en courriel.
    return { status: "delivered" as const, email };
  });

export const recoverTomeLinks = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string }) => ({ email: validEmail(data.email) }))
  .handler(async ({ data }) => {
    // Réponse neutre : on ne révèle jamais si le courriel a des achats.
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
