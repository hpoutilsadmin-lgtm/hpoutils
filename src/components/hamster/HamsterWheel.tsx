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

export function HamsterWheel() {
  const [etat, setEtat] = useState<Etat>("marche");
  const [ferme, setFerme] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const etatRef = useRef<Etat>("marche");
  const forceRef = useRef(false);

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
    <div className="rh" data-etat={etat} role="note" aria-label="La roue d'hamster d'HP Outils">
      <div className="rh-bulle">
        <span>{PHRASES[etat][phraseIdx]}</span>
      </div>
      <div className="rh-scene">
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
      <div className="rh-pied">
        <span className="rh-honnete">Il devine, il ne surveille personne.</span>
        <button className="rh-fermer" type="button" aria-label="Fermer la roue d'hamster" onClick={fermer}>
          Fermer ✕
        </button>
      </div>
    </div>
  );
}
