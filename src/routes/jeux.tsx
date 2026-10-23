import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ShareButton } from "@/components/ShareButton";
import { useState, type CSSProperties } from "react";

export const Route = createFileRoute("/jeux")({
  head: () => ({
    ...createSeoHead({
      title: "Jeux gratuits en français du Québec — 26 jeux en ligne | HP Outils",
      description: "26 jeux gratuits créés au Québec : histoires interactives, mémoire, mots de chez nous et réflexes. Sans compte, sans téléchargement — tu joues dans ton navigateur.",
      path: "/jeux",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: GAMES.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: g.title,
            url: `https://www.hp-outils.com${g.file}`,
          })),
        }),
      },
    ],
  }),
  component: JeuxPage,
});

const STORIES = [
  { audience: "Jeunesse", copy: "Des choix simples, des situations familières et plusieurs chemins pour faire avancer l'histoire." },
  { audience: "Ado", copy: "Des décisions qui comptent, sans morale toute faite, pour explorer ce qui pourrait arriver ensuite." },
  { audience: "Adulte", copy: "Des récits à embranchements ancrés dans les relations, le quotidien et les décisions imparfaites." },
];

const GAMES = [
  { title: "RELÈVE — Chapitre 1 : Surchauffe", file: "/apps/releve/releve-chapitre-1-v1.0.html", copy: "Aventure d'enquête 3D à Percé : Grizz, ourson policier de Faune-Secours, et NID à la radio cherchent la cause d'une surchauffe qui menace la faune. FR/EN.", tag: "Aventure · Enquête 3D", mono: "R1", art: 0 },
  { title: "LA BANQUE — le jeu de la banque alimentaire", file: "/apps/la-banque/la-banque-v1.1.html", copy: "Gère une banque alimentaire sur une saison de 8 semaines : dons, tri, cuisine et service aux familles nommées, qui reviennent semaine après semaine. Ton score : les familles nourries.", tag: "Gestion · Entraide", mono: "LB", art: 1 },
  { title: "Les bons réflexes d'HP", file: "/apps/bons-reflexes/index.html", copy: "Jeu éducatif sur les bons réflexes du quotidien, par âge et par activité.", tag: "Éducatif · Toute la famille", mono: "BR", art: 2 },
  { title: "Mystères du Nord", file: "/apps/mysteres-du-nord/myst-res-du-nord-v1.2.html", copy: "Sept enquêtes façon Clue : explore les lieux, interroge les suspects et démasque le coupable.", tag: "Enquête · Réflexion", mono: "MN", art: 7 },
  { title: "Fait fructifier 100 $ en 30 jours", file: "/apps/100-en-30-jours/100-en-30-jours-v1.1.html", copy: "Jeu de gestion et d'investissement 100 % fictif : 100 $ de départ, 30 jours pour fructifier.", tag: "Gestion · Simulation", mono: "100", art: 3 },
  { title: "Caribou Run", file: "/apps/caribou-run/caribou-run-v1.1.html", copy: "Endless runner québécois : saute les bancs de neige et échappe à la déneigeuse !", tag: "Arcade · Adresse", mono: "CR", art: 0 },
  { title: "Cherche & Trouve — La vraie vie", file: "/apps/cherche-trouve-la-vraie-vie/cherche-trouve-la-vraie-vie-v1.1.html", copy: "Un cherche-et-trouve dans des scènes de la vraie vie.", tag: "Observation · Toute la famille", mono: "CT", art: 6 },
  { title: "Devine l'humeur", file: "/apps/devine-l-humeur/devine-l-humeur-v1.1.html", copy: "Devine l'émotion cachée derrière chaque situation.", tag: "Émotions · Jeunesse", mono: "DH", art: 4 },
  { title: "La Spirale ASMR", file: "/apps/la-spirale-asmr/la-spirale-asmr-v1.1.html", copy: "Tourbillon de sable hypnotique à personnaliser : couleurs, effets et sons doux.", tag: "Détente · Créatif", mono: "SA", art: 0 },
  { title: "Poutine Panic", file: "/apps/poutine-panic/poutine-panic-v1.1.html", copy: "Sers des poutines à toute vitesse avant la fin du service !", tag: "Arcade · Rapidité", mono: "PP", art: 2 },
  { title: "Retromania", file: "/apps/retromania/retromania-v1.1.html", copy: "Devine le prix d'époque d'objets d'hier à aujourd'hui. Le plus proche sans dépasser gagne !", tag: "Quiz · Nostalgie", mono: "RM", art: 6 },
  { title: "Sirop Clicker", file: "/apps/sirop-clicker/sirop-clicker-v1.1.html", copy: "Clique pour produire du sirop d'érable au Temps des sucres.", tag: "Clics · Détente", mono: "SC", art: 3 },
  { title: "Mots de Chez Nous", file: "/apps/mots-de-chez-nous/mots-de-chez-nous-v1.0.html", copy: "Mots cachés : 665 mots d'ici à retrouver, définitions incluses.", tag: "Mots cachés · D'ici", mono: "MC", art: 5 },
  { title: "Mémoire des Cantons", file: "/apps/memoire-des-cantons/memoire-des-cantons-v1.0.html", copy: "Le jeu de mémoire aux icônes du Québec.", tag: "Mémoire · Québec", mono: "MÉ", art: 1 },
  { title: "Tir de Boules de Neige", file: "/apps/tir-de-boules-de-neige/tir-de-boules-de-neige-v2.0.html", copy: "50 niveaux de tir à la boule de neige, sauvegarde incluse.", tag: "Adresse · 50 niveaux", mono: "TB", art: 0 },
  { title: "Ado odieux, adieu", file: "/apps/ado-odieux-adieu/ado-odieux-adieu-v1.0.html", copy: "Fais des mauvais coups sans te faire pogner… et assume la vraie sentence.", tag: "Humour · Choix", mono: "AO", art: 5 },
  { title: "Couleuvre du Québec", file: "/apps/couleuvre-du-quebec/couleuvre-du-quebec-v1.0.html", copy: "Le serpent d'ici : souris, bestioles dorées, mouettes et vidanges.", tag: "Arcade · Serpent", mono: "CQ", art: 1 },
  { title: "Fusion Sirop", file: "/apps/fusion-sirop/fusion-sirop-v1.0.html", copy: "Le 2048 de la cabane à sucre, de la sève au pain de sucre.", tag: "Réflexion · 2048", mono: "FS", art: 3 },
  { title: "Trio des Éléments", file: "/apps/trio-des-elements/trio-des-elements-v1.0.html", copy: "Match-3 du tableau périodique : silicium, diamant, or et cuivre.", tag: "Match-3 · Sciences", mono: "T3", art: 4 },
  { title: "Bernache Express", file: "/apps/bernache-express/bernache-express-v1.0.html", copy: "La grande migration vers le Sud, à un seul bouton.", tag: "Arcade · Un bouton", mono: "BE", art: 0 },
  { title: "Le Bonhomme Pendu", file: "/apps/le-bonhomme-pendu/le-bonhomme-pendu-v1.0.html", copy: "673 mots à deviner, dont 100 québécois d'ici — définitions incluses.", tag: "Mots · Devinettes", mono: "BP", art: 6 },
  { title: "Montgolfière", file: "/apps/montgolfiere/montgolfiere-v1.0.html", copy: "Grimpe toujours plus haut, entre les orages et les éclairs.", tag: "Adresse · Altitude", mono: "MG", art: 2 },
  { title: "Pop Ballons", file: "/apps/pop-ballons/pop-ballons-v1.0.html", copy: "60 secondes, des combos, et une frénésie finale.", tag: "Rapidité · 60 secondes", mono: "PB", art: 5 },
  { title: "2 vérités, 1 mensonge", file: "/apps/2-verites-1-mensonge/2-verites-1-mensonge-v2.0.html", copy: "330 manches pour démasquer le mensonge — historique, inusité, cocasse.", tag: "Quiz · Déduction", mono: "2V", art: 7 },
  { title: "Chat'attaque", file: "/apps/chat-attaque/chat-attaque-v1.2.html", copy: "Tower defense avec des chats : 9 chats-tours défendent 50 croquettes. 12 cartes labyrinthe, 3 difficultés, solo et multijoueur local.", tag: "Stratégie · Tower defense", mono: "CA", art: 2 },
  { title: "NORD 2087 — La Ligne de Glace", file: "/apps/nord-2087/nord-2087-v1.1.html", copy: "Tower defense futuriste : en 2087, dessine ton labyrinthe et défends le Cœur du réseau contre la Horde. Douze vagues, une tempête qui peut tout changer.", tag: "Stratégie · Science-fiction", mono: "87", art: 7 },
];

