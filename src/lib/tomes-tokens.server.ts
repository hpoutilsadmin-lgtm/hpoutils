// Jetons d'accès personnels « À toi l'histoire ».
//
// Un achat = un lien web personnel par tome : /lire/<jeton>.
// Le jeton brut n'est JAMAIS stocké : seule son empreinte SHA-256 est en
// base (table `tome_tokens`, migration 20261024_tome_tokens.sql). Une fuite
// de la base ne donne donc aucun lien utilisable.
//
// Idempotence : une session Stripe ne crée ses jetons qu'une fois
// (vérification par stripe_session_id avant insertion). Le webhook et la
// page de retour appellent la même création : si l'un a déjà créé, l'autre
// retrouve les jetons existants — aucun doublon, aucun courriel doublé
// (idempotency_key côté courriel aussi).
//
// Les jetons n'expirent pas : un tome acheté se relit. Ils sont
// révocables (remboursement) via revoked_at, et récupérables par courriel
// (fonction recoverTomeLinks).

import { createClient } from "@supabase/supabase-js";
import { getTomeBySlug, type Tome } from "@/lib/tomes-catalog";
// Logique pure (testée en machine) : génération, empreinte, résolution de
// session, aiguillage webhook. Ré-exportée pour les appelants.
export {
  generateTomeToken,
  hashTomeToken,
  readerUrl,
  resolveTomeSlugsForSession,
  isTomeSession,
  type StripeSessionLike,
} from "@/lib/tomes-session";
import {
  generateTomeToken,
  hashTomeToken,
} from "@/lib/tomes-session";

export interface TomeTokenRow {
  token_hash: string;
  tome_slug: string;
  customer_email: string;
  stripe_session_id: string;
  environment: string;
  created_at: string;
  revoked_at: string | null;
}

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

/**
 * Crée les jetons d'une session, une seule fois. Renvoie les jetons BRUTS
 * (à n'envoyer que par courriel au client, jamais à afficher en clair
 * ailleurs) avec leurs tomes. Si la session a déjà ses jetons, renvoie
 * les tomes existants SANS nouveaux bruts (on ne peut pas retrouver un
 * brut depuis son empreinte) : l'appelant doit alors renvoyer le courriel
 * d'origine ou inviter à la récupération par courriel.
 */
export async function createTomeTokensForSession(args: {
  sessionId: string;
  email: string;
  slugs: string[];
  environment: string;
}): Promise<Array<{ tome: Tome; token: string | null }>> {
  const supabase = getSupabase();
  const { data: existing } = await supabase
    .from("tome_tokens")
    .select("tome_slug")
    .eq("stripe_session_id", args.sessionId);
  if (existing && existing.length > 0) {
    return (existing as Array<{ tome_slug: string }>)
      .map((row) => {
        const tome = getTomeBySlug(row.tome_slug);
        return tome ? { tome, token: null } : null;
      })
      .filter((r): r is { tome: Tome; token: null } => !!r);
  }
  const created: Array<{ tome: Tome; token: string }> = [];
  for (const slug of [...new Set(args.slugs)]) {
    const tome = getTomeBySlug(slug);
    if (!tome || tome.slug === "chasse_galerie") continue;
    const token = generateTomeToken();
    const { error } = await supabase.from("tome_tokens").insert({
      token_hash: hashTomeToken(token),
      tome_slug: tome.slug,
      customer_email: args.email.toLowerCase(),
      stripe_session_id: args.sessionId,
      environment: args.environment,
    });
    if (error) {
      // Conflit d'empreinte (rejeu simultané) : on ignore, la ligne existe.
      if (!String(error.message ?? "").includes("duplicate")) throw error;
      continue;
    }
    created.push({ tome, token });
  }
  return created;
}

/** Accès lecteur : valide un jeton brut, renvoie le tome ou null. */
export async function getTomeAccessByToken(
  token: string,
): Promise<{ tome: Tome } | null> {
  if (typeof token !== "string" || !/^[a-f0-9]{64}$/.test(token)) return null;
  const supabase = getSupabase();
  const { data } = await supabase
    .from("tome_tokens")
    .select("tome_slug, revoked_at")
    .eq("token_hash", hashTomeToken(token))
    .is("revoked_at", null)
    .maybeSingle();
  if (!data) return null;
  const tome = getTomeBySlug(data.tome_slug);
  return tome ? { tome } : null;
}

/**
 * Récupération par courriel : on ne peut pas retrouver un jeton brut depuis
 * son empreinte — on en forge donc de nouveaux pour les tomes déjà achetés.
 * Les anciens liens restent valides : personne ne peut couper l'accès d'un
 * client en demandant une récupération à son adresse. Même principe que la
 * récupération PDF (« générer de nouveaux liens »). Renvoie les NOUVEAUX
 * liens bruts (à n'envoyer que par courriel), ou [] si aucun achat pour ce
 * courriel. Réponse neutre côté appelant : ne jamais révéler si le courriel
 * existe.
 */
export async function mintRecoveryTomeTokens(
  email: string,
): Promise<Array<{ tome: Tome; token: string }>> {
  const supabase = getSupabase();
  const normalized = email.toLowerCase();
  const { data } = await supabase
    .from("tome_tokens")
    .select("tome_slug, stripe_session_id")
    .eq("customer_email", normalized)
    .is("revoked_at", null);
  const rows = (data ?? []) as Array<{ tome_slug: string; stripe_session_id: string }>;
  const slugs = [...new Set(rows.map((r) => r.tome_slug))];
  if (slugs.length === 0) return [];
  const fresh: Array<{ tome: Tome; token: string }> = [];
  for (const slug of slugs) {
    const tome = getTomeBySlug(slug);
    if (!tome) continue;
    const token = generateTomeToken();
    const firstSession =
      rows.find((r) => r.tome_slug === slug)?.stripe_session_id ?? `recovery:${normalized}`;
    const { error } = await supabase.from("tome_tokens").insert({
      token_hash: hashTomeToken(token),
      tome_slug: slug,
      customer_email: normalized,
      stripe_session_id: firstSession,
      environment: "recovery",
    });
    if (error) continue;
    fresh.push({ tome, token });
  }
  return fresh;
}

/** Lien gratuit « La Chasse-Galerie » : forge un jeton sans paiement. */
export async function createFreeTomeToken(
  email: string,
): Promise<{ tome: Tome; token: string }> {
  const supabase = getSupabase();
  const tome = getTomeBySlug("chasse_galerie")!;
  const token = generateTomeToken();
  const { error } = await supabase.from("tome_tokens").insert({
    token_hash: hashTomeToken(token),
    tome_slug: tome.slug,
    customer_email: email.toLowerCase(),
    stripe_session_id: "free",
    environment: "free",
  });
  if (error) throw error;
  return { tome, token };
}

/** Remboursement : révoque les jetons des sessions d'un paiement. */
export async function revokeTomeTokensForPaymentIntent(
  paymentIntentId: string,
  environment: string,
): Promise<void> {
  const supabase = getSupabase();
  const { data: orders } = await supabase
    .from("orders")
    .select("stripe_session_id")
    .eq("stripe_payment_intent_id", paymentIntentId)
    .eq("environment", environment);
  const sessionIds = (orders ?? []).map((o: { stripe_session_id: string }) => o.stripe_session_id);
  if (sessionIds.length === 0) return;
  await supabase
    .from("tome_tokens")
    .update({ revoked_at: new Date().toISOString() })
    .in("stripe_session_id", sessionIds);
}
