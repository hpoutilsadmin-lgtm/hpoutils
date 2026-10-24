// Validation serveur du panier d'achat — pure, sans dépendance serveur,
// testable sans secret. Ne fait JAMAIS confiance au client : chaque priceId
// est revalidé contre le catalogue du dépôt, les achats suspendus et le
// bundle sont rejetés, la quantité est toujours ramenée à 1 (un PDF = un
// seul exemplaire, on ne débite jamais deux fois le même fichier).
import { getProduct, COLLECTION_PRICE_ID } from "./products-catalog";

export const PANIER_MAX_ARTICLES = 20;

/** Valide une liste de priceIds bruts, déduplique, retourne les clés propres. */
export function validateCartItems(priceIds: unknown): string[] {
  if (!Array.isArray(priceIds)) throw new Error("Panier invalide");
  if (priceIds.length === 0) throw new Error("Panier vide");
  if (priceIds.length > PANIER_MAX_ARTICLES) {
    throw new Error("Panier trop grand (20 articles maximum)");
  }
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of priceIds) {
    if (typeof raw !== "string" || !/^[a-zA-Z0-9_-]+$/.test(raw)) {
      throw new Error("Article invalide");
    }
    if (seen.has(raw)) continue;
    seen.add(raw);
    const product = getProduct(raw);
    if (!product) throw new Error("Article inconnu");
    if (product.purchaseHold) throw new Error("Achat suspendu pour ce produit");
    if (raw === COLLECTION_PRICE_ID) {
      throw new Error("Le bundle garde son propre parcours de sélection");
    }
    out.push(raw);
  }
  return out;
}
