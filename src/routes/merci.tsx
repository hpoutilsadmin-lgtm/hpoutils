import { createFileRoute, Link } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";
import extrait from "@/assets/extrait-frigo-sans-honte.pdf.asset.json";

export const Route = createFileRoute("/merci")({
  head: () => {
    const head = createSeoHead({
      title: "Merci — votre extrait Frigo Sans Honte | HP Outils",
      description: "Merci pour ton inscription aux nouveautés HP. Télécharge l'extrait gratuit du kit Frigo Sans Honte.",
      path: "/merci",
    });
    return { ...head, meta: [...(head.meta ?? []), { name: "robots", content: "noindex" }] };
  },
  component: Page,
});

function Page() {
  return (
    <section className="editorial-hero">
      <div className="container">
        <p className="page-kicker">Inscription confirmée</p>
        <h1>Merci !</h1>
        <p className="lead">Comme promis, voici ton extrait gratuit du kit Frigo Sans Honte : des repères concrets pour composer avec ce que tu as déjà.</p>
        <div className="lead-actions">
          <a className="action-btn" href={extrait.url} download="Extrait-gratuit-Frigo-Sans-Honte.pdf" target="_blank" rel="noopener">
            Télécharger l'extrait gratuit (PDF)
          </a>
          <Link className="outline-btn" to="/sans-honte">Voir la collection Sans Honte</Link>
        </div>
      </div>
    </section>
  );
}
