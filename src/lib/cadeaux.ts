// Bons cadeaux HP Outils — logique pure, sans React, sans DOM, sans secret.
// Testable avec node. Les montants sont en cents CAD pour éviter les
// erreurs de flottants ; l'affichage convertit en dollars.
//
// Modèle choisi (simple et honnête, décision de construction du 24 oct. 2026,
// à confirmer par la direction si elle veut un autre modèle) :
// - Un bon = un code personnel, un solde. Le bon n'est PAS à usage unique :
//   il se dépense par tranches jusqu'à épuisement du solde.
// - Crédit partiel : si le solde est inférieur au total, le reste se paie
//   par Stripe ; si le solde couvre tout le total, aucun paiement Stripe.
// - Solde restant : après un achat partiel, le reste demeure sur le même code.
// - Aucune expiration en v1 (aucune décision d'expiration n'a été donnée).
// - Un seul paiement en cours par code : pendant qu'une session Stripe avec
//   bon est ouverte, le montant est réservé et le code refuse un second
//   paiement simultané. La réservation expire après 24 h (durée de vie
//   d'une session Stripe) et redevient alors disponible.
// - La validation et le débit ont lieu CÔTÉ SERVEUR uniquement
//   (src/utils/cadeaux.functions.ts). Ce fichier ne fait que le calcul et
//   le format ; il ne prouve jamais qu'un code est valable.

export interface GiftDenomination {
  /** lookup_key Stripe, à créer par Mélanie (même motif que les PDF : nom + montant). */
  lookupKey: string;
  /** Montant en dollars CAD. */
  amountCad: number;
  /** Montant en cents CAD. */
  amountCents: number;
  label: string;
}

/** Dénominations décidées le 24 oct. 2026. Prix en $ CAD, aucune taxe ajoutée. */
export const GIFT_DENOMINATIONS: GiftDenomination[] = [
  { lookupKey: "bon_cadeau_5", amountCad: 5, amountCents: 500, label: "5 $ CAD" },
  { lookupKey: "bon_cadeau_10", amountCad: 10, amountCents: 1000, label: "10 $ CAD" },
  { lookupKey: "bon_cadeau_20", amountCad: 20, amountCents: 2000, label: "20 $ CAD" },
  { lookupKey: "bon_cadeau_50", amountCad: 50, amountCents: 5000, label: "50 $ CAD" },
  { lookupKey: "bon_cadeau_100", amountCad: 100, amountCents: 10000, label: "100 $ CAD" },
];

export function getGiftDenomination(lookupKey: string): GiftDenomination | null {
  return GIFT_DENOMINATIONS.find((d) => d.lookupKey === lookupKey) ?? null;
}

// --- Format du code --------------------------------------------------------
// Format : HP-XXXX-XXXX-XXXX, 12 caractères, alphabet sans ambiguïté
// (pas de 0/O, pas de 1/I) pour une saisie au doigt sans erreur.

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export const GIFT_CODE_REGEX =
  /^HP-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{4}-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{4}-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{4}$/;

/** Génère un code. `randomBytes` est injecté (crypto serveur en prod, source
 *  déterministe en test) : cette fonction ne choisit jamais elle-même sa
 *  source d'aléa, pour rester testable et sans dépendance d'environnement. */
export function generateGiftCode(randomBytes: (n: number) => Uint8Array): string {
  const bytes = randomBytes(12);
  const chars = Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]);
  return `HP-${chars.slice(0, 4).join("")}-${chars.slice(4, 8).join("")}-${chars.slice(8, 12).join("")}`;
}

/** Normalise une saisie : espaces et tirets superflus retirés, casse haute.
 *  Retourne null si la forme reste invalide. */
export function normalizeGiftCode(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const cleaned = raw.toUpperCase().replace(/[\s-]/g, "");
  if (cleaned.length !== 14) return null; // "HP" + 12 caractères
  if (!cleaned.startsWith("HP")) return null;
  const body = cleaned.slice(2);
  if (!/^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{12}$/.test(body)) return null;
  return `HP-${body.slice(0, 4)}-${body.slice(4, 8)}-${body.slice(8, 12)}`;
}

export function isValidGiftCodeFormat(code: string): boolean {
  return GIFT_CODE_REGEX.test(code);
}

// --- Calcul du crédit ------------------------------------------------------

export interface GiftBalance {
  balanceCents: number;
  reservedCents: number;
  /** Fin de réservation (ms epoch) ou null si aucune réservation active. */
  reservedUntilMs: number | null;
}

export const GIFT_RESERVATION_TTL_MS = 24 * 60 * 60 * 1000; // 24 h

/** Solde réellement utilisable maintenant. Une réservation expirée ne bloque plus. */
export function availableCents(balance: GiftBalance, nowMs: number): number {
  const reservedActive =
    balance.reservedCents > 0 &&
    balance.reservedUntilMs !== null &&
    balance.reservedUntilMs > nowMs;
  return Math.max(0, balance.balanceCents - (reservedActive ? balance.reservedCents : 0));
}

export interface CreditApplication {
  /** Montant couvert par le bon, en cents. */
  coveredCents: number;
  /** Reste à payer par Stripe, en cents. 0 = le bon couvre tout. */
  remainingToPayCents: number;
  /** Solde qui restera sur le bon après cet achat, en cents. */
  remainingBalanceCents: number;
  /** Vrai si le bon couvre l'intégralité du total. */
  fullyCovered: boolean;
}

/** Applique le crédit à un total. Ne débite rien : le débit est serveur. */
export function applyCredit(available: number, totalCents: number): CreditApplication {
  const safeAvailable = Math.max(0, Math.floor(available));
  const safeTotal = Math.max(0, Math.floor(totalCents));
  const covered = Math.min(safeAvailable, safeTotal);
  return {
    coveredCents: covered,
    remainingToPayCents: safeTotal - covered,
    remainingBalanceCents: safeAvailable - covered,
    fullyCovered: safeTotal > 0 && covered >= safeTotal,
  };
}

export function formatCad(cents: number): string {
  const dollars = Math.floor(cents / 100);
  const rest = cents % 100;
  return rest === 0 ? `${dollars} $ CAD` : `${dollars},${String(rest).padStart(2, "0")} $ CAD`;
}
