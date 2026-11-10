// Adaptateur Cherche et Trouve — La vraie vie — enveloppe d'exécution — LOT A, 8 nov. 2026.
// Enveloppe lien + session autour du jeu live intact (v1.1). Le jeu n'est jamais
// modifié, jamais réécrit, rien n'y est injecté : ce module ne fait que
// déclarer l'entrée vérifiée, enregistrer la visite dans la clé du portail
// et fabriquer le bouton de retour destiné à l'hôte futur (cadre/encapsuleur
// du portail, LOT B). Le bouton n'est PAS vérifié en direct : aucun navigateur
// live n'a cliqué dessus dans ce lot ; la validation en direct appartient au LOT B.
//
// Déclaration d'origine (ne pas modifier) :
//   ../../src/personnages/adaptateurs/cherche.js — ADAPTATEUR_CHERCHE
//   (nom : null, emplacement : null — Q62 ouverte, aucun placement en tableau).
// Module de sauvegarde du portail (écrit en parallèle, non modifié ici) :
//   ../save.js — clé « hp-pont », interface lire() / ecrire(patch) / effacer().
//   Au moment de l'écriture de ce fichier, ../save.js n'existe pas encore :
//   le module de sauvegarde est donc reçu en paramètre (marquerVisite(save),
//   restaurerPosition(save)) et jamais importé ici. Quand ../save.js existera,
//   l'hôte passera son objet save tel quel — aucune modification de ce fichier
//   ne sera nécessaire.
//
// Gardes propres à Cherche (FICHE-ADAPTATEURS.md §2) — ce que l'adaptateur
// ne fait JAMAIS, même au retour vers le portail :
//   1. Ne pas mélanger les joueurs : à tour de rôle, chaque carte = un joueur
//      différent. L'enregistrement de visite ne contient aucun joueur et ne
//      touche à aucun champ de rotation.
//   2. Ne pas réinitialiser la rotation à tour de rôle : marquerVisite ne fait
//      que fusionner le registre « visited » ; tout autre champ de l'état du
//      portail est recopié tel quel.
//   3. Ne pas interrompre la pause auto : c'est une fonction de sécurité du jeu
//      (téléphone verrouillé, changement d'appli). Ce module n'expose aucune
//      fonction de pause/reprise et ne touche jamais à l'état de pause.

export { ADAPTATEUR_CHERCHE } from "../../src/personnages/adaptateurs/cherche.js";
import { ADAPTATEUR_CHERCHE } from "../../src/personnages/adaptateurs/cherche.js";

// --- Adresses vérifiées en lecture seule, 8 nov. 2026, 20 h 41 (curl, sans navigateur) ---
// Entrée : 301 vers le fichier versionné, puis 200.
// Aucun paramètre « ?return= » : rien de tel n'existe dans le code servi —
// ne pas en inventer un sans validation contre le code réel (FICHE-ADAPTATEURS.md §2).
export const URL_ENTREE_CHERCHE = "https://www.hp-outils.com/apps/cherche-trouve-la-vraie-vie";
export const URL_FINALE_VERIFIEE_CHERCHE =
  "https://www.hp-outils.com/apps/cherche-trouve-la-vraie-vie/cherche-trouve-la-vraie-vie-v1.1.html";
export const STATUT_HTTP_VERIFIE_CHERCHE = 200;

// --- Bouton de retour (fabrique DOM pour l'hôte futur) ---
// Libellé exact. Hauteur minimale 48 px (cible tactile, standard confort 3 formats).
export const LIBELLE_RETOUR = "Retour au portail";
export const HAUTEUR_MIN_BOUTON_PX = 48;

// --- Clé du portail (définie par ../save.js, rappelée ici, jamais redéfinie) ---
export const CLE_PONT = "hp-pont";

// Identifiant du jeu dans le registre des visites du portail.
export const ID_JEU_CHERCHE = ADAPTATEUR_CHERCHE.id;

// Enregistre la visite dans la clé du portail (hp-pont), sans toucher à la
// sauvegarde locale du jeu ni à son état de session (manche, défis, chrono,
// combos Sprint) : ce module ne lit ni n'écrit jamais une autre clé que celle
// du portail, et n'appelle que save.lire() / save.ecrire().
// Gardes appliquées ici :
//   - fusion du registre « visited » seulement : les champs existants de
//     l'état du portail (rotation des joueurs, pause auto, tout autre champ)
//     sont recopiés tels quels, jamais réinitialisés ni mélangés ;
//   - l'état complet est réécrit pour que l'enregistrement survive que
//     ecrire() fusionne ou remplace.
// Retourne l'enregistrement de visite écrit.
export function marquerVisite(save) {
  const etat = (save && typeof save.lire === "function" && save.lire()) || {};
  const visites = { ...(etat.visited || {}) };
  const visite = { date: new Date().toISOString(), urlEntree: URL_ENTREE_CHERCHE };
  visites[ID_JEU_CHERCHE] = visite;
  save.ecrire({ ...etat, visited: visites });
  return visite;
}

// Relit la position portail enregistrée : la dernière visite de ce jeu
// (date + URL d'entrée). Retourne null si aucune visite n'est enregistrée.
// La « position » ici est celle du portail, pas celle de la partie en cours :
// la reprise de la partie (manche, défis, chrono, combos Sprint) après un
// aller-retour reste à vérifier en navigateur live (LOT B) — l'adaptateur
// ne touche pas à l'état interne du jeu et ne relance aucune rotation.
export function restaurerPosition(save) {
  const etat = save && typeof save.lire === "function" ? save.lire() : null;
  if (!etat || !etat.visited) return null;
  return etat.visited[ID_JEU_CHERCHE] || null;
}

// Fabrique le bouton « Retour au portail » pour l'hôte futur (cadre/encapsuleur
// du portail). Le bouton est un élément DOM ordinaire : l'hôte décide où le
// monter et quand.
//   urlPortail : adresse de retour du portail (aucune valeur par défaut
//     inventée : l'hôte la fournit).
//   options : { document, naviguer } — réservé aux tests et à l'hôte ;
//     par défaut, le document global et une navigation par location.assign.
// Le clic ne touche jamais à la session du jeu : il navigue seulement vers
// le portail. Il ne déclenche aucune pause, aucune reprise et aucune
// réinitialisation — la pause auto du jeu reste sa propre fonction de sécurité.
export function creerBoutonRetour(urlPortail, options = {}) {
  const doc = options.document || globalThis.document;
  if (!doc || typeof doc.createElement !== "function") {
    throw new Error("creerBoutonRetour : aucun document disponible pour fabriquer le bouton.");
  }
  const bouton = doc.createElement("button");
  bouton.type = "button";
  bouton.textContent = LIBELLE_RETOUR;
  bouton.style.minHeight = HAUTEUR_MIN_BOUTON_PX + "px";
  if (typeof bouton.setAttribute === "function") {
    bouton.setAttribute("data-retour-portail", ID_JEU_CHERCHE);
    bouton.setAttribute("data-jeu", ID_JEU_CHERCHE);
  }
  const naviguer =
    options.naviguer ||
    ((url) => {
      if (globalThis.location && typeof globalThis.location.assign === "function") {
        globalThis.location.assign(url);
      }
    });
  if (typeof bouton.addEventListener === "function") {
    bouton.addEventListener("click", () => naviguer(urlPortail));
  }
  return bouton;
}
