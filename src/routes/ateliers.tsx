import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/ateliers")({
  head: () => ({
    ...createSeoHead({
      title: "Ateliers sur mesure pour organismes et écoles | HP — Lanaudière",
      description: "Ateliers de groupe et offre Édition des Fêtes à Terrebonne et dans Lanaudière. Prix fermes en $ CAD, aucune taxe ajoutée.",
      path: "/ateliers",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Ateliers sur mesure pour organismes et écoles",
          serviceType: "Ateliers de groupe",
          url: "https://www.hp-outils.com/ateliers",
          provider: { "@id": "https://www.hp-outils.com/#organisation" },
          areaServed: "Lanaudière",
          offers: [
            { "@type": "Offer", price: "120.00", priceCurrency: "CAD" },
            { "@type": "Offer", price: "150.00", priceCurrency: "CAD" },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

const ATELIERS = [
  { title: "L'IA sans jargon", price: "120 $ CAD · forfait groupe", desc: "Comprendre l'IA avec des mots simples et repartir avec des usages concrets pour la vraie vie.", inclus: "Repartez avec un cas d'usage concret. Aucune taxe ajoutée." },
  { title: "Cuisine pratique", price: "120 $ CAD · forfait groupe", desc: "Cuisiner ensemble, essayer, apprendre et développer des réflexes utiles au quotidien.", inclus: "Inclut les fiches recette et astuces. Aucune taxe ajoutée." },
  { title: "Atelier jeunesse", price: "120 $ CAD · forfait groupe", desc: "Une activité participative adaptée aux jeunes pour apprendre en faisant.", inclus: "Inclut les fiches recette et astuces. Aucune taxe ajoutée." },
  { title: "Manger mieux avec moins", price: "150 $ CAD · forfait groupe", desc: "Des repères concrets pour planifier, conserver et cuisiner avec les ressources disponibles.", inclus: "Inclut les fiches recette et astuces. Aucune taxe ajoutée." },
];

const FETES = [
  { title: "Pain maison à domicile", duration: "3 h · 6 à 8 personnes", price: "120 $ CAD · forfait groupe", desc: "Vous pétrissez, cuisez et repartez avec VOTRE pain des Fêtes." },
  { title: "L'IA sans jargon", duration: "2 h", price: "120 $ CAD · forfait organisme", desc: "Repartez avec un cas d'usage concret, sans langage technique." },
  { title: "La faim justifie les moyens", duration: "45 à 60 min + questions", price: "120 $ CAD · cachet", desc: "Une conférence sur pourquoi on gaspille, qui est touché et quoi faire concrètement maintenant." },
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
          <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.55, marginTop: 14, maxWidth: 700 }}>« J'ai jamais su qui j'étais ni ce que j'aimais. Alors je fais un peu de tout — et j'en ai fait des ateliers pour la vraie vie. »</p>
          <div className="lead-actions">
            <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com?subject=Demande%20d%27atelier%20HP">Demander un atelier</a>
            <Link to="/outils" className="btn-ghost">Voir les outils</Link>
          </div>
        </div>
      </section>

      <section id="sec-ateliers" className="three-pillars">
        <div className="container">
          <div className="pillar-grid">
            {ATELIERS.map((a, i) => (
              <article key={a.title} className="pillar-card">
                <span className="pillar-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{a.title}</h3>
                 <p className="workshop-meta">{a.price}</p>
                <p>{a.desc}</p>
                <p>{a.inclus}</p>
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
