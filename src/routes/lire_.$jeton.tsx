import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createSeoHead } from "@/lib/seo";
import { getTomeText } from "@/utils/tomes.functions";

export const Route = createFileRoute("/lire_/$jeton")({
  head: () => createSeoHead({
    title: "Ton tome — À toi l'histoire | HP Outils",
    description: "Ton lien web personnel « À toi l'histoire ».",
    path: "/lire",
    noindex: true,
  }),
  component: Page,
});

type State =
  | { kind: "loading" }
  | { kind: "invalid" }
  | {
      kind: "valid";
      tome: {
        slug: string;
        title: string;
        description: string;
        paragraphes: number;
        fins: number;
        public: string | null;
      };
      html: string;
    };

function Page() {
  const { jeton } = Route.useParams();
  const fetchText = useServerFn(getTomeText);
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchText({ data: { token: jeton } });
        if (cancelled) return;
        if (!res.valid) setState({ kind: "invalid" });
        else setState({ kind: "valid", tome: res.tome, html: res.html });
      } catch {
        if (!cancelled) setState({ kind: "invalid" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [jeton, fetchText]);

  return (
    <section className="subpage-content">
      <div className="container" style={{ maxWidth: 720 }}>
        {state.kind === "loading" && <p>Vérification de ton lien…</p>}
        {state.kind === "invalid" && (
          <>
            <h1>Lien invalide ou révoqué</h1>
            <p>
              Ce lien ne donne plus accès à un tome — il a peut-être été remplacé
              par un nouveau, ou la commande a été remboursée.
            </p>
            <p>
              <Link to="/lire">Recevoir de nouveaux liens par courriel →</Link>
            </p>
            <p>
              Une question ?{" "}
              <a href="mailto:hpoutils.admin@gmail.com">Écrire à la direction humaine</a> —
              un humain de l'équipe répond sous 3 jours ouvrables.
            </p>
          </>
        )}
        {state.kind === "valid" && (
          <>
            <span className="editorial-kicker">À toi l'histoire — lien personnel confirmé</span>
            <h1>{state.tome.title}</h1>
            <p>{state.tome.description}</p>
            <p>
              {state.tome.paragraphes > 0 && (
                <>
                  {state.tome.paragraphes} paragraphes · {state.tome.fins} fins
                  {state.tome.public ? ` · ${state.tome.public}` : ""}
                </>
              )}
            </p>
            <p style={{ background: "#fff7e6", border: "1px solid #e5d9c3", borderRadius: 8, padding: "12px 16px" }}>
              Mode test — aucune vente réelle. Ton lien est confirmé et reste valable
              pour relire ce tome. Le texte complet s'affiche ci-dessous, dans ton
              lecteur personnel.
            </p>
            {/*
              Le texte complet est servi par le serveur APRÈS validation du
              jeton (fonction `getTomeText`) : il n'existe aucune URL publique
              vers ces fichiers. L'iframe est isolée : `sandbox="allow-scripts"`
              sans `allow-same-origin`, pour que les scripts du tome ne puissent
              pas lire la page parente ni l'adresse qui contient le jeton. Les
              sauvegardes locales de 2 tomes, protégées par try/catch côté
              artefact, retombent en progression de session si le stockage est
              indisponible dans ce cadre.
            */}
            <iframe
              title={`Lire ${state.tome.title}`}
              srcDoc={state.html}
              sandbox="allow-scripts"
              style={{ width: "100%", minHeight: 720, height: "80vh", border: "1px solid #e5d9c3", borderRadius: 8 }}
            />
            <p>
              <Link to="/lire">Voir tous les tomes →</Link>
              {" · "}
              <Link to="/univers">L'univers des histoires →</Link>
            </p>
            <p>
              Une question ?{" "}
              <a href="mailto:hpoutils.admin@gmail.com">Écrire à la direction humaine</a> —
              un humain de l'équipe répond sous 3 jours ouvrables.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
