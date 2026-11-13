-- Lot sécurité 2, 12 nov. 2026 — double confirmation infolettre (§3.2).
--
-- APPLIQUÉ : décision HP Q-S2-2 OUI, 12 nov. 2026. À appliquer en base
-- live par Mélanie AVANT le code du lot (comme les migrations
-- précédentes), jamais après.
--
-- La table `newsletter_signups` n'est définie dans AUCUNE migration du
-- dépôt : on la crée si absente (schéma repris des types générés
-- `src/integrations/supabase/types.ts`) et on ajoute les colonnes de
-- confirmation. Idempotente : peut être relancée sans effet si déjà
-- appliquée. Ne supprime rien.
--
-- RISQUE (à vérifier par Mel avant application) : si des doublons
-- d'`email` existent en live, le UNIQUE fera échouer la migration —
-- vérifier les doublons avant, et si le UNIQUE est refusé, le retirer
-- de la migration et s'appuyer sur le test d'existence du code (avec la
-- course notée dans le rapport).
CREATE TABLE IF NOT EXISTS public.newsletter_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  source text,
  consent_text text,
  consented_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_signups ENABLE ROW LEVEL SECURITY; -- sans politique : service role seulement

ALTER TABLE public.newsletter_signups
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS confirmation_token_hash text,
  ADD COLUMN IF NOT EXISTS confirmation_expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS confirmed_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_newsletter_signups_status
  ON public.newsletter_signups (status);
CREATE INDEX IF NOT EXISTS idx_newsletter_signups_token_hash
  ON public.newsletter_signups (confirmation_token_hash);

-- Rétro-compatibilité : les inscrits existants sont considérés confirmés
-- (leur consentement = case cochée ; on ne peut pas prouver un clic
-- rétroactivement). Aucun courriel de re-confirmation ne leur est envoyé.
UPDATE public.newsletter_signups
  SET status = 'confirmed', confirmed_at = consented_at
  WHERE status = 'pending';

-- Même motif pour la table des tentatives (elle non plus n'est définie
-- dans aucune migration du dépôt) : créée si absente, pour que le dépôt
-- reflète la base réelle.
CREATE TABLE IF NOT EXISTS public.newsletter_signup_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email_hash text NOT NULL,
  ip_hash text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_signup_attempts_email_time
  ON public.newsletter_signup_attempts (email_hash, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_signup_attempts_ip_time
  ON public.newsletter_signup_attempts (ip_hash, created_at DESC);

ALTER TABLE public.newsletter_signup_attempts ENABLE ROW LEVEL SECURITY; -- sans politique : service role seulement
