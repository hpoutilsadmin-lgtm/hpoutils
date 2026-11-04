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
    // Lot Gepeto planches normal : figure planche sur toutes les pages.
    // Remplace la figure maître SVG. Les gestes Étape 1, liés aux calques
    // SVG, ne s'appliquent pas à une PNG et ne sont plus appelés.
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
    // Mode explicite d'abord (vendeur, grognon), puis contexte (/jeux,
    // /en-cuisine), sinon normal (défaut + ami — ami = normal, proposé,
    // à confirmer). Observateur calqué sur celui de Pixel (grognon).
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
  }, []);

  return (
    <>
      <div ref={hostRef} className="hgpto-host" />
    </>
  );
}
