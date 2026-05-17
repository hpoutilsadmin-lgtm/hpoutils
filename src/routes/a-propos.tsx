import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — HP" },
      { name: "description", content: "HP existe pour créer des outils simples, utiles et dignes. Comprendre. Agir. Transmettre." },
      { property: "og:title", content: "À propos — HP" },
      { property: "og:description", content: "Un écosystème d’outils pour la vraie vie." },
      { property: "og:image", content: "/images/photo-auteur.jpg" },
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
            <p className="page-kicker">À propos</p>
            <h1>Je ne suis pas un expert parfait.</h1>
            <p className="page-lead">Comprendre. Agir. Transmettre.</p>
            <p>Je teste, j’apprends, je recommence, puis je partage ce qui fonctionne pour vrai. HP existe pour créer des outils simples, utiles et dignes.</p>
            <div className="page-actions">
              <Link className="action-btn" to="/contact">Me contacter</Link>
              <Link className="outline-btn" to="/">Voir l’écosystème</Link>
            </div>
          </div>
          <img className="hero-photo" src="/images/photo-auteur.jpg" alt="Photo du créateur HP" />
        </div>
      </div>
      <div className="subpage-content">
        <div className="container">
          <div className="cards">
            <article className="info-card"><span className="mini-note">Vision</span><h3>Comprendre</h3><p>Voir le monde avec lucidité et bienveillance pour faire des choix alignés.</p></article>
            <article className="info-card"><span className="mini-note">Action</span><h3>Agir</h3><p>Passer à l’action avec des outils concrets, adaptés à la vraie vie.</p></article>
            <article className="info-card"><span className="mini-note">Transmission</span><h3>Transmettre</h3><p>Partager ce qui fonctionne pour que chacun puisse avancer à son tour.</p></article>
          </div>
          <div className="cta-band">
            <div><h3>Un écosystème d’outils pour la vraie vie.</h3><p>Livres, guides, ateliers, musique et ressources pratiques : tout part du même besoin d’avancer simplement.</p></div>
            <Link className="hero-btn gold" to="/outils">Découvrir les outils</Link>
          </div>
        </div>
      </div>
    </>
  );
}