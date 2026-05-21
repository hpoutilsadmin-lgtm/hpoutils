import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/prix")({
  head: () => ({
    meta: [
      { title: "Prix — HP" },
      { name: "description", content: "Tarifs officiels des livres, outils, kits et ateliers HP." },
      { property: "og:title", content: "Prix — HP" },
      { property: "og:description", content: "Tarifs officiels HP." },
    ],
  }),
  component: Page,
});

const ROWS: Array<{ cat: string; offre: string; prix: string; href: string; label: string }> = [
  { cat: "Livre", offre: "Les enjeux de l’humanité (PDF)", prix: "10 $", href: "/achat/enjeux-humanite", label: "Acheter le PDF" },
  { cat: "Guide", offre: "La faim justifie les moyens (PDF)", prix: "10 $", href: "/achat/faim-justifie-les-moyens", label: "Acheter le PDF" },
  { cat: "Livre", offre: "Les enfants cuisinent pour faire plaisir (PDF)", prix: "15 $", href: "/achat/enfants-cuisinent", label: "Acheter le PDF" },
  { cat: "Sans Honte", offre: "1 kit PDF (Frigo, Papiers, Fraude…)", prix: "10 $", href: "/sans-honte", label: "Voir les kits" },
  { cat: "Sans Honte", offre: "Collection complète — 10 kits PDF", prix: "60 $", href: "/achat/sans-honte-collection", label: "Acheter la collection PDF" },
  { cat: "Outils", offre: "Fiches et outils pratiques", prix: "5 $ à 20 $", href: "https://tally.so/r/A7AYGW", label: "Demander" },
  { cat: "Sans Honte", offre: "1 kit broché", prix: "20 $", href: "https://tally.so/r/A7AYGW", label: "Commander" },
  { cat: "Sans Honte", offre: "Pack 4 kits plastifiés et clippés", prix: "60 $", href: "https://tally.so/r/A7AYGW", label: "Commander" },
  { cat: "Atelier", offre: "Livre et fiches", prix: "Gratuit / don 5 $", href: "https://tally.so/r/Pd8YeV", label: "Participer" },
  { cat: "Atelier", offre: "Réflexion IA", prix: "10 $", href: "https://tally.so/r/Pd8YeV", label: "Réserver" },
  { cat: "Atelier", offre: "IA / cuisine / jeunesse", prix: "120 $ à 180 $", href: "https://tally.so/r/Pd8YeV", label: "Demander" },
  { cat: "Atelier", offre: "Manger mieux avec moins", prix: "150 $ à 250 $", href: "https://tally.so/r/Pd8YeV", label: "Demander" },
];

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Tarifs HP</span>
          <h1>Des prix <em>clairs</em>, partout pareils.</h1>
          <p className="lead">
            Les prix doivent rester identiques sur le site, les visuels
            promotionnels et les formulaires.
          </p>
        </div>
      </section>
      <section className="three-pillars">
        <div className="container">
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Catégorie</th><th>Offre</th><th>Prix</th><th>Action</th></tr>
              </thead>
              <tbody>
                {ROWS.map((r) => {
                  const internal = r.href.startsWith("/");
                  return (
                  <tr key={`${r.cat}-${r.offre}`}>
                    <td>{r.cat}</td><td>{r.offre}</td><td>{r.prix}</td>
                    <td>
                      {internal ? (
                        <a href={r.href}>{r.label}</a>
                      ) : (
                        <a href={r.href} target="_blank" rel="noopener noreferrer">{r.label}</a>
                      )}
                    </td>
                  </tr>
                );})}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}