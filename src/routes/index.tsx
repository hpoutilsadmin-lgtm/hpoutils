import { createFileRoute, Link } from "@tanstack/react-router";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => createSeoHead({
    title: "HP — Kits PDF et outils concrets pour la vraie vie | Québec",
    description: "Kits PDF Sans Honte, livres pratiques et ateliers à Terrebonne et dans Lanaudière. 5 $ CAD le kit, aucune taxe ajoutée. Créé au Québec.",
    path: "/",
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">HP — créé au Québec</span>
          <h1>Des outils concrets pour la <em>vraie vie</em>.</h1>
          <p className="lead">
            Des PDF et des kits à télécharger, des livres, et des ateliers sur mesure —
            créés au Québec.
          </p>
          <div className="lead-actions">
            <Link to="/sans-honte" className="btn-primary">Découvrir les kits Sans Honte</Link>
            <Link to="/livres-pdf" className="btn-primary">Voir livres, PDF &amp; réflexions</Link>
            <Link to="/univers" className="btn-primary">Découvrir Univers alternatif</Link>
          </div>
        </div>
      </section>

      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Du 1er octobre au 23 décembre</span>
          <h2>Ateliers &amp; conférence — <em>Édition des Fêtes</em></h2>
          <p className="strip-intro">Pain maison à domicile, IA sans jargon et conférence La faim justifie les moyens.</p>
          <div className="lead-actions">
            <Link to="/ateliers" hash="edition-des-fetes" className="btn-primary">Découvrir l'Édition des Fêtes</Link>
          </div>
        </div>
      </section>

      {/* SANS HONTE */}
      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Collection</span>
          <h2>Collection <em>Sans Honte</em></h2>
          <p className="strip-intro">
             Dix kits PDF pratiques sur les papiers, le frigo, le logement,
             l'entraide, la fraude et d'autres situations de la vraie vie.
          </p>
          <div className="lead-actions">
             <Link to="/sans-honte" className="btn-primary">Voir les 10 kits Sans Honte</Link>
          </div>
        </div>
      </section>

      {/* LIVRES & PDF */}
      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Bibliothèque</span>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(32px,4.4vw,48px)", margin: "8px 0 8px", color: "#2a1a12" }}>Livres, PDF &amp; réflexions</h2>
          <p style={{ margin: "0 0 36px", color: "rgba(42,26,18,.7)", fontStyle: "italic", fontSize: 17 }}>Des formats qui se gardent, se prêtent, se relisent.</p>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Enjeux de l'humanité à l'ère de l'IA</h3>
              <p>Voir clair sur ce qui se joue, sans paniquer ni minimiser. — 15 $ CAD, aucune taxe ajoutée</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir le PDF →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>La faim justifie les moyens</h3>
              <p>Mieux manger avec peu : bases simples, recettes accessibles et réflexes anti-gaspillage. — 10 $ CAD, aucune taxe ajoutée</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir le PDF →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Les enfants cuisinent pour faire plaisir</h3>
              <p>Un projet doux pour transmettre le plaisir, pas la performance. — 20 $ CAD, aucune taxe ajoutée</p>
              <Link to="/pdf/$slug" params={{ slug: "enfants-cuisinent" }} className="pillar-cta">Voir le PDF →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">04</span>
              <h3>Horizon Québec</h3>
              <p>Une nouvelle HP sur l'amitié, la langue, le Québec et ce qu'on essaie encore de tenir ensemble. — 10 $ CAD, aucune taxe ajoutée</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir le PDF →</Link>
            </article>
          </div>
          <div className="lead-actions" style={{ marginTop: 28 }}>
            <Link to="/livres-pdf" className="btn-primary">Voir livres, PDF &amp; réflexions</Link>
          </div>
        </div>
      </section>

      {/* UNIVERS ALTERNATIF */}
      <section className="three-pillars" style={{ background: "#0b1422", color: "#f5ead4" }}>
        <div className="container">
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(32px,4.4vw,48px)", margin: "0 0 8px", color: "#f5ead4" }}>Univers alternatif</h2>
          <p style={{ margin: "0 0 36px", color: "rgba(245,234,212,.75)", fontStyle: "italic", fontSize: 17 }}>
            Des personnages, mondes et collections qui prolongent HP autrement : PH,
            Famille atypique, Humain imparfait et les projets créatifs qui regardent
            la vraie vie de côté.
          </p>
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
          <div className="lead-actions" style={{ marginTop: 28 }}>
            <Link to="/univers" className="btn-primary">Explorer les univers</Link>
          </div>
        </div>
      </section>

      {/* ATELIERS */}
      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Pour les groupes &amp; organismes</span>
          <h2><em>Ateliers</em></h2>
          <p className="strip-intro">
            Les ateliers HP prolongent les outils dans les groupes, les organismes et
            les milieux qui veulent réfléchir autrement. Une façon de faire vivre les
            ressources sur le terrain.
          </p>
          <div className="lead-actions">
            <Link to="/ateliers" className="btn-primary">Voir les ateliers</Link>
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
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
