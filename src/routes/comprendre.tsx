import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/comprendre")({
  head: () => createSeoHead({
    title: "Comprendre — Les enjeux de l'humanité — HP",
    description: "Une réflexion claire sur les grandes transformations : IA, ressources, société, éducation et gouvernance.",
    path: "/comprendre",
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Comprendre</span>
          <h1>Les enjeux de <em>l’humanité</em>.</h1>
          <p className="lead">
            Une porte d’entrée claire vers les grandes transformations : IA,
            ressources, société, éducation, gouvernance et choix humains. Pour
            agir avec lucidité et espérance.
          </p>
          <div className="lead-actions">
            <a className="btn-primary" href="https://tally.so/r/A7AYGW" target="_blank" rel="noopener noreferrer">Découvrir le livre</a>
            <Link to="/contact" className="btn-ghost">Demander un extrait</Link>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(28px,3.6vw,40px)", margin: "0 0 28px", color: "#2a1a12" }}>Une réflexion nécessaire</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Comprendre les changements</h3>
              <p>Nommer ce qui bouge, sans jargon et sans panique.</p>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Identifier les risques</h3>
              <p>Regarder les impacts concrets sur les familles, les jeunes et le quotidien.</p>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Garder une longueur d’avance</h3>
              <p>Rester humain, éveillé et capable de choisir.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="collections-strip" style={{ textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2>La lucidité n’est pas du <em>pessimisme</em>.</h2>
          <p className="strip-intro">C’est la première étape de l’action juste.</p>
          <div className="lead-actions" style={{ justifyContent: "center" }}>
            <Link to="/contact" className="btn-primary">Commander</Link>
          </div>
        </div>
      </section>
    </>
  );
}