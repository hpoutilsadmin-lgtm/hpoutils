// Catalogue « À toi l'histoire » — source unique des tomes.
//
// Données reprises mot pour mot des fiches produits (21 oct. 2026) :
// titres, accroches (première phrase de chaque fiche), nombres de
// paragraphes et de fins, prix CAD et clés de recherche Stripe.
// Ne jamais inventer un prix, une clé ou une accroche : toute correction
// passe par les fiches, puis par ce fichier.
//
// Format de livraison : lien web personnel (format `lien_web` des fiches),
// PAS un PDF. Le tome gratuit n'a pas de prix Stripe, c'est normal.

export interface Tome {
  slug: string;
  title: string;
  /** Première phrase de la fiche — l'accroche carte, jamais inventée. */
  hook: string;
  /** Description complète de la fiche. */
  description: string;
  paragraphes: number;
  fins: number;
  public?: string;
  /** Prix CAD. 0 = gratuit, sans produit Stripe. */
  price: number;
  /** Clé de recherche Stripe (`lookup_key`). Absente pour le gratuit. */
  lookupKey?: string;
}

export const TOMES: Tome[] = [
  {
    slug: "mini_recits",
    title: "Mini-récits",
    hook: "Cinq mini-récits interconnectés autour du Dépanneur Lauzon, à Terrebonne.",
    description:
      "Cinq mini-récits interconnectés autour du Dépanneur Lauzon, à Terrebonne. 149 paragraphes, 20 fins : tes choix tissent les histoires les unes dans les autres. Livre-jeu interactif « À toi l'histoire », reçu par lien web personnel après l'achat.",
    paragraphes: 149,
    fins: 20,
    price: 5,
    lookupKey: "tome_mini_recits_lien_5",
  },
  {
    slug: "directeur",
    title: "Le Directeur",
    hook: "Tu es le directeur d'une école secondaire du Québec : budget, intimidation, parents, réputation — chaque décision pèse.",
    description:
      "Tu es le directeur d'une école secondaire du Québec : budget, intimidation, parents, réputation — chaque décision pèse. 111 paragraphes, 8 fins. Public adulte. Livre-jeu interactif « À toi l'histoire », reçu par lien web personnel après l'achat.",
    paragraphes: 111,
    fins: 8,
    public: "Public adulte",
    price: 5,
    lookupKey: "tome_directeur_lien_5",
  },
  {
    slug: "gaia",
    title: "Gaïa",
    hook: "Tu es la conscience d'une planète, sur 12 milliards d'années : naître, verdir, accueillir la vie… ou la perdre.",
    description:
      "Tu es la conscience d'une planète, sur 12 milliards d'années : naître, verdir, accueillir la vie… ou la perdre. Récit contemplatif, 156 paragraphes et 8 fins. Livre-jeu interactif « À toi l'histoire », reçu par lien web personnel après l'achat.",
    paragraphes: 156,
    fins: 8,
    price: 8,
    lookupKey: "tome_gaia_lien_8",
  },
  {
    slug: "debout",
    title: "Debout!",
    hook: "À l'école, un élève se fait intimider — et cette fois, tu peux changer l'histoire.",
    description:
      "À l'école, un élève se fait intimider — et cette fois, tu peux changer l'histoire. 83 paragraphes, 7 fins ; jauges Courage, Amitié et Calme. Rayon jeunesse. Livre-jeu interactif « À toi l'histoire », reçu par lien web personnel après l'achat.",
    paragraphes: 83,
    fins: 7,
    public: "Rayon jeunesse",
    price: 5,
    lookupKey: "tome_debout_lien_5",
  },
  {
    slug: "contact",
    title: "Contact",
    hook: "Un visiteur est tombé du ciel près de Terrebonne.",
    description:
      "Un visiteur est tombé du ciel près de Terrebonne. Thriller de science-fiction : 153 paragraphes, 8 fins, dont une secrète. Livre-jeu interactif « À toi l'histoire », reçu par lien web personnel après l'achat.",
    paragraphes: 153,
    fins: 8,
    price: 8,
    lookupKey: "tome_contact_lien_8",
  },
  {
    slug: "hiver_loup",
    title: "L'hiver du loup",
    hook: "Tu es un jeune loup, et la meute ne te fera pas de cadeau : gagne ta place de chef, un hiver à la fois.",
    description:
      "Tu es un jeune loup, et la meute ne te fera pas de cadeau : gagne ta place de chef, un hiver à la fois. 151 paragraphes, 8 fins. Rayon jeunesse. Livre-jeu interactif « À toi l'histoire », reçu par lien web personnel après l'achat.",
    paragraphes: 151,
    fins: 8,
    public: "Rayon jeunesse",
    price: 8,
    lookupKey: "tome_hiver_loup_lien_8",
  },
  {
    slug: "voile",
    title: "Le Voile",
    hook: "Enquête paranormale à Valbrume, dans les Laurentides : ce qui se cache derrière le Voile attend tes choix.",
    description:
      "Enquête paranormale à Valbrume, dans les Laurentides : ce qui se cache derrière le Voile attend tes choix. 154 paragraphes, 8 fins. Livre-jeu interactif « À toi l'histoire », reçu par lien web personnel après l'achat.",
    paragraphes: 154,
    fins: 8,
    price: 8,
    lookupKey: "tome_voile_lien_8",
  },
  {
    slug: "violence_conjugale",
    title: "Violence conjugale",
    hook: "Roman interactif sur la violence conjugale : comprendre, décider, s'en sortir — avec des ressources d'aide réelles du Québec.",
    description:
      "Roman interactif sur la violence conjugale : comprendre, décider, s'en sortir — avec des ressources d'aide réelles du Québec. 123 paragraphes, 8 fins. Public averti, contenu sensible. Livre-jeu interactif « À toi l'histoire », reçu par lien web personnel après l'achat.",
    paragraphes: 123,
    fins: 8,
    public: "Public averti, contenu sensible",
    price: 5,
    lookupKey: "tome_violence_conjugale_lien_5",
  },
  {
    slug: "halloween",
    title: "Halloween : les quatre cavaliers",
    hook: "La nuit d'Halloween, quatre cavaliers approchent.",
    description:
      "La nuit d'Halloween, quatre cavaliers approchent. Frissons garantis : 106 paragraphes, 7 fins. Public averti — 16 ans et plus. Livre-jeu interactif « À toi l'histoire », reçu par lien web personnel après l'achat.",
    paragraphes: 106,
    fins: 7,
    public: "Public averti — 16 ans et plus",
    price: 5,
    lookupKey: "tome_halloween_lien_5",
  },
  {
    slug: "vague",
    title: "La Vague",
    hook: "Thriller réaliste sur une intelligence artificielle qui déferle : deux points de vue, Rémi et Zahra.",
    description:
      "Thriller réaliste sur une intelligence artificielle qui déferle : deux points de vue, Rémi et Zahra, 178 paragraphes, 8 fins. Livre-jeu interactif « À toi l'histoire », reçu par lien web personnel après l'achat.",
    paragraphes: 178,
    fins: 8,
    price: 8,
    lookupKey: "tome_vague_lien_8",
  },
  {
    slug: "bebe",
    title: "Le bébé",
    hook: "Une conscience d'adulte prisonnière d'un corps de bébé, entre le coma et l'éveil.",
    description:
      "Une conscience d'adulte prisonnière d'un corps de bébé, entre le coma et l'éveil. Drame contemplatif : 112 paragraphes, 7 fins. Public adulte. Livre-jeu interactif « À toi l'histoire », reçu par lien web personnel après l'achat.",
    paragraphes: 112,
    fins: 7,
    public: "Public adulte",
    price: 5,
    lookupKey: "tome_bebe_lien_5",
  },
];

