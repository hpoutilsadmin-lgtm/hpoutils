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
  // Champs descriptifs facultatifs (page d'aperçu /pdf/$slug)
  cover?: string;           // chemin image de couverture
  formatLabel?: "Version PDF" | "Kit PDF" | "Collection PDF";
  shortDescription?: string;
  includes?: string[];      // « Ce PDF contient »
  audience?: string[];      // « Pour qui ? »
  backCover?: string;       // Texte éditorial « 4e de couverture »
  audienceSentence?: string; // Phrase « Ce PDF s'adresse aux personnes qui veulent... »
}

export const PRODUCTS: Record<string, DigitalProduct> = {
  enjeux_humanite_pdf_10: {
    priceId: "enjeux_humanite_pdf_10",
    slug: "enjeux-humanite",
    title: "Enjeux de l'humanité à l'ère de l'IA",
    pdfPath: "enjeux-humanite.pdf",
    downloadFileName: "Enjeux-de-l-humanite-a-l-ere-de-l-IA.pdf",
    priceLabel: "15 $ CAD",
    blurb:
      "Voir clair sur ce qui se joue, sans paniquer ni minimiser. Téléchargement immédiat après paiement.",
    cover: "/images/cover-enjeux.jpg",
    formatLabel: "Version PDF",
    shortDescription:
      "Une ressource PDF pour voir clair sur ce qui se joue dans le monde, sans paniquer ni minimiser.",
    backCover:
      "L'intelligence artificielle transforme déjà notre façon de penser, d'apprendre, de travailler, de créer et de décider. Mais derrière la fascination technologique, une question demeure : qu'est-ce qu'on veut préserver de profondément humain ?\n\nCe PDF propose une réflexion accessible sur les grands enjeux de l'IA : la place du jugement, la pensée critique, la créativité, la responsabilité, les biais, la dépendance aux outils et le risque de laisser la machine décider à notre place.\n\nCe n'est pas un document pour avoir peur de l'IA. C'est un outil pour mieux la comprendre, l'utiliser avec plus de conscience et se rappeler que la technologie devrait rester au service de l'humain — pas l'inverse.",
    audienceSentence:
      "Ce PDF s'adresse aux personnes qui veulent comprendre les impacts de l'intelligence artificielle, réfléchir à son utilisation dans la vraie vie et développer un regard plus critique sans tomber dans la peur ou l'aveuglement.",
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
    cover: "/images/cover-faim.jpg",
    formatLabel: "Version PDF",
    shortDescription:
      "Une ressource PDF pour manger mieux avec moins, sans se faire la morale.",
    backCover:
      "Cuisiner, ce n'est pas seulement suivre une recette. C'est apprendre à se débrouiller, à faire des choix, à comprendre ce qu'on mange et à reprendre un peu de pouvoir sur son quotidien.\n\nLa faim justifie les moyens propose une approche simple, concrète et humaine autour de l'alimentation. On y parle de cuisine accessible, d'organisation, de budget, de créativité, de débrouillardise et du plaisir de faire avec ce qu'on a.\n\nCe PDF n'est pas là pour donner des leçons parfaites. Il est là pour aider à cuisiner plus simplement, penser autrement ce qu'on met dans son assiette et retrouver un peu de liberté dans la cuisine.",
    audienceSentence:
      "Ce PDF s'adresse aux personnes qui veulent cuisiner de façon plus simple, mieux s'organiser, faire avec ce qu'elles ont et retrouver du plaisir dans une alimentation accessible et réaliste.",
  },
  enfants_cuisinent_pdf_15: {
    priceId: "enfants_cuisinent_pdf_15",
    slug: "enfants-cuisinent",
    title: "Les enfants cuisinent pour faire plaisir",
    pdfPath: "enfants-cuisinent.pdf",
    downloadFileName: "Les-enfants-cuisinent.pdf",
    priceLabel: "20 $ CAD",
    blurb:
      "Un projet doux pour transmettre le plaisir, pas la performance. Téléchargement immédiat après paiement.",
    cover: "/images/cover-enfants.jpg",
    formatLabel: "Version PDF",
    shortDescription:
      "Une ressource PDF pour cuisiner avec les enfants et transmettre le plaisir, pas la performance.",
    backCover:
      "Quand les enfants cuisinent, ils ne font pas seulement une recette. Ils apprennent à essayer, à rater, à recommencer, à goûter, à offrir et à être fiers de ce qu'ils créent.\n\nLes enfants cuisinent pour faire plaisir est un PDF pensé pour rendre la cuisine accessible, joyeuse et valorisante pour les enfants. Il invite à participer, à découvrir les aliments, à développer l'autonomie et à partager un moment simple autour de quelque chose de concret.\n\nCe n'est pas un outil pour faire des petits chefs parfaits. C'est une invitation à cuisiner ensemble, à créer des souvenirs et à permettre aux enfants de faire plaisir avec leurs mains, leurs idées et leur cœur.",
    audienceSentence:
      "Ce PDF s'adresse aux familles, parents, enfants, écoles ou organismes qui veulent utiliser la cuisine comme un moment de plaisir, d'apprentissage, d'autonomie et de partage.",
  },
  sans_honte_frigo_pdf_10: {
    priceId: "sans_honte_frigo_pdf_10",
    slug: "sans-honte-frigo",
    title: "Kit Sans Honte — Frigo",
    pdfPath: "sans-honte-frigo.pdf",
    downloadFileName: "Kit-Sans-Honte-Frigo.pdf",
    priceLabel: "10 $ CAD",
    blurb: "Repères concrets pour manger sans se juger.",
    cover: "/images/sans-honte/kit-03.jpg",
    formatLabel: "Kit PDF",
  },
  sans_honte_tenir_debout_pdf_10: {
    priceId: "sans_honte_tenir_debout_pdf_10",
    slug: "sans-honte-tenir-debout",
    title: "Tenir Debout Sans Honte",
    pdfPath: "sans-honte-tenir-debout.pdf",
    downloadFileName: "Tenir-Debout-Sans-Honte.pdf",
    priceLabel: "10 $ CAD",
    blurb: "Quand la journée tient sur un fil — un kit court.",
    cover: "/images/sans-honte/kit-04.jpg",
    formatLabel: "Kit PDF",
  },
  sans_honte_papiers_pdf_10: {
    priceId: "sans_honte_papiers_pdf_10",
    slug: "sans-honte-papiers",
    title: "Kit Sans Honte — Papiers",
    pdfPath: "sans-honte-papiers.pdf",
    downloadFileName: "Kit-Sans-Honte-Papiers.pdf",
    priceLabel: "10 $ CAD",
    blurb: "24 fiches pour reprendre le contrôle de ses papiers.",
    cover: "/images/sans-honte/kit-01.jpg",
    formatLabel: "Kit PDF",
  },
  sans_honte_me_reconnaitre_pdf_10: {
    priceId: "sans_honte_me_reconnaitre_pdf_10",
    slug: "sans-honte-me-reconnaitre",
    title: "Kit Sans Honte — Me Reconnaître",
    pdfPath: "sans-honte-me-reconnaitre.pdf",
    downloadFileName: "Kit-Sans-Honte-Me-Reconnaitre.pdf",
    priceLabel: "10 $ CAD",
    blurb: "Adapter sa journée à son cerveau, sans se juger.",
    cover: "/images/sans-honte/kit-02.jpg",
    formatLabel: "Kit PDF",
  },
  sans_honte_seconde_main_pdf_10: {
    priceId: "sans_honte_seconde_main_pdf_10",
    slug: "sans-honte-seconde-main",
    title: "Kit Sans Honte — Seconde Main",
    pdfPath: "sans-honte-seconde-main.pdf",
    downloadFileName: "Kit-Sans-Honte-Seconde-Main.pdf",
    priceLabel: "10 $ CAD",
    blurb: "S'équiper et consommer autrement, simplement.",
    cover: "/images/sans-honte/kit-05.jpg",
    formatLabel: "Kit PDF",
  },
  sans_honte_entraide_pdf_10: {
    priceId: "sans_honte_entraide_pdf_10",
    slug: "sans-honte-entraide",
    title: "Kit Sans Honte — Entraide",
    pdfPath: "sans-honte-entraide.pdf",
    downloadFileName: "Kit-Sans-Honte-Entraide.pdf",
    priceLabel: "10 $ CAD",
    blurb: "Donner et recevoir de l'aide, sans honte.",
    cover: "/images/sans-honte/kit-06.jpg",
    formatLabel: "Kit PDF",
  },
  sans_honte_fraude_pdf_10: {
    priceId: "sans_honte_fraude_pdf_10",
    slug: "sans-honte-fraude",
    title: "Kit Sans Honte — Fraude",
    pdfPath: "sans-honte-fraude.pdf",
    downloadFileName: "Kit-Sans-Honte-Fraude.pdf",
    priceLabel: "10 $ CAD",
    blurb: "Reconnaître, réagir, se protéger.",
    cover: "/images/sans-honte/kit-07.jpg",
    formatLabel: "Kit PDF",
  },
  sans_honte_logement_pdf_10: {
    priceId: "sans_honte_logement_pdf_10",
    slug: "sans-honte-logement",
    title: "Kit Sans Honte — Logement",
    pdfPath: "sans-honte-logement.pdf",
    downloadFileName: "Kit-Sans-Honte-Logement.pdf",
    priceLabel: "10 $ CAD",
    blurb: "Repères concrets autour du logement.",
    cover: "/images/sans-honte/kit-08.jpg",
    formatLabel: "Kit PDF",
  },
  sans_honte_proche_aidant_pdf_10: {
    priceId: "sans_honte_proche_aidant_pdf_10",
    slug: "sans-honte-proche-aidant",
    title: "Kit Sans Honte — Proche Aidant",
    pdfPath: "sans-honte-proche-aidant.pdf",
    downloadFileName: "Kit-Sans-Honte-Proche-Aidant.pdf",
    priceLabel: "10 $ CAD",
    blurb: "Tenir le rôle de proche aidant sans s'épuiser.",
    cover: "/images/sans-honte/kit-09.jpg",
    formatLabel: "Kit PDF",
  },
  sans_honte_72_heures_pdf_10: {
    priceId: "sans_honte_72_heures_pdf_10",
    slug: "sans-honte-72-heures",
    title: "Kit Sans Honte — 72 Heures",
    pdfPath: "sans-honte-72-heures.pdf",
    downloadFileName: "Kit-Sans-Honte-72-Heures.pdf",
    priceLabel: "10 $ CAD",
    blurb: "Se préparer aux 72 premières heures d'une urgence.",
    cover: "/images/sans-honte/kit-10.jpg",
    formatLabel: "Kit PDF",
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
    cover: "/images/sans-honte/collection-cover.png",
    formatLabel: "Collection PDF",
    shortDescription:
      "La collection complète regroupe les 10 kits Sans Honte en format PDF.",
    includes: [
      "Les 10 kits Sans Honte en PDF",
      "Textes courts et exercices de réflexion",
      "Phrases fortes à garder près de soi",
      "Outils à imprimer ou utiliser à l'écran",
    ],
    audience: [
      "explorer différentes facettes de la honte",
      "mettre des mots sur ce qu'on porte en silence",
      "reprendre un peu de place, doucement",
      "garder une bibliothèque d'outils près de soi",
    ],
  },
};

export function getProduct(priceId: string): DigitalProduct | null {
  return PRODUCTS[priceId] ?? null;
}

export function getProductBySlug(slug: string): DigitalProduct | null {
  return Object.values(PRODUCTS).find((p) => p.slug === slug) ?? null;
}