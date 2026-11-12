import type { Database } from "@/integrations/supabase/types";

// Local schema extension for the existing gift_cards migration; generated
// integration types remain untouched and can replace this once regenerated.
// Lot sécurité 12 nov. 2026 : gift_code_attempts (frein à la devinette de
// codes, migration 20261112_gift_code_attempts.sql) est ajouté ici au même
// titre que gift_cards.
type GiftCardRow = {
  code: string;
  initial_cents: number;
  balance_cents: number;
  reserved_cents: number;
  reserved_until: string | null;
  reserved_session_id: string | null;
  buyer_email: string | null;
  stripe_session_id: string | null;
  status: string;
  created_at: string;
};

type GiftCodeAttemptRow = {
  id: string;
  code_hash: string;
  ip_hash: string | null;
  created_at: string;
};

export type GiftDatabase = Omit<Database, "public"> & {
  public: Omit<Database["public"], "Tables"> & {
    Tables: Database["public"]["Tables"] & {
      gift_cards: {
        Row: GiftCardRow;
        Insert: Pick<GiftCardRow, "code" | "initial_cents" | "balance_cents"> &
          Partial<Omit<GiftCardRow, "code" | "initial_cents" | "balance_cents">>;
        Update: Partial<GiftCardRow>;
        Relationships: [];
      };
      gift_code_attempts: {
        Row: GiftCodeAttemptRow;
        Insert: Pick<GiftCodeAttemptRow, "code_hash"> & Partial<Omit<GiftCodeAttemptRow, "code_hash">>;
        Update: Partial<GiftCodeAttemptRow>;
        Relationships: [];
      };
    };
  };
};