export const FREE_TOME: Tome = {
  slug: "chasse_galerie",
  title: "La Chasse-Galerie",
  hook: "Le tome d'appel de la série — gratuit, sans paiement.",
  description:
    "La Chasse-Galerie, le tome gratuit de la série « À toi l'histoire » : le produit d'appel, sans prix Stripe, reçu par lien web personnel.",
  paragraphes: 0,
  fins: 0,
  price: 0,
};

export const BUNDLE = {
  slug: "bundle_3",
  title: "Bundle 3 tomes au choix",
  hook: "Trois tomes au choix parmi les 11 tomes payants — trois liens web personnels.",
  description:
    "Trois tomes au choix parmi les 11 tomes payants de la série « À toi l'histoire ». Tu choisis tes trois histoires, tu reçois trois liens web personnels. La Chasse-Galerie est déjà gratuite : elle ne compte pas dans les trois.",
  price: 12,
  lookupKey: "tome_bundle_3_lien_12",
  count: 3,
};

export const PAYANT_TOMES = TOMES;
export const ALL_TOMES: Tome[] = [...TOMES, FREE_TOME];

export function getTomeBySlug(slug: string): Tome | undefined {
  return ALL_TOMES.find((t) => t.slug === slug);
}

export function getTomeByLookupKey(lookupKey: string): Tome | undefined {
  if (BUNDLE.lookupKey === lookupKey) return undefined;
  return TOMES.find((t) => t.lookupKey === lookupKey);
}

export function isBundleLookupKey(lookupKey: string): boolean {
  return lookupKey === BUNDLE.lookupKey;
}

export function priceLabel(tome: Tome): string {
  return tome.price === 0 ? "Gratuit" : `${tome.price} $ CAD`;
}

/**
 * Valide un choix bundle : exactement 3 slugs distincts, tous payants.
 * Le gratuit ne compte pas dans les trois (fiche bundle).
 */
export function validateBundleChoice(slugs: unknown): string[] {
  if (!Array.isArray(slugs) || slugs.length !== BUNDLE.count) {
    throw new Error("Le bundle, c'est exactement 3 tomes au choix.");
  }
  const unique = [...new Set(slugs)];
  if (unique.length !== BUNDLE.count) {
    throw new Error("Choisis 3 tomes différents.");
  }
  for (const slug of unique) {
    if (typeof slug !== "string" || !TOMES.some((t) => t.slug === slug)) {
      throw new Error("Un des tomes choisis n'existe pas.");
    }
  }
  return unique as string[];
}
