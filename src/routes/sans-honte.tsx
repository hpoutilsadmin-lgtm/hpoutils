import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/sans-honte")({
  head: () => ({
    meta: [
      { title: "Sans Honte — Collection HP" },
      { name: "description", content: "Une collection pour parler de ce qu'on cache, ce qu'on porte, ce qu'on n'ose pas nommer — sans jugement, sans performance." },
      { property: "og:title", content: "Sans Honte — HP" },
      { property: "og:description", content: "Une collection pour ce qu'on cache, ce qu'on porte, ce qu'on n'ose pas nommer." },
      { property: "og:image", content: "/images/cover-enfants-3d.png" },
    ],
  }),
  component: Page,
});

const QUOTES = [
  "Ce qu'on cache prend toute la place.",
  "La honte n'a jamais aidé personne à se relever.",
  "On peut être en désordre et debout en même temps.",
  "Tu n'as rien à prouver pour avoir le droit d'exister.",
];

const BOOKS = [
  { cover: "/images/cover-enfants-3d.png", title: "Kit Sans Honte — Frigo", tag: "PDF" },
  { cover: "/images/cover-enjeux.jpg", title: "Tenir Debout", tag: "Guide" },
  { cover: "/images/cover-faim.jpg", title: "Seconde Main", tag: "PDF" },
  { cover: "/images/cover-enfants.jpg", title: "Entraide", tag: "PDF" },
];

function Page() {
  return (
    <>
      <section className="manifesto">
        <div className="container">
          <span className="kicker">Collection</span>
          <h1>Sans <em>Honte</em>.</h1>
          <p className="intro">
            Sans Honte, c'est une collection pour parler de ce qu'on cache, ce
            qu'on porte, ce qu'on n'ose pas nommer — sans jugement, sans
            performance, sans petite morale propre.
          </p>
        </div>
      </section>

      <section className="subpage-content">
        <div className="container">
          <h2 className="section-title">La collection</h2>
          <div className="library-grid">
            {BOOKS.map((b) => (
              <article key={b.title} className="library-item">
                <div className="library-cover"><img src={b.cover} alt={b.title} loading="lazy" /></div>
                <div className="library-meta"><span className="dot" />{b.tag}</div>
                <h3>{b.title}</h3>
                <a className="lib-link" href="https://tally.so/r/A7AYGW" target="_blank" rel="noopener noreferrer">Découvrir →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="strong-quotes">
        <div className="container">
          <h2 className="section-title">Phrases fortes</h2>
          <div className="quote-grid">
            {QUOTES.map((q) => (
              <blockquote key={q} className="strong-quote">« {q} »</blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <h2 className="section-title">Outils associés</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">→</span>
              <h3>La carte de la honte</h3>
              <p>Un exercice court pour nommer ce qui pèse, sans avoir à l'expliquer à personne.</p>
              <Link to="/outils" className="pillar-cta">Ouvrir l'exercice</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">→</span>
              <h3>La phrase qu'on ne dit pas</h3>
              <p>Sortir une chose, en sécurité, et voir ce que ça change.</p>
              <Link to="/outils" className="pillar-cta">Ouvrir l'outil</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">→</span>
              <h3>Le tri du jour</h3>
              <p>10 minutes pour séparer ce qui est à toi de ce qui ne l'est pas.</p>
              <Link to="/outils" className="pillar-cta">Ouvrir l'outil</Link>
            </article>
          </div>
          <div className="cta-band" style={{ marginTop: 40 }}>
            <div>
              <h3>Rester en lien avec Sans Honte</h3>
              <p>Recevoir les nouveaux kits, les phrases et les textes — sans spam.</p>
            </div>
            <a className="action-btn" href="https://tally.so/r/A7AYGW" target="_blank" rel="noopener noreferrer">S'inscrire</a>
          </div>
        </div>
      </section>
    </>
  );
}
