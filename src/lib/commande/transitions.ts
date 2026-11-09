// HP ô commande — moteur des missions (lot 1, étape 2, BROUILLON)
// Transitions d'états autorisées et dérivation de l'état réel d'un agent.
//
// Deux règles, sans exception :
// 1. Un changement d'état qui n'est pas dans le graphe est refusé.
// 2. Un état actif n'est affiché que s'il est dérivé d'une exécution
//    enregistrée (voir deriveAgentState). Jamais de texte libre.

import {
  ACTIVITY_TO_STATE,
  type AgentState,
  type Execution,
  type MissionStatus,
  type SubMissionStatus,
} from "./types";

// ---------------------------------------------------------------------------
// Graphe des transitions — missions
// ---------------------------------------------------------------------------

export const MISSION_TRANSITIONS: Record<MissionStatus, MissionStatus[]> = {
  created: ["running", "stopped"],
  running: ["awaiting_approval", "blocked", "completed", "stopped"],
  awaiting_approval: ["running", "blocked", "stopped"],
  blocked: ["running", "stopped"],
  // « completed » et « stopped » sont terminaux : une mission terminée
  // ne repart pas, on en crée une nouvelle.
  completed: [],
  stopped: [],
};

export function isMissionTransitionAllowed(from: MissionStatus, to: MissionStatus): boolean {
  return MISSION_TRANSITIONS[from].includes(to);
}

// ---------------------------------------------------------------------------
// Graphe des transitions — sous-missions
// ---------------------------------------------------------------------------

export const SUB_MISSION_TRANSITIONS: Record<SubMissionStatus, SubMissionStatus[]> = {
  pending: ["running", "stopped"],
  running: ["completed", "blocked", "stopped"],
  completed: [],
  blocked: ["running", "stopped"],
  stopped: [],
};

export function isSubMissionTransitionAllowed(
  from: SubMissionStatus,
  to: SubMissionStatus,
): boolean {
  return SUB_MISSION_TRANSITIONS[from].includes(to);
}

// ---------------------------------------------------------------------------
// État réel d'un agent, dérivé de ses exécutions
// ---------------------------------------------------------------------------

// Une exécution « running » plus vieille que cette durée est traitée
// comme bloquée : une invocation Worker peut mourir sans fermer sa
// ligne, et l'affichage ne doit jamais prétendre qu'un agent travaille
// quand plus rien ne tourne. C'est un garde-fou d'affichage, pas une
// preuve de travail.
export const EXECUTION_STALE_AFTER_MS = 10 * 60 * 1000; // 10 minutes

export interface AgentStateInput {
  // Exécutions de l'agent, plus récente d'abord.
  executions: Pick<Execution, "activity" | "status" | "started_at" | "ended_at">[];
  // L'agent a une sous-mission dans une mission en attente d'approbation.
  hasSubMissionAwaitingApproval: boolean;
  // L'agent a une sous-mission bloquée.
  hasSubMissionBlocked: boolean;
  // Sa dernière exécution fermée s'est terminée normalement.
  lastExecutionCompleted: boolean;
  now?: Date;
}

export function deriveAgentState(input: AgentStateInput): AgentState {
  const nowMs = (input.now ?? new Date()).getTime();
  const running = input.executions.find((e) => e.status === "running");

  if (running) {
    const startedMs = new Date(running.started_at).getTime();
    if (Number.isFinite(startedMs) && nowMs - startedMs > EXECUTION_STALE_AFTER_MS) {
      return "bloque";
    }
    return ACTIVITY_TO_STATE[running.activity];
  }

  if (input.hasSubMissionAwaitingApproval) return "en_attente_approbation";
  if (input.hasSubMissionBlocked) return "bloque";
  if (input.lastExecutionCompleted) return "termine";
  return "disponible";
}
