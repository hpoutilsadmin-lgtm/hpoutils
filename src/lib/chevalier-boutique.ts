// Boutique Chevalier — catalogue source unique des paquets de pierres.
//
// Contexte (tête 86a8a073, 24 oct. 2026) :
// - Le jeu (public/apps/chevalier-du-fleuve/chevalier-du-fleuve-v1.4.html)
//   possède déjà sa boutique en jeu (CDF_SHOP), avec priceId: null, donc
//   « Bientôt en vente ». La sauvegarde du jeu est locale au navigateur
//   (localStorage, clé cdf_save_v1), sans compte, sans serveur.
// - Décision du 24 oct. 2026 : prix 2,99 $ / 4,99 $ / 8,99 $ / 19,99 $
//   (remplacent 4,99 / 8,99 / 20,99 / 39,99). Les quantités de pierres et
//   les bonus sont REPRIS tels quels du jeu v1.3 (60 / 140 / 340 / 750 ;
//   rare / épique / légendaire) — aucun nouveau chiffre inventé. Le prix
//   change, la valeur en pierres ne change pas : à confirmer au moment
//   de l'activation (voir CHEVALIER_VENTE_ACTIVE).
// - Les paquets ne passent PAS par le panier : ce ne sont pas des PDF
//   (la validation du panier exige un produit du catalogue PDF). Ils ont
//   leur caisse dédiée (src/utils/chevalier.functions.ts) et leur page
//   (/boutique-chevalier).
//
// PORTE FERMÉE PAR DÉFAUT — ne pas activer sans les 3 conditions :
//  1) les 4 prix Stripe existent (liste dans le rapport de construction) ;
//  2) la livraison est validée (crédit vérifié côté serveur + écriture
//     locale, même appareil/navigateur que le jeu — voir la page) ;
//  3) les quantités de pierres face aux nouveaux prix sont confirmées.
// Tant que ce drapeau est false, la page n'affiche aucun bouton d'achat
// ET la fonction serveur rejette toute demande, même forgée. Aucun
// paiement ne peut partir dans le vide.
export const CHEVALIER_VENTE_ACTIVE = true;

/** Clé localStorage de la sauvegarde du jeu — identique au jeu v1.3. */
export const CHEVALIER_SAVE_KEY = "cdf_save_v1";

export interface ChevalierPack {
  /** Identifiant du jeu (CDF_SHOP) — inchangé. */
  id: string;
  nom: string;
  /** Prix décidé le 24 oct. 2026, en $ CAD, aucune taxe ajoutée. */
  prixCad: number;
  /** Même prix, en cents, pour la vérification Stripe. */
  prixCents: number;
  /** Pierres créditées — repris du jeu v1.3, inchangé. */
  gems: number;
  /** Rareté de l'équipement offert — repris du jeu v1.3 (null = aucun). */
  bonusRar: number | null;
  /** lookup_key Stripe à créer chez Mélanie (voir rapport). */
  lookupKey: string;
}

export const CHEVALIER_PACKS: ChevalierPack[] = [
  { id: "eclats", nom: "Éclats du fleuve", prixCad: 2.99, prixCents: 299, gems: 60, bonusRar: null, lookupKey: "chevalier_eclats_299" },
  { id: "filon", nom: "Filon de la berge", prixCad: 4.99, prixCents: 499, gems: 140, bonusRar: 2, lookupKey: "chevalier_filon_499" },
  { id: "veine", nom: "Veine des Rois", prixCad: 8.99, prixCents: 899, gems: 340, bonusRar: 3, lookupKey: "chevalier_veine_899" },
  { id: "tresor", nom: "Trésor des terriers", prixCad: 19.99, prixCents: 1999, gems: 750, bonusRar: 4, lookupKey: "chevalier_tresor_1999" },
];

export function getChevalierPack(id: unknown): ChevalierPack | null {
  if (typeof id !== "string") return null;
  return CHEVALIER_PACKS.find((p) => p.id === id) ?? null;
}

