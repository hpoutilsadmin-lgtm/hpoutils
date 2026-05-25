CREATE TABLE IF NOT EXISTS public.recovery_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  ip text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_recovery_attempts_email_time ON public.recovery_attempts (email, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_recovery_attempts_ip_time ON public.recovery_attempts (ip, created_at DESC);
ALTER TABLE public.recovery_attempts ENABLE ROW LEVEL SECURITY;
-- No policies: only service role (which bypasses RLS) reads/writes.