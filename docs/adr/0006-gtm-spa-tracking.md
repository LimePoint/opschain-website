# ADR-0006: GTM with SPA Route-Change Tracking

- **Date:** 2026-03-24
- **Status:** Accepted

## Context

The site is a SPA — GA4 does not automatically fire `page_view` events on client-side route changes. The previous Docusaurus site used direct gtag.js with no custom event tracking.

## Decision

Google Tag Manager container injected via `GTMProvider` component. A `RouteChangeTracker` component uses `usePathname()` + `useEffect` to push `page_view` events to `window.dataLayer` on every route change. Additional dataLayer events: `form_submit`, `cta_click`, `scroll_depth`, `asset_download_unlock`.

## Consequences

### Positive

- GTM enables non-developer event configuration.
- All GA4 events flow through dataLayer.
- Route-change tracking solves SPA page_view gap.

### Negative

- GTM container adds a network request.
- If GTM_ID is not set, no analytics at all (graceful degradation).

### Risk

If GTM is misconfigured, analytics data could be lost. The client-side approach means ad blockers may prevent tracking.

## Alternatives Considered

| Option | Reason for Rejection |
|---|---|
| Direct gtag.js | No custom events, no SPA support without manual work. |
| Plausible/Fathom | Client preference for GA4 ecosystem. |
| Server-side analytics | Incompatible with static export. |
