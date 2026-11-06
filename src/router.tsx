import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Lot Jour 3 (6 nov. 2026) — défilement en haut à chaque navigation :
    // scrollRestoration est déjà actif (depuis le gabarit) mais le retour
    // en haut était un défilement doux (html{scroll-behavior:smooth}) —
    // lent, il pouvait être interrompu sur les longues pages. « instant »
    // rend le retour en haut immédiat. NE PAS ajouter le composant
    // <ScrollRestoration /> (déprécié en 1.170.41, sans effet ici :
    // l'initialisation est déjà faite par createRouter).
    scrollRestorationBehavior: "instant",
    defaultPreloadStaleTime: 0,
  });

  return router;
};
