# OpsChain Website

Enterprise operations automation & governance platform marketing website.

[![Netlify Status](https://api.netlify.com/api/v1/badges/92ca09e5-b783-46c4-b7eb-87aa15f7c900/deploy-status)](https://app.netlify.com/sites/opschain/deploys)

https://opschain.io/

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, `output: 'export'`, static site) |
| Language | TypeScript (strict mode) |
| Content | Velite (Zod-validated Markdown → typed imports at build time) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion (page transitions, scroll reveals, interactive components) |
| Deployment | Netlify (static) |
| Forms | Salesforce Web-to-Lead (client-side, hidden iframe POST) |
| Analytics | Google Tag Manager + GA4 (server-rendered `<script>` in `<head>`) |
| SEO | next-sitemap, JSON-LD schemas, Open Graph, `llms.txt` |
| Search | Client-side search (Cmd+K) across all content types |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (generates out/ directory + sitemap + robots.txt)
npm run build
```

The dev server runs at [http://localhost:3000](http://localhost:3000). Velite processes content automatically via the webpack plugin — no separate process needed.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_SF_ORG_ID` | Salesforce org ID for Web-to-Lead forms | Production |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID | Production |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (e.g. `https://opschain.io`) | Production |
| `NEXT_PUBLIC_SHOW_DRAFTS` | Show draft blog posts (`true`/`false`) | Dev only |
| `NEXT_PUBLIC_SHOW_COMPARISON_TABLE` | Show comparison table on homepage (`true`/`false`) | Optional |
| `PORT` | Dev server port (shell env var, not `.env.local`) | Dev only |

## Project Structure

```
app/                      # Next.js App Router pages
  blog/                   # Blog index + [slug] post pages
    tags/[tag]/           # Filtered blog posts by tag
  features/               # 7 feature pages (autonomous-agents, governed-intelligence, etc.)
  solutions/              # 3 vertical landing pages (utilities-energy, banking-finance, telecommunications)
  resources/              # Datasheet index + [slug] gated download pages
  webinars/               # Webinar index + [slug] pages (upcoming/past/on-demand)
  our-approach/           # Positioning page + /compare competitor table
  book-demo/              # Demo request form (Salesforce Web-to-Lead)
  privacy/                # Privacy policy
  terms-of-use/           # Terms of use
  eula/                   # End user licence agreement
components/
  analytics/              # GTMProvider (server), useGTM (client hook), ScrollTracker, CTAButton, RouteChangeTracker
  forms/                  # SalesforceForm, ContactForm, DemoRequestForm, GatedAssetForm
  search/                 # SearchData (server, builds JSON index), SearchDialog (client, Cmd+K)
  seo/                    # JsonLd schema components (Organization, BlogPosting, Event, FAQ)
  ui/                     # Navbar (with search), Footer, FeaturePageLayout
  AnimatedSection.tsx     # Scroll-reveal wrapper (useInView + configurable direction)
  PageTransition.tsx      # Page enter/exit animation (fade + slide)
  Hero.tsx                # Homepage hero with staggered headline animation
  StatBar.tsx             # Animated number counters
  ProductTour.tsx         # Tabbed product walkthrough with images + AnimatePresence
  ComparisonTable.tsx     # OpsChain vs competitors (env-var gated, sticky column, animated rows)
  SocialProof.tsx         # Testimonial carousel (data-driven, auto-scroll, Framer Motion)
  CTABanner.tsx           # Full-width conversion section
  VerticalCard.tsx        # Industry card with hover lift + compliance tags
  CountdownTimer.tsx      # Live countdown for upcoming webinars
content/
  blog/                   # Blog posts (Markdown + YAML frontmatter)
  datasheets/             # Datasheet content
  webinars/               # Webinar content
  authors.ts              # Author profiles (name, email, role, bio, avatarUrl, links)
  testimonials.ts         # Customer testimonials (quote, name, role, company)
lib/
  content.ts              # Typed content accessors (filtering, sorting, tags, authors)
  search-index.ts         # Build-time search index (blogs, datasheets, webinars, features, solutions, pages)
  utm.ts                  # UTM parameter capture (sessionStorage)
public/
  img/                    # Images and static assets
    product-tour/         # Product tour screenshots (replace placeholder SVGs with real images)
  llms.txt                # LLM discoverability file (llmstxt.org)
velite.config.ts          # Velite content schema definitions (Zod)
```

## Content Management

All content is managed via files in the repository — there is no CMS. Changes are made by editing files, committing, and pushing to trigger a Netlify deploy.

### Blog Posts

| What | Where |
|---|---|
| Add/edit a post | `content/blog/<slug>.md` |
| Frontmatter schema | `velite.config.ts` → `posts` collection |
| Draft visibility | Set `draft: true` in frontmatter (hidden in production, visible when `NEXT_PUBLIC_SHOW_DRAFTS=true`) |

Tags in blog posts are clickable and link to `/blog/tags/[tag]/` which shows a filtered list. Tag pages are generated automatically at build time from all tags used across published posts.

### Datasheets

| What | Where |
|---|---|
| Add/edit a datasheet | `content/datasheets/<slug>.md` |
| Frontmatter schema | `velite.config.ts` → `datasheets` collection |
| Gated download URL | `downloadUrl` field in frontmatter |
| Availability toggle | `available: true/false` in frontmatter |

### Webinars

| What | Where |
|---|---|
| Add/edit a webinar | `content/webinars/<slug>.md` |
| Frontmatter schema | `velite.config.ts` → `webinars` collection |
| Status | Derived from date (upcoming if future, past otherwise); `onDemand: true` for on-demand |
| Recording links | `recordingUrl` in frontmatter |

### Authors

| What | Where |
|---|---|
| Add/edit an author | `content/authors.ts` |
| Avatar | Set `avatarUrl` (gravatar or any image URL) |
| Social links | `links.linkedin`, `links.github`, `links.website` |

Blog posts reference authors by name via the `author` frontmatter field (must match a key in `content/authors.ts`). The author name links to their LinkedIn profile when available.

### Testimonials

| What | Where |
|---|---|
| Add/edit testimonials | `content/testimonials.ts` |
| Fields | `quote`, `name`, `role`, `company` |

When the array is non-empty, a carousel section appears on the homepage with auto-scrolling (6s interval) and dot navigation. When empty, the section is hidden entirely.

### Images

| What | Where |
|---|---|
| Product tour screenshots | `public/img/product-tour/` (replace placeholder SVGs, update extension in `components/ProductTour.tsx`) |
| Site logo | `public/img/opschain-nav-logo.png` |
| Open Graph default | `public/img/og-default.png` (1200×630) |
| Blog post OG images | Set `ogImage` in blog post frontmatter |
| Favicon | `public/img/favicon.ico` |
| General static assets | `public/img/` |

### Pages (Non-Content)

Feature pages, solution pages, and other static pages are React components under `app/`. To update copy or metadata:

| Page type | Where |
|---|---|
| Feature pages | `app/features/<feature-name>/page.tsx` |
| Solution pages | `app/solutions/<solution-name>/page.tsx` |
| Our Approach | `app/our-approach/page.tsx` |
| Homepage sections | `app/page.tsx` (references components in `components/`) |
| Legal pages | `app/privacy/page.tsx`, `app/terms-of-use/page.tsx`, `app/eula/page.tsx` |

### Navigation

| What | Where |
|---|---|
| Navbar links & dropdowns | `components/ui/Navbar.tsx` (edit `featureItems`, `solutionItems`, `resourceItems` arrays) |
| Footer links | `components/ui/Footer.tsx` |

## Search

Client-side search is available via the Navbar search button or `Cmd+K` / `Ctrl+K`. The search index is built at build time and embedded as JSON in every page. It indexes:

- Blog posts (title, description, tags)
- Datasheets
- Webinars
- Feature pages
- Solution pages
- General pages (Why OpsChain, Compare)

## SPA Behavior

The site behaves as a single-page application:
- All internal navigation uses `next/link` (no full page reloads)
- Every page is wrapped in `PageTransition` for consistent enter/exit animations
- `RouteChangeTracker` pushes `page_view` events to the GTM dataLayer on every client-side route change (required for GA4 in SPAs)
- Netlify catch-all redirect (`/* → /index.html`) ensures deep links work

## Analytics (GTM)

GTM is injected as a server-rendered `<script>` directly in `<head>` (not via `next/script`) to ensure it fires on initial page load without waiting for React hydration. The `useGTM` client hook provides `dataLayer.push()` for event tracking in forms, scroll tracking, and CTA clicks.

## Animations

All animations use Framer Motion with named imports only (tree-shaking). Every animated component checks `useReducedMotion()` and disables animations when the user prefers reduced motion.

Key animated components: `Hero` (staggered headline), `StatBar` (counter on scroll), `AnimatedSection` (scroll-reveal), `ProductTour` (tab transitions), `ComparisonTable` (row entrance), `SocialProof` (testimonial carousel), `Navbar` (transparent→solid scroll, animated dropdowns/hamburger), `VerticalCard` (hover lift).

## Deployment

Static export to Netlify. The build produces an `out/` directory.

```bash
npm run build   # rm -rf .next → next build (Velite via webpack plugin) → next-sitemap
```

The `netlify.toml` sets `publish = "out"` and includes the SPA catch-all redirect. The build command clears `.next` cache to prevent stale type errors.

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation including system context diagrams, data flow, configuration reference, and component structure.

Architecture decision records are maintained under [`/docs/adr`](./docs/adr/).
