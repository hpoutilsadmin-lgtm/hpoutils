import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/album")({
  head: () => ({
    meta: [
      { title: "Album Humain imparfait — HP" },
      { name: "description", content: "Humain imparfait — l’univers musical HP. Écoute officielle sur YouTube." },
      { property: "og:title", content: "Album — HP" },
      { property: "og:description", content: "Humain imparfait — l’univers musical HP." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Album HP</span>
          <h1>Humain <em>imparfait</em>.</h1>
          <p className="lead">
            L’univers musical HP — sensible, brut et lucide. Pour l’instant,
            l’écoute officielle passe par YouTube.
          </p>
          <div className="lead-actions">
            <a className="btn-primary" href="https://youtube.com/@hp-2zl" target="_blank" rel="noopener noreferrer">Écouter l’album</a>
            <Link to="/univers" className="btn-ghost">Voir l’univers HP</Link>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Humain imparfait</h3>
              <p>Musique, textes et émotions reliés à l’écosystème HP. Écoute gratuite sur YouTube.</p>
              <a className="pillar-cta" href="https://youtube.com/@hp-2zl" target="_blank" rel="noopener noreferrer">Écouter →</a>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Liens plateformes</h3>
              <p>Spotify, Apple Music, Deezer et autres liens pourront être ajoutés ici.</p>
              <span className="pillar-cta">À venir</span>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Œuvres HP</h3>
              <p>BD, récits, textes et projets créatifs reliés à la même vision.</p>
              <Link to="/univers" className="pillar-cta">Découvrir →</Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}