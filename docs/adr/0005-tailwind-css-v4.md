# ADR-0005: Tailwind CSS v4

- **Date:** 2026-03-24
- **Status:** Accepted

## Context

Migrating from Docusaurus Infima CSS framework. Need a utility-first CSS framework that supports design tokens, responsive layouts, and custom theming to match OpsChain brand colors (primary green #2e8555, Poppins/Rubik fonts).

## Decision

Tailwind CSS v4 with the new `@theme` directive for design tokens in `globals.css`, integrated via `@tailwindcss/postcss`.

## Consequences

### Positive

- Utility-first reduces CSS specificity issues.
- v4 `@theme` provides clean token definition.
- Co-locates style with markup.
- Excellent responsive utilities.

### Negative

- v4 is relatively new — some ecosystem tooling may lag.
- Verbose class strings in JSX.

### Risk

Minor — Tailwind is well-established and v4 is production-ready.

## Alternatives Considered

| Option | Reason for Rejection |
|---|---|
| Infima/Docusaurus CSS | Tied to Docusaurus. |
| CSS Modules | More boilerplate, less consistent. |
| Styled Components/Emotion | Runtime overhead, SSR complexity. |
| shadcn/ui | Could layer on top of Tailwind in future for complex UI components. |
