-- « Offrir » (lot 28 oct. 2026, remplace les bons cadeaux oubliés) :
-- enregistrer le destinataire d'un achat offert, sans toucher à la facture.
--
-- La facture reste sur customer_email (le payeur). gift_recipient_email
-- sert uniquement à ce que le destinataire puisse récupérer son cadeau
-- avec son propre courriel sur /recuperer-achat.
--
-- Best-effort, comme kit_slugs : le code Offrir fonctionne sans cette
-- colonne (enregistrement journalisé et ignoré si absente) ; seule la
-- récupération par le destinataire l'exige. Appliquer AVANT la
-- republication du code Offrir, dans la même publication.
-- AUCUN code, AUCUN solde, AUCUNE expiration : cette colonne n'est ni
-- un code cadeau ni un solde, juste le destinataire d'une livraison.

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS gift_recipient_email text;
