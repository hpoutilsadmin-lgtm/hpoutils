import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/collaborer")({
  head: () => createSeoHead({
    title: "Collaborer avec HP — Ateliers sur mesure au Québec",
    description: "Collaborations et ateliers pratiques pour écoles, bibliothèques et organismes à Terrebonne, dans Lanaudière et les environs.",
    path: "/collaborer",
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
             <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com?subject=Demande%20de%20collaboration%20HP">Demander une activité</a>
            <Link to="/contact" className="btn-ghost">Écrire à la direction humaine</Link>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Les enfants cuisinent</h3>
              <p>90 min · 120 $ CAD, forfait groupe — cuisiner ensemble, apprendre et gagner en autonomie.</p>
              <Link className="pillar-cta" to="/ateliers">Voir les ateliers →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Hygiène & salubrité</h3>
              <p>60 à 90 min · 120 $ CAD, forfait groupe — sensibilisation aux bons gestes du quotidien.</p>
              <Link className="pillar-cta" to="/ateliers">Voir les ateliers →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Ateliers sur mesure</h3>
              <p>Survie alimentaire, marché du travail et smoothie — adaptés à votre groupe.</p>
              <Link className="pillar-cta" to="/ateliers">Découvrir les six ateliers et la fiche organismes &amp; écoles →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Découvre aussi</span>
          <h2 className="section-title">Avant l'atelier, <em>le gratuit</em></h2>
          <p className="strip-intro">
            La Boîte à outils rassemble les outils web gratuits d'HP — sans compte,
            à essayer dès maintenant avec ton groupe, ton équipe ou ta classe.
          </p>
          <div className="lead-actions">
            <a className="btn-primary" href="/boite/">Ouvrir la Boîte à outils</a>
            <Link to="/ateliers" className="btn-ghost">Voir les ateliers</Link>
          </div>
        </div>
      </section>

      <section className="collections-strip" style={{ textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <h2>Une idée <em>sur mesure</em> ?</h2>
          <p className="strip-intro" style={{ margin: "0 auto 28px" }}>
            Conférences, interventions ponctuelles, collaborations avec un organisme — <a href="mailto:hpoutils.admin@gmail.com">écrivez à la direction humaine</a>, on regarde ensemble.
          </p>
          <div className="lead-actions" style={{ justifyContent: "center" }}>
            <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com">hpoutils.admin@gmail.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
