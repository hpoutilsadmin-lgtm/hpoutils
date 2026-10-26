import { createFileRoute, Link } from "@tanstack/react-router";
import { PdfCover } from "@/components/PdfCover";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/livres-pdf")({
  head: () => createSeoHead({
    title: "Livres et kits PDF du Québec dès 5 $ | HP Outils",
    description: "21 PDF à télécharger : les 15 kits Sans Honte à 5 $, des livres de cuisine, d'organisation et de réflexion de 10 à 15 $. Aucune taxe ajoutée, téléchargement immédiat.",
    path: "/livres-pdf",
  }),
  component: Page,
});

type Kind = "PDF" | "Kit PDF" | "Collection PDF";

const ITEMS: Array<{
  cover?: string;
  title: string;
  desc: string;
  tag: Kind;
  slug: string;
  price: string;
}> = [
  { cover: "/images/cover-enjeux.jpg", title: "Enjeux de l'humanité à l'ère de l'IA", desc: "Voir clair sur ce qui se joue, sans paniquer ni minimiser.", tag: "PDF", slug: "enjeux-humanite", price: "15 $" },
  { cover: "/images/cover-faim.jpg", title: "La faim justifie les moyens", desc: "Mieux manger avec peu : repères simples, recettes accessibles et réflexes anti-gaspillage.", tag: "PDF", slug: "faim-justifie-les-moyens", price: "10 $" },
  { cover: "/images/cover-horizon-quebec.jpg", title: "Horizon Québec", desc: "Une nouvelle québécoise sur l'amitié, la langue, le Québec et ce qu'on essaie encore de tenir ensemble quand le monde change trop vite.", tag: "PDF", slug: "horizon-quebec", price: "10 $" },
  { cover: "/images/cover-enfants.jpg", title: "Les enfants cuisinent pour faire plaisir", desc: "Un projet doux pour transmettre le plaisir, pas la performance.", tag: "PDF", slug: "enfants-cuisinent", price: "10 $" },
  { cover: "/images/cover-hyper-potentiel.jpg", title: "Un petit pas à la fois — le mini cahier", desc: "20 pages d'exercices à imprimer : ikigaï, respiration, méditation, mouvement, buts. Des pratiques simples, à essayer une à la fois.", tag: "PDF", slug: "mini-cahier-hyper-potentiel", price: "10 $" },
  { cover: "/images/sans-honte/kit-01.jpg", title: "Kit Sans Honte — Papiers", desc: "24 fiches pour trier, classer et reprendre le contrôle de ses papiers — courrier, factures, démarches — sans tout régler en une seule journée.", tag: "Kit PDF", slug: "sans-honte-papiers", price: "5 $" },
  { cover: "/images/sans-honte/kit-02.jpg", title: "Kit Sans Honte — Me Reconnaître", desc: "Se retrouver quand on s'est perdu·e de vue : reconnaître sa façon de fonctionner et adapter sa journée à son énergie, sans se comparer.", tag: "Kit PDF", slug: "sans-honte-me-reconnaitre", price: "5 $" },
  { cover: "/images/sans-honte/kit-03.jpg", title: "Kit Sans Honte — Frigo", desc: "Reprendre le contrôle de son frigo : une méthode pour bâtir un repas avec ce qu'on a déjà, sauver ce qui fatigue et comprendre les dates sans paniquer.", tag: "Kit PDF", slug: "sans-honte-frigo", price: "5 $" },
  { cover: "/images/sans-honte/kit-04.jpg", title: "Kit Sans Honte — Tenir Debout", desc: "Quand les tâches ordinaires semblent trop lourdes : choisir l'essentiel, avancer par petites étapes et garder des repères simples, sans se juger.", tag: "Kit PDF", slug: "sans-honte-tenir-debout", price: "5 $" },
  { cover: "/images/sans-honte/kit-05.jpg", title: "Kit Sans Honte — Seconde Main", desc: "S'habiller, se meubler et s'équiper en seconde main, par choix ou par nécessité : acheter, vendre, donner et récupérer, simplement et sans jugement.", tag: "Kit PDF", slug: "sans-honte-seconde-main", price: "5 $" },
  { cover: "/images/sans-honte/kit-06.jpg", title: "Kit Sans Honte — Entraide", desc: "Demander de l'aide sans s'excuser, en offrir sans s'épuiser : formuler un besoin, poser ses limites et créer une entraide respectueuse.", tag: "Kit PDF", slug: "sans-honte-entraide", price: "5 $" },
  { cover: "/images/sans-honte/kit-07.jpg", title: "Kit Sans Honte — Fraude", desc: "Reconnaître les arnaques courantes et savoir quoi faire devant un message suspect : vérifier, réagir et protéger ses renseignements, sans avoir honte d'avoir douté.", tag: "Kit PDF", slug: "sans-honte-fraude", price: "5 $" },
  { cover: "/images/sans-honte/kit-08.jpg", title: "Kit Sans Honte — Logement", desc: "Garder, retrouver ou mieux organiser un chez-soi : des repères concrets pour préparer ses démarches, comprendre sa situation et savoir vers qui se tourner.", tag: "Kit PDF", slug: "sans-honte-logement", price: "5 $" },
  { cover: "/images/sans-honte/kit-09.jpg", title: "Kit Sans Honte — Proche Aidant", desc: "Soutenir un proche sans s'oublier : nommer ce qui pèse, organiser l'aide autour de soi et garder une place pour ses propres besoins.", tag: "Kit PDF", slug: "sans-honte-proche-aidant", price: "5 $" },
  { cover: "/images/sans-honte/kit-10.jpg", title: "Kit Sans Honte — 72 Heures", desc: "Se préparer aux 72 premières heures d'une urgence : vérifier les besoins essentiels, rassembler le matériel et établir un plan réaliste, avant que ça arrive.", tag: "Kit PDF", slug: "sans-honte-72-heures", price: "5 $" },
  { cover: "/images/sans-honte/kit-11.jpg", title: "Kit Sans Honte — Testament — L'olographe, pas à pas", desc: "Un testament olographe au Québec, écrit à la main et signé : ce que c'est, les erreurs qui le rendent invalide et l'ordre à suivre, fiche par fiche.", tag: "Kit PDF", slug: "sans-honte-testament", price: "5 $" },
  { cover: "/images/sans-honte/kit-12.jpg", title: "Kit Sans Honte — Papiers de mes parents", desc: "Organiser les papiers de ses parents sans braquer personne : la conversation, l'inventaire, les comptes, les assurances, le testament, le mandat et le classeur, fiche par fiche.", tag: "Kit PDF", slug: "sans-honte-papiers-parents", price: "5 $" },
  { cover: "/images/sans-honte/kit-13.jpg", title: "Kit Sans Honte — Chalet — Les règles qui sauvent les Noëls", desc: "Les règles d'un chalet partagé, écrites quand tout va bien : qui paie quoi, qui décide, le calendrier, les invités, les réparations et la clause de sortie.", tag: "Kit PDF", slug: "sans-honte-chalet", price: "5 $" },
  { cover: "/images/sans-honte/kit-14.jpg", title: "Kit Sans Honte — L'année québécoise", desc: "L'année québécoise mois par mois : impôts, REER, pneus, rentrée et Fêtes — plus les rendez-vous annuels qu'on oublie toujours, de la SAAQ aux assurances.", tag: "Kit PDF", slug: "sans-honte-annee-quebecoise", price: "5 $" },
  { cover: "/images/sans-honte/kit-15.jpg", title: "Kit Sans Honte — Héritage numérique", desc: "Préparer la transmission de sa vie en ligne : l'inventaire des comptes, le coffre à mots de passe, les photos, les abonnements et la personne de confiance.", tag: "Kit PDF", slug: "sans-honte-heritage-numerique", price: "5 $" },
  { cover: "/images/sans-honte/collection-cover.png", title: "Collection Sans Honte — Choisis 10 kits parmi 15", desc: "Papiers, Frigo, Tenir Debout, Seconde Main, Entraide… choisis 10 kits parmi les 15.", tag: "Collection PDF", slug: "sans-honte-collection", price: "40 $" },
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
          <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.55, marginTop: 14, maxWidth: 700 }}>« J'ai jamais su qui j'étais ni ce que j'aimais. Alors je fais un peu de tout — et j'en ai aussi fait des livres pour la vraie vie. »</p>
        </div>
      </section>
      <section id="sec-livres" className="subpage-content">
        <div className="container">
          <div className="library-grid">
            {ITEMS.map((b) => {
              return (
              <article key={b.title} className="library-item">
                {b.cover && <PdfCover src={b.cover} alt={`Couverture ${b.title}`} />}
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
      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Découvre aussi</span>
          <h2 className="section-title">Le gratuit, <em>juste à côté</em></h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>En cuisine — gratuit</h3>
              <p>Le pendant libre des livres de recettes : 629 recettes gratuites, un convertisseur et des idées pour les petits budgets.</p>
              <a className="pillar-cta" href="/en-cuisine/">Ouvrir En cuisine →</a>
            </article>
            <article className="pillar-card">
              <h3>Les jeux gratuits</h3>
              <p>Une pause entre deux lectures : 36 jeux gratuits, jouables dans votre navigateur, sans inscription.</p>
              <Link className="pillar-cta" to="/jeux">Jouer →</Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
