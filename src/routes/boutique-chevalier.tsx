import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createSeoHead } from "@/lib/seo";
import { getStripeEnvironment } from "@/lib/stripe";
import {
  CHEVALIER_PACKS,
  CHEVALIER_SAVE_KEY,
  CHEVALIER_VENTE_ACTIVE,
  appliquerCreditChevalier,
  bonusChevalierLabel,
  formatChevalierPrix,
  getChevalierPack,
  type ChevalierSaveLike,
} from "@/lib/chevalier-boutique";
import {
  createChevalierCheckoutSession,
  verifierSessionChevalier,
} from "@/utils/chevalier.functions";

export const Route = createFileRoute("/boutique-chevalier")({
  validateSearch: (search: Record<string, unknown>): { session_id?: string } => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  head: () =>
    createSeoHead({
      title: "Boutique Chevalier — pierres du jeu | HP Outils",
      description:
        "Les paquets de pierres de Chevalier du fleuve : 2,99 $ à 19,99 $ CAD, aucune taxe ajoutée. Les pierres se gagnent aussi en jouant.",
      path: "/boutique-chevalier",
    }),
  component: Page,
});

type CreditState =
  | { kind: "idle" }
  | { kind: "verification" }
  | { kind: "attente" }
  | { kind: "credite"; packNom: string; gems: number }
  | { kind: "deja"; packNom: string }
  | { kind: "erreur"; message: string };

/**
 * Boutique Chevalier — page dédiée, hors panier (les paquets ne sont
 * pas des PDF). La boutique en jeu renvoie ici ; le jeu lui-même ne
 * crédite jamais un achat : seul ce retour, après vérification serveur
 * du paiement, écrit dans la sauvegarde locale.
 *
 * Livraison, limites dites franchement sur la page :
 * - même appareil et même navigateur que le jeu, sinon les pierres
 *   vont dans une sauvegarde vide sur cet appareil-là ;
 * - une session ne crédite qu'une fois (recharger ne re-crédite pas) ;
 * - si la sauvegarde locale est effacée, les pierres achetées le sont
 *   aussi — il n'y a pas de compte pour les récupérer. C'est la limite
 *   du jeu sans compte, et c'est pourquoi l'activation demande une
 *   validation avant toute vente réelle.
 */
