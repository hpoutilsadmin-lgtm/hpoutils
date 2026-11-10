// HP ô commande — moteur des missions (lot 1, étape 2, BROUILLON)
// Route de la console : /commande?key=...
//
// - Adresse directe seulement : ni dans le menu, ni dans le pied,
//   jamais indexée (noindex dans le head, adresse absente du
//   sitemap — le sitemap est une liste fermée, voir
//   src/routes/sitemap[.]xml.ts, /commande n'y figure pas).
// - Le secret est vérifié côté serveur dans le loader. Une clé absente
//   ou fausse rend 404, sans indiquer que la console existe. Le loader
//   lit la clé dans location.searchStr (le contexte de loader TanStack
//   ne fournit pas `request` : voir LoaderFnContext,
//   @tanstack/router-core).

import { createFileRoute, notFound } from "@tanstack/react-router";
import { ConsoleCommande } from "@/components/commande/ConsoleCommande";
import { createSeoHead } from "@/lib/seo";
import { isCommandeKeyValid } from "@/lib/commande/secret-link.server";
import {
  listActivity,
  listAgentStates,
  listMissions,
  listPendingApprovals,
} from "@/utils/commande.functions";

export const Route = createFileRoute("/commande")({
  validateSearch: (search: Record<string, unknown>): { key?: string } => ({
    key: typeof search.key === "string" ? search.key : undefined,
  }),
  head: () =>
    createSeoHead({
      title: "HP ô commande — console",
      description: "Console interne HP ô commande. Adresse directe seulement.",
      path: "/commande",
      noindex: true,
    }),
  loader: async ({ location }) => {
    // location.searchStr est la chaîne « ?key=... » (typée string) ;
    // location.search est typé {} dans le contexte de loader de cette
    // version de TanStack Router, d'où la lecture par searchStr.
    const key = new URLSearchParams(location.searchStr).get("key");
    if (!isCommandeKeyValid(key)) throw notFound();
    const [missions, approvals, agentStates, activity] = await Promise.all([
      listMissions(),
      listPendingApprovals(),
      listAgentStates(),
      listActivity({ data: { limit: 50 } }),
    ]);
    if (!missions.ok || !approvals.ok || !agentStates.ok || !activity.ok) {
      throw new Error("La console n'a pas pu charger ses données.");
    }
    return {
      missions: missions.data,
      approvals: approvals.data,
      agentStates: agentStates.data,
      activity: activity.data,
    };
  },
  component: CommandeConsolePage,
});

function CommandeConsolePage() {
  const data = Route.useLoaderData();
  return (
    <main>
      <h1>HP ô commande — console</h1>
      <p>Console interne. Adresse directe seulement.</p>
      <ConsoleCommande data={data} />
    </main>
  );
}
