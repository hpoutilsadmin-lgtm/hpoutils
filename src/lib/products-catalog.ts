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
  enjeux_humanite_pdf_15: {
    priceId: "enjeux_humanite_pdf_15",
    slug: "enjeux-humanite",
    title: "Enjeux de l'humanité à l'ère de l'IA",
    pdfPath: "enjeux-humanite.pdf",
    downloadFileName: "Enjeux-de-l-humanite-a-l-ere-de-l-IA.pdf",
    priceLabel: "15 $ CAD, aucune taxe ajoutée",
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
    priceLabel: "10 $ CAD, aucune taxe ajoutée",
    blurb:
      "Mieux manger avec peu, ça s'apprend. Téléchargement immédiat après paiement.",
    cover: "/images/cover-faim.jpg",
    formatLabel: "Version PDF",
    shortDescription:
      "Un guide pratique pour mieux manger avec peu, sans se compliquer la vie.",
    backCover:
      "Mieux manger avec peu, ça s'apprend.\n\nPas à coups de recettes parfaites ni de morale. Avec des bases simples, des repères utiles et des réflexes qui servent dans la vraie vie.\n\nLa faim justifie les moyens est un guide pratique pour les familles, les personnes seules, les jeunes adultes, les organismes et tous ceux qui veulent cuisiner avec peu sans se compliquer la vie. On y trouve des recettes accessibles, des astuces anti-gaspillage, des réflexes de conservation, des idées pour étirer un panier et des façons concrètes de transformer le dépannage en plus d'autonomie.\n\nUn outil simple, digne et utile. Pour moins jeter, moins stresser, et reprendre un peu de contrôle.",
    audienceSentence:
      "Ce PDF s'adresse aux personnes qui veulent mieux manger avec peu, cuisiner plus simplement, économiser sans se compliquer la vie et transformer le dépannage en plus d'autonomie.",
  },
  horizon_quebec_pdf_10: {
    priceId: "horizon_quebec_pdf_10",
    slug: "horizon-quebec",
    title: "Horizon Québec",
    pdfPath: "horizon-quebec.pdf",
    downloadFileName: "Horizon-Quebec.pdf",
    priceLabel: "10 $ CAD, aucune taxe ajoutée",
    blurb:
      "Une nouvelle HP sur l'amitié, la langue, le Québec et ce qu'on essaie encore de tenir ensemble. Téléchargement immédiat après paiement.",
    cover: "/images/cover-horizon-quebec.jpg",
    formatLabel: "Version PDF",
    shortDescription:
      "Une nouvelle humaine et actuelle sur ce qui reste quand le monde change : les lieux qu'on aime, les conversations qui nous tiennent et cette envie fragile de continuer à exister ensemble.",
    backCover:
      "Horizon Québec se déroule dans un café-bar de Montréal, un soir de pluie, autour d'une table où les discussions dérivent entre amitié, langue, fatigue collective et peur de perdre quelque chose sans toujours savoir quoi.\n\nOn y croise des personnages qui parlent trop, rient parfois trop fort, s'obstinent, se contredisent et cherchent encore une façon d'habiter le Québec sans le réduire à un slogan, une nostalgie ou une guerre de mots.\n\nC'est une nouvelle humaine et actuelle sur ce qui reste quand le monde change : les lieux qu'on aime, les conversations qui nous tiennent, les silences qui parlent trop, et cette envie fragile de continuer à exister ensemble.\n\nPas une grande théorie.\nUne soirée.\nUne table.\nUn bout de Québec qui respire encore.",
    audienceSentence:
      "Cette nouvelle s'adresse aux personnes qui aiment les récits sensibles, humains et ancrés dans le Québec actuel — autour de la langue, de l'identité, de l'amitié et des conversations qui restent longtemps après la dernière page.",
  },
  enfants_cuisinent_pdf_20: {
    priceId: "enfants_cuisinent_pdf_20",
    slug: "enfants-cuisinent",
    title: "Les enfants cuisinent pour faire plaisir",
    pdfPath: "enfants-cuisinent.pdf",
    downloadFileName: "Les-enfants-cuisinent.pdf",
    priceLabel: "20 $ CAD, aucune taxe ajoutée",
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
  sans_honte_frigo_pdf_5: {
    priceId: "sans_honte_frigo_pdf_5",
    slug: "sans-honte-frigo",
    title: "Kit Sans Honte — Frigo",
    pdfPath: "sans-honte-frigo.pdf",
    downloadFileName: "Kit-Sans-Honte-Frigo.pdf",
    priceLabel: "5 $ CAD, aucune taxe ajoutée",
    blurb: "Repères concrets pour manger sans se juger.",
    cover: "/images/sans-honte/kit-03.jpg",
    formatLabel: "Kit PDF",
    audienceSentence:
      "Ce kit s'adresse aux personnes qui veulent simplifier les repas et composer avec ce qu'elles ont déjà. Il propose des repères concrets pour organiser le frigo, réduire le gaspillage et manger sans viser la perfection.",
  },
  sans_honte_tenir_debout_pdf_5: {
    priceId: "sans_honte_tenir_debout_pdf_5",
    slug: "sans-honte-tenir-debout",
    title: "Tenir Debout Sans Honte",
    pdfPath: "sans-honte-tenir-debout.pdf",
    downloadFileName: "Tenir-Debout-Sans-Honte.pdf",
    priceLabel: "5 $ CAD, aucune taxe ajoutée",
    blurb: "Quand la journée tient sur un fil — un kit court.",
    cover: "/images/sans-honte/kit-04.jpg",
    formatLabel: "Kit PDF",
    audienceSentence:
      "Ce kit s'adresse aux personnes qui traversent des journées où les tâches ordinaires semblent trop lourdes. Il aide à choisir l'essentiel, avancer par petites étapes et garder des repères simples quand tout tient sur un fil.",
  },
  sans_honte_papiers_pdf_5: {
    priceId: "sans_honte_papiers_pdf_5",
    slug: "sans-honte-papiers",
    title: "Kit Sans Honte — Papiers",
    pdfPath: "sans-honte-papiers.pdf",
    downloadFileName: "Kit-Sans-Honte-Papiers.pdf",
    priceLabel: "5 $ CAD, aucune taxe ajoutée",
    blurb: "24 fiches pour reprendre le contrôle de ses papiers.",
    cover: "/images/sans-honte/kit-01.jpg",
    formatLabel: "Kit PDF",
    audienceSentence:
      "Ce kit s'adresse aux personnes qui se sentent dépassées par le courrier, les factures ou les démarches administratives. Ses 24 fiches aident à trier, classer et reprendre le contrôle des papiers sans tout régler en une seule journée.",
  },
  sans_honte_me_reconnaitre_pdf_5: {
    priceId: "sans_honte_me_reconnaitre_pdf_5",
    slug: "sans-honte-me-reconnaitre",
    title: "Kit Sans Honte — Me Reconnaître",
    pdfPath: "sans-honte-me-reconnaitre.pdf",
    downloadFileName: "Kit-Sans-Honte-Me-Reconnaitre.pdf",
    priceLabel: "5 $ CAD, aucune taxe ajoutée",
    blurb: "Adapter sa journée à son cerveau, sans se juger.",
    cover: "/images/sans-honte/kit-02.jpg",
    formatLabel: "Kit PDF",
    audienceSentence:
      "Ce kit s'adresse aux personnes qui veulent mieux reconnaître leur façon de fonctionner au quotidien. Il propose des outils pour adapter la journée à son énergie, ses besoins et son rythme, sans se comparer.",
  },
  sans_honte_seconde_main_pdf_5: {
    priceId: "sans_honte_seconde_main_pdf_5",
    slug: "sans-honte-seconde-main",
    title: "Kit Sans Honte — Seconde Main",
    pdfPath: "sans-honte-seconde-main.pdf",
    downloadFileName: "Kit-Sans-Honte-Seconde-Main.pdf",
    priceLabel: "5 $ CAD, aucune taxe ajoutée",
    blurb: "S'équiper et consommer autrement, simplement.",
    cover: "/images/sans-honte/kit-05.jpg",
    formatLabel: "Kit PDF",
    audienceSentence:
      "Ce kit s'adresse aux personnes qui veulent s'habiller, se meubler ou s'équiper en seconde main, par choix ou par nécessité. Il rassemble des repères pour acheter, vendre, donner et récupérer simplement, sans jugement.",
  },
  sans_honte_entraide_pdf_5: {
    priceId: "sans_honte_entraide_pdf_5",
    slug: "sans-honte-entraide",
    title: "Kit Sans Honte — Entraide",
    pdfPath: "sans-honte-entraide.pdf",
    downloadFileName: "Kit-Sans-Honte-Entraide.pdf",
    priceLabel: "5 $ CAD, aucune taxe ajoutée",
    blurb: "Donner et recevoir de l'aide, sans honte.",
    cover: "/images/sans-honte/kit-06.jpg",
    formatLabel: "Kit PDF",
    audienceSentence:
      "Ce kit s'adresse aux personnes qui hésitent à demander de l'aide ou ne savent pas toujours comment en offrir. Il propose des façons concrètes de formuler un besoin, poser ses limites et créer une entraide respectueuse.",
  },
  sans_honte_fraude_pdf_5: {
    priceId: "sans_honte_fraude_pdf_5",
    slug: "sans-honte-fraude",
    title: "Kit Sans Honte — Fraude",
    pdfPath: "sans-honte-fraude.pdf",
    downloadFileName: "Kit-Sans-Honte-Fraude.pdf",
    priceLabel: "5 $ CAD, aucune taxe ajoutée",
    blurb: "Reconnaître, réagir, se protéger.",
    cover: "/images/sans-honte/kit-07.jpg",
    formatLabel: "Kit PDF",
    audienceSentence:
      "Ce kit s'adresse aux personnes qui veulent reconnaître les arnaques courantes et savoir quoi faire devant un message suspect. Il donne des réflexes clairs pour vérifier, réagir et protéger ses renseignements sans avoir honte d'avoir douté.",
  },
  sans_honte_logement_pdf_5: {
    priceId: "sans_honte_logement_pdf_5",
    slug: "sans-honte-logement",
    title: "Kit Sans Honte — Logement",
    pdfPath: "sans-honte-logement.pdf",
    downloadFileName: "Kit-Sans-Honte-Logement.pdf",
    priceLabel: "5 $ CAD, aucune taxe ajoutée",
    blurb: "Repères concrets autour du logement.",
    cover: "/images/sans-honte/kit-08.jpg",
    formatLabel: "Kit PDF",
    audienceSentence:
      "Ce kit s'adresse aux personnes qui cherchent à garder, retrouver ou mieux organiser un chez-soi. Il réunit des repères concrets pour préparer ses démarches, comprendre une situation et savoir vers qui se tourner.",
  },
  sans_honte_proche_aidant_pdf_5: {
    priceId: "sans_honte_proche_aidant_pdf_5",
    slug: "sans-honte-proche-aidant",
    title: "Kit Sans Honte — Proche Aidant",
    pdfPath: "sans-honte-proche-aidant.pdf",
    downloadFileName: "Kit-Sans-Honte-Proche-Aidant.pdf",
    priceLabel: "5 $ CAD, aucune taxe ajoutée",
    blurb: "Tenir le rôle de proche aidant sans s'épuiser.",
    cover: "/images/sans-honte/kit-09.jpg",
    formatLabel: "Kit PDF",
    audienceSentence:
      "Ce kit s'adresse aux personnes qui soutiennent régulièrement un proche et qui portent beaucoup de responsabilités. Il aide à nommer ce qui pèse, organiser l'aide et préserver une place pour ses propres besoins.",
  },
  sans_honte_72_heures_pdf_5: {
    priceId: "sans_honte_72_heures_pdf_5",
    slug: "sans-honte-72-heures",
    title: "Kit Sans Honte — 72 Heures",
    pdfPath: "sans-honte-72-heures.pdf",
    downloadFileName: "Kit-Sans-Honte-72-Heures.pdf",
    priceLabel: "5 $ CAD, aucune taxe ajoutée",
    blurb: "Se préparer aux 72 premières heures d'une urgence.",
    cover: "/images/sans-honte/kit-10.jpg",
    formatLabel: "Kit PDF",
    audienceSentence:
      "Ce kit s'adresse aux personnes et aux familles qui veulent se préparer aux 72 premières heures d'une urgence. Il fournit une méthode simple pour vérifier les besoins essentiels, rassembler le matériel et établir un plan réaliste.",
  },
  sans_honte_collection_pdf_40: {
    priceId: "sans_honte_collection_pdf_40",
    slug: "sans-honte-collection",
    title: "Collection Sans Honte — 10 kits",
    pdfPath: "sans-honte-collection.pdf",
    downloadFileName: "Collection-Sans-Honte.pdf",
    priceLabel: "40 $ CAD, aucune taxe ajoutée",
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