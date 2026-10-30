import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  getPasseursSubscriptionByJeton,
  cancelPasseursSubscription,
  type PasseursFormule,
} from "@/utils/passeurs.functions";
import { getStripeEnvironment } from "@/lib/stripe";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/passeurs/annuler/$jeton")({
  head: () =>
    createSeoHead({
      title: "Annuler mon abonnement Passeurs — HP Outils",
      description:
        "Annulez votre abonnement Les Passeurs en un clic. Effet à la fin de la période déjà payée, sans frais.",
      path: "/passeurs/annuler",
      noindex: true,
    }),
  component: Page,
});

const FORMULE_LABEL: Record<PasseursFormule, string> = {
  mensuel: "3 $ CAD par mois",
  annuel: "28 $ CAD par année",
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

type State =
  | { kind: "loading" }
  | { kind: "not_found" }
  | {
      kind: "ready";
      formule: PasseursFormule;
      dateFinPeriode: string;
      statut: "actif" | "annule";
    }
  | {
      kind: "done";
      formule: PasseursFormule;
      dateFinPeriode: string;
    }
  | { kind: "error" };

function Page() {
  const { jeton } = Route.useParams();
  const lookup = useServerFn(getPasseursSubscriptionByJeton);
  const cancel = useServerFn(cancelPasseursSubscription);
  const [state, setState] = useState<State>({ kind: "loading" });
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await lookup({ data: { jeton } });
        if (!alive) return;
        if (!res.found) {
          setState({ kind: "not_found" });
        } else if (res.statut === "annule") {
          setState({
            kind: "done",
            formule: res.formule,
            dateFinPeriode: res.dateFinPeriode,
          });
        } else {
          setState({
            kind: "ready",
            formule: res.formule,
            dateFinPeriode: res.dateFinPeriode,
            statut: res.statut,
          });
        }
      } catch {
        if (alive) setState({ kind: "error" });
      }
    })();
    return () => {
      alive = false;
    };
  }, [jeton]);

  async function onConfirm() {
    setCancelling(true);
    try {
      const res = await cancel({
        data: { jeton, environment: getStripeEnvironment() },
      });
      if (res.ok) {
        setState({
          kind: "done",
          formule: res.formule,
          dateFinPeriode: res.dateFinPeriode,
        });
      } else {
        setState({ kind: "error" });
      }
    } catch {
      setState({ kind: "error" });
    } finally {
      setCancelling(false);
    }
  }

  const cardStyle: React.CSSProperties = {
    maxWidth: 640,
    margin: "48px auto",
    padding: 28,
    border: "1px solid #e0d8cf",
    borderRadius: 8,
    background: "#fffdf8",
  };

  if (state.kind === "loading") {
    return (
      <section className="subpage-content">
        <div className="container">
          <div style={cardStyle}>
            <p>Chargement…</p>
          </div>
        </div>
      </section>
    );
  }

  if (state.kind === "not_found") {
    return (
      <section className="subpage-content">
        <div className="container">
          <div style={cardStyle}>
            <h1>Lien invalide</h1>
            <p>
              Ce lien d'annulation ne correspond à aucun abonnement. Si vous
              pensez qu'il s'agit d'une erreur, écrivez à la direction
              humaine : une personne vous répond sous 3 jours ouvrables.
            </p>
            <Link to="/les-passeurs">Retour aux Passeurs</Link>
          </div>
        </div>
      </section>
    );
  }

  if (state.kind === "error") {
    return (
      <section className="subpage-content">
        <div className="container">
          <div style={cardStyle}>
            <h1>Un problème est survenu</h1>
            <p>
              L'annulation n'a pas pu être traitée pour l'instant. Rien n'a
              été modifié. Réessayez dans quelques minutes, ou écrivez à la
              direction humaine : une personne vous répond sous 3 jours
              ouvrables.
            </p>
            <Link to="/les-passeurs">Retour aux Passeurs</Link>
          </div>
        </div>
      </section>
    );
  }

  if (state.kind === "done") {
    return (
      <section className="subpage-content">
        <div className="container">
          <div style={cardStyle}>
            <span className="mini-note">Les Passeurs</span>
            <h1 style={{ marginTop: 8 }}>Annulation confirmée</h1>
            <p>
              Votre abonnement ({FORMULE_LABEL[state.formule]}) est annulé.
              Vous gardez l'accès aux feuilles Passeurs parues jusqu'au{" "}
              <strong>{formatDate(state.dateFinPeriode)}</strong>, puis
              l'abonnement s'arrête. Sans frais, sans relance.
            </p>
            <p>
              Merci d'avoir fait passer le savoir — la porte vous reste
              ouverte si vous voulez revenir.
            </p>
            <Link to="/">Retour à l'accueil</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="subpage-content">
      <div className="container">
        <div style={cardStyle}>
          <span className="mini-note">Les Passeurs</span>
          <h1 style={{ marginTop: 8 }}>Annuler mon abonnement</h1>
          <p>
            Votre abonnement : <strong>{FORMULE_LABEL[state.formule]}</strong>.
          </p>
          <p>
            L'annulation prend effet à la fin de la période déjà payée, soit
            le <strong>{formatDate(state.dateFinPeriode)}</strong>. Vous
            gardez l'accès aux feuilles Passeurs parues jusqu'à cette date.
            Sans frais, sans pénalité, sans relance.
          </p>
          <p>
            Un seul clic suffit — pas de courriel à rédiger, pas de
            questionnaire.
          </p>
          <button
            type="button"
            onClick={onConfirm}
            disabled={cancelling}
            className="btn-primary"
            style={{ minWidth: 56, minHeight: 56, fontSize: 17 }}
          >
            {cancelling ? "Annulation en cours…" : "Confirmer l'annulation"}
          </button>
          <p style={{ marginTop: 16 }}>
            <Link to="/les-passeurs">Non, je garde mon abonnement</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
