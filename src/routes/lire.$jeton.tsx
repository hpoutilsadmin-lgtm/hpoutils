import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createSeoHead } from "@/lib/seo";
import { getTomeAccess } from "@/utils/tomes.functions";

export const Route = createFileRoute("/lire/$jeton")({
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
    };

function Page() {
  const { jeton } = Route.useParams();
  const access = useServerFn(getTomeAccess);
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await access({ data: { token: jeton } });
        if (cancelled) return;
        if (!res.valid) setState({ kind: "invalid" });
        else setState({ kind: "valid", tome: res.tome });
      } catch {
        if (!cancelled) setState({ kind: "invalid" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [jeton, access]);

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
              Ton lien est confirmé et reste valable pour relire ce tome. Le texte
              complet des tomes est versé progressivement sur cette page : ton lien
              te donnera accès dès qu'il sera en ligne, sans nouvel achat.
            </p>
            <p>
              <Link to="/lire">Voir tous les tomes →</Link>
              {" · "}
              <Link to="/univers">L'univers des histoires →</Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
