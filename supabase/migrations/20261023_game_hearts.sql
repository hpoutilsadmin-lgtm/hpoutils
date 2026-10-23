-- Cœurs des jeux (vague 1 des 10 améliorations — go d'Hugo, 23 oct. 2026) :
-- compteur public anonyme « cœurs reçus » par jeu, affiché sur /jeux.
-- Une ligne = un cœur donné. AUCUNE donnée personnelle n'est stockée :
-- ni compte, ni adresse IP, ni identifiant de visiteur — seulement le
-- slug du jeu et l'heure du cœur. Le « déjà aimé » est gardé dans le
-- navigateur du visiteur (localStorage), jamais côté serveur.
-- À exécuter dans Supabase — le code déployé tolère l'absence de la
-- table : l'API répond alors actif:false et le favori local du visiteur
-- continue de fonctionner seul, sans compteur public affiché.
CREATE TABLE IF NOT EXISTS public.game_heart_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  game_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS game_heart_events_slug_idx
  ON public.game_heart_events (game_slug);

CREATE INDEX IF NOT EXISTS game_heart_events_slug_time_idx
  ON public.game_heart_events (game_slug, created_at);

ALTER TABLE public.game_heart_events ENABLE ROW LEVEL SECURITY;
-- Aucune policy : seul le rôle service_role (clé serveur, côté API du
-- site) peut lire et écrire. Ni lecture ni écriture publique directe.
