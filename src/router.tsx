import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/* P1 — retour en haut intermittent (6 nov. 2026, après vérification live
   b98f4303 point 8) : le 1er clic sur /a-propos ou /les-passeurs changeait
   l'URL mais l'ancienne page restait affichée. Cause : TanStack Start
   découpe chaque route en un morceau JS chargé à la demande ; au 1er
   clic le morceau n'était pas encore là, aucun préchargement n'était
   actif, et aucun composant d'attente n'existait — le routeur gardait
   donc l'ancienne page affichée (puis écran vide) jusqu'à l'arrivée du
   morceau. Ce petit état « Chargement de la page… » s'affiche à la
   place de l'ancienne page dès que l'attente dépasse 200 ms : le 1er
   clic répond toujours visiblement, et la page s'ouvre en haut dès que
   son morceau arrive (le retour en haut du routeur, déjà en place,
   se déclenche à la fin de la navigation). Sans animation, sans
   nouvelle dépendance, sans appel réseau : juste du texte. */
function ChargementPage() {
  return (
    <div style={{ padding: "56px 16px", textAlign: "center" }}>
      <p role="status" aria-live="polite" style={{ fontSize: 18, margin: 0 }}>
        Chargement de la page…
      </p>
      <p style={{ margin: "8px 0 0" }}>
        Merci de patienter — la page arrive.
      </p>
    </div>
  );
}

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
    // P1 — retour en haut intermittent (6 nov. 2026) : voir ChargementPage
    // ci-dessus. 200 ms : en dessous, la page arrive sans flash ; au-dessus,
    // le visiteur voit que son clic a répondu au lieu d'une page figée.
    // 0 ms minimum : dès que le morceau de la page est là, la page
    // s'affiche — on ne retient jamais la vraie page derrière l'attente.
    defaultPendingComponent: ChargementPage,
    defaultPendingMs: 200,
    defaultPendingMinMs: 0,
    // P1 : précharger le morceau de la route au survol / toucher (50 ms),
    // pour tous les liens qui n'ont pas leur propre réglage — le pied de
    // page règle les siens sur "viewport" (voir SiteFooter). Sans ce
    // réglage, aucun préchargement n'avait lieu nulle part dans le site.
    defaultPreload: "intent",
  });

  return router;
};
