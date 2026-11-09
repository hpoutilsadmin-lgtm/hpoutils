// HP ô commande — moteur des missions (lot 1, étape 2, BROUILLON)
// Matrice des permissions (partie 3, §6).
//
// - Aucun agent ne reçoit toutes les permissions.
// - « decide_approval » n'appartient à aucun agent : seul HP décide
//   d'une approbation, et la décision est consignée.
// - Les actions sensibles ne sont pas des permissions du tout : aucun
//   agent ne peut les exécuter. Elles n'existent que comme demandes
//   d'approbation (voir types.ts). Au lot 1, le moteur ne contient
//   AUCUN code qui envoie un courriel, publie, achète, rembourse,
//   déploie ou supprime : une approbation accordée ne déclenche rien
//   d'automatique, elle est consignée et c'est tout.

import type { AgentRole, SensitiveAction } from "./types";

export type Permission =
  | "read_mission"
  | "split_mission"
  | "record_result"
  | "request_approval"
  | "read_journal"
  | "stop_mission";

// « decide_approval » est volontairement absent de cette liste :
// ce n'est pas une permission d'agent, c'est le droit d'HP seul.
export const AGENT_PERMISSIONS: Record<AgentRole, Permission[]> = {
  // Le directeur découpe les missions et peut demander l'arrêt.
  director: [
    "read_mission",
    "split_mission",
    "record_result",
    "request_approval",
    "read_journal",
    "stop_mission",
  ],
  // Les spécialistes lisent leur mission, rendent leurs résultats
  // et peuvent demander une approbation. Rien d'autre.
  archivist: ["read_mission", "record_result", "request_approval", "read_journal"],
  technician: ["read_mission", "record_result", "request_approval", "read_journal"],
  quality: ["read_mission", "record_result", "request_approval", "read_journal"],
};

export const SENSITIVE_ACTIONS: SensitiveAction[] = [
  "email",
  "purchase",
  "refund",
  "publish",
  "deploy",
  "delete",
  "payment",
];

export function canPerform(role: AgentRole, permission: Permission): boolean {
  return AGENT_PERMISSIONS[role].includes(permission);
}

export function assertCanPerform(role: AgentRole, permission: Permission): void {
  if (!canPerform(role, permission)) {
    throw new Error(`Permission refusée : le rôle ${role} ne peut pas ${permission}.`);
  }
}
