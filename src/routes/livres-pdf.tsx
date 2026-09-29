import { createFileRoute, Link } from "@tanstack/react-router";
import { PdfCover } from "@/components/PdfCover";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/livres-pdf")({
  head: () => createSeoHead({
    title: "PDF à télécharger : kits, guides et livres | HP — Québec",
    description: "15 PDF à télécharger : collection Sans Honte, cuisine, organisation, famille. Petits prix, aucune taxe ajoutée.",
    path: "/livres-pdf",
    imagePath: "/images/sans-honte/collection-cover.png",
  }),
  component: Page,
});

type Kind = "PDF" | "Kit PDF" | "Collection PDF";

const ITEMS: Array<{
  cover: string;
  title: string;
  desc: string;
  tag: Kind;
  slug: string;
  price: string;
}> = [
  { cover: "/images/cover-enjeux.jpg", title: "Enjeux de l'humanité à l'ère de l'IA", desc: "Voir clair sur ce qui se joue, sans paniquer ni minimiser.", tag: "PDF", slug: "enjeux-humanite", price: "15 $" },
  { cover: "/images/cover-faim.jpg", title: "La faim justifie les moyens", desc: "Mieux manger avec peu : repères simples, recettes accessibles et réflexes anti-gaspillage.", tag: "PDF", slug: "faim-justifie-les-moyens", price: "10 $" },
  { cover: "/images/cover-horizon-quebec.jpg", title: "Horizon Québec", desc: "Une nouvelle HP sur l'amitié, la langue, le Québec et ce qu'on essaie encore de tenir ensemble quand le monde change trop vite.", tag: "PDF", slug: "horizon-quebec", price: "10 $" },
  { cover: "/images/cover-enfants.jpg", title: "Les enfants cuisinent pour faire plaisir", desc: "Un projet doux pour transmettre le plaisir, pas la performance.", tag: "PDF", slug: "enfants-cuisinent", price: "20 $" },
  { cover: "/images/sans-honte/kit-01.jpg", title: "Kit Sans Honte — Papiers", desc: "24 fiches pour reprendre le contrôle de ses papiers.", tag: "Kit PDF", slug: "sans-honte-papiers", price: "10 $" },
  { cover: "/images/sans-honte/kit-02.jpg", title: "Kit Sans Honte — Me Reconnaître", desc: "Adapter sa journée à son cerveau, sans se juger.", tag: "Kit PDF", slug: "sans-honte-me-reconnaitre", price: "10 $" },
  { cover: "/images/sans-honte/kit-03.jpg", title: "Kit Sans Honte — Frigo", desc: "Repères concrets pour manger sans se juger.", tag: "Kit PDF", slug: "sans-honte-frigo", price: "10 $" },
  { cover: "/images/sans-honte/kit-04.jpg", title: "Tenir Debout Sans Honte", desc: "Quand la journée tient sur un fil — un kit court.", tag: "Kit PDF", slug: "sans-honte-tenir-debout", price: "10 $" },
  { cover: "/images/sans-honte/kit-05.jpg", title: "Kit Sans Honte — Seconde Main", desc: "S'équiper et consommer autrement, simplement.", tag: "Kit PDF", slug: "sans-honte-seconde-main", price: "10 $" },
  { cover: "/images/sans-honte/kit-06.jpg", title: "Kit Sans Honte — Entraide", desc: "Donner et recevoir de l'aide, sans honte.", tag: "Kit PDF", slug: "sans-honte-entraide", price: "10 $" },
  { cover: "/images/sans-honte/kit-07.jpg", title: "Kit Sans Honte — Fraude", desc: "Reconnaître, réagir, se protéger.", tag: "Kit PDF", slug: "sans-honte-fraude", price: "10 $" },
  { cover: "/images/sans-honte/kit-08.jpg", title: "Kit Sans Honte — Logement", desc: "Repères concrets autour du logement.", tag: "Kit PDF", slug: "sans-honte-logement", price: "10 $" },
  { cover: "/images/sans-honte/kit-09.jpg", title: "Kit Sans Honte — Proche Aidant", desc: "Tenir le rôle de proche aidant sans s'épuiser.", tag: "Kit PDF", slug: "sans-honte-proche-aidant", price: "10 $" },
  { cover: "/images/sans-honte/kit-10.jpg", title: "Kit Sans Honte — 72 Heures", desc: "Se préparer aux 72 premières heures d'une urgence.", tag: "Kit PDF", slug: "sans-honte-72-heures", price: "10 $" },
  { cover: "/images/sans-honte/collection-cover.png", title: "Collection Sans Honte — 10 kits", desc: "Papiers, Frigo, Tenir Debout, Seconde Main, Entraide… la collection complète.", tag: "Collection PDF", slug: "sans-honte-collection", price: "60 $" },
];

function discoverLabel(tag: Kind): string {
  if (tag === "Kit PDF") return "Découvrir le kit PDF";
  if (tag === "Collection PDF") return "Découvrir la collection PDF";
  return "Découvrir le PDF";
}

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Bibliothèque HP</span>
          <h1>Livres, PDF &amp; <em>réflexions</em>.</h1>
          <p className="lead">
             Des PDF, kits et livres concrets à télécharger pour la cuisine,
             l'organisation, la famille et les situations de la vraie vie.
          </p>
        </div>
      </section>
      <section className="subpage-content">
        <div className="container">
          <div className="library-grid">
            {ITEMS.map((b) => {
              return (
              <article key={b.title} className="library-item">
                <PdfCover src={b.cover} alt={`Couverture ${b.title}`} />
                <div className="library-meta"><span className="dot" />{b.tag} — {b.price} CAD, aucune taxe ajoutée</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
                <Link className="lib-link" to="/pdf/$slug" params={{ slug: b.slug }}>
                  {discoverLabel(b.tag)} →
                </Link>
              </article>
            );})}
          </div>
        </div>
      </section>
    </>
  );
}
