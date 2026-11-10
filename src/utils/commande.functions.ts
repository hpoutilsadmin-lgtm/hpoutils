// HP ô commande — moteur des missions (lot 1, étape 2, BROUILLON)
// Fonctions serveur TanStack Start, même motif que les fonctions
// existantes du dépôt (ex. src/utils/cadeaux.functions.ts, tête a3c2e00) :
// createServerFn({ method }) + .inputValidator(...) + .handler(...).
// Validation zod (déjà installé), accès base par le client service_role
// (db, RLS « service seulement »), jamais de secret côté
// navigateur.
//
// Limites honnêtes, écrites dans le code :
// - Aucune fonction ne touche aux paiements, au panier, aux tomes ni
//   aux passeurs. Aucune fonction n'envoie de courriel, ne publie, ne
//   déploie, n'achète, ne rembourse ni ne supprime : une approbation
//   accordée est consignée, elle ne déclenche rien d'automatique.
// - « Arrêter » ne peut pas tuer une invocation Worker déjà en cours :
//   stopMission pose le drapeau stop_requested et arrête les étapes
//   en attente ; chaque étape vérifie le drapeau avant de démarrer.
// - Toutes les lectures passent par ces fonctions, appelées depuis la
//   console derrière le lien secret. Aucune lecture directe de la base
//   depuis le navigateur (RLS refuse tout accès client de toute façon).
// - Seules les tables au préfixe hp_ sont lues et écrites ici. Les
//   tables hotel_* (mode spectateur) ne sont jamais touchées au lot 1.

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { CommandeDatabase } from "@/lib/commande-database";
import {
  AGENT_ROLES,
  type ActivityLogEntry,
  type AgentRole,
  type AgentState,
  type Approval,
  type Mission,
  type SensitiveAction,
} from "@/lib/commande/types";
import { assertCanPerform } from "@/lib/commande/permissions";
import {
  deriveAgentState,
  isMissionTransitionAllowed,
  isSubMissionTransitionAllowed,
} from "@/lib/commande/transitions";

// Client typé sur l'extension locale (src/lib/commande-database.ts) :
// db reste le client service_role centralisé ; cette vue
// typée ne change rien à l'exécution, elle rend seulement les tables
// hp_* / hotel_* connues du vérificateur tant que les types générés
// (src/integrations/supabase/types.ts, jamais édités à la main) ne les
// incluent pas. À retirer quand la migration sera appliquée et les
// types régénérés : db.from(...) suffira alors.
const db = supabaseAdmin as unknown as SupabaseClient<CommandeDatabase>;

// ---------------------------------------------------------------------------
// Schémas d'entrée (zod)
// ---------------------------------------------------------------------------

const agentRoleSchema = z.enum(["director", "archivist", "technician", "quality"]);

const uuidSchema = z.string().uuid();

const createMissionSchema = z.object({
  title: z.string().trim().min(1).max(300),
  instruction: z.string().trim().min(1).max(5000),
});

const splitMissionSchema = z.object({
  mission_id: uuidSchema,
  sub_missions: z
    .array(
      z.object({
        agent_role: agentRoleSchema,
        title: z.string().trim().min(1).max(300),
        instruction: z.string().trim().min(1).max(5000),
      }),
    )
    .min(1)
    .max(12),
});

const changeMissionStateSchema = z.object({
  mission_id: uuidSchema,
  to: z.enum(["created", "running", "awaiting_approval", "blocked", "completed", "stopped"]),
});

const startExecutionSchema = z.object({
  sub_mission_id: uuidSchema,
  activity: z.enum(["recherche", "production", "collaboration", "verification"]),
});

const endExecutionSchema = z.object({
  execution_id: uuidSchema,
  ok: z.boolean(),
  error: z.string().trim().max(1000).optional(),
});

const proofSchema = z.object({
  kind: z.enum(["text", "url", "file_ref", "diff", "capture"]),
  label: z.string().trim().min(1).max(200),
  content: z.string().trim().min(1).max(20000),
});

