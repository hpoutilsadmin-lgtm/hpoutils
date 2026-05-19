import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HP — Des outils pour la vraie vie" },
      { name: "description", content: "HP crée des contenus, livres, PDF et réflexions pour mieux comprendre ce qu'on vit — sans se faire avaler par la performance, la honte ou les fausses solutions." },
      { property: "og:title", content: "HP — Des outils pour la vraie vie" },
      { property: "og:description", content: "Médias, livres, PDF et réflexions pour la vraie vie." },
      { property: "og:image", content: "/images/cover-faim.jpg" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">HP — média &amp; outils</span>
          <h1>Des outils pour la <em>vraie vie</em>.</h1>
          <p className="lead">
            Comprendre. Agir. Transmettre. Des contenus, des outils simples et des
            univers créatifs pour mieux vivre, mieux réfléchir et reprendre du
            contrôle sans honte.
          </p>
          <div className="lead-actions">
            <Link to="/livres-pdf" className="btn-primary">Explorer les contenus</Link>
            <Link to="/sans-honte" className="btn-ghost">Voir les outils Sans Honte</Link>
            <Link to="/univers" className="btn-ghost">Découvrir l'univers HP</Link>
          </div>
        </div>
      </section>

      {/* PILIER 01 — COMPRENDRE */}
      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Pilier 01</span>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(32px,4.4vw,48px)", margin: "8px 0 8px", color: "#2a1a12" }}>Comprendre</h2>
          <p style={{ margin: "0 0 36px", color: "rgba(42,26,18,.7)", fontStyle: "italic", fontSize: 17 }}>Nommer ce qui change — IA, société, ressources — sans jargon ni panique.</p>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Les enjeux de l'humanité</h3>
              <p>Comprendre le monde qui change, l'IA, les dérives possibles et les choix humains à faire.</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir le livre →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>La faim justifie les moyens</h3>
              <p>Cuisiner avec peu, gaspiller moins et reprendre du pouvoir sur son frigo sans honte.</p>
              <Link to="/livres-pdf" className="pillar-cta">Découvrir le guide →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Les enfants cuisinent pour faire plaisir</h3>
              <p>Un livre coloré, simple et motivant pour aider les jeunes à cuisiner, essayer, rater et recommencer.</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir le livre →</Link>
            </article>
          </div>
          <div className="lead-actions" style={{ marginTop: 28 }}>
            <Link to="/comprendre" className="btn-primary">Explorer Comprendre</Link>
          </div>
        </div>
      </section>

      {/* PILIER 02 — AGIR */}
      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Pilier 02</span>
          <h2><em>Agir</em></h2>
          <p className="strip-intro">Des outils Sans Honte pour reprendre du contrôle sur son quotidien, sans se sentir moins.</p>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Frigo Sans Honte</h3>
              <p>Reprendre le contrôle du frigo, cuisiner avec ce qu'on a et gaspiller moins.</p>
              <Link to="/sans-honte" className="pillar-cta">Voir l'outil →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Me reconnaître Sans Honte</h3>
              <p>Adapter sa journée à son cerveau, sans diagnostic sauvage et sans se juger.</p>
              <Link to="/sans-honte" className="pillar-cta">Voir le kit →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Fraude Sans Honte</h3>
              <p>Reconnaître les pièges, ralentir avant de cliquer et protéger ses proches.</p>
              <Link to="/sans-honte" className="pillar-cta">Voir le kit →</Link>
            </article>
          </div>
          <p style={{ marginTop: 32, fontStyle: "italic", color: "rgba(42,26,18,.65)", fontSize: 15 }}>
            Les autres kits de la collection sont en déploiement.{" "}
            <Link to="/sans-honte" style={{ color: "#b04a2f", fontWeight: 700 }}>Voir toute la collection →</Link>
          </p>
        </div>
      </section>

      {/* PILIER 03 — TRANSMETTRE */}
      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Pilier 03</span>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(32px,4.4vw,48px)", margin: "8px 0 8px", color: "#2a1a12" }}>Transmettre</h2>
          <p style={{ margin: "0 0 36px", color: "rgba(42,26,18,.7)", fontStyle: "italic", fontSize: 17 }}>Adapter les outils HP à votre milieu — école, organisme, famille, équipe.</p>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Atelier cuisine</h3>
              <p>Cuisiner simple, comprendre les bases, utiliser ce qu'on a.</p>
              <Link to="/collaborer" className="pillar-cta">Demander un atelier →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Atelier IA / esprit critique</h3>
              <p>Comprendre les outils, les risques, les bons réflexes et les dérives.</p>
              <Link to="/collaborer" className="pillar-cta">Demander une activité →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Atelier BD HP</h3>
              <p>Créer une page BD personnalisée à partir d'un personnage, d'une émotion, d'un thème et d'un décor.</p>
              <Link to="/collaborer" className="pillar-cta">Proposer une activité →</Link>
            </article>
          </div>
          <div className="lead-actions" style={{ marginTop: 28 }}>
            <Link to="/transmettre" className="btn-primary">Explorer Transmettre</Link>
          </div>
        </div>
      </section>

      {/* UNIVERS ALTERNATIF (bonus) */}
      <section className="three-pillars" style={{ background: "#0b1422", color: "#f5ead4" }}>
        <div className="container">
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(32px,4.4vw,48px)", margin: "0 0 8px", color: "#f5ead4" }}>Univers alternatif</h2>
          <p style={{ margin: "0 0 36px", color: "rgba(245,234,212,.75)", fontStyle: "italic", fontSize: 17 }}>Une autre façon de dire la même chose.</p>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>PH — Déséquilibré</h3>
              <p>Chroniques de l'ordinaire. Une BD muette, absurde et humaine.</p>
              <Link to="/univers" className="pillar-cta">Découvrir PH →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Famille atypique</h3>
              <p>Un univers shōnen québécois sur la famille, les blessures, la force et la différence.</p>
              <Link to="/univers" className="pillar-cta">Voir l'aperçu →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Humain imparfait</h3>
              <p>Album DIY, sensible et brut autour de l'imperfection, de la lucidité et du besoin de rester humain.</p>
              <Link to="/univers" className="pillar-cta">Écouter l'album →</Link>
            </article>
          </div>
        </div>
      </section>

      {/* CONTACT / INFOLETTRE */}
      <section className="collections-strip" style={{ textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2>Rester <em>proche</em> du projet</h2>
          <p className="strip-intro" style={{ margin: "0 auto 36px" }}>
            Recevoir les nouveaux outils, les contenus utiles, les dates d'ateliers et les prochaines sorties HP.
          </p>
          <div className="lead-actions" style={{ justifyContent: "center" }}>
            <Link to="/contact" className="btn-primary">Me contacter</Link>
            <a href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ color: "#2a1a12", borderColor: "rgba(176,74,47,.5)" }}>Recevoir les nouvelles HP</a>
          </div>
          <p style={{ marginTop: 28, fontSize: 15, color: "rgba(42,26,18,.7)" }}>
            <a href="mailto:hpoutils.admin@gmail.com" style={{ color: "#b04a2f", fontWeight: 700 }}>hpoutils.admin@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  );
}
