import { useEffect, useRef } from "react";
import "./hgpto.css";
import "./hgpto-welcome.css";
import { useState } from "react";
import { HGPTO_MARKUP } from "./hgpto-markup";
import { initHgpto } from "./hgpto-engine";

/**
 * HGPTO — la mascotte d'HP Outils, montée globalement dans le layout
 * (voir src/routes/__root.tsx) : elle vit sur toutes les pages.
 *
 * La surcouche (robot, Pixel, bulles, dock, panneau Questions, jeu
 * caché) est injectée côté client seulement — le serveur ne rend
 * qu'un conteneur vide, l'injection se fait dans l'effet.
 * « Fermer HGPTO » ferme la mascotte pour la session : au montage,
 * si la session l'a fermée, rien n'est injecté.
 */
export function Hgpto() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [welcome, setWelcome] = useState(() => {
    try { return sessionStorage.getItem("hgpto-welcome-seen") !== "1" && sessionStorage.getItem("hgpto-closed") !== "1"; } catch { return true; }
  });
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
          <div className="hgpto-welcome-card">
            <div className="hgpto-welcome-confetti" aria-hidden="true">
              {Array.from({ length: 36 }).map((_, i) => (
                <i key={i} style={{ left: `${(i * 29) % 100}%`, background: ["#c0392b", "#3a5a4e", "#e8b93d", "#31517f"][i % 4], animationDelay: `${(i % 10) * 0.25}s` }} />
              ))}
            </div>
            <span className="hgpto-welcome-fire" style={{ left: "8%", top: "10%" }} aria-hidden="true" />
            <span className="hgpto-welcome-fire" style={{ right: "8%", top: "18%", animationDelay: "0.5s" }} aria-hidden="true" />
            <div className="hgpto-welcome-trumpet" aria-hidden="true">🎺</div>
            <h2>Merci de venir nous rendre visite !</h2>
            <div className="hgpto-welcome-carpet" aria-hidden="true" />
            <p>HGPTO vous déroule le tapis rouge.<br />Bienvenue chez HP Outils — on entre avec une idée, on sort autonome.</p>
            <p>Gratuit pour commencer, sans compte.</p>
            <button type="button" className="hgpto-welcome-btn" onClick={fermerWelcome}>Entrer — On avance !</button>
            <button type="button" className="hgpto-welcome-btn ghost" onClick={fermerWelcome}>Fermer</button>
          </div>
        </div>
      )}
      <div ref={hostRef} className="hgpto-host" />
    </>
  );
}
