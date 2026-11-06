import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import hpCss from "../styles/hp.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HgptoPont } from "@/components/hgpto/HgptoPont";
import { HamsterWheel } from "@/components/hamster/HamsterWheel";
import { CompagnonBar } from "@/components/CompagnonBar";

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
      { rel: "stylesheet", href: "/compagnon/compagnon.css" },
    ],
    scripts: [
      {
        /* Barre unique v3 — correctif republication (5 nov. 2026) :
           la barre se charge en defer dès l'analyse du HTML,
           comme sur les pages statiques, au lieu d'attendre
           l'hydratation React (elle montait avec quelques secondes
           de retard sur l'accueil, page d'entrée). CompagnonBar
           reste en repli (garde script[data-compagnon]). */
        src: "/compagnon/compagnon.js",
        defer: true,
        "data-compagnon": "1",
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

  return (
    <QueryClientProvider client={queryClient}>
      <div className="hp-app">
        <SiteHeader />
        <main>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <HgptoPont />
      <CompagnonBar />
      <HamsterWheel />
    </QueryClientProvider>
  );
}
