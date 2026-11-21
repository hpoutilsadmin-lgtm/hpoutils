import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  // NOTE (21 nov. 2026) : attachSupabaseAuth retiré — son côté client
  // appelait supabase.auth.getSession() et le client généré jette
  // « Missing Supabase environment variable(s) » car VITE_SUPABASE_URL /
  // VITE_SUPABASE_PUBLISHABLE_KEY ne sont pas injectés dans le build
  // Lovable. Il bloquait TOUTES les fonctions serveur du navigateur
  // (paiement, cadeau, infolettre). Aucune fonction serveur ne lit le
  // jeton Bearer (voir diag-paiement-21nov-2026/RAPPORT.md, ronde 2).
  // À remettre seulement quand les 2 variables seront injectées au build.
  requestMiddleware: [errorMiddleware],
}));
