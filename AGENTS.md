# Project architecture

- Public newsletter signups must pass through `subscribeToHpNews`; subscriber tables remain server-only so addresses cannot be read or written directly by browsers.
- Route metadata uses `createSeoHead` with the canonical production origin to keep descriptions, social tags, and canonicals aligned.