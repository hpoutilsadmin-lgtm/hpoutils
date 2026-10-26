import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/outils")({
  head: () => ({
    ...createSeoHead({
      title: "Outils web gratuits, sans compte — budget, recettes, proches aidants | HP Outils",
      description: "La Boîte à outils HP : budget du mois, relais des proches aidants, 629 recettes. 100 % gratuit, sans compte, et vos données restent sur votre appareil.",
      path: "/outils",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: WEB_TOOLS.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: t.title,
            url: `https://www.hp-outils.com${t.href}`,
          })),
        }),
      },
    ],
  }),
  component: Page,
});

const WEB_TOOLS = [
  {
    emoji: "🧰",
    tag: "8 outils",
    title: "La Boîte à outils",
    copy: "Huit outils pour la vraie vie : préparer son héritage, trancher une décision, comprendre la paperasse, comparer les prix, préparer un appel difficile, savoir quelle démarche faire, garder ses codes en sécurité et suivre les promesses — qui doit quoi, pour quand.",
    cta: "Ouvrir la Boîte →",
    href: "/boite/",
  },
  {
    emoji: "🍲",
    tag: "Recettes",
    title: "En cuisine — Recettes HP",
    copy: "629 recettes pour cuisiner avec ce qu'on a sous la main : cherche par ingrédients, convertis les températures du four et trouve quoi faire avec les restes.",
    cta: "Entrer dans la cuisine →",
    href: "/en-cuisine/",
  },
  {
    emoji: "📖",
    tag: "Savoir-faire",
    title: "Le Passeur de savoir",
    copy: "Les trucs et les savoirs des gens, recueillis pour être transmis : recettes, remèdes de grand-mère, savoir-faire du quotidien. La fiche nº 1 : le truc contre le hoquet de la grand-mère d'HP.",
    cta: "Ouvrir le Passeur →",
    href: "/passeur-de-savoir/",
  },
  {
    emoji: "💰",
    tag: "Budget",
    title: "Le reste du mois",
    copy: "Combien vous pouvez dépenser par jour jusqu'à la fin du mois, sans vous mettre dans le trouble. Trois boutons pour la vraie vie : reçu, dépensé, coup dur.",
    cta: "Calculer mon reste →",
    href: "/outils-web/le-reste-du-mois.html",
  },
  {
    emoji: "🤝",
    tag: "Proches aidants",
    title: "Le relais",
    copy: "Le cahier de transmission : qui a fait quoi, quand. Un texte prêt à envoyer à la famille, par Messenger ou SMS.",
    cta: "Ouvrir le carnet →",
    href: "/outils-web/le-relais.html",
  },
  {
    emoji: "🧭",
    tag: "Le moment présent",
    title: "Maintenant",
    copy: "Où est-ce que j'en suis ? Argent, repas, maison, demain, moi — en 30 secondes. Pas une app de productivité.",
    cta: "Faire le point →",
    href: "/outils-web/maintenant.html",
  },
  {
    emoji: "✨",
    tag: "Bien-être",
    title: "Un petit pas à la fois",
    copy: "Respire avec moi, ta carte ikigaï, ton plan WOOP : trois modules pour explorer ce qui te fait vibrer et passer à l'action, un petit pas à la fois. Le compagnon gratuit du mini cahier du même nom.",
    cta: "Ouvrir l'outil →",
    href: "/outils/hp-hyper-potentiel",
  },
];


const NEED_GROUPS = [
  { name: "Argent", tools: [
    { label: "Ça vaut-tu la peine ? — comparer un prix", href: "/boite/#comparateur" },
    { label: "Le Relanceur — suivre les promesses", href: "/boite/#relanceur" },
    { label: "Le reste du mois — budget du mois", href: "/outils-web/le-reste-du-mois.html" },
  ]},
  { name: "Papiers et héritage", tools: [
    { label: "L'héritage vivant — capsules", href: "/boite/#heritage" },
    { label: "Le décodeur de paperasse", href: "/boite/#paperasse" },
    { label: "Démarches — la prochaine étape", href: "/boite/#demarches" },
    { label: "Le Coffre à codes", href: "/boite/#coffre" },
    { label: "Le Passeur de savoir", href: "/passeur-de-savoir/" },
  ]},
  { name: "Famille et proches", tools: [
    { label: "On tranche ! — décider en groupe", href: "/boite/#decideur" },
    { label: "Le Démêleur — préparer un appel", href: "/boite/#demeleur" },
    { label: "Le relais — proches aidants", href: "/outils-web/le-relais.html" },
    { label: "En cuisine — recettes", href: "/en-cuisine/" },
  ]},
  { name: "Décider et communiquer", tools: [
    { label: "On tranche ! — décider en groupe", href: "/boite/#decideur" },
    { label: "Le Démêleur — préparer un appel", href: "/boite/#demeleur" },
    { label: "Le relais — cahier de transmission", href: "/outils-web/le-relais.html" },
  ]},
  { name: "Sécurité", tools: [
    { label: "Le Coffre à codes", href: "/boite/#coffre" },
    { label: "Démarches — la prochaine étape", href: "/boite/#demarches" },
  ]},
];

