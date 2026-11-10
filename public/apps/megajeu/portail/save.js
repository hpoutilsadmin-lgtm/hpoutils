// save.js — sauvegarde versionnée du mégajeu (LOT A, M10).
// Enveloppe le contrat existant (../src/contrat.js) : une seule clé,
// "hp-pont" (Q74 tranchée). ESM, 0 dépendance, Node + navigateur.
// Règles HP : jamais de plantage, jamais d'erreur visible ; en cas de
// doute, état par défaut + rapport. Rien n'est perdu silencieusement.
// « HP » au mieux, jamais le prénom. Le personnage se nomme Sir H. Gepeto.
//
// Forme versionnée :
//   { version: 1, mondes: { pont: { monde, aCle, finiB, traversees } },
//     visites: {} }
// Les mondes futurs s'ajoutent sous `mondes` ; `visites` note les passages
// (dates, compteurs) sans jamais bloquer le jeu.

import { etat as etatContrat, CLE_SAUVEGARDE } from "../src/contrat.js";

export const VERSION = 1;

// Ancienne clé du pont (« lueur-pont-v1 », voir src/tableaux/pont/pont.js).
// Lue seulement par la migration, jamais écrite ici. Sa suppression exige
// un GO par monde (voir finaliserMigration).
export const ANCIENNE_CLE_PONT = "lueur-pont-v1";

// Champs de progression du pont, repris de l'en-tête de pont.js :
// { monde, aCle, finiB, traversees }.
const CHAMPS_PONT = ["monde", "aCle", "finiB", "traversees"];

// --- État par défaut ---------------------------------------------------------

export function etatParDefaut() {
  return {
    version: VERSION,
    mondes: {
      pont: { monde: "A", aCle: false, finiB: false, traversees: 0 },
    },
    visites: {},
  };
}

