import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/transmettre")({
  head: () => createSeoHead({
    title: "Transmettre — Les enfants cuisinent pour faire plaisir — HP",
    description: "Ressources et ateliers pour aider enfants, familles, écoles et organismes à apprendre en cuisinant et en partageant.",
    path: "/transmettre",
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Transmettre</span>
          <h1>Transmettre l’essentiel aux <em>générations</em>.</h1>
          <p className="lead">
            Des ressources pour aider les enfants, les familles, les écoles et
            les organismes à apprendre en cuisinant, en partageant et en
            gagnant confiance.
          </p>
          <div className="lead-actions">
            <a className="btn-primary" href="https://tally.so/r/A7AYGW" target="_blank" rel="noopener noreferrer">Découvrir le livre</a>
            <Link to="/collaborer" className="btn-ghost">Voir les ateliers</Link>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(28px,3.6vw,40px)", margin: "0 0 28px", color: "#2a1a12" }}>Pour qui ?</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Cuisiner ensemble</h3>
              <p>Créer des souvenirs, des habitudes simples et plus d’autonomie.</p>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Apprendre en s’amusant</h3>
              <p>Développer l’autonomie, la confiance et le droit d’essayer.</p>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Ateliers adaptés</h3>
              <p>Des contenus simples, flexibles et faciles à animer pour écoles et organismes.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="collections-strip" style={{ textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2>Transmettre, c’est donner des outils pour <em>se débrouiller</em>.</h2>
          <p className="strip-intro">Et aussi pour s’entraider, comprendre et être fier.</p>
          <div className="lead-actions" style={{ justifyContent: "center" }}>
            <Link to="/contact" className="btn-primary">Faire une demande</Link>
            <Link to="/pdf/enfants-cuisinent" className="btn-ghost">Voir la fiche du livre</Link>
          </div>
        </div>
      </section>
    </>
  );
}