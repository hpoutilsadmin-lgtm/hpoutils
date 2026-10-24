import { useRef, useState } from "react";
import "./deguisements.css";
import { DEGUISES } from "./deguises";

/**
 * « Ta photo à toi » (demande d'HP, 23 oct. 2026) : le visiteur
 * charge SA photo et essaie les mêmes déguisements qu'HP, en
 * ajustant le calque à son visage (glisser, échelle, rotation —
 * pincement à deux doigts compris).
 *
 * 100 % LOCAL, par conception : la photo est lue par le navigateur
 * (URL.createObjectURL), jamais envoyée, jamais téléversée, jamais
 * conservée — elle disparaît quand la page se ferme. Aucune
 * détection de visage automatique : l'ajustement est manuel, choix
 * assumé pour rester léger sur les téléphones modestes.
 */

export default function PhotoDeguise() {
  const [src, setSrc] = useState<string | null>(null);
  const [deguiseId, setDeguiseId] = useState<string>(DEGUISES[0].id);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [echelle, setEchelle] = useState(1);
  const [rotation, setRotation] = useState(0);

  const cadreRef = useRef<HTMLDivElement | null>(null);
  const pointeurs = useRef(new Map<number, { x: number; y: number }>());
  const pincement = useRef<{ dist: number; echelle: number } | null>(null);
  const dernier = useRef<{ x: number; y: number } | null>(null);

  const courant = DEGUISES.find((d) => d.id === deguiseId) ?? null;

  const reinitialiser = () => {
    setTx(0);
    setTy(0);
    setEchelle(1);
    setRotation(0);
  };

  const choisirPhoto = (fichier: File | undefined) => {
    if (!fichier) return;
    setSrc((ancien) => {
      if (ancien) URL.revokeObjectURL(ancien);
      return URL.createObjectURL(fichier);
    });
    reinitialiser();
  };

  // Conversion pixels écran → unités du repère 0–100 du calque
  // (le calque vit dans le cadre, bordure de 4 px de chaque côté).
  const versUnites = (dxPx: number, dyPx: number) => {
    const rect = cadreRef.current?.getBoundingClientRect();
    const base = rect ? Math.max(1, rect.width - 8) : 232;
    return { dx: (dxPx / base) * 100, dy: (dyPx / base) * 100 };
  };

  const surPointerDown = (e: React.PointerEvent) => {
    if (!src) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    pointeurs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointeurs.current.size === 1) {
      dernier.current = { x: e.clientX, y: e.clientY };
    } else if (pointeurs.current.size === 2) {
      const [a, b] = [...pointeurs.current.values()];
      pincement.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y),
        echelle,
      };
      dernier.current = null;
    }
  };

  const surPointerMove = (e: React.PointerEvent) => {
    if (!pointeurs.current.has(e.pointerId)) return;
    pointeurs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointeurs.current.size === 2 && pincement.current) {
      const [a, b] = [...pointeurs.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (pincement.current.dist > 0) {
        const nouvelle = pincement.current.echelle * (dist / pincement.current.dist);
        setEchelle(Math.min(1.5, Math.max(0.5, nouvelle)));
      }
      return;
    }
    if (dernier.current) {
      const { dx, dy } = versUnites(e.clientX - dernier.current.x, e.clientY - dernier.current.y);
      setTx((v) => Math.min(40, Math.max(-40, v + dx)));
      setTy((v) => Math.min(40, Math.max(-40, v + dy)));
      dernier.current = { x: e.clientX, y: e.clientY };
    }
  };

  const surPointerUp = (e: React.PointerEvent) => {
    pointeurs.current.delete(e.pointerId);
    if (pointeurs.current.size < 2) pincement.current = null;
    if (pointeurs.current.size === 1) {
      const [p] = [...pointeurs.current.values()];
      dernier.current = { x: p.x, y: p.y };
    } else {
      dernier.current = null;
    }
  };

  const transform = `translate(${tx} ${ty}) translate(50 50) rotate(${rotation}) scale(${echelle}) translate(-50 -50)`;

  return (
    <section className="photo-deguise" aria-label="Déguise ta propre photo">
      <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(22px,3vw,30px)", margin: 0 }}>
        Ta photo à toi !
      </h2>
      <p style={{ margin: "8px auto 0", maxWidth: 440, lineHeight: 1.5 }}>
        HP se déguise, pourquoi pas toi ? Charge ta photo, choisis un
        déguisement et ajuste-le à ton visage : glisse pour déplacer,
        pince ou utilise les curseurs pour la taille et l'angle.
      </p>

      <div
        ref={cadreRef}
        className={`photo-deguise-cadre${src ? " avec-photo" : ""}`}
        onPointerDown={surPointerDown}
        onPointerMove={surPointerMove}
        onPointerUp={surPointerUp}
        onPointerCancel={surPointerUp}
      >
        {src ? (
          <>
            <img src={src} alt="Ta photo, déguisée" className="photo-deguise-img" draggable={false} />
            {courant && (
              <svg className="photo-deguise-calque" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
                <g transform={transform} data-calque-ajuste="1">
                  {courant.calque}
                </g>
              </svg>
            )}
          </>
        ) : (
          <div className="photo-deguise-vide">Ton portrait apparaîtra ici, dans le même cercle qu'HP.</div>
        )}
      </div>

      <div className="photo-deguise-controles">
        <label>
          Ta photo
          <input
            type="file"
            accept="image/*"
            onChange={(e) => choisirPhoto(e.target.files?.[0])}
          />
        </label>
        <label>
          Déguisement
          <select value={deguiseId} onChange={(e) => setDeguiseId(e.target.value)}>
            {DEGUISES.map((d) => (
              <option key={d.id} value={d.id}>
                {d.legende}
              </option>
            ))}
          </select>
        </label>
        <label>
          Taille du déguisement : {Math.round(echelle * 100)} %
          <input
            type="range"
            min={50}
            max={150}
            step={1}
            value={Math.round(echelle * 100)}
            onChange={(e) => setEchelle(Number(e.target.value) / 100)}
          />
        </label>
        <label>
          Angle : {rotation}°
          <input
            type="range"
            min={-30}
            max={30}
            step={1}
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
          />
        </label>
        <div className="photo-deguise-boutons">
          <button type="button" onClick={reinitialiser}>
            Réinitialiser l'ajustement
          </button>
        </div>
      </div>

      <p className="photo-deguise-note">
        🔒 Ta photo reste sur ton appareil : elle n'est jamais envoyée,
        jamais conservée. Quand tu fermes la page, elle disparaît.
        L'ajustement se fait à la main — pas de détection de visage,
        c'est voulu : ça reste léger sur tous les téléphones.
      </p>
    </section>
  );
}
