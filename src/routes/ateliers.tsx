import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/ateliers")({
  head: () => createSeoHead({
    title: "Ateliers sur mesure pour organismes et écoles | HP — Lanaudière",
    description: "Ateliers cuisine, survie alimentaire et hygiène à Terrebonne et dans Lanaudière. Devis sur mesure : hpoutils.admin@gmail.com.",
    path: "/ateliers",
  }),
  component: Page,
});

const ATELIERS = [
  { title: "Les enfants cuisinent", duration: "90 min", price: "Dès 250 $", desc: "Un atelier pratique pour cuisiner ensemble, essayer, apprendre et gagner en autonomie." },
  { title: "Hygiène & salubrité", duration: "60 à 90 min", price: "Dès 225 $", desc: "Une sensibilisation concrète aux bons gestes d'hygiène et de salubrité dans la vie quotidienne." },
  { title: "Survie alimentaire", duration: "90 min", price: "Dès 250 $", desc: "Des repères pour planifier, conserver et cuisiner avec les ressources disponibles quand le quotidien se complique." },
  { title: "Marché du travail — De la cuisine à…", duration: "60 à 90 min", price: "Dès 225 $", desc: "Relier les gestes appris en cuisine aux compétences utiles dans les études, le travail et la vie de groupe." },
  { title: "Fais ton smoothie", duration: "60 min", price: "Dès 200 $ + ingrédients", desc: "Une activité participative pour découvrir, mesurer, préparer et goûter un smoothie ensemble." },
];

function Page() {
  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Ateliers HP</span>
          <h1>Des ateliers pour mettre les outils en <em>mouvement</em>.</h1>
          <p className="lead">
            Cinq ateliers pratiques pour les organismes, les écoles et les groupes
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
                <p className="workshop-meta">{a.duration} · {a.price}</p>
                <p>{a.desc}</p>
              </article>
            ))}
          </div>
          <div className="lead-actions" style={{ marginTop: 32, justifyContent: "center" }}>
            <a className="btn-primary" href="mailto:hpoutils.admin@gmail.com?subject=Demande%20d%27atelier%20HP">hpoutils.admin@gmail.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
