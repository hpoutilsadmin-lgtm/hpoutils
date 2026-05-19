import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/livres-pdf")({
  head: () => ({
    meta: [
      { title: "Livres & PDF — Bibliothèque HP" },
      { name: "description", content: "Livres, PDF, guides et collections HP — à lire, télécharger et garder près de soi." },
      { property: "og:title", content: "Livres & PDF — HP" },
      { property: "og:description", content: "La bibliothèque HP : livres, PDF, guides et collections." },
      { property: "og:image", content: "/images/cover-enjeux.jpg" },
    ],
  }),
  component: Page,
});

const ITEMS: Array<{
  cover: string;
  title: string;
  desc: string;
  tag: string;
  slug: string;
  price: string;
}> = [
  { cover: "/images/cover-enjeux.jpg", title: "Les enjeux de l'humanité", desc: "Voir clair sur ce qui se joue, sans paniquer ni minimiser.", tag: "PDF", slug: "enjeux-humanite", price: "10 $" },
  { cover: "/images/cover-faim.jpg", title: "La faim justifie les moyens", desc: "Manger mieux avec moins, sans se faire la morale.", tag: "PDF", slug: "faim-justifie-les-moyens", price: "10 $" },
  { cover: "/images/cover-enfants.jpg", title: "Les enfants cuisinent pour faire plaisir", desc: "Un projet doux pour transmettre le plaisir, pas la performance.", tag: "PDF", slug: "enfants-cuisinent", price: "15 $" },
  { cover: "/images/sans-honte/kit-03.jpg", title: "Kit Sans Honte — Frigo", desc: "Repères concrets pour manger sans se juger.", tag: "PDF", slug: "sans-honte-frigo", price: "10 $" },
  { cover: "/images/sans-honte/kit-04.jpg", title: "Tenir Debout Sans Honte", desc: "Quand la journée tient sur un fil — un kit court.", tag: "PDF", slug: "sans-honte-tenir-debout", price: "10 $" },
  { cover: "/images/sans-honte/collection-cover.png", title: "Collection Sans Honte — 10 kits", desc: "Papiers, Frigo, Tenir Debout, Seconde Main, Entraide… la collection complète.", tag: "Collection", slug: "sans-honte-collection", price: "60 $" },
];

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Bibliothèque HP</span>
          <h1>Livres &amp; <em>PDF</em>.</h1>
          <p className="lead">
            Des formats qui se gardent, se prêtent, se relisent. Pour avoir
            quelque chose de solide à la main quand le reste va trop vite.
          </p>
        </div>
      </section>
      <section className="subpage-content">
        <div className="container">
          <div className="library-grid">
            {ITEMS.map((b) => {
              return (
              <article key={b.title} className="library-item">
                <div className="library-cover cover-contain">
                  <img src={b.cover} alt={`Couverture ${b.title}`} loading="lazy" />
                </div>
                <div className="library-meta"><span className="dot" />{b.tag}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
                <a className="lib-link" href={`/achat/${b.slug}`}>
                  Acheter le PDF — {b.price} →
                </a>
              </article>
            );})}
          </div>
        </div>
      </section>
    </>
  );
}
