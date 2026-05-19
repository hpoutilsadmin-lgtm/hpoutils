// Catalogue des produits numériques en vente.
// Pour ajouter un nouveau PDF : créer un produit Stripe avec un lookup_key,
// téléverser le fichier dans le bucket `pdfs`, puis ajouter une entrée ici.

export interface DigitalProduct {
  priceId: string;          // lookup_key Stripe
  title: string;            // titre affiché
  pdfPath: string;          // chemin dans le bucket `pdfs`
  downloadFileName: string; // nom de fichier proposé au téléchargement
  slug: string;             // segment d'URL pour /achat/$slug
  priceLabel: string;       // ex. « 10 $ CAD »
  blurb: string;            // courte description sur la page d'achat
}

export const PRODUCTS: Record<string, DigitalProduct> = {
  enjeux_humanite_pdf_10: {
    priceId: "enjeux_humanite_pdf_10",
    slug: "enjeux-humanite",
    title: "Les enjeux de l'humanité",
    pdfPath: "enjeux-humanite.pdf",
    downloadFileName: "Les-enjeux-de-l-humanite.pdf",
    priceLabel: "10 $ CAD",
    blurb:
      "Voir clair sur ce qui se joue, sans paniquer ni minimiser. Téléchargement immédiat après paiement.",
  },
  faim_justifie_pdf_10: {
    priceId: "faim_justifie_pdf_10",
    slug: "faim-justifie-les-moyens",
    title: "La faim justifie les moyens",
    pdfPath: "faim-justifie-les-moyens.pdf",
    downloadFileName: "La-faim-justifie-les-moyens.pdf",
    priceLabel: "10 $ CAD",
    blurb:
      "Manger mieux avec moins, sans se faire la morale. Téléchargement immédiat après paiement.",
  },
  enfants_cuisinent_pdf_15: {
    priceId: "enfants_cuisinent_pdf_15",
    slug: "enfants-cuisinent",
    title: "Les enfants cuisinent pour faire plaisir",
    pdfPath: "enfants-cuisinent.pdf",
    downloadFileName: "Les-enfants-cuisinent.pdf",
    priceLabel: "15 $ CAD",
    blurb:
      "Un projet doux pour transmettre le plaisir, pas la performance. Téléchargement immédiat après paiement.",
  },
  sans_honte_frigo_pdf_10: {
    priceId: "sans_honte_frigo_pdf_10",
    slug: "sans-honte-frigo",
    title: "Kit Sans Honte — Frigo",
    pdfPath: "sans-honte-frigo.pdf",
    downloadFileName: "Kit-Sans-Honte-Frigo.pdf",
    priceLabel: "10 $ CAD",
    blurb: "Repères concrets pour manger sans se juger.",
  },
  sans_honte_tenir_debout_pdf_10: {
    priceId: "sans_honte_tenir_debout_pdf_10",
    slug: "sans-honte-tenir-debout",
    title: "Tenir Debout Sans Honte",
    pdfPath: "sans-honte-tenir-debout.pdf",
    downloadFileName: "Tenir-Debout-Sans-Honte.pdf",
    priceLabel: "10 $ CAD",
    blurb: "Quand la journée tient sur un fil — un kit court.",
  },
  sans_honte_collection_pdf_60: {
    priceId: "sans_honte_collection_pdf_60",
    slug: "sans-honte-collection",
    title: "Collection Sans Honte — 10 kits",
    pdfPath: "sans-honte-collection.pdf",
    downloadFileName: "Collection-Sans-Honte.pdf",
    priceLabel: "60 $ CAD",
    blurb:
      "Papiers, Frigo, Tenir Debout, Seconde Main, Entraide… la collection complète en un seul téléchargement.",
  },
};

export function getProduct(priceId: string): DigitalProduct | null {
  return PRODUCTS[priceId] ?? null;
}

export function getProductBySlug(slug: string): DigitalProduct | null {
  return Object.values(PRODUCTS).find((p) => p.slug === slug) ?? null;
}