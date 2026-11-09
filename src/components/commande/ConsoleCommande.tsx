// HP ô commande — moteur des missions (lot 1, étape 2, BROUILLON)
// Console minimale, texte d'abord. Aucune animation (pas de PixiJS à
// ce stade), aucune nouvelle librairie : React seulement, style repris
// de hp.css + shadcn/ui au moment de l'intégration.
//
// La console ne fait qu'afficher ce que les fonctions serveur lui
// donnent. Les états des agents viennent de listAgentStates, c'est-à-
// dire des exécutions enregistrées — jamais d'un texte déclaré.
// Elle n'apparaît ni dans le menu ni dans le pied : adresse directe
// seulement, derrière le lien secret (voir src/routes/commande.tsx).

import {
  AGENT_ROLE_LABELS,
  AGENT_STATE_LABELS,
  SENSITIVE_ACTION_LABELS,
  type ActivityLogEntry,
  type AgentRole,
  type AgentState,
  type Approval,
  type Mission,
} from "@/lib/commande/types";

export interface ConsoleData {
  missions: Mission[];
  agentStates: { role: AgentRole; state: AgentState }[];
  approvals: Approval[];
  activity: ActivityLogEntry[];
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("fr-CA", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function ConsoleCommande({ data }: { data: ConsoleData }) {
  return (
    <div>
      <section aria-label="Agents">
        <h2>Agents — états réels</h2>
        <p>
          Ces états sont dérivés des exécutions enregistrées. Un agent n&apos;est jamais affiché
          actif sans exécution réelle en cours.
        </p>
        <ul>
          {data.agentStates.map(({ role, state }) => (
            <li key={role}>
              <strong>{AGENT_ROLE_LABELS[role]}</strong> — {AGENT_STATE_LABELS[state]}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Missions en cours">
        <h2>Missions</h2>
        {data.missions.length === 0 ? (
          <p>Aucune mission pour le moment.</p>
        ) : (
          <ul>
            {data.missions.map((mission) => (
              <li key={mission.id}>
                <strong>{mission.title}</strong> — {mission.status}
                {mission.stop_requested ? " — arrêt demandé" : ""}
                <br />
                <span>{mission.instruction}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-label="Approbations en attente">
        <h2>Approbations en attente</h2>
        {data.approvals.length === 0 ? (
          <p>Aucune approbation en attente.</p>
        ) : (
          <ul>
            {data.approvals.map((approval) => (
              <li key={approval.id}>
                <strong>{SENSITIVE_ACTION_LABELS[approval.action]}</strong> — {approval.reason}
              </li>
            ))}
          </ul>
        )}
        <p>
          Une approbation accordée est consignée ; elle ne déclenche rien d&apos;automatique (aucun
          envoi, aucune publication, aucun paiement dans le moteur).
        </p>
      </section>

      <section aria-label="Journal">
        <h2>Journal</h2>
        {data.activity.length === 0 ? (
          <p>Journal vide.</p>
        ) : (
          <ul>
            {data.activity.map((entry) => (
              <li key={entry.id}>
                {formatDate(entry.created_at)} — {entry.message}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
