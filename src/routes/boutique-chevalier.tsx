import { createFileRoute } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/boutique-chevalier")({
  head: () =>
    createSeoHead({
      title: "Chevalier du fleuve — boutique fermée | HP Outils",
      description:
        "La boutique est fermée : dans Chevalier du fleuve, toutes les pierres se gagnent en jouant.",
      path: "/boutique-chevalier",
    }),
  component: Page,
});

/**
 * Page « Boutique Chevalier », remplacée par un avis de fermeture.
 *
 * Décision HP du 27 octobre 2026 (22 h 46) : boutique FERMÉE, les jeux
 * c'est gratuit et c'est tout. Cette page n'est plus une boutique :
 * aucun prix, aucun paiement, aucun paquet — seulement l'avis de
 * fermeture et le bouton Jouer. Elle remplace la suppression de la
 * révision du 27 octobre 2026 (21 h 53), que la décision 22 h 46 remplace.
 */
function Page() {
  return (
    <>
      <section className="editorial-hero">
        <div className="container">
          <span className="editorial-kicker">Chevalier du fleuve</span>
          <h1>
            La boutique est <em>fermée</em>.
          </h1>
          <p className="lead">
            La boutique est fermée : dans Chevalier du fleuve, toutes les
            pierres se gagnent en jouant.
          </p>
          <div className="lead-actions">
            <a
              href="/apps/chevalier-du-fleuve/chevalier-du-fleuve-v1.4.html"
              className="btn-ghost"
            >
              Jouer à Chevalier du fleuve →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
