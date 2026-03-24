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
| Analytics | Google Tag Manager + GA4 (SPA route-change tracking) |
| SEO | next-sitemap, JSON-LD schemas, Open Graph, `llms.txt` |

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

## Project Structure

```
app/                      # Next.js App Router pages
  blog/                   # Blog index + [slug] post pages
  features/               # 7 feature pages (autonomous-agents, governed-intelligence, etc.)
  solutions/              # 3 vertical landing pages (utilities-energy, banking-finance, telecommunications)
  resources/              # Datasheet index + [slug] gated download pages
  webinars/               # Webinar index + [slug] pages (upcoming/past/on-demand)
  why-opschain/           # Positioning page + /compare competitor table
  book-demo/              # Demo request form (Salesforce Web-to-Lead)
  privacy/                # Privacy policy
  terms-of-use/           # Terms of use
  eula/                   # End user licence agreement
components/
  analytics/              # GTMProvider, ScrollTracker, CTAButton, RouteChangeTracker
  forms/                  # SalesforceForm, ContactForm, DemoRequestForm, GatedAssetForm
  seo/                    # JsonLd schema components (Organization, BlogPosting, Event, FAQ)
  ui/                     # Navbar, Footer, FeaturePageLayout
  AnimatedSection.tsx     # Scroll-reveal wrapper (useInView + configurable direction)
  PageTransition.tsx      # Page enter/exit animation (fade + slide)
  Hero.tsx                # Homepage hero with staggered headline animation
  StatBar.tsx             # Animated number counters
  ProductTour.tsx         # Tabbed product walkthrough with AnimatePresence
  ComparisonTable.tsx     # OpsChain vs competitors (sticky column, animated rows)
  SocialProof.tsx         # Logo marquee + testimonial carousel
  CTABanner.tsx           # Full-width conversion section
  VerticalCard.tsx        # Industry card with hover lift + compliance tags
  CountdownTimer.tsx      # Live countdown for upcoming webinars
content/
  blog/                   # Blog posts (Markdown + YAML frontmatter)
  datasheets/             # Datasheet content
  webinars/               # Webinar content
lib/
  content.ts              # Typed content accessors (imports from .velite/)
  utm.ts                  # UTM parameter capture (sessionStorage)
public/
  img/                    # Images and static assets
  llms.txt                # LLM discoverability file (llmstxt.org)
velite.config.ts          # Velite content schema definitions (Zod)
```

## Content Management

Blog posts, datasheets, and webinars are Markdown files with YAML frontmatter in `content/`. Velite validates schemas at build time via Zod and generates typed TypeScript imports in `.velite/`.

See `docs/contributing/blog-authoring.md` for the blog frontmatter schema and authoring guidelines.

## SPA Behavior

The site behaves as a single-page application:
- All internal navigation uses `next/link` (no full page reloads)
- Every page is wrapped in `PageTransition` for consistent enter/exit animations
- `RouteChangeTracker` pushes `page_view` events to the GTM dataLayer on every client-side route change (required for GA4 in SPAs)
- Netlify catch-all redirect (`/* → /index.html`) ensures deep links work

## Animations

All animations use Framer Motion with named imports only (tree-shaking). Every animated component checks `useReducedMotion()` and disables animations when the user prefers reduced motion.

Key animated components: `Hero` (staggered headline), `StatBar` (counter on scroll), `AnimatedSection` (scroll-reveal), `ProductTour` (tab transitions), `ComparisonTable` (row entrance), `Navbar` (transparent→solid scroll, animated dropdowns/hamburger), `VerticalCard` (hover lift).

## Deployment

Static export to Netlify. The build produces an `out/` directory.

```bash
npm run build   # next build (Velite runs via webpack plugin) → next-sitemap (generates sitemap + robots.txt)
```

The `netlify.toml` sets `publish = "out"` and includes the SPA catch-all redirect.

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation including system context diagrams, data flow, configuration reference, and component structure.

Architecture decision records are maintained under [`/docs/adr`](./docs/adr/).
