import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/transmettre")({
  head: () => ({
    meta: [
      { title: "Transmettre — Les enfants cuisinent pour faire plaisir — HP" },
      { name: "description", content: "Ressources et ateliers pour aider enfants, familles, écoles et organismes à apprendre en cuisinant et en partageant." },
      { property: "og:title", content: "Transmettre — HP" },
      { property: "og:description", content: "Des ateliers pour grandir ensemble." },
      { property: "og:image", content: "/images/cover-enfants-3d.png" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <div className="subpage-hero hero-split theme-paper">
        <div className="container">
          <div>
            <p className="page-kicker">Transmettre</p>
            <h1>Transmettre l’essentiel aux générations.</h1>
            <p className="page-lead">Des ateliers pour grandir ensemble.</p>
            <p>Des ressources pour aider les enfants, les familles, les écoles et les organismes à apprendre en cuisinant, en partageant et en gagnant confiance.</p>
            <div className="page-actions">
              <a className="action-btn" href="https://tally.so/r/A7AYGW" target="_blank" rel="noopener noreferrer">Découvrir le livre</a>
              <Link className="outline-btn" to="/ateliers">Voir les ateliers</Link>
            </div>
          </div>
          <img className="hero-product" src="/images/cover-enfants-3d.png" alt="Couverture Les enfants cuisinent pour faire plaisir" />
        </div>
      </div>
      <div className="subpage-content">
        <div className="container">
          <h2 className="section-title">Pour qui ?</h2>
          <div className="cards">
            <article className="info-card"><span className="mini-note">Familles</span><h3>Cuisiner ensemble</h3><p>Créer des souvenirs, des habitudes simples et plus d’autonomie.</p></article>
            <article className="info-card"><span className="mini-note">Enfants</span><h3>Apprendre en s’amusant</h3><p>Développer l’autonomie, la confiance et le droit d’essayer.</p></article>
            <article className="info-card"><span className="mini-note">Écoles et organismes</span><h3>Ateliers adaptés</h3><p>Des contenus simples, flexibles et faciles à animer.</p></article>
          </div>
          <div className="cta-band">
            <div><h3>Transmettre, c’est donner des outils pour se débrouiller.</h3><p>Et aussi pour s’entraider, comprendre et être fier.</p></div>
            <Link className="hero-btn gold" to="/contact">Faire une demande</Link>
          </div>
        </div>
      </div>
    </>
  );
}