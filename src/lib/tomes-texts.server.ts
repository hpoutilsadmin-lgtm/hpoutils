// Textes complets « À toi l'histoire » — diffusion derrière jeton, jamais
// en accès libre.
//
// STOCKAGE — LIRE AVANT DE TOUCHER :
// - Les textes NE SONT PAS dans le paquet JS et JAMAIS sous `public/`.
//   La version précédente les empaquetait en `?raw` (106,8 Mo) et faisait
//   échouer `vite build` (mémoire épuisée, 2 tentatives). Ils vivent dans
//   le bucket Supabase Storage PRIVÉ `tomes-prives`, du MÊME projet
//   Supabase que la table `tome_tokens` : aucun nouveau compte, aucune
//   nouvelle clé — le serveur lit avec le client service-role déjà
//   configuré (`supabaseAdmin`, `SUPABASE_URL` +
//   `SUPABASE_SERVICE_ROLE_KEY`, serveur seulement).
// - Le bucket est PRIVÉ : aucune URL publique ne sert les fichiers. Le
//   code ne construit JAMAIS d'URL publique ni de lien signé (pas de
//   `getPublicUrl`, pas de `createSignedUrl`) : le serveur télécharge
//   l'objet et renvoie son contenu par la fonction serveur existante,
//   après validation du jeton uniquement. La clé service-role ne quitte
//   jamais le serveur.
// - Ordre impératif dans cette fonction : (1) valider le jeton brut par
//   son empreinte SHA-256 en base (`getTomeAccessByToken` : jeton
//   existant, non révoqué) ; (2) SEULEMENT ensuite télécharger le texte
//   du tome que la ligne de jeton désigne. Un jeton invalide → null. Un
//   jeton d'un autre tome → le texte de cet autre tome, jamais celui
//   demandé : le slug servi vient de la base, jamais de l'appelant.
// - Le tome gratuit suit la même règle : `createFreeTomeToken` insère
//   une ligne `chasse_galerie` en base, donc un jeton gratuit valide
//   sert le texte gratuit, et rien d'autre.
// - Les artefacts sont servis VERBATIM (copies byte-identiques des
//   fichiers sources, SHA-256 consignés dans RAPPORT.md). Aucune
//   réécriture de texte. Seules requêtes externes des artefacts : les
//   polices Google Fonts (9 tomes sur 12) ; images embarquées en
//   data:URI ; aucun appel réseau propre, aucun stockage sauf les fins
//   / sauvegardes locales de 2 tomes, protégées par try/catch côté
//   artefact.
// - Le texte est renvoyé au lecteur qui l'affiche dans un iframe
//   `sandbox="allow-scripts"` (sans `allow-same-origin` : les scripts
//   de l'artefact ne peuvent pas lire la page parente ni son URL, qui
//   contient le jeton).
//
// CRÉATION DU BUCKET (tableau de bord Supabase, par Mélanie — voir
// RAPPORT.md) : bucket `tomes-prives`, PRIVÉ (public OFF), même projet
// que `tome_tokens`, 12 objets nommés comme ci-dessous. Sans ce bucket,
// la fonction renvoie null (refus propre, pas de fuite).

import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { getTomeAccessByToken } from "@/lib/tomes-tokens.server";
import type { Tome } from "@/lib/tomes-catalog";

/**
 * Bucket Storage privé (même projet Supabase que `tome_tokens`).
 * Création par tableau de bord — voir RAPPORT.md. Le bucket reste
 * privé : aucun objet n'est servi par URL, même authentifiée.
 */
const TOMES_BUCKET = "tomes-prives";

/**
 * Liste blanche stricte : slug de catalogue → clé d'objet dans le
 * bucket. Aucun chemin construit depuis une entrée utilisateur : le
 * slug vient de la ligne de jeton en base, et doit exister dans cette
 * table. Les clés sont les noms des fichiers sources, sans dossier.
 */
const TOME_TEXT_OBJECTS: Record<string, string> = {
  mini_recits: "mini_recits.html",
  directeur: "directeur.html",
  gaia: "gaia.html",
  debout: "debout.html",
  contact: "contact.html",
  hiver_loup: "hiver_loup.html",
  voile: "voile.html",
  violence_conjugale: "violence_conjugale.html",
  halloween: "halloween.html",
  vague: "vague.html",
  bebe: "bebe.html",
  chasse_galerie: "chasse_galerie.html",
};

export const TOME_TEXT_SLUGS: string[] = Object.keys(TOME_TEXT_OBJECTS);

/**
 * Sert le texte complet d'un tome, si et seulement si le jeton brut
 * est valide pour CE tome. Renvoie null sinon (jeton invalide, révoqué,
 * tome sans texte branché, ou objet absent du bucket — ce dernier cas
 * ne doit pas arriver une fois le bucket rempli : la liste blanche
 * couvre les 12 slugs du catalogue).
 */
export async function getTomeTextByToken(
  token: string,
): Promise<{ tome: Tome; html: string } | null> {
  // ÉTAPE 1 — validation du jeton, avant tout accès au texte.
  const access = await getTomeAccessByToken(token);
  if (!access) return null;
  // ÉTAPE 2 — le slug servi est celui de la ligne de jeton, pas celui
  // que l'appelant aurait demandé.
  const objectKey = TOME_TEXT_OBJECTS[access.tome.slug];
  if (!objectKey) return null;
  // ÉTAPE 3 — téléchargement serveur seulement, depuis le bucket privé.
  // Aucune URL n'est construite ni renvoyée : seul le contenu part,
  // par la fonction serveur, vers le lecteur à iframe isolée.
  const { data, error } = await supabaseAdmin.storage
    .from(TOMES_BUCKET)
    .download(objectKey);
  if (error || !data) return null;
  const html = await data.text();
  if (!html) return null;
  return { tome: access.tome, html };
}
