import crypto from "crypto";

// HMAC-signed token for /api/public/download-pdf.
// Payload is small JSON: { p: priceId, e: email, x: expiresAtMs }.

const DOWNLOAD_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 jours

function getSecret(): string {
  const s = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!s) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY for token signing");
  return s;
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
    crypto.createHmac("sha256", getSecret()).update(body).digest(),
  );
  return `${body}.${sig}`;
}

export function verifyDownloadToken(token: string): DownloadPayload | null {
  if (typeof token !== "string" || !token.includes(".")) return null;
  const [body, sig] = token.split(".", 2);
  if (!body || !sig) return null;
  const expected = b64urlEncode(
    crypto.createHmac("sha256", getSecret()).update(body).digest(),
  );
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
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