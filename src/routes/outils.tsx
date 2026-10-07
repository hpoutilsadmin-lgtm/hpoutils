import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/outils")({
  head: () => createSeoHead({
    title: "Outils concrets pour la vraie vie | HP — Québec",
    description: "Collection Sans Honte, kits PDF et jeu interactif gratuit : des outils concrets pour les situations de la vraie vie.",
    path: "/outils",
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Outils HP</span>
          <h1>Outils <em>HP</em>.</h1>
          <p className="lead">
            Des outils simples pour mettre des mots, faire le tri et avancer sans
            se perdre dans la perfection.
          </p>
        </div>
      </section>

      {/* OUTILS SANS HONTE — mis en avant */}
      <section className="tool-section">
        <div className="container">
          <header className="tool-section-head">
            <h2>Outils Sans Honte</h2>
            <p>Dix kits PDF pour les papiers, les repas, le logement, l'entraide, la fraude et d'autres situations concrètes.</p>
          </header>
          <div className="tool-grid">
            <article className="tool-card">
              <span className="tool-tag">Collection PDF — 40 $ CAD au lieu de 50 $ CAD, aucune taxe ajoutée</span>
              <h3>Collection Sans Honte — 10 kits</h3>
              <p>
                Les 10 kits Sans Honte en un seul PDF — Papiers, Frigo, Tenir Debout,
                Seconde Main, Entraide et plus. Téléchargement immédiat après paiement.
              </p>
              <Link to="/pdf/$slug" params={{ slug: "sans-honte-collection" }}>Découvrir la collection PDF →</Link>
            </article>
            <article className="tool-card">
              <span className="tool-tag">Kit PDF — 5 $ CAD, aucune taxe ajoutée</span>
              <h3>Kit Sans Honte (au choix)</h3>
              <p>
                Un kit PDF pour explorer la honte, mettre des mots sur ce qu'on porte
                et reprendre un peu de place sans se juger.
              </p>
              <Link to="/livres-pdf">Voir les kits PDF →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="tool-section">
        <div className="container">
          <header className="tool-section-head">
            <h2>Les bons réflexes d'HP</h2>
            <p>Un petit jeu interactif pour réfléchir à des situations de la vraie vie. Gratuit, sans inscription.</p>
          </header>
          <div className="tool-grid">
            <article className="tool-card">
              <span className="tool-tag" style={{ background: "rgba(176,74,47,.12)", color: "#b04a2f" }}>Nouveauté HP</span>
              <h3>Les bons réflexes d'HP</h3>
              <p>
                Un petit jeu interactif pour tester ses réflexes du quotidien :
                cuisine, maison, entraide, émotions, sécurité et débrouillardise.
                Gratuit, simple et sans pression.
              </p>
              <a href="/apps/bons-reflexes/index.html">Jouer maintenant →</a>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
