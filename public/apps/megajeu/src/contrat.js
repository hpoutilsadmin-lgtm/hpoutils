// contrat.js — le seul fichier partagé par toutes les équipes du mégajeu.
// Règle HP : un monde = 3 fonctions, rien d'autre.
// Ce fichier ne touche à aucun prototype existant et ne dépend d'aucun DOM :
// la coquille (la page) enregistre le calque de traversée, les mondes ne font que jouer.
// Zéro envoi, zéro compte, zéro requête externe. Sauvegarde locale seulement.
// Motifs repris du code existant : try/catch de noyau.js (pont) et de etat (te-regarde).

// Une seule clé, partagée par tous les jeux. Les anciennes clés
// ("lueur-pont-v1", "hp-gepeto") ne sont pas reprises : la migration des
// mondes existants vers cette clé se fait un monde à la fois, sur gos séparés.
export const CLE_SAUVEGARDE = "hp-pont";

export const etat = {
  lire() {
    try {
      const brut = localStorage.getItem(CLE_SAUVEGARDE);
      if (!brut) return {};
      const parsed = JSON.parse(brut);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  },
  ecrire(patch) {
    try {
      const next = { ...etat.lire(), ...(patch || {}) };
      localStorage.setItem(CLE_SAUVEGARDE, JSON.stringify(next));
    } catch {
      // Stockage plein, navigation privée, accès refusé : le jeu continue
      // en mémoire, seule la persistance est perdue. Jamais d'erreur visible.
    }
  },
  effacer() {
    try {
      localStorage.removeItem(CLE_SAUVEGARDE);
    } catch {
      // Idem : l'échec de l'effacement ne bloque jamais le jeu.
    }
  },
};

function mouvementReduit() {
  try {
    return (
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  } catch {
    return false;
  }
}

export const options = {
  reduireMouvement: mouvementReduit(),
  son: false, // devient true seulement après le premier tap (voir activerSon)
};

// La coquille appelle activerSon() au premier pointerdown. Avant cela,
// aucun son ne démarre — même si le monde appelle un bip.
export function activerSon() {
  options.son = true;
}

// --- Le pont : un seul calque ------------------------------------------------
// La coquille enregistre le calque réel : { montrer(vers), cacher() }.
// Sans calque enregistré (tests, monde seul), traverser() résout immédiatement.
// La coquille décide QUAND traverser (bouton, seuil, glisser) et change le
// monde ensuite ; ce contrat ne gère que le calque visuel et sa durée.
// Durée : 700 ms, 200 ms si mouvement réduit (mêmes valeurs que le prototype).
let couche = null;
let enCours = false;

export const pont = {
  definirCouche(c) {
    couche = c;
  },
  async traverser(de, vers) {
    if (enCours) return false;
    enCours = true;
    try {
      const duree = options.reduireMouvement ? 200 : 700;
      if (couche && typeof couche.montrer === "function") couche.montrer(vers);
      await new Promise((r) => setTimeout(r, duree));
      if (couche && typeof couche.cacher === "function") couche.cacher();
      return true;
    } finally {
      enCours = false;
    }
  },
};

// --- Un monde : exactement 3 fonctions ---------------------------------------
// Usage : export default creerMonde({ id: "A", init(ctx) {}, update(dt, ctx) {}, draw(g, ctx) {} });
// ctx porte ce que le monde peut lire, sans jamais toucher au reste :
//   ctx.etat, ctx.options, ctx.pont, ctx.entree ({ pointer: {x, y, actif }, touches: Set })
// Les anciens gestes (pointer(), sauter(), touche()) migrent vers ctx.entree,
// dans update() — un monde ne reçoit plus d'appels hors de ses 3 fonctions.
export function creerMonde(def) {
  if (typeof def?.id !== "string" || !def.id) {
    throw new Error("Un monde exige un id (texte non vide).");
  }
  const manquantes = ["init", "update", "draw"].filter(
    (f) => typeof def[f] !== "function"
  );
  if (manquantes.length) {
    throw new Error(
      `Monde "${def.id}" : fonction(s) manquante(s) : ${manquantes.join(", ")}. Un monde = 3 fonctions, rien d'autre.`
    );
  }
  return Object.freeze({
    id: def.id,
    init: def.init,
    update: def.update,
    draw: def.draw,
  });
}
