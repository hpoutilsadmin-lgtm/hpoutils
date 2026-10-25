import { createFileRoute } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";
import { AjouterAuPanier } from "@/components/AjouterAuPanier";

export const Route = createFileRoute("/prix")({
  head: () => createSeoHead({
    title: "Prix HP — kits 5 $, livres 10 à 15 $, ateliers 120 $/150 $, aucune taxe ajoutée",
    description: "Tous les prix HP au même endroit : kits Sans Honte 5 $, lot de 10 kits 40 $, livres PDF 10 à 15 $, mini-cahier 10 $, tomes 5 à 8 $, ateliers 120 $/150 $. Petit fournisseur : aucune taxe ajoutée.",
    path: "/prix",
  }),
  component: Page,
});

type Row = { cat: string; offre: string; prix: string; href?: string; label?: string; panier?: string };

const ROWS: Row[] = [
  { cat: "PDF", offre: "La faim justifie les moyens (PDF)", prix: "10 $ CAD, aucune taxe ajoutée", href: "/achat/faim-justifie-les-moyens", label: "Acheter le PDF", panier: "faim_justifie_pdf_10" },
  { cat: "PDF", offre: "Horizon Québec (PDF)", prix: "10 $ CAD, aucune taxe ajoutée", href: "/achat/horizon-quebec", label: "Acheter le PDF", panier: "horizon_quebec_pdf_10" },
  { cat: "PDF", offre: "Enjeux de l’humanité à l’ère de l’IA (PDF)", prix: "15 $ CAD, aucune taxe ajoutée", href: "/achat/enjeux-humanite", label: "Acheter le PDF", panier: "enjeux_humanite_pdf_15" },
  { cat: "PDF", offre: "Les enfants cuisinent pour faire plaisir (PDF)", prix: "10 $ CAD, aucune taxe ajoutée", href: "/pdf/enfants-cuisinent", label: "Acheter le PDF", panier: "enfants_cuisinent_pdf_10" },
  { cat: "PDF", offre: "Un petit pas à la fois — le mini cahier (PDF)", prix: "10 $ CAD, aucune taxe ajoutée", href: "/achat/mini-cahier-hyper-potentiel", label: "Acheter le PDF", panier: "hp_hyper_potentiel_cahier_pdf_10" },
  { cat: "Sans Honte", offre: "Kits Sans Honte — 15 titres au choix, un par un (Frigo, Papiers, Fraude, Tenir Debout, Seconde Main, Entraide…)", prix: "5 $ CAD le kit, aucune taxe ajoutée", href: "/sans-honte", label: "Voir les 15 kits" },
  { cat: "Sans Honte", offre: "Bundle Sans Honte — Choisis 10 kits parmi 15", prix: "40 $ CAD (économie de 10 $ : 50 $ séparément), aucune taxe ajoutée", href: "/achat/sans-honte-collection", label: "Acheter la collection PDF" },
  { cat: "À toi l’histoire", offre: "Tomes « À toi l’histoire » — tome 1 gratuit, standards 5 $, grands 8 $, bundle 3 tomes 12 $ (mode TEST — aucune vente réelle)", prix: "Gratuit, 5 $ ou 8 $ selon le tome ; bundle 12 $, aucune taxe ajoutée", href: "/lire", label: "Voir /lire/ (mode test)" },
  { cat: "Passeurs", offre: "Passeurs de savoirs — inscription ouverte", prix: "3 $/mois · 28 $/an, aucune taxe ajoutée", href: "/les-passeurs", label: "S'inscrire" },
  { cat: "Atelier", offre: "Ateliers — forfaits groupe", prix: "120 $ ou 150 $ CAD selon l’atelier, aucune taxe ajoutée", href: "/ateliers", label: "Voir les ateliers" },
  { cat: "Jeu", offre: "Chevalier du fleuve — gemmes du jeu (boutique dédiée, hors panier — bientôt en vente, aucun paiement pris pour l'instant)", prix: "2,99 $ à 19,99 $ CAD, aucune taxe ajoutée", href: "/boutique-chevalier", label: "Voir la boutique" },
  { cat: "Cadeaux", offre: "Bons cadeaux — un code personnel à offrir, applicable au panier", prix: "5 $ à 100 $ CAD, aucune taxe ajoutée", href: "/cadeaux", label: "Offrir un bon" },
  { cat: "Outils", offre: "Outils web HP — la Boîte à outils (8 outils), En cuisine, le Passeur de savoir et 4 outils rapides, gratuits, sans compte", prix: "Gratuit", href: "/outils", label: "Voir les outils" },
];

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Tarifs HP</span>
          <h1>Des prix <em>clairs</em>, partout pareils.</h1>
          <p className="lead">
            Les prix sont les mêmes partout : sur le site, les visuels
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
                {ROWS.map((r) => (
                  <tr key={`${r.cat}-${r.offre}`}>
                    <td>{r.cat}</td><td>{r.offre}</td><td>{r.prix}</td>
                    <td>
                      {r.href ? (
                        <a href={r.href}>{r.label}</a>
                      ) : (
                        <span>Pas encore en vente</span>
                      )}
                      {r.panier ? (
                        <>
                          {" "}
                          <AjouterAuPanier priceId={r.panier} />
                        </>
                      ) : null}
                    </td>
                  </tr>
                ))}
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
