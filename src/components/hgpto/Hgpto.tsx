import { useEffect, useRef } from "react";
import "./hgpto.css";
import "./hgpto-welcome.css";
import { useState } from "react";
import { HGPTO_MARKUP } from "./hgpto-markup";
import { initHgpto } from "./hgpto-engine";

/**
 * Sir H. Gepeto — le gérant du site HP Outils, monté globalement
 * dans le layout (voir src/routes/__root.tsx) : il vit sur toutes les pages.
 *
 * La surcouche (figure, Pixel, bulles, dock, panneau Questions, jeu
 * caché) est injectée côté client seulement — le serveur ne rend
 * qu'un conteneur vide, l'injection se fait dans l'effet.
 * « Fermer Sir H. Gepeto » ferme l'assistant pour la session : au montage,
 * si la session l'a fermé, rien n'est injecté.
 *
 * PROPOSITION MISE EN SCÈNE 29 oct. 2026 — NON DÉPOSÉE.
 * Changement seul, dans le bloc d'accueil ci-dessous : la scène n'est
 * plus un encadré central. Les couches décoratives (confettis, feux)
 * couvrent toute la scène, le tapis se déroule en bas de page, et la
 * figure Sir H. Gepeto déjà injectée dans le host (couche .bot-layer, bas de
 * page) est remontée au-dessus de la scène par le CSS, comme acteur
 * visuel seulement, sans interaction pendant la scène. Texte exact,
 * boutons, fanfare et logique 1x/session : inchangés.
 */
export function Hgpto() {
  const hostRef = useRef<HTMLDivElement>(null);
  // Correctif 28 oct. 2026 — scène 1x/session : l'état initial ne doit
  // jamais afficher la scène avant la lecture côté client. Le rendu
  // serveur ne connaît pas sessionStorage (il rendait « vrai » par
  // défaut), donc à chaque chargement de page la scène réapparaissait
  // même après Fermer. On part de « faux », puis l'effet ci-dessous
  // l'affiche une seule fois si la session ne l'a pas encore vue.
  const [welcome, setWelcome] = useState(false);
  const jouerFanfare = () => {
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = "triangle"; o.frequency.value = f;
        o.connect(g); g.connect(ctx.destination);
        const t0 = ctx.currentTime + i * 0.16;
        g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.15, t0 + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18);
        o.start(t0); o.stop(t0 + 0.2);
      });
    } catch { /* son indisponible : la scène reste visuelle */ }
  };
  const fermerWelcome = () => {
    jouerFanfare();
    try { sessionStorage.setItem("hgpto-welcome-seen", "1"); } catch { /* stockage indisponible */ }
    setWelcome(false);
  };

  useEffect(() => {
    // Lecture côté client seulement : si la scène a déjà été fermée
    // dans cette session, ou si l'assistant est fermé, on ne l'affiche pas.
    try {
      if (sessionStorage.getItem("hgpto-welcome-seen") !== "1" && sessionStorage.getItem("hgpto-closed") !== "1") {
        setWelcome(true);
      }
    } catch { /* stockage indisponible : on affiche la scène une fois */ setWelcome(true); }
    const host = hostRef.current;
    if (!host) return;
    let closed = false;
    try {
      closed = sessionStorage.getItem("hgpto-closed") === "1";
    } catch {
      /* stockage indisponible : on laisse la mascotte vivre */
    }
    if (closed) return;
    document.body.classList.add("hgpto-on");
    host.innerHTML = HGPTO_MARKUP;
    initHgpto();
  }, []);

  return (
    <>
      {welcome && (
        <div className="hgpto-welcome" role="dialog" aria-label="Bienvenue chez HP Outils">
          <div className="hgpto-welcome-confetti" aria-hidden="true">
            {Array.from({ length: 36 }).map((_, i) => (
              <i key={i} style={{ left: `${(i * 29) % 100}%`, background: ["#c0392b", "#3a5a4e", "#e8b93d", "#31517f"][i % 4], animationDelay: `${(i % 10) * 0.25}s` }} />
            ))}
          </div>
          <span className="hgpto-welcome-fire" style={{ left: "8%", top: "12%" }} aria-hidden="true" />
          <span className="hgpto-welcome-fire" style={{ right: "8%", top: "20%", animationDelay: "0.5s" }} aria-hidden="true" />
          <span className="hgpto-welcome-fire" style={{ left: "18%", top: "62%", animationDelay: "1s" }} aria-hidden="true" />
          <span className="hgpto-welcome-fire" style={{ right: "18%", top: "58%", animationDelay: "1.4s" }} aria-hidden="true" />
          <div className="hgpto-welcome-text">
            <div className="hgpto-welcome-trumpet" aria-hidden="true">🎺</div>
            <h2>Merci de venir nous rendre visite !</h2>
            <p>Sir H. Gepeto vous déroule le tapis rouge.<br />Bienvenue chez HP Outils — on entre avec une idée, on sort autonome.</p>
            <p>Gratuit pour commencer, sans compte.</p>
            <button type="button" className="hgpto-welcome-btn" onClick={fermerWelcome}>Entrer — On avance !</button>
            <button type="button" className="hgpto-welcome-btn ghost" onClick={fermerWelcome}>Fermer</button>
          </div>
          <div className="hgpto-welcome-carpet" aria-hidden="true" />
        </div>
      )}
      <div ref={hostRef} className="hgpto-host" />
    </>
  );
}
