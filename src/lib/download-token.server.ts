import crypto from "crypto";

// HMAC-signed token for /api/public/download-pdf.
// Payload is small JSON: { p: priceId, e: email, x: expiresAtMs }.

const DOWNLOAD_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 jours

// Dedicated HMAC secret for download links. Kept separate from
// SUPABASE_SERVICE_ROLE_KEY so that rotating one does not invalidate
// the other, and so that a leak of one credential does not allow the
// attacker to forge download links for any (priceId, email) pair.
function getSigningSecret(): string {
  const s = process.env.DOWNLOAD_LINK_SECRET;
  if (!s) throw new Error("Missing DOWNLOAD_LINK_SECRET for token signing");
  return s;
}

// Legacy secret used to sign tokens before DOWNLOAD_LINK_SECRET was
// introduced. Accepted only at verification time so that already-emailed
// links remain valid until their natural 7-day expiry. New tokens are
// always signed with DOWNLOAD_LINK_SECRET.
function getLegacySecret(): string | null {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ?? null;
}

function b64urlEncode(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecode(str: string): Buffer {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  return Buffer.from(str.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

export type DownloadPayload = { priceId: string; email: string; exp: number };

export function signDownloadToken(input: { priceId: string; email: string; ttlMs?: number }): string {
  const payload = {
    p: input.priceId,
    e: input.email,
    x: Date.now() + (input.ttlMs ?? DOWNLOAD_TTL_MS),
  };
  const body = b64urlEncode(Buffer.from(JSON.stringify(payload), "utf8"));
  const sig = b64urlEncode(
    crypto.createHmac("sha256", getSigningSecret()).update(body).digest(),
  );
  return `${body}.${sig}`;
}

export function verifyDownloadToken(token: string): DownloadPayload | null {
  if (typeof token !== "string" || !token.includes(".")) return null;
  const [body, sig] = token.split(".", 2);
  if (!body || !sig) return null;
  const a = Buffer.from(sig);
  const candidates = [getSigningSecret()];
  const legacy = getLegacySecret();
  if (legacy) candidates.push(legacy);
  let matched = false;
  for (const secret of candidates) {
    const expected = b64urlEncode(
      crypto.createHmac("sha256", secret).update(body).digest(),
    );
    const b = Buffer.from(expected);
    if (a.length === b.length && crypto.timingSafeEqual(a, b)) {
      matched = true;
      break;
    }
  }
  if (!matched) return null;
  try {
    const json = JSON.parse(b64urlDecode(body).toString("utf8"));
    if (typeof json.p !== "string" || typeof json.e !== "string" || typeof json.x !== "number") {
      return null;
    }
    if (json.x < Date.now()) return null;
    return { priceId: json.p, email: json.e, exp: json.x };
  } catch {
    return null;
  }
}