// Adaptateur Caribou Run — Édition des Fêtes — Mega Jeux, 10 nov. 2026.
// Module ESM de déclaration seulement : enveloppe lien + retour autour de
// l'édition des Fêtes (v1.0), construite depuis le jeu live v1.1 intact.
// Modèle : adaptateurs/caribou.js (LOT A). Le jeu n'est jamais réécrit ici.
// Sources : LOT-VERSIONS-FETES-PREPARATION.md §2 (décisions d'HP, 10 nov. 14 h 26–14 h 40).

export const ADAPTATEUR_CARIBOU_FETES = {
  id: "caribou-run-fetes",
  type: "adaptateur-jeu-live",
  nom: "Caribou Run — Édition des Fêtes",
  emplacement: "B6",
  statut: "construit",
  urlLive: "https://www.hp-outils.com/apps/caribou-run-fetes",
  version: "v1.0",
  entree: { type: "lien" },
  sortie: {
    boutonRetourPortail: "à vérifier en navigateur live",
    minimum: "historique du navigateur",
  },
  sauvegarde: { portee: "locale au jeu, non reliée au portail" },
  particularites: [
    "Endless runner : pas de fin naturelle — le retour doit être disponible pendant la partie, pas seulement à la fin (DB-09).",
    "Édition des Fêtes du jeu live v1.1, jamais réécrit : le caribou a le nez rouge, les sapins sont décorés (boules + étoile), les cadeaux se ramassent (+25 pts), les loups sont des obstacles à éviter, la déneigeuse brille de lumières de Noël.",
    "Meilleur score séparé de l'original (clé caribouRunFetesBest) ; stats séparées (caribouRunFetesStats). Cônes, améliorations, skins, pseudo et fantôme partagés avec l'original (repris tels quels, Q-B6-6).",
    "Nouveaux sons de Fêtes en WebAudio synthétisé : clochette du cadeau, tintement de record, hurlement du loup.",
    "Meilleur score gardé sur cet appareil seulement — pas de classement en ligne, juste toi contre toi.",
    "Contrôles : sauter (espace / flèche haut / tap, par-dessus bancs de neige, troncs, rochers et loups ; maintenir = sauter plus haut) ; se baisser (flèche bas / glisser, sous les branches basses ; en l'air, pique vers le sol) ; déneigeuse : sauter au bon moment.",
    "Aucun bouton de retour visible dans le texte lu — à vérifier en navigateur live ; ne pas écraser ni migrer le score (la clé de l'édition est caribouRunFetesBest, distincte de caribouRunBest).",
  ],
};
