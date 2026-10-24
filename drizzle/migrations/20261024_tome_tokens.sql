-- Migration « À toi l'histoire » — jetons d'accès personnels.
-- À appliquer dans l'éditeur SQL Supabase DANS LA MÊME publication que le
-- code /lire/ (jamais l'un sans l'autre : sans cette table, le webhook et
-- la page de retour échouent ; sans le code, la table ne sert à rien).
--
-- Règle : seul le jeton brut ouvre un tome, et seul son empreinte SHA-256
-- est stockée ici. Accès réservé à la clé service (fonctions serveur) :
-- aucune lecture directe par le navigateur.
-- Environnement : 'sandbox' | 'live' | 'free' | 'recovery'.

create table if not exists public.tome_tokens (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique,
  tome_slug text not null,
  customer_email text not null,
  stripe_session_id text not null,
  environment text not null default 'sandbox',
  created_at timestamptz not null default now(),
  revoked_at timestamptz
);

create index if not exists tome_tokens_email_idx
  on public.tome_tokens (customer_email);
create index if not exists tome_tokens_session_idx
  on public.tome_tokens (stripe_session_id);
