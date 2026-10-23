import { createFileRoute, redirect } from "@tanstack/react-router";
import { GAME_FILES } from "@/lib/jeux-adresses";

/* Adresse stable d'un jeu : /apps/<slug> → 301 vers le fichier
   courant (voir src/lib/jeux-adresses.ts). Même patron éprouvé
   que /en-cuisine, /boite et /passeur-de-savoir : les liens
   partagés ne cassent plus quand un jeu change de version.
   Slug inconnu → retour à la page des jeux (jamais un 404 sec). */
export const Route = createFileRoute("/apps/$slug")({
  beforeLoad: ({ params }) => {
    const file = GAME_FILES[params.slug];
    throw redirect({ href: file ?? "/jeux", statusCode: 301 });
  },
  head: () => ({
    meta: [
      { title: "Jeux gratuits — HP Outils" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  return null;
}
