// Adaptateur Caribou Run — Édition des Fêtes — enveloppe d'exécution — 10 nov. 2026.
// Enveloppe lien + retour autour de l'édition des Fêtes (v1.0). Le jeu n'est jamais
// modifié, jamais réécrit, rien n'y est injecté : ce module ne fait que
// déclarer l'entrée, enregistrer la visite dans la clé du portail
// et fabriquer le bouton de retour destiné à l'hôte futur (cadre/encapsuleur
// du portail, LOT B). Le bouton n'est PAS vérifié en direct : aucun navigateur
// live n'a cliqué dessus dans ce lot ; la validation en direct appartient au LOT B.
// Modèle : adaptateurs/caribou.js (LOT A, 8 nov. 2026).
//
// Déclaration d'origine (ne pas modifier) :
//   ../../src/personnages/adaptateurs/caribou-fetes.js — ADAPTATEUR_CARIBOU_FETES
//   (nom : « Caribou Run — Édition des Fêtes », emplacement : B6).
// Module de sauvegarde du portail (écrit en parallèle, non modifié ici) :
//   ../save.js — clé « hp-pont », interface lire() / ecrire(patch) / effacer().
//   Au moment de l'écriture de ce fichier, ../save.js n'existe pas encore :
//   le module de sauvegarde est donc reçu en paramètre (marquerVisite(save),
//   restaurerPosition(save)) et jamais importé ici. Quand ../save.js existera,
//   l'hôte passera son objet save tel quel — aucune modification de ce fichier
//   ne sera nécessaire.

export { ADAPTATEUR_CARIBOU_FETES } from "../../src/personnages/adaptateurs/caribou-fetes.js";
import { ADAPTATEUR_CARIBOU_FETES } from "../../src/personnages/adaptateurs/caribou-fetes.js";

// --- Adresses (entrée prévue, NON vérifiées en live dans ce lot) ---
// La route /apps/caribou-run-fetes (301 vers le fichier versionné, puis 200)
// n'existe pas encore : le branchement (jeux-adresses.ts, jeux.tsx) appartient
// au lot de dépôt, go séparé. La vérification live 301 → 200 se fera au dépôt —
// ne pas présenter ces adresses comme vérifiées avant cette étape.
// Aucun paramètre « ?return= » : rien de tel n'existe dans le code servi —
// ne pas en inventer un sans validation contre le code réel (FICHE-ADAPTATEURS.md §2).
export const URL_ENTREE_CARIBOU_FETES = "https://www.hp-outils.com/apps/caribou-run-fetes";
export const URL_FINALE_VERIFIEE_CARIBOU_FETES =
  "https://www.hp-outils.com/apps/caribou-run/caribou-run-fetes-v1.0.html";
export const STATUT_HTTP_VERIFIE_CARIBOU_FETES = null; // non vérifié — à vérifier au dépôt/live (301 → 200 attendus)

// --- Bouton de retour (fabrique DOM pour l'hôte futur) ---
// Libellé exact. Hauteur minimale 48 px (cible tactile, standard confort 3 formats).
export const LIBELLE_RETOUR = "Retour au portail";
export const HAUTEUR_MIN_BOUTON_PX = 48;

// --- Clé du portail (définie par ../save.js, rappelée ici, jamais redéfinie) ---
export const CLE_PONT = "hp-pont";

// --- DB-09 : retour pendant la partie ---
// Caribou Run est un endless runner sans fin naturelle : le retour doit être
// disponible PENDANT la partie, pas seulement à la fin. Ce module fabrique un
// bouton montable à tout moment par l'hôte (aucun état de fin de partie requis),
// mais le point de retour en jeu reste À VALIDER en navigateur live au LOT B :
// rien ici ne prouve où ni comment le bouton s'affiche pendant une partie.
export const RETOUR_PENDANT_PARTIE_CARIBOU_FETES = "à valider en navigateur live (LOT B)";

// Identifiant du jeu dans le registre des visites du portail.
export const ID_JEU_CARIBOU_FETES = ADAPTATEUR_CARIBOU_FETES.id;

// Enregistre la visite dans la clé du portail (hp-pont), sans toucher à la
// sauvegarde locale du jeu (meilleur score, pommes, fantôme) : ce module ne
// lit ni n'écrit jamais une autre clé que celle du portail, et n'appelle que
// save.lire() / save.ecrire().
// L'état complet est réécrit (fusion avec l'existant) pour que l'enregistrement
// survive que ecrire() fusionne ou remplace : aucun autre champ de l'état du
// portail n'est perdu. Retourne l'enregistrement de visite écrit.
export function marquerVisite(save) {
  const etat = (save && typeof save.lire === "function" && save.lire()) || {};
  const visites = { ...(etat.visited || {}) };
  const visite = { date: new Date().toISOString(), urlEntree: URL_ENTREE_CARIBOU_FETES };
  visites[ID_JEU_CARIBOU_FETES] = visite;
  save.ecrire({ ...etat, visited: visites });
  return visite;
}

// Relit la position portail enregistrée : la dernière visite de ce jeu
// (date + URL d'entrée). Retourne null si aucune visite n'est enregistrée.
// La « position » ici est celle du portail, pas celle de la partie en cours :
// la reprise de la partie (pommes, score) après un aller-retour reste à
// vérifier en navigateur live (LOT B) — l'adaptateur ne touche pas à l'état
// interne du jeu.
export function restaurerPosition(save) {
  const etat = save && typeof save.lire === "function" ? save.lire() : null;
  if (!etat || !etat.visited) return null;
  return etat.visited[ID_JEU_CARIBOU_FETES] || null;
}

// Fabrique le bouton « Retour au portail » pour l'hôte futur (cadre/encapsuleur
// du portail). Le bouton est un élément DOM ordinaire : l'hôte décide où le
// monter (par exemple une barre visible pendant la partie — DB-09) et quand.
//   urlPortail : adresse de retour du portail (aucune valeur par défaut
//     inventée : l'hôte la fournit).
//   options : { document, naviguer } — réservé aux tests et à l'hôte ;
//     par défaut, le document global et une navigation par location.assign.
// Le clic ne touche jamais à la sauvegarde locale du jeu : il navigue
// seulement vers le portail, le jeu gardant son propre état sur l'appareil.
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
    bouton.setAttribute("data-retour-portail", ID_JEU_CARIBOU_FETES);
    bouton.setAttribute("data-jeu", ID_JEU_CARIBOU_FETES);
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
