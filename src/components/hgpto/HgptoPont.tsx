import { useEffect, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import { Hgpto } from "./Hgpto";

/**
 * Pont React de la barre unique v3 (lot 5 nov. 2026) — remplace HgptoTap.
 * Le moteur Sir H. Gepeto ne charge qu'au tap sur la commande Gepeto de
 * la barre (événement 'hp:gepeto-ouvrir'). Il est monté DANS le panneau
 * de la barre (#compagnon-gepeto-hote), jamais dans le body : plus de
 * pastille, plus de panneau séparé, plus de zone de vie de 290 px.
 * La barre signale sa présence par data-hgpto-pont sur <html> ; si le
 * moteur est déjà là (bundle autonome chargé avant), on ne remonte rien.
 * Comme l'ancien lanceur, un tap explicite efface 'hgpto-closed'.
 */
export function HgptoPont() {
  const monte = useRef(false);
  const racine = useRef<Root | null>(null);

  useEffect(() => {
    try {
      document.documentElement.dataset.hgptoPont = "1";
    } catch {
      /* signal indisponible : la barre injectera le bundle autonome */
    }
    const ouvrir = () => {
      if (monte.current) return;
      monte.current = true;
      try {
        sessionStorage.removeItem("hgpto-closed");
      } catch {
        /* stockage indisponible */
      }
      if (document.querySelector(".hgpto-host")) return;
      const hote = document.getElementById("compagnon-gepeto-hote");
      if (!hote) {
        monte.current = false;
        return;
      }
      const conteneur = document.createElement("div");
      hote.appendChild(conteneur);
      racine.current = createRoot(conteneur);
      racine.current.render(<Hgpto />);
    };
    document.addEventListener("hp:gepeto-ouvrir", ouvrir);
    return () => {
      document.removeEventListener("hp:gepeto-ouvrir", ouvrir);
      try {
        delete document.documentElement.dataset.hgptoPont;
      } catch {
        /* signal indisponible */
      }
    };
  }, []);

  return null;
}
