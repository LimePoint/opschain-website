# ADR-0007: Static Hosting on Netlify

- **Date:** 2026-03-24
- **Status:** Accepted

## Context

The site was already deployed on Netlify via Docusaurus. Need to maintain the deployment pipeline while switching to Next.js static export.

## Decision

Continue with Netlify. Build produces `out/` directory. A catch-all redirect (`/* -> /index.html` with status 200) enables SPA deep linking — any URL resolves to the app shell, then the client-side router renders the correct page.

## Consequences

### Positive

- Zero-config CDN.
- Automatic branch previews.
- Simple `netlify.toml`.
- Existing team access and DNS.

### Negative

- The catch-all redirect means 404s are handled client-side (Next.js `not-found.tsx`), not at the CDN level.
- Initial load of deep links requires loading the full app shell.

### Risk

Minor — standard approach for SPA hosting. If SSR is needed in future, Netlify supports Next.js serverless via `@netlify/plugin-nextjs`.

## Alternatives Considered

| Option | Reason for Rejection |
|---|---|
| Vercel | Works well with Next.js but would require migration from existing Netlify setup. |
| AWS S3 + CloudFront | More infrastructure to manage. |
| GitHub Pages | Limited redirect support, no branch previews. |
