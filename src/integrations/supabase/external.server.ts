// Client Supabase EXTERNE (projet « HP Outils », hors Lovable Cloud).
// Fichier NON généré — maintenu à la main. Ne pas confondre avec les
// fichiers générés src/integrations/supabase/client.server.ts et
// client.ts, qui lisent les variables de l'intégration Lovable
// (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / VITE_SUPABASE_*), absentes
// depuis la coupure de l'intégration : ils restent inutilisés tant que
// cette intégration n'est pas restaurée. Ne pas les éditer.
//
// Pourquoi ce module existe : le projet Supabase intégré à Lovable Cloud
// n'expose pas ses variables et ne peut pas être repointé vers un projet
// externe. Le code applicatif ne lit donc plus les noms SUPABASE_* : il
// lit les secrets Lovable aux noms personnalisés HP_SUPABASE_*, créés à
// la main dans le tableau de bord Lovable (Secrets), avec les valeurs du
// projet externe :
// - HP_SUPABASE_URL : URL du projet externe.
// - HP_SUPABASE_SERVICE_ROLE_KEY : clé service_role (contourne RLS).
// - HP_SUPABASE_ANON_KEY : clé anon / publishable (accès avec RLS).
//
// Ne JAMAIS coder en dur l'URL du projet ou une clé ici : tout vient des
// secrets d'environnement. Les deux clients sont paresseux (Proxy, même
// motif que client.server.ts) : une variable absente ne fait échouer que
// le premier appel, jamais l'import du module ni le build.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

function createExternalAdminClient() {
  const url = process.env.HP_SUPABASE_URL;
  const key = process.env.HP_SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    const missing = [
      ...(!url ? ["HP_SUPABASE_URL"] : []),
      ...(!key ? ["HP_SUPABASE_SERVICE_ROLE_KEY"] : []),
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Configure the HP_SUPABASE_* secrets in Lovable.`;
    console.error(`[Supabase externe] ${message}`);
    throw new Error(message);
  }

  return createClient<Database>(url, key, {
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function createExternalAnonClient() {
  const url = process.env.HP_SUPABASE_URL;
  const key = process.env.HP_SUPABASE_ANON_KEY;

  if (!url || !key) {
    const missing = [
      ...(!url ? ["HP_SUPABASE_URL"] : []),
      ...(!key ? ["HP_SUPABASE_ANON_KEY"] : []),
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Configure the HP_SUPABASE_* secrets in Lovable.`;
    console.error(`[Supabase externe] ${message}`);
    throw new Error(message);
  }

  return createClient<Database>(url, key, {
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

let _externalAdmin: ReturnType<typeof createExternalAdminClient> | undefined;
let _externalAnon: ReturnType<typeof createExternalAnonClient> | undefined;

// Client service_role du projet externe — contourne RLS.
// SÉCURITÉ : opérations serveur de confiance seulement, jamais exposé
// au code client. Importer comme :
// import { supabaseExternalAdmin } from "@/integrations/supabase/external.server";
export const supabaseExternalAdmin = new Proxy(
  {} as ReturnType<typeof createExternalAdminClient>,
  {
    get(_, prop, receiver) {
      if (!_externalAdmin) _externalAdmin = createExternalAdminClient();
      return Reflect.get(_externalAdmin, prop, receiver);
    },
  },
);

// Client anon du projet externe — accès avec RLS, pour les lectures
// publiques futures (ex. compteurs anonymes). Aujourd'hui, aucun
// fichier applicatif ne l'utilise : game-hearts.ts reste en service_role
// (voir RAPPORT-LOT-RECABLAGE.md § game-hearts) tant que la politique RLS
// correspondante n'est pas confirmée dans le projet externe.
export const supabaseExternalAnon = new Proxy(
  {} as ReturnType<typeof createExternalAnonClient>,
  {
    get(_, prop, receiver) {
      if (!_externalAnon) _externalAnon = createExternalAnonClient();
      return Reflect.get(_externalAnon, prop, receiver);
    },
  },
);
