import { createFileRoute } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";
import { Fragment } from "react";
import { AjouterAuPanier } from "@/components/AjouterAuPanier";

export const Route = createFileRoute("/prix")({
  head: () => createSeoHead({
    title: "Prix HP — kits, livres, ateliers, sans taxe ajoutée",
    description: "Tous les prix HP au même endroit : kits Sans Honte 5 $, lot de 10 kits 40 $, livres PDF 10 à 15 $, mini-cahier 10 $, tomes 5 à 8 $, ateliers 150 $ à 290 $. Petit fournisseur : aucune taxe ajoutée.",
    path: "/prix",
  }),
  component: Page,
});

type Row = { cat: string; offre: string; prix: string; href?: string; label?: string; panier?: string };

const ROWS: Row[] = [
  { cat: "PDF", offre: "La faim justifie les moyens (PDF)", prix: "10 $ CAD, aucune taxe ajoutée", href: "/achat/faim-justifie-les-moyens", label: "Acheter le PDF", panier: "faim_justifie_pdf_10" },
  { cat: "PDF", offre: "Horizon Québec (PDF)", prix: "10 $ CAD, aucune taxe ajoutée", href: "/achat/horizon-quebec", label: "Acheter le PDF", panier: "horizon_quebec_pdf_10" },
  { cat: "PDF", offre: "Enjeux de l’humanité à l’ère de l’IA (PDF)", prix: "15 $ CAD, aucune taxe ajoutée", href: "/achat/enjeux-humanite", label: "Acheter le PDF", panier: "enjeux_humanite_pdf_15" },
  { cat: "PDF", offre: "Les enfants cuisinent pour faire plaisir (PDF)", prix: "10 $ CAD, aucune taxe ajoutée", href: "/pdf/enfants-cuisinent", label: "Voir la fiche" },
  { cat: "PDF", offre: "Un petit pas à la fois — le mini cahier (PDF)", prix: "10 $ CAD, aucune taxe ajoutée", href: "/achat/mini-cahier-hyper-potentiel", label: "Acheter le PDF", panier: "hp_hyper_potentiel_cahier_pdf_10" },
  { cat: "Sans Honte", offre: "Kits Sans Honte — 15 titres au choix, un par un (Frigo, Papiers, Fraude, Tenir Debout, Seconde Main, Entraide…)", prix: "5 $ CAD le kit, aucune taxe ajoutée", href: "/sans-honte", label: "Voir les 15 kits" },
  { cat: "Sans Honte", offre: "Bundle Sans Honte — Choisis 10 kits parmi 15", prix: "40 $ CAD (économie de 10 $ : 50 $ séparément), aucune taxe ajoutée", href: "/achat/sans-honte-collection", label: "Acheter la collection PDF" },
  { cat: "À toi l’histoire", offre: "Tomes « À toi l’histoire » — tome 1 gratuit, standards 5 $, grands 8 $, bundle 3 tomes 12 $", prix: "Gratuit, 5 $ ou 8 $ selon le tome ; bundle 12 $, aucune taxe ajoutée", href: "/lire", label: "Voir les tomes" },
  { cat: "Crée ton histoire", offre: "Crée TON histoire — créateur d’histoire personnalisée (ce n’est pas la série « À toi l’histoire ») : un prénom, 1 thème parmi 4, 2, 3 ou 4 fins — Bientôt, vente pas encore ouverte", prix: "Prix prévu : 5 $ CAD, aucune taxe ajoutée", href: "/cree-ton-histoire-a-toi", label: "Voir la fiche (Bientôt)" },
  { cat: "Passeurs", offre: "Passeurs de savoirs — inscription ouverte", prix: "3 $/mois · 28 $/an, aucune taxe ajoutée", href: "/les-passeurs", label: "S'inscrire" },
  { cat: "Atelier", offre: "Ateliers — forfaits groupe", prix: "150 $ à 290 $ CAD selon l’atelier, aucune taxe ajoutée", href: "/ateliers", label: "Voir les ateliers" },
  { cat: "Jeu", offre: "Ton jeu à toi, en 30 secondes — jeu de course personnalisé (prénom + thème), aperçu gratuit jouable (Bientôt — prix prévu, aucun achat possible pour l'instant)", prix: "Prix prévu : 5 $ CAD, aucune taxe ajoutée", href: "/ton-jeu-a-toi", label: "Essayer l'aperçu gratuit" },
  { cat: "Jeu sur mesure", offre: "Jeux à votre image — un jeu aux couleurs de votre commerce (Express 29 $, Événement 199 $, Saisonnier 299 $, Permanent 399 $, hébergement gratuit l’année 1 puis 29 $/an, aucune taxe ajoutée — paiement seulement après votre oui explicite, voir la page de l’offre)", prix: "29 $ à 399 $ CAD selon le niveau, aucune taxe ajoutée", href: "/jeux-a-votre-image", label: "Voir l’offre" },
  { cat: "Outils", offre: "Outils web HP — la Boîte à outils (8 outils), En cuisine, le Passeur de savoir et 3 outils rapides, gratuits, sans compte", prix: "Gratuit", href: "/outils", label: "Voir les outils" },
  { cat: "Cuisine", offre: "« Votre cuisine familiale, à vous » — l’outil cuisine de la famille : vos recettes, portions recalculées, liste d’épicerie combinée — Bientôt, vente pas encore ouverte", prix: "Prix prévu : 5 $ CAD, aucune taxe ajoutée", href: "/cuisine-familiale", label: "Voir la fiche (Bientôt)" },
];

