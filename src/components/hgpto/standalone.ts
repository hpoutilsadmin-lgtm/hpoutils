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

   Figure planches (lot Gepeto planches, 4 nov. 2026) : la logique
   figure ci-dessous MIROITE celle de Hgpto.tsx (site React) —
   bloc normal puis bloc modes (mode explicite, puis contexte,
   puis normal) avec observateur data-mode. Les deux fichiers
   doivent rester synchronisés : toute modification de la figure
   dans Hgpto.tsx se répercute ici, et inversement.

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
  // Lot Gepeto planches normal : figure planche sur toutes les pages.
  // Miroir de Hgpto.tsx : remplace la figure maître SVG. Les gestes
  // Étape 1, liés aux calques SVG, ne s'appliquent pas à une PNG
  // et ne sont plus appelés.
  let figureVoulue = "/hgpto/gepeto/normal.png";
  {
    const bot = host.querySelector("#bot");
    const inner = host.querySelector(".bot-inner");
    if (bot && inner) {
      const img = new Image();
      img.className = "bot-img";
      img.alt = "Sir H. Gepeto";
      img.src = figureVoulue;
      img.onload = () => {
        if (figureVoulue !== "/hgpto/gepeto/normal.png") return;
        inner.innerHTML = "";
        inner.appendChild(img);
        bot.classList.add("bot-maitre");
      };
      img.onerror = () => { /* repli : l'ancien PNG reste */ };
    }
  }
  initHgpto();
  // Lot Gepeto planches modes : figure selon le mode puis le contexte.
  // Miroir de Hgpto.tsx : mode explicite d'abord (vendeur, grognon),
  // puis contexte (/jeux, /en-cuisine), sinon normal (défaut + ami —
  // ami = normal). Observateur calqué sur celui de Pixel (grognon).
  {
    const choisirFigure = (): string => {
      const bot = host.querySelector("#bot");
      const mode = bot?.getAttribute("data-mode");
      if (mode === "vendeur") return "/hgpto/gepeto/vendeur.png";
      if (mode === "grognon") return "/hgpto/gepeto/grognon.png";
      const chemin = window.location.pathname || "";
      if (chemin === "/jeux" || chemin.startsWith("/jeux/")) return "/hgpto/gepeto/gaming.png";
      if (chemin === "/en-cuisine" || chemin.startsWith("/en-cuisine/")) return "/hgpto/gepeto/chef.png";
      return "/hgpto/gepeto/normal.png";
    };
    const poserFigure = (): void => {
      const bot = host.querySelector("#bot");
      const inner = host.querySelector(".bot-inner");
      if (!bot || !inner) return;
      const src = choisirFigure();
      const courant = inner.querySelector("img.bot-img");
      if (courant && courant.getAttribute("src") === src) return;
      figureVoulue = src;
      const img = new Image();
      img.className = "bot-img";
      img.alt = "Sir H. Gepeto";
      img.src = src;
      img.onload = () => {
        if (figureVoulue !== src) return;
        inner.innerHTML = "";
        inner.appendChild(img);
        bot.classList.add("bot-maitre");
      };
      img.onerror = () => { /* repli : la figure actuelle reste */ };
    };
    const bot = host.querySelector("#bot");
    if (bot) {
      new MutationObserver(() => poserFigure()).observe(bot, {
        attributes: true,
        attributeFilter: ["data-mode"],
      });
    }
    poserFigure();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootHgptoStandalone);
} else {
  bootHgptoStandalone();
}
