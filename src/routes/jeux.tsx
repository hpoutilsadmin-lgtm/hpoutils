import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export const Route = createFileRoute("/jeux")({
  head: () => createSeoHead({
    title: "Jeux HP : histoires interactives et bons réflexes | Québec",
    description: "Jeux interactifs HP pour les jeunes, les ados et les adultes. Tome 1 gratuit, tomes standards à 5 $ CAD, aucune taxe ajoutée.",
    path: "/jeux",
  }),
  component: JeuxPage,
});

const STORIES = [
  { audience: "Jeunesse", copy: "Des choix simples, des situations familières et plusieurs chemins pour faire avancer l'histoire." },
  { audience: "Ado", copy: "Des décisions qui comptent, sans morale toute faite, pour explorer ce qui pourrait arriver ensuite." },
  { audience: "Adulte", copy: "Des récits à embranchements ancrés dans les relations, le quotidien et les décisions imparfaites." },
];

const GAMES = [
  { title: "RELÈVE — Chapitre 1 : Surchauffe", file: "/apps/releve/releve-chapitre-1-v1.0.html", copy: "Aventure d'enquête 3D à Percé : Grizz, ourson policier de Faune-Secours, et NID à la radio cherchent la cause d'une surchauffe qui menace la faune. FR/EN." },
  { title: "LA BANQUE — le jeu de la banque alimentaire", file: "/apps/la-banque/la-banque-v1.0.html", copy: "Gère une banque alimentaire sur une saison de 8 semaines : dons, tri, plats cuisinés, ventes. Ton score : les familles nourries." },
  { title: "Les bons réflexes d'HP", file: "/apps/bons-reflexes/index.html", copy: "Jeu éducatif sur les bons réflexes du quotidien, par âge et par activité." },
  { title: "Mystères du Nord", file: "/apps/mysteres-du-nord/myst-res-du-nord-v1.2.html", copy: "Sept enquêtes façon Clue : explore les lieux, interroge les suspects et démasque le coupable." },
  { title: "Fait fructifier 100 $ en 30 jours", file: "/apps/100-en-30-jours/100-en-30-jours-v1.1.html", copy: "Jeu de gestion et d'investissement 100 % fictif : 100 $ de départ, 30 jours pour fructifier." },
  { title: "Caribou Run", file: "/apps/caribou-run/caribou-run-v1.1.html", copy: "Endless runner québécois : saute les bancs de neige et échappe à la déneigeuse !" },
  { title: "Cherche & Trouve — La vraie vie", file: "/apps/cherche-trouve-la-vraie-vie/cherche-trouve-la-vraie-vie-v1.1.html", copy: "Un cherche-et-trouve dans des scènes de la vraie vie." },
  { title: "Devine l'humeur", file: "/apps/devine-l-humeur/devine-l-humeur-v1.1.html", copy: "Devine l'émotion cachée derrière chaque situation." },
  { title: "La Spirale ASMR", file: "/apps/la-spirale-asmr/la-spirale-asmr-v1.1.html", copy: "Tourbillon de sable hypnotique à personnaliser : couleurs, effets et sons doux." },
  { title: "Poutine Panic", file: "/apps/poutine-panic/poutine-panic-v1.1.html", copy: "Sers des poutines à toute vitesse avant la fin du service !" },
  { title: "Retromania", file: "/apps/retromania/retromania-v1.1.html", copy: "Devine le prix d'époque d'objets d'hier à aujourd'hui. Le plus proche sans dépasser gagne !" },
  { title: "Sirop Clicker", file: "/apps/sirop-clicker/sirop-clicker-v1.1.html", copy: "Clique pour produire du sirop d'érable au Temps des sucres." },
  { title: "Mots de Chez Nous", file: "/apps/mots-de-chez-nous/mots-de-chez-nous-v1.0.html", copy: "Mots cachés : 665 mots d'ici à retrouver, définitions incluses." },
  { title: "Mémoire des Cantons", file: "/apps/memoire-des-cantons/memoire-des-cantons-v1.0.html", copy: "Le jeu de mémoire aux icônes du Québec." },
  { title: "Tir de Boules de Neige", file: "/apps/tir-de-boules-de-neige/tir-de-boules-de-neige-v2.0.html", copy: "50 niveaux de tir à la boule de neige, sauvegarde incluse." },
  { title: "Ado odieux, adieu", file: "/apps/ado-odieux-adieu/ado-odieux-adieu-v1.0.html", copy: "Fais des mauvais coups sans te faire pogner… et assume la vraie sentence." },
  { title: "Couleuvre du Québec", file: "/apps/couleuvre-du-quebec/couleuvre-du-quebec-v1.0.html", copy: "Le serpent d'ici : souris, bestioles dorées, mouettes et vidanges." },
  { title: "Fusion Sirop", file: "/apps/fusion-sirop/fusion-sirop-v1.0.html", copy: "Le 2048 de la cabane à sucre, de la sève au pain de sucre." },
  { title: "Trio des Éléments", file: "/apps/trio-des-elements/trio-des-elements-v1.0.html", copy: "Match-3 du tableau périodique : silicium, diamant, or et cuivre." },
  { title: "Bernache Express", file: "/apps/bernache-express/bernache-express-v1.0.html", copy: "La grande migration vers le Sud, à un seul bouton." },
  { title: "Le Bonhomme Pendu", file: "/apps/le-bonhomme-pendu/le-bonhomme-pendu-v1.0.html", copy: "673 mots à deviner, dont 100 québécois d'ici — définitions incluses." },
  { title: "Montgolfière", file: "/apps/montgolfiere/montgolfiere-v1.0.html", copy: "Grimpe toujours plus haut, entre les orages et les éclairs." },
  { title: "Pop Ballons", file: "/apps/pop-ballons/pop-ballons-v1.0.html", copy: "60 secondes, des combos, et une frénésie finale." },
  { title: "2 vérités, 1 mensonge", file: "/apps/2-verites-1-mensonge/2-verites-1-mensonge-v2.0.html", copy: "330 manches pour démasquer le mensonge — historique, inusité, cocasse." },
  { title: "Chat'attaque", file: "/apps/chat-attaque/chat-attaque-v1.2.html", copy: "Tower defense avec des chats : 9 chats-tours défendent 50 croquettes. 12 cartes labyrinthe, 3 difficultés, solo et multijoueur local." },
  { title: "NORD 2087 — La Ligne de Glace", file: "/apps/nord-2087/nord-2087-v1.1.html", copy: "Tower defense futuriste : en 2087, dessine ton labyrinthe et défends le Cœur du réseau contre la Horde. Douze vagues, une tempête qui peut tout changer." },
];