function Page() {
  const { session_id } = Route.useSearch();
  const verifier = useServerFn(verifierSessionChevalier);
  const creerSession = useServerFn(createChevalierCheckoutSession);
  const [credit, setCredit] = useState<CreditState>({ kind: "idle" });
  const [busy, setBusy] = useState<string | null>(null);
  const [erreurAchat, setErreurAchat] = useState<string | null>(null);

  useEffect(() => {
    if (!session_id) return;
    let annule = false;
    (async () => {
      setCredit({ kind: "verification" });
      try {
        const res = await verifier({ data: { sessionId: session_id } });
        if (annule) return;
        if (res.status === "pending") {
          setCredit({ kind: "attente" });
          return;
        }
        const pack = getChevalierPack(res.packId);
        if (!pack) throw new Error("Paquet Chevalier introuvable");
        let brut: string | null = null;
        try {
          brut = window.localStorage.getItem(CHEVALIER_SAVE_KEY);
        } catch {
          throw new Error("Stockage local indisponible sur cet appareil");
        }
        let sauvegarde: ChevalierSaveLike;
        if (brut === null) {
          sauvegarde = {
            version: 1,
            fait: {},
            rencontres: [],
            equip: {},
            gems: 0,
            coffre: { f: 0, e: 0 },
            forge: false,
            contact: false,
            bestLibre: 0,
            son: true,
          };
        } else {
          let parsed: unknown;
          try {
            parsed = JSON.parse(brut);
          } catch {
            throw new Error(
              "Sauvegarde du jeu illisible sur cet appareil — rien n'a été crédité. Écris à la direction humaine, on réglera ça.",
            );
          }
          if (typeof parsed !== "object" || parsed === null) {
            throw new Error("Sauvegarde du jeu illisible — rien n'a été crédité.");
          }
          sauvegarde = parsed as ChevalierSaveLike;
        }
        const { save, dejaCredite } = appliquerCreditChevalier(
          sauvegarde,
          pack.id,
          res.sessionId,
        );
        if (dejaCredite) {
          setCredit({ kind: "deja", packNom: pack.nom });
          return;
        }
        try {
          window.localStorage.setItem(CHEVALIER_SAVE_KEY, JSON.stringify(save));
        } catch {
          throw new Error(
            "Impossible d'écrire dans la sauvegarde — rien n'a été crédité.",
          );
        }
        setCredit({ kind: "credite", packNom: pack.nom, gems: pack.gems });
      } catch (e: unknown) {
        if (annule) return;
        setCredit({
          kind: "erreur",
          message: e instanceof Error ? e.message : "Erreur inconnue",
        });
      }
    })();
    return () => {
      annule = true;
    };
  }, [session_id, verifier]);

  const acheter = async (packId: string) => {
    if (busy) return;
    setErreurAchat(null);
    setBusy(packId);
    try {
      const result = await creerSession({
        data: { packId, environment: getStripeEnvironment() },
      });
      if ("error" in result) {
        setErreurAchat(result.error);
        return;
      }
      if (
        typeof result.checkoutUrl === "string" &&
        result.checkoutUrl.startsWith("https://")
      ) {
        window.location.href = result.checkoutUrl;
        return;
      }
      setErreurAchat("Le paiement n'a pas pu démarrer.");
    } catch {
      setErreurAchat("Le paiement n'a pas pu démarrer.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <section className="editorial-hero">
        <div className="container">
          <span className="editorial-kicker">Chevalier du fleuve</span>
          <h1>
            La <em>boutique</em> du jeu.
          </h1>
          <p className="lead">
            Des pierres pour t'équiper plus vite et plus fort. Les pierres
            se gagnent aussi en jouant : récompenses de mission, filons
            des terriers, trocs avec les Gybbys. Tout peut se gagner en
            jouant. Prix en $ CAD, aucune taxe ajoutée.
          </p>
          <div className="lead-actions">
            <a
              href="/apps/chevalier-du-fleuve/chevalier-du-fleuve-v1.4.html"
              className="btn-ghost"
            >
              Jouer à Chevalier du fleuve →
            </a>
          </div>
        </div>
      </section>

      <section className="three-pillars">
        <div className="container" style={{ maxWidth: 720 }}>
          {credit.kind === "verification" && (
            <p>Confirmation de ton paiement…</p>
          )}
          {credit.kind === "attente" && (
            <p>
              Ton paiement est en cours de traitement. Rafraîchis cette
              page dans un instant.
            </p>
          )}
          {credit.kind === "credite" && (
            <p role="status" style={{ background: "#eef6e8", border: "1px solid #b9d8a8", borderRadius: 8, padding: "12px 16px" }}>
              Merci ! {credit.gems} pierres du paquet « {credit.packNom} »
              ont été ajoutées à ta partie, sur cet appareil. Retourne
              dans le jeu : elles sont dans ton coffre. Si le paquet
              incluait un équipement offert, il s'appliquera au héros
              choisi quand tu ouvriras l'armurerie.
            </p>
          )}
          {credit.kind === "deja" && (
            <p>
              Ce paquet (« {credit.packNom} ») a déjà été crédité à ta
              partie. Recharger la page ne re-crédite pas.
            </p>
          )}
          {credit.kind === "erreur" && (
            <p role="alert" style={{ color: "#8a1f1f" }}>
              {credit.message}
            </p>
          )}

          {!CHEVALIER_VENTE_ACTIVE && (
            <p
              style={{
                background: "#fff7e6",
                border: "1px solid #e5d9c3",
                borderRadius: 8,
                padding: "12px 16px",
              }}
            >
              Bientôt en vente : les paquets ci-dessous sont prêts, mais
              aucun paiement n'est pris pour l'instant — la livraison
              automatique est en cours de validation.
            </p>
          )}
          {erreurAchat && (
            <p role="alert" style={{ color: "#8a1f1f" }}>
              {erreurAchat}
            </p>
          )}

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Paquet</th>
                  <th>Prix</th>
                  <th>Contenu</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {CHEVALIER_PACKS.map((pack) => {
                  const bonus = bonusChevalierLabel(pack.bonusRar);
                  return (
                    <tr key={pack.id}>
                      <td>💎 {pack.nom}</td>
                      <td>{formatChevalierPrix(pack)}</td>
                      <td>
                        {pack.gems} pierres
                        {bonus ? ` + un équipement ${bonus} offert` : ""}
                      </td>
                      <td>
                        {CHEVALIER_VENTE_ACTIVE ? (
                          <button
                            type="button"
                            className="btn-primary"
                            disabled={busy === pack.id}
                            onClick={() => acheter(pack.id)}
                          >
                            {busy === pack.id ? "Redirection…" : "Acheter"}
                          </button>
                        ) : (
                          <span>Bientôt en vente</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p style={{ marginTop: 24, fontSize: 14, opacity: 0.85 }}>
            Livraison : après le paiement, reviens sur cette page avec le
            même appareil et le même navigateur que ton jeu — les pierres
            sont ajoutées à ta partie sur cet appareil. Il n'y a pas de
            compte : si tu effaces la sauvegarde du jeu, les pierres
            achetées partent avec elle. Un problème ? Écris à la direction
            humaine, une réponse d'humain sous 3 jours ouvrables.
          </p>
          <p style={{ fontSize: 14 }}>
            <Link to="/prix">Voir tous les prix →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
