import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/album")({
  head: () => ({
    meta: [
      { title: "Album Humain imparfait — HP" },
      { name: "description", content: "Humain imparfait — l’univers musical HP. Écoute officielle sur YouTube." },
      { property: "og:title", content: "Album — HP" },
      { property: "og:description", content: "Humain imparfait — l’univers musical HP." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <div className="subpage-hero">
        <div className="container">
          <h1>Album</h1>
          <p>Humain imparfait — l’univers musical HP. Pour l’instant, l’écoute officielle passe par YouTube.</p>
          <a className="action-btn" href="https://youtube.com/@hp-2zl" target="_blank" rel="noopener noreferrer">Écouter l’album</a>
        </div>
      </div>
      <div className="subpage-content">
        <div className="container">
          <div className="cards">
            <article className="info-card">
              <span className="mini-note">Album</span>
              <h3>Humain imparfait</h3>
              <p>Musique, textes et émotions reliés à l’écosystème HP.</p>
              <p className="price">Écoute gratuite sur YouTube</p>
              <a className="action-btn" href="https://youtube.com/@hp-2zl" target="_blank" rel="noopener noreferrer">Écouter</a>
            </article>
            <article className="info-card"><h3>Liens plateformes</h3><p>Spotify, Apple Music, Deezer et autres liens pourront être ajoutés ici.</p><p className="price">À venir</p></article>
            <article className="info-card"><h3>Œuvres HP</h3><p>BD, récits, textes et projets créatifs reliés à la même vision.</p><p className="price">À développer</p></article>
          </div>
        </div>
      </div>
    </>
  );
}