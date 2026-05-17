-- Storage bucket privé pour les PDFs
INSERT INTO storage.buckets (id, name, public) VALUES ('pdfs', 'pdfs', false)
ON CONFLICT (id) DO NOTHING;

-- Aucune politique publique : seul le service role lit le bucket pour signer les URLs.

-- Table des commandes
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text NOT NULL UNIQUE,
  stripe_payment_intent_id text,
  customer_email text NOT NULL,
  product_id text NOT NULL,
  price_id text NOT NULL,
  amount_total integer NOT NULL,
  currency text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  pdf_path text,
  environment text NOT NULL DEFAULT 'sandbox',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_session ON public.orders(stripe_session_id);
CREATE INDEX idx_orders_email ON public.orders(customer_email);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Aucune politique publique : toutes les lectures et écritures
-- passent par le service role (server functions / webhook).

-- Trigger updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();