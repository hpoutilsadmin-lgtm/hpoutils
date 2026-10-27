import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

/* /jeux-a-votre-image — la page commerciale « Jeux à votre image ».
   Vitrine de l'offre B2B : un petit jeu simple, aux couleurs et au nom
   d'un commerce, que ses clients jouent, partagent et retiennent.
   Révision du 25 oct. 2026 (« Applique tout », go d'Hugo) : 7 sections,
   moitié moins de mots, prix en haut, échelle en tableau compact.
   Chaque affirmation vient des documents approuvés (offre, plan, guide
   du 24 oct. 2026) : aucun chiffre non sourcé, aucune promesse, aucun
   faux témoignage, aucun jeu livré inventé.
   AUCUN bouton d'achat ni de paiement : aucun produit Stripe n'existe
   encore pour cette offre — pour commander, on écrit à la direction
   humaine. La page « Ils ont joué » n'a aucun contenu tant qu'aucun
   vrai client n'a donné son accord : elle n'apparaît donc pas ici.
   PAS de démo embarquée sur cette page (page légère, décision d'Hugo) :
   c'est le lien /apercu qui joue ce rôle. */
export const Route = createFileRoute("/jeux-a-votre-image")({
  head: () =>
    createSeoHead({
      title: "Jeu personnalisé pour commerce, créé par HP Outils",
      description:
        "Un petit jeu simple, aux couleurs et au nom de votre commerce, que vos clients jouent, partagent et retiennent. De 29 $ à 399 $, hébergement gratuit la première année. Voyez l'aperçu gratuit en 30 secondes.",
      path: "/jeux-a-votre-image",
    }),
  component: Page,
});

const BLOC = { margin: "36px 0" } as const;
const H2 = { fontSize: 24, lineHeight: 1.3 } as const;
const H3 = { fontSize: 20, lineHeight: 1.3 } as const;
const P = { fontSize: 18, lineHeight: 1.55, maxWidth: 680 } as const;
const LI = { fontSize: 18, lineHeight: 1.7 } as const;
const CHIP = {
  display: "inline-block",
  border: "1px solid #1f5c46",
  borderRadius: 999,
  padding: "6px 12px",
  margin: "0 8px 8px 0",
  fontSize: 16,
  fontWeight: 700,
  textDecoration: "none",
} as const;
const TH = {
  fontSize: 16,
  lineHeight: 1.45,
  textAlign: "left" as const,
  verticalAlign: "top" as const,
  padding: "8px 6px",
  borderBottom: "2px solid #1f5c46",
  overflowWrap: "break-word" as const,
};
const TD = {
  fontSize: 16,
  lineHeight: 1.45,
  textAlign: "left" as const,
  verticalAlign: "top" as const,
  padding: "8px 6px",
  borderBottom: "1px solid #ddd",
  overflowWrap: "break-word" as const,
};
const CALLOUT = {
  border: "1px solid #1f5c46",
  borderRadius: 8,
  padding: "12px 16px",
  margin: "20px 0",
  maxWidth: 680,
  fontSize: 18,
  lineHeight: 1.55,
} as const;

