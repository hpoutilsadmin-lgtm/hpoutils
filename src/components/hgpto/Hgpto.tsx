import { useEffect, useRef } from "react";
import "./hgpto.css";
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

  return <div ref={hostRef} className="hgpto-host" />;
}
