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
  contents?: string[];      // « Sommaire » — liste réelle des fiches/sections du produit
  volumeLabel?: string;     // volume vérifié seulement, ex. « 24 fiches · 14 pages »
  preview?: { title: string; text: string }; // aperçu authentique, tiré du produit
  healthSupport?: boolean;  // afficher le filet d'aide santé (988, 811) sur la fiche
  audience?: string[];      // « Pour qui ? »
  backCover?: string;       // Texte éditorial « 4e de couverture »
  audienceSentence?: string; // Phrase « Ce PDF s'adresse aux personnes qui veulent... »
  precaution?: string;
  priceJustification?: string; // « Pourquoi ce prix » — faits vérifiés seulement
  // Si présent : le prix affiché est en vigueur, mais l'achat en ligne est
  // suspendu (le message est affiché à la place du paiement). Sert quand le
  // prix affiché change avant que le prix Stripe correspondant existe —
  // jamais d'affichage à un prix et de paiement à un autre.
  purchaseHold?: string;
}

export const PRODUCTS: Record<string, DigitalProduct> = {
  sans_honte_testament_pdf_5: {
    priceId: "sans_honte_testament_pdf_5", slug: "sans-honte-testament",
    title: "Testament Sans Honte — L'olographe, pas à pas",
    pdfPath: "sans-honte-testament.pdf", downloadFileName: "Testament_Sans_Honte.pdf",
    priceLabel: "5 $ CAD, aucune taxe ajoutée", formatLabel: "Kit PDF",
    blurb: "Préparer un testament olographe au Québec, pas à pas.",
    cover: "/images/sans-honte/kit-11.jpg",
    shortDescription:
      "Un testament olographe au Québec, écrit à la main et signé : ce que c'est, les erreurs qui le rendent invalide et l'ordre à suivre, fiche par fiche.",
    volumeLabel: "24 fiches · 14 pages",
    contents: [
      "La soirée du testament",
      "C'est quoi, un olographe ?",
      "Manuscrit et signé",
      "Erreur n° 1 : le tapé",
      "Erreur n° 2 : la date",
      "Erreur n° 3 : la signature",
      "Erreur n° 4 : les ratures",
      "Erreur n° 5 : le flou",
      "Qui suis-je ?",
      "« Je révoque… »",
      "Le liquidateur : qui ?",
      "Le remplaçant",
      "Les legs particuliers",
      "Le résidu",
      "Les enfants mineurs",
      "Ce qu'on n'y met pas",
      "Les dettes",
      "Les phrases à recopier",
      "L'ordre du document",
      "Où le garder",
      "Le registre",
      "Dire où il est",
      "Après moi : la vérification",
      "Relire, dater, signer",
    ],
    preview: {
      title: "Fiche 2 — C'est quoi, un olographe ?",
      text: "Comprendre la forme la plus simple du testament au Québec. Au Québec, un testament écrit au complet à la main et signé est valide : pas de notaire, pas de témoin. Phrase à retenir : « Simple ne veut pas dire fragile. »",
    },
    audienceSentence: "Ce kit s'adresse aux personnes qui veulent préparer un testament olographe au Québec et organiser leurs volontés.",
    precaution: "Le kit aide à préparer un testament olographe au Québec, pas à pas ; ce n'est pas un avis juridique. Pour une situation complexe, un notaire reste la bonne porte.",
  },
  sans_honte_papiers_parents_pdf_5: {
    priceId: "sans_honte_papiers_parents_pdf_5", slug: "sans-honte-papiers-parents",
    title: "Papiers de mes parents Sans Honte", pdfPath: "sans-honte-papiers-parents.pdf",
    downloadFileName: "Papiers_de_mes_parents_Sans_Honte.pdf", priceLabel: "5 $ CAD, aucune taxe ajoutée",
    formatLabel: "Kit PDF", blurb: "Organiser les papiers de ses parents, sans honte.",
    cover: "/images/sans-honte/kit-12.jpg",
    shortDescription:
      "Organiser les papiers de ses parents sans braquer personne : la conversation, l'inventaire, les comptes, les assurances, le testament, le mandat et le classeur, fiche par fiche.",
    volumeLabel: "24 fiches · 14 pages",
    contents: [
      "Par où commencer",
      "La conversation",
      "L'inventaire",
      "Les papiers d'identité",
      "Comptes et placements",
      "Les assurances",
      "Factures et abonnements",
      "Les dettes",
      "Le testament",
      "Le mandat de protection",
      "La procuration",
      "L'homologation",
      "Le Curateur public",
      "Les directives médicales",
      "La maison",
      "Le courrier",
      "Mots de passe et en ligne",
      "Les arnaques",
      "Les prestations",
      "Aides et crédits",
      "Organismes et ressources",
      "Le classeur",
      "La fratrie",
      "Et moi là-dedans",
    ],
    preview: {
      title: "Fiche 2 — La conversation",
      text: "Amorcer le sujet sans braquer ses parents. Personne n'aime se faire dire qu'il ne gère plus : parle d'aide, pas de contrôle.",
    },
    audienceSentence: "Ce kit s'adresse aux personnes qui accompagnent leurs parents dans l'organisation de leurs papiers.",
  },
  sans_honte_chalet_pdf_5: {
    priceId: "sans_honte_chalet_pdf_5", slug: "sans-honte-chalet",
    title: "Chalet Sans Honte — Les règles qui sauvent les Noëls", pdfPath: "sans-honte-chalet.pdf",
    downloadFileName: "Chalet_Sans_Honte.pdf", priceLabel: "5 $ CAD, aucune taxe ajoutée",
    formatLabel: "Kit PDF", blurb: "Des règles claires pour partager le chalet.",
    cover: "/images/sans-honte/kit-13.jpg",
    shortDescription:
      "Les règles d'un chalet partagé, écrites quand tout va bien : qui paie quoi, qui décide, le calendrier, les invités, les réparations et la clause de sortie.",
    volumeLabel: "24 fiches · 14 pages",
    contents: [
      "La soirée des règles",
      "Les 5 chicanes classiques",
      "Notre convention : le papier",
      "Qui décide ?",
      "Qui paie quoi ?",
      "Le fonds de réserve",
      "La grille des coûts",
      "Les grosses réparations",
      "Le compte commun",
      "Les périodes protégées",
      "Rotation, tirage ou points",
      "La règle des 48 heures",
      "Deux familles à la fois",
      "Les invités : qui et combien",
      "Qui invite, ramasse",
      "La question Airbnb",
      "Les règles de la maison",
      "L'ouverture du printemps",
      "La fermeture de l'automne",
      "Les corvées invisibles",
      "La réunion annuelle",
      "La médiation",
      "La clause de sortie",
      "Et maintenant, on signe",
    ],
    preview: {
      title: "Fiche 1 — La soirée des règles",
      text: "Poser les règles du chalet en une seule soirée, tous ensemble. Une règle écrite quand tout va bien vaut dix discussions quand ça va mal.",
    },
    audienceSentence: "Ce kit s'adresse aux familles et aux proches qui partagent un chalet et veulent clarifier leurs règles ensemble.",
  },
  sans_honte_annee_quebecoise_pdf_5: {
    priceId: "sans_honte_annee_quebecoise_pdf_5", slug: "sans-honte-annee-quebecoise",
    title: "L'année québécoise Sans Honte", pdfPath: "sans-honte-annee-quebecoise.pdf",
    downloadFileName: "Annee_quebecoise_Sans_Honte.pdf", priceLabel: "5 $ CAD, aucune taxe ajoutée",
    formatLabel: "Kit PDF", blurb: "Des repères pour l'année québécoise.",
    cover: "/images/sans-honte/kit-14.jpg",
    shortDescription:
      "L'année québécoise mois par mois : impôts, REER, pneus, rentrée et Fêtes — plus les rendez-vous annuels qu'on oublie toujours, de la SAAQ aux assurances.",
    volumeLabel: "24 fiches · 14 pages",
    contents: [
      "Janvier : on repart",
      "Février : le REER",
      "Mars : les impôts",
      "Avril : date limite",
      "Mai : le printemps",
      "Juin : fin d'école",
      "Le 1er juillet",
      "Août : la rentrée",
      "Septembre : on s'installe",
      "Octobre : l'hiver s'en vient",
      "Novembre : on hiverne",
      "Décembre : pneus et Fêtes",
      "Les congés fériés",
      "Taxes municipales",
      "SAAQ : permis et plaques",
      "Assurances : le renouvellement",
      "Abonnements annuels",
      "Santé : les rendez-vous",
      "L'auto au fil des saisons",
      "La maison au fil des saisons",
      "CELI et REER",
      "Prestations et crédits",
      "Urgences saisonnières",
      "Mon année en une page",
    ],
    preview: {
      title: "Fiche 3 — Mars : les impôts",
      text: "S'y mettre tôt au lieu de paniquer le 29 avril. Mars, c'est le mois où on rassemble : feuillets, reçus, factures.",
    },
    audienceSentence: "Ce kit s'adresse aux personnes qui veulent organiser leur année avec des repères adaptés au Québec.",
  },
  sans_honte_heritage_numerique_pdf_5: {
    priceId: "sans_honte_heritage_numerique_pdf_5", slug: "sans-honte-heritage-numerique",
    title: "Héritage numérique Sans Honte", pdfPath: "sans-honte-heritage-numerique.pdf",
    downloadFileName: "Heritage_numerique_Sans_Honte.pdf", priceLabel: "5 $ CAD, aucune taxe ajoutée",
    formatLabel: "Kit PDF", blurb: "Préparer la transmission de son héritage numérique.",
    cover: "/images/sans-honte/kit-15.jpg",
    shortDescription:
      "Préparer la transmission de sa vie en ligne : l'inventaire des comptes, le coffre à mots de passe, les photos, les abonnements et la personne de confiance.",
    volumeLabel: "24 fiches · 14 pages",
    contents: [
      "C'est quoi, ça ?",
      "L'inventaire",
      "Le coffre à mots de passe",
      "Le gestionnaire",
      "La double vérification",
      "Ton courriel, la clé",
      "Banque et argent",
      "Photos et souvenirs",
      "Réseaux sociaux",
      "Compte inactif Google",
      "Contact légataire Apple",
      "Les abonnements",
      "Cryptos et portefeuilles",
      "Le document central",
      "La personne de confiance",
      "L'accès d'urgence",
      "Ce qu'il faut détruire",
      "Ce qu'il faut transmettre",
      "Les arnaques post-décès",
      "Démarches pour les proches",
      "Le côté légal",
      "Le grand ménage",
      "Automatiser",
      "Mon plan en une page",
    ],
    preview: {
      title: "Fiche 3 — Le coffre à mots de passe",
      text: "Centralise tes mots de passe de façon sécuritaire, pas n'importe comment. Un seul mot de passe partout = toutes les portes ouvertes avec une seule clé.",
    },
    audienceSentence: "Ce kit s'adresse aux personnes qui veulent préparer la transmission de leurs comptes et de leurs documents numériques.",
  },
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
  // PRIX ABAISSÉ de 20 $ à 10 $ — décision d'Hugo, 23 octobre 2026.
  // Prix Stripe de 10 $ créé en RÉEL le 24 octobre 2026
  // (lookup_key `enfants_cuisinent_pdf_10`, prix par défaut inchangé) :
  // l'achat est ouvert au nouveau prix, `purchaseHold` retiré ce jour.
  // L'entrée d'alias sous l'ancienne clé (`enfants_cuisinent_pdf_20`,
  // ci-dessous) conserve l'accès au téléchargement des achats déjà
  // payés à 20 $ — NE PAS supprimer.
  enfants_cuisinent_pdf_10: {
    priceId: "enfants_cuisinent_pdf_10",
    slug: "enfants-cuisinent",
    title: "Les enfants cuisinent pour faire plaisir",
    pdfPath: "enfants-cuisinent.pdf",
    downloadFileName: "Les-enfants-cuisinent.pdf",
    priceLabel: "10 $ CAD, aucune taxe ajoutée",
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
    priceJustification:
      "Pourquoi 10 $ ? Parce que ce n'est pas un kit de fiches : c'est un livre complet, en un seul PDF — au même prix que « La faim justifie les moyens », pensé pour les petits budgets. Le prix est unique pour tout le monde — 10 $ CAD, aucune taxe ajoutée (HP Outils est un petit fournisseur : la TPS et la TVQ ne sont pas perçues). Et le livre reste à toi — pour les familles, les parents, les enfants, les écoles et les organismes qui cuisinent pour faire plaisir.",
  },
  // ALIAS — livraison des achats déjà payés à 20 $ (lookup_key
  // `enfants_cuisinent_pdf_20`). Placée APRÈS l'entrée principale :
  // `getProductBySlug` trouve l'entrée à 10 $ d'abord, donc la fiche
  // et l'achat affichent le nouveau prix. Ne pas supprimer : les
  // commandes à 20 $ résolvent leur PDF via cette clé.
  enfants_cuisinent_pdf_20: {
    priceId: "enfants_cuisinent_pdf_20",
    slug: "enfants-cuisinent",
    title: "Les enfants cuisinent pour faire plaisir",
    pdfPath: "enfants-cuisinent.pdf",
    downloadFileName: "Les-enfants-cuisinent.pdf",
    priceLabel: "20 $ CAD, aucune taxe ajoutée",
    blurb:
      "Un projet doux pour transmettre le plaisir, pas la performance. Téléchargement immédiat après paiement.",
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
    shortDescription:
      "Reprendre le contrôle de son frigo : une méthode pour bâtir un repas avec ce qu'on a déjà, sauver ce qui fatigue et comprendre les dates sans paniquer.",
    contents: [
      "La méthode des 4 morceaux : bâtir un repas avec ce que tu as",
      "Sauver les aliments fatigués, sans jouer avec la salubrité",
      "Comprendre les dates sans paniquer",
      "Des listes réalistes pour cuisiner avec peu",
    ],
    preview: {
      title: "Fiche — La méthode des 4 morceaux",
      text: "Pour bâtir un repas simple, cherche une base, une protéine, un légume et une sauce ou un élément de goût.",
    },
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
    healthSupport: true,
    shortDescription:
      "Quand les tâches ordinaires semblent trop lourdes : choisir l'essentiel, avancer par petites étapes et garder des repères simples, sans se juger.",
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
    shortDescription:
      "24 fiches pour trier, classer et reprendre le contrôle de ses papiers — courrier, factures, démarches — sans tout régler en une seule journée.",
    volumeLabel: "24 fiches",
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
    healthSupport: true,
    shortDescription:
      "Se retrouver quand on s'est perdu·e de vue : reconnaître sa façon de fonctionner et adapter sa journée à son énergie, sans se comparer.",
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
    shortDescription:
      "S'habiller, se meubler et s'équiper en seconde main, par choix ou par nécessité : acheter, vendre, donner et récupérer, simplement et sans jugement.",
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
    shortDescription:
      "Demander de l'aide sans s'excuser, en offrir sans s'épuiser : formuler un besoin, poser ses limites et créer une entraide respectueuse.",
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
    shortDescription:
      "Reconnaître les arnaques courantes et savoir quoi faire devant un message suspect : vérifier, réagir et protéger ses renseignements, sans avoir honte d'avoir douté.",
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
    shortDescription:
      "Garder, retrouver ou mieux organiser un chez-soi : des repères concrets pour préparer ses démarches, comprendre sa situation et savoir vers qui se tourner.",
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
    healthSupport: true,
    shortDescription:
      "Soutenir un proche sans s'oublier : nommer ce qui pèse, organiser l'aide autour de soi et garder une place pour ses propres besoins.",
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
    healthSupport: true,
    shortDescription:
      "Se préparer aux 72 premières heures d'une urgence : vérifier les besoins essentiels, rassembler le matériel et établir un plan réaliste, avant que ça arrive.",
    audienceSentence:
      "Ce kit s'adresse aux personnes et aux familles qui veulent se préparer aux 72 premières heures d'une urgence. Il fournit une méthode simple pour vérifier les besoins essentiels, rassembler le matériel et établir un plan réaliste.",
  },
  sans_honte_collection_pdf_40: {
    priceId: "sans_honte_collection_pdf_40",
    slug: "sans-honte-collection",
    title: "Collection Sans Honte — Choisis 10 kits parmi 15",
    pdfPath: "sans-honte-collection.pdf",
    downloadFileName: "Collection-Sans-Honte.pdf",
    priceLabel: "40 $ CAD, aucune taxe ajoutée",
    blurb:
      "Papiers, Frigo, Tenir Debout, Seconde Main, Entraide… choisis 10 kits parmi les 15, en un seul téléchargement.",
    cover: "/images/sans-honte/collection-cover.png",
    formatLabel: "Collection PDF",
    shortDescription:
      "Le bundle regroupe 10 kits Sans Honte au choix, parmi les 15 de la collection, en format PDF.",
    healthSupport: true,
    includes: [
      "10 kits Sans Honte au choix (parmi 15), en PDF",
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
    precaution:
      "Le choix des kits se fait à l'étape suivante, avant le paiement : tu coches exactement 10 kits parmi les 15, et ce sont ces 10-là que tu reçois par courriel.",
  },
  // MINI CAHIER « HP — HYPER POTENTIEL » — publié le 23 octobre 2026
  // (déplacé de MINI_CAHIER_DRAFT, voir la note à la fin du fichier).
  // Produit + prix créés dans Stripe en MODE TEST le 22 octobre 2026
  // (lookup_key `hp_hyper_potentiel_cahier_pdf_10`, 10 $ CAD) et PDF
  // téléversé dans le bucket `pdfs` le 23 octobre 2026.
  // Prix RÉEL créé le 24 octobre 2026 (même lookup_key, prix par défaut) :
  // l'achat est ouvert à 10 $ — `purchaseHold` retiré ce jour.
  hp_hyper_potentiel_cahier_pdf_10: {
    priceId: "hp_hyper_potentiel_cahier_pdf_10",
    slug: "mini-cahier-hyper-potentiel",
    title: "HP — Hyper potentiel — le mini cahier",
    pdfPath: "mini-cahier-hyper-potentiel.pdf",
    downloadFileName: "mini-cahier-hyper-potentiel.pdf",
    priceLabel: "10 $ CAD, aucune taxe ajoutée",
    blurb:
      "Zéro miracle : des pratiques appuyées par la recherche, 20 pages d'exercices pour passer à l'action.",
    cover: "/images/cover-hyper-potentiel.jpg",
    formatLabel: "Version PDF",
    shortDescription:
      "Un mini cahier de 20 pages à imprimer — ikigaï, respiration, méditation, mouvement et buts — pour explorer ton potentiel au crayon, à ton rythme.",
    volumeLabel: "20 pages",
    includes: [
      "Le fichier PDF complet — 20 pages, couverture comprise",
      "Des exercices à remplir au crayon dans chaque section : ta carte ikigaï, tes séances de respiration et de méditation, ton plan WOOP, ton suivi de 30 jours",
      "L'outil web gratuit HP — Hyper potentiel en compagnon (respiration guidée, carte ikigaï interactive, plan WOOP) — sur hp-outils.com",
      "Téléchargement immédiat après l'achat",
      "Usage personnel",
      "À imprimer chez toi ou au centre de copies",
    ],
    contents: [
      "Ta carte ikigaï",
      "Respiration et méditation guidée de 2 minutes",
      "Auto-hypnose désenchantée — avec ses prudences",
      "Reprise d'activité sur 4 semaines",
      "Menu de 12 micro-expériences pour trouver tes passions",
      "Ton plan WOOP",
      "Suivi de 30 jours et tableau de bord à réimprimer",
    ],
  },
};

export function getProduct(priceId: string): DigitalProduct | null {
  return PRODUCTS[priceId] ?? null;
}

export function getProductBySlug(slug: string): DigitalProduct | null {
  return Object.values(PRODUCTS).find((p) => p.slug === slug) ?? null;
}

// --- Bundle Sans Honte : « Choisis 10 kits parmi 15 » -----------------------

export const COLLECTION_PRICE_ID = "sans_honte_collection_pdf_40";
export const BUNDLE_KIT_COUNT = 10;

/** Les 15 kits Sans Honte vendus à l'unité, dans l'ordre du catalogue. */
export function getSansHonteKits(): DigitalProduct[] {
  return Object.values(PRODUCTS).filter((p) => p.formatLabel === "Kit PDF");
}

/**
 * Valide un choix de bundle : exactement BUNDLE_KIT_COUNT slugs, uniques,
 * qui correspondent chacun à un kit Sans Honte. Retourne les produits
 * résolus, ou null si le choix est invalide.
 */
export function resolveKitSelection(slugs: unknown): DigitalProduct[] | null {
  if (!Array.isArray(slugs) || slugs.length !== BUNDLE_KIT_COUNT) return null;
  if (!slugs.every((s) => typeof s === "string")) return null;
  if (new Set(slugs).size !== slugs.length) return null;
  const kits: DigitalProduct[] = [];
  for (const slug of slugs as string[]) {
    const p = getProductBySlug(slug);
    if (!p || p.formatLabel !== "Kit PDF") return null;
    kits.push(p);
  }
  return kits;
}

// ============================================================================
// COLLECTION « OUTILS PAPIER » — 16 produits EN BROUILLON, NON PUBLIÉS
// ============================================================================
// IMPORTANT — pourquoi ces entrées ne sont PAS dans `PRODUCTS` :
// `PRODUCTS` est consommé directement par les routes /pdf/$slug et
// /achat/$slug, par le sitemap et par la création de session de paiement
// (payments.functions.ts). Y ajouter une entrée la rendrait immédiatement
// visible et indexée, sans produit Stripe ni fichier PDF en place.
// Il n'existe aucun mécanisme « brouillon » dans `PRODUCTS`.
//
// Ces 16 entrées vivent donc dans un tableau séparé, `PAPER_TOOLS_DRAFT`,
// qu'AUCUNE page, route, sitemap ou fonction de paiement ne consomme.
// Elles ne sont ni visibles, ni achetables, ni téléchargeables en l'état.
//
// Pour publier un produit (un par un, après validation d'Hugo) :
//   1. créer le produit + le prix dans Stripe (voir
//      feuille-stripe-outils-papier.md à la racine du dépôt) et reporter le
//      lookup_key créé dans `priceId` ET comme clé de l'entrée ;
//   2. téléverser le fichier PDF de vente (couverture + pages de contenu)
//      dans le bucket `pdfs` et reporter son chemin dans `pdfPath` ;
//   3. déplacer l'entrée de `PAPER_TOOLS_DRAFT` vers `PRODUCTS`
//      (type DigitalProduct) ;
//   4. seulement alors, la relier à une page catégorie (/outils ou
//      /livres-pdf, dont les listes sont codées en dur dans les routes).

export type PaperToolCategory = "fiche" | "thematique" | "planificateur";

export interface PaperToolDraft {
  /** Toujours "draft" tant que l'entrée est dans ce tableau. */
  status: "draft";
  /**
   * price_id à créer — aucun produit ni prix Stripe n'existe encore pour
   * ces 16 outils. Dans ce catalogue, `priceId` est le lookup_key Stripe
   * (résolu côté serveur via stripe.prices.list({ lookup_keys })).
   * Le lookup_key proposé pour chaque produit est dans `proposedLookupKey`
   * et dans feuille-stripe-outils-papier.md.
   */
  priceId: null;
  proposedLookupKey: string;
  slug: string;
  title: string; // nom du produit
  category: PaperToolCategory;
  categoryLabel: "Fiche pratique" | "Outil thématique" | "Planificateur";
  priceCad: number; // prix unitaire, CAD, aucune taxe ajoutée
  priceLabel: string; // ex. « 5 $ CAD, aucune taxe ajoutée »
  pages: number; // pages de contenu (la couverture de vente ne se compte pas)
  blurb: string; // accroche de la fiche produit (spec, section 6, élément 3)
  metadataLine: string; // spec, section 6, élément 5
  taxNote: string; // spec, section 6, élément 4
  includes: string[]; // bloc « Ce que tu reçois » (spec, section 6, élément 7)
  /** Fichier de vente à téléverser dans le bucket `pdfs` — pas encore fait. */
  pdfPath: null;
  proposedDownloadFileName: string;
  /** Slugs des planificateurs suggérés en paire (offre « 2 pour 15 $ »). */
  suggestedPairs?: string[];
}

export const PAPER_TOOL_TAX_NOTE = "Aucune taxe ajoutée — petit fournisseur";

export const PAPER_TOOL_INCLUDES: string[] = [
  "Le fichier PDF complet — couverture + pages de contenu",
  "Téléchargement immédiat après l'achat",
  "Usage personnel",
  "À imprimer chez toi ou au centre de copies",
];

function paperToolMetadataLine(pages: number): string {
  return `${pages} pages · Format Lettre (8,5 × 11 po) · Non daté · Réutilisable — imprime seulement les pages qu'il te faut`;
}

// ----------------------------------------------------------------------------
// OFFRE « 2 planificateurs pour 15 $ » (spec, section 6 — l'offre)
// ----------------------------------------------------------------------------
// Texte de l'encadré à afficher sous le bouton d'achat, sur les fiches des
// planificateurs seulement. Données préparées, NON affichées : aucune fiche
// produit n'existe encore pour ces brouillons.
//
// ⚠️ RÉDUCTION NON IMPLÉMENTÉE dans le flux actuel, honnêtement :
// le site n'a PAS de panier. Le paiement est mono-produit —
// PdfCheckout.tsx → createPdfCheckoutSession crée une session Stripe
// Embedded avec UN seul line_item (quantity 1) pour UN priceId.
// Une réduction « automatique dans le panier » exige donc, avant activation :
//   a) un panier multi-produits (état client + page panier), OU une offre
//      groupée dédiée ;
//   b) une session Checkout multi-lignes sachant appliquer la réduction ;
//   c) au choix : un coupon / une promotion Stripe, ou un ajustement de
//      prix calculé côté serveur — à décider au moment de construire le
//      panier, PAS un rabais appliqué côté client.
// La règle métier, elle, est codée ci-dessous en fonction pure, prête à être
// branchée par le futur panier et déjà testable telle quelle.
export const PLANIFICATEUR_PAIR_OFFER = {
  category: "planificateur" as PaperToolCategory,
  pairSize: 2,
  pairPriceCad: 15,
  unitPriceCad: 8,
  discountPerPairCad: 1,
  boxTitle: "Un deuxième planificateur pour 7 $",
  boxText:
    "Choisis-en deux : la paire revient à 15 $ au lieu de 16 $. La réduction s'applique automatiquement dans le panier.",
  /** Paires suggérées approuvées (slugs) — les autres paires restent à décider. */
  suggestedPairs: [
    ["outil-papier-budget-par-paie", "planificateur-famille"],
    ["planificateur-tdah", "outil-papier-habitudes-bien-etre"],
    ["planificateur-etudiant", "planificateur-tdah"],
    ["planificateur-gerant", "outil-papier-budget-par-paie"],
  ] as Array<[string, string]>,
};

/**
 * Règle de l'offre, interprétation retenue : dès que le panier contient
 * 2 produits de catégorie « planificateur » ou plus, CHAQUE PAIRE COMPLÈTE
 * donne 1 $ de réduction. Les planificateurs sont comptés tous modèles
 * confondus (les paires suggérées sont des suggestions, pas une condition) :
 * 2 planificateurs → −1 $, 3 → −1 $ (une paire complète), 4 → −2 $.
 * NON BRANCHÉE au checkout actuel (aucun panier — voir ci-dessus).
 */
export function planificateurPairDiscountCad(planificateurCount: number): number {
  const count = Math.max(0, Math.floor(planificateurCount));
  return Math.floor(count / PLANIFICATEUR_PAIR_OFFER.pairSize) * PLANIFICATEUR_PAIR_OFFER.discountPerPairCad;
}

export const PAPER_TOOLS_DRAFT: PaperToolDraft[] = [
  // --- Fiche pratique — 2 $ -------------------------------------------------
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "outil_papier_code_familial_anti_clone_pdf_2",
    slug: "outil-papier-code-familial-anti-clone",
    title: "Le Code familial anti-clone",
    category: "fiche",
    categoryLabel: "Fiche pratique",
    priceCad: 2,
    priceLabel: "2 $ CAD, aucune taxe ajoutée",
    pages: 8,
    blurb: "Un mot de passe que seuls les vrais membres de ta famille connaissent.",
    metadataLine: paperToolMetadataLine(8),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [...PAPER_TOOL_INCLUDES],
    pdfPath: null,
    proposedDownloadFileName: "outil-papier-code-familial-anti-clone.pdf",
  },
  // --- Outils thématiques — 5 $ ---------------------------------------------
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "outil_papier_repas_epicerie_pdf_5",
    slug: "outil-papier-repas-epicerie",
    title: "Mes repas, mon épicerie",
    category: "thematique",
    categoryLabel: "Outil thématique",
    priceCad: 5,
    priceLabel: "5 $ CAD, aucune taxe ajoutée",
    pages: 10,
    blurb: "Le souper décidé, la liste faite : l'épicerie sans improviser.",
    metadataLine: paperToolMetadataLine(10),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [...PAPER_TOOL_INCLUDES],
    pdfPath: null,
    proposedDownloadFileName: "outil-papier-repas-epicerie.pdf",
  },
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "outil_papier_carnet_codes_pdf_5",
    slug: "outil-papier-carnet-codes",
    title: "Mon carnet de codes",
    category: "thematique",
    categoryLabel: "Outil thématique",
    priceCad: 5,
    priceLabel: "5 $ CAD, aucune taxe ajoutée",
    pages: 16,
    blurb: "Tous tes codes au même endroit — sans jamais écrire le mot de passe au complet.",
    metadataLine: paperToolMetadataLine(16),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [...PAPER_TOOL_INCLUDES],
    pdfPath: null,
    proposedDownloadFileName: "outil-papier-carnet-codes.pdf",
  },
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "outil_papier_menage_maison_pdf_5",
    slug: "outil-papier-menage-maison",
    title: "Ma maison, sans y penser",
    category: "thematique",
    categoryLabel: "Outil thématique",
    priceCad: 5,
    priceLabel: "5 $ CAD, aucune taxe ajoutée",
    pages: 12,
    blurb: "La maison reste propre presque toute seule : une tâche à la fois.",
    metadataLine: paperToolMetadataLine(12),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [...PAPER_TOOL_INCLUDES],
    pdfPath: null,
    proposedDownloadFileName: "outil-papier-menage-maison.pdf",
  },
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "outil_papier_demenagement_pdf_5",
    slug: "outil-papier-demenagement",
    title: "Je déménage sans virer fou",
    category: "thematique",
    categoryLabel: "Outil thématique",
    priceCad: 5,
    priceLabel: "5 $ CAD, aucune taxe ajoutée",
    pages: 12,
    blurb: "Déménager sans virer fou : chaque étape dans l'ordre, du bail aux cartons.",
    metadataLine: paperToolMetadataLine(12),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [...PAPER_TOOL_INCLUDES],
    pdfPath: null,
    proposedDownloadFileName: "outil-papier-demenagement.pdf",
  },
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "outil_papier_inventaire_maison_pdf_5",
    slug: "outil-papier-inventaire-maison",
    title: "Tout ce qu'on a — inventaire de la maison",
    category: "thematique",
    categoryLabel: "Outil thématique",
    priceCad: 5,
    priceLabel: "5 $ CAD, aucune taxe ajoutée",
    pages: 12,
    blurb: "Tout ce que ta maison contient, noté une fois — pour l'assurance comme pour la succession.",
    metadataLine: paperToolMetadataLine(12),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [...PAPER_TOOL_INCLUDES],
    pdfPath: null,
    proposedDownloadFileName: "outil-papier-inventaire-maison.pdf",
  },
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "outil_papier_registre_de_mes_ia_pdf_5",
    slug: "outil-papier-registre-de-mes-ia",
    title: "Le Registre de mes IA",
    category: "thematique",
    categoryLabel: "Outil thématique",
    priceCad: 5,
    priceLabel: "5 $ CAD, aucune taxe ajoutée",
    pages: 10,
    blurb: "Sache quelles IA voient quoi de ta vie — et garde le contrôle.",
    metadataLine: paperToolMetadataLine(10),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [...PAPER_TOOL_INCLUDES],
    pdfPath: null,
    proposedDownloadFileName: "outil-papier-registre-de-mes-ia.pdf",
  },
  // --- Planificateurs — 8 $ (offre « 2 pour 15 $ », voir plus haut) ---------
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "outil_papier_budget_par_paie_pdf_8",
    slug: "outil-papier-budget-par-paie",
    title: "Mon budget par paie",
    category: "planificateur",
    categoryLabel: "Planificateur",
    priceCad: 8,
    priceLabel: "8 $ CAD, aucune taxe ajoutée",
    pages: 14,
    blurb: "Chaque paie, tu sais où va ton argent — avant qu'il parte.",
    metadataLine: paperToolMetadataLine(14),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [...PAPER_TOOL_INCLUDES],
    pdfPath: null,
    proposedDownloadFileName: "outil-papier-budget-par-paie.pdf",
    suggestedPairs: ["planificateur-famille", "planificateur-gerant"],
  },
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "outil_papier_semaine_familiale_pdf_8",
    slug: "outil-papier-semaine-familiale",
    title: "Notre semaine",
    category: "planificateur",
    categoryLabel: "Planificateur",
    priceCad: 8,
    priceLabel: "8 $ CAD, aucune taxe ajoutée",
    pages: 10,
    blurb: "La semaine de toute la famille sur une page, accrochée au frigo.",
    metadataLine: paperToolMetadataLine(10),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [...PAPER_TOOL_INCLUDES],
    pdfPath: null,
    proposedDownloadFileName: "outil-papier-semaine-familiale.pdf",
    // Aucune paire suggérée approuvée pour ce produit pour l'instant.
  },
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "outil_papier_habitudes_bien_etre_pdf_8",
    slug: "outil-papier-habitudes-bien-etre",
    title: "Mes habitudes, jour après jour",
    category: "planificateur",
    categoryLabel: "Planificateur",
    priceCad: 8,
    priceLabel: "8 $ CAD, aucune taxe ajoutée",
    pages: 10,
    blurb: "Une case à cocher par jour : tes habitudes deviennent visibles.",
    metadataLine: paperToolMetadataLine(10),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [...PAPER_TOOL_INCLUDES],
    pdfPath: null,
    proposedDownloadFileName: "outil-papier-habitudes-bien-etre.pdf",
    suggestedPairs: ["planificateur-tdah"],
  },
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "outil_papier_suivi_sante_pdf_8",
    slug: "outil-papier-suivi-sante",
    title: "Mon suivi santé",
    category: "planificateur",
    categoryLabel: "Planificateur",
    priceCad: 8,
    priceLabel: "8 $ CAD, aucune taxe ajoutée",
    pages: 12,
    blurb: "Tes symptômes et tes médicaments notés au même endroit pour ton prochain rendez-vous.",
    metadataLine: paperToolMetadataLine(12),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [...PAPER_TOOL_INCLUDES],
    pdfPath: null,
    proposedDownloadFileName: "outil-papier-suivi-sante.pdf",
    // Aucune paire suggérée approuvée pour ce produit pour l'instant.
  },
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "outil_papier_auto_carnet_pdf_8",
    slug: "outil-papier-auto-carnet",
    title: "Mon auto, son carnet",
    category: "planificateur",
    categoryLabel: "Planificateur",
    priceCad: 8,
    priceLabel: "8 $ CAD, aucune taxe ajoutée",
    pages: 12,
    blurb: "L'historique complet de ton auto, du premier changement d'huile à la revente.",
    metadataLine: paperToolMetadataLine(12),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [...PAPER_TOOL_INCLUDES],
    pdfPath: null,
    proposedDownloadFileName: "outil-papier-auto-carnet.pdf",
    // Aucune paire suggérée approuvée pour ce produit pour l'instant.
  },
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "planificateur_famille_pdf_8",
    slug: "planificateur-famille",
    title: "Le Planificateur de famille",
    category: "planificateur",
    categoryLabel: "Planificateur",
    priceCad: 8,
    priceLabel: "8 $ CAD, aucune taxe ajoutée",
    pages: 28,
    blurb: "Toute la semaine de la famille au même endroit — fini la tête qui sait tout.",
    metadataLine: paperToolMetadataLine(28),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [...PAPER_TOOL_INCLUDES],
    pdfPath: null,
    proposedDownloadFileName: "planificateur-famille.pdf",
    suggestedPairs: ["outil-papier-budget-par-paie"],
  },
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "planificateur_gerant_pdf_8",
    slug: "planificateur-gerant",
    title: "Le Planificateur du gérant",
    category: "planificateur",
    categoryLabel: "Planificateur",
    priceCad: 8,
    priceLabel: "8 $ CAD, aucune taxe ajoutée",
    pages: 24,
    blurb: "Horaires, ouvertures, passations : le commerce roule, même quand tu n'es pas là.",
    metadataLine: paperToolMetadataLine(24),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [...PAPER_TOOL_INCLUDES],
    pdfPath: null,
    proposedDownloadFileName: "planificateur-gerant.pdf",
    suggestedPairs: ["outil-papier-budget-par-paie"],
  },
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "planificateur_tdah_pdf_8",
    slug: "planificateur-tdah",
    title: "Mon planificateur TDAH",
    category: "planificateur",
    categoryLabel: "Planificateur",
    priceCad: 8,
    priceLabel: "8 $ CAD, aucune taxe ajoutée",
    pages: 28,
    blurb: "Trois choses par jour, pas trente — un planificateur qui ne te juge pas.",
    metadataLine: paperToolMetadataLine(28),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [...PAPER_TOOL_INCLUDES],
    pdfPath: null,
    proposedDownloadFileName: "planificateur-tdah.pdf",
    suggestedPairs: ["outil-papier-habitudes-bien-etre", "planificateur-etudiant"],
  },
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "planificateur_etudiant_pdf_8",
    slug: "planificateur-etudiant",
    title: "Le Planificateur de l'étudiant",
    category: "planificateur",
    categoryLabel: "Planificateur",
    priceCad: 8,
    priceLabel: "8 $ CAD, aucune taxe ajoutée",
    pages: 24,
    blurb: "Ta session au complet sur papier : échéances, examens et budget, sans application.",
    metadataLine: paperToolMetadataLine(24),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [...PAPER_TOOL_INCLUDES],
    pdfPath: null,
    proposedDownloadFileName: "planificateur-etudiant.pdf",
    suggestedPairs: ["planificateur-tdah"],
  },
];

