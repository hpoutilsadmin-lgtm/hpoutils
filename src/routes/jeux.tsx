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
