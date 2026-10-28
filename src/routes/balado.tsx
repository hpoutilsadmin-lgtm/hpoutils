import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";
import { ShareButton } from "@/components/ShareButton";

const BALADO_DESCRIPTION =
  "Lea et Marc regardent l'intelligence artificielle en face : entrepreneuriat, PME et futur, le bon comme le mauvais. De nouveaux épisodes, annoncés dès leur parution, directs et sans jargon.";

export const Route = createFileRoute("/balado")({
  head: () => ({
    ...createSeoHead({
      title: "Futur simple — balado québécois sur l'IA, les PME et le futur | HP Outils",
      description: BALADO_DESCRIPTION,
      path: "/balado",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "PodcastSeries",
          name: "Futur simple",
          inLanguage: "fr",
          url: "https://www.hp-outils.com/balado",
          description: BALADO_DESCRIPTION,
          publisher: { "@id": "https://www.hp-outils.com/#organisation" },
        }),
      },
    ],
  }),
  component: Page,
});

// Pour ajouter un épisode : copier un bloc ci-dessous, changer le numéro,
// le titre, le libellé, la date, la durée, la description et l'URL audio. Le plus récent en premier.
const EPISODES = [
  {
    n: "01 officiel",
    label: "La première fois qu'on essaie cela.",
    title: "Futur simple, épisode 1 officiel",
    date: "26 octobre 2026",
    duration: "Environ 7 minutes",
    description:
      "Premier épisode officiel de Futur simple — la première fois qu'on essaie cela. Léa et Marc regardent ce que l'IA change pour vrai, dans la vraie vie : l'aide aux petites entreprises d'ici, un robot qui prépare les rendez-vous médicaux, des dettes médicales effacées sans formulaire, et un appel d'auditrice qui parle des jeux HP. Le bon comme le mauvais, sans jargon : l'outil prépare, l'humain décide. Voix IA : Léa et Marc. Publié le 26 octobre 2026.",
    audio:
      "/audio-balado/episode-1-officiel.mp3",
  },
  {
    n: "02",
    label: "Mois de la cybersécurité",
    title: "Épisode 2 — Futur simple",
    date: "19 octobre 2026",
    duration: "Fraudes et deepfakes",
    description:
      "Fraudes vocales et deepfakes : comment se protéger à l'ère de l'IA. Publié le " +
      "19 octobre 2026. Les épisodes suivants seront annoncés ici dès leur parution.",
    audio:
      "/audio-balado/episode-2.mp3",
  },
  {
    n: "01",
    label: "Épisode pilote",
    title: "L'entrepreneur solo à l'ère de l'IA : opportunité ou mirage ?",
    date: "15 octobre 2026",
    duration: "6 minutes",
    description:
      "Est-ce vraiment le meilleur moment de l'histoire pour lancer son entreprise tout seul ? " +
      "Et qu'est-ce qu'on risque d'y perdre ? Le bon : les solos essaient l'IA avant d'embaucher, " +
      "un peu partout dans le monde. Le mauvais : les équipes gagnent encore " +
      "au sommet, et les risques d'uniformisation et de dépendance.",
    audio:
      "/audio-balado/episode-pilote.mp3",
  },
];

const FEED_URL =
  "https://www.hp-outils.com/audio-balado/feed.xml";
const OVERCAST_URL =
  "overcast://x-callback-url/add?url=https%3A%2F%2Fwww.hp-outils.com%2Faudio-balado%2Ffeed.xml";
const POCKET_CASTS_URL =
  "pktc://subscribe/www.hp-outils.com/audio-balado/feed.xml";
// Bouton Apple Podcasts RETIRÉ le 24 oct. 2026 : « Futur simple » n'est inscrit
// sur aucun annuaire Apple. Le réajouter seulement quand le balado y sera
// vraiment publié (Apple Podcasts Connect), avec sa vraie adresse Apple.

