import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/a-propos")({
  head: () => createSeoHead({
    title: "À propos — Hugo Pierre Bertrand, créateur de HP Outils | Terrebonne",
    description: "HP Outils, c'est Hugo Pierre Bertrand, créateur à Terrebonne (Lanaudière) : des jeux, des livres et des outils concrets pour la vraie vie, pensés pour les petits budgets.",
    path: "/a-propos",
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: 40, alignItems: "center" }}>
          <div>
            <p className="page-kicker">À propos</p>
            <h1>Comprendre. Agir. Transmettre.</h1>
            <p className="lead">HP est né d'une approche simple : tester, apprendre, recommencer, puis partager ce qui fonctionne concrètement dans la vraie vie.</p>
            <p className="lead" style={{ marginTop: 12 }}>Je ne prétends pas avoir toutes les réponses. Mon objectif est de créer des outils simples, utiles et dignes, pensés pour être réellement utilisables au quotidien.</p>
            <div className="lead-actions">
              <Link className="action-btn" to="/contact">Me contacter</Link>
              <Link className="outline-btn" to="/">Voir l'écosystème</Link>
            </div>
          </div>
          <img
            src="/images/photo-hp.jpg"
            alt="Portrait de HP"
            className="hero-portrait"
            style={{ width: 240, height: 240, borderRadius: "50%", objectFit: "cover", border: "4px solid rgba(246,237,221,.92)", boxShadow: "0 20px 50px rgba(0,0,0,.55)" }}
          />
        </div>
      </section>
      <div className="subpage-content">
        <div className="container">
          <div className="cards">
            <article className="info-card"><span className="mini-note">Vision</span><h3>Comprendre</h3><p>Voir le monde avec lucidité et bienveillance pour faire des choix alignés.</p></article>
            <article className="info-card"><span className="mini-note">Action</span><h3>Agir</h3><p>Passer à l'action avec des outils concrets, adaptés à la vraie vie.</p></article>
            <article className="info-card"><span className="mini-note">Transmission</span><h3>Transmettre</h3><p>Partager ce qui fonctionne pour que chacun puisse avancer à son tour.</p></article>
          </div>
          <div className="cta-band">
            <div><h3>Un écosystème d'outils pour la vraie vie.</h3><p>Livres, guides, ateliers, musique et ressources pratiques : tout part du même besoin d'avancer simplement.</p></div>
            <Link className="hero-btn gold" to="/outils">Découvrir les outils</Link>
          </div>
        </div>
      </div>
    </>
  );
}
