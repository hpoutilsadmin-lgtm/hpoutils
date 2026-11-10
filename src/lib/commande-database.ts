// HP ô commande — moteur des missions (lot 1, étape 2)
// Extension locale de schéma pour les tables de la migration
// supabase/migrations/20261108_hp_commande_missions.sql (BROUILLON,
// jamais appliquée) : les types générés ne connaissent pas encore les
// tables hp_* / hotel_*. Même motif que src/lib/gift-database.ts pour
// gift_cards — les fichiers générés
// (src/integrations/supabase/types.ts) ne sont jamais édités à la main :
// cette extension disparaît quand les types seront régénérés après
// l'application de la migration par Mel.
//
// Chaque Row reprend colonne par colonne la migration (types SQL :
// uuid → string, text → string, timestamptz → string, boolean →
// boolean, integer → number ; les colonnes text avec CHECK restent
// string, comme le générateur Supabase les émettrait).

import type { Database } from "@/integrations/supabase/types";

type HpAgentsRow = {
  id: string;
  role: string;
  created_at: string;
};

type HpMissionsRow = {
  id: string;
  title: string;
  instruction: string;
  status: string;
  stop_requested: boolean;
  step_index: number;
  step_count: number;
  created_by: string;
  created_at: string;
  updated_at: string;
};

type HpSubMissionsRow = {
  id: string;
  mission_id: string;
  agent_role: string;
  title: string;
  instruction: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type HpExecutionsRow = {
  id: string;
  sub_mission_id: string;
  agent_role: string;
  activity: string;
  status: string;
  started_at: string;
  ended_at: string | null;
  error: string | null;
};

type HpResultsRow = {
  id: string;
  mission_id: string;
  sub_mission_id: string;
  agent_role: string;
  summary: string;
  details: string;
  created_at: string;
};

type HpProofsRow = {
  id: string;
  result_id: string;
  kind: string;
  label: string;
  content: string;
  created_at: string;
};

type HpApprovalsRow = {
  id: string;
  mission_id: string;
  action: string;
  reason: string;
  status: string;
  decided_by: string | null;
  decided_at: string | null;
  note: string | null;
  created_at: string;
};

type HpActivityLogRow = {
  id: string;
  mission_id: string;
  agent_role: string | null;
  kind: string;
  message: string;
  created_at: string;
};

type HotelMissionsRow = {
  id: string;
  title: string;
  status: string;
  created_at: string;
};

type HotelActivityLogRow = {
  id: string;
  mission_id: string;
  kind: string;
  message: string;
  created_at: string;
};

export type CommandeDatabase = Omit<Database, "public"> & {
  public: Omit<Database["public"], "Tables"> & {
    Tables: Database["public"]["Tables"] & {
      hp_agents: {
        Row: HpAgentsRow;
        Insert: Pick<HpAgentsRow, "role"> & Partial<Omit<HpAgentsRow, "role">>;
        Update: Partial<HpAgentsRow>;
        Relationships: [];
      };
      hp_missions: {
        Row: HpMissionsRow;
        Insert: Pick<HpMissionsRow, "title" | "instruction"> &
          Partial<Omit<HpMissionsRow, "title" | "instruction">>;
        Update: Partial<HpMissionsRow>;
        Relationships: [];
      };
      hp_sub_missions: {
        Row: HpSubMissionsRow;
        Insert: Pick<HpSubMissionsRow, "mission_id" | "agent_role" | "title" | "instruction"> &
          Partial<Omit<HpSubMissionsRow, "mission_id" | "agent_role" | "title" | "instruction">>;
        Update: Partial<HpSubMissionsRow>;
        Relationships: [
          {
            foreignKeyName: "hp_sub_missions_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "hp_missions";
            referencedColumns: ["id"];
          },
        ];
      };
      hp_executions: {
        Row: HpExecutionsRow;
        Insert: Pick<HpExecutionsRow, "sub_mission_id" | "agent_role" | "activity"> &
          Partial<Omit<HpExecutionsRow, "sub_mission_id" | "agent_role" | "activity">>;
        Update: Partial<HpExecutionsRow>;
        Relationships: [
          {
            foreignKeyName: "hp_executions_sub_mission_id_fkey";
            columns: ["sub_mission_id"];
            isOneToOne: false;
            referencedRelation: "hp_sub_missions";
            referencedColumns: ["id"];
          },
        ];
      };
      hp_results: {
        Row: HpResultsRow;
        Insert: Pick<HpResultsRow, "mission_id" | "sub_mission_id" | "agent_role" | "summary"> &
          Partial<Omit<HpResultsRow, "mission_id" | "sub_mission_id" | "agent_role" | "summary">>;
        Update: Partial<HpResultsRow>;
        Relationships: [
          {
            foreignKeyName: "hp_results_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "hp_missions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "hp_results_sub_mission_id_fkey";
            columns: ["sub_mission_id"];
            isOneToOne: false;
            referencedRelation: "hp_sub_missions";
            referencedColumns: ["id"];
          },
        ];
      };
      hp_proofs: {
        Row: HpProofsRow;
        Insert: Pick<HpProofsRow, "result_id" | "kind" | "label" | "content"> &
          Partial<Omit<HpProofsRow, "result_id" | "kind" | "label" | "content">>;
        Update: Partial<HpProofsRow>;
        Relationships: [
          {
            foreignKeyName: "hp_proofs_result_id_fkey";
            columns: ["result_id"];
            isOneToOne: false;
            referencedRelation: "hp_results";
            referencedColumns: ["id"];
          },
        ];
      };
      hp_approvals: {
        Row: HpApprovalsRow;
        Insert: Pick<HpApprovalsRow, "mission_id" | "action" | "reason"> &
          Partial<Omit<HpApprovalsRow, "mission_id" | "action" | "reason">>;
        Update: Partial<HpApprovalsRow>;
        Relationships: [
          {
            foreignKeyName: "hp_approvals_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "hp_missions";
            referencedColumns: ["id"];
          },
        ];
      };
      hp_activity_log: {
        Row: HpActivityLogRow;
        Insert: Pick<HpActivityLogRow, "mission_id" | "kind" | "message"> &
          Partial<Omit<HpActivityLogRow, "mission_id" | "kind" | "message">>;
        Update: Partial<HpActivityLogRow>;
        Relationships: [
          {
            foreignKeyName: "hp_activity_log_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "hp_missions";
            referencedColumns: ["id"];
          },
        ];
      };
      hotel_missions: {
        Row: HotelMissionsRow;
        Insert: Pick<HotelMissionsRow, "title"> & Partial<Omit<HotelMissionsRow, "title">>;
        Update: Partial<HotelMissionsRow>;
        Relationships: [];
      };
      hotel_activity_log: {
        Row: HotelActivityLogRow;
        Insert: Pick<HotelActivityLogRow, "mission_id" | "kind" | "message"> &
          Partial<Omit<HotelActivityLogRow, "mission_id" | "kind" | "message">>;
        Update: Partial<HotelActivityLogRow>;
        Relationships: [
          {
            foreignKeyName: "hotel_activity_log_mission_id_fkey";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "hotel_missions";
            referencedColumns: ["id"];
          },
        ];
      };
    };
  };
};
