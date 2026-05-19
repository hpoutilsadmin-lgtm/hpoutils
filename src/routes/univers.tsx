import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/univers")({
  head: () => ({
    meta: [
      { title: "Univers alternatif — HP" },
      { name: "description", content: "BD, musique, personnages et récits HP — une autre façon de parler du réel : imparfait, lucide, humain." },
      { property: "og:title", content: "Univers alternatif — HP" },
      { property: "og:description", content: "BD, musique, personnages et récits HP." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Univers alternatif</span>
          <h1>Une façon différente de parler du <em>réel</em>.</h1>
          <p className="lead">
            Ici, HP passe par la BD, la musique, les personnages et l'humour pour
            dire ce que les outils pratiques disent autrement : on peut être mêlé,
            fatigué, imparfait, drôle, lucide, et continuer à avancer.
          </p>
          <div className="lead-actions">
            <a className="btn-primary" href="https://youtube.com/@hp-2zl" target="_blank" rel="noopener noreferrer">Écouter l'album</a>
            <Link to="/contact" className="btn-ghost">Proposer une collaboration</Link>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(28px,3.6vw,40px)", margin: "0 0 28px", color: "#2a1a12" }}>BD</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>PH — Déséquilibré</h3>
              <p>Chroniques de l'ordinaire. Une BD muette, absurde et humaine, qui regarde la vie de travers pour mieux la comprendre.</p>
              <span className="pillar-cta">En développement</span>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Famille atypique</h3>
              <p>Un univers shōnen québécois sur la famille, les blessures, la force, l'entraînement et la différence.</p>
              <span className="pillar-cta">Aperçu à venir</span>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Personnages et récits</h3>
              <p>Des univers en développement pour raconter la vraie vie autrement — sans posture, sans héros parfaits.</p>
              <span className="pillar-cta">En écriture</span>
            </article>
          </div>
        </div>
      </section>

      <section className="collections-strip">
        <div className="container">
          <h2>Musique — <em>Humain imparfait</em></h2>
          <p className="strip-intro">Album DIY, sensible et brut autour de l'imperfection, de la lucidité et du besoin de rester humain.</p>
          <div className="lead-actions">
            <a className="btn-primary" href="https://youtube.com/@hp-2zl" target="_blank" rel="noopener noreferrer">Écouter sur YouTube</a>
            <Link to="/album" className="btn-ghost" style={{ color: "#2a1a12", borderColor: "rgba(176,74,47,.5)" }}>Voir la page album</Link>
          </div>
        </div>
      </section>
    </>
  );
}