const tabBarStyle: React.CSSProperties = {
  display: "flex",
  gap: 14,
  justifyContent: "center",
  flexWrap: "wrap",
  margin: "30px 0 10px",
};

const tabButton = (active: boolean): React.CSSProperties => ({
  fontSize: "1.15rem",
  fontWeight: 700,
  padding: "16px 30px",
  borderRadius: 14,
  border: active ? "2px solid #b04a2f" : "2px solid rgba(128,105,67,.35)",
  background: active ? "#b04a2f" : "#fff",
  color: active ? "#fff" : "#1d1410",
  cursor: "pointer",
  minWidth: 190,
});

function Page() {
  const [tab, setTab] = useState<"web" | "papier">("web");

  return (
    <>
      <section className="editorial-hero hero-banner-image" style={{ backgroundImage: "url(/images/hero-banner.jpg)" }}>
        <div className="container">
          <span className="editorial-kicker">Outils HP</span>
          <h1>Outils <em>HP</em>.</h1>
          <p className="lead">
            Des outils simples pour la vraie vie : une boîte pleine d'outils web gratuits,
            et les kits PDF Sans Honte pour mettre des mots et avancer.
          </p>
          <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.55, marginTop: 14, maxWidth: 700 }}>« J'ai jamais su qui j'étais ni ce que j'aimais. Alors je fais un peu de tout — et j'en ai fait des outils pour la vraie vie. »</p>
          <div style={tabBarStyle} role="tablist" aria-label="Choisir : outils web ou kits papier">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "web"}
              style={tabButton(tab === "web")}
              onClick={() => setTab("web")}
            >
              🌐 Web — gratuits
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "papier"}
              style={tabButton(tab === "papier")}
              onClick={() => setTab("papier")}
            >
              📄 Papier — kits PDF
            </button>
          </div>
        </div>
      </section>

      {tab === "web" && (
        <section className="tool-section">
          <div className="container">
            <header className="tool-section-head">
              <h2>Outils web gratuits</h2>
              <p>Des outils 100 % gratuits, sans compte : vos données restent sur votre appareil. Les petits se font en 30 secondes ; la Boîte et la cuisine prennent le temps qu'il faut.</p>
            </header>
            <h3 style={{ marginTop: 26 }}>Trouver un outil par besoin</h3>
            <p>Choisissez votre besoin : chaque outil garde sa propre page et son adresse. Les outils web sont gratuits, sans compte.</p>
            <div className="tool-grid">
              {NEED_GROUPS.map((group) => (
                <article className="tool-card" key={group.name}>
                  <h3>{group.name}</h3>
                  <ul>
                    {group.tools.map((t) => (
                      <li key={t.label}><a href={t.href}>{t.label} →</a></li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p style={{ textAlign: "center", color: "#5a4a3f", fontSize: ".95rem", marginTop: 26 }}>
              Voir aussi, à part : les kits PDF Sans Honte et les livres, sur <a href="/livres-pdf">/livres-pdf</a> — les outils web ci-dessus restent gratuits, sans compte ; les PDF sont vendus à part, jamais mélangés.
            </p>
            <h3 style={{ marginTop: 26 }}>Tous les outils web</h3>
            <div className="tool-grid">
              {WEB_TOOLS.map((tool) => (
                <article className="tool-card" key={tool.title}>
                  <span className="tool-tag" style={{ background: "rgba(176,74,47,.12)", color: "#b04a2f" }}>
                    {tool.emoji} {tool.tag} — gratuit
                  </span>
                  <h3>{tool.title}</h3>
                  <p>{tool.copy}</p>
                  <a href={tool.href}>{tool.cta}</a>
                </article>
              ))}
            </div>
            <p style={{ textAlign: "center", color: "#5a4a3f", fontSize: ".95rem", marginTop: 26 }}>
              Fait avec HP Outils — des outils pour la vraie vie.
            </p>
          </div>
        </section>
      )}

      {tab === "papier" && (
        <section className="tool-section">
          <div className="container">
            <header className="tool-section-head">
              <h2>Outils Sans Honte</h2>
              <p>Quinze kits PDF pour les papiers, les repas, le logement, l'entraide, la fraude et d'autres situations concrètes.</p>
            </header>
            <div className="tool-grid">
              <article className="tool-card">
                <span className="tool-tag">Collection PDF — 40 $ CAD, aucune taxe ajoutée</span>
                <h3>Collection Sans Honte — Choisis 10 kits parmi 15</h3>
                <p>
                  Choisis 10 kits parmi les 15 Sans Honte, en un seul PDF — Papiers, Frigo, Tenir Debout,
                  Seconde Main, Entraide et plus. Téléchargement immédiat après paiement.
                </p>
                <Link to="/pdf/$slug" params={{ slug: "sans-honte-collection" }}>Découvrir la collection PDF →</Link>
              </article>
              <article className="tool-card">
                <span className="tool-tag">Kit PDF — 5 $ CAD, aucune taxe ajoutée — Nouveau</span>
                <h3>Testament Sans Honte — L'olographe, pas à pas</h3>
                <p>Préparer un testament olographe au Québec, pas à pas.</p>
                <Link to="/pdf/$slug" params={{ slug: "sans-honte-testament" }}>Découvrir le kit PDF →</Link>
              </article>
              <article className="tool-card">
                <span className="tool-tag">Kit PDF — 5 $ CAD, aucune taxe ajoutée — Nouveau</span>
                <h3>Papiers de mes parents Sans Honte</h3>
                <p>Organiser les papiers de ses parents, sans honte.</p>
                <Link to="/pdf/$slug" params={{ slug: "sans-honte-papiers-parents" }}>Découvrir le kit PDF →</Link>
              </article>
              <article className="tool-card">
                <span className="tool-tag">Kit PDF — 5 $ CAD, aucune taxe ajoutée — Nouveau</span>
                <h3>Chalet Sans Honte — Les règles qui sauvent les Noëls</h3>
                <p>Des règles claires pour partager le chalet.</p>
                <Link to="/pdf/$slug" params={{ slug: "sans-honte-chalet" }}>Découvrir le kit PDF →</Link>
              </article>
              <article className="tool-card">
                <span className="tool-tag">Kit PDF — 5 $ CAD, aucune taxe ajoutée — Nouveau</span>
                <h3>L'année québécoise Sans Honte</h3>
                <p>Des repères pour l'année québécoise.</p>
                <Link to="/pdf/$slug" params={{ slug: "sans-honte-annee-quebecoise" }}>Découvrir le kit PDF →</Link>
              </article>
              <article className="tool-card">
                <span className="tool-tag">Kit PDF — 5 $ CAD, aucune taxe ajoutée — Nouveau</span>
                <h3>Héritage numérique Sans Honte</h3>
                <p>Préparer la transmission de son héritage numérique.</p>
                <Link to="/pdf/$slug" params={{ slug: "sans-honte-heritage-numerique" }}>Découvrir le kit PDF →</Link>
              </article>
              <article className="tool-card">
                <span className="tool-tag">Kit PDF — 5 $ CAD, aucune taxe ajoutée</span>
                <h3>Kit Sans Honte (au choix)</h3>
                <p>
                  Un kit PDF pour explorer la honte, mettre des mots sur ce qu'on porte
                  et reprendre un peu de place sans se juger.
                </p>
                <Link to="/livres-pdf">Voir les kits PDF →</Link>
              </article>
              <article className="tool-card">
                <span className="tool-tag">Bundle — 40 $ CAD, aucune taxe ajoutée</span>
                <h3>Tous les outils pratiques</h3>
                <p>Un seul ensemble pour réunir les fiches et outils pratiques HP.</p>
                <Link to="/achat/sans-honte-collection">Acheter la collection →</Link>
              </article>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