// ----------------------------------------------------------------------------
// DUOS PLANIFICATEURS — 4 produits groupés à 15 $, EN BROUILLON, NON PUBLIÉS
// ----------------------------------------------------------------------------
// Décision d'Hugo (2026-10-21, 22 h 06) : les 4 paires approuvées de l'offre
// « 2 planificateurs pour 15 $ » deviennent des produits « Duo » à part
// entière. Raison : le site n'a pas de panier (paiement mono-produit), donc
// la réduction automatique de PLANIFICATEUR_PAIR_OFFER n'est pas branchable
// au flux actuel — chaque duo est UN produit qui livre UN PDF combiné
// (couverture duo + les deux fichiers de vente complets, chacun avec sa
// propre couverture et son contenu uniformisé).
//
// Même statut que PAPER_TOOLS_DRAFT : ce tableau n'est consommé par AUCUNE
// page, route, sitemap ou fonction de paiement. Rien n'est visible ni
// vendable en l'état, aucun produit ni prix Stripe n'existe pour ces duos.
// Publication (après validation d'Hugo) : mêmes étapes que les outils
// papier — créer le produit + le prix dans Stripe avec le lookup_key
// proposé (voir feuille-stripe-outils-papier.md, section « Duos
// planificateurs »), téléverser le PDF duo dans le bucket `pdfs`, puis
// déplacer l'entrée vers `PRODUCTS`.

