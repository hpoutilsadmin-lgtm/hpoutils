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
  sans_honte_papiers_pdf_10: {
    priceId: "sans_honte_papiers_pdf_10",
    slug: "sans-honte-papiers",
    title: "Kit Sans Honte — Papiers",
    pdfPath: "sans-honte-papiers.pdf",
    downloadFileName: "Kit-Sans-Honte-Papiers.pdf",
    priceLabel: "10 $ CAD",
    blurb: "24 fiches pour reprendre le contrôle de ses papiers.",
  },
  sans_honte_me_reconnaitre_pdf_10: {
    priceId: "sans_honte_me_reconnaitre_pdf_10",
    slug: "sans-honte-me-reconnaitre",
    title: "Kit Sans Honte — Me Reconnaître",
    pdfPath: "sans-honte-me-reconnaitre.pdf",
    downloadFileName: "Kit-Sans-Honte-Me-Reconnaitre.pdf",
    priceLabel: "10 $ CAD",
    blurb: "Adapter sa journée à son cerveau, sans se juger.",
  },
  sans_honte_seconde_main_pdf_10: {
    priceId: "sans_honte_seconde_main_pdf_10",
    slug: "sans-honte-seconde-main",
    title: "Kit Sans Honte — Seconde Main",
    pdfPath: "sans-honte-seconde-main.pdf",
    downloadFileName: "Kit-Sans-Honte-Seconde-Main.pdf",
    priceLabel: "10 $ CAD",
    blurb: "S'équiper et consommer autrement, simplement.",
  },
  sans_honte_entraide_pdf_10: {
    priceId: "sans_honte_entraide_pdf_10",
    slug: "sans-honte-entraide",
    title: "Kit Sans Honte — Entraide",
    pdfPath: "sans-honte-entraide.pdf",
    downloadFileName: "Kit-Sans-Honte-Entraide.pdf",
    priceLabel: "10 $ CAD",
    blurb: "Donner et recevoir de l'aide, sans honte.",
  },
  sans_honte_fraude_pdf_10: {
    priceId: "sans_honte_fraude_pdf_10",
    slug: "sans-honte-fraude",
    title: "Kit Sans Honte — Fraude",
    pdfPath: "sans-honte-fraude.pdf",
    downloadFileName: "Kit-Sans-Honte-Fraude.pdf",
    priceLabel: "10 $ CAD",
    blurb: "Reconnaître, réagir, se protéger.",
  },
  sans_honte_logement_pdf_10: {
    priceId: "sans_honte_logement_pdf_10",
    slug: "sans-honte-logement",
    title: "Kit Sans Honte — Logement",
    pdfPath: "sans-honte-logement.pdf",
    downloadFileName: "Kit-Sans-Honte-Logement.pdf",
    priceLabel: "10 $ CAD",
    blurb: "Repères concrets autour du logement.",
  },
  sans_honte_proche_aidant_pdf_10: {
    priceId: "sans_honte_proche_aidant_pdf_10",
    slug: "sans-honte-proche-aidant",
    title: "Kit Sans Honte — Proche Aidant",
    pdfPath: "sans-honte-proche-aidant.pdf",
    downloadFileName: "Kit-Sans-Honte-Proche-Aidant.pdf",
    priceLabel: "10 $ CAD",
    blurb: "Tenir le rôle de proche aidant sans s'épuiser.",
  },
  sans_honte_72_heures_pdf_10: {
    priceId: "sans_honte_72_heures_pdf_10",
    slug: "sans-honte-72-heures",
    title: "Kit Sans Honte — 72 Heures",
    pdfPath: "sans-honte-72-heures.pdf",
    downloadFileName: "Kit-Sans-Honte-72-Heures.pdf",
    priceLabel: "10 $ CAD",
    blurb: "Se préparer aux 72 premières heures d'une urgence.",
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