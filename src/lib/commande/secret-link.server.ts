// HP ô commande — moteur des missions (lot 1, étape 2, BROUILLON)
// Lien secret de la console (décision Q6, HP, 8 nov. 2026).
//
// Fichier « .server » : il n'est jamais envoyé au navigateur (convention
// TanStack Start). Le secret vit dans l'environnement (Lovable /
// Cloudflare, variable COMMANDE_SECRET), jamais dans le dépôt, jamais
// dans le code, jamais dans l'adresse affichée après vérification.
//
// Règle : si le secret n'est pas configuré, rien n'est valide
// (fermé par défaut). Une clé absente ou fausse rend 404 côté route,
// sans indiquer que la console existe. Le mot de passe sera ajouté
// quand la console sera déployée ; au lot 1, le lien secret suffit.

// Comparaison en temps constant (octet par octet, sans sortie
// anticipée sur le contenu) pour ne pas laisser deviner le secret
// à la durée de la réponse.
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function getCommandeSecret(): string | null {
  const secret = process.env.COMMANDE_SECRET?.trim();
  return secret ? secret : null;
}

export function isCommandeKeyValid(key: string | null | undefined): boolean {
  const secret = getCommandeSecret();
  if (!secret || !key) return false;
  return timingSafeEqual(key, secret);
}

export function commandeKeyFromUrl(url: string): string | null {
  try {
    return new URL(url).searchParams.get("key");
  } catch {
    return null;
  }
}
