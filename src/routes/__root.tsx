import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import hpCss from "../styles/hp.css?url";
import { SiteFooter } from "@/components/SiteFooter";
import { HgptoPont } from "@/components/hgpto/HgptoPont";
import { HamsterWheel } from "@/components/hamster/HamsterWheel";
import { useEffect } from "react"; // P1 : face accueil (§2.7)

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Cette page n'a pas chargé
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Un problème est survenu de notre côté. Vous pouvez essayer de rafraîchir la page ou retourner à l'accueil.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Essayer de nouveau
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HP — des outils pour la vraie vie" },
      { name: "description", content: "HP — Comprendre. Agir. Transmettre. Livres, outils pratiques et ateliers pour la vraie vie." },
      { name: "author", content: "HP" },
      { name: "theme-color", content: "#07111b" },
      { property: "og:title", content: "HP — des outils pour la vraie vie" },
      { property: "og:description", content: "HP — Comprendre. Agir. Transmettre. Livres, outils pratiques et ateliers pour la vraie vie." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "HP — des outils pour la vraie vie" },
      { name: "twitter:description", content: "HP — Comprendre. Agir. Transmettre. Livres, outils pratiques et ateliers pour la vraie vie." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: hpCss },
      { rel: "stylesheet", href: "/barre-haut/barre-haut.css" },
    ],
    scripts: [
      {
        /* Barre unique en haut (P1, 11 nov. 2026) : même patron que la
           v3 — defer dès l'analyse du HTML, pas d'attente de
           l'hydratation. data-page est dérivé du chemin par
           barre-haut.js (§2.2) : aucun attribut ici. Correctif
           11 nov. 2026 : le script se ré-exécute à chaque navigation
           interne — sa garde d'idempotence (barre-haut.js) empêche
           qu'une barre de plus soit montée.
           Lot correctif double barre, 12 nov. 2026 : l'en-tête
           SiteHeader (logo HP + Menu) est retiré de RootComponent —
           il doublait cette barre sur toutes les pages (doigt d'HP,
           12 nov. 09 h 12 : 2 barres en ligne). La barre-haut est
           désormais la seule navigation en haut. */
        src: "/barre-haut/barre-haut.js",
        defer: true,
        "data-barre-haut": "1",
      },
      {
        src: "https://static.cloudflareinsights.com/beacon.min.js",
        defer: true,
        "data-cf-beacon": '{"token": "208bfc7b189846a98c30479f932e5762"}',
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Correctif CLS mobile 13 nov. 2026 : la barre-haut est
            montée tard par un script defer — sans réserve, son
            padding-top décale toute la page de sa hauteur (CLS
            mobile 0,2784 mesuré sur le live, 0,3601 attendu à la
            tête). Ce tout petit script synchrone pose la classe
            bh-reserve avant la première peinture ; la CSS
            (barre-haut.css) réserve alors la hauteur exacte de
            la barre dépliée, par point de rupture. Il ne la pose
            pas sur les pages STOP (/le-garde, /personne-seule),
            où aucune barre ne monte : aucune réserve, aucun vide.
            Quand barre-haut.js monte la barre, il retire la
            classe dans la même tâche — aucun mouvement. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=(window.location.pathname||"").toLowerCase();if(p==="/le-garde"||p==="/personne-seule")return;document.documentElement.classList.add("bh-reserve");}catch(e){}})();`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  /* Détectôt permanent sur l'accueil seulement (6 nov. 2026, go HP) :
     la page d'accueil a sa propre section Détectôt en flux (voir
     index.tsx) ; le widget fixe est masqué ici (pathname "/") pour
     éviter le doublon. useLocation re-rend à chaque navigation, donc
     le widget réapparaît dès qu'on quitte l'accueil. */
  const loc = useLocation();

  /* P1 : la face de la barre-haut est masquée sur l'accueil (règle
     6 nov. 07 h 08). La barre lit data-page une seule fois au
     chargement ; en navigation côté client, on bascule la classe ici. */
  useEffect(() => {
    document.getElementById("bh-barre")?.classList.toggle("bh-page-accueil", loc.pathname === "/");
  }, [loc.pathname]);

  /* Correctif 11 nov. 2026 (Q-C3) : le service worker existe depuis
     longtemps mais n'a jamais été enregistré sur les routes React —
     son cache ne servait à rien ici. Enregistrement une fois, côté
     client seulement ; en cas d'échec le site continue sur le réseau,
     sans rien casser. */
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="hp-app">
        {/* Lot correctif double barre, 12 nov. 2026 : SiteHeader retiré —
            la barre-haut (script en tête) est la seule barre. Voir
            PREPARATION-LOT-DOUBLE-BARRE-12nov-2026.md (Q-DB-1 : les
            liens secondaires ; Q-DB-3 : suppression du fichier). */}
        <main>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <HgptoPont />
      {loc.pathname !== "/" && <HamsterWheel />}
    </QueryClientProvider>
  );
}
