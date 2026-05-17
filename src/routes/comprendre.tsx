import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/comprendre")({
  head: () => ({
    meta: [
      { title: "Comprendre — Les enjeux de l’humanité — HP" },
      { name: "description", content: "Une réflexion claire sur les grandes transformations : IA, ressources, société, éducation, gouvernance." },
      { property: "og:title", content: "Comprendre — HP" },
      { property: "og:description", content: "Pour agir avec lucidité et espérance." },
      { property: "og:image", content: "/images/cover-enjeux.jpg" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <div className="subpage-hero hero-split">
        <div className="container">
          <div>
            <p className="page-kicker">Comprendre</p>
            <h1>Les enjeux de l’humanité</h1>
            <p className="page-lead">Pour agir avec lucidité et espérance.</p>
            <p>Une porte d’entrée claire vers les grandes transformations : IA, ressources, société, éducation, gouvernance et choix humains.</p>
            <div className="page-actions">
              <a className="action-btn" href="https://tally.so/r/A7AYGW" target="_blank" rel="noopener noreferrer">Découvrir le livre</a>
              <Link className="outline-btn" to="/contact">Demander un extrait</Link>
            </div>
          </div>
          <img className="hero-product" src="/images/cover-enjeux.jpg" alt="Couverture Les enjeux de l’humanité" />
        </div>
      </div>
      <div className="subpage-content">
        <div className="container">
          <h2 className="section-title">Une réflexion nécessaire</h2>
          <div className="cards">
            <article className="info-card"><span className="mini-note">Lucidité</span><h3>Comprendre les changements</h3><p>Nommer ce qui bouge, sans jargon et sans panique.</p></article>
            <article className="info-card"><span className="mini-note">Action</span><h3>Identifier les risques</h3><p>Regarder les impacts concrets sur les familles, les jeunes et le quotidien.</p></article>
            <article className="info-card"><span className="mini-note">Espérance</span><h3>Garder une longueur d’avance</h3><p>Rester humain, éveillé et capable de choisir.</p></article>
          </div>
          <div className="cta-band">
            <div><h3>La lucidité n’est pas du pessimisme.</h3><p>C’est la première étape de l’action juste.</p></div>
            <Link className="hero-btn gold" to="/contact">Commander</Link>
          </div>
        </div>
      </div>
    </>
  );
}