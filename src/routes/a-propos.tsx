import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";
import HugoDeguise from "@/components/deguisements/HugoDeguise";
import PhotoDeguise from "@/components/deguisements/PhotoDeguise";

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
            <p className="lead" style={{ fontFamily: "Georgia,serif", fontStyle: "italic", marginTop: 16 }}>« J'ai jamais su qui j'étais, ce que j'aimais — alors je fais un peu de tout. »</p>
            <p className="lead">HP est né d'une approche simple : tester, apprendre, recommencer, puis partager ce qui fonctionne concrètement dans la vraie vie.</p>
            <p className="lead" style={{ marginTop: 12 }}>Je ne prétends pas avoir toutes les réponses. Mon objectif est de créer des outils simples, utiles et dignes, pensés pour être réellement utilisables au quotidien.</p>
            <div className="lead-actions">
              <Link className="action-btn" to="/contact">Me contacter</Link>
              <Link className="outline-btn" to="/">Voir l'écosystème</Link>
            </div>
          </div>
          <HugoDeguise />
        </div>
        <div className="container">
          <PhotoDeguise />
        </div>
      </section>
      <div className="subpage-content">
        <div className="container">
          <section style={{ maxWidth: 760, margin: "0 auto 44px" }}>
            <span className="mini-note">Qui est Hugo</span>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(28px,3.6vw,40px)", margin: "10px 0 18px" }}>L'homme derrière HP</h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 14px" }}>
              Je m'appelle <strong>Hugo Pierre Bertrand</strong>. HP Outils, c'est le projet que je
              construis à Terrebonne, dans Lanaudière : des jeux, des livres, des recettes et des
              outils concrets — « des outils pour la vraie vie ».
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 14px" }}>
              Je pars d'une conviction : les gens qu'on dit « en bas » sont éduqués, dignes, et
              veulent apprendre, partager et repartir. C'est pour eux que je construis. Du gratuit
              chaque fois que c'est possible — 35 jeux, 629 recettes, des outils web sans compte —
              et des prix qui respectent un petit budget quand ça ne l'est pas : 5 $ CAD le kit,
              aucune taxe ajoutée.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: 0 }}>
              Je crée tout ce que tu vois ici, avec l'IA comme outil de fabrication — la direction,
              les idées et les mots restent humains. Chaque jeu et chaque outil est testé avant
              d'être publié. Et je fais aussi de la musique : j'écris et j'enregistre mes propres
              chansons — l'album <em>Humain imparfait</em> et le balado <em>Futur simple</em> racontent
              le même monde, autrement.
            </p>
          </section>
          <div className="cards">
            <article className="info-card"><span className="mini-note">Vision</span><h3>Comprendre</h3><p>Voir le monde avec lucidité et bienveillance pour faire des choix alignés.</p></article>
            <article className="info-card"><span className="mini-note">Action</span><h3>Agir</h3><p>Passer à l'action avec des outils concrets, adaptés à la vraie vie.</p></article>
            <article className="info-card"><span className="mini-note">Transmission</span><h3>Transmettre</h3><p>Partager ce qui fonctionne pour que chacun puisse avancer à son tour.</p></article>
          </div>
          <div className="cta-band">
            <div><h3>Un écosystème d'outils pour la vraie vie.</h3><p>Livres, guides, ateliers, musique et ressources pratiques : tout part du même besoin d'avancer simplement.</p></div>
            <Link className="hero-btn gold" to="/outils">Découvrir les outils</Link>
          </div>
          <div className="cards" style={{ marginTop: 28 }}>
            <article className="info-card">
              <span className="mini-note">Transmettre</span>
              <h3>Le Passeur de savoir</h3>
              <p>Les trucs et les savoirs de nos grands-parents, recueillis avant qu'ils ne partent en silence.</p>
              <a className="pillar-cta" href="/passeur-de-savoir/">Ouvrir le Passeur →</a>
            </article>
            <article className="info-card">
              <span className="mini-note">Soutenir</span>
              <h3>Les Passeurs</h3>
              <p>Le programme qui tiendra le gratuit debout : 3 $ CAD par mois, bientôt en ligne — aucune taxe ajoutée.</p>
              <Link className="pillar-cta" to="/les-passeurs">Découvrir les Passeurs →</Link>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
