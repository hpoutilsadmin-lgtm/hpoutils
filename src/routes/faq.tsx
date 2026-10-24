import { createFileRoute } from "@tanstack/react-router";
import { createSeoHead } from "@/lib/seo";
import { FAQ_ENTRIES } from "@/lib/faq-data";

/* Questions fréquentes (item nº 9, vague 1) : les réponses qu'HGPTO
   donne déjà aux visiteurs, réunies en page publique. Contenu =
   src/lib/faq-data.ts — le rituel du lundi (questions « Pour HP »
   validées par HP) y verse les nouvelles réponses par simple
   édition du fichier de données. Schéma FAQPage pour les moteurs. */
export const Route = createFileRoute("/faq")({
  head: () => ({
    ...createSeoHead({
      title: "Questions fréquentes — HP Outils",
      description:
        "Prix des kits et des livres, taxes, paiement, téléchargement, ateliers, Passeurs de savoir : les réponses d'HP Outils aux questions qu'on nous pose le plus souvent.",
      path: "/faq",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ENTRIES.map((e) => ({
            "@type": "Question",
            name: e.question,
            acceptedAnswer: { "@type": "Answer", text: e.reponse },
          })),
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <section className="subpage-content">
      <div className="container" style={{ maxWidth: 820 }}>
        <span className="editorial-kicker">On nous demande souvent</span>
        <h1>Questions fréquentes</h1>
        <p className="lead" style={{ maxWidth: 640 }}>
          Les vraies réponses d'HP Outils — les mêmes qu'HGPTO, le petit
          robot du site, donne aux visiteurs. Une question qui n'est pas
          ici ? Écris à{" "}
          <a href="mailto:hpoutils.admin@gmail.com">
            hpoutils.admin@gmail.com
          </a>{" "}
          : un humain te répond.
        </p>
        {FAQ_ENTRIES.map((e) => (
          <article key={e.question} style={{ marginTop: 30 }}>
            <h2 style={{ fontSize: 22 }}>{e.question}</h2>
            <p style={{ lineHeight: 1.65 }}>{e.reponse}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
