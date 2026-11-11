// Adaptateur Cherche et Trouve — Édition des Fêtes — Mega Jeux, 10 nov. 2026.
// Module ESM de déclaration seulement : enveloppe lien + session autour de
// l'édition des Fêtes (v1.0, copie de v1.1 + manche spéciale Fêtes).
// Sources : LOT-VERSIONS-FETES-PREPARATION.md §3 (décisions d'HP, 10 nov. 14 h 42 – 14 h 47).
// Le jeu n'est jamais réécrit, jamais modifié. Rien ici ne décrit un bouton vérifié par clic :
// le bouton de retour et la reprise de partie restent « à vérifier en navigateur live ».

export const ADAPTATEUR_CHERCHE_FETES = {
  id: "cherche-trouve-fetes",
  type: "adaptateur-jeu-live",
  nom: "Cherche et Trouve — Édition des Fêtes",
  emplacement: "B7",
  statut: "construit",
  urlLive: "https://www.hp-outils.com/apps/cherche-trouve-fetes",
  version: "v1.0",
  entree: { type: "lien" },
  sortie: {
    boutonRetourPortail: "à vérifier en navigateur live",
    minimum: "historique du navigateur",
  },
  sauvegarde: { portee: "locale au jeu, non reliée au portail" },
  particularites: [
    "Jeu du monde réel : se joue autour de soi, pas à l'écran — aucune « sortie d'Étincelle » n'a de sens ici ; l'adaptateur est au niveau lien/session, pas au niveau personnage.",
    "3 manches de 5 défis + 1 manche spéciale Fêtes de 5 défis (20 défis par partie) ; trouver autour de soi puis taper BINGO! (le groupe valide) ; plus il reste de temps, plus on marque ; défi final double (fin de la 3e manche).",
    "15 défis Fêtes (chocolat chaud, décoration, lumières à compter dehors, sapin, guirlande, cadeau…) ; les lumières sont un défi du lieu « Dehors » existant, à compter (« Compte 5 lumières de Noël »).",
    "Mode Sprint : 3 minutes, BINGO! = 100 points + 25 par combo, 1 carte sur 5 = bonus ×2, 3 indices par partie (un indice divise par deux les points de la carte).",
    "À tour de rôle, multijoueur sur un téléphone : chaque carte = un joueur différent — le retour portail ne doit pas mélanger les joueurs ni réinitialiser la rotation.",
    "Clés de sauvegarde séparées de l'original (préfixe ctv_fetes_) : les records et l'historique de l'édition ne se mélangent pas avec ceux de v1.1.",
    "Édition silencieuse comme l'original : aucun son ajouté.",
    "Pause auto si le téléphone se verrouille ou si on change d'appli — ne pas interrompre : c'est une fonction de sécurité du jeu.",
    "Édition v1.0 (copie de v1.1), préservée, jamais réécrite — l'adaptateur est une enveloppe lien + session autour du jeu intact.",
    "Aucun bouton de retour visible dans le texte lu — à vérifier en navigateur live ; la reprise de la partie après un aller-retour n'est pas vérifiée.",
    "Route /apps/cherche-trouve-fetes à créer au dépôt (lot de dépôt, go séparé) — statut HTTP non vérifié ici.",
  ],
};
