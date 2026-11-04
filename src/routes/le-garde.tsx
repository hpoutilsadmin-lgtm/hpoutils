// ROUTE DE REDIRECTION — /le-garde → /outils-web/le-garde.html
// Préparation seulement, sans dépôt. Justification : les outils statiques du
// site vivent déjà sous public/outils-web/*.html (précédent live : maintenant,
// le-relais, ca-vaut-tu-la-peine, etc.). La route confirmée par HP est /le-garde ;
// dans une application monopage TanStack Router, un lien vers /le-garde doit
// être une route, sinon il tombe sur la page d'accueil. Cette route minimale
// redirige donc vers le fichier outil, sans réécrire l'outil.
// Alternative rejetée : public/le-garde/index.html seul, sans route — la
// résolution d'un répertoire en page d'index n'est pas garantie par
// l'hébergement de l'application, et elle créerait un second modèle d'URL.
// Le fichier outil n'existe qu'à UN seul endroit : public/outils-web/le-garde.html.
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/le-garde")({
  head: () =>
    createSeoHead({
      title: "Le Garde | HP Outils",
      description:
        "Le Garde, un outil gratuit, sans compte, à déclencher vous-même, quand quelqu'un vous intimide. Page ouverte seulement.",
      path: "/le-garde",
    }),
  component: Page,
});

function Page() {
  useEffect(() => {
    window.location.replace("/outils-web/le-garde.html");
  }, []);
  return (
    <section className="subpage-content">
      <div className="container">
        <p>Vous êtes redirigé vers Le Garde.</p>
        <p>
          <a href="/outils-web/le-garde.html">Ouvrir Le Garde</a>
        </p>
      </div>
    </section>
  );
}
