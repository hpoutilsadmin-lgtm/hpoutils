import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/univers")({
  head: () => createSeoHead({
    title: "Univers alternatif — HP",
    description: "BD, musique, personnages et récits HP — une autre façon de parler du réel : imparfait, lucide et humain.",
    path: "/univers",
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Univers alternatif</span>
          <h1>Des mondes, personnages et collections qui regardent la vraie vie <em>de côté</em>.</h1>
          <p className="lead">
            Univers alternatif rassemble les projets créatifs qui prolongent HP
            autrement : PH, Famille atypique, Humain imparfait et d'autres mondes
            imparfaits, drôles, sensibles ou un peu décalés. Ce n'est pas une
            distraction du projet HP. C'est une autre façon de parler de ce qu'on vit.
          </p>
          <div className="lead-actions">
            <a className="btn-primary" href="https://youtube.com/@hp-2zl" target="_blank" rel="noopener noreferrer">Écouter l'album</a>
            <Link to="/contact" className="btn-ghost">Me parler d'un projet</Link>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>PH — Déséquilibré</h3>
              <p>Chroniques de l'ordinaire. Une BD muette, absurde et humaine, qui regarde la vie de travers pour mieux la comprendre.</p>
              <span className="pillar-cta">Découvrir — bientôt</span>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Famille atypique</h3>
              <p>Un univers shōnen québécois sur la famille, les blessures, la force, l'entraînement et la différence.</p>
              <span className="pillar-cta">Découvrir — bientôt</span>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Humain imparfait</h3>
              <p>Album DIY, sensible et brut autour de l'imperfection, de la lucidité et du besoin de rester humain.</p>
              <a className="pillar-cta" href="https://youtube.com/@hp-2zl" target="_blank" rel="noopener noreferrer">Écouter →</a>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">04</span>
              <h3>Les bons réflexes d'HP</h3>
              <p>
                Un outil interactif et éducatif pour explorer les bons réflexes
                du quotidien avec une approche simple, humaine et accessible.
              </p>
              <Link to="/outils/bons-reflexes" className="pillar-cta">Ouvrir l’outil →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">05</span>
              <h3>Autres projets créatifs</h3>
              <p>Personnages, récits et collections en écriture — d'autres mondes imparfaits à venir.</p>
              <span className="pillar-cta" style={{ opacity: 0.6 }}>Bientôt disponible</span>
            </article>
          </div>
        </div>
      </section>

      <section className="collections-strip">
        <div className="container">
          <h2>Écouter <em>Humain imparfait</em></h2>
          <p className="strip-intro">L'album à écouter sur YouTube — ou via la page album dédiée.</p>
          <div className="lead-actions">
            <a className="btn-primary" href="https://youtube.com/@hp-2zl" target="_blank" rel="noopener noreferrer">Écouter sur YouTube</a>
            <Link to="/album" className="btn-ghost" style={{ color: "#2a1a12", borderColor: "rgba(176,74,47,.5)" }}>Voir la page album</Link>
          </div>
        </div>
      </section>
    </>
  );
}