export interface PaperToolDuoComponent {
  slug: string;
  title: string;
  /** Pages de contenu de l'outil (sa couverture de vente ne se compte pas). */
  contentPages: number;
}

export interface PaperToolDuoDraft {
  /** Toujours "draft" tant que l'entrée est dans ce tableau. */
  status: "draft";
  /** price_id (lookup_key Stripe) à créer — rien n'existe encore. */
  priceId: null;
  proposedLookupKey: string;
  slug: string;
  title: string;
  category: "duo";
  categoryLabel: "Duo planificateurs";
  priceCad: number; // 15 $ CAD, aucune taxe ajoutée
  priceLabel: string;
  /** Pages du fichier de vente duo, hors couverture duo (les deux outils au complet, couvertures comprises). */
  pages: number;
  /** Pages totales du fichier de vente duo, couverture duo comprise. */
  totalPages: number;
  blurb: string; // accroche de la paire (passes Marketing)
  metadataLine: string;
  taxNote: string;
  includes: string[]; // bloc « Ce que tu reçois » — nomme les deux planificateurs et leurs pages
  components: PaperToolDuoComponent[];
  /** Fichier de vente duo à téléverser dans le bucket `pdfs` — pas encore fait. */
  pdfPath: null;
  proposedDownloadFileName: string;
}