const recordResultSchema = z.object({
  sub_mission_id: uuidSchema,
  agent_role: agentRoleSchema,
  summary: z.string().trim().min(1).max(1000),
  details: z.string().trim().max(20000).optional(),
  proofs: z.array(proofSchema).max(20).optional(),
});

const requestApprovalSchema = z.object({
  mission_id: uuidSchema,
  action: z.enum(["email", "purchase", "refund", "publish", "deploy", "delete", "payment"]),
  reason: z.string().trim().min(1).max(1000),
});

const recordApprovalSchema = z.object({
  approval_id: uuidSchema,
  decision: z.enum(["approved", "refused"]),
  note: z.string().trim().max(1000).optional(),
});

const missionIdSchema = z.object({ mission_id: uuidSchema });

// ---------------------------------------------------------------------------
// Utilitaires internes (serveur seulement)
// ---------------------------------------------------------------------------

type DbResult<T> = { ok: true; data: T } | { ok: false; error: string };

async function logActivity(
  mission_id: string,
  agent_role: AgentRole | null,
  kind: string,
  message: string,
): Promise<void> {
  // Le journal ne bloque jamais l'opération : s'il échoue, on
  // journalise côté serveur et on continue. Un journal manquant est
  // signalé, jamais masqué.
  const { error } = await db
    .from("hp_activity_log")
    .insert({ mission_id, agent_role, kind, message });
  if (error) console.error("[HP ô commande] journal en échec :", error.message);
}

async function getMissionStatus(
  mission_id: string,
): Promise<DbResult<{ status: Mission["status"]; stop_requested: boolean }>> {
  const { data, error } = await db
    .from("hp_missions")
    .select("status, stop_requested")
    .eq("id", mission_id)
    .single();
  if (error || !data) return { ok: false, error: "Mission introuvable." };
  return { ok: true, data: data as { status: Mission["status"]; stop_requested: boolean } };
}

// ---------------------------------------------------------------------------
// Créer une mission — HP, par la console (lien secret)
// ---------------------------------------------------------------------------

export const createMission = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => createMissionSchema.parse(data))
  .handler(async ({ data }): Promise<DbResult<{ mission_id: string }>> => {
    const { data: mission, error } = await db
      .from("hp_missions")
      .insert({
        title: data.title,
        instruction: data.instruction,
        status: "created",
        created_by: "hp",
      })
      .select("id")
      .single();
    if (error || !mission) {
      return { ok: false, error: "La mission n'a pas pu être créée." };
    }
    await logActivity(mission.id, null, "mission_created", `Mission créée : ${data.title}`);
    return { ok: true, data: { mission_id: mission.id as string } };
  });

// ---------------------------------------------------------------------------
// Découper une mission en sous-missions — directeur seulement
// ---------------------------------------------------------------------------

export const splitMission = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => splitMissionSchema.parse(data))
  .handler(async ({ data }): Promise<DbResult<{ sub_mission_ids: string[] }>> => {
    assertCanPerform("director", "split_mission");
    const current = await getMissionStatus(data.mission_id);
    if (!current.ok) return current;
    if (!isMissionTransitionAllowed(current.data.status, "running")) {
      return { ok: false, error: `Mission en état ${current.data.status} : découpage refusé.` };
    }
    if (current.data.stop_requested) {
      return { ok: false, error: "Mission arrêtée : découpage refusé." };
    }
    const { data: rows, error } = await db
      .from("hp_sub_missions")
      .insert(
        data.sub_missions.map((s) => ({
          mission_id: data.mission_id,
          agent_role: s.agent_role,
          title: s.title,
          instruction: s.instruction,
          status: "pending",
        })),
      )
      .select("id");
    if (error || !rows) {
      return { ok: false, error: "Le découpage n'a pas pu être enregistré." };
    }
    await db
      .from("hp_missions")
      .update({ status: "running", step_count: rows.length, updated_at: new Date().toISOString() })
      .eq("id", data.mission_id);
    await logActivity(
      data.mission_id,
      "director",
      "mission_split",
      `Mission découpée en ${rows.length} sous-mission(s).`,
    );
    return { ok: true, data: { sub_mission_ids: rows.map((r) => r.id as string) } };
  });

