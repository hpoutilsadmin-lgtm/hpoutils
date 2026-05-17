import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/outils")({
  head: () => ({
    meta: [
      { title: "Outils — Le cœur du projet HP" },
      { name: "description", content: "PDF téléchargeables, exercices guidés, guides pratiques, questionnaires et mini-outils de réflexion pour la vraie vie." },
      { property: "og:title", content: "Outils — HP" },
      { property: "og:description", content: "Des outils numériques simples pour mettre des mots, faire le tri et avancer." },
    ],
  }),
  component: Page,
});

type Tool = { title: string; desc: string; tag: string; cta?: string; href?: string };

const SECTIONS: { title: string; intro: string; items: Tool[] }[] = [
  {
    title: "PDF téléchargeables",
    intro: "Des documents prêts à imprimer, à coller au frigo ou à garder dans son téléphone.",
    items: [
      { title: "Pages à arracher", desc: "Une page, une idée. À sortir du PDF quand tu en as besoin.", tag: "PDF" },
      { title: "Kit Sans Honte — Frigo", desc: "Repères concrets pour manger sans se juger.", tag: "PDF" },
      { title: "Guide rapide Tenir Debout", desc: "Quand la journée tient sur un fil.", tag: "PDF" },
    ],
  },
  {
    title: "Exercices guidés",
    intro: "Pour mettre des mots, faire le tri, sortir du brouillard.",
    items: [
      { title: "Le tri du jour", desc: "10 minutes pour séparer ce qui est à toi de ce qui ne l'est pas.", tag: "Exercice" },
      { title: "La carte de la honte", desc: "Nommer ce qu'on cache, doucement.", tag: "Exercice" },
      { title: "Le filtre IA", desc: "Avant d'utiliser l'IA, se poser trois questions.", tag: "Exercice" },
    ],
  },
  {
    title: "Guides pratiques",
    intro: "Des pas-à-pas humains, pas des recettes magiques.",
    items: [
      { title: "Cuisiner avec ce qu'on a", desc: "Méthode simple pour éviter le gaspillage et nourrir vrai.", tag: "Guide" },
      { title: "Parler à un ado qui ne parle plus", desc: "Repères pour ne pas tout casser.", tag: "Guide" },
      { title: "Sortir d'une boucle perfectionniste", desc: "Des sorties d'urgence, pas des solutions.", tag: "Guide" },
    ],
  },
  {
    title: "Questionnaires / formulaires",
    intro: "Pour se situer, sans note ni jugement.",
    items: [
      { title: "Où j'en suis cette semaine ?", desc: "12 questions courtes pour faire le point.", tag: "Formulaire", href: "https://tally.so/r/A7AYGW" },
      { title: "Mon rapport à la performance", desc: "Voir où ça serre, où ça respire.", tag: "Formulaire", href: "https://tally.so/r/A7AYGW" },
      { title: "Demander un atelier sur mesure", desc: "Pour les groupes et organismes.", tag: "Formulaire", href: "https://tally.so/r/Pd8YeV" },
    ],
  },
  {
    title: "Mini-outils de réflexion",
    intro: "Des petits formats qui tiennent dans la poche.",
    items: [
      { title: "3 phrases pour aujourd'hui", desc: "Choisir ce qu'on porte, et ce qu'on laisse tomber.", tag: "Mini-outil" },
      { title: "Outil ou piège ?", desc: "Tester un outil numérique avant qu'il te teste.", tag: "Mini-outil" },
      { title: "La phrase qu'on ne dit pas", desc: "Sortir une chose, en sécurité.", tag: "Mini-outil" },
    ],
  },
];

function Page() {
  return (
    <>
      <section className="editorial-hero">
        <div className="container">
          <span className="editorial-kicker">Outils HP</span>
          <h1>Le <em>cœur</em> du projet.</h1>
          <p className="lead">
            Des outils numériques simples pour mettre des mots sur ce qu'on vit,
            faire le tri, et avancer sans se perdre dans la perfection.
          </p>
          <div className="lead-actions">
            <Link to="/livres-pdf" className="btn-primary">Voir les livres &amp; PDF</Link>
            <Link to="/sans-honte" className="btn-ghost">Collection Sans Honte</Link>
          </div>
        </div>
      </section>

      {SECTIONS.map((s) => (
        <section key={s.title} className="tool-section">
          <div className="container">
            <header className="tool-section-head">
              <h2>{s.title}</h2>
              <p>{s.intro}</p>
            </header>
            <div className="tool-grid">
              {s.items.map((t) => (
                <article key={t.title} className="tool-card">
                  <span className="tool-tag">{t.tag}</span>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                  {t.href ? (
                    <a href={t.href} target="_blank" rel="noopener noreferrer">{t.cta ?? "Ouvrir"} →</a>
                  ) : (
                    <Link to="/livres-pdf">{t.cta ?? "Découvrir"} →</Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
