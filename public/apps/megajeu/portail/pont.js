// pont.js — objet-pont R2 entre PlayerProgress (save.js) et les adaptateurs
// des jeux (adaptateurs/caribou.js, adaptateurs/cherche.js) — préparation
// LOT A, 9 nov. 2026. GO d'HP (9 nov. 11 h 19) : architecture R2 + registre
// « visites » (en français, cohérent avec HP).
//
// Le problème réglé ici (constat LOT A, §4) : PlayerProgress.lire() retourne
// une enveloppe { etat, rapport }, alors que les adaptateurs traitent le
// retour de lire() comme l'état brut. Passer PlayerProgress tel quel aux
// adaptateurs polluait la clé « hp-pont » (clés parasites `etat` / `rapport`
// au niveau supérieur) et rendait restaurerPosition() aveugle (null).
//
// Ce pont est le SEUL objet que l'hôte passe aux adaptateurs. Il ne modifie
// ni save.js ni les adaptateurs : il traduit entre les deux interfaces.
//   - lire() : lit resultat.etat (jamais l'enveloppe), retire les clés
//     d'enveloppe parasites, et expose le registre sous ses deux noms
//     (`visites` canonique + `visited` lu par les adaptateurs).
//   - ecrire(patch) : normalise le patch (le `visited` frais de l'adaptateur
//     est fusionné dans `visites`, jamais persisté ; les clés d'enveloppe
//     sont retirées), puis passe par le contrat de PlayerProgress.ecrire
//     (fusion + vérification de persistance par relecture).
//   - effacer() : délègue à PlayerProgress.effacer().
//
// Règles de fusion du registre (documentées, testées dans pont.test.mjs) :
//   - en lecture : visites = { ...visitedHistorique, ...visitesCanonique }
//     (le canonique gagne en cas de conflit ; rien n'est perdu) ;
//   - en écriture : visites = { ...visitesDuPatch, ...visitedFrais }
//     (l'écriture fraîche de l'adaptateur gagne — c'est elle qui vient
//     d'être construite à partir de l'état lu).
//
// Résidu connu (jamais masqué) : un état DÉJÀ pollué avant le pont garde ses
// clés `etat` / `rapport` (et un `visited` historique) dans le JSON stocké —
// PlayerProgress conserve les clés inconnues (normaliserV1, fusionner). Le
// pont les rend invisibles aux adaptateurs et ne les réécrit jamais, mais
// leur suppression physique dans le stockage exige une réécriture de la clé
// (lot futur, jamais fait ici). Voir pont.test.mjs, test « résidu connu ».

import { PlayerProgress } from "./save.js";

// Clés d'enveloppe de PlayerProgress : jamais des champs d'état légitimes.
// Leur présence au niveau supérieur d'un état ne peut venir que d'un appel
// direct à PlayerProgress avant le pont (le bogue LOT A §4).
const CLES_ENVELOPPE = ["etat", "rapport"];

// Nom historique du registre côté adaptateurs (anglais). Lu par les
// adaptateurs, jamais persisté par le pont.
const REGISTRE_ADAPTATEUR = "visited";

// Nom canonique du registre (GO HP, 9 nov. 2026) : français. C'est le seul
// nom qui survit dans le JSON stocké sous « hp-pont ».
const REGISTRE_CANON = "visites";

function estObjetSimple(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

// Nettoie un état lu : retire les clés d'enveloppe parasites et expose le
// registre sous ses deux noms (même contenu). Ne lève jamais.
function nettoyerEtat(etat) {
  const propre = { ...(estObjetSimple(etat) ? etat : {}) };
  for (const cle of CLES_ENVELOPPE) delete propre[cle];
  const canon = estObjetSimple(propre[REGISTRE_CANON])
    ? propre[REGISTRE_CANON]
    : {};
  const ancien = estObjetSimple(propre[REGISTRE_ADAPTATEUR])
    ? propre[REGISTRE_ADAPTATEUR]
    : {};
  const visites = { ...ancien, ...canon };
  propre[REGISTRE_CANON] = visites;
  propre[REGISTRE_ADAPTATEUR] = visites;
  return propre;
}

export function creerPont(sauvegarde = PlayerProgress) {
  return {
    // Lit l'état via PlayerProgress : resultat.etat, jamais l'enveloppe.
    // Retour : l'état brut nettoyé (celui que les adaptateurs attendent).
    lire() {
      const resultat =
        sauvegarde && typeof sauvegarde.lire === "function"
          ? sauvegarde.lire()
          : null;
      const etat =
        resultat && estObjetSimple(resultat.etat) ? resultat.etat : {};
      return nettoyerEtat(etat);
    },

    // Écrit via le contrat de PlayerProgress. Le patch est normalisé avant :
    // le `visited` frais de l'adaptateur est fusionné dans `visites` (jamais
    // persisté tel quel), les clés d'enveloppe sont retirées.
    // Retour : celui de PlayerProgress.ecrire — { etat, rapport } — avec le
    // rapport de persistance vérifié par relecture (les adaptateurs ignorent
    // ce retour ; l'hôte peut le lire).
    ecrire(patch) {
      const p = { ...(estObjetSimple(patch) ? patch : {}) };
      const frais = estObjetSimple(p[REGISTRE_ADAPTATEUR])
        ? p[REGISTRE_ADAPTATEUR]
        : {};
      const canon = estObjetSimple(p[REGISTRE_CANON])
        ? p[REGISTRE_CANON]
        : {};
      p[REGISTRE_CANON] = { ...canon, ...frais };
      delete p[REGISTRE_ADAPTATEUR];
      for (const cle of CLES_ENVELOPPE) delete p[cle];
      return sauvegarde.ecrire(p);
    },

    // Efface la clé unique. Retour : celui de PlayerProgress.effacer().
    effacer() {
      return sauvegarde.effacer();
    },
  };
}

// Pont par défaut sur le vrai save.js : c'est celui que l'hôte passe aux
// adaptateurs (marquerVisite(pont), restaurerPosition(pont),
// creerBoutonRetour(url, …) ne prend pas le pont).
export const pont = creerPont();
