import type { Database } from "@/integrations/supabase/types";

// Extension locale du schéma pour le client Supabase EXTERNE : les tables
// passeurs_abonnements (migration 20261030) et game_heart_events
// (migration 20261023) existent dans le projet externe mais pas dans les
// types générés. Même motif que src/lib/gift-database.ts : les fichiers
// générés restent intacts et ces types peuvent être remplacés par une
// régénération future.

type PasseursAbonnementRow = {
  id: string;
  email: string;
  formule: string;
  stripe_subscription_id: string;
  stripe_customer_id: string | null;
  jeton_annulation: string;
  date_debut: string;
  date_fin_periode: string;
  statut: string;
  annule_le: string | null;
  created_at: string;
  updated_at: string;
};

type GameHeartEventRow = {
  id: number;
  game_slug: string;
  created_at: string;
};

export type ExternalDatabase = Omit<Database, "public"> & {
  public: Omit<Database["public"], "Tables"> & {
    Tables: Database["public"]["Tables"] & {
      passeurs_abonnements: {
        Row: PasseursAbonnementRow;
        Insert: Pick<
          PasseursAbonnementRow,
          | "email"
          | "formule"
          | "stripe_subscription_id"
          | "jeton_annulation"
          | "date_fin_periode"
        > &
          Partial<
            Omit<
              PasseursAbonnementRow,
              | "email"
              | "formule"
              | "stripe_subscription_id"
              | "jeton_annulation"
              | "date_fin_periode"
            >
          >;
        Update: Partial<PasseursAbonnementRow>;
        Relationships: [];
      };
      game_heart_events: {
        Row: GameHeartEventRow;
        Insert: Pick<GameHeartEventRow, "game_slug"> &
          Partial<Omit<GameHeartEventRow, "game_slug">>;
        Update: Partial<GameHeartEventRow>;
        Relationships: [];
      };
    };
  };
};
