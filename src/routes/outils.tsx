import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/outils")({
  head: () => createSeoHead({
    title: "Outils web gratuits + kits PDF Sans Honte | HP — Québec",
    description: "4 outils web gratuits HP : Le reste du mois, Ça vaut-tu la peine ?, Le relais, Maintenant. Et les kits PDF Sans Honte pour la vraie vie. Sans compte, fait au Québec.",
    path: "/outils",
  }),
  component: Page,
});

const WEB_TOOLS = [
  {
    emoji: "💰",
    tag: "Budget",
    title: "Le reste du mois",
    copy: "Combien tu peux dépenser par jour jusqu'à la fin du mois, sans te mettre dans le trouble. Trois boutons pour la vraie vie : reçu, dépensé, coup dur.",
    cta: "Calculer mon reste →",
    href: "/outils-web/le-reste-du-mois.html",
  },
  {
    emoji: "🤔",
    tag: "Achat futé",
    title: "Ça vaut-tu la peine ?",
    copy: "Le vrai coût d'un achat : prix par utilisation, équivalent en heures de travail, projection sur un an. L'outil montre, il ne juge jamais.",
    cta: "Vérifier un achat →",
    href: "/outils-web/ca-vaut-tu-la-peine.html",
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
            Des outils simples pour la vraie vie : quatre outils web gratuits,
            et les kits PDF Sans Honte pour mettre des mots et avancer.
          </p>
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
              <p>Quatre petits outils qui s'utilisent en 30 secondes. 100 % gratuits, sans compte : vos données restent sur votre appareil.</p>
            </header>
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
              <p>Dix kits PDF pour les papiers, les repas, le logement, l'entraide, la fraude et d'autres situations concrètes.</p>
            </header>
            <div className="tool-grid">
              <article className="tool-card">
                <span className="tool-tag">Collection PDF — 40 $ CAD au lieu de 50 $ CAD, aucune taxe ajoutée</span>
                <h3>Collection Sans Honte — 10 kits</h3>
                <p>
                  Les 10 kits Sans Honte en un seul PDF — Papiers, Frigo, Tenir Debout,
                  Seconde Main, Entraide et plus. Téléchargement immédiat après paiement.
                </p>
                <Link to="/pdf/$slug" params={{ slug: "sans-honte-collection" }}>Découvrir la collection PDF →</Link>
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
                <a href="https://tally.so/r/A7AYGW" target="_blank" rel="noopener noreferrer">Demander le bundle →</a>
              </article>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
