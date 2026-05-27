import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/outils")({
  head: () => ({
    meta: [
      { title: "Outils — Le cœur du projet HP" },
      { name: "description", content: "Outils HP : collection Sans Honte en PDF et application interactive Les bons réflexes d'HP (bientôt disponible)." },
      { property: "og:title", content: "Outils — HP" },
      { property: "og:description", content: "Des outils numériques simples pour mettre des mots, faire le tri et avancer." },
    ],
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
            <p>La collection Sans Honte en format PDF — pour mettre des mots sur ce qu'on porte et reprendre un peu de place sans se juger.</p>
          </header>
          <div className="tool-grid">
            <article className="tool-card">
              <span className="tool-tag">Collection PDF — 60 $ CAD taxes incluses</span>
              <h3>Collection Sans Honte — 10 kits</h3>
              <p>
                Les 10 kits Sans Honte en un seul PDF — Papiers, Frigo, Tenir Debout,
                Seconde Main, Entraide et plus. Téléchargement immédiat après paiement.
              </p>
              <Link to="/pdf/$slug" params={{ slug: "sans-honte-collection" }}>Découvrir la collection PDF →</Link>
            </article>
            <article className="tool-card">
              <span className="tool-tag">Kit PDF — 10 $ CAD taxes incluses</span>
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
            <p>Bientôt — une application interactive pour pratiquer des réflexes simples dans la vraie vie.</p>
          </header>
          <div className="tool-grid">
            <article className="tool-card" style={{ opacity: 0.85 }}>
              <span className="tool-tag" style={{ background: "rgba(176,74,47,.12)", color: "#b04a2f" }}>Bientôt disponible</span>
              <h3>Les bons réflexes d'HP</h3>
              <p>
                Une application interactive pour pratiquer des réflexes simples
                dans la vraie vie : cuisine, émotions, ménage, sécurité numérique,
                santé mentale, communication, dépendance et organisation.
              </p>
              <span style={{ opacity: 0.6, fontWeight: 600 }} aria-disabled>Bientôt disponible</span>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
