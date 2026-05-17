import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HP — Des outils simples pour la vraie vie" },
      { name: "description", content: "Comprendre. Agir. Transmettre. Livres, outils et ateliers pour la vraie vie." },
      { property: "og:title", content: "HP — Des outils simples pour la vraie vie" },
      { property: "og:description", content: "Comprendre. Agir. Transmettre." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <div className="hero">
        <div className="earth" />
        <div className="city" />
        <div className="person" />
        <div className="container">
          <div className="hero-content">
            <h1>
              HP —<span>DES OUTILS SIMPLES<br />POUR LA VRAIE VIE</span>
            </h1>
            <p className="tagline">Comprendre. Agir. Transmettre.</p>
            <div className="hero-buttons">
              <Link className="hero-btn gold" to="/comprendre">🚀 Commencer ici</Link>
              <Link className="hero-btn green" to="/outils">📖 Voir les livres</Link>
              <Link className="hero-btn orange" to="/ateliers">👥 Voir les ateliers</Link>
              <Link className="hero-btn blue" to="/album">♫ Écouter l’album</Link>
            </div>
          </div>
        </div>
      </div>

      <section className="home-live" aria-label="Ateliers en direct chaque semaine">
        <div className="container">
          <h2>Ateliers en direct chaque semaine</h2>
          <div className="live-grid">
            <article className="live-card">
              <span className="live-icon">IA</span>
              <div><h3>Lundi 21h</h3><p>Réflexion IA pour comprendre sans se perdre.</p></div>
              <strong className="live-price">10 $</strong>
            </article>
            <article className="live-card">
              <span className="live-icon">🍲</span>
              <div><h3>Mardi 18h</h3><p>Cuisine simple, parent + enfant, accessible.</p></div>
              <strong className="live-price">Gratuit</strong>
            </article>
            <Link className="hero-btn gold" to="/ateliers">Rejoindre cette semaine</Link>
          </div>
        </div>
      </section>

      <section className="triad" aria-label="Vision Action Transmission">
        <article className="triad-card vision">
          <h2>VISION</h2>
          <p className="sub">Comprendre le monde qui change</p>
          <div className="triad-inner">
            <div className="book-shell">
              <img className="book-cover" src="/images/cover-enjeux.jpg" alt="Couverture Les enjeux de l’humanité" />
            </div>
            <div className="triad-text">
              <p>Voir clair, repérer les risques et garder une longueur d’avance humaine.</p>
              <Link className="outline-btn" to="/comprendre">Voir le livre</Link>
              <div className="micro">◉ Réflexions, analyses et perspectives</div>
            </div>
          </div>
        </article>
        <article className="triad-card action">
          <h2>ACTION</h2>
          <p className="sub">Mieux vivre dans la vraie vie</p>
          <div className="triad-inner">
            <div className="book-shell">
              <img className="book-cover" src="/images/cover-faim.jpg" alt="Couverture La faim justifie les moyens" />
            </div>
            <div className="triad-text">
              <p>Des outils simples, accessibles et utiles pour mieux manger, économiser et se débrouiller.</p>
              <Link className="outline-btn" to="/outils">Voir l’outil</Link>
              <div className="micro">◎ Cuisine, budget et autonomie</div>
            </div>
          </div>
        </article>
        <article className="triad-card transmission">
          <h2>TRANSMISSION</h2>
          <p className="sub">Passer le relais humainement</p>
          <div className="triad-inner">
            <div className="book-shell">
              <img className="book-cover" src="/images/cover-enfants-3d.png" alt="Couverture Les enfants cuisinent pour faire plaisir" />
            </div>
            <div className="triad-text">
              <p>Aider les jeunes et les familles à gagner confiance, autonomie et plaisir.</p>
              <Link className="outline-btn" to="/ateliers">Voir l’atelier</Link>
              <div className="micro">☁ Ateliers pratiques et ludiques</div>
            </div>
          </div>
        </article>
      </section>

      <section className="cream-section">
        <div className="container">
          <h2 className="section-title">COMMENT COMMENCER ?</h2>
          <div className="start-grid">
            <Link className="start-card" to="/comprendre">
              <span className="round-icon blue">☷</span>
              <span><h3>Je veux comprendre</h3><p>Explorer les enjeux, les risques et les grandes transformations.</p></span>
              <span className="arrow">›</span>
            </Link>
            <Link className="start-card" to="/outils">
              <span className="round-icon green">🛠</span>
              <span><h3>J’ai besoin d’un outil concret</h3><p>Accéder à des solutions simples et directement utiles.</p></span>
              <span className="arrow">›</span>
            </Link>
            <Link className="start-card" to="/ateliers">
              <span className="round-icon orange">☷</span>
              <span><h3>Je cherche un atelier</h3><p>Apprendre en groupe, transmettre et gagner en autonomie.</p></span>
              <span className="arrow">›</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="offers">
        <div className="container">
          <h2 className="section-title">NOS OFFRES</h2>
          <div className="offer-grid">
            <article className="offer-card">
              <span className="round-icon green">📖</span>
              <span><h3>Livres &amp; guides</h3><p>Comprendre, anticiper et rester lucide.</p></span>
              <Link className="small-btn" to="/comprendre">Découvrir</Link>
            </article>
            <article className="offer-card">
              <span className="round-icon green">🍴</span>
              <span><h3>Outils pratiques</h3><p>Des ressources concrètes pour la vraie vie.</p></span>
              <Link className="small-btn" to="/outils">Explorer</Link>
            </article>
            <article className="offer-card featured">
              <span className="round-icon orange">👥</span>
              <span><h3>Ateliers</h3><p>Apprendre ensemble, créer, transmettre.</p></span>
              <Link className="small-btn" to="/ateliers">Participer</Link>
            </article>
            <article className="offer-card">
              <span className="round-icon brown">💡</span>
              <span><h3>Œuvres &amp; réflexion</h3><p>Musique, écrits et créations qui nourrissent l’esprit.</p></span>
              <Link className="small-btn" to="/album">Découvrir</Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
}