function JeuxPage() {
  return (
    <>
      <section className="editorial-hero hero-banner-image jeux-hero">
        <div className="container">
          <span className="editorial-kicker">Jeux HP</span>
          <h1>Jouer, choisir, <em>essayer autrement</em>.</h1>
          <p className="lead">Des jeux courts et des histoires interactives pour exercer ses réflexes, imaginer la suite et apprendre sans pression.</p>
          <div className="lead-actions">
            <a className="btn-primary" href="/apps/bons-reflexes/index.html">Jouer aux Bons réflexes d'HP</a>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">À jouer maintenant</span>
          <h2 className="section-title">Les jeux HP</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Les bons réflexes d'HP</h3>
              <p>Des situations de cuisine, de maison, d'entraide, d'émotions et de sécurité. Gratuit, sans inscription.</p>
              <a className="pillar-cta" href="/apps/bons-reflexes/index.html">Jouer maintenant →</a>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Mystères du Nord</h3>
              <p>Sept enquêtes façon Clue dans le Nord : explore les lieux, interroge les suspects, trouve les indices et démasque le coupable.</p>
              <a className="pillar-cta" href="/apps/mysteres-du-nord/myst-res-du-nord-v1.2.html">Jouer maintenant →</a>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>À toi l'histoire</h3>
              <p>Des aventures à embranchements où chaque choix ouvre une nouvelle piste.</p>
              <a className="pillar-cta" href="#a-toi-histoire">Découvrir les rayons →</a>
            </article>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Gratuits, sans inscription</span>
          <h2 className="section-title">Tous les jeux</h2>
          <div className="pillar-grid">
            {GAMES.map((game, index) => (
              <article className="pillar-card" key={game.title}>
                <span className="pillar-num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{game.title}</h3>
                <p>{game.copy}</p>
                <a className="pillar-cta" href={game.file}>Jouer maintenant →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="collections-strip" id="a-toi-histoire">
        <div className="container">
          <span className="editorial-kicker">Histoires interactives</span>
          <h2>À toi <em>l'histoire</em></h2>
          <p className="strip-intro">Tome 1 gratuit · tomes standards 5 $ CAD · grands tomes de 150 paragraphes et plus 8 $ CAD. Aucune taxe ajoutée.</p>
          <div className="pillar-grid">
            {STORIES.map((story, index) => (
              <article className="pillar-card" key={story.audience}>
                <span className="pillar-num">{String(index + 1).padStart(2, "0")}</span>
                <h3>Rayon {story.audience}</h3>
                <p>{story.copy}</p>
                <span className="workshop-meta">Premiers tomes à venir</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">À découvrir</span>
          <div className="pillar-grid">
            {[
              ["Tome 1 gratuit", "Commencer une histoire sans paiement et découvrir le principe des choix."],
              ["Tomes standards", "Des histoires complètes à 5 $ CAD, aucune taxe ajoutée."],
              ["Grands tomes", "150 paragraphes et plus à 8 $ CAD, aucune taxe ajoutée."],
              ["Offrir ou encourager", "Achat-cadeau à 5 $ CAD ou don d'encouragement de 2, 5 ou 10 $ CAD."],
            ].map(([title, copy], index) => (
              <article className="pillar-card" key={title}>
                <span className="pillar-num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="collections-strip">
        <div className="container" style={{ maxWidth: 720 }}>
          <span className="editorial-kicker">Infolettre</span>
          <h2>Les nouveaux jeux <em>dans ta boîte</em></h2>
          <p className="strip-intro">
            Nouveaux jeux, nouveaux tomes « À toi l'histoire », coulisses HP.
            Un courriel de temps en temps, jamais de spam.
          </p>
          <NewsletterSignup source="jeux" />
        </div>
      </section>

      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Organismes, écoles et médias</span>
          <h2>Partager les jeux avec vos <em>publics</em></h2>
          <p className="strip-intro">Un bloc d'intégration pourra être fourni aux partenaires qui souhaitent présenter ou diffuser les jeux HP.</p>
          <div className="lead-actions">
            <Link to="/contact" className="btn-primary">Devenir partenaire</Link>
          </div>
        </div>
      </section>
    </>
  );
}
