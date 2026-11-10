// Adaptateur Cherche et Trouve — La vraie vie — Mega Jeux, nuit 7 nov. 2026.
// Module ESM de déclaration seulement : enveloppe lien + session autour du jeu live intact.
// Sources : TABLEAUX.md §2.9 et §5.1 (lecture texte live, 7 nov. 02:13 UTC).
// Le jeu n'est jamais réécrit, jamais modifié. Rien ici ne décrit un bouton vérifié par clic :
// le bouton de retour et la reprise de partie restent « à vérifier en navigateur live ».

export const ADAPTATEUR_CHERCHE = {
  id: "cherche-trouve-la-vraie-vie",
  type: "adaptateur-jeu-live",
  nom: null,
  emplacement: null,
  statut: "construit",
  urlLive: "https://www.hp-outils.com/apps/cherche-trouve-la-vraie-vie",
  version: "v1.1",
  entree: { type: "lien" },
  sortie: {
    boutonRetourPortail: "à vérifier en navigateur live",
    minimum: "historique du navigateur",
  },
  sauvegarde: { portee: "locale au jeu, non reliée au portail" },
  particularites: [
    "Jeu du monde réel : se joue autour de soi, pas à l'écran — aucune « sortie d'Étincelle » n'a de sens ici ; l'adaptateur est au niveau lien/session, pas au niveau personnage.",
    "3 manches, 15 défis, 1 chrono par défi ; trouver autour de soi puis taper BINGO! (le groupe valide) ; plus il reste de temps, plus on marque ; défi final double.",
    "Mode Sprint : 3 minutes, BINGO! = 100 points + 25 par combo, 1 carte sur 5 = bonus ×2, 3 indices par partie (un indice divise par deux les points de la carte).",
    "À tour de rôle, multijoueur sur un téléphone : chaque carte = un joueur différent — le retour portail ne doit pas mélanger les joueurs ni réinitialiser la rotation.",
    "Pause auto si le téléphone se verrouille ou si on change d'appli — ne pas interrompre : c'est une fonction de sécurité du jeu.",
    "Jeu live v1.1, préservé, jamais réécrit — l'adaptateur est une enveloppe lien + session autour du jeu intact.",
    "Aucun bouton de retour visible dans le texte lu — à vérifier en navigateur live ; la reprise de la partie après un aller-retour n'est pas vérifiée.",
  ],
};
