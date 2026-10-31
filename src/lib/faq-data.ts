/* Questions fréquentes HP Outils — source UNIQUE de la page /faq.
   Amorce vérifiée : les questions-réponses que Sir H. Gepeto, le gérant du site, donne déjà aux visiteurs (sa base de connaissances,
   src/components/hgpto/hgpto-data.ts) — aucune réponse inventée.
   Boucle « Pour HP » (item nº 9, vague 1) : chaque lundi, les
   questions sans réponse validées par HP peuvent être versées ici
   par simple édition de ce fichier — la page et son schéma
   FAQPage suivent automatiquement. */

export type FaqEntry = { question: string; reponse: string };

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    question: "Combien coûtent les kits Sans Honte ?",
    reponse:
      "5 $ CAD le kit, ou 40 $ CAD pour le lot de 10 kits au choix parmi 15 thèmes : Seconde Main, testament, papiers, 72 heures, entraide, fraude, frigo, logement, proche aidant, tenir debout et les autres. Aucune taxe ajoutée — HP Outils est un petit fournisseur, la TPS et la TVQ ne sont pas perçues.",
  },
  {
    question: "Combien coûtent les livres ?",
    reponse:
      "La faim justifie les moyens 10 $ CAD, Horizon Québec 10 $ CAD, Enjeux de l'humanité à l'ère de l'IA 15 $ CAD, Les enfants cuisinent pour faire plaisir 10 $ CAD et Un petit pas à la fois — le mini cahier 10 $ CAD. Aucune taxe ajoutée.",
  },
  {
    question: "Les recettes et les jeux sont-ils vraiment gratuits ?",
    reponse:
      "Oui : 629 recettes gratuites en cuisine et 37 + 1 caché jeux gratuits, sans inscription, jouables dans votre navigateur. C'est le cœur d'HP : des outils pour la vraie vie, accessibles à tout le monde.",
  },
  {
    question: "Pourquoi aucune taxe n'est ajoutée aux prix ?",
    reponse:
      "HP Outils est un petit fournisseur : la TPS et la TVQ ne sont pas perçues. Le prix affiché est le prix payé.",
  },
  {
    question: "Comment se fait le paiement, et quand est-ce que je reçois mon achat ?",
    reponse:
      "Le paiement se fait par carte. Après l'achat, le téléchargement de votre PDF est immédiat, et vous recevez aussi votre lien par courriel. Pour les tomes, la livraison est un lien de lecture web, pas un téléchargement. Si le courriel n'arrive pas ou si le lien expire, passez par la page « Récupérer un achat » du site.",
  },
  {
    question: "Est-ce qu'il y a des ateliers en personne ?",
    reponse:
      "Oui : 6 ateliers de groupe à Terrebonne et dans Lanaudière — Cuisine pratique (260 $ CAD), Manger mieux avec moins (260 $ CAD), L'IA sans jargon (220 $ CAD), Atelier jeunesse (150 $ CAD), Les enfants cuisinent (190 $ CAD), Hygiène & salubrité (150 $ CAD). Et pour l'Édition des Fêtes (1er octobre au 23 décembre) : le Pain maison à domicile (290 $, 3 h, 6 à 8 personnes), L'IA sans jargon en 2 h (220 $) et la conférence « La faim justifie les moyens » (220 $, 45 à 60 min).",
  },
  {
    question: "C'est quoi, le Passeur de savoir ?",
    reponse:
      "Le Passeur de savoir rassemble les savoirs pratiques d'ici, transmis par les gens. C'est à consulter gratuitement.",
  },
  {
    question: "C'est quoi, les Passeurs (abonnement) ?",
    reponse:
      "Les Passeurs, c'est l'abonnement : l'accès aux 16 savoirs, 3 $ CAD par mois (ou 28 $ CAD pour l'année). L'inscription est ouverte : écrivez à la direction humaine pour vous inscrire, la direction humaine vous répond sous 3 jours ouvrables. Aucune taxe ajoutée : HP Outils est un petit fournisseur.",
  },
  {
    question: "Par où commencer pour mes papiers de fin de vie ?",
    reponse:
      "Le kit Testament aide à préparer vos volontés ; un passage chez le notaire reste recommandé pour l'officialiser. Pour les papiers du quotidien, le kit Papiers (24 fiches) aide à tout classer. Si tout ça vous pèse : 811 ou 988, des humains pour vous écouter, jour et nuit.",
  },
  {
    question: "Qui répond quand j'écris à HP Outils ?",
    reponse:
      "La direction humaine, à hpoutils.admin@gmail.com — réponse sous 3 jours ouvrables. Sur le site, Sir H. Gepeto — le gérant du site — répond aux questions fréquentes ; ce qu'il ne sait pas, il le transmet à l'équipe au lieu d'inventer une réponse.",
  },
  {
    question: "C'est quoi, un jeu à votre image ?",
    reponse:
      "Un petit jeu qui porte votre nom et vos couleurs, que vos clients peuvent jouer et partager. Quatre niveaux : Express 29 $ CAD, Événement 199 $ CAD, Saisonnier 299 $ CAD, Permanent 399 $ CAD. Hébergement gratuit la première année, puis 29 $ CAD par année, par jeu. Aucune taxe ajoutée. La vente n'est pas encore ouverte : le parcours actuel, c'est un brief par courriel, un devis, votre oui explicite, puis un paiement à confirmer. Voir la page « Jeux à votre image ».",
  },
];