function Page() {
  return (
    <>
      <section className="editorial-hero">
        <div className="container">
          <span className="editorial-kicker">Balado HP</span>
          <h1>
            Futur <em>simple</em>.
          </h1>
          <p className="lead">
            Lea et Marc regardent l'intelligence artificielle en face : l'entrepreneuriat,
            les PME et le futur à venir — <strong>le bon comme le mauvais</strong>. De nouveaux épisodes, annoncés ici dès leur parution, quand ils sont prêts. Direct, concret, sans jargon. Comme tout ce qu'on fait ici.
          </p>
          <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.55, marginTop: 14, maxWidth: 700 }}>« J'ai jamais su qui j'étais ni ce que j'aimais. Alors je fais un peu de tout — et j'en ai fait un balado IA à direction humaine, qui parle de vraie vie. »</p>
          <div className="lead-actions">
            <a href="#episodes" className="btn-primary">Écouter le dernier épisode</a>
            <a href={FEED_URL} className="btn-ghost" target="_blank" rel="noreferrer">S'abonner au flux RSS</a>
            <ShareButton text="Futur simple — le balado HP sur l'IA, les PME et le futur. T'es pas game d'écouter 2 minutes ?" />
          </div>
          <img src="/images/futur-simple-pochette-v4.jpg" alt="Pochette du balado Futur simple — Léa et Marc" style={{ maxWidth: 320, width: "100%", borderRadius: 12, marginTop: 24 }} />
        </div>
      </section>

      <section id="episodes" className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Épisodes</span>
          <h2 className="section-title">Les derniers épisodes</h2>
          <div className="pillar-grid">
            {EPISODES.map((ep) => (
              <article key={ep.n} className="pillar-card">
                <span className="pillar-num">{ep.n}</span>
                <p className="editorial-kicker">{ep.label}</p>
                <h3>{ep.title}</h3>
                <p><strong>{ep.date}</strong> · {ep.duration}</p>
                <p>{ep.description}</p>
                <audio controls preload="none" src={ep.audio} style={{ width: "100%", marginTop: "0.75rem" }}>
                  Votre navigateur ne supporte pas l'audio. Écoutez via le flux RSS.
                </audio>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">S'abonner</span>
          <h2>Le balado te suit <em>partout</em></h2>
          <p className="strip-intro">
            Ajoutez le flux dans votre appli de balados préférée : chaque nouvel épisode
            y apparaît tout seul, dès sa parution. C'est gratuit, sans compte, sans piège.
            Si un bouton n'ouvre rien, c'est que l'appli n'est pas installée sur votre
            téléphone : copiez le lien du flux RSS et collez-le dans votre appli.
          </p>
          <div className="lead-actions">
            <a className="btn-primary" href={FEED_URL} target="_blank" rel="noreferrer">Flux RSS</a>
            <a className="btn-ghost" href={OVERCAST_URL}>Overcast</a>
            <a className="btn-ghost" href={POCKET_CASTS_URL}>Pocket Casts</a>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <span className="editorial-kicker">Le ton</span>
          <h2 className="section-title">Fidèle à l'image HP</h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <span className="pillar-num">01</span>
              <h3>Direct, sans jargon</h3>
              <p>On parle comme du monde vrai, pas comme un communiqué. Si c'est compliqué, on l'explique simplement.</p>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">02</span>
              <h3>Le bon comme le mauvais</h3>
              <p>Pas de lunettes roses, pas de catastrophisme. L'IA ouvre des portes et en ferme d'autres — on regarde les deux.</p>
            </article>
            <article className="pillar-card">
              <span className="pillar-num">03</span>
              <h3>Toujours en amélioration</h3>
              <p>Chaque épisode apprend du précédent. Un sujet par épisode, jamais le même, toujours sur l’IA, les PME et le futur.</p>
            </article>
          </div>
          <div className="lead-actions" style={{ marginTop: "2rem" }}>
            <Link to="/contact" className="btn-ghost">Une idée de sujet ? Écrire à la direction humaine</Link>
          </div>
        </div>
      </section>

      <section className="collections-strip">
        <div className="container">
          <span className="editorial-kicker">Découvrez aussi</span>
          <h2>Continuer <em>ailleurs sur HP</em></h2>
          <div className="pillar-grid">
            <article className="pillar-card">
              <h3>Les livres HP</h3>
              <p>Le sujet du balado te suit en lecture : <em>Enjeux de l'humanité à l'ère de l'IA</em> et les autres livres et PDF d'HP.</p>
              <Link to="/livres-pdf" className="pillar-cta">Voir les livres →</Link>
            </article>
            <article className="pillar-card">
              <h3>Les jeux gratuits</h3>
              <p>Une pause entre deux épisodes : 36 + 1 caché jeux gratuits, jouables dans votre navigateur, sans inscription.</p>
              <Link to="/jeux" className="pillar-cta">Jouer →</Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