const PALETTES: [string, string][] = [
  ["#08243a", "#0f3e62"],
  ["#294f1e", "#496b2a"],
  ["#9a4a0d", "#c85f16"],
  ["#7a5210", "#d89532"],
  ["#4a2560", "#71408c"],
  ["#7e2d21", "#af3c2d"],
  ["#54432a", "#806943"],
  ["#07111b", "#123a5c"],
];

type GameEntry = (typeof GAMES)[number];

const GENRES = ["Tous", ...Array.from(new Set(GAMES.map((g) => g.tag.split(" · ")[0])))];

const FILTER_BTN_STYLE: CSSProperties = {
  font: "inherit",
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: ".02em",
  padding: "7px 14px",
  borderRadius: 999,
  border: "1.5px solid rgba(34,26,18,.5)",
  background: "transparent",
  color: "#221a12",
  cursor: "pointer",
};

const FILTER_BTN_ACTIVE_STYLE: CSSProperties = {
  ...FILTER_BTN_STYLE,
  background: "#221a12",
  color: "#f6eddd",
  borderColor: "#221a12",
};

const CHIP_STYLE: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "7px 13px",
  borderRadius: 999,
  border: "1px solid rgba(216,149,50,.38)",
  background: "rgba(216,149,50,.10)",
  color: "#f0c16d",
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: ".1em",
  textTransform: "uppercase",
};

