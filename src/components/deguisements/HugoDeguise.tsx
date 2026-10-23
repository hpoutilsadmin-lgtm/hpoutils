import { useEffect, useState } from "react";
import "./deguisements.css";
import { DEGUISES } from "./deguises";

/**
 * La photo d'Hugo, déguisable au clic (idée d'Hugo, 22 oct. 2026).
 *
 * Chaque clic avance d'un cran : naturel → les déguisements de DEGUISES
 * (dont les deux « barbouillages » griffonnés par HGPTO) → retour au
 * naturel, et ça recommence. La photo elle-même n'est jamais modifiée :
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

export default function HugoDeguise() {
  // 0 = naturel ; 1..DEGUISES.length = déguisements, dans l'ordre de la liste.
  const [etape, setEtape] = useState(0);
  const total = DEGUISES.length;
  const courant = etape === 0 ? null : DEGUISES[etape - 1];

  const avancer = () => setEtape((e) => (e + 1) % (total + 1));

  useEffect(() => {
    const entendreBarbouillage = () => setEtape(INDEX_BARBOUILLE_DEFAUT + 1);
    window.addEventListener(EVENEMENT_BARBOUILLE, entendreBarbouillage);
    return () => window.removeEventListener(EVENEMENT_BARBOUILLE, entendreBarbouillage);
  }, []);

  return (
    <figure className="hugo-deguise">
      <button
        type="button"
        className="hugo-deguise-btn"
        onClick={avancer}
        aria-label="Clique pour déguiser Hugo"
        title="Clique pour déguiser Hugo"
      >
        <span className="hugo-deguise-cadre">
          <img
            src="/images/photo-hp.jpg"
            alt="Portrait de HP"
            className="hero-portrait hugo-deguise-photo"
          />
          {courant && (
            <svg
              key={courant.id}
              className="hugo-deguise-calque"
              viewBox="0 0 100 100"
              aria-hidden="true"
              focusable="false"
            >
              {courant.calque}
            </svg>
          )}
        </span>
      </button>
      <figcaption className="hugo-deguise-legende" aria-live="polite">
        {courant ? courant.legende : "Hugo, tout naturel — clique sur la photo pour le déguiser !"}
      </figcaption>
    </figure>
  );
}
