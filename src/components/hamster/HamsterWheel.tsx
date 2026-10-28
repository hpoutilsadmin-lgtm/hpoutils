import { useEffect, useRef, useState } from "react";
import "./hamster-wheel.css";
import {
  publierDetectot,
  signaturesRobot,
  type DetectotConfiance,
  type DetectotType,
} from "../../lib/detectot";

/**
 * Roue d'hamster — HP Outils (100 % originale, dessin maison).
 * Le hamster est le visage de Détectôt (voir src/lib/detectot.ts) :
 * chaque état publie le signal que le reste de la page peut lire.
 *
 * NOTE D'HONNÊTETÉ : ce n'est PAS une mesure d'audience. Le widget
 * DEVINE à partir de signaux du navigateur : il ne compte personne,
 * n'identifie personne, n'envoie rien, ne pose aucun cookie.
 * - COURT : signal robot (navigator.webdriver, navigateur sans tête)
 *   ou aucune interaction souris/tactile/clavier après 4 s.
 * - MARCHE : activité humaine réelle (souris, tactile, clavier, défilement).
 * - DORT : inactivité 60 s, ou onglet caché. Un humain immobile finit
 *   par endormir l'hamster, et c'est voulu (le gag l'avoue).
 * ?hamster=court|marche|dort force l'état (tests / démo).
 * « Fermer » = session seulement (sessionStorage).
 * Coin bas DROIT : HGPTO occupe le bas gauche (z-index 58 < 59-62).
 *
 * Nom public (24 oct. 2026, décision d'Hugo) : le hamster S'APPELLE Détectôt,
 * affiché sous la roue — pour que les visiteurs connaissent déjà le nom
 * quand le système Détectôt sera présenté (dans ~3 mois).
 * Personnages (24 oct. 2026, décisions d'Hugo) : le hamster se déplace
 * au doigt et à la souris (seuil 8 px, comme HGPTO — un tap ne déplace
 * jamais), se replie À LA MAIN en mini-roue (tap pour rouvrir, jamais
 * automatique), et s'agrandit par pas — position, repli et taille en
 * session seulement. « Fermer » reste séparé du repli.
 */
type Etat = "dort" | "marche" | "court";

const PHRASES: Record<Etat, string[]> = {
  dort: [
    "Chut… il rêve de graines de tournesol.",
    "Il ronfle. Personne à l'horizon.",
    "Z z z… il recharge ses petites pattes.",
  ],
  marche: [
    "Un humain se promène par ici. Il marche, tranquille.",
    "Un humain ! Il se dégourdit les pattes.",
    "Quelqu'un de vrai. Il marche, tout content.",
  ],
  court: [
    "Une IA farfouille dans la page ! Il court comme si c'était la fin du monde.",
    "Alerte : un robot lit tout, vite !",
    "Une IA ! Il court, il court, il court…",
  ],
};

/* (La détection robot vit dans lib/detectot.ts : signaturesRobot().) */

const ZOOM_STEPS_H = [0.75, 1, 1.35, 1.7];

