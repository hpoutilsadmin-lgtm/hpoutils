import { useEffect, useState } from "react";
import "./deguisements.css";
import { DEGUISES } from "./deguises";

/**
 * La photo d'HP, déguisable au clic (idée d'HP, 22 oct. 2026).
 *
 * Chaque clic avance d'un cran : naturel → les déguisements de DEGUISES
 * (dont les deux « barbouillages » griffonnés par HGPTO) → retour au
 * naturel, et ça recommence. Des boutons précédent / suivant /
 * « Surprends-moi » (ajout 23 oct. 2026) offrent la même navigation
 * sans cliquer la photo. La photo elle-même n'est jamais modifiée :
 * les déguisements sont des calques SVG posés par-dessus.
 *
 * Contrat avec le moteur HGPTO (autre chantier) : quand HGPTO « vient »
 * barbouiller la photo pendant sa vie, il émet l'événement fenêtre
 * `hgpto:barbouille-photo`. À sa réception, le barbouillage par défaut
 * (chapeau melon + lunettes, signé HGPTO) s'applique, quel que soit
 * l'état courant ; le cycle au clic reprend ensuite normalement.
 * Sur une page sans photo, le composant n'existe pas : rien ne se passe.
 */

const INDEX_BARBOUILLE_DEFAUT = Math.max(
  0,
  DEGUISES.findIndex((d) => d.id === "barbouille-melon"),
);

export const EVENEMENT_BARBOUILLE = "hgpto:barbouille-photo";

export default function HpDeguise() {
  // 0 = naturel ; 1..DEGUISES.length = déguisements, dans l'ordre de la liste.
  const [etape, setEtape] = useState(0);
  const total = DEGUISES.length;
  const courant = etape === 0 ? null : DEGUISES[etape - 1];

  const avancer = () => setEtape((e) => (e + 1) % (total + 1));
  const reculer = () => setEtape((e) => (e - 1 + total + 1) % (total + 1));
  const surprendre = () =>
    setEtape((e) => {
      // Un déguisement au hasard, jamais celui déjà affiché.
      let n = Math.floor(Math.random() * total) + 1;
      if (n === e) n = (n % total) + 1;
      return n;
    });

  useEffect(() => {
    const entendreBarbouillage = () => setEtape(INDEX_BARBOUILLE_DEFAUT + 1);
    window.addEventListener(EVENEMENT_BARBOUILLE, entendreBarbouillage);
    return () => window.removeEventListener(EVENEMENT_BARBOUILLE, entendreBarbouillage);
  }, []);

  return (
    <figure className="hp-deguise">
      <button
        type="button"
        className="hp-deguise-btn"
        onClick={avancer}
        aria-label="Clique pour déguiser HP"
        title="Clique pour déguiser HP"
      >
        <span className="hp-deguise-cadre">
          <img
            src="/images/photo-hp.jpg"
            alt="Portrait de HP"
            className="hero-portrait hp-deguise-photo"
          />
          {courant && (
            <svg
              key={courant.id}
              className="hp-deguise-calque"
              viewBox="0 0 100 100"
              aria-hidden="true"
              focusable="false"
            >
              {courant.calque}
            </svg>
          )}
        </span>
      </button>
      <figcaption className="hp-deguise-legende" aria-live="polite">
        {courant ? courant.legende : "HP, tout naturel — clique sur la photo pour le déguiser !"}
      </figcaption>
      <div className="hp-deguise-nav">
        <button type="button" onClick={reculer} aria-label="Déguisement précédent">
          ← Précédent
        </button>
        <span className="hp-deguise-compteur" aria-hidden="true">
          {etape} / {total}
        </span>
        <button type="button" onClick={avancer} aria-label="Déguisement suivant">
          Suivant →
        </button>
        <button type="button" onClick={surprendre} aria-label="Déguisement au hasard">
          🎲 Surprends-moi
        </button>
      </div>
    </figure>
  );
}
