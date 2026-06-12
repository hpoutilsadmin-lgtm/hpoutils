import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/outils")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/outils/bons-reflexes") {
      throw redirect({ href: "/apps/bons-reflexes/index.html" });
    }
  },
  head: () => ({
    meta: [
      { title: "Outils — Le cœur du projet HP" },
      { name: "description", content: "Outils PDF concrets pour la santé mentale, le soutien émotionnel et l'accompagnement quotidien. Collection Sans Honte et ressources accessibles pour soi, ses proches ou un contexte d'intervention." },
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
            <p>Des outils PDF pour mettre des mots sur la honte, le stress, l'isolement ou certaines émotions difficiles. Une approche simple et accessible — à utiliser seul, avec un proche ou dans un contexte d'intervention.</p>
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