function estObjetSimple(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function typeDe(v) {
  if (v === null) return "null";
  if (Array.isArray(v)) return "tableau";
  return typeof v;
}

// Normalise un état v1 lu du stockage : complète les champs manquants,
// préserve les mondes inconnus, les visites et les clés de niveau supérieur
// inconnues. Les champs inconnus du pont sont déplacés sous `ancien`
// (conservés, jamais jetés). Ne lève jamais.
function normaliserV1(brut) {
  const defaut = etatParDefaut();
  const mondesBruts = estObjetSimple(brut.mondes) ? brut.mondes : {};
  const pontBrut = estObjetSimple(mondesBruts.pont) ? mondesBruts.pont : {};
  const pont = {
    monde:
      typeof pontBrut.monde === "string"
        ? pontBrut.monde
        : defaut.mondes.pont.monde,
    aCle: !!pontBrut.aCle,
    finiB: !!pontBrut.finiB,
    traversees: Number.isFinite(pontBrut.traversees)
      ? pontBrut.traversees
      : defaut.mondes.pont.traversees,
  };
  const ancien = {};
  if (estObjetSimple(pontBrut.ancien)) Object.assign(ancien, pontBrut.ancien);
  for (const cle of Object.keys(pontBrut)) {
    if (!CHAMPS_PONT.includes(cle) && cle !== "ancien") {
      ancien[cle] = pontBrut[cle];
    }
  }
  if (Object.keys(ancien).length) pont.ancien = ancien;
  const mondes = { ...mondesBruts, pont };
  const visites = estObjetSimple(brut.visites) ? { ...brut.visites } : {};
  return { ...brut, version: VERSION, mondes, visites };
}

// Lecture brute, diagnostic seulement : distingue vide / corrompu /
// illisible, sans jamais lever. L'écriture passe toujours par le contrat.
function lireBrut() {
  try {
    if (typeof localStorage === "undefined") {
      return { present: false, brut: null, illisible: true };
    }
    const brut = localStorage.getItem(CLE_SAUVEGARDE);
    if (brut === null || brut === undefined || brut === "") {
      return { present: false, brut: null, illisible: false };
    }
    return { present: true, brut, illisible: false };
  } catch {
    return { present: false, brut: null, illisible: true };
  }
}

// Fusion d'un patch dans l'état courant : fusion par monde sous `mondes`
// (chaque monde fusionne ses propres champs), fusion simple sous `visites`,
// version toujours forcée à VERSION. Les valeurs non-objet sous `mondes`
// ou `visites` sont ignorées, jamais plantées.
function fusionner(courant, patch) {
  const next = { ...courant };
  for (const cle of Object.keys(patch)) {
    if (cle === "version" || cle === "mondes" || cle === "visites") continue;
    next[cle] = patch[cle];
  }
  next.version = VERSION;
  if (estObjetSimple(patch.mondes)) {
    const mondes = { ...(courant.mondes || {}) };
    for (const id of Object.keys(patch.mondes)) {
      const mondePatch = patch.mondes[id];
      const mondeCourant = estObjetSimple(mondes[id]) ? mondes[id] : {};
      mondes[id] = estObjetSimple(mondePatch)
        ? { ...mondeCourant, ...mondePatch }
        : mondeCourant;
    }
    next.mondes = mondes;
  }
  if (estObjetSimple(patch.visites)) {
    next.visites = { ...(courant.visites || {}), ...patch.visites };
  }
  return next;
}

// --- Sauvegarde versionnée ---------------------------------------------------

export const PlayerProgress = {
  // Retour : { etat, rapport }.
  // rapport = { ok, raison, version } avec raison parmi :
  //   "ok" | "vide" | "corrompu" | "forme-invalide" | "version-inconnue" |
  //   "version-future" | "version-passee" | "illisible".
  // Version inconnue ou corrompue → état par défaut + rapport, jamais
  // de plantage, jamais d'erreur visible.
  lire() {
    const lu = lireBrut();
    if (lu.illisible) {
      // Stockage inaccessible : on tente quand même le contrat (son repli
      // interne), sinon défaut.
      const viaContrat = etatContrat.lire();
      if (estObjetSimple(viaContrat) && viaContrat.version === VERSION) {
        return {
          etat: normaliserV1(viaContrat),
          rapport: { ok: true, raison: "ok", version: VERSION },
        };
      }
      return {
        etat: etatParDefaut(),
        rapport: { ok: false, raison: "illisible", version: null },
      };
    }
    if (!lu.present) {
      return {
        etat: etatParDefaut(),
        rapport: { ok: true, raison: "vide", version: null },
      };
    }
    let parsed;
    try {
      parsed = JSON.parse(lu.brut);
    } catch {
      return {
        etat: etatParDefaut(),
        rapport: { ok: false, raison: "corrompu", version: null },
      };
    }
    if (!estObjetSimple(parsed)) {
      return {
        etat: etatParDefaut(),
        rapport: { ok: false, raison: "forme-invalide", version: null },
      };
    }
    if (typeof parsed.version !== "number") {
      return {
        etat: etatParDefaut(),
        rapport: {
          ok: false,
          raison: "version-inconnue",
          version: null,
          clesBrutes: Object.keys(parsed),
        },
      };
    }
    if (parsed.version !== VERSION) {
      return {
        etat: etatParDefaut(),
        rapport: {
          ok: false,
          raison:
            parsed.version > VERSION ? "version-future" : "version-passee",
          version: parsed.version,
        },
      };
    }
    return {
      etat: normaliserV1(parsed),
      rapport: { ok: true, raison: "ok", version: VERSION },
    };
  },

  // Écrit un patch (fusion, comme le contrat). Retour : { etat, rapport }.
  // Le rapport vérifie la persistance par relecture : si le stockage a
  // refusé l'écriture, la raison est "ecriture-non-persistee" (le jeu
  // continue en mémoire, jamais d'erreur visible).
  ecrire(patch) {
    try {
      const courant = PlayerProgress.lire().etat;
      const next = fusionner(courant, patch || {});
      etatContrat.ecrire(next);
      const relu = PlayerProgress.lire();
      const persiste =
        relu.rapport.ok &&
        relu.etat.version === VERSION &&
        JSON.stringify(relu.etat.mondes) === JSON.stringify(next.mondes) &&
        JSON.stringify(relu.etat.visites) === JSON.stringify(next.visites);
      return {
        etat: next,
        rapport: {
          ok: persiste,
          raison: persiste ? "ok" : "ecriture-non-persistee",
          version: VERSION,
        },
      };
    } catch {
      return {
        etat: PlayerProgress.lire().etat,
        rapport: { ok: false, raison: "ecriture-impossible", version: VERSION },
      };
    }
  },

  // Efface la clé unique. Retour : { ok, raison }.
  effacer() {
    try {
      etatContrat.effacer();
      return { ok: true, raison: "ok" };
    } catch {
      return { ok: false, raison: "effacement-impossible" };
    }
  },
};

// --- Sérialisable en JSON ? ---------------------------------------------------
// Une valeur non sérialisable (fonction, undefined, symbol, bigint, nombre
// non fini, objet non simple comme Date/Map, référence circulaire) ne peut
// pas survivre à JSON.stringify : elle serait perdue sans bruit. On la
// détecte ici pour la signaler au lieu de la perdre.

function estSerialisable(valeur, vus = new Set()) {
  if (valeur === null) return true;
  const t = typeof valeur;
  if (t === "string" || t === "boolean") return true;
  if (t === "number") return Number.isFinite(valeur);
  if (t !== "object") return false; // fonction, undefined, symbol, bigint
  if (vus.has(valeur)) return false; // circulaire
  if (Array.isArray(valeur)) {
    vus.add(valeur);
    const ok = valeur.every((v) => estSerialisable(v, vus));
    vus.delete(valeur);
    return ok;
  }
  const proto = Object.getPrototypeOf(valeur);
  if (proto !== Object.prototype && proto !== null) return false;
  vus.add(valeur);
  const ok = Object.values(valeur).every((v) => estSerialisable(v, vus));
  vus.delete(valeur);
  return ok;
}

// --- Migration depuis l'ancienne clé du pont ---------------------------------
//
// FONCTION PURE : ne touche à aucun stockage, ne lit ni n'écrit aucune clé.
// Elle prend la valeur déjà lue sous "lueur-pont-v1" et rend
//   { etat, rapport }
// avec rapport = { mappes, conserves, abandonnes, erreurs } (listes exactes
// de noms de champs ; les comptes sont leurs longueurs).
//
// Correspondance (deux formes acceptées) :
//   - forme en-tête de pont.js : { monde, aCle, finiB, traversees } ;
//   - forme prototype (audit) : les mêmes + { cleSauvegarde, son, reduit,
//     particules, ctx, cv, jeu, dernier }.
// Les 4 champs de progression sont mappés vers mondes.pont (aCle et finiB
// suivent la règle du pont : coercition !! ; monde exige une chaîne,
// traversees exige un nombre fini — sinon défaut + erreur, valeur brute
// conservée sous `ancien`). Tous les autres champs sont conservés sous
// mondes.pont.ancien. Un champ non sérialisable en JSON est abandonné ET
// signalé dans `erreurs` : rien n'est perdu silencieusement.

export function migrerDepuisLueurPontV1(ancien) {
  const rapport = { mappes: [], conserves: [], abandonnes: [], erreurs: [] };
  const etat = etatParDefaut();
  try {
    if (!estObjetSimple(ancien)) {
      rapport.erreurs.push(
        `donnée ancienne illisible : objet attendu, reçu ${typeDe(ancien)}`
      );
      return { etat, rapport };
    }
    const pont = etat.mondes.pont;
    const ancienConserve = {};

    function conserver(cle, valeur) {
      if (estSerialisable(valeur)) {
        ancienConserve[cle] = valeur;
        rapport.conserves.push(cle);
      } else {
        rapport.abandonnes.push(cle);
        rapport.erreurs.push(
          `${cle} : valeur non sérialisable en JSON — abandonnée`
        );
      }
    }

    for (const cle of Object.keys(ancien)) {
      const valeur = ancien[cle];
      if (cle === "monde") {
        if (typeof valeur === "string") {
          pont.monde = valeur;
          rapport.mappes.push(cle);
        } else {
          rapport.erreurs.push(
            `monde : chaîne attendue, reçu ${typeDe(valeur)} — défaut « A », valeur conservée`
          );
          conserver(cle, valeur);
        }
      } else if (cle === "aCle" || cle === "finiB") {
        pont[cle] = !!valeur; // règle du pont (pont.js, charger)
        rapport.mappes.push(cle);
      } else if (cle === "traversees") {
        if (typeof valeur === "number" && Number.isFinite(valeur)) {
          pont.traversees = valeur;
          rapport.mappes.push(cle);
        } else {
          rapport.erreurs.push(
            `traversees : nombre fini attendu, reçu ${typeDe(valeur)} — défaut 0, valeur conservée`
          );
          conserver(cle, valeur);
        }
      } else {
        conserver(cle, valeur);
      }
    }
    if (Object.keys(ancienConserve).length) pont.ancien = ancienConserve;
  } catch (e) {
    rapport.erreurs.push(
      `migration interrompue : ${e && e.message ? e.message : "erreur inconnue"}`
    );
  }
  return { etat, rapport };
}

// --- Finalisation de la migration --------------------------------------------
//
// CODE SEULEMENT — jamais exécuté sans GO.
// Supprime l'ancienne clé « lueur-pont-v1 » APRÈS vérification que la
// nouvelle sauvegarde (hp-pont, v1, monde pont présent) existe et se relit.
// Exige le GO par monde : finaliserMigration({ go: true, monde: "pont" }).
// Sans GO, ou sans nouvelle sauvegarde vérifiée : refuse (lève une erreur)
// et l'ancienne clé reste intacte. Ne JAMAIS appeler sur des données
// réelles sans le GO nommé ; les tests ne vérifient que le refus sans GO.

export function finaliserMigration({ go = false, monde = null } = {}) {
  if (go !== true || monde !== "pont") {
    throw new Error(
      'finaliserMigration exige le GO par monde : { go: true, monde: "pont" }.'
    );
  }
  const { etat, rapport } = PlayerProgress.lire();
  // Exiger une vraie sauvegarde v1 relue (raison "ok") : "vide" rapporte
  // ok: true mais ne prouve aucune sauvegarde — jamais supprimer sur du vide.
  if (
    rapport.raison !== "ok" ||
    !estObjetSimple(etat.mondes) ||
    !estObjetSimple(etat.mondes.pont)
  ) {
    throw new Error(
      "finaliserMigration refuse : aucune sauvegarde hp-pont v1 vérifiée — l'ancienne clé reste intacte."
    );
  }
  try {
    if (typeof localStorage === "undefined") {
      throw new Error("stockage indisponible");
    }
    localStorage.removeItem(ANCIENNE_CLE_PONT);
  } catch (e) {
    throw new Error(
      `finaliserMigration : suppression de l'ancienne clé impossible (${e && e.message ? e.message : "erreur inconnue"}) — réessayer plus tard.`
    );
  }
  return { supprimee: ANCIENNE_CLE_PONT, monde };
}
