import { useEffect, useRef, useState } from "react";

// Remerciement M.E.L — page /a-propos (précision d'HP, 26 oct. 2026).
// TEXTE EXACT À VALIDER PAR HP AVANT DÉPÔT : « M.E.L the girl boss. Merci
// pour tout. » — seul le nom « M.E.L » est affiché (aucun nom complet dans
// le texte public). Style : flash néon mauve (mauve = couleur de son tampon
// de testeuse), halo pulsé en CSS sur la ligne.
// Interaction : un clic sur « M.E.L » envoie des cœurs + 1 café (animation
// locale, session seulement). AUCUN point, AUCUN compteur (ni affiché ni
// conservé), AUCUNE mécanique de rétention, AUCUN achat, AUCUN son, AUCUNE
// donnée envoyée nulle part. Chaque clic rejoue l'animation ; rien n'est
// compté ni accumulé. Mouvement réduit : PAS DE FLASH (texte uni seul) et,
// au clic, cœurs + café affichés statiquement, sans aucun mouvement.

type BurstItem = {
  key: number;
  kind: "heart" | "coffee";
  left: number;
  delay: number;
  size: number;
  drift: number;
};

// Positions fixes (pas d'aléatoire) : la salve est identique à chaque clic,
// rien ne varie, rien n'est mesuré.
const BURST: BurstItem[] = [
  { key: 0, kind: "heart", left: -52, delay: 0, size: 22, drift: -14 },
  { key: 1, kind: "heart", left: -30, delay: 60, size: 17, drift: 8 },
  { key: 2, kind: "heart", left: -10, delay: 120, size: 26, drift: -6 },
  { key: 3, kind: "coffee", left: 14, delay: 80, size: 30, drift: 0 },
  { key: 4, kind: "heart", left: 38, delay: 40, size: 19, drift: 12 },
  { key: 5, kind: "heart", left: 56, delay: 140, size: 23, drift: -10 },
  { key: 6, kind: "heart", left: 74, delay: 90, size: 16, drift: 6 },
];

function Heart({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="#af3c2d"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function Coffee({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="#3a2a20"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 9h12v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9z" fill="#f6eddd" />
      <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 5.5c0-1 1-1 1-2M12 5.5c0-1 1-1 1-2" />
    </svg>
  );
}

export function MelMerci() {
  // `burst` ne contient que la salve visible en ce moment. Dès qu'elle est
  // retirée, il ne reste rien : aucune trace, aucun total, aucune mémoire.
  const [burst, setBurst] = useState<BurstItem[] | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  function onMerci() {
    if (timer.current) window.clearTimeout(timer.current);
    setBurst(BURST);
    // La salve disparaît d'elle-même ; rien n'est conservé après.
    timer.current = window.setTimeout(() => setBurst(null), 2200);
  }

  return (
    <p className="mel-merci mel-merci-neon">
      <span className="mel-merci-btn-wrap">
        <button
          type="button"
          className="mel-merci-btn"
          aria-label="Envoyer un remerciement à M.E.L"
          onClick={onMerci}
        >
          M.E.L
        </button>
        {burst && (
          <span className="mel-merci-burst" aria-hidden="true">
            {burst.map((item) => (
              <span
                key={item.key}
                className="mel-merci-float"
                style={
                  {
                    left: item.left,
                    animationDelay: `${item.delay}ms`,
                    "--mel-drift": `${item.drift}px`,
                  } as React.CSSProperties
                }
              >
                {item.kind === "heart" ? (
                  <Heart size={item.size} />
                ) : (
                  <Coffee size={item.size} />
                )}
              </span>
            ))}
          </span>
        )}
      </span>{" "}
      the girl boss. Merci pour tout.
    </p>
  );
}
