import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";
import HpDeguise from "@/components/deguisements/HpDeguise";
import PhotoDeguise from "@/components/deguisements/PhotoDeguise";

export const Route = createFileRoute("/a-propos")({
  head: () => createSeoHead({
    title: "À propos — HP, créateur de HP Outils | couronne nord de Montréal, Lanaudière",
    description: "HP Outils, c'est HP, créateur à Terrebonne (Lanaudière) : des jeux, des livres et des outils concrets pour la vraie vie, pensés pour les petits budgets.",
    path: "/a-propos",
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container a-propos-hero-grid">
          <div>
            <p className="page-kicker">À propos</p>
            <h1>Comprendre. Agir. Transmettre.</h1>
            <p className="lead" style={{ fontFamily: "Georgia,serif", fontStyle: "italic", marginTop: 16 }}>« J'ai jamais su qui j'étais, ce que j'aimais — alors je fais un peu de tout. »</p>
            <p className="lead">HP est né d'une approche simple : tester, apprendre, recommencer, puis partager ce qui fonctionne concrètement dans la vraie vie.</p>
            <p className="lead" style={{ marginTop: 12 }}>Je ne prétends pas avoir toutes les réponses. Mon objectif est de créer des outils simples, utiles et dignes, pensés pour être réellement utilisables au quotidien.</p>
            <div className="lead-actions">
              <Link className="action-btn" to="/contact">Me contacter</Link>
              <Link className="outline-btn" to="/">Voir l'écosystème</Link>
            </div>
          </div>
          <HpDeguise />
        </div>
        <div className="container">
          <PhotoDeguise />
        </div>
      </section>
      <div className="subpage-content">
        <div className="container">
          <section style={{ maxWidth: 760, margin: "0 auto 44px" }}>
            <span className="mini-note">En ses mots</span>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(28px,3.6vw,40px)", margin: "10px 0 18px" }}>Qui est HP</h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 14px" }}>
              Je m'appelle HP. HP Outils, c'est le projet que je construis dans la couronne nord de Montréal, Lanaudière : des jeux, des livres, des recettes et des outils concrets — « des outils pour la vraie vie ».
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 14px" }}>
              Marginal — je le sais, je l'assume. Je peux converser avec un itinérant, un alcoolique, un PDG, un président, un député. Pour moi, c'est la même dignité partout.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 14px" }}>
              Je pars d'une conviction : les gens qu'on dit « en bas » sont éduqués, dignes, et veulent apprendre, partager et repartir. C'est pour eux que je construis. Du gratuit chaque fois que c'est possible — 35 jeux, 629 recettes, des outils web sans compte — et des prix qui respectent un petit budget quand ça ne l'est pas : 5 $ CAD le kit, aucune taxe ajoutée.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 14px", fontFamily: "Georgia,serif", fontStyle: "italic" }}>
              Ma conviction, point : la dignité, c'est pas un budget, c'est un état d'esprit. Une présentation soignée au mieux de ses capacités, et ça devrait être suffisant.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 14px" }}>
              Je ne sais pas coder, je ne sais pas composer, je ne sais pas devenir riche. Je sais survivre, je sais le quotidien, je sais les gens. Et sur tout ce qu'on peut connaître, je ne sais rien — mais je suis curieux de tout.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 14px" }}>
              C'est pour ça que j'ai créé HGPTO : un petit compagnon qui m'aide à structurer et à rester constant — et qui fait la même chose pour toi.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 14px" }}>
              Je crée tout ce que tu vois ici, avec l'IA comme outil de fabrication — la direction, les idées et les mots restent humains. Les jeux et les outils sont testés avant d'être publiés, et corrigés quand un test révèle un problème. Et je fais aussi de la musique : j'écris et j'enregistre mes propres chansons — l'album Humain imparfait et le balado Futur simple racontent le même monde, autrement.
            </p>
            <h3 style={{ fontFamily: "Georgia,serif", fontSize: 22, margin: "26px 0 10px" }}>Mes contrats avec toi</h3>
            <ul style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 14px", paddingLeft: 22 }}>
              <li>Une réponse d'humain sous 3 jours ouvrables.</li>
              <li>Des prix honnêtes, aucune taxe ajoutée, jamais de pression ni de fausse urgence.</li>
              <li>Tout 100 % original. L'IA est un outil très rapide et efficace — la direction, l'émotion, le « ce que je fais », c'est pour les humains.</li>
              <li>Écrit par un humain, accéléré par l'IA. On le dit toujours.</li>
            </ul>
            <h3 style={{ fontFamily: "Georgia,serif", fontSize: 22, margin: "26px 0 10px" }}>Mes buts</h3>
            <ul style={{ fontSize: 17, lineHeight: 1.65, margin: "0 0 14px", paddingLeft: 22 }}>
              <li>Être utile. Des outils pour la vraie vie.</li>
              <li>Que chaque personne qui passe ici reparte avec quelque chose qui l'aide pour vrai — un jeu, un outil, une recette, une idée — peu importe son budget.</li>
            </ul>
            <h3 style={{ fontFamily: "Georgia,serif", fontSize: 22, margin: "26px 0 10px" }}>Les mots d'HP</h3>
            <p style={{ fontSize: 17, lineHeight: 1.65, margin: 0 }}>
              Je dis des mots à moi : <em>serbouillette</em> — ça vient d'Ôz la grande petite, un mix de serviette et débarbouillette. Je dis <em>globesandwich</em> au lieu de club sandwich. Mon petit frère m'appelait <em>Gros Pierre</em> au lieu de HP, et une fillette disait <em>yaourt</em> au lieu de HP.
            </p>
          </section>
          <div className="cards">
            <article className="info-card"><span className="mini-note">Vision</span><h3>Comprendre</h3><p>Voir le monde avec lucidité et bienveillance pour faire des choix alignés.</p></article>
            <article className="info-card"><span className="mini-note">Action</span><h3>Agir</h3><p>Passer à l'action avec des outils concrets, adaptés à la vraie vie.</p></article>
            <article className="info-card"><span className="mini-note">Transmission</span><h3>Transmettre</h3><p>Partager ce qui fonctionne pour que chacun puisse avancer à son tour.</p></article>
          </div>
          <div className="cta-band">
            <div><h3>Un écosystème d'outils pour la vraie vie.</h3><p>Livres, guides, ateliers, musique et ressources pratiques : tout part du même besoin d'avancer simplement.</p></div>
            <Link className="hero-btn gold" to="/outils">Découvrir les outils</Link>
          </div>
          <div className="cards" style={{ marginTop: 28 }}>
            <article className="info-card">
              <span className="mini-note">Transmettre</span>
              <h3>Le Passeur de savoir</h3>
              <p>Les trucs et les savoirs de nos grands-parents, recueillis avant qu'ils ne partent en silence.</p>
              <a className="pillar-cta" href="/passeur-de-savoir/">Ouvrir le Passeur →</a>
            </article>
            <article className="info-card">
              <span className="mini-note">Soutenir</span>
              <h3>Les Passeurs</h3>
              <p>Le programme qui tiendra le gratuit debout : 3 $ CAD par mois, inscription ouverte — aucune taxe ajoutée.</p>
              <Link className="pillar-cta" to="/les-passeurs">Découvrir les Passeurs →</Link>
            </article>
          </div>
          <p style={{ textAlign: "center", color: "#3a2a20", fontSize: 14, marginTop: 8 }}>
            HP — des outils pour la vraie vie
          </p>
        </div>
      </div>
    </>
  );
}
