import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";
import { BUNDLE, FREE_TOME, PAYANT_TOMES, priceLabel } from "@/lib/tomes-catalog";
import { ShareButton } from "@/components/ShareButton";

export const Route = createFileRoute("/univers")({
  head: () => createSeoHead({
    title: "Univers HP — À toi l'histoire, BD et musique | HP Outils",
    description: "Les histoires de HP : la série « À toi l'histoire » (11 tomes de 5 $ à 8 $ et un tome gratuit), la BD PH — Déséquilibré, Famille atypique et l'album Humain imparfait. Créé au Québec, imparfait et humain.",
    path: "/univers",
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">À toi l'histoire</span>
          <h1>Les histoires de HP, à vous de les vivre.</h1>
          <p className="lead">
            « À toi l'histoire », ce sont 12 tomes : 11 livres-jeux interactifs,
            de 5 $ à 8 $, et un tome gratuit. Chaque choix tisse l'histoire — et
            chaque tome arrive par lien web personnel, sans PDF ni compte. Écrits
            par un humain, pour la vraie vie.
          </p>
          <div className="lead-actions">
            <Link to="/lire" className="btn-primary">Lire les tomes</Link>
            <ShareButton text="À toi l'histoire — 12 tomes interactifs, le 1er gratuit. HP Outils." />
            <a className="btn-ghost" href="https://youtube.com/@hp-2zl" target="_blank" rel="noopener noreferrer">Écouter l'album</a>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Le tome gratuit</span>
          <h2 className="section-title">Commence par <em>La Chasse-Galerie</em></h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>{FREE_TOME.title}</h3>
              <p>{FREE_TOME.hook}</p>
              <p><strong>Gratuit</strong> · aucune taxe ajoutée</p>
              <Link to="/lire" className="pillar-cta">Recevoir mon lien gratuit →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Les 11 tomes</span>
          <h2 className="section-title">Choisissez votre histoire</h2>
          <div className="pillar-grid">
            {PAYANT_TOMES.map((tome) => (
              <article className="pillar-card" key={tome.slug}>
                <h3>{tome.title}</h3>
                <p>{tome.hook}</p>
                <p>
                  {tome.paragraphes} paragraphes · {tome.fins} fins
                  {tome.public ? ` · ${tome.public}` : ""}
                </p>
                <p><strong>{priceLabel(tome)}</strong> · aucune taxe ajoutée</p>
                
              </article>
            ))}
          </div>
          <div className="lead-actions">
            <Link to="/lire" className="btn-primary">Lire les tomes →</Link>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Le bundle</span>
          <h2 className="section-title">Trois tomes au choix, 12 $</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>{BUNDLE.title}</h3>
              <p>{BUNDLE.hook}</p>
              <p><strong>12 $ CAD</strong> · 15 $ à 24 $ séparément, selon les tomes choisis · aucune taxe ajoutée</p>
              <Link to="/lire" className="pillar-cta">Choisir mes 3 tomes →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Et aussi</span>
          <h2 className="section-title">D'autres mondes, mêmes mains</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Humain imparfait</h3>
              <p>Album DIY, sensible et brut autour de l'imperfection, de la lucidité et du besoin de rester humain.</p>
              <a className="pillar-cta" href="https://youtube.com/@hp-2zl" target="_blank" rel="noopener noreferrer">Écouter →</a>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Les bons réflexes d'HP</h3>
              <p>
                Un outil interactif et éducatif pour explorer les bons réflexes
                du quotidien avec une approche simple, humaine et accessible.
              </p>
              <Link to="/outils/bons-reflexes" className="pillar-cta">Ouvrir l’outil →</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>En écriture</h3>
              <p>
                PH — Déséquilibré : chroniques de l'ordinaire, une BD muette, absurde
                et humaine. Famille atypique : un univers shōnen québécois sur la
                famille, les blessures, la force, l'entraînement et la différence.
                En écriture — sans lien pour l'instant.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="collections-strip">
        <div className="container">
          <h2>Écouter <em>Humain imparfait</em></h2>
          <p className="strip-intro">L'album à écouter sur YouTube — ou via la page album dédiée.</p>
          <div className="lead-actions">
            <a className="btn-primary" href="https://youtube.com/@hp-2zl" target="_blank" rel="noopener noreferrer">Écouter sur YouTube</a>
            <Link to="/album" className="btn-ghost" style={{ color: "#2a1a12", borderColor: "rgba(176,74,47,.5)" }}>Voir la page album</Link>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Découvrez aussi</span>
          <h2 className="section-title">Les univers se vivent <em>aussi en jouant</em></h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>Les jeux gratuits</h3>
              <p>RELÈVE et 35 autres jeux gratuits, jouables dans votre navigateur, sans inscription.</p>
              <Link to="/jeux" className="pillar-cta">Jouer →</Link>
            </article>
            <article className="pillar-card">
              <h3>Les livres HP</h3>
              <p>Les récits continuent en livres et en PDF : une nouvelle, des guides et des réflexions d'ici.</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir les livres →</Link>
            </article>
            <article className="pillar-card">
              <h3>Lire les tomes</h3>
              <p>La série « À toi l'histoire » : 11 tomes de 5 $ à 8 $, un tome gratuit, et le bundle 3 tomes à 12 $.</p>
              <Link to="/lire" className="pillar-cta">Lire →</Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
