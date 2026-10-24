import { createFileRoute } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/prix")({
  head: () => createSeoHead({
    title: "Prix HP — kits 5 $, livres 10 à 15 $, ateliers 120 $/150 $, aucune taxe ajoutée",
    description: "Tous les prix HP au même endroit : kits Sans Honte 5 $, lot de 10 kits 40 $, livres PDF 10 à 15 $, ateliers 120 $/150 $. Petit fournisseur : aucune taxe ajoutée.",
    path: "/prix",
  }),
  component: Page,
});

const ROWS: Array<{ cat: string; offre: string; prix: string; href: string; label: string }> = [
  { cat: "PDF", offre: "Enjeux de l’humanité à l’ère de l’IA (PDF)", prix: "15 $ CAD, aucune taxe ajoutée", href: "/achat/enjeux-humanite", label: "Acheter le PDF" },
  { cat: "Guide", offre: "La faim justifie les moyens (PDF)", prix: "10 $ CAD, aucune taxe ajoutée", href: "/achat/faim-justifie-les-moyens", label: "Acheter le PDF" },
  { cat: "PDF", offre: "Horizon Québec (PDF)", prix: "10 $ CAD, aucune taxe ajoutée", href: "/achat/horizon-quebec", label: "Acheter le PDF" },
  { cat: "PDF", offre: "Les enfants cuisinent pour faire plaisir (PDF)", prix: "10 $ CAD, aucune taxe ajoutée", href: "/achat/enfants-cuisinent", label: "Voir la fiche" },
  { cat: "Sans Honte", offre: "Kits Sans Honte — 15 titres au choix, un par un (Frigo, Papiers, Fraude, Tenir Debout, Seconde Main, Entraide…)", prix: "5 $ CAD le kit, aucune taxe ajoutée", href: "/sans-honte", label: "Voir les 15 kits" },
  { cat: "Sans Honte", offre: "Bundle Sans Honte — Choisis 10 kits parmi 15", prix: "40 $ CAD, aucune taxe ajoutée", href: "/achat/sans-honte-collection", label: "Acheter la collection PDF" },
  { cat: "Outils", offre: "Outils web HP — la Boîte à outils (8 outils), En cuisine, le Passeur de savoir et 4 outils rapides, gratuits, sans compte", prix: "Gratuit", href: "/outils", label: "Voir les outils" },
  { cat: "Atelier", offre: "IA, cuisine ou jeunesse — forfait groupe", prix: "120 $ CAD, aucune taxe ajoutée", href: "/ateliers", label: "Voir les ateliers" },
  { cat: "Atelier", offre: "Manger mieux avec moins — forfait groupe", prix: "150 $ CAD, aucune taxe ajoutée", href: "/ateliers", label: "Voir l'atelier" },
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
      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Découvre aussi</span>
          <h2>Et le <em>gratuit</em> ?</h2>
          <p className="strip-intro">
            Avant de payer quoi que ce soit, le gratuit d'HP vaut le détour :{" "}
            <a href="/jeux">35 jeux gratuits, sans inscription</a>, et{" "}
            <a href="/balado">Futur simple, le balado sur l'IA</a> — un épisode par semaine, gratuit lui aussi.
          </p>
        </div>
      </section>
    </>
  );
}
