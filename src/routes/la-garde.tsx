// ROUTE DE REDIRECTION SILENCIEUSE — /la-garde → /outils-web/la-garde.html
// Lot trio La garde, 4 nov. 2026 : le hub est le fichier verbatim exporté
// de l'artefact corrigé, servi sous public/outils-web/la-garde.html.
// Même modèle que les autres outils statiques du site.
// S-52 (chantier 1, 19 nov. 2026) : aucun écran intermédiaire — la page
// redirige sans afficher « Vous êtes redirigé » ; sans JavaScript,
// le lien reste accessible dans <noscript>.
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/la-garde")({
  head: () =>
    createSeoHead({
      title: "La garde | HP Outils",
      description:
        "La garde : où chaque gardien a son utilité. Trois outils gratuits, sans compte, page ouverte seulement.",
      path: "/la-garde",
    }),
  component: Page,
});

function Page() {
  useEffect(() => {
    window.location.replace("/outils-web/la-garde.html");
  }, []);
  return (
    <noscript>
      <section className="subpage-content">
        <div className="container">
          <p>
            <a href="/outils-web/la-garde.html">Ouvrir La garde</a>
          </p>
        </div>
      </section>
    </noscript>
  );
}