function paperDuoMetadataLine(totalPages: number): string {
  return `${totalPages} pages au total (couverture duo + les deux planificateurs au complet) · Format Lettre (8,5 × 11 po) · Non daté · Réutilisable — imprime seulement les pages qu'il te faut`;
}

export const PAPER_TOOL_DUOS_DRAFT: PaperToolDuoDraft[] = [
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "duo_budget_famille_pdf_15",
    slug: "duo-budget-famille",
    title: "Duo — Mon budget par paie + Le Planificateur de famille",
    category: "duo",
    categoryLabel: "Duo planificateurs",
    priceCad: 15,
    priceLabel: "15 $ CAD, aucune taxe ajoutée",
    pages: 44,
    totalPages: 45,
    blurb: "La maisonnée au complet pour 15 $ : les horaires et les repas d'un bord, l'argent paie par paie de l'autre.",
    metadataLine: paperDuoMetadataLine(45),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [
      "Le fichier PDF complet du duo — la couverture duo, puis les deux planificateurs au complet (chacun avec sa couverture)",
      "Mon budget par paie — 14 pages de contenu",
      "Le Planificateur de famille — 28 pages de contenu",
      "Téléchargement immédiat après l'achat",
      "Usage personnel",
      "À imprimer chez toi ou au centre de copies",
    ],
    components: [
      { slug: "outil-papier-budget-par-paie", title: "Mon budget par paie", contentPages: 14 },
      { slug: "planificateur-famille", title: "Le Planificateur de famille", contentPages: 28 },
    ],
    pdfPath: null,
    proposedDownloadFileName: "duo-budget-famille.pdf",
  },
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "duo_budget_gerant_pdf_15",
    slug: "duo-budget-gerant",
    title: "Duo — Mon budget par paie + Le Planificateur du gérant",
    category: "duo",
    categoryLabel: "Duo planificateurs",
    priceCad: 15,
    priceLabel: "15 $ CAD, aucune taxe ajoutée",
    pages: 40,
    totalPages: 41,
    blurb: "Le commerce la semaine, tes paies sans casse-tête : les deux cahiers qui font rouler l'argent, au travail comme à la maison.",
    metadataLine: paperDuoMetadataLine(41),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [
      "Le fichier PDF complet du duo — la couverture duo, puis les deux planificateurs au complet (chacun avec sa couverture)",
      "Mon budget par paie — 14 pages de contenu",
      "Le Planificateur du gérant — 24 pages de contenu",
      "Téléchargement immédiat après l'achat",
      "Usage personnel",
      "À imprimer chez toi ou au centre de copies",
    ],
    components: [
      { slug: "outil-papier-budget-par-paie", title: "Mon budget par paie", contentPages: 14 },
      { slug: "planificateur-gerant", title: "Le Planificateur du gérant", contentPages: 24 },
    ],
    pdfPath: null,
    proposedDownloadFileName: "duo-budget-gerant.pdf",
  },
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "duo_tdah_habitudes_pdf_15",
    slug: "duo-tdah-habitudes",
    title: "Duo — Mon planificateur TDAH + Mes habitudes, jour après jour",
    category: "duo",
    categoryLabel: "Duo planificateurs",
    priceCad: 15,
    priceLabel: "15 $ CAD, aucune taxe ajoutée",
    pages: 40,
    totalPages: 41,
    blurb: "Le duo sans pression : choisis tes 3 choses d'un côté, suis ton habitude de l'autre — un X à la fois, jamais de retard.",
    metadataLine: paperDuoMetadataLine(41),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [
      "Le fichier PDF complet du duo — la couverture duo, puis les deux planificateurs au complet (chacun avec sa couverture)",
      "Mon planificateur TDAH — 28 pages de contenu",
      "Mes habitudes, jour après jour — 10 pages de contenu",
      "Téléchargement immédiat après l'achat",
      "Usage personnel",
      "À imprimer chez toi ou au centre de copies",
    ],
    components: [
      { slug: "planificateur-tdah", title: "Mon planificateur TDAH", contentPages: 28 },
      { slug: "outil-papier-habitudes-bien-etre", title: "Mes habitudes, jour après jour", contentPages: 10 },
    ],
    pdfPath: null,
    proposedDownloadFileName: "duo-tdah-habitudes.pdf",
  },
  {
    status: "draft",
    priceId: null, // price_id à créer
    proposedLookupKey: "duo_tdah_etudiant_pdf_15",
    slug: "duo-tdah-etudiant",
    title: "Duo — Mon planificateur TDAH + Le Planificateur de l'étudiant",
    category: "duo",
    categoryLabel: "Duo planificateurs",
    priceCad: 15,
    priceLabel: "15 $ CAD, aucune taxe ajoutée",
    pages: 54,
    totalPages: 55,
    blurb: "Pour l'étudiant TDAH : la session entière d'un côté, la journée en 3 choses de l'autre — les oublis n'ont plus de place où se cacher.",
    metadataLine: paperDuoMetadataLine(55),
    taxNote: PAPER_TOOL_TAX_NOTE,
    includes: [
      "Le fichier PDF complet du duo — la couverture duo, puis les deux planificateurs au complet (chacun avec sa couverture)",
      "Mon planificateur TDAH — 28 pages de contenu",
      "Le Planificateur de l'étudiant — 24 pages de contenu",
      "Téléchargement immédiat après l'achat",
      "Usage personnel",
      "À imprimer chez toi ou au centre de copies",
    ],
    components: [
      { slug: "planificateur-tdah", title: "Mon planificateur TDAH", contentPages: 28 },
      { slug: "planificateur-etudiant", title: "Le Planificateur de l'étudiant", contentPages: 24 },
    ],
    pdfPath: null,
    proposedDownloadFileName: "duo-tdah-etudiant.pdf",
  },
];
// ============================================================================
// MINI CAHIER « HP — HYPER POTENTIEL » — PUBLIÉ LE 23 OCTOBRE 2026
// ============================================================================
// L'entrée a été déplacée dans PRODUCTS (clé
// hp_hyper_potentiel_cahier_pdf_10) : produit + prix créés dans Stripe
// (mode test le 22 oct. 2026, prix réel créé le 24 oct. 2026),
 // PDF téléversé dans le bucket `pdfs` le 23 oct. 2026,
