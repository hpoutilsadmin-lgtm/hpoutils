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
  { cat: "PDF", offre: "Enjeux de l’humanité à l’ère de l’IA (PDF)", prix: "15 $ CAD, aucune taxe ajoutée", href: "/achat/enjeux-humanite", label: "Acheter le PDF" },
  { cat: "Guide", offre: "La faim justifie les moyens (PDF)", prix: "10 $ CAD, aucune taxe ajoutée", href: "/achat/faim-justifie-les-moyens", label: "Acheter le PDF" },
  { cat: "PDF", offre: "Les enfants cuisinent pour faire plaisir (PDF)", prix: "20 $ CAD, aucune taxe ajoutée", href: "/achat/enfants-cuisinent", label: "Acheter le PDF" },
  { cat: "Sans Honte", offre: "1 kit PDF (Frigo, Papiers, Fraude…)", prix: "10 $ CAD, aucune taxe ajoutée", href: "/sans-honte", label: "Voir les kits" },
  { cat: "Sans Honte", offre: "Collection complète — 10 kits PDF", prix: "60 $ CAD, aucune taxe ajoutée", href: "/achat/sans-honte-collection", label: "Acheter la collection PDF" },
  { cat: "Outils", offre: "Fiches et outils pratiques", prix: "5 $ à 20 $", href: "https://tally.so/r/A7AYGW", label: "Demander" },
  { cat: "Sans Honte", offre: "1 kit broché", prix: "20 $", href: "https://tally.so/r/A7AYGW", label: "Commander" },
  { cat: "Sans Honte", offre: "Pack 4 kits plastifiés et clippés", prix: "60 $", href: "https://tally.so/r/A7AYGW", label: "Commander" },
  { cat: "Atelier", offre: "Les enfants cuisinent — 90 min", prix: "Dès 250 $", href: "/ateliers", label: "Voir l'atelier" },
  { cat: "Atelier", offre: "Hygiène & salubrité (sensibilisation) — 60 à 90 min", prix: "Dès 225 $", href: "/ateliers", label: "Voir l'atelier" },
  { cat: "Atelier", offre: "Survie alimentaire — 90 min", prix: "Dès 250 $", href: "/ateliers", label: "Voir l'atelier" },
  { cat: "Atelier", offre: "Marché du travail — De la cuisine à… — 60 à 90 min", prix: "Dès 225 $", href: "/ateliers", label: "Voir l'atelier" },
  { cat: "Atelier", offre: "Fais ton smoothie — 60 min", prix: "Dès 200 $ + ingrédients", href: "/ateliers", label: "Voir l'atelier" },
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