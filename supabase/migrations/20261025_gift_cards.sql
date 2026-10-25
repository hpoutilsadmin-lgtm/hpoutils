-- Bons cadeaux HP Outils — table à appliquer AVANT toute republication
-- du code cadeaux. Sans elle, les fonctions serveur échouent proprement
-- (aucun crédit accordé, aucun code inventé).
--
-- Modèle : un code = un solde. `reserved_cents` + `reserved_until` portent
-- la réservation d'un paiement Stripe en cours ; `reserved_session_id`
-- porte d'abord la référence de réservation, puis l'ID de session Stripe
-- une fois la session créée (voir cadeaux.functions.ts).
-- Aucune expiration du solde en v1.

create table if not exists public.gift_cards (
  code text primary key,
  initial_cents integer not null check (initial_cents > 0),
  balance_cents integer not null check (balance_cents >= 0),
  reserved_cents integer not null default 0 check (reserved_cents >= 0),
  reserved_until timestamptz null,
  reserved_session_id text null,
  buyer_email text null,
  stripe_session_id text null unique,
  status text not null default 'active' check (status in ('active', 'revoked')),
  created_at timestamptz not null default now()
);

create index if not exists gift_cards_reserved_session_idx
  on public.gift_cards (reserved_session_id);
