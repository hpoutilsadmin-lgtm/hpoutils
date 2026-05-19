import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/collaborer")({
  head: () => ({
    meta: [
      { title: "Collaborer — Ateliers et partenariats HP" },
      { name: "description", content: "Ateliers HP pour écoles, bibliothèques, organismes et familles. Cuisine, IA / esprit critique, BD personnalisée." },
      { property: "og:title", content: "Collaborer — HP" },
      { property: "og:description", content: "Adapter les outils HP à votre milieu." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Ateliers et collaborations</span>
          <h1>Adapter les outils HP à votre <em>milieu</em>.</h1>
          <p className="lead">
            Pour les écoles, bibliothèques, organismes, familles, maisons de jeunes
            ou groupes qui veulent utiliser les outils HP dans un cadre concret,
            simple et humain.
          </p>
          <div className="lead-actions">
            <a className="btn-primary" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Demander une activité</a>
            <Link to="/contact" className="btn-ghost">M'écrire directement</Link>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Atelier cuisine</h3>
              <p>Cuisiner simple, comprendre les bases, utiliser ce qu'on a — sans gaspiller, sans honte.</p>
              <a className="pillar-cta" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Demander un atelier →</a>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Atelier IA / esprit critique</h3>
              <p>Comprendre les outils, les risques, les bons réflexes et les dérives — pour tous les âges.</p>
              <a className="pillar-cta" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Demander une activité →</a>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Atelier BD HP</h3>
              <p>Créer une page BD personnalisée à partir d'un personnage, d'une émotion, d'un thème et d'un décor.</p>
              <a className="pillar-cta" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Proposer une activité →</a>
            </article>
          </div>
        </div>
      </section>

      <section className="collections-strip" style={{ textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <h2>Une idée <em>sur mesure</em> ?</h2>
          <p className="strip-intro" style={{ margin: "0 auto 28px" }}>
            Conférences, interventions ponctuelles, collaborations avec un organisme — écris-moi, on regarde ensemble.
          </p>
          <div className="lead-actions" style={{ justifyContent: "center" }}>
            <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com">hpoutils.admin@gmail.com</a>
          </div>
        </div>
      </section>
    </>
  );
}