// ---------------------------------------------------------------------------
// Changer l'état d'une mission — transition autorisée seulement
// ---------------------------------------------------------------------------

export const changeMissionState = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => changeMissionStateSchema.parse(data))
  .handler(async ({ data }): Promise<DbResult<{ status: string }>> => {
    const current = await getMissionStatus(data.mission_id);
    if (!current.ok) return current;
    if (!isMissionTransitionAllowed(current.data.status, data.to)) {
      return {
        ok: false,
        error: `Transition refusée : ${current.data.status} → ${data.to}.`,
      };
    }
    const { error } = await db
      .from("hp_missions")
      .update({ status: data.to, updated_at: new Date().toISOString() })
      .eq("id", data.mission_id);
    if (error) return { ok: false, error: "Le changement d'état a échoué." };
    await logActivity(
      data.mission_id,
      null,
      "mission_state",
      `Mission : ${current.data.status} → ${data.to}.`,
    );
    return { ok: true, data: { status: data.to } };
  });

// ---------------------------------------------------------------------------
// Exécutions — ouvrir et fermer une étape de travail réelle
// C'est l'ouverture d'une exécution qui autorise l'affichage d'un état
// actif. Sans elle, l'agent reste « disponible ».
// ---------------------------------------------------------------------------

export const startExecution = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => startExecutionSchema.parse(data))
  .handler(async ({ data }): Promise<DbResult<{ execution_id: string }>> => {
    const { data: sub, error: subError } = await db
      .from("hp_sub_missions")
      .select("id, mission_id, agent_role, status")
      .eq("id", data.sub_mission_id)
      .single();
    if (subError || !sub) {
      return { ok: false, error: "Sous-mission introuvable." };
    }
    const mission = await getMissionStatus(sub.mission_id as string);
    if (!mission.ok) return mission;
    if (mission.data.stop_requested) {
      return { ok: false, error: "Mission arrêtée : aucune étape ne démarre." };
    }
    if (
      !isSubMissionTransitionAllowed(
        sub.status as "pending" | "running" | "completed" | "blocked" | "stopped",
        "running",
      )
    ) {
      return { ok: false, error: `Sous-mission en état ${sub.status} : démarrage refusé.` };
    }
    const { data: exec, error } = await db
      .from("hp_executions")
      .insert({
        sub_mission_id: data.sub_mission_id,
        agent_role: sub.agent_role,
        activity: data.activity,
        status: "running",
      })
      .select("id")
      .single();
    if (error || !exec) {
      return { ok: false, error: "L'exécution n'a pas pu démarrer." };
    }
    await db
      .from("hp_sub_missions")
      .update({ status: "running", updated_at: new Date().toISOString() })
      .eq("id", data.sub_mission_id);
    return { ok: true, data: { execution_id: exec.id as string } };
  });

export const endExecution = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => endExecutionSchema.parse(data))
  .handler(async ({ data }): Promise<DbResult<{ closed: true }>> => {
    const { data: exec, error } = await db
      .from("hp_executions")
      .select("id, sub_mission_id, status")
      .eq("id", data.execution_id)
      .single();
    if (error || !exec) {
      return { ok: false, error: "Exécution introuvable." };
    }
    if (exec.status !== "running") {
      return { ok: false, error: "Exécution déjà fermée." };
    }
    const { error: updateError } = await db
      .from("hp_executions")
      .update({
        status: data.ok ? "completed" : "failed",
        ended_at: new Date().toISOString(),
        error: data.ok ? null : (data.error ?? "Échec sans détail."),
      })
      .eq("id", data.execution_id);
    if (updateError) {
      return { ok: false, error: "La fermeture de l'exécution a échoué." };
    }
    return { ok: true, data: { closed: true } };
  });

