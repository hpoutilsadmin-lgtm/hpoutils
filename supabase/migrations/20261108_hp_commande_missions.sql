-- HP ô commande — moteur des missions (lot 1, étape 2)
-- BROUILLON — JAMAIS APPLIQUÉE. À appliquer côté projet Lovable par Mel,
-- comme la migration gift_cards (20261025_gift_cards.sql), après go d'HP.
-- Posture RLS « service seulement », même motif que tome_tokens et
-- public.orders (migration 20260523000449_594fe14b-ee7f-482f-8062-dc9bba5e9e76.sql) :
-- RLS activé, politique restrictive « Deny all client access » pour
-- anon et authenticated, accès uniquement par la clé service_role
-- depuis les fonctions serveur (supabaseAdmin).
-- Séparation HP / hôtel dès le premier jour : préfixes hp_ et hotel_,
-- jamais de lecture croisée. Les tables hotel_* sont créées vides
-- (mode spectateur, lot 0 de l'hôtel) ; aucune fonction du lot 1 ne les lit.

-- ---------------------------------------------------------------------------
-- Agents — 4 rôles, sans nom de personne en dur (ni Gaspard ni Gepeto :
-- la répartition reste à trancher par HP).
-- ---------------------------------------------------------------------------

create table if not exists public.hp_agents (
  id uuid primary key default gen_random_uuid(),
  role text not null unique check (role in ('director', 'archivist', 'technician', 'quality')),
  created_at timestamptz not null default now()
);

insert into public.hp_agents (role) values
  ('director'), ('archivist'), ('technician'), ('quality')
  on conflict (role) do nothing;

-- ---------------------------------------------------------------------------
-- Missions
-- ---------------------------------------------------------------------------

create table if not exists public.hp_missions (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 300),
  instruction text not null check (char_length(instruction) between 1 and 5000),
  status text not null default 'created'
    check (status in ('created', 'running', 'awaiting_approval', 'blocked', 'completed', 'stopped')),
  -- « Arrêter » : drapeau vérifié avant chaque étape suivante. Il ne peut
  -- pas tuer une invocation Worker déjà en cours.
  stop_requested boolean not null default false,
  step_index integer not null default 0 check (step_index >= 0),
  step_count integer not null default 0 check (step_count >= 0),
  created_by text not null default 'hp' check (created_by = 'hp'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hp_sub_missions (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.hp_missions (id) on delete cascade,
  agent_role text not null check (agent_role in ('director', 'archivist', 'technician', 'quality')),
  title text not null check (char_length(title) between 1 and 300),
  instruction text not null check (char_length(instruction) between 1 and 5000),
  status text not null default 'pending'
    check (status in ('pending', 'running', 'completed', 'blocked', 'stopped')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists hp_sub_missions_mission_idx
  on public.hp_sub_missions (mission_id);

-- ---------------------------------------------------------------------------
-- Exécutions — la preuve qu'un agent travaille réellement
-- ---------------------------------------------------------------------------

create table if not exists public.hp_executions (
  id uuid primary key default gen_random_uuid(),
  sub_mission_id uuid not null references public.hp_sub_missions (id) on delete cascade,
  agent_role text not null check (agent_role in ('director', 'archivist', 'technician', 'quality')),
  activity text not null check (activity in ('recherche', 'production', 'collaboration', 'verification')),
  status text not null default 'running' check (status in ('running', 'completed', 'failed')),
  started_at timestamptz not null default now(),
  ended_at timestamptz null,
  error text null
);

create index if not exists hp_executions_sub_mission_idx
  on public.hp_executions (sub_mission_id);
create index if not exists hp_executions_started_idx
  on public.hp_executions (started_at desc);

-- ---------------------------------------------------------------------------
-- Résultats et preuves
-- ---------------------------------------------------------------------------

create table if not exists public.hp_results (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.hp_missions (id) on delete cascade,
  sub_mission_id uuid not null references public.hp_sub_missions (id) on delete cascade,
  agent_role text not null check (agent_role in ('director', 'archivist', 'technician', 'quality')),
  summary text not null check (char_length(summary) between 1 and 1000),
  details text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists hp_results_mission_idx
  on public.hp_results (mission_id);

create table if not exists public.hp_proofs (
  id uuid primary key default gen_random_uuid(),
  result_id uuid not null references public.hp_results (id) on delete cascade,
  kind text not null check (kind in ('text', 'url', 'file_ref', 'diff', 'capture')),
  label text not null check (char_length(label) between 1 and 200),
  content text not null check (char_length(content) between 1 and 20000),
  created_at timestamptz not null default now()
);

create index if not exists hp_proofs_result_idx
  on public.hp_proofs (result_id);

-- ---------------------------------------------------------------------------
-- Approbations — seul HP décide (decided_by = 'hp', jamais un agent)
-- ---------------------------------------------------------------------------

create table if not exists public.hp_approvals (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.hp_missions (id) on delete cascade,
  action text not null check (action in ('email', 'purchase', 'refund', 'publish', 'deploy', 'delete', 'payment')),
  reason text not null check (char_length(reason) between 1 and 1000),
  status text not null default 'pending' check (status in ('pending', 'approved', 'refused')),
  decided_by text null check (decided_by is null or decided_by = 'hp'),
  decided_at timestamptz null,
  note text null,
  created_at timestamptz not null default now()
);

create index if not exists hp_approvals_mission_idx
  on public.hp_approvals (mission_id);
create index if not exists hp_approvals_status_idx
  on public.hp_approvals (status);

-- ---------------------------------------------------------------------------
-- Journal d'activité
-- ---------------------------------------------------------------------------

create table if not exists public.hp_activity_log (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.hp_missions (id) on delete cascade,
  agent_role text null check (agent_role is null or agent_role in ('director', 'archivist', 'technician', 'quality')),
  kind text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists hp_activity_log_mission_idx
  on public.hp_activity_log (mission_id);

-- ---------------------------------------------------------------------------
-- Hôtel — MODE SPECTATEUR (lot 0). Tables créées vides, aucune fonction
-- du lot 1 ne les lit, jamais de lecture croisée avec hp_*.
-- ---------------------------------------------------------------------------

create table if not exists public.hotel_missions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  status text not null default 'created',
  created_at timestamptz not null default now()
);

create table if not exists public.hotel_activity_log (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.hotel_missions (id) on delete cascade,
  kind text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- RLS « service seulement » — même motif que public.orders.
-- Tout accès client direct est refusé ; seul le service_role (fonctions
-- serveur) lit et écrit.
-- ---------------------------------------------------------------------------

alter table public.hp_agents enable row level security;
alter table public.hp_missions enable row level security;
alter table public.hp_sub_missions enable row level security;
alter table public.hp_executions enable row level security;
alter table public.hp_results enable row level security;
alter table public.hp_proofs enable row level security;
alter table public.hp_approvals enable row level security;
alter table public.hp_activity_log enable row level security;
alter table public.hotel_missions enable row level security;
alter table public.hotel_activity_log enable row level security;

drop policy if exists "Deny all client access to hp_agents" on public.hp_agents;
create policy "Deny all client access to hp_agents"
  on public.hp_agents as restrictive for all to anon, authenticated
  using (false) with check (false);

drop policy if exists "Deny all client access to hp_missions" on public.hp_missions;
create policy "Deny all client access to hp_missions"
  on public.hp_missions as restrictive for all to anon, authenticated
  using (false) with check (false);

drop policy if exists "Deny all client access to hp_sub_missions" on public.hp_sub_missions;
create policy "Deny all client access to hp_sub_missions"
  on public.hp_sub_missions as restrictive for all to anon, authenticated
  using (false) with check (false);

drop policy if exists "Deny all client access to hp_executions" on public.hp_executions;
create policy "Deny all client access to hp_executions"
  on public.hp_executions as restrictive for all to anon, authenticated
  using (false) with check (false);

drop policy if exists "Deny all client access to hp_results" on public.hp_results;
create policy "Deny all client access to hp_results"
  on public.hp_results as restrictive for all to anon, authenticated
  using (false) with check (false);

drop policy if exists "Deny all client access to hp_proofs" on public.hp_proofs;
create policy "Deny all client access to hp_proofs"
  on public.hp_proofs as restrictive for all to anon, authenticated
  using (false) with check (false);

drop policy if exists "Deny all client access to hp_approvals" on public.hp_approvals;
create policy "Deny all client access to hp_approvals"
  on public.hp_approvals as restrictive for all to anon, authenticated
  using (false) with check (false);

drop policy if exists "Deny all client access to hp_activity_log" on public.hp_activity_log;
create policy "Deny all client access to hp_activity_log"
  on public.hp_activity_log as restrictive for all to anon, authenticated
  using (false) with check (false);

drop policy if exists "Deny all client access to hotel_missions" on public.hotel_missions;
create policy "Deny all client access to hotel_missions"
  on public.hotel_missions as restrictive for all to anon, authenticated
  using (false) with check (false);

drop policy if exists "Deny all client access to hotel_activity_log" on public.hotel_activity_log;
create policy "Deny all client access to hotel_activity_log"
  on public.hotel_activity_log as restrictive for all to anon, authenticated
  using (false) with check (false);
