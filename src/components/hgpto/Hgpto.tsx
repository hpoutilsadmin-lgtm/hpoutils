import { useEffect, useRef } from "react";
import "./hgpto.css";
import { HGPTO_MARKUP } from "./hgpto-markup";
import { initHgpto } from "./hgpto-engine";

/**
 * Sir H. Gepeto — le gérant du site HP Outils, monté globalement
 * dans le layout (voir src/routes/__root.tsx) : il vit sur toutes les pages.
 *
 * Lot A1 tap (30 oct. 2026) : ce composant n'est PLUS importé en
 * statique par __root. Il n'arrive que par l'import dynamique de
 * HgptoTap, au tap de la pastille, 1 fois. La scène de départ
 * (tapis rouge, confettis, feux) est ENLEVÉE.
 *
 * La surcouche (figure, Pixel, bulles, dock, panneau Questions, jeu
 * caché) est injectée côté client seulement — le serveur ne rend
 * qu'un conteneur vide, l'injection se fait dans l'effet.
 * « Fermer Sir H. Gepeto » (moteur) ferme l'assistant pour la session :
 * au montage, si la session l'a fermé, rien n'est injecté. Le lanceur
 * efface ce drapeau au tap explicite, donc un tap rouvre toujours.
 */
export function Hgpto() {
  const hostRef = useRef<HTMLDivElement>(null);

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
    // Lot Gepeto seul (3 nov.) : figure maître sur toutes les pages.
    {
      const bot = host.querySelector("#bot");
      const inner = host.querySelector(".bot-inner");
      if (bot && inner) {
        fetch("/hgpto/gepeto-maitre.svg")
          .then((r) => (r.ok ? r.text() : Promise.reject()))
          .then((svg) => {
            inner.innerHTML = svg;
            bot.classList.add("bot-maitre");
            window.HgptoMaitreEtape1?.saluer?.();
            window.HgptoMaitreEtape1?.reverence?.();
          })
          .catch(() => { /* repli : l'ancien PNG reste */ });
      }
    }
    initHgpto();
  }, []);

  return (
    <>
      <div ref={hostRef} className="hgpto-host" />
    </>
  );
}
