// Panier d'achat HP Outils — logique pure, sans React, sans DOM obligatoire.
// Testable avec bun/node. Les totaux affichés ici sont indicatifs : c'est
// Stripe qui débite, par lookup_key, via la fonction serveur — jamais le
// total calculé côté client.
//
// Règles métier (décisions HP, 24 octobre 2026) :
// - Seuls les produits VENDABLES aujourd'hui sont ajoutables : les 3 livres
//   et les 15 kits Sans Honte du catalogue, sans purchaseHold.
// - Les PDF ne se vendent qu'en 1 exemplaire : la quantité est plafonnée à 1
//   par produit (un fichier à télécharger, pas un objet). Ajouter deux fois
//   le même produit ne change rien ; on ne débite jamais deux fois le même
//   fichier.
// - Le bundle « Choisis 10 kits parmi 15 » est EXCLU du panier v1 : il garde
//   son propre parcours de sélection.
// - Prix en $ CAD, aucune taxe ajoutée (petit fournisseur).

export interface CartProduct {
  priceId: string; // lookup_key Stripe, identique au catalogue du dépôt
  title: string;
  slug: string; // segment /pdf/$slug et /achat/$slug
  priceCad: number; // prix affiché, vérifié contre products-catalog.ts
  maxQty: number; // 1 pour les PDF
}

export interface CartItem {
  priceId: string;
  qty: number;
}

export type Cart = CartItem[];

/** Les 20 produits vendables aujourd'hui (tête 2466c43b, vérifiée : Enfants et mini-cahier ont rejoint les vendables, achats ouverts à 10 $). */
export const CART_PRODUCTS: CartProduct[] = [
  // Livres
  { priceId: "enjeux_humanite_pdf_15", title: "Enjeux de l'humanité à l'ère de l'IA", slug: "enjeux-humanite", priceCad: 15, maxQty: 1 },
  { priceId: "faim_justifie_pdf_10", title: "La faim justifie les moyens", slug: "faim-justifie-les-moyens", priceCad: 10, maxQty: 1 },
  { priceId: "horizon_quebec_pdf_10", title: "Horizon Québec", slug: "horizon-quebec", priceCad: 10, maxQty: 1 },
  { priceId: "enfants_cuisinent_pdf_10", title: "Les enfants cuisinent pour faire plaisir", slug: "enfants-cuisinent", priceCad: 10, maxQty: 1 },
  { priceId: "hp_hyper_potentiel_cahier_pdf_10", title: "Un petit pas à la fois — le mini cahier", slug: "mini-cahier-hyper-potentiel", priceCad: 10, maxQty: 1 },
  // Kits Sans Honte, 5 $ chacun
  { priceId: "sans_honte_testament_pdf_5", title: "Testament Sans Honte — L'olographe, pas à pas", slug: "sans-honte-testament", priceCad: 5, maxQty: 1 },
  { priceId: "sans_honte_papiers_parents_pdf_5", title: "Papiers de mes parents Sans Honte", slug: "sans-honte-papiers-parents", priceCad: 5, maxQty: 1 },
  { priceId: "sans_honte_chalet_pdf_5", title: "Chalet Sans Honte — Les règles qui sauvent les Noëls", slug: "sans-honte-chalet", priceCad: 5, maxQty: 1 },
  { priceId: "sans_honte_annee_quebecoise_pdf_5", title: "L'année québécoise Sans Honte", slug: "sans-honte-annee-quebecoise", priceCad: 5, maxQty: 1 },
  { priceId: "sans_honte_heritage_numerique_pdf_5", title: "Héritage numérique Sans Honte", slug: "sans-honte-heritage-numerique", priceCad: 5, maxQty: 1 },
  { priceId: "sans_honte_frigo_pdf_5", title: "Kit Sans Honte — Frigo", slug: "sans-honte-frigo", priceCad: 5, maxQty: 1 },
  { priceId: "sans_honte_tenir_debout_pdf_5", title: "Tenir Debout Sans Honte", slug: "sans-honte-tenir-debout", priceCad: 5, maxQty: 1 },
  { priceId: "sans_honte_papiers_pdf_5", title: "Kit Sans Honte — Papiers", slug: "sans-honte-papiers", priceCad: 5, maxQty: 1 },
  { priceId: "sans_honte_me_reconnaitre_pdf_5", title: "Kit Sans Honte — Me Reconnaître", slug: "sans-honte-me-reconnaitre", priceCad: 5, maxQty: 1 },
  { priceId: "sans_honte_seconde_main_pdf_5", title: "Kit Sans Honte — Seconde Main", slug: "sans-honte-seconde-main", priceCad: 5, maxQty: 1 },
  { priceId: "sans_honte_entraide_pdf_5", title: "Kit Sans Honte — Entraide", slug: "sans-honte-entraide", priceCad: 5, maxQty: 1 },
  { priceId: "sans_honte_fraude_pdf_5", title: "Kit Sans Honte — Fraude", slug: "sans-honte-fraude", priceCad: 5, maxQty: 1 },
  { priceId: "sans_honte_logement_pdf_5", title: "Kit Sans Honte — Logement", slug: "sans-honte-logement", priceCad: 5, maxQty: 1 },
  { priceId: "sans_honte_proche_aidant_pdf_5", title: "Kit Sans Honte — Proche Aidant", slug: "sans-honte-proche-aidant", priceCad: 5, maxQty: 1 },
  { priceId: "sans_honte_72_heures_pdf_5", title: "Kit Sans Honte — 72 Heures", slug: "sans-honte-72-heures", priceCad: 5, maxQty: 1 },
];

