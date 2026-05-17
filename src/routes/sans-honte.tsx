import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/sans-honte")({
  head: () => ({
    meta: [
      { title: "Sans Honte — Collection HP" },
      { name: "description", content: "Une collection pour parler de ce qu'on cache, ce qu'on porte, ce qu'on n'ose pas nommer — sans jugement, sans performance." },
      { property: "og:title", content: "Sans Honte — HP" },
      { property: "og:description", content: "Une collection pour ce qu'on cache, ce qu'on porte, ce qu'on n'ose pas nommer." },
      { property: "og:image", content: "/images/cover-enfants-3d.png" },
    ],
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
  { n: "01", cover: "/images/sans-honte/kit-01.jpg", title: "Papiers Sans Honte", sub: "Reprendre le contrôle de ses papiers." },
  { n: "02", cover: "/images/sans-honte/kit-02.jpg", title: "Me Reconnaître Sans Honte", sub: "Se retrouver quand on s'est perdu·e de vue." },
  { n: "03", cover: "/images/sans-honte/kit-03.jpg", title: "Frigo Sans Honte", sub: "Manger vrai avec ce qu'on a." },
  { n: "04", cover: "/images/sans-honte/kit-04.jpg", title: "Tenir Debout Sans Honte", sub: "Quand la journée tient sur un fil." },
  { n: "05", cover: "/images/sans-honte/kit-05.jpg", title: "Seconde Main Sans Honte", sub: "S'habiller, se meubler, sans se juger." },
  { n: "06", cover: "/images/sans-honte/kit-06.jpg", title: "Entraide Sans Honte", sub: "Demander, donner, recevoir." },
  { n: "07", cover: "/images/sans-honte/kit-07.jpg", title: "Fraude Sans Honte", sub: "Se protéger, sans avoir l'air naïf·ve." },
  { n: "08", cover: "/images/sans-honte/kit-08.jpg", title: "Logement Sans Honte", sub: "Habiter, garder, retrouver un chez-soi." },
  { n: "09", cover: "/images/sans-honte/kit-09.jpg", title: "Proche Aidant Sans Honte", sub: "Aider sans s'oublier." },
  { n: "10", cover: "/images/sans-honte/kit-10.jpg", title: "72 heures Sans Honte", sub: "Tenir trois jours quand tout bascule." },
];

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="kicker">Collection</span>
          <h1>Sans <em>Honte</em>.</h1>
          <p className="lead">
            Sans Honte, c'est une collection pour parler de ce qu'on cache, ce
            qu'on porte, ce qu'on n'ose pas nommer — sans jugement, sans
            performance, sans petite morale propre.
          </p>
        </div>
      </section>

      <section className="subpage-content">
        <div className="container">
          <h2 className="section-title">10 kits — La collection complète</h2>
          <p style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 32px", color: "#5a4a3f", fontSize: 16 }}>
            Chaque kit est un PDF imprimable, prêt à coller au frigo, à plier dans un sac, à offrir.
            Pas téléchargeables ici — on s'écrit pour te les envoyer.
          </p>
          <div className="library-grid">
            {KITS.map((k) => (
              <article key={k.n} className="library-item kit-item">
                <div className="library-cover" onContextMenu={(e) => e.preventDefault()}>
                  <img src={k.cover} alt={`Couverture — ${k.title}`} loading="lazy" draggable={false} />
                  <span className="kit-badge">N°{k.n}</span>
                  <span className="kit-watermark">Aperçu • HP</span>
                </div>
                <div className="library-meta"><span className="dot" />Kit PDF imprimable</div>
                <h3>{k.title}</h3>
                <p>{k.sub}</p>
                <a className="lib-link" href="https://tally.so/r/A7AYGW" target="_blank" rel="noopener noreferrer">Le recevoir →</a>
              </article>
            ))}
          </div>
          <div className="cta-band" style={{ marginTop: 48 }}>
            <div>
              <h3>Le pack complet — les 10 kits</h3>
              <p>Toute la collection Sans Honte, en un seul envoi. On t'écrit pour la suite.</p>
            </div>
            <a className="action-btn" href="https://tally.so/r/A7AYGW" target="_blank" rel="noopener noreferrer">Demander le pack</a>
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
            <a className="action-btn" href="https://tally.so/r/A7AYGW" target="_blank" rel="noopener noreferrer">S'inscrire</a>
          </div>
        </div>
      </section>
    </>
  );
}