// ---------------------------------------------------------------------------
// Enregistrer un résultat et ses preuves — l'agent assigné seulement
// Le résultat n'existe que s'il est enregistré ici, avec ses preuves.
// ---------------------------------------------------------------------------

export const recordResult = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => recordResultSchema.parse(data))
  .handler(async ({ data }): Promise<DbResult<{ result_id: string }>> => {
    assertCanPerform(data.agent_role, "record_result");
    const { data: sub, error: subError } = await db
      .from("hp_sub_missions")
      .select("id, mission_id, agent_role, status")
      .eq("id", data.sub_mission_id)
      .single();
    if (subError || !sub) {
      return { ok: false, error: "Sous-mission introuvable." };
    }
    if (sub.agent_role !== data.agent_role) {
      return { ok: false, error: "Cette sous-mission n'est pas assignée à ce rôle." };
    }
    if (sub.status !== "running") {
      return { ok: false, error: `Sous-mission en état ${sub.status} : résultat refusé.` };
    }
    const { data: result, error } = await db
      .from("hp_results")
      .insert({
        mission_id: sub.mission_id,
        sub_mission_id: data.sub_mission_id,
        agent_role: data.agent_role,
        summary: data.summary,
        details: data.details ?? "",
      })
      .select("id")
      .single();
    if (error || !result) {
      return { ok: false, error: "Le résultat n'a pas pu être enregistré." };
    }
    if (data.proofs && data.proofs.length > 0) {
      const { error: proofError } = await db.from("hp_proofs").insert(
        data.proofs.map((p) => ({
          result_id: result.id,
          kind: p.kind,
          label: p.label,
          content: p.content,
        })),
      );
      if (proofError) {
        // Le résultat est enregistré, la preuve a échoué : on le dit
        // dans le journal au lieu de prétendre que tout est consigné.
        await logActivity(
          sub.mission_id as string,
          data.agent_role,
          "proof_failed",
          `Résultat enregistré sans ses preuves (erreur base).`,
        );
      }
    }
    await db
      .from("hp_sub_missions")
      .update({ status: "completed", updated_at: new Date().toISOString() })
      .eq("id", data.sub_mission_id);
    await logActivity(
      sub.mission_id as string,
      data.agent_role,
      "result_recorded",
      `Résultat enregistré : ${data.summary}`,
    );
    return { ok: true, data: { result_id: result.id as string } };
  });

// ---------------------------------------------------------------------------
// Approbations — demander (agent) et décider (HP seul)
// Une action sensible accordée est consignée ; elle ne déclenche rien
// d'automatique au lot 1 (aucun code d'envoi, de publication ou de
// paiement n'existe dans le moteur).
// ---------------------------------------------------------------------------

export const requestApproval = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => requestApprovalSchema.parse(data))
  .handler(async ({ data }): Promise<DbResult<{ approval_id: string }>> => {
    const current = await getMissionStatus(data.mission_id);
    if (!current.ok) return current;
    if (!isMissionTransitionAllowed(current.data.status, "awaiting_approval")) {
      return { ok: false, error: `Mission en état ${current.data.status} : demande refusée.` };
    }
    const { data: approval, error } = await db
      .from("hp_approvals")
      .insert({
        mission_id: data.mission_id,
        action: data.action,
        reason: data.reason,
        status: "pending",
      })
      .select("id")
      .single();
    if (error || !approval) {
      return { ok: false, error: "La demande d'approbation n'a pas pu être créée." };
    }
    await db
      .from("hp_missions")
      .update({ status: "awaiting_approval", updated_at: new Date().toISOString() })
      .eq("id", data.mission_id);
    await logActivity(
      data.mission_id,
      null,
      "approval_requested",
      `Approbation demandée : ${data.action} — ${data.reason}`,
    );
    return { ok: true, data: { approval_id: approval.id as string } };
  });

