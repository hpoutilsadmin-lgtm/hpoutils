-- Bundle Sans Honte « Choisis 10 kits parmi 15 » : mémoriser la sélection
-- de l'acheteur sur la commande, pour que la livraison et la récupération
-- d'achat puissent renvoyer les 10 bons liens de téléchargement.
-- À exécuter dans Supabase — le code déployé tolère l'absence de la colonne
-- (les choix ne sont alors simplement pas mémorisés), mais la récupération
-- d'un achat bundle ne peut relire les choix que si elle existe.
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS kit_slugs TEXT;
