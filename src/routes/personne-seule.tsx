// ROUTE DE REDIRECTION — /personne-seule → /outils-web/personne-seule.html
// Préparation seulement, sans dépôt. Même justification que /le-garde :
// outil statique sous public/outils-web/ (précédent du site), route confirmée
// par HP = /personne-seule, redirection déterministe dans l'application monopage.
// Le fichier outil n'existe qu'à UN seul endroit : public/outils-web/personne-seule.html.
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/personne-seule")({
  head: () =>
    createSeoHead({
      title: "Personne seule | HP Outils",
      description:
        "Personne seule, un outil gratuit, sans compte, pour les moments où vous êtes seul : message à copier, appeler un proche, signe de vie, signal convenu. Page ouverte seulement.",
      path: "/personne-seule",
    }),
  component: Page,
});

function Page() {
  useEffect(() => {
    window.location.replace("/outils-web/personne-seule.html");
  }, []);
  return (
    <section className="subpage-content">
      <div className="container">
        <p>Vous êtes redirigé vers Personne seule.</p>
        <p>
          <a href="/outils-web/personne-seule.html">Ouvrir Personne seule</a>
        </p>
      </div>
    </section>
  );
}
