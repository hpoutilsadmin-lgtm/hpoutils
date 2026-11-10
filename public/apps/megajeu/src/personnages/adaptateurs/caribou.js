// Adaptateur Caribou Run — Mega Jeux, nuit 7 nov. 2026.
// Module ESM de déclaration seulement : enveloppe lien + retour autour du jeu live intact.
// Sources : TABLEAUX.md §2.9 et §5.2 (lecture texte live, 7 nov. 02:13 UTC).
// Le jeu n'est jamais réécrit, jamais modifié. Rien ici ne décrit un bouton vérifié par clic :
// le bouton de retour reste « à vérifier en navigateur live ».

export const ADAPTATEUR_CARIBOU = {
  id: "caribou-run",
  type: "adaptateur-jeu-live",
  nom: null,
  emplacement: null,
  statut: "construit",
  urlLive: "https://www.hp-outils.com/apps/caribou-run",
  version: "v1.1",
  entree: { type: "lien" },
  sortie: {
    boutonRetourPortail: "à vérifier en navigateur live",
    minimum: "historique du navigateur",
  },
  sauvegarde: { portee: "locale au jeu, non reliée au portail" },
  particularites: [
    "Endless runner : pas de fin naturelle — le retour doit être disponible pendant la partie, pas seulement à la fin (DB-09).",
    "Meilleur score gardé sur cet appareil seulement — pas de classement en ligne, juste toi contre toi.",
    "Pommes : compteur en cours de partie.",
    "Contrôles : sauter (espace / flèche haut / tap, par-dessus bancs de neige, troncs, rochers ; maintenir = sauter plus haut) ; se baisser (flèche bas / glisser, sous les branches basses ; en l'air, pique vers le sol) ; déneigeuse : sauter au bon moment.",
    "Jeu live v1.1, préservé, jamais réécrit — l'adaptateur est une enveloppe lien + retour autour du jeu intact.",
    "Aucun bouton de retour visible dans le texte lu — à vérifier en navigateur live ; ne pas écraser ni migrer le score (aucune clé de sauvegarde du jeu n'a été lue).",
  ],
};
