-- Lot sécurité 12 nov. 2026 — frein à la devinette de codes cadeaux.
--
-- Table des tentatives de vérification d'un code cadeau, même motif que
-- recovery_attempts (récupération d'achat) et newsletter_signup_attempts
-- (infolettre) : hachage SHA-256 du code (jamais le code en clair),
-- hachage de l'adresse IP, horodatage. Limite appliquée dans le code :
-- 5 essais par code et par heure, 20 par IP et par heure, réponse
-- identique dans tous les cas (aucun oracle).
--
-- À appliquer en base live par Mélanie AVANT le code du lot, jamais après
-- (comme les migrations précédentes du lot sécurité).
-- Idempotente : peut être relancée sans effet si déjà appliquée.
-- Ne supprime rien, n'ajoute qu'une table de journalisation.

CREATE TABLE IF NOT EXISTS public.gift_code_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code_hash text NOT NULL,
  ip_hash text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_gift_code_attempts_code_time
  ON public.gift_code_attempts (code_hash, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gift_code_attempts_ip_time
  ON public.gift_code_attempts (ip_hash, created_at DESC);

ALTER TABLE public.gift_code_attempts ENABLE ROW LEVEL SECURITY;
-- No policies: only service role (which bypasses RLS) reads/writes.
