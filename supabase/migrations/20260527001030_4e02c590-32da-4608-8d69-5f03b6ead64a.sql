ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS refunded_at TIMESTAMPTZ;
CREATE INDEX IF NOT EXISTS idx_orders_email_status ON public.orders (lower(customer_email), status, environment);
CREATE INDEX IF NOT EXISTS idx_orders_payment_intent ON public.orders (stripe_payment_intent_id);