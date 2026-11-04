// ROUTE DE REDIRECTION — /survie-72h → /outils-web/survie-72h.html
// Préparation seulement, sans dépôt. Même justification que /le-garde :
// outil statique sous public/outils-web/ (précédent du site), route confirmée
// par HP = /survie-72h, redirection déterministe dans l'application monopage.
// Le fichier outil n'existe qu'à UN seul endroit : public/outils-web/survie-72h.html.
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/survie-72h")({
  head: () =>
    createSeoHead({
      title: "Survie 72h | HP Outils",
      description:
        "Survie 72h, un outil gratuit, sans compte, pour se préparer à se débrouiller au moins 72 heures. Page ouverte seulement.",
      path: "/survie-72h",
    }),
  component: Page,
});

function Page() {
  useEffect(() => {
    window.location.replace("/outils-web/survie-72h.html");
  }, []);
  return (
    <section className="subpage-content">
      <div className="container">
        <p>Vous êtes redirigé vers Survie 72h.</p>
        <p>
          <a href="/outils-web/survie-72h.html">Ouvrir Survie 72h</a>
        </p>
      </div>
    </section>
  );
}
