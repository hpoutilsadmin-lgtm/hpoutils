// Logique pure « À toi l'histoire » — sans Stripe, sans Supabase, sans
// base. Testée en machine (tests/tomes-tests.mjs) : résolution des tomes
// d'une session, aiguillage webhook, jetons (génération + empreinte).

import * as crypto from "node:crypto";
import {
  BUNDLE,
  getTomeBySlug,
  getTomeByLookupKey,
  isBundleLookupKey,
  validateBundleChoice,
} from "./tomes-catalog";

const BUNDLE_COUNT = BUNDLE.count;

export function generateTomeToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function hashTomeToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function readerUrl(token: string): string {
  return `/lire/${token}`;
}

export interface StripeSessionLike {
  id: string;
  metadata?: Record<string, string | undefined> | null;
  line_items?: { data?: Array<{ price?: { lookup_key?: string | null } | null }> } | null;
}

/**
 * Résout les slugs de tomes d'une session Stripe.
 * Ordre : metadata.kind === 'tome' + metadata.tomes (liste virgules),
 * sinon repli sur les lookup_keys des lignes (tome seul, ou bundle +
 * metadata.tomes choisis). Renvoie [] si rien de reconnaissable.
 */
export function resolveTomeSlugsForSession(session: StripeSessionLike): string[] {
  const meta = session.metadata ?? {};
  if (meta.kind === "tome" && typeof meta.tomes === "string") {
    const slugs = meta.tomes.split(",").map((s) => s.trim()).filter(Boolean);
    if (slugs.length === BUNDLE_COUNT) {
      try {
        return validateBundleChoice(slugs);
      } catch {
        return [];
      }
    }
    return [...new Set(slugs.filter((s) => {
      const tome = getTomeBySlug(s);
      return tome && tome.slug !== "chasse_galerie";
    }))];
  }
  if (meta.kind === "tome" && typeof meta.tome === "string") {
    const tome = getTomeBySlug(meta.tome);
    return tome && tome.slug !== "chasse_galerie" ? [tome.slug] : [];
  }
  const keys = (session.line_items?.data ?? [])
    .map((li) => li?.price?.lookup_key)
    .filter((k): k is string => !!k);
  if (keys.some(isBundleLookupKey)) {
    if (typeof meta.tomes === "string") {
      try {
        return validateBundleChoice(
          meta.tomes.split(",").map((s) => s.trim()).filter(Boolean),
        );
      } catch {
        return [];
      }
    }
    return [];
  }
  const slugs: string[] = [];
  for (const key of keys) {
    const tome = getTomeByLookupKey(key);
    if (tome) slugs.push(tome.slug);
  }
  return [...new Set(slugs)];
}

/** Décision d'aiguillage webhook : session tome ou non. */
export function isTomeSession(session: StripeSessionLike): boolean {
  if (session.metadata?.kind === "tome") return true;
  const keys = (session.line_items?.data ?? [])
    .map((li) => li?.price?.lookup_key)
    .filter((k): k is string => !!k);
  return keys.some((k) => isBundleLookupKey(k) || !!getTomeByLookupKey(k));
}
