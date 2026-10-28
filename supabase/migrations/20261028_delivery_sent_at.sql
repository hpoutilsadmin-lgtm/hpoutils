-- Sécurité phase 2 — migration UNIQUE, à appliquer en base live
-- par Mélanie AVANT le code phase 2, jamais après.
-- Idempotente : peut être relancée sans effet si déjà appliquée.
-- Ne supprime rien, n'ajoute qu'une colonne horodatée.

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS delivery_sent_at timestamptz;

-- Vérification après application (à confirmer par Mélanie) :
-- SELECT column_name FROM information_schema.columns
-- WHERE table_name = 'orders' AND column_name = 'delivery_sent_at';
-- Doit renvoyer une ligne. Sinon, ne pas déployer le code phase 2.

-- Migrations déjà requises et à confirmer en même temps (lots précédents) :
-- 20261024_cart_orders.sql (clé session+price, indispensable au panier)
-- 20261028_gift_recipient_email.sql (récupération par le destinataire)
-- 20261022_bundle_kit_slugs.sql (mémorisation du choix bundle)
