import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/sans-honte")({
  head: () => createSeoHead({
    title: "Collection Sans Honte : 10 kits PDF | HP — Québec",
    description: "10 kits PDF concrets : papiers, frigo, logement, entraide… 10 $ le kit, 60 $ la collection. Aucune taxe ajoutée.",
    path: "/sans-honte",
    imagePath: "/images/sans-honte/collection-cover.png",
  }),
  component: Page,
});

const QUOTES = [
  "Ce qu'on cache prend toute la place.",
  "La honte n'a jamais aidé personne à se relever.",
  "On peut être en désordre et debout en même temps.",
  "Tu n'as rien à prouver pour avoir le droit d'exister.",
];

const KITS = [
  { n: "01", cover: "/images/sans-honte/kit-01.jpg", title: "Papiers Sans Honte", sub: "Reprendre le contrôle de ses papiers.", slug: "sans-honte-papiers" },
  { n: "02", cover: "/images/sans-honte/kit-02.jpg", title: "Me Reconnaître Sans Honte", sub: "Se retrouver quand on s'est perdu·e de vue.", slug: "sans-honte-me-reconnaitre" },
  { n: "03", cover: "/images/sans-honte/kit-03.jpg", title: "Frigo Sans Honte", sub: "Manger vrai avec ce qu'on a.", slug: "sans-honte-frigo" },
  { n: "04", cover: "/images/sans-honte/kit-04.jpg", title: "Tenir Debout Sans Honte", sub: "Quand la journée tient sur un fil.", slug: "sans-honte-tenir-debout" },
  { n: "05", cover: "/images/sans-honte/kit-05.jpg", title: "Seconde Main Sans Honte", sub: "S'habiller, se meubler, sans se juger.", slug: "sans-honte-seconde-main" },
  { n: "06", cover: "/images/sans-honte/kit-06.jpg", title: "Entraide Sans Honte", sub: "Demander, donner, recevoir.", slug: "sans-honte-entraide" },
  { n: "07", cover: "/images/sans-honte/kit-07.jpg", title: "Fraude Sans Honte", sub: "Se protéger, sans avoir l'air naïf·ve.", slug: "sans-honte-fraude" },
  { n: "08", cover: "/images/sans-honte/kit-08.jpg", title: "Logement Sans Honte", sub: "Habiter, garder, retrouver un chez-soi.", slug: "sans-honte-logement" },
  { n: "09", cover: "/images/sans-honte/kit-09.jpg", title: "Proche Aidant Sans Honte", sub: "Aider sans s'oublier.", slug: "sans-honte-proche-aidant" },
  { n: "10", cover: "/images/sans-honte/kit-10.jpg", title: "72 heures Sans Honte", sub: "Tenir trois jours quand tout bascule.", slug: "sans-honte-72-heures" },
];

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="kicker">Collection</span>
          <h1>Sans <em>Honte</em>.</h1>
          <p className="lead">
             Dix kits PDF concrets pour faire face aux papiers, au frigo, au logement,
             à l'entraide et à d'autres situations de la vraie vie.
          </p>
        </div>
      </section>

      <section className="subpage-content">
        <div className="container">
          <div style={{ maxWidth: 760, margin: "0 auto 48px", textAlign: "center" }}>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "#3a2a20" }}>
              Créée pour aider à mieux comprendre ce qu'on vit sans se juger ni
              devoir bien paraître, cette collection propose une approche simple,
              humaine et accessible.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(58,42,32,.75)", fontStyle: "italic", marginTop: 16 }}>
              À utiliser seul, avec un proche ou dans un contexte d'intervention.
            </p>
          </div>
          <h2 className="section-title">10 kits — La collection complète</h2>
          <p style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 32px", color: "#5a4a3f", fontSize: 16 }}>
              Chaque kit est un PDF imprimable — 10 $ CAD, aucune taxe ajoutée, téléchargement immédiat après paiement.
          </p>
          <div className="library-grid">
            {KITS.map((k) => (
              <article key={k.n} className="library-item kit-item">
                <div className="library-cover" onContextMenu={(e) => e.preventDefault()}>
                  <img src={k.cover} alt={`Couverture — ${k.title}`} loading="lazy" draggable={false} />
                  <span className="kit-badge">N°{k.n}</span>
                  <span className="kit-watermark">Aperçu • HP</span>
                </div>
                <div className="library-meta"><span className="dot" />Kit PDF — 10 $ CAD, aucune taxe ajoutée</div>
                <h3>{k.title}</h3>
                <p>{k.sub}</p>
                <Link className="lib-link" to="/pdf/$slug" params={{ slug: k.slug }}>Découvrir le kit PDF →</Link>
              </article>
            ))}
          </div>
          <div className="cta-band" style={{ marginTop: 48 }}>
            <div>
              <h3>La collection complète — les 10 kits</h3>
               <p>Toute la collection Sans Honte en un seul PDF — 60 $ CAD au lieu de 100 $, aucune taxe ajoutée. Téléchargement immédiat.</p>
            </div>
            <Link className="action-btn" to="/pdf/$slug" params={{ slug: "sans-honte-collection" }}>Découvrir la collection PDF</Link>
          </div>
        </div>
      </section>

      <section className="strong-quotes">
        <div className="container">
          <h2 className="section-title">Phrases fortes</h2>
          <div className="quote-grid">
            {QUOTES.map((q) => (
              <blockquote key={q} className="strong-quote">« {q} »</blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <h2 className="section-title">Outils associés</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">→</span>
              <h3>La carte de la honte</h3>
              <p>Un exercice court pour nommer ce qui pèse, sans avoir à l'expliquer à personne.</p>
              <Link to="/outils" className="pillar-cta">Ouvrir l'exercice</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">→</span>
              <h3>La phrase qu'on ne dit pas</h3>
              <p>Sortir une chose, en sécurité, et voir ce que ça change.</p>
              <Link to="/outils" className="pillar-cta">Ouvrir l'outil</Link>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">→</span>
              <h3>Le tri du jour</h3>
              <p>10 minutes pour séparer ce qui est à toi de ce qui ne l'est pas.</p>
              <Link to="/outils" className="pillar-cta">Ouvrir l'outil</Link>
            </article>
          </div>
          <div className="cta-band" style={{ marginTop: 40 }}>
            <div>
              <h3>Rester en lien avec Sans Honte</h3>
              <p>Recevoir les nouveaux kits, les phrases et les textes — sans spam.</p>
            </div>
            <a className="action-btn" href="https://tally.so/r/Pd8YeV" target="_blank" rel="noopener noreferrer">Recevoir les nouvelles Sans Honte</a>
          </div>
        </div>
      </section>
    </>
  );
}
