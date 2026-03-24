# ADR-0002: Velite for Build-Time Content Processing

- **Date:** 2026-03-24
- **Status:** Accepted

## Context

Need build-time content processing for Markdown blog posts, datasheets, and webinars. Previously used Tina CMS but it required a separate dev server, database (MongoDB), and added runtime complexity.

## Decision

Velite with Zod schemas for build-time content validation and typed TypeScript output. Runs as a webpack plugin — no separate process.

## Consequences

### Positive

- Zero runtime cost.
- Zod validation catches content errors at build.
- Fully typed imports.
- No database or CMS server.
- Content stays in Git.

### Negative

- No visual editing UI for non-developers.
- Content changes require Git commits.

### Risk

If non-technical content editors are needed, consider adding a Git-based CMS layer (Decap CMS, Netlify CMS) that commits to the same Markdown files.

## Alternatives Considered

| Option | Reason for Rejection |
|---|---|
| Tina CMS | Required MongoDB, separate dev server, added complexity for self-hosted mode. |
| Contentlayer | Unmaintained. |
| gray-matter + manual parsing | No schema validation, no TypeScript types. |
| MDX with next-mdx-remote | More complex setup for simple content. |