// outil web compagnon intégré à /outils/hp-hyper-potentiel avec
// liens croisés. Le tableau MINI_CAHIER_DRAFT ci-dessous est donc
// vide ; l'historique de l'entrée brouillon reste dans Git.
//
export interface MiniCahierDraft {
  /** Toujours "draft" tant que l'entrée est dans ce tableau. */
  status: "draft";
  /** price_id (lookup_key Stripe) à créer — rien n'existe encore. */
  priceId: null;
  proposedLookupKey: string;
  slug: string;
  title: string;
  category: "mini-cahier";
  categoryLabel: "Mini cahier — Série HP";
  priceCad: number; // 10 $ CAD, aucune taxe ajoutée
  priceLabel: string;
  /** Pages du cahier, couverture intégrée (p. 1) comprise. */
  pages: number;
  blurb: string; // accroche de la fiche produit
  slogan: string;
  metadataLine: string;
  taxNote: string;
  includes: string[]; // bloc « Ce que tu reçois »
  /** Fichier de vente à téléverser dans le bucket `pdfs` — pas encore fait. */
  pdfPath: null;
  proposedDownloadFileName: string;
  /** Outil web gratuit compagnon (déposé en attente, non publié). */
  companionTool: {
    title: string;
    /** Route suggérée à la mise en ligne — n'existe pas encore. */
    plannedRoute: string;
    /** Emplacement du HTML dans le dépôt, en attendant l'intégration. */
    holdingPath: string;
  };
}

export const MINI_CAHIER_DRAFT: MiniCahierDraft[] = [
  // Entrée déplacée vers PRODUCTS le 23 octobre 2026 — voir la note de
  // publication dans l'entrée hp_hyper_potentiel_cahier_pdf_10.
];
