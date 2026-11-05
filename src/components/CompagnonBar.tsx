import { useEffect } from "react";

/**
 * Compagnon de navigation — montage React (lot, §3 étape 2).
 *
 * Ce composant ne rend rien : en repli, il charge le fichier généré
 * `/compagnon/compagnon.js` (build `build:compagnon`, source
 * `src/components/compagnon/compagnon.js`) si le `head()` de
 * `src/routes/__root.tsx` ne l'a pas déjà chargé en `<script defer>`
 * (chemin principal depuis le correctif republication du 5 nov. 2026 :
 * la barre ne doit plus attendre l'hydratation). Une seule source,
 * un seul comportement, React ou statique.
 *
 * Le CSS (`/compagnon/compagnon.css`) est lié dans le `head()` de
 * `src/routes/__root.tsx` (rendu côté serveur, sans flash) — pas ici.
 * Le fichier généré est une IIFE qui s'initialise seule
 * (DOMContentLoaded ou immédiat si le document est déjà prêt) :
 * il n'y a rien à appeler, rien à importer en dynamique.
 *
 * Si le fichier généré est absent (build non lancé, republication
 * en retard), rien ne casse : la page reste utilisable, sans barre,
 * et un avertissement part en console.
 */
const JS_URL = "/compagnon/compagnon.js";

/* Garde-fou : n'injecter le script qu'une seule fois par session de
   page, même si l'effet se rejoue (StrictMode, re-montage). La barre
   vit pour la session de la page ; le démontage du composant ne la
   retire pas, comme la zone de `HgptoTap`. */
let scriptInjecte = false;

export function CompagnonBar() {
  useEffect(() => {
    if (scriptInjecte) return;
    if (document.querySelector('script[data-compagnon]')) {
      scriptInjecte = true;
      return;
    }
    if (document.getElementById("compagnon")) {
      scriptInjecte = true;
      return;
    }
    const script = document.createElement("script");
    script.src = JS_URL;
    /* `defer` est documentaire ici (un script injecté s'exécute dès
       son téléchargement) ; le fichier généré attend de toute façon
       DOMContentLoaded quand le document charge encore. */
    script.defer = true;
    script.setAttribute("data-compagnon", "1");
    script.onerror = () => {
      /* Fichier généré absent : la page reste utilisable, sans barre. */
      console.warn(
        "Compagnon : /compagnon/compagnon.js introuvable, barre non chargée.",
      );
    };
    document.body.appendChild(script);
    scriptInjecte = true;
  }, []);

  return null;
}
