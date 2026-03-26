# ADR-0001: Next.js 15 with Static Export

- **Date:** 2026-03-24
- **Status:** Accepted

## Context

Replatforming from Docusaurus 3 to a modern React framework. Docusaurus was adequate for docs but created friction for marketing pages, forms, gated content, and non-technical contributors. Need App Router, full TypeScript support, and flexible page composition.

## Decision

Next.js 15 with App Router and `output: 'export'` for static site generation. No server runtime.

## Consequences

### Positive

- Full React component model.
- App Router with layouts and metadata API.
- Static export for CDN hosting.
- Huge ecosystem.
- TypeScript-first.

### Negative

- No server-side features (API routes, middleware, ISR).
- Image optimization disabled.
- Forms must be client-side only.

### Risk

If server-side features are needed in future (auth, personalization), must remove `output: 'export'` and change hosting.

## Alternatives Considered

| Option | Reason for Rejection |
|---|---|
| Docusaurus 3 | Poor marketing page support, no form handling. |
| Astro | Smaller ecosystem, less React integration. |
| Gatsby | Declining ecosystem, slow builds. |
| Remix | Requires server runtime. |
