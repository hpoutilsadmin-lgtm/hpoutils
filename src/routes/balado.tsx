import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/balado")({
  head: () => createSeoHead({
    title: "Futur simple — le balado HP sur l'IA, les PME et le futur | Québec",
    description: "Lea et Marc regardent l'intelligence artificielle en face : entrepreneuriat, PME et futur à venir, le bon comme le mauvais. Un nouvel épisode chaque lundi dès le 26 octobre. Direct, concret, sans jargon.",
    path: "/balado",
  }),
  component: Page,
});

// Pour ajouter un épisode : copier un bloc ci-dessous, changer le numéro,
// le titre, le libellé, la date, la durée, la description et l'URL audio. Le plus récent en premier.
const EPISODES = [
  {
    n: "02",
    label: "Mois de la cybersécurité",
    title: "Épisode 2 — Futur simple",
    date: "19 octobre 2026",
    duration: "Fraudes et deepfakes",
    description:
      "Fraudes vocales et deepfakes : comment se protéger à l'ère de l'IA. Publié le " +
      "19 octobre 2026. Le rendez-vous officiel du lundi démarre le 26 octobre 2026.",
    audio:
      "https://muse.ai/podcasts/media/1328712923661622/65e88d46-ef82-42e8-b712-c4e00a40562d/ep-0b89e3d7-83f5-43c8-847b-28931ef6cd92.mp3",
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
      "https://muse.ai/podcasts/media/1328712923661622/65e88d46-ef82-42e8-b712-c4e00a40562d/ep-8309fb64-d631-412d-9d33-734e42d4f08a.mp3",
  },
];

const FEED_URL =
  "https://muse.ai/podcasts/feed/1328712923661622/65e88d46-ef82-42e8-b712-c4e00a40562d";
const APPLE_URL =
  "podcast://muse.ai/podcasts/feed/1328712923661622/65e88d46-ef82-42e8-b712-c4e00a40562d";
const OVERCAST_URL =
  "overcast://x-callback-url/add?url=https%3A%2F%2Fmuse.ai%2Fpodcasts%2Ffeed%2F1328712923661622%2F65e88d46-ef82-42e8-b712-c4e00a40562d";
const POCKET_CASTS_URL =
  "pktc://subscribe/muse.ai/podcasts/feed/1328712923661622/65e88d46-ef82-42e8-b712-c4e00a40562d";

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
            les PME et le futur à venir — <strong>le bon comme le mauvais</strong>. Un nouvel
            épisode chaque lundi, dès le 26 octobre. Direct, concret, sans jargon. Comme tout ce qu'on fait ici.
          </p>
          <div className="lead-actions">
            <a href="#episodes" className="btn-primary">Écouter le dernier épisode</a>
            <a href={FEED_URL} className="btn-ghost" target="_blank" rel="noreferrer">S'abonner au flux RSS</a>
          </div>
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
                  Ton navigateur ne supporte pas l'audio. Écoute via le flux RSS.
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
            Ajoute le flux dans ton appli de balados préférée : chaque nouvel épisode
            y apparaît tout seul, chaque lundi. C'est gratuit, sans compte, sans piège.
          </p>
          <div className="lead-actions">
            <a className="btn-primary" href={FEED_URL} target="_blank" rel="noreferrer">Flux RSS</a>
            <a className="btn-ghost" href={APPLE_URL}>Apple Podcasts</a>
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
              <p>Chaque épisode apprend du précédent. Un sujet par semaine, jamais le même, toujours sur l'IA, les PME et le futur.</p>
            </article>
          </div>
          <div className="lead-actions" style={{ marginTop: "2rem" }}>
            <Link to="/contact" className="btn-ghost">Une idée de sujet ? Écris-moi</Link>
          </div>
        </div>
      </section>
    </>
  );
}