const TAG_ON_TILE_STYLE: CSSProperties = {
  position: "absolute",
  left: 12,
  bottom: 10,
  fontSize: 10.5,
  fontWeight: 900,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "#f0c16d",
  background: "rgba(7,17,27,.55)",
  border: "1px solid rgba(240,193,109,.35)",
  borderRadius: 999,
  padding: "4px 9px",
};

const TAG_ON_PAPER_STYLE: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "#294f1e",
  background: "rgba(73,107,42,.12)",
  border: "1px solid rgba(73,107,42,.30)",
  borderRadius: 999,
  padding: "5px 10px",
};

function tileBackground(game: GameEntry): CSSProperties {
  const [c1, c2] = PALETTES[game.art % PALETTES.length];
  return {
    backgroundColor: c2,
    backgroundImage:
      "radial-gradient(circle at 85% 12%, rgba(246,237,221,.22), transparent 46%)," +
      "radial-gradient(rgba(255,255,255,.13) 1px, transparent 1.6px)," +
      "linear-gradient(135deg, " + c1 + ", " + c2 + ")",
    backgroundSize: "auto, 22px 22px, auto",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,.12), inset 0 -26px 36px rgba(0,0,0,.28)",
  };
}

function JeuxPage() {
  const featured = GAMES.find((g) => g.title === "2 vérités, 1 mensonge") ?? GAMES[0];
  const [genre, setGenre] = useState("Tous");
  const visibleGames = (genre === "Tous" ? GAMES : GAMES.filter((g) => g.tag.split(" · ")[0] === genre)).filter((g) => g.title !== featured.title);
  return (
    <>
      <section id="sec-jeux" className="editorial-hero hero-banner-image jeux-hero">
        <div className="container">
          <span className="editorial-kicker">Jeux HP</span>
          <h1>Jouer, choisir, <em>essayer autrement</em>.</h1>
          <p className="lead">Des jeux courts et des histoires interactives pour exercer ses réflexes, imaginer la suite et apprendre sans pression.</p>
          <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.55, marginTop: 14, maxWidth: 700 }}>« J'ai jamais su qui j'étais ni ce que j'aimais. Alors je fais un peu de tout — et j'en ai fait des jeux pour la vraie vie. »</p>
          <div className="lead-actions">
            <a className="btn-primary" href="/apps/bons-reflexes/index.html">Jouer aux Bons réflexes d'HP</a>
            <a className="btn-ghost" href="#tous-les-jeux">Voir tous les jeux</a>
            <ShareButton text="Des jeux gratuits, sans inscription, à jouer dans ton navigateur — HP Outils. T'es pas game de l'essayer ?" />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 26 }}>
            <span style={CHIP_STYLE}>{GAMES.length} jeux gratuits</span>
            <span style={CHIP_STYLE}>Sans inscription</span>
            <span style={CHIP_STYLE}>Jouables dans ton navigateur</span>
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

      <section className="three-pillars" id="tous-les-jeux">
        <div className="container">
          <span className="editorial-kicker">Gratuits, sans inscription</span>
          <h2 className="section-title">Tous les jeux</h2>
          <p style={{ textAlign: "center", maxWidth: 620, margin: "-6px auto 34px", color: "#5a4a3f", fontSize: 16, lineHeight: 1.55 }}>
            Clique sur une tuile et joue tout de suite : rien à installer, rien à payer.
          </p>
          <div role="group" aria-label="Filtrer les jeux par genre" style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 900, margin: "0 auto 30px" }}>
            {GENRES.map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={genre === g}
                onClick={() => setGenre(g)}
                style={genre === g ? FILTER_BTN_ACTIVE_STYLE : FILTER_BTN_STYLE}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="pillar-grid">
            <article className="pillar-card" style={{ gridColumn: "1 / -1", padding: 0, overflow: "hidden", flexDirection: "row", flexWrap: "wrap", gap: 0 }}>
              <a
                href={featured.file}
                aria-label={"Jouer à " + featured.title}
                style={{ ...tileBackground(featured), flex: "1 1 260px", minHeight: 230, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
              >
                <span aria-hidden="true" style={{ fontFamily: "Georgia, serif", fontSize: 118, lineHeight: 1, color: "#f6eddd", textShadow: "0 12px 30px rgba(0,0,0,.45)", letterSpacing: ".01em" }}>
                  {featured.mono}
                </span>
              </a>
              <div style={{ flex: "2 1 320px", padding: "30px 32px", display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
                <span className="editorial-kicker" style={{ margin: 0, background: "rgba(200,95,22,.12)", color: "#be5c23", borderColor: "rgba(200,95,22,.35)" }}>Jeu vedette</span>
                <h3 style={{ fontSize: 34 }}>{featured.title}</h3>
                <span style={TAG_ON_PAPER_STYLE}>{featured.tag}</span>
                <p>{featured.copy}</p>
                <a className="btn-primary" href={featured.file}>Jouer maintenant</a>
              </div>
            </article>

            {visibleGames.map((game) => (
              <article className="pillar-card" key={game.title} style={{ padding: 0, overflow: "hidden", gap: 0 }}>
                <a href={game.file} aria-label={"Jouer à " + game.title} style={{ display: "block", textDecoration: "none" }}>
                  <div style={{ ...tileBackground(game), height: 128, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <span aria-hidden="true" style={{ fontFamily: "Georgia, serif", fontSize: 56, lineHeight: 1, color: "#f6eddd", textShadow: "0 8px 22px rgba(0,0,0,.42)" }}>
                      {game.mono}
                    </span>
                    <span style={TAG_ON_TILE_STYLE}>{game.tag}</span>
                  </div>
                </a>
                <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  <h3 style={{ fontSize: 23 }}>{game.title}</h3>
                  <p>{game.copy}</p>
                  <a className="pillar-cta" href={game.file}>Jouer maintenant →</a>
                </div>
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
