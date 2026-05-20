import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reflexions")({
  head: () => ({
    meta: [
      { title: "Réflexions — Le média HP" },
      { name: "description", content: "Capsules, textes courts et réflexions sur l'IA, l'humain imparfait, la honte, les pièges modernes et les outils qu'on utilise." },
      { property: "og:title", content: "Réflexions — HP" },
      { property: "og:description", content: "Textes courts et capsules pour penser sans se faire avaler." },
    ],
  }),
  component: Page,
});

const CATEGORIES = ["Tous", "IA", "Outil ou piège", "Humain imparfait", "Vie moderne", "Sans Honte", "PH"];

const POSTS = [
  { cat: "IA", title: "L'IA n'est pas ton ami — elle n'est pas ton ennemi non plus", desc: "Sortir du débat binaire pour regarder ce qu'elle fait vraiment dans nos vies." },
  { cat: "Outil ou piège", title: "Trois questions avant d'ouvrir une appli", desc: "Un filtre simple pour savoir si tu l'utilises, ou si elle t'utilise." },
  { cat: "Humain imparfait", title: "Le droit d'être un brouillon", desc: "On ne vit pas en version finale. Personne." },
  { cat: "Sans Honte", title: "Ce qu'on cache prend toute la place", desc: "Petit texte sur ce que la honte fait au corps et au temps." },
  { cat: "Vie moderne", title: "La productivité comme religion", desc: "Quand faire est devenu plus important qu'être." },
  { cat: "PH", title: "Aujourd'hui je ne sais pas", desc: "Une phrase courte. Rien d'autre." },
  { cat: "IA", title: "Écrire avec, pas à la place", desc: "Ce que change le \"avec\" dans la relation à l'IA." },
  { cat: "Outil ou piège", title: "Le calendrier qui te dirige", desc: "Quand l'outil prend le volant." },
  { cat: "Humain imparfait", title: "Réussir à moitié, c'est déjà réussir", desc: "Sortir de la dictature du tout-ou-rien." },
];

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Le média HP</span>
          <h1><em>Réflexions</em>.</h1>
          <p className="lead">
            Capsules, textes courts et réflexions sur l'IA, l'humain imparfait,
            la honte, les pièges modernes et les outils qu'on utilise.
          </p>
        </div>
      </section>

      <section className="subpage-content">
        <div className="container">
          <div className="reflex-filter" role="navigation" aria-label="Catégories">
            {CATEGORIES.map((c, i) => (
              <span key={c} className={i === 0 ? "on" : ""}>{c}</span>
            ))}
          </div>
          <div className="reflex-grid">
            {POSTS.map((p) => (
              <article key={p.title} className="reflex-card">
                <span className="reflex-cat">{p.cat}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="read" style={{ opacity: 0.55 }}>Bientôt disponible</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