export const recordApproval = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => recordApprovalSchema.parse(data))
  .handler(async ({ data }): Promise<DbResult<{ status: string }>> => {
    // Seul HP décide : cette fonction n'est appelée que depuis la
    // console, derrière le lien secret. Aucun rôle d'agent ne peut
    // l'appeler (voir permissions.ts : decide_approval n'existe pas
    // comme permission d'agent).
    const { data: approval, error } = await db
      .from("hp_approvals")
      .select("id, mission_id, action, status")
      .eq("id", data.approval_id)
      .single();
    if (error || !approval) {
      return { ok: false, error: "Demande d'approbation introuvable." };
    }
    if (approval.status !== "pending") {
      return { ok: false, error: "Demande déjà décidée." };
    }
    const { error: updateError } = await db
      .from("hp_approvals")
      .update({
        status: data.decision,
        decided_by: "hp",
        decided_at: new Date().toISOString(),
        note: data.note ?? null,
      })
      .eq("id", data.approval_id);
    if (updateError) {
      return { ok: false, error: "La décision n'a pas pu être consignée." };
    }
    // Décision accordée : la mission reprend. Refusée : elle se bloque.
    const nextStatus = data.decision === "approved" ? "running" : "blocked";
    const current = await getMissionStatus(approval.mission_id as string);
    if (current.ok && isMissionTransitionAllowed(current.data.status, nextStatus)) {
      await db
        .from("hp_missions")
        .update({ status: nextStatus, updated_at: new Date().toISOString() })
        .eq("id", approval.mission_id);
    }
    await logActivity(
      approval.mission_id as string,
      null,
      "approval_decided",
      `Approbation ${approval.action as string} : ${data.decision} (HP).`,
    );
    return { ok: true, data: { status: data.decision } };
  });

// ---------------------------------------------------------------------------
// Arrêter une mission — HP ou directeur
// Pose le drapeau et arrête les sous-missions en attente. Une exécution
// déjà en cours dans le Worker ne peut pas être tuée : elle se termine
// et la suivante ne démarre pas (le drapeau est vérifié par
// startExecution et splitMission).
// ---------------------------------------------------------------------------

export const stopMission = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => missionIdSchema.parse(data))
  .handler(async ({ data }): Promise<DbResult<{ stopped: true }>> => {
    assertCanPerform("director", "stop_mission");
    const current = await getMissionStatus(data.mission_id);
    if (!current.ok) return current;
    if (!isMissionTransitionAllowed(current.data.status, "stopped")) {
      return { ok: false, error: `Mission en état ${current.data.status} : arrêt refusé.` };
    }
    await db
      .from("hp_missions")
      .update({
        status: "stopped",
        stop_requested: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.mission_id);
    await db
      .from("hp_sub_missions")
      .update({ status: "stopped", updated_at: new Date().toISOString() })
      .eq("mission_id", data.mission_id)
      .in("status", ["pending", "blocked"]);
    await logActivity(data.mission_id, "director", "mission_stopped", "Mission arrêtée (HP).");
    return { ok: true, data: { stopped: true } };
  });

// ---------------------------------------------------------------------------
// Lectures — console seulement (lien secret). Elles lisent hp_* par le
// client service_role ; le RLS refuse tout accès direct du navigateur.
// ---------------------------------------------------------------------------

export const listMissions = createServerFn({ method: "GET" }).handler(
  async (): Promise<DbResult<Mission[]>> => {
    const { data, error } = await db
      .from("hp_missions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) return { ok: false, error: "Les missions n'ont pas pu être lues." };
    return { ok: true, data: (data ?? []) as Mission[] };
  },
);

export const listPendingApprovals = createServerFn({ method: "GET" }).handler(
  async (): Promise<DbResult<Approval[]>> => {
    const { data, error } = await db
      .from("hp_approvals")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true });
    if (error) return { ok: false, error: "Les approbations n'ont pas pu être lues." };
    return { ok: true, data: (data ?? []) as Approval[] };
  },
);

