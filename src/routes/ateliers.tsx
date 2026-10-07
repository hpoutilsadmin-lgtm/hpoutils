import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/ateliers")({
  head: () => createSeoHead({
    title: "Ateliers sur mesure pour organismes et écoles | HP — Lanaudière",
    description: "Ateliers de groupe et offre Édition des Fêtes à Terrebonne et dans Lanaudière. Prix fermes en $ CAD, aucune taxe ajoutée.",
    path: "/ateliers",
  }),
  component: Page,
});

const ATELIERS = [
  { title: "L'IA sans jargon", price: "120 $ CAD · forfait groupe", desc: "Comprendre l'IA avec des mots simples et repartir avec des usages concrets pour la vraie vie." },
  { title: "Cuisine pratique", price: "120 $ CAD · forfait groupe", desc: "Cuisiner ensemble, essayer, apprendre et développer des réflexes utiles au quotidien." },
  { title: "Atelier jeunesse", price: "120 $ CAD · forfait groupe", desc: "Une activité participative adaptée aux jeunes pour apprendre en faisant." },
  { title: "Manger mieux avec moins", price: "150 $ CAD · forfait groupe", desc: "Des repères concrets pour planifier, conserver et cuisiner avec les ressources disponibles." },
];

const FETES = [
  { title: "Pain maison à domicile", duration: "3 h · 6 à 8 personnes", price: "350 $ CAD · forfait groupe", desc: "Vous pétrissez, cuisez et repartez avec VOTRE pain des Fêtes." },
  { title: "L'IA sans jargon", duration: "2 h", price: "275 $ CAD · forfait organisme", desc: "Repartez avec un cas d'usage concret, sans langage technique." },
  { title: "La faim justifie les moyens", duration: "45 à 60 min + questions", price: "300 $ CAD · cachet", desc: "Une conférence sur pourquoi on gaspille, qui est touché et quoi faire concrètement maintenant." },
];

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Ateliers HP</span>
          <h1>Des ateliers pour mettre les outils en <em>mouvement</em>.</h1>
          <p className="lead">
             Quatre ateliers pratiques pour les organismes, les écoles et les groupes
            de Terrebonne, de Lanaudière et des environs. Chaque proposition peut
            être adaptée à votre milieu.
          </p>
          <div className="lead-actions">
            <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com?subject=Demande%20d%27atelier%20HP">Demander un atelier</a>
            <Link to="/outils" className="btn-ghost">Voir les outils</Link>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container">
          <div className="pillar-grid">
            {ATELIERS.map((a, i) => (
              <article key={a.title} className="pillar-card">
                <span className="pillar-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{a.title}</h3>
                 <p className="workshop-meta">{a.price}</p>
                <p>{a.desc}</p>
              </article>
            ))}
          </div>
          <div className="lead-actions" style={{ marginTop: 32, justifyContent: "center" }}>
            <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com?subject=Demande%20d%27atelier%20HP">hpoutils.admin@gmail.com</a>
          </div>
        </div>
      </section>

      <section className="collections-strip" id="edition-des-fetes">
        <div className="container">
          <span className="editorial-kicker">Du 1er octobre au 23 décembre</span>
          <h2>Ateliers &amp; conférence — <em>Édition des Fêtes</em></h2>
          <p className="strip-intro">Trois propositions saisonnières à vivre en groupe, à domicile ou dans votre organisme. Tous les prix sont en $ CAD, aucune taxe ajoutée.</p>
          <div className="pillar-grid">
            {FETES.map((offer, i) => (
              <article key={offer.title} className="pillar-card">
                <span className="pillar-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{offer.title}</h3>
                <p className="workshop-meta">{offer.duration}<br />{offer.price}</p>
                <p>{offer.desc}</p>
              </article>
            ))}
          </div>
          <div className="lead-actions" style={{ marginTop: 32 }}>
            <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com?subject=Édition%20des%20Fêtes%20HP">Réserver une date</a>
          </div>
        </div>
      </section>
    </>
  );
}
