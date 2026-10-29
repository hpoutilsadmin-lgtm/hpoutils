import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

/* /jeux-a-votre-image — la page commerciale « Jeux à votre image ».
   Vitrine de l'offre B2B : un petit jeu simple, aux couleurs et au nom
   d'un commerce, que ses clients jouent, partagent et retiennent.
   Révision du 25 oct. 2026 (« Applique tout », go d'Hugo) : 6 sections,
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
        <Link to="/apercu">Voir l&apos;aperçu gratuit (30 secondes, moteur Course) →</Link>
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
          35 jeux construits et testés par HP Outils — un compte de construction, pas le total affiché du site : ils ont déjà joué pour
          vrai. Aucun jeu ne sort sans avoir été testé sur téléphone avant
          livraison — et vous testez le prototype sur VOTRE téléphone avant de
          dire oui. Une ronde de corrections est incluse. Ce que personne ne
          peut recréer : Sir H. Gepeto, l&apos;assistant virtuel d&apos;HP Outils, qui salue le
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
              <td style={TD}>7 jours.</td>
              <td style={TD}>Course seulement, un seul nom au choix (commerce, événement ou particulier), aucune option. Sans le délai de 14 jours, non crédité.</td>
            </tr>
            <tr id="evenement">
              <td style={TD}><strong>Événement 199 $ « Pour un moment »</strong></td>
              <td style={TD}>30 jours.</td>
              <td style={TD}>4 moteurs au choix, habillage complet (couleurs, nom au choix, slogan — leur phrase —, date) + 1 ronde de corrections. Écran de victoire avec récompense + kit de partage. Sous 14 jours.</td>
            </tr>
            <tr id="saisonnier">
              <td style={TD}><strong>Saisonnier 299 $ « Pour chaque année »</strong></td>
              <td style={TD}>90 jours, puis re-habillage chaque saison.</td>
              <td style={TD}>Tout Événement + re-habillage chaque saison, sur simple courriel + compteurs de parties par saison, à partir de l&apos;ouverture du lien + code QR par endroit (comptoir, sac, facture, vitrine).</td>
            </tr>
            <tr id="permanent">
              <td style={TD}><strong>Permanent 399 $ « Pour toujours »</strong></td>
              <td style={TD}>Pour toujours.</td>
              <td style={TD}>Tout Événement + jeu du quotidien + compteurs, à partir de l&apos;ouverture du lien, + résumé mensuel + vitrine « Ils ont joué » (avec l&apos;accord du client) + bouton « Votre commerce aussi ? » qui recrute le suivant + code QR par endroit (comptoir, sac, facture, vitrine).</td>
            </tr>
          </tbody>
        </table>
        <div style={CALLOUT}>
          Le 29 $ express n&apos;est pas crédité vers un jeu supérieur.
          L&apos;image : vous essayez un resto, vous mangez peu, c&apos;est
          bon, vous revenez manger beaucoup — on ne vous crédite pas le premier
          repas test. Le test se paie ; le reste se paie ensuite.
        </div>
        <p style={P}>
          1 ronde de corrections incluse (Événement, Saisonnier, Permanent) :
          vous testez le prototype sur votre téléphone, vous demandez vos
          ajustements une fois, on corrige, on reteste, on livre. Rien
          n&apos;est livré sans votre oui.
        </p>
        <p style={P}>
          Hébergement, pour tous les jeux sur mesure : gratuit l&apos;année 1,
          puis 29 $ par année, par jeu hébergé (couvre l&apos;entretien et les
          frais d&apos;IA mensuels). L&apos;hébergement gratuit à vie n&apos;est
          jamais promis.
        </p>
        <p style={P}>
          Chaque prix se paie une seule fois : Express 29 $, Événement 199 $,
          Saisonnier 299 $, Permanent 399 $. L&apos;hébergement s&apos;ajoute
          ensuite (gratuit l&apos;année 1, puis 29 $ par année, par jeu
          hébergé). Fin de vie, paliers à durée finie seulement (Express, Événement, Saisonnier — le Permanent est exclu) : à la fin de votre durée, le jeu disparaît : c&apos;est simplement la fin, l&apos;espace est libéré et le jeu est effacé. Aucune garde promise, aucun fichier promis comme garde après la fin.
        </p>
        <p style={P}>
          <strong>Délai unique, toujours le même : sous 14 jours</strong>{" "}
          après validation du brief, pour tous les jeux sur mesure. L&apos;express, lui, n&apos;attend pas le délai de 14 jours : il part dès réception du brief et du paiement. Aucune taxe ajoutée (petit fournisseur) : le prix
          affiché, c&apos;est le prix payé.
        </p>
        <p style={P}>
          On vous dit pourquoi : l&apos;IA accélère la production sans
          remplacer l&apos;humain qui dirige, teste et livre, les moteurs
          existent déjà, et il n&apos;y a aucune couche d&apos;agence.
        </p>
      </section>

      <section aria-label="Trois choses qui ramènent du monde" style={BLOC}>
        <h2 style={H2}>Trois choses qui ramènent du monde.</h2>
        <p style={P}>
          Pour qui ? Les commerces locaux, tous les jours ou pour un
          événement. Les parents : un jeu au prénom de leur enfant — c&apos;est l&apos;Express (Course, nom au choix seulement), sans le délai de 14 jours. Les écoles, les équipes, les associations : un jeu pour
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
            parler prix, voyez un jeu habillé avec vos couleurs — <Link to="/apercu">l&apos;aperçu gratuit, 30 secondes (moteur Course)</Link>.
          </li>
          <li>
            <strong>Un code QR par endroit</strong> (comptoir, sac, facture, vitrine), Saisonnier et Permanent seulement, sans compte ni données personnelles.
          </li>
        </ul>
        <h3 style={H3}>Levées de fonds : du fun à 2 $, pas du chocolat à 20 $.</h3>
        <p style={P}>
          À tous les paliers : c&apos;est le client qui choisit son palier, nous suggérons. L&apos;organisme — école, équipe, association — offre son jeu à son
          monde au prix qu&apos;il fixe, par exemple 2 $ pour jouer.{" "}
          <strong>L&apos;organisme garde 100 % des entrées</strong> : HP vend le jeu au forfait choisi par l&apos;organisme — nous suggérons le forfait événement (199 $) — et ne touche pas aux entrées, ne
          collecte pas l&apos;argent des joueurs, ne fait pas de remise. Le
          calcul : 100 joueurs × 2 $ = 200 $, 500 joueurs = 1 000 $. Le jeu se
          paie tout seul dès 100 joueurs à 2 $. On vend le JEU (jouer pour le
          fun, faire un score), pas une CHANCE de gagner. Tirage ou prix ?
          C&apos;est l&apos;organisme qui vérifie les règles des concours du
          Québec.
        </p>
      </section>


      <section aria-label="Comment commander" style={BLOC}>
        <h2 style={H2}>Comment commander, en 5 pas.</h2>
        <p style={P}>
          <strong>Rien à installer. Juste un lien.</strong>
        </p>
        <ul style={LI}>
          <li>Un lien pour l&apos;aperçu.</li>
          <li>Un lien pour le jeu.</li>
          <li>Un QR qui se génère seul (Saisonnier et Permanent seulement).</li>
        </ul>
        <ol style={LI}>
          <li>Vous essayez l&apos;aperçu gratuit (30 secondes, sans compte).</li>
          <li>Vous envoyez votre brief par courriel à hpoutils.admin@gmail.com (les 5 questions ci-dessous).</li>
          <li>Vous recevez votre devis ventilé (prix du niveau, hébergement, aucune taxe ajoutée). Le lien de paiement sécurisé Stripe ne vous est envoyé qu&apos;après votre oui explicite — voir le parcours ci-dessous.</li>
          <li>Vous testez le prototype sur VOTRE téléphone, puis vous dites oui (1 ronde de corrections incluse pour Événement, Saisonnier et Permanent).</li>
          <li>Livraison par courriel : adresse dédiée du jeu + kit de partage (texte du post, adresse du jeu, code QR à imprimer pour Saisonnier et Permanent).</li>
        </ol>
        <p style={P}>
          La direction humaine vous répond sous 3 jours ouvrables, à chaque étape.
        </p>
        <h3 style={H3}>Votre brief, en 5 questions :</h3>
        <ol style={LI}>
          <li>Quel jeu ? (Quiz, Course, Réflexes, Observation)</li>
          <li>Pour quelle fête, quel événement ou quel usage ?</li>
          <li>Vos couleurs (et votre logo, Saisonnier et Permanent seulement, fichier joint au courriel ; pour l&apos;aperçu, le logo est lu dans votre navigateur et n&apos;est envoyé nulle part).</li>
          <li>Votre slogan : votre phrase (2 ou 3 phrases sur votre métier).</li>
          <li>Pour quelle date ? Commandez au moins 14 jours avant votre événement.</li>
        </ol>
        <p style={P}>
          <strong>Vous fournissez</strong> : vos couleurs, 2 ou 3 phrases sur votre métier, votre date, et votre logo pour Saisonnier et Permanent — et votre accord pour
          que le jeu dise qui l&apos;offre. Vous garantissez avoir le droit
          d&apos;utiliser les éléments de marque que vous fournissez.{" "}
          <strong>HP livre</strong> : une adresse dédiée sur hp-outils.com, un
          jeu testé sur téléphone avant livraison, et un kit de partage (texte
          du post, adresse du jeu, code QR à imprimer pour Saisonnier et Permanent). Le jeu porte la mention
          « Jeu offert par [Compagnie], créé par HP Outils ». Ils
          n&apos;installent rien : un lien à partager, un code QR à scanner,
          optionnellement un bouton sur leur site. Rien à télécharger, rien à
          mettre à jour, aucun compte.
        </p>
      </section>

      <section aria-label="Le parcours, après votre oui explicite" style={BLOC}>
        <h2 style={H2}>Le parcours, après votre oui explicite.</h2>
        <p style={P}>
          Six pas, dans cet ordre, sans exception. Chaque pas porte les
          conditions de vente (§12) : vous pouvez annuler en tout temps, vous
          ne payez que le travail réellement fait, ventilé, et HP vous remet
          le solde dans les 15 jours suivant votre annulation.
        </p>
        <ol style={LI}>
          <li><strong>Le brief, par courriel.</strong> Vous répondez aux 5 questions, par écrit, à hpoutils.admin@gmail.com. Le brief écrit évite les désaccords. Si HP refuse le projet à ce stade, vous ne payez rien — le choix du client se fait ici, avant tout paiement.</li>
          <li><strong>Le prototype, testé par vous.</strong> Vous essayez le prototype sur VOTRE téléphone, avant tout oui et avant tout paiement. Rien n&apos;est facturé avant que vous ayez vu et essayé le jeu.</li>
          <li><strong>Le devis, ventilé.</strong> Prix du niveau, hébergement, aucune taxe ajoutée — chaque montant est détaillé, sans frais cachés. Vous recevez une copie du contrat (devis + conditions) par courriel, que vous pouvez conserver et imprimer.</li>
          <li><strong>Votre OUI EXPLICITE — la porte obligatoire.</strong> Sans votre oui explicite, aucun paiement n&apos;est demandé et aucun paiement n&apos;est pris. Un silence, un aperçu ou un échange de courriels ne vaut jamais oui.</li>
          <li><strong>Le paiement, seulement après votre oui.</strong> Le lien de paiement sécurisé Stripe vous est envoyé après votre oui explicite, et pas avant. 1 ronde de corrections est incluse pour Événement, Saisonnier et Permanent (l&apos;Express 29 $ n&apos;en inclut pas). Pour l&apos;instant : aucun paiement réel n&apos;est pris pour les jeux sur mesure — les produits Stripe sont en confirmation, et le paiement s&apos;ouvrira après cette confirmation et un test à 0 $.</li>
          <li><strong>La livraison, par courriel.</strong> Adresse dédiée du jeu + kit de partage (texte du post, adresse du jeu, code QR à imprimer pour Saisonnier et Permanent). Délai convenu : sous 14 jours après validation du brief. Si le jeu n&apos;est pas livré dans les 30 jours suivant la date convenue, vous pouvez annuler en tout temps avant de l&apos;avoir reçu, et HP vous rembourse toutes les sommes payées, dans les 15 jours. Si le jeu livré ne correspond pas au brief validé, HP corrige d&apos;abord ; si HP n&apos;arrive pas à livrer un jeu conforme, vous êtes remboursé en entier, dans les 15 jours.</li>
        </ol>
        <p style={P}>
          En cas de désaccord, à n&apos;importe quel pas : écrivez d&apos;abord à la direction humaine — on cherche un règlement amiable, par courriel, avant tout autre recours. La direction humaine vous répond sous 3 jours ouvrables, à chaque étape. Conditions complètes : voir la section 12 des Conditions de vente.
        </p>
        <p style={P}>
          <Link to="/conditions-de-vente">Lire les Conditions de vente, section 12 →</Link>
        </p>
      </section>

      <section aria-label="Conditions, en bref" style={BLOC}>
        <h2 style={H2}>Conditions, en bref.</h2>
        <p style={P}>
          Le jeu est à vous ; l&apos;hébergement est gratuit
          l&apos;année 1, puis 29 $ par année et par jeu ; aucune taxe ajoutée ;
          vous garantissez avoir le droit d&apos;utiliser les éléments de marque
          que vous fournissez ; HP choisit ses clients (commerces et organismes
          alignés avec ses valeurs : dignité, honnêteté, vraie vie).
          Remboursements : voyez les Conditions de vente.
        </p>
      </section>

      <section aria-label="Accessible et honnêteté" style={BLOC}>
        <p style={P}>
          <strong>Accessible</strong> : vieux téléphones · sans compte ·
          français clair · données comptées.
        </p>
        <p style={P}>
          Seul le nombre de parties est compté, anonymement, à partir de l&apos;ouverture du lien, pour les compteurs (Saisonnier, Permanent) : aucun compte, aucune donnée personnelle. Pas de jeux d&apos;argent, et HP choisit
          ses clients : commerces et organismes alignés avec ses valeurs —
          dignité, honnêteté, vraie vie. Tout est 100 % original, jamais copié.
        </p>
        <p style={P}>
          <Link to="/apercu">Voir l&apos;aperçu gratuit (30 secondes, moteur Course) →</Link>
          {" — "}
          <Link to="/contact">Écrire à la direction humaine →</Link>
        </p>
        <p style={{ lineHeight: 1.55 }}>
          La direction humaine vous répond sous 3 jours ouvrables.
        </p>
      </section>
    </main>
  );
}
