-- Panier d'achat HP Outils : une ligne de commande par article.
--
-- OBLIGATOIRE, DANS LA MÊME PUBLICATION QUE LE CODE PANIER, ET AVANT QUE
-- LE CODE NE SERVE DU TRAFIC :
-- 1. L'ancienne contrainte UNIQUE sur stripe_session_id seul interdit deux
--    lignes pour une même session : un panier de 2+ articles échouerait à
--    la 2e ligne.
-- 2. L'ancien code (avant ce lot) faisait son upsert avec
--    onConflict "stripe_session_id" : il cesserait de fonctionner dès que
--    cette contrainte est supprimée. Migration + code doivent donc partir
--    ensemble, jamais l'un sans l'autre.
--
-- Après cette migration, la clé d'idempotence d'une commande est
-- (stripe_session_id, price_id) : un panier = N lignes, un achat seul =
-- 1 ligne, et la reprise de /checkout/return reste idempotente.

ALTER TABLE public.orders
  DROP CONSTRAINT IF EXISTS orders_stripe_session_id_key;

CREATE UNIQUE INDEX IF NOT EXISTS orders_session_price_uidx
  ON public.orders (stripe_session_id, price_id);
