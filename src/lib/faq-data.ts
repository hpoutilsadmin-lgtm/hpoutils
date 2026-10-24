/* Questions fréquentes HP Outils — source UNIQUE de la page /faq.
   Amorce vérifiée : les questions-réponses qu'HGPTO, le petit robot
   du site, donne déjà aux visiteurs (sa base de connaissances,
   src/components/hgpto/hgpto-data.ts) — aucune réponse inventée.
   Boucle « Pour Hugo » (item nº 9, vague 1) : chaque lundi, les
   questions sans réponse validées par Hugo peuvent être versées ici
   par simple édition de ce fichier — la page et son schéma
   FAQPage suivent automatiquement. */

export type FaqEntry = { question: string; reponse: string };

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    question: "Combien coûtent les kits Sans Honte ?",
    reponse:
      "5 $ le kit, ou 40 $ pour le lot de 10 kits au choix parmi 15 thèmes : soins, testament, papiers, 72 heures, entraide, fraude, frigo, logement, proche aidant, tenir debout et les autres. Aucune taxe ajoutée — HP Outils est un petit fournisseur, la TPS et la TVQ ne sont pas perçues.",
  },
  {
    question: "Combien coûtent les livres ?",
    reponse:
      "La faim justifie les moyens 10 $, Horizon Québec 10 $, Enjeux de l'humanité à l'ère de l'IA 15 $ et Les enfants cuisinent pour faire plaisir 10 $. Aucune taxe ajoutée.",
  },
  {
    question: "Les recettes et les jeux sont-ils vraiment gratuits ?",
    reponse:
      "Oui : 629 recettes gratuites en cuisine et 34 jeux gratuits, sans inscription, jouables dans ton navigateur. C'est le cœur d'HP : des outils pour la vraie vie, accessibles à tout le monde.",
  },
  {
    question: "Pourquoi aucune taxe n'est ajoutée aux prix ?",
    reponse:
      "HP Outils est un petit fournisseur : la TPS et la TVQ ne sont pas perçues. Le prix affiché est le prix payé.",
  },
  {
    question: "Comment se fait le paiement, et quand est-ce que je reçois mon achat ?",
    reponse:
      "Le paiement se fait par carte. Après l'achat, le téléchargement de ton PDF est immédiat, et tu reçois aussi ton lien par courriel. Si le courriel n'arrive pas ou si le lien expire, passe par la page « Récupérer un achat » du site.",
  },
  {
    question: "Est-ce qu'il y a des ateliers en personne ?",
    reponse:
      "Oui : Cuisine pratique à 120 $ et Manger mieux avec moins à 150 $, principalement à Terrebonne et dans Lanaudière.",
  },
  {
    question: "C'est quoi, les Passeurs de savoir ?",
    reponse:
      "Le Passeur de savoir rassemble les savoirs pratiques d'ici, transmis par les gens. L'accès des Passeurs au savoir coûtera 3 $ par mois (ou 28 $ pour l'année), et les savoirs s'offriront aussi par quatre pour 12 $ — ce n'est pas encore offert en ligne ; c'est dit honnêtement, et ça s'en vient.",
  },
  {
    question: "Par où commencer pour mes papiers de fin de vie ?",
    reponse:
      "Le kit Testament aide à préparer tes volontés ; un passage chez le notaire reste recommandé pour l'officialiser. Pour les papiers du quotidien, le kit Papiers (24 fiches) aide à tout classer.",
  },
  {
    question: "Qui répond quand j'écris à HP Outils ?",
    reponse:
      "Un humain : Hugo Pierre Bertrand, à hpoutils.admin@gmail.com. Sur le site, HGPTO — le petit robot d'HP — répond aux questions fréquentes ; ce qu'il ne sait pas, il le transmet à Hugo au lieu d'inventer une réponse.",
  },
];
