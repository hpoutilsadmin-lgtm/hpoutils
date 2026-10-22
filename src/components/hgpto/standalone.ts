/* ============================================================
   HGPTO — point d'entrée AUTONOME, pour les pages statiques qui
   ne passent pas par le shell React (le montage global de
   src/routes/__root.tsx ne s'y applique pas) — aujourd'hui
   l'outil « En cuisine » (public/en-cuisine/index.html).

   Il fait exactement ce que Hgpto.tsx fait sur le site React :
   vérifier la fermeture pour la session, créer le conteneur
   .hgpto-host, y injecter le markup et démarrer le moteur. Les
   sources restent uniques (hgpto-markup / hgpto-engine /
   hgpto-data / hgpto.css) : ce fichier n'est qu'un amorçage.

   Bundle généré par scripts/build-hgpto-standalone.mjs
   (commande : bun run build:hgpto) vers public/hgpto/.
   ============================================================ */
import "./hgpto.css";
import { HGPTO_MARKUP } from "./hgpto-markup";
import { initHgpto } from "./hgpto-engine";

function bootHgptoStandalone(): void {
  let closed = false;
  try {
    closed = sessionStorage.getItem("hgpto-closed") === "1";
  } catch {
    /* stockage indisponible : on laisse la mascotte vivre */
  }
  if (closed) return;
  if (document.querySelector(".hgpto-host")) return;
  document.body.classList.add("hgpto-on");
  const host = document.createElement("div");
  host.className = "hgpto-host";
  host.innerHTML = HGPTO_MARKUP;
  document.body.appendChild(host);
  initHgpto();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootHgptoStandalone);
} else {
  bootHgptoStandalone();
}
