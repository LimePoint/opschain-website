# OpsChain Website — Project Instructions

## Architecture Reference

See [ARCHITECTURE.md](./ARCHITECTURE.md) for full architecture documentation, system diagrams, data flow, and integration details. Architecture decision records are in [`/docs/adr`](./docs/adr/).

## Stack

- **Next.js 15** App Router with `output: 'export'` (static site generation)
- **TypeScript** in strict mode
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **Velite** for build-time content processing (Markdown → typed TS imports)
- **Framer Motion** for animations (SPA transitions, scroll reveals)
- **Salesforce Web-to-Lead** for forms (hidden iframe POST, not fetch)
- **GTM + GA4** for analytics (SPA route-change tracking via `RouteChangeTracker`)

## Commands

```bash
npm run dev        # Next.js dev server (Velite runs via webpack plugin)
npm run build      # Production build → out/ + sitemap + robots.txt
npm run lint       # ESLint
npm run start      # Serve production build locally
```

There is no separate CMS dev server. Velite processes content inline during `next dev` and `next build`.

## Content

Content lives in `content/` as Markdown with YAML frontmatter:
- `content/blog/` — Blog posts (schema: title, date, description, author, slug, tags, draft, ogImage)
- `content/datasheets/` — Gated downloads (schema: title, description, slug, highlights, downloadUrl, available)
- `content/webinars/` — Events (schema: title, date, description, slug, status, speakers, zoomLink, recordingUrl)

Schemas are defined in `velite.config.ts` using Zod. Content is consumed via typed imports:
```ts
import { posts, datasheets, webinars } from '@/.velite'
```

The `lib/content.ts` module wraps these imports with accessor functions (filtering, sorting, related posts).

## Key Conventions

### Animations
- **Named imports only** from `framer-motion` — never `import * from 'framer-motion'`
- Every animated component must check `useReducedMotion()` and disable animations accordingly
- `AnimatedSection` is the standard scroll-reveal wrapper — use it around page sections
- `PageTransition` wraps the return value of every `page.tsx`

### Internal Links
- All internal navigation must use `next/link` — never `<a href="/...">` for internal routes
- External links use `<a>` with `target="_blank" rel="noopener noreferrer"`

### Forms
- All Salesforce forms use the `SalesforceForm` base component which submits via hidden iframe POST
- The Salesforce org ID is `00DQE00000BdTqD` (hardcoded fallback, overridable via `NEXT_PUBLIC_SF_ORG_ID`)
- UTM parameters are captured from the URL on page load and injected into every form submission

### SEO
- Every `page.tsx` exports a `metadata` object with unique `title` and `description`
- JSON-LD schemas are applied via components in `components/seo/JsonLd.tsx`
- `next-sitemap` generates `sitemap.xml` and `robots.txt` in the `postbuild` step
- `public/llms.txt` provides LLM discoverability per llmstxt.org

### Static Export
- `output: 'export'` means no server-side features (no API routes, no middleware, no ISR)
- All pages are statically generated at build time
- Images use `unoptimized: true` (served as-is from CDN)
- The Netlify `[[redirects]]` catch-all (`/* → /index.html`) enables SPA deep linking

## Design Tokens (Tailwind)

- Primary green: `#2e8555` (variants: `primary-dark`, `primary-light`, etc.)
- Accent teal: `#25c2a0`
- Heading font: Poppins (`font-heading`)
- Body font: Rubik (`font-body`)
- Defined in `app/globals.css` under `@theme` and `tailwind.config.ts`

## Git

- Commit messages follow Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `migrate:`
- No AI attribution in commit messages
- Pre-commit hook runs prettier via husky + lint-staged
