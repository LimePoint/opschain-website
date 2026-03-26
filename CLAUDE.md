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
- **GTM + GA4** for analytics (server-rendered `<script>` in `<head>`, `useGTM` hook for client events)

## Commands

```bash
npm run dev        # Next.js dev server (Velite runs via webpack plugin)
npm run build      # Production build → out/ + sitemap + robots.txt
npm run lint       # ESLint
npm run start      # Serve production build locally
```

There is no separate CMS dev server. Velite processes content inline during `next dev` and `next build`.

**Important:** If the build fails with stale type errors, run `rm -rf .next && npm run build`. The Netlify build command does this automatically.

## Content

Content lives in `content/` as Markdown with YAML frontmatter:
- `content/blog/` — Blog posts (schema: title, date, description, author, slug, tags, draft, series, seriesOrder, coverImage, ogImage)
- `content/datasheets/` — Gated downloads (schema: title, description, slug, highlights, downloadUrl, available)
- `content/webinars/` — Events (schema: title, date, description, slug, status, speakers, zoomLink, recordingUrl)

Data-driven content (TypeScript, not Markdown):
- `content/authors.ts` — Author profiles (name, email, role, bio, avatarUrl, social links)
- `content/testimonials.ts` — Customer testimonials (quote, name, role, company). Empty array hides the section.

Schemas are defined in `velite.config.ts` using Zod. Content is consumed via typed imports:
```ts
import { posts, datasheets, webinars } from '@/.velite'
```

The `lib/content.ts` module wraps these imports with accessor functions (filtering, sorting, tags, authors, related posts, series).

### Blog Series

Blog posts can belong to a series via two optional frontmatter fields:
- `series` — Series name (e.g., `Modern Operations without Friction`)
- `seriesOrder` — Position within the series (1-based integer)

Series posts should also include the series name in their `tags` array for discoverability. The series tag renders with distinct blue styling across listing cards, sidebar, tag filter pages, and individual post pages. A "Part X of N" badge appears in the metadata line of listing cards and post headers.

Helpers in `lib/content.ts`: `getSeriesPosts()`, `getSeriesInfo()`

## Environment Variables

| Variable | Purpose | Notes |
|---|---|---|
| `NEXT_PUBLIC_SF_ORG_ID` | Salesforce org ID | Required for forms |
| `NEXT_PUBLIC_GTM_ID` | GTM container ID | Required for analytics |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL | Used in metadata/OG tags |
| `NEXT_PUBLIC_SHOW_DRAFTS` | Show draft blog posts | Dev only, default `false` |
| `NEXT_PUBLIC_SHOW_COMPARISON_TABLE` | Show comparison table on homepage | Default `false` |
| `NEXT_PUBLIC_SHOW_DATASHEETS` | Show datasheets/resources pages | Default `true` |
| `NEXT_PUBLIC_SHOW_WEBINARS` | Show webinars pages | Default `true` |
| `NEXT_PUBLIC_SHOW_TESTIMONIALS` | Show testimonials on homepage | Default `true` |
| `PORT` | Dev server port | Shell env var only (not `.env.local`) |

`NODE_ENV` is controlled by Next.js automatically — setting it in `.env.local` has no effect.

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

### Analytics (GTM)
- GTM is injected as a server-rendered `<script>` in `<head>` via `GTMHead` component (not `next/script`)
- The `useGTM` hook (in `components/analytics/useGTM.ts`) provides `dataLayer.push()` for client event tracking
- The `next-script-for-ga` ESLint rule is intentionally disabled in `eslint.config.mjs`

### SEO
- Every `page.tsx` exports a `metadata` object with unique `title` and `description`
- JSON-LD schemas are applied via components in `components/seo/JsonLd.tsx`
- `next-sitemap` generates `sitemap.xml` and `robots.txt` in the `postbuild` step
- `public/llms.txt` provides LLM discoverability per llmstxt.org

### Search
- Client-side search via `Cmd+K` / `Ctrl+K` (SearchDialog component in Navbar)
- Search index built at build time in `lib/search-index.ts`, embedded as JSON in every page
- Indexes: blog posts, datasheets, webinars, feature pages, solution pages, general pages
- New static pages must be added to `sitePages` array in `lib/search-index.ts`

### Blog Tags
- Tags are clickable links to `/blog/tags/[tag]/` pages
- Tag pages are statically generated from all tags across published posts
- Tag helpers in `lib/content.ts`: `getAllTags()`, `getPostsByTag()`, `tagToSlug()`, `slugToTag()`

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
- Release branches: `main`, `staging`
