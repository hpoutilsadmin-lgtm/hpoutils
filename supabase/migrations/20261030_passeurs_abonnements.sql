-- Les Passeurs — abonnements automatisés (décision HP MEL-017, 30 oct. 2026).
--
-- À appliquer dans l'éditeur SQL Supabase DANS LA MÊME publication que le
-- code Passeurs (jamais l'un sans l'autre : sans cette table, le webhook
-- et la page d'annulation échouent ; sans le code, la table ne sert à rien).
--
-- Règle : seul le jeton d'annulation brut ouvre la page d'annulation, et
-- il n'est JAMAIS journalisé (ni côté serveur, ni dans les courriels de
-- preuve). Accès réservé à la clé service (fonctions serveur) : aucune
-- lecture directe par le navigateur (RLS bloque l'anonyme).
--
-- Idempotence : stripe_subscription_id est unique — si Stripe rejoue le
-- webhook, l'upsert ne crée pas de doublon et ne régénère pas le jeton.

create table if not exists public.passeurs_abonnements (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  formule text not null check (formule in ('mensuel', 'annuel')),
  stripe_subscription_id text not null unique,
  stripe_customer_id text,
  jeton_annulation text not null unique,
  date_debut timestamptz not null default now(),
  date_fin_periode timestamptz not null,
  statut text not null default 'actif' check (statut in ('actif', 'annule')),
  annule_le timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists passeurs_abonnements_email_idx
  on public.passeurs_abonnements (email);
create index if not exists passeurs_abonnements_jeton_idx
  on public.passeurs_abonnements (jeton_annulation);

-- RLS : comme les autres tables du projet, accès anonyme bloqué.
-- Seule la clé service (fonctions serveur) peut lire et écrire.
alter table public.passeurs_abonnements enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'passeurs_abonnements'
      and policyname = 'passeurs_abonnements_no_anon'
  ) then
    create policy passeurs_abonnements_no_anon
      on public.passeurs_abonnements
      for all
      to anon
      using (false);
  end if;
end
$$;