function Page() {
  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <p style={{ fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", fontSize: 13 }}>
        Jeux à votre image
      </p>
      <h1>Vos clients font votre pub — en jouant.</h1>
      <p style={P}>
        Un petit jeu simple, aux couleurs et au nom de votre commerce, que vos
        clients jouent, partagent et retiennent — au lieu d&apos;une pub
        qu&apos;ils subissent. Un jeu se joue pendant des minutes. Une pub se
        subit pendant deux secondes. Et le score se partage tout seul :{" "}
        « J&apos;ai fait 181 m, bats-moi » — c&apos;est le client qui fait la
        pub, gratuitement.
      </p>
      <p style={P}>
        <Link to="/apercu">Voir l&apos;aperçu gratuit (30 secondes) →</Link>
        {" — "}
        <Link to="/contact">Écrire à la direction humaine →</Link>
      </p>
      <p style={P}>
        Les prix :{" "}
        <a href="#express" style={CHIP}>Express 29 $</a>
        <a href="#evenement" style={CHIP}>Événement 199 $</a>
        <a href="#saisonnier" style={CHIP}>Saisonnier 299 $</a>
        <a href="#permanent" style={CHIP}>Permanent 399 $</a>
      </p>

      <section aria-label="Quatre jeux qui marchent déjà" style={BLOC}>
        <h2 style={H2}>Quatre jeux qui marchent déjà. On change juste les couleurs.</h2>
        <p style={P}>
          Le sur-mesure est dans l&apos;habillage, pas dans le jeu : on part
          d&apos;un des 4 jeux déjà construits et testés par HP Outils, et on
          l&apos;habille à votre image. Chaque jeu finit par un défi à envoyer
          à quelqu&apos;un — c&apos;est comme ça que le jeu voyage tout seul.
        </p>
        <ul style={LI}>
          <li>
            <strong>Quiz</strong> — modèle{" "}
            <a href="/apps/2-verites-1-mensonge">2 vérités, 1 mensonge</a> :
            on répond ; le score et le « fais mieux que moi » se partagent.
          </li>
          <li>
            <strong>Course</strong> — modèle{" "}
            <a href="/apps/caribou-run">Caribou Run</a> : on court et on saute ;
            le record à battre — le modèle Défi Caribou, déjà prouvé.
          </li>
          <li>
            <strong>Réflexes</strong> — modèle{" "}
            <a href="/apps/pop-ballons">Pop Ballons</a> : on touche vite ; le
            score en temps limité se partage.
          </li>
          <li>
            <strong>Observation</strong> — modèle{" "}
            <a href="/apps/cherche-trouve-la-vraie-vie">Cherche &amp; Trouve</a> :
            on trouve ; le temps et le score — le « trouve-les tous ».
          </li>
        </ul>
        <p style={P}>
          35 jeux construits et testés par HP Outils : ils ont déjà joué pour
          vrai. Aucun jeu ne sort sans avoir été testé sur téléphone avant
          livraison — et vous testez le prototype sur VOTRE téléphone avant de
          dire oui. Une ronde de corrections est incluse. Ce que personne ne
          peut recréer : HGPTO, le petit robot d&apos;HP Outils, qui salue le
          joueur et présente le jeu ; le jeu qui vit sur hp-outils.com, la
          maison où vivent aussi les livres, les recettes, les outils et le
          balado ; et le prix petit commerce.
        </p>
      </section>

      <section id="echelle" aria-label="Les 4 options, en échelle" style={BLOC}>
        <h2 style={H2}>Les 4 options, en échelle.</h2>
        <p style={P}>
          Plus le jeu vit longtemps, plus il peut faire pour vous. Les étages
          Saisonnier et Permanent reprennent tout l&apos;étage Événement, et
          ajoutent leurs propres différences.
        </p>
        <table style={{ width: "100%", tableLayout: "fixed", minWidth: 0, borderCollapse: "collapse", maxWidth: 680 }} aria-label="Les 4 options de jeux à votre image">
          <thead>
            <tr>
              <th style={TH}>Option</th>
              <th style={TH}>Durée de vie</th>
              <th style={TH}>Ce que vous avez</th>
            </tr>
          </thead>
          <tbody>
            <tr id="express">
              <td style={TD}><strong>Express 29 $ « Pour tester »</strong></td>
              <td style={TD}>Jeu d&apos;essai.</td>
              <td style={TD}>Course seulement, prénom seulement, aucune option. Immédiat, non crédité.</td>
            </tr>
            <tr id="evenement">
              <td style={TD}><strong>Événement 199 $ « Pour un moment »</strong></td>
              <td style={TD}>Un événement unique ; le jeu appartient à la compagnie pour toujours.</td>
              <td style={TD}>4 moteurs au choix, habillage complet (logo, couleurs, nom, phrases, date) + 1 ronde de corrections. Écran de victoire avec récompense + code QR + kit de partage. Sous 14 jours.</td>
            </tr>
            <tr id="saisonnier">
              <td style={TD}><strong>Saisonnier 299 $ « Pour chaque année »</strong></td>
              <td style={TD}>Revient chaque année, payé une fois.</td>
              <td style={TD}>Tout Événement + re-habillage chaque saison sans re-facturation + compteurs de parties par saison.</td>
            </tr>
            <tr id="permanent">
              <td style={TD}><strong>Permanent 399 $ « Pour toujours »</strong></td>
              <td style={TD}>Tous les jours, pour toujours.</td>
              <td style={TD}>Tout Événement + jeu du quotidien + compteurs + résumé mensuel + vitrine « Ils ont joué » (avec l&apos;accord du client) + bouton « Votre commerce aussi ? » qui recrute le suivant.</td>
            </tr>
          </tbody>
        </table>
        <div style={CALLOUT}>
          Le 29 $ express n&apos;est pas crédité vers un jeu supérieur.
          L&apos;image : tu vas essayer un resto, tu manges peu, c&apos;est
          bon, tu reviens manger beaucoup — on ne te crédite pas le premier
          repas test. Le test se paie ; le reste se paie ensuite.
        </div>
        <p style={P}>
          Hébergement, pour tous les jeux sur mesure : gratuit l&apos;année 1,
          puis 29 $ par année, par jeu hébergé (couvre l&apos;entretien et les
          frais d&apos;IA mensuels). L&apos;hébergement gratuit à vie n&apos;est
          jamais promis.
        </p>
        <p style={P}>
          <strong>Délai unique, toujours le même : sous 14 jours</strong>{" "}
          après validation du brief, pour tous les jeux sur mesure. L&apos;express,
          lui, est immédiat. Aucune taxe ajoutée (petit fournisseur) : le prix
          affiché, c&apos;est le prix payé.
        </p>
        <p style={P}>
          Moins cher que les gabarits spécialisés — 400 à 700 $ US par jeu —
          et on vous dit pourquoi : l&apos;IA accélère la production sans
          remplacer l&apos;humain qui dirige, teste et livre, les moteurs
          existent déjà, et il n&apos;y a aucune couche d&apos;agence.
        </p>
      </section>

      <section aria-label="Trois choses qui ramènent du monde" style={BLOC}>
        <h2 style={H2}>Trois choses qui ramènent du monde.</h2>
        <p style={P}>
          Pour qui ? Les commerces locaux, tous les jours ou pour un
          événement. Les parents : un jeu au prénom de leur enfant, livré tout
          de suite. Les écoles, les équipes, les associations : un jeu pour
          leur campagne, leur tournoi, leur levée de fonds.
        </p>
        <ul style={LI}>
          <li>
            <strong>Attirer du monde en magasin</strong> : l&apos;écran de
            victoire avec récompense — « Montrez cet écran au comptoir, -10 %
            ou un café offert » — ramène des joueurs au comptoir.
          </li>
          <li>
            <strong>Faire jouer</strong> : des minutes d&apos;attention, pas
            deux secondes de pub subie.
          </li>
          <li>
            <strong>Faire partager</strong> : le score et le défi à envoyer à
            quelqu&apos;un — le joueur fait la pub lui-même.
          </li>
          <li>
            <strong>Le jeu d&apos;essai à votre nom</strong> : avant même de
            parler prix, voyez un jeu habillé avec votre logo et vos
            couleurs — <Link to="/apercu">l&apos;aperçu gratuit, 30 secondes</Link>.
          </li>
          <li>
            <strong>Un code QR par endroit</strong> (comptoir, sac, facture,
            vitrine), sans compte ni données personnelles.
          </li>
        </ul>
        <h3 style={H3}>Levées de fonds : du fun à 2 $, pas du chocolat à 20 $.</h3>
        <p style={P}>
          L&apos;organisme — école, équipe, association — offre son jeu à son
          monde au prix qu&apos;il fixe, par exemple 2 $ pour jouer.{" "}
          <strong>L&apos;organisme garde 100 % des entrées</strong> : HP vend le
          jeu au forfait événement (199 $) et ne touche pas aux entrées, ne
          collecte pas l&apos;argent des joueurs, ne fait pas de remise. Le
          calcul : 100 joueurs × 2 $ = 200 $, 500 joueurs = 1 000 $. Le jeu se
          paie tout seul dès 100 joueurs à 2 $. On vend le JEU (jouer pour le
          fun, faire un score), pas une CHANCE de gagner. Tirage ou prix ?
          C&apos;est l&apos;organisme qui vérifie les règles des concours du
          Québec.
        </p>
      </section>

      <section aria-label="Saisons et passeport de quartier" style={BLOC}>
        <h2 style={H2}>Saisons et passeport de quartier.</h2>
        <p style={P}>
          <strong>Forfait saisons</strong> : Noël, Halloween et Saint-Jean à
          un prix groupé, avec le même jeu re-habillé chaque fois. Prix groupé
          à venir : <Link to="/contact">écrivez à la direction humaine</Link>{" "}
          pour en parler.
        </p>
        <p style={P}>
          <strong>À part, hors de l&apos;échelle</strong> : le{" "}
          <strong>passeport de quartier</strong> — un seul jeu partagé par 4 ou
          5 commerces voisins, où chaque commerce débloque une étape, vendu
          en groupe, chaque commerçant fait la promotion des autres. Prix de
          groupe à venir : <Link to="/contact">écrivez à la direction humaine</Link>{" "}
          pour en parler.
        </p>
      </section>

      <section aria-label="Comment ça marche" style={BLOC}>
        <h2 style={H2}>Comment ça marche, en 4 pas.</h2>
        <p style={P}>
          <strong>Rien à installer. Juste un lien.</strong>
        </p>
        <ul style={LI}>
          <li>Un lien pour l&apos;aperçu.</li>
          <li>Un lien pour le jeu.</li>
          <li>Un QR qui se génère seul.</li>
        </ul>
        <ol style={LI}>
          <li>Petit brief.</li>
          <li>Prototype.</li>
          <li>Test sur VOTRE téléphone.</li>
          <li>Livraison + kit.</li>
        </ol>
        <p style={P}>
          <strong>Vous fournissez 4 choses</strong> : votre logo, vos couleurs,
          2 ou 3 phrases sur votre métier, votre date — et votre accord pour
          que le jeu dise qui l&apos;offre. Vous garantissez avoir le droit
          d&apos;utiliser les éléments de marque que vous fournissez.{" "}
          <strong>HP livre</strong> : une adresse dédiée sur hp-outils.com, un
          jeu testé sur téléphone avant livraison, et un kit de partage (texte
          du post, adresse du jeu, code QR à imprimer). Le jeu porte la mention
          « Jeu offert par [Compagnie], créé par HP Outils ». Ils
          n&apos;installent rien : un lien à partager, un code QR à scanner,
          optionnellement un bouton sur leur site. Rien à télécharger, rien à
          mettre à jour, aucun compte.
        </p>
      </section>

      <section aria-label="Accessible et honnêteté" style={BLOC}>
        <p style={P}>
          <strong>Accessible</strong> : vieux téléphones · sans compte ·
          français clair · données comptées.
        </p>
        <p style={P}>
          Pas de données collectées, pas de jeux d&apos;argent, et HP choisit
          ses clients : commerces et organismes alignés avec ses valeurs —
          dignité, honnêteté, vraie vie. Tout est 100 % original, jamais copié.
        </p>
        <p style={P}>
          <Link to="/apercu">Voir l&apos;aperçu gratuit (30 secondes) →</Link>
          {" — "}
          <Link to="/contact">Écrire à la direction humaine →</Link>
        </p>
        <p style={{ lineHeight: 1.55 }}>
          Un humain de l&apos;équipe vous répond sous 3 jours ouvrables.
        </p>
      </section>
    </main>
  );
}