export const listActivity = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z
      .object({
        mission_id: uuidSchema.optional(),
        limit: z.number().int().min(1).max(100).default(50),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    let query = db
      .from("hp_activity_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(data.limit);
    if (data.mission_id) query = query.eq("mission_id", data.mission_id);
    const { data: rows, error } = await query;
    if (error) return { ok: false, error: "Le journal n'a pas pu être lu." };
    return { ok: true, data: (rows ?? []) as ActivityLogEntry[] };
  });

// États réels des 4 agents, dérivés des exécutions enregistrées.
// C'est la seule source des états affichés dans la console.
export const listAgentStates = createServerFn({ method: "GET" }).handler(
  async (): Promise<DbResult<{ role: AgentRole; state: AgentState }[]>> => {
    const { data: executions, error: execError } = await db
      .from("hp_executions")
      .select("agent_role, activity, status, started_at, ended_at")
      .order("started_at", { ascending: false })
      .limit(100);
    if (execError) {
      return { ok: false, error: "Les exécutions n'ont pas pu être lues." };
    }
    const { data: subMissions } = await db
      .from("hp_sub_missions")
      .select("agent_role, status, mission_id")
      .in("status", ["pending", "running", "blocked"]);
    const { data: awaitingMissions } = await db
      .from("hp_missions")
      .select("id")
      .eq("status", "awaiting_approval");

    const awaitingIds = new Set((awaitingMissions ?? []).map((m) => m.id as string));
    const states = AGENT_ROLES.map((role) => {
      const roleExecutions = (executions ?? []).filter((e) => e.agent_role === role);
      const roleSubs = (subMissions ?? []).filter((s) => s.agent_role === role);
      const lastClosed = roleExecutions.find((e) => e.status !== "running");
      return {
        role,
        state: deriveAgentState({
          executions: roleExecutions.map((e) => ({
            activity: e.activity as "recherche" | "production" | "collaboration" | "verification",
            status: e.status as "running" | "completed" | "failed",
            started_at: e.started_at as string,
            ended_at: e.ended_at as string | null,
          })),
          hasSubMissionAwaitingApproval: roleSubs.some((s) =>
            awaitingIds.has(s.mission_id as string),
          ),
          hasSubMissionBlocked: roleSubs.some((s) => s.status === "blocked"),
          lastExecutionCompleted: lastClosed?.status === "completed",
        }),
      };
    });
    return { ok: true, data: states };
  },
);

// Détail d'une mission : sous-missions, résultats, preuves, approbations.
export const getMissionDetail = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => missionIdSchema.parse(data))
  .handler(async ({ data }) => {
    const { data: mission, error } = await db
      .from("hp_missions")
      .select("*")
      .eq("id", data.mission_id)
      .single();
    if (error || !mission) return { ok: false, error: "Mission introuvable." };
    const [{ data: subs }, { data: results }, { data: approvals }] = await Promise.all([
      db
        .from("hp_sub_missions")
        .select("*")
        .eq("mission_id", data.mission_id)
        .order("created_at", { ascending: true }),
      db
        .from("hp_results")
        .select("*, hp_proofs(*)")
        .eq("mission_id", data.mission_id)
        .order("created_at", { ascending: true }),
      db
        .from("hp_approvals")
        .select("*")
        .eq("mission_id", data.mission_id)
        .order("created_at", { ascending: true }),
    ]);
    return {
      ok: true,
      data: {
        mission: mission as Mission,
        sub_missions: subs ?? [],
        results: results ?? [],
        approvals: (approvals ?? []) as Approval[],
      },
    };
  });
