import "./hgpto-pancarte.css";

/**
 * Pancarte de bienvenue A1 tap (30 oct. 2026) — remplace la scène de
 * départ (tapis rouge, confettis, feux). 100 % originale : planche de
 * bois, chaînes et ampoules dessinées en CSS/SVG, aucune image.
 *
 * Apparition au tap seulement (premier chargement de la session),
 * disparition au tap seulement (bouton Fermer). Ni clic sur le voile,
 * ni minuterie, ni touche ne la ferment : le bouton est le seul geste.
 */
const AMPOULES = [
  "#e74c3c",
  "#f39c12",
  "#f1c40f",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#e67e22",
  "#ec87bf",
];

function Chaine({ cote }: { cote: "gauche" | "droite" }) {
  return (
    <svg
      className={`hgpto-pancarte-chaine hgpto-pancarte-chaine-${cote}`}
      viewBox="0 0 20 72"
      aria-hidden="true"
    >
      <g fill="none" stroke="#3a3a3a" strokeWidth="3">
        <ellipse cx="10" cy="10" rx="7" ry="10" />
        <ellipse cx="10" cy="30" rx="7" ry="10" />
        <ellipse cx="10" cy="50" rx="7" ry="10" />
        <ellipse cx="10" cy="68" rx="7" ry="10" />
      </g>
    </svg>
  );
}

export function HgptoPancarte({ onFermer }: { onFermer: () => void }) {
  return (
    <div className="hgpto-pancarte-voile" role="dialog" aria-label="Bienvenue chez HP Outils">
      <div className="hgpto-pancarte">
        <Chaine cote="gauche" />
        <Chaine cote="droite" />
        <div className="hgpto-pancarte-ampoules" aria-hidden="true">
          {AMPOULES.map((couleur, i) => (
            <i
              key={couleur}
              style={{
                background: couleur,
                boxShadow: `0 0 10px 2px ${couleur}`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        <p className="hgpto-pancarte-texte">
          Bonjour, bienvenue, merci d'être là !
        </p>
        <button type="button" className="hgpto-pancarte-btn" onClick={onFermer}>
          Fermer
        </button>
      </div>
    </div>
  );
}