/** Produits affichés mais NON ajoutables, avec la raison dite honnêtement. */
export const NON_AJOUTABLES: Array<{ nom: string; raison: string }> = [
  { nom: "Bundle Sans Honte — Choisis 10 kits parmi 15 (40 $)", raison: "Exclu du panier v1 : il garde son propre parcours de sélection des 10 kits." },
  { nom: "Tomes « À toi l'histoire » (5 $ / 8 $)", raison: "Produits Stripe en cours de création chez Mélanie." },
  { nom: "Le Coffre HP (79 $)", raison: "Fiche non publiée pour l'instant." },
  { nom: "Boutique Chevalier (4,99 $ à 39,99 $)", raison: "« Bientôt en vente » seulement, aucun bouton d'achat actif." },
  { nom: "Outils papier (2 $ / 5 $ / 8 $)", raison: "Brouillons : ni prix Stripe ni fichier PDF en place." },
];

export function getCartProduct(priceId: string): CartProduct | null {
  return CART_PRODUCTS.find((p) => p.priceId === priceId) ?? null;
}

export function isSellable(priceId: string): boolean {
  return getCartProduct(priceId) !== null;
}

/** Ajoute un produit. Retourne le nouveau panier + une erreur éventuelle. */
export function addToCart(cart: Cart, priceId: string): { cart: Cart; error: string | null } {
  const product = getCartProduct(priceId);
  if (!product) return { cart, error: "Ce produit n'est pas vendable dans le panier pour l'instant." };
  const existing = cart.find((i) => i.priceId === priceId);
  if (existing) {
    // Déjà présent : un PDF ne s'achète qu'une fois, on ne duplique rien.
    return { cart, error: null };
  }
  return { cart: [...cart, { priceId, qty: 1 }], error: null };
}

export function removeFromCart(cart: Cart, priceId: string): Cart {
  return cart.filter((i) => i.priceId !== priceId);
}

/**
 * Change la quantité. 0 retire l'article. Au-delà du plafond du produit,
 * la quantité est bornée (1 pour les PDF) : on ne débite jamais deux fois
 * le même fichier.
 */
export function setQuantity(cart: Cart, priceId: string, qty: number): Cart {
  const product = getCartProduct(priceId);
  if (!product) return cart;
  const clean = Math.max(0, Math.floor(qty));
  if (clean === 0) return removeFromCart(cart, priceId);
  const bounded = Math.min(clean, product.maxQty);
  return cart.map((i) => (i.priceId === priceId ? { ...i, qty: bounded } : i));
}

export function clearCart(): Cart {
  return [];
}

export function cartCount(cart: Cart): number {
  return cart.reduce((n, i) => n + i.qty, 0);
}

/** Total affiché, en $ CAD. Indicatif seulement : Stripe débite par lookup_key. */
export function cartTotalCad(cart: Cart): number {
  let total = 0;
  for (const item of cart) {
    const product = getCartProduct(item.priceId);
    if (product) total += product.priceCad * item.qty;
  }
  return total;
}

export function formatCad(amount: number): string {
  return `${amount} $ CAD`;
}

/** Joint le panier aux fiches produits ; ignore les identifiants inconnus. */
export function resolveCart(cart: Cart): Array<{ product: CartProduct; qty: number }> {
  const out: Array<{ product: CartProduct; qty: number }> = [];
  for (const item of cart) {
    const product = getCartProduct(item.priceId);
    if (product) out.push({ product, qty: Math.min(item.qty, product.maxQty) });
  }
  return out;
}

// --- Persistance navigateur -------------------------------------------------

export const PANIER_STORAGE_KEY = "hp-panier-v1";

export interface CartStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function defaultStorage(): CartStorage | null {
  try {
    const s = (globalThis as unknown as { localStorage?: CartStorage }).localStorage;
    return s ?? null;
  } catch {
    return null;
  }
}

/** Lecture défensive : un panier corrompu repart de zéro, sans planter. */
export function loadCart(storage?: CartStorage | null): Cart {
  const store = storage ?? defaultStorage();
  if (!store) return [];
  try {
    const raw = store.getItem(PANIER_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const cart: Cart = [];
    for (const entry of parsed as Array<{ priceId?: unknown; qty?: unknown }>) {
      if (typeof entry?.priceId !== "string") continue;
      if (!isSellable(entry.priceId)) continue;
      const qty = Math.min(Math.max(1, Math.floor(Number(entry.qty) || 1)), 1);
      if (!cart.some((i) => i.priceId === entry.priceId)) cart.push({ priceId: entry.priceId, qty });
    }
    return cart;
  } catch {
    return [];
  }
}

export function saveCart(cart: Cart, storage?: CartStorage | null): void {
  const store = storage ?? defaultStorage();
  if (!store) return;
  try {
    store.setItem(PANIER_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Stockage plein ou indisponible : le panier vit en mémoire ce passage.
  }
}