export function getChevalierPackByLookupKey(key: unknown): ChevalierPack | null {
  if (typeof key !== "string") return null;
  return CHEVALIER_PACKS.find((p) => p.lookupKey === key) ?? null;
}

/** « 2,99 $ CAD » — virgule française, comme sur /prix. */
export function formatChevalierPrix(pack: ChevalierPack): string {
  return `${pack.prixCad.toFixed(2).replace(".", ",")} $ CAD`;
}

/** Libellé du bonus, même échelle que le jeu (2 = rare, 3 = épique, 4 = légendaire). */
export function bonusChevalierLabel(rar: number | null): string | null {
  if (rar === null) return null;
  return ["", "commun", "rare", "épique", "légendaire"][rar] ?? null;
}

/** Même forme que les sessions Stripe vérifiées ailleurs (cs_test_… / cs_live_…). */
export const CHEVALIER_SESSION_ID_RE = /^cs_[a-zA-Z0-9_]+$/;

export function isValidChevalierSessionId(value: unknown): boolean {
  return typeof value === "string" && CHEVALIER_SESSION_ID_RE.test(value);
}

/**
 * Forme minimale de la sauvegarde du jeu, côté page boutique. Seuls les
 * champs touchés par le crédit sont typés ; le reste de la sauvegarde
 * est recopié tel quel (jamais effacé, jamais réinterprété).
 */
export interface ChevalierSaveLike {
  gems: number;
  creditsChevalier?: unknown;
  bonusChevalierEnAttente?: unknown;
  [key: string]: unknown;
}

export interface CreditChevalierResult {
  save: ChevalierSaveLike;
  dejaCredite: boolean;
  pack: ChevalierPack;
}

/**
 * Crédit pur et testable, sans DOM ni réseau.
 *
 * Règles :
 * - paquet inconnu ou session invalide → erreur (jamais de crédit aveugle) ;
 * - session déjà créditée (idempotence locale) → sauvegarde inchangée,
 *   dejaCredite: true — recharger la page de merci ne re-crédite pas ;
 * - sinon : pierres ajoutées, session mémorisée, bonus éventuel mis en
 *   attente (le jeu l'applique au héros choisi quand l'armurerie s'ouvre,
 *   avec sa règle actuelle : premier rayon sous la rareté — le héros
 *   choisi n'est pas persisté dans la sauvegarde, donc la page boutique
 *   ne peut pas l'appliquer elle-même) ;
 * - la sauvegarde d'entrée n'est jamais mutée (nouvel objet retourné).
 */
export function appliquerCreditChevalier(
  save: ChevalierSaveLike,
  packId: unknown,
  sessionId: unknown,
): CreditChevalierResult {
  const pack = getChevalierPack(packId);
  if (!pack) throw new Error("Paquet Chevalier introuvable");
  if (!isValidChevalierSessionId(sessionId)) {
    throw new Error("Identifiant de session invalide");
  }
  if (typeof save !== "object" || save === null) {
    throw new Error("Sauvegarde Chevalier illisible");
  }
  if (typeof save.gems !== "number" || !Number.isFinite(save.gems)) {
    throw new Error("Sauvegarde Chevalier illisible");
  }
  const credits: string[] = Array.isArray(save.creditsChevalier)
    ? save.creditsChevalier.filter((c): c is string => typeof c === "string")
    : [];
  if (credits.includes(sessionId as string)) {
    return { save, dejaCredite: true, pack };
  }
  const enAttente: number[] = Array.isArray(save.bonusChevalierEnAttente)
    ? save.bonusChevalierEnAttente.filter((n): n is number => typeof n === "number")
    : [];
  if (pack.bonusRar !== null) enAttente.push(pack.bonusRar);
  return {
    save: {
      ...save,
      gems: save.gems + pack.gems,
      creditsChevalier: [...credits, sessionId as string],
      bonusChevalierEnAttente: enAttente,
    },
    dejaCredite: false,
    pack,
  };
}