const BLOCS = [
  { titre: "Livres PDF", lignes: ROWS.slice(0, 5) },
  { titre: "Kits et histoires", lignes: ROWS.slice(5, 9) },
  { titre: "Passeurs et ateliers", lignes: ROWS.slice(9, 11) },
  { titre: "Jeux", lignes: ROWS.slice(11, 14) },
  { titre: "Cuisine et outils gratuits", lignes: ROWS.slice(14) },
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
          <p style={{ fontSize: 16, marginBottom: 12 }}>Acheter = vous payez sur la page suivante. Voir = vous regardez d'abord, sans payer. Ajouter au panier = vous regroupez avant de payer.</p>
      <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Catégorie</th><th>Offre</th><th>Prix</th><th>Action</th></tr>
              </thead>
              <tbody>
                {BLOCS.map((b) => (
                  <Fragment key={b.titre}>
                    <tr>
                      <td colSpan={4}><strong>{b.titre}</strong></td>
                    </tr>
                    {b.lignes.map((r) => (
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
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ maxWidth: 760, lineHeight: 1.65, marginTop: 16 }}>
            Bundle Sans Honte — Choisissez 10 kits parmi 15, 40 $, aucune taxe ajoutée. Vous choisissez vos 10 kits, vous payez, vous recevez 10 liens de téléchargement, un par kit choisi, par courriel — chaque kit se télécharge séparément, comme les kits seuls à 5 $. Vous recevez : les 10 kits choisis, en PDF, à télécharger sur votre appareil. Durée : vos liens restent récupérables par « Récupérer un achat », avec votre courriel. Si ça ne marche pas : écrivez à la direction humaine, un humain vous répond sous 3 jours ouvrables. Si vous changez d'idée après paiement : les produits numériques ne sont pas remboursables, sauf en cas de panne technique — écrivez-nous, on regarde votre cas un par un.
          </p>
        </div>
      </section>
      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Découvrez aussi</span>
          <h2>Et le <em>gratuit</em> ?</h2>
          <p className="strip-intro">
            Avant de payer quoi que ce soit, le gratuit d'HP vaut le détour :{" "}
            <a href="/jeux">36 + 1 caché jeux gratuits, sans inscription</a>, et{" "}
            <a href="/balado">Futur simple, le balado sur l'IA</a> — de nouveaux épisodes quand ils sont prêts, gratuit lui aussi.
          </p>
        </div>
      </section>
    </>
  );
}
