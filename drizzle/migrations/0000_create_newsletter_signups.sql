CREATE TABLE public.newsletter_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE CHECK (char_length(email) BETWEEN 3 AND 254),
  source TEXT NOT NULL DEFAULT 'homepage' CHECK (char_length(source) BETWEEN 1 AND 40),
  consent_text TEXT NOT NULL CHECK (char_length(consent_text) BETWEEN 1 AND 500),
  consented_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.newsletter_signups TO service_role;
ALTER TABLE public.newsletter_signups ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.newsletter_signup_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_hash TEXT NOT NULL CHECK (char_length(email_hash) = 64),
  ip_hash TEXT CHECK (ip_hash IS NULL OR char_length(ip_hash) = 64),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.newsletter_signup_attempts TO service_role;
ALTER TABLE public.newsletter_signup_attempts ENABLE ROW LEVEL SECURITY;

CREATE INDEX newsletter_signup_attempts_email_time_idx
  ON public.newsletter_signup_attempts (email_hash, created_at DESC);
CREATE INDEX newsletter_signup_attempts_ip_time_idx
  ON public.newsletter_signup_attempts (ip_hash, created_at DESC)
  WHERE ip_hash IS NOT NULL;

COMMENT ON TABLE public.newsletter_signups IS 'Consent-based HP newsletter subscribers; server-only access by design.';
COMMENT ON TABLE public.newsletter_signup_attempts IS 'Hashed, short-lived signup rate-limit records; server-only access by design.';