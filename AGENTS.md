# Project architecture

- Mascot bubble voices use the shared `hgpto-voice` player and CDN asset pointers; keep WebAudio as the missing-file fallback so React and standalone pages share identical sound behavior.

- Public newsletter signups must pass through `subscribeToHpNews`; subscriber tables remain server-only so addresses cannot be read or written directly by browsers.
- Route metadata uses `createSeoHead` with the canonical production origin to keep descriptions, social tags, and canonicals aligned.
- Payment price IDs in `products-catalog.ts` are permanent fulfillment keys; update them only after their matching test products exist so checkout and download entitlements stay aligned.