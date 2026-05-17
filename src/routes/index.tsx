import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HP — Des outils pour la vraie vie" },
      { name: "description", content: "HP crée des contenus, livres, PDF et réflexions pour mieux comprendre ce qu'on vit — sans se faire avaler par la performance, la honte ou les fausses solutions." },
      { property: "og:title", content: "HP — Des outils pour la vraie vie" },
      { property: "og:description", content: "Médias, livres, PDF et réflexions pour la vraie vie." },
      { property: "og:image", content: "/images/cover-faim.jpg" },
    ],
  }),
  component: Index,
});

const COLLECTIONS = [
  { label: "Sans Honte", tag: "Collection", to: "/sans-honte" },
  { label: "Outil ou piège", tag: "Réflexions", to: "/reflexions" },
  { label: "Humain imparfait", tag: "Réflexions", to: "/reflexions" },
  { label: "IA & vraie vie", tag: "Réflexions", to: "/reflexions" },
  { label: "Livres et PDF HP", tag: "Bibliothèque", to: "/livres-pdf" },
];

function Index() {
  return (
    <>
      <section className="editorial-hero">
        <div className="container">
          <span className="editorial-kicker">HP — média &amp; outils</span>
          <h1>Des outils pour la <em>vraie vie</em>.</h1>
          <p className="lead">
            HP crée des contenus, livres, PDF et réflexions pour mieux comprendre
            ce qu'on vit — sans se faire avaler par la performance, la honte ou
            les fausses solutions.
          </p>
          <div className="lead-actions">
            <Link to="/outils" className="btn-primary">Explorer les outils</Link>
            <Link to="/sans-honte" className="btn-ghost">Découvrir Sans Honte</Link>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Lire &amp; télécharger</h3>
              <p>Livres, PDF, guides et ressources concrètes à garder près de soi.</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir les livres et PDF</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Regarder &amp; réfléchir</h3>
              <p>Capsules, textes courts et réflexions sur l'IA, l'humain imparfait, la honte, les pièges modernes et les outils qu'on utilise.</p>
              <Link to="/reflexions" className="pillar-cta">Lire les réflexions</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Utiliser &amp; créer</h3>
              <p>Des outils simples pour mettre des mots, faire le tri et avancer sans se perdre dans la perfection.</p>
              <Link to="/outils" className="pillar-cta">Explorer les outils</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="collections-strip">
        <div className="container">
          <h2>Collections en vedette</h2>
          <p className="strip-intro">Des univers à explorer, selon ce qui te parle aujourd'hui.</p>
          <div className="collections-grid">
            {COLLECTIONS.map((c) => (
              <Link key={c.label} to={c.to} className="collection-chip">
                <span>{c.tag}</span>
                <strong>{c.label}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
