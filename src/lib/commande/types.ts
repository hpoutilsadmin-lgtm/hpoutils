// HP ô commande — moteur des missions (lot 1, étape 2, BROUILLON)
// Structures de données. Rien ici ne touche au site en production :
// ces fichiers vivent dans le dossier de staging et seront intégrés
// en branche séparée, sans déploiement, sur go d'HP.
//
// Décisions appliquées (HP, 8 nov. 2026) :
// - Q1 : moteur maison TypeScript (pas d'OpenAI Agents SDK)
// - Q3 : persistance Supabase, RLS « service seulement »
// - Q4 : tout dans le Worker Cloudflare, missions découpées en étapes courtes
// - Q6 : console par lien secret (adresse directe), pas de compte
//
// Règle d'or (partie 3, §3) : un agent ne peut jamais être affiché
// actif sans exécution réelle. Les états affichés sont toujours dérivés
// des lignes d'exécution en base (voir transitions.ts), jamais d'un
// texte libre venu du navigateur.

// ---------------------------------------------------------------------------
// Agents — 4 rôles (partie 3, §1)
// Le rôle du directeur s'appelle « director » dans les structures.
// Ni « Gaspard » ni « Gepeto » ne sont codés en dur ici : la répartition
// entre les deux reste à trancher par HP (point ouvert, partie 5).
// ---------------------------------------------------------------------------

export type AgentRole = "director" | "archivist" | "technician" | "quality";

export const AGENT_ROLES: AgentRole[] = ["director", "archivist", "technician", "quality"];

export const AGENT_ROLE_LABELS: Record<AgentRole, string> = {
  director: "Directeur et coordinateur",
  archivist: "Mémoire et documentation",
  technician: "Développement",
  quality: "Qualité et sécurité",
};

export interface Agent {
  id: string;
  role: AgentRole;
  created_at: string;
}

// ---------------------------------------------------------------------------
// États réels des agents — les 8 états (partie 3, §3)
// Un état « actif » (recherche, production, collaboration, vérification)
// n'existe que pendant une exécution enregistrée. Sinon l'agent est
// disponible, bloqué, en attente d'approbation ou terminé.
// ---------------------------------------------------------------------------

export type AgentState =
  | "disponible"
  | "en_recherche"
  | "en_production"
  | "en_collaboration"
  | "en_verification"
  | "bloque"
  | "en_attente_approbation"
  | "termine";

export const AGENT_STATE_LABELS: Record<AgentState, string> = {
  disponible: "Disponible",
  en_recherche: "En recherche",
  en_production: "En production",
  en_collaboration: "En collaboration",
  en_verification: "En vérification",
  bloque: "Bloqué",
  en_attente_approbation: "En attente d'approbation",
  termine: "Terminé",
};

// Activité d'une exécution : c'est elle qui donne l'état actif affiché.
export type AgentActivity = "recherche" | "production" | "collaboration" | "verification";

export const ACTIVITY_TO_STATE: Record<AgentActivity, AgentState> = {
  recherche: "en_recherche",
  production: "en_production",
  collaboration: "en_collaboration",
  verification: "en_verification",
};

// ---------------------------------------------------------------------------
// Missions et sous-missions
// Une mission est découpée en sous-missions, une par agent. Chaque
// sous-mission est une unité de travail courte : elle s'exécute en un
// seul appel serveur (limite du Worker Cloudflare, Q4). Une mission
// longue se découpe en davantage d'étapes, jamais en un appel long.
// ---------------------------------------------------------------------------

export type MissionStatus =
  | "created"
  | "running"
  | "awaiting_approval"
  | "blocked"
  | "completed"
  | "stopped";

export type SubMissionStatus = "pending" | "running" | "completed" | "blocked" | "stopped";

export interface Mission {
  id: string;
  title: string;
  instruction: string;
  status: MissionStatus;
  // « Arrêter » : drapeau vérifié avant chaque étape suivante. Il ne
  // peut pas tuer une invocation Worker déjà en cours (voir LOT.md).
  stop_requested: boolean;
  // Avancement du découpage : étape courante / nombre d'étapes prévues.
  step_index: number;
  step_count: number;
  // Seul HP crée une mission, par la console (lien secret).
  created_by: "hp";
  created_at: string;
  updated_at: string;
}

export interface SubMission {
  id: string;
  mission_id: string;
  agent_role: AgentRole;
  title: string;
  instruction: string;
  status: SubMissionStatus;
  created_at: string;
  updated_at: string;
}

// ---------------------------------------------------------------------------
// Exécutions — la preuve qu'un agent travaille réellement
// Une exécution est ouverte quand un agent commence une étape, fermée
// quand il la termine (ou quand elle échoue). Sans ligne « running »,
// aucun état actif ne peut être affiché.
// ---------------------------------------------------------------------------

export type ExecutionStatus = "running" | "completed" | "failed";

export interface Execution {
  id: string;
  sub_mission_id: string;
  agent_role: AgentRole;
  activity: AgentActivity;
  status: ExecutionStatus;
  started_at: string;
  ended_at: string | null;
  error: string | null;
}

// ---------------------------------------------------------------------------
// Résultats et preuves
// Un résultat n'existe que s'il est enregistré avec ses preuves.
// « J'ai vérifié » n'est vrai que si une vérification a réellement
// été effectuée et consignée (partie 5, §5).
// ---------------------------------------------------------------------------

export interface Result {
  id: string;
  mission_id: string;
  sub_mission_id: string;
  agent_role: AgentRole;
  summary: string;
  details: string;
  created_at: string;
}

export type ProofKind = "text" | "url" | "file_ref" | "diff" | "capture";

export interface Proof {
  id: string;
  result_id: string;
  kind: ProofKind;
  label: string;
  // Texte de la preuve, adresse, chemin de fichier ou contenu de diff.
  content: string;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Permissions et approbations
// Les actions sensibles (courriel, achat, remboursement, publication,
// déploiement, suppression, paiement) ne sont JAMAIS des permissions
// d'agent : elles n'existent que comme demandes d'approbation, et seul
// HP décide (voir permissions.ts).
// ---------------------------------------------------------------------------

export type SensitiveAction =
  | "email"
  | "purchase"
  | "refund"
  | "publish"
  | "deploy"
  | "delete"
  | "payment";

export const SENSITIVE_ACTION_LABELS: Record<SensitiveAction, string> = {
  email: "Envoyer un courriel",
  purchase: "Effectuer un achat",
  refund: "Effectuer un remboursement",
  publish: "Publier",
  deploy: "Déployer",
  delete: "Supprimer des données",
  payment: "Opération de paiement",
};

export type ApprovalStatus = "pending" | "approved" | "refused";

export interface Approval {
  id: string;
  mission_id: string;
  action: SensitiveAction;
  reason: string;
  status: ApprovalStatus;
  // Seul HP décide. null tant que la décision n'est pas prise.
  decided_by: "hp" | null;
  decided_at: string | null;
  note: string | null;
}

// ---------------------------------------------------------------------------
// Journal d'activité — une entrée par fait, jamais de texte inventé
// Chaque mission conserve ses entrées, ses résultats et ses erreurs
// (partie 3, §6). Lecture par fonctions serveur seulement.
// ---------------------------------------------------------------------------

export interface ActivityLogEntry {
  id: string;
  mission_id: string;
  agent_role: AgentRole | null;
  kind: string;
  message: string;
  created_at: string;
}
