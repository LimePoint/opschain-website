# ADR-0003: Framer Motion for Animations

- **Date:** 2026-03-24
- **Status:** Accepted

## Context

SPA marketing site needs page transitions, scroll-reveal animations, interactive components (tabbed product tour, animated counters), and a polished feel. Must respect `prefers-reduced-motion`.

## Decision

Framer Motion with named imports only (tree-shaking). All animated components check `useReducedMotion()`.

## Consequences

### Positive

- Rich animation API (useInView, AnimatePresence, variants, layout animations).
- Good tree-shaking with named imports.
- Built-in reduced motion support.

### Negative

- Adds ~40kB to client JS bundle.
- Learning curve for the variants/gesture API.

### Risk

Bundle size increase. Mitigated by named imports only (never `import *`).

## Alternatives Considered

| Option | Reason for Rejection |
|---|---|
| CSS-only animations | No scroll-trigger, no AnimatePresence equivalent, harder to coordinate. |
| GSAP | Larger bundle, licensing concerns for commercial use. |
| react-spring | Less feature-rich for marketing animations. |
| No animations | Marketing site needs visual polish. |