export function HamsterWheel() {
  const [etat, setEtat] = useState<Etat>("marche");
  const [ferme, setFerme] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [reduit, setReduit] = useState(false);
  const [zoomIdx, setZoomIdx] = useState(1);
  const [enTrainDeGlisser, setEnTrainDeGlisser] = useState(false);
  const etatRef = useRef<Etat>("marche");
  const forceRef = useRef(false);
  const racineRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef<{ pid: number; sx: number; sy: number; ox: number; oy: number; bouge: boolean } | null>(null);

  /* Restauration session : position, repli, taille. */
  useEffect(() => {
    try {
      const p = JSON.parse(sessionStorage.getItem("hamster-pos") || "null");
      if (p && isFinite(p.x) && isFinite(p.y)) {
        posRef.current = { x: p.x, y: p.y };
        setPos({ x: p.x, y: p.y });
      }
      if (sessionStorage.getItem("hamster-reduit") === "1") setReduit(true);
      const z = parseFloat(sessionStorage.getItem("hamster-zoom") || "1");
      if (ZOOM_STEPS_H.indexOf(z) !== -1) setZoomIdx(ZOOM_STEPS_H.indexOf(z));
    } catch {
      /* stockage indisponible : on reste à la place par défaut */
    }
  }, []);

  const sauverPos = (p: { x: number; y: number }) => {
    try {
      sessionStorage.setItem("hamster-pos", JSON.stringify(p));
    } catch {
      /* ignore */
    }
  };
  const appliquerReduit = (v: boolean) => {
    setReduit(v);
    try {
      sessionStorage.setItem("hamster-reduit", v ? "1" : "0");
    } catch {
      /* ignore */
    }
  };
  const changerZoom = (dir: 1 | -1) => {
    setZoomIdx((i) => {
      const ni = Math.min(ZOOM_STEPS_H.length - 1, Math.max(0, i + dir));
      try {
        sessionStorage.setItem("hamster-zoom", String(ZOOM_STEPS_H[ni]));
      } catch {
        /* ignore */
      }
      return ni;
    });
  };

  /* Déplacement au doigt / à la souris : seuil 8 px — un tap ne déplace
     jamais et ne déclenche rien ; un tap sur la mini-roue rouvre. */
  const surPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { pid: e.pointerId, sx: e.clientX, sy: e.clientY, ox: posRef.current.x, oy: posRef.current.y, bouge: false };
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };
  const surPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.pid) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.bouge && Math.sqrt(dx * dx + dy * dy) > 8) {
      d.bouge = true;
      setEnTrainDeGlisser(true);
    }
    if (!d.bouge) return;
    const el = racineRef.current;
    let nx = d.ox + dx;
    let ny = d.oy + dy;
    if (el) {
      const r = el.getBoundingClientRect();
      const m = 8;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const glisseX = nx - posRef.current.x;
      const glisseY = ny - posRef.current.y;
      if (r.left + glisseX < m) nx -= r.left + glisseX - m;
      if (r.right + glisseX > vw - m) nx -= r.right + glisseX - (vw - m);
      if (r.top + glisseY < m) ny -= r.top + glisseY - m;
      if (r.bottom + glisseY > vh - m) ny -= r.bottom + glisseY - (vh - m);
    }
    posRef.current = { x: nx, y: ny };
    setPos({ x: nx, y: ny });
  };
  const surPointerUp = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.pid) return;
    dragRef.current = null;
    setEnTrainDeGlisser(false);
    if (d.bouge) {
      sauverPos(posRef.current);
    } else if (reduit) {
      appliquerReduit(false);
    }
  };
  const surPointerCancel = (e: React.PointerEvent) => {
    if (dragRef.current && e.pointerId === dragRef.current.pid) {
      dragRef.current = null;
      setEnTrainDeGlisser(false);
    }
  };

  /* Le hamster est le visage de Détectôt : chaque état publie le signal
     que le reste de la page (HGPTO en premier) peut lire. Règle d'or :
     on confirme les robots, on ne certifie jamais les humains — un humain
     Détectôt reste « probable ». « Dort » publie « inconnu » : on ne
     déduit rien de quelqu'un qui ne bouge pas. */
  const appliquer = (nouvel: Etat, cause: string, sigs: string[] = []) => {
    etatRef.current = nouvel;
    setEtat(nouvel);
    setPhraseIdx(0);
    const carte: Record<Etat, { type: DetectotType; confiance: DetectotConfiance }> = {
      court: { type: "ia", confiance: cause === "robot-confirme" ? "confirmee" : "probable" },
      marche: { type: "humain", confiance: "probable" },
      dort: { type: "inconnu", confiance: "faible" },
    };
    const c = carte[nouvel];
    publierDetectot({
      type: c.type,
      confiance: cause === "test-force" ? "probable" : c.confiance,
      signaux: [cause, ...sigs],
      horodatage: Date.now(),
    });
  };

  useEffect(() => {
    try {
      if (sessionStorage.getItem("hamster-ferme") === "1") {
        setFerme(true);
        return;
      }
    } catch {
      /* stockage indisponible : on laisse la roue vivre */
    }
    const params = new URLSearchParams(location.search);
    const force = params.get("hamster");
    if (force === "dort" || force === "marche" || force === "court") {
      forceRef.current = true;
      appliquer(force, "test-force");
      return;
    }
    const sigs = signaturesRobot();
    if (sigs.length > 0) {
      appliquer("court", "robot-confirme", sigs);
      return;
    }
    appliquer("marche", "arrivee");
    let dernier = Date.now();
    const delaiCourt = window.setTimeout(() => {
      if (!forceRef.current) appliquer("court", "aucune-interaction-4s");
    }, 4000);
    const activite = () => {
      dernier = Date.now();
      window.clearTimeout(delaiCourt);
      if (!forceRef.current) appliquer("marche", "interaction");
    };
    const evenements = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"];
    evenements.forEach((ev) =>
      window.addEventListener(ev, activite, { passive: true }),
    );
    const veille = window.setInterval(() => {
      if (!forceRef.current && Date.now() - dernier > 60000) appliquer("dort", "inactivite-60s");
    }, 5000);
    const visibilite = () => {
      if (document.hidden && !forceRef.current) appliquer("dort", "onglet-cache");
      else if (!document.hidden && !forceRef.current) {
        dernier = Date.now();
        appliquer("marche", "interaction");
      }
    };
    document.addEventListener("visibilitychange", visibilite);
    return () => {
      window.clearTimeout(delaiCourt);
      window.clearInterval(veille);
      evenements.forEach((ev) => window.removeEventListener(ev, activite));
      document.removeEventListener("visibilitychange", visibilite);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = window.setInterval(() => {
      setPhraseIdx((i) => (i + 1) % PHRASES[etatRef.current].length);
    }, 12000);
    return () => window.clearInterval(t);
  }, []);

  if (ferme) return null;
  const fermer = () => {
    try {
      sessionStorage.setItem("hamster-ferme", "1");
    } catch {
      /* ignore */
    }
    setFerme(true);
  };

  return (
    <div
      ref={racineRef}
      className={"rh" + (reduit ? " rh-reduit" : "") + (enTrainDeGlisser ? " rh-dragging" : "")}
      data-etat={etat}
      role="note"
      aria-label={reduit ? "Détectôt, la roue d'hamster d'HP Outils, repliée — touche pour rouvrir" : "Détectôt, la roue d'hamster d'HP Outils — glisse pour déplacer"}
      title={reduit ? "Hamster replié — touche pour rouvrir" : undefined}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      <div className="rh-bulle">
        <span>{PHRASES[etat][phraseIdx]}</span>
      </div>
      <div
        className="rh-scene"
        style={{ transform: `scale(${reduit ? 0.45 : ZOOM_STEPS_H[zoomIdx]})`, transformOrigin: "100% 100%" }}
        onPointerDown={surPointerDown}
        onPointerMove={surPointerMove}
        onPointerUp={surPointerUp}
        onPointerCancel={surPointerCancel}
      >
        <svg className="rh-roue" viewBox="0 0 100 100" aria-hidden="true">
          <line x1="50" y1="10" x2="50" y2="90" />
          <line x1="10" y1="50" x2="90" y2="50" />
          <line x1="22" y1="22" x2="78" y2="78" />
          <line x1="78" y1="22" x2="22" y2="78" />
          <circle cx="50" cy="50" r="42" />
          <circle cx="50" cy="50" r="6" />
        </svg>
        <svg className="rh-hamster" viewBox="0 0 60 46" aria-hidden="true">
          <ellipse className="rh-queue" cx="10" cy="30" rx="5" ry="4" />
          <ellipse cx="32" cy="27" rx="20" ry="15" fill="#d9a066" />
          <ellipse cx="38" cy="31" rx="11" ry="8" fill="#f3d9b8" />
          <circle cx="20" cy="14" r="6" fill="#d9a066" />
          <circle cx="20" cy="14" r="3" fill="#f3d9b8" />
          <circle cx="44" cy="14" r="6" fill="#d9a066" />
          <circle cx="44" cy="14" r="3" fill="#f3d9b8" />
          <circle cx="38" cy="24" r="2.4" fill="#241a12" />
          <circle cx="26" cy="33" r="1.6" fill="#7a4a2b" />
          <ellipse className="rh-joue" cx="46" cy="30" rx="4" ry="2.6" fill="#e8a0a0" />
          <line className="rh-patte" x1="26" y1="40" x2="26" y2="45" />
          <line className="rh-patte" x1="40" y1="40" x2="40" y2="45" />
        </svg>
        <div className="rh-vitesse" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
        </div>
        <div className="rh-zzz" aria-hidden="true">
          <span>z</span>
          <span>Z</span>
          <span>Z</span>
        </div>
        <div className="rh-socle" aria-hidden="true"></div>
      </div>
      <div className="rh-nom">Détectôt</div>
      <div className="rh-pied">
        <span className="rh-honnete">Il devine à qui la page s'adresse — IA ou humain probable — et ne surveille personne.</span>
        <button className="rh-fermer" type="button" aria-label="Fermer Détectôt, la roue d'hamster" onClick={fermer}>
          Fermer ✕
        </button>
      </div>
      <div className="rh-pied2">
        <button className="rh-controle" type="button" aria-label="Replier Détectôt en mini-roue" onClick={() => appliquerReduit(true)}>
          Réduire
        </button>
        <button className="rh-controle" type="button" aria-label="Détectôt plus petit" onClick={() => changerZoom(-1)}>
          Petit
        </button>
        <button className="rh-controle" type="button" aria-label="Détectôt plus grand" onClick={() => changerZoom(1)}>
          Grand
        </button>
      </div>
    </div>
  );
}
