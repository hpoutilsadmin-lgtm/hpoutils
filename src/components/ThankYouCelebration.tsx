// Célébration d'achat — gratitude après paiement, rien d'autre.
// Montée UNIQUEMENT dans la branche « payé » d'une page de remerciement
// après paiement Stripe (/checkout/return, /lire/merci, /cadeaux/merci).
// Règles HP appliquées ici, sans exception :
//  - AUCUN autoplay sonore : le petit son ne part que si le visiteur
//    tape sur le bouton « Merci ! » (geste utilisateur, WebAudio léger,
//    avec garde si indisponible) — les navigateurs bloquent de toute
//    façon l'autoplay après une redirection.
//  - AUCUN upsell, AUCUN compteur, AUCUNE série, AUCUNE pression :
//    ce composant n'ajoute aucun lien, aucun prix, aucun appel à acheter.
//  - Confettis faits maison, en canvas, AUCUNE dépendance externe,
//    AUCUN script externe — les pages du site restent autonomes.
//  - prefers-reduced-motion : ni confettis ni secousse — juste le texte
//    « Merci ! ». La vibration, elle, ne part que dans le geste (tap).
import { useEffect, useRef } from "react";

const COLORS = ["#b04a2f", "#d89532", "#f0c16d", "#3f7d5d", "#faf6f1"];

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  vr: number;
  color: string;
};

export function ThankYouCelebration() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const piecesRef = useRef<Piece[]>([]);
  const rafRef = useRef<number | null>(null);
  const stopAtRef = useRef(0);

  function spawn(count: number, fromTop: boolean) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let i = 0; i < count; i++) {
      piecesRef.current.push({
        x: Math.random() * w,
        y: fromTop ? -12 - Math.random() * 60 : h * 0.32 + Math.random() * 40,
        vx: (Math.random() - 0.5) * 90,
        vy: fromTop ? 60 + Math.random() * 120 : -60 - Math.random() * 140,
        w: 6 + Math.random() * 7,
        h: 8 + Math.random() * 8,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 8,
        color: COLORS[i % COLORS.length],
      });
    }
  }

  function tick() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const dt = 1 / 60;
    piecesRef.current = piecesRef.current.filter((p) => p.y < h + 30);
    for (const p of piecesRef.current) {
      p.vy += 260 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (piecesRef.current.length > 0 || Date.now() < stopAtRef.current) {
      rafRef.current = window.requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, w, h);
      rafRef.current = null;
    }
  }

  function launch(count: number, fromTop: boolean) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    spawn(count, fromTop);
    stopAtRef.current = Date.now() + 2600;
    if (rafRef.current === null) rafRef.current = window.requestAnimationFrame(tick);
  }

  // Confettis légers à l'apparition du « Merci ! » payé — une seule fois,
  // au montage (le composant n'existe que dans la branche « payé »).
  useEffect(() => {
    launch(48, true);
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      piecesRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Petit son + vibration, UNIQUEMENT sur tap du bouton « Merci ! ».
  function onMerciTap() {
    try {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AC) {
        const ctx = new AC();
        void ctx.resume().catch(() => undefined);
        const t0 = ctx.currentTime + 0.01;
        [523.25, 783.99].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = freq;
          const start = t0 + i * 0.14;
          gain.gain.setValueAtTime(0.0001, start);
          gain.gain.exponentialRampToValueAtTime(0.12, start + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);
          osc.connect(gain).connect(ctx.destination);
          osc.start(start);
          osc.stop(start + 0.4);
        });
        window.setTimeout(() => void ctx.close().catch(() => undefined), 900);
      }
    } catch {
      // Audio indisponible : le merci reste un merci, sans son.
    }
    try {
      if (typeof navigator.vibrate === "function") navigator.vibrate(40);
    } catch {
      // Vibration indisponible : rien à faire.
    }
    // Petite pluie de rappel, visuelle seulement si le mouvement est permis.
    launch(24, false);
  }

  return (
    <div className="merci-celebration">
      <canvas ref={canvasRef} className="merci-confetti" aria-hidden="true" />
      <button type="button" className="merci-wizz" onClick={onMerciTap} aria-label="Merci ! Jouer un petit son de fête">
        Merci !
      </button>
      <p className="merci-celebration-note">Tape sur « Merci ! » pour un petit son de fête.</p>
    </div>
  );
}
