# OpsChain Website Review & Recommendations

**Date:** 2026-03-24
**Reviewer:** Senior B2B Technology Marketing & Web Strategy Consultant (AI-assisted)
**Site:** https://www.opschain.io
**Platform:** Docusaurus 3 + React 19, deployed via Netlify

---

## 1. Executive Summary

- **No robots.txt** — returns 404. Search engines have no crawling guidance and can't find the sitemap.
- **Critical SEO defects on key pages** — homepage has no H1; book-demo page meta description is literally `<iframe>`; title tags are generic ("OpsChain" on homepage and demo page); no JSON-LD structured data on any marketing page.
- **No Salesforce integration on the live site** — the only lead capture is an embedded Airtable iframe on `/book-demo`. A Salesforce Web-to-Lead form exists at `/salesforce.html` but is not linked from anywhere and is in debug mode (emails routed to a developer). Zero CRM pipeline for leads.
- **No GTM container** — GA4 is implemented via direct gtag.js with no custom event tracking. No form submission events, CTA clicks, scroll depth, or conversion events are being captured. No attribution data (UTMs) is being collected anywhere.
- **Extremely thin content** — only 12 indexable URLs in the sitemap. Five feature pages are 3–4 paragraphs each with no technical depth, diagrams, or use cases. No blog, no case studies, no datasheets, no webinar content, no vertical-specific landing pages. The site has virtually no content moat for SEO or AI search.
- **Missing pages for all five personas** — no partner page, no integrations page, no pricing/packaging page, no resources/content hub, no vertical landing pages (Utilities, Banking, Telco). CISOs and compliance buyers see no mention of specific frameworks (NERC CIP, PCI-DSS, IEC 62443, APRA CPS 234).
- **Homepage has no primary CTA** — the hero section has no "Book a Demo" button. Two of six homepage feature cards have no link at all.
- **Blog content is ready but unmerged** — 21 blog posts on the `blog/the-cost-of-change-in-enterprise-operations` branch are well-written but have build-breaking link errors and stale dates that must be fixed before merge.

---

## 2. Dimension-by-Dimension Findings

### 2.1 SEO & AI Search Optimisation

#### Title Tags — **Weak**

| Page | Current Title | Recommended |
|------|--------------|-------------|
| Homepage | `OpsChain` | `OpsChain \| Enterprise Operations Automation & Governance Platform` |
| Book Demo | `OpsChain` | `Book a Demo \| OpsChain` |
| Our Approach | `Our Approach? \| OpsChain` | Adequate |
| Features | `OpsChain features \| OpsChain` | Adequate |

**Recommendation:** Add descriptive, keyword-rich titles to every page via frontmatter or component-level `<Head>` tags.

#### Meta Descriptions — **Weak**

- Homepage: tagline-as-description (adequate but not optimised for click-through)
- Book Demo: **`<iframe>`** — critical bug; Docusaurus auto-extracted iframe markup as the description
- Feature pages: using taglines ("Automation You Can Trust") instead of descriptive sentences
- Legal pages: none at all

**Recommendation:** Write unique, 150–160 character meta descriptions for every page. For book-demo, add frontmatter `description:` field immediately.

#### Heading Structure — **Weak**

- Homepage: **No H1 tag**. Hero text is an `<h2>`. Critical SEO violation.
- Feature pages: All use `###` (H3) as primary heading, creating H1→H3 gap (Docusaurus renders `title` as H1 but content skips H2).
- Our Approach: Uses H4 inside blockquotes for styling, skipping H3.

**Recommendation:** Fix homepage to render hero as H1. Restructure feature page content to use H2/H3 properly.

#### Schema Markup (JSON-LD) — **Missing**

- Only auto-generated `BreadcrumbList` on docs pages (from Docusaurus).
- No `Organization`, `WebSite`, `Product`, `SoftwareApplication`, or `FAQPage` schema anywhere.

**Recommendation (Quick Win):** Add to `docusaurus.config.js` headTags:
- `Organization` schema (name, URL, logo, sameAs for LinkedIn/GitHub)
- `WebSite` schema with `SearchAction`
- `Product` or `SoftwareApplication` schema on feature pages

#### robots.txt — **Missing (404)**

**Recommendation (Quick Win):** Create `static/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://opschain.io/sitemap.xml
```

#### Sitemap — **Adequate**

- 12 URLs, all at priority 0.5 with no `<lastmod>`.
- Homepage should be priority 1.0; features/why should be 0.8.

**Recommendation:** Configure `@docusaurus/plugin-sitemap` `priority` and `changefreq` overrides.

#### Keyword Strategy — **Weak**

Target terms like "change orchestration", "infrastructure change management", "GitOps pipeline automation", "compliance-driven change control" are **absent** from page titles, H1s, and meta descriptions. The site uses internal product language ("Governed Intelligence", "Pluggable Automation") rather than buyer search language.

**Recommendation:** Conduct keyword mapping exercise. Ensure each feature page targets 1–2 primary search terms in its title, H1, meta description, and first paragraph.

#### AI/LLM Discoverability — **Missing**

- No `llms.txt` file
- No structured FAQs
- No clear entity definitions ("OpsChain is a…" paragraph)
- Product descriptions use marketing language rather than LLM-parseable factual statements

**Recommendation:** Create `static/llms.txt` with:
```
# OpsChain
> Enterprise operations automation and governance platform by LimePoint

OpsChain is a change management and orchestration platform for enterprise DevOps,
infrastructure, and platform engineering teams. It provides autonomous AI agents,
governed intelligence, unified workflow orchestration, and compliance-ready
audit trails.

## Key Pages
- [Features](/docs/product/features/)
- [Our Approach](/our-approach)
- [Documentation](https://docs.opschain.io)
- [Book a Demo](/book-demo)
```

Also add a clear "What is OpsChain?" definition paragraph to the homepage (currently missing — the site never states what the product *is* in plain language).

#### Core Web Vitals / Mobile — **Not Assessed**

Requires Lighthouse/PageSpeed testing. Docusaurus static sites generally perform well, but the DarkRing.webp background and Airtable iframe could impact LCP.

#### Internal Linking — **Weak**

- Feature pages don't link to each other
- No cross-links from feature pages to our-approach
- Homepage features for Observability and Analytics have **no links at all**
- Why-opschain links only to book-demo, not to any feature pages

**Recommendation:** Add contextual cross-links between feature pages and ensure every content section links somewhere.

---

### 2.2 Salesforce Integration

#### Current State — **Missing**

The live site has **zero Salesforce integration**. Lead capture is entirely through an Airtable iframe on `/book-demo`.

A Salesforce Web-to-Lead form exists at `src/pages/salesforce.html` (Org ID: `00DQE00000BdTqD`) but:
- It is **not linked** from any page or navigation
- It is in **debug mode** (emails go to `gstankovski@limepoint.com`)
- It uses reCAPTCHA v2 with a specific site key
- The form has extensive fields (name, email, company, city, country, state, website, phone, mobile, email opt-out, do-not-call)

#### Recommendations (Priority Order)

1. **Replace Airtable iframe with Salesforce Web-to-Lead React component** — Build a React form component that POSTs to the Salesforce Web-to-Lead endpoint. This gives full control over styling, field mapping, validation, and event tracking. The Airtable iframe is a black box that prevents:
   - GA4 form submission tracking
   - UTM parameter capture
   - Custom field mapping
   - Consistent branding
   - Accessibility compliance

2. **Minimum fields for demo form:** First Name, Last Name, Work Email, Company, Job Title. Add hidden fields for:
   - `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` (read from URL params)
   - `lead_source` = "Website"
   - `page_url` = current page URL
   - `form_name` = "Book Demo" / "Datasheet Download" / etc.

3. **Salesforce campaign mapping:** Create SFDC campaigns for each lead source:
   - `WEB-DEMO` — demo requests
   - `WEB-DATASHEET-{name}` — per-datasheet downloads
   - `WEB-WEBINAR-{name}` — per-webinar registrations
   - `WEB-BLOG` — blog CTA conversions

4. **Progressive profiling:** First touch captures email + name + company only. Subsequent forms (gated content) pre-fill known fields and ask for additional data (phone, job title, team size).

5. **Implementation approach for Docusaurus:** Create a `src/components/SalesforceForm/` React component that:
   - Renders a styled form matching the site's Infima design system
   - On submit, POSTs to `https://webto.salesforce.com/servlet/servlet.WebToLead`
   - Shows a thank-you message / triggers download on success
   - Fires GA4 events via `gtag('event', ...)`
   - Reads UTM params from `window.location.search`

---

### 2.3 Signal Capture & Analytics

#### Current State — **Weak**

- **GA4:** Active (`G-6JPFLV2MP6`) via direct gtag.js plugin. IP anonymisation enabled.
- **GTM:** Not present. Using direct gtag.js only.
- **Events:** No custom events. Only automatic pageviews.
- **No form tracking** — Airtable iframe prevents any form event capture.
- **No UTM capture** — no mechanism to read or store UTM parameters.
- **No conversion events** — no GA4 conversions configured.

#### Recommendations

1. **Migrate from gtag.js to GTM** — Replace `@docusaurus/plugin-google-gtag` with a GTM container script in `docusaurus.config.js` `headTags`. GTM enables:
   - Non-developer event configuration
   - Salesforce integration via server-side tagging (future)
   - Consent management
   - Easier debugging

2. **GA4 events to implement:**

   | Event | Trigger | Parameters |
   |-------|---------|------------|
   | `form_submit` | Salesforce form submission | `form_name`, `page_url` |
   | `cta_click` | Any CTA button click | `cta_text`, `cta_destination`, `page_url` |
   | `outbound_click` | External link clicks (docs.opschain.io, limepoint.com) | `link_url` |
   | `asset_download` | PDF/datasheet download | `asset_name`, `asset_type` |
   | `scroll_depth` | 25%, 50%, 75%, 90% | `percent_scrolled`, `page_url` |
   | `video_play` | YouTube embed play | `video_title` |
   | `demo_request` | Demo form completion | `lead_source` |

3. **UTM taxonomy:**
   - `utm_source`: google, linkedin, partner-{name}, email, direct
   - `utm_medium`: cpc, organic, social, email, referral, partner
   - `utm_campaign`: {vertical}-{asset-type}-{quarter} (e.g., `utilities-datasheet-q2-2026`)
   - `utm_content`: {cta-variant} (e.g., `hero-cta`, `sidebar-cta`)

4. **First-party data strategy:** Since Docusaurus is static and the site targets enterprise buyers (low volume, high value), aggressive cookie banners are unnecessary. Implement:
   - GA4 consent mode v2 (default grants for analytics, deny for ads until consent)
   - Store UTM params in `sessionStorage` on first page load
   - Pass UTMs as hidden fields on all Salesforce forms

---

### 2.4 Content Strategy & Resource Centre

#### Current State — **Missing**

The site has **12 indexable pages total**. No blog, no case studies, no datasheets, no webinars, no resource centre. This is critically thin for B2B enterprise SEO and provides almost no content for AI search engines to cite.

#### Blog / Thought Leadership — **Missing (Ready to Merge)**

The `blog/the-cost-of-change-in-enterprise-operations` branch contains 21 posts. Assessment:

**Strengths:**
- Professional, authoritative tone appropriate for enterprise audience
- Well-structured 10-part series with cross-linking
- The "Change Efficiency Index (CEI)" post is genuinely differentiated — introduces an original financial framework targeting CFOs/CIOs
- Consistent formatting with clear CTAs

**Issues to fix before merge:**
1. **Build-breaking link errors** — Series index links to `/blog/connecting-servicenow-github-and-change` but actual slug is `connecting-servicenow-github-and-the-real-world-of-change`. Same issue with `rethinking-change-management-for-ai-era` vs `rethinking-change-management-for-the-ai-era`. These will fail the build (`onBrokenLinks: throw`).
2. **Stale dates** — All posts dated November 2025. Update to current/future dates.
3. **Duplicate `postsPerPage` key** in docusaurus.config.js blog config.
4. **Glob syntax errors** in exclude patterns: `'**/DRAFT*.{md|mdx}'` should be `'**/DRAFT*.{md,mdx}'`.
5. **Heavy product promotion** — Most posts read as product briefs rather than independent thought leadership. The CEI post is the model to follow.

**Content calendar recommendation (post-merge):**
- **Persona clusters:** Platform Engineering (GitOps, IaC governance), Compliance (audit trails, regulated change), Operations (automation ROI, cost reduction)
- **Cadence:** 2 posts/month minimum
- **SEO targets per post:** One primary keyword per post, targeting long-tail queries like "how to automate change management in regulated industries"

#### Datasheets & Brochures — **Missing**

**Recommendation:** Create gated datasheet pages using this pattern:

```
/resources/datasheets/{name}
```

Page structure:
1. Headline + 2-sentence description (ungated, indexable by search)
2. Key highlights (3–5 bullet points, ungated)
3. Salesforce Web-to-Lead form (name, email, company, job title)
4. On form submit: reveal download link + fire GA4 `asset_download` event
5. Thank-you email with download link (via Salesforce workflow)

**Implementation in Docusaurus:** Build a `GatedAsset` React component that:
- Shows form pre-download
- On submit, POSTs to Salesforce, then sets React state to show download link
- Uses `sessionStorage` to remember the user for subsequent downloads (progressive profiling)

**Priority datasheets:**
1. OpsChain Platform Overview (general)
2. OpsChain for Utilities & Energy (NERC CIP, IEC 62443)
3. OpsChain for Banking & Financial Services (PCI-DSS, APRA CPS 234)
4. OpsChain for Telecommunications (IEC 62443, 5G/IMS)
5. OpsChain vs. ServiceNow Change Management (competitive)

#### Webinar / Events Page — **Missing**

**Recommended URL structure:**
```
/resources/webinars                    → listing page (upcoming + past)
/resources/webinars/{slug}             → individual webinar (registration or recording)
```

**Three-state architecture:**

| State | Content | CTA | Schema |
|-------|---------|-----|--------|
| Upcoming | Title, date/time, description, speaker bios | Zoom registration link (external) | `Event` with `eventStatus: EventScheduled` |
| Past | Title, date, summary | "Watch recording" (gated) | `Event` with `eventStatus: EventCompleted` |
| On-demand | Title, description, recording | Salesforce form → reveal video | `Event` + `VideoObject` |

**Implementation:** Create an MDX page for each webinar with frontmatter fields (`date`, `status`, `zoomLink`, `recordingUrl`). Build a `WebinarListing` React component that filters by status.

#### Case Studies — **Missing**

The `docs/product/case-studies/` directory exists in the working tree but isn't committed. No case studies are live.

**Recommended format per case study:**
```
/resources/case-studies/{customer-slug}
```
Structure: Challenge → Solution → Results (with quantified metrics) → Customer quote. Include `schema.org/Article` markup.

#### Technical Documentation Links — **Adequate**

`docs.opschain.io` is linked from navbar and footer. However:
- **Issue:** docs.opschain.io displays a Docusaurus `baseUrl` configuration error banner — visible deployment issue that undermines credibility.
- **Recommendation:** Fix the docs site configuration. Add a "For Developers" section on the marketing site with links to: Getting Started, API Reference, GitHub, and CLI download.

#### Partner / Integrations Page — **Missing**

No partner page, no integrations page, no ecosystem content. Tool logos (Ansible, Terraform, Kubernetes) exist in `static/img/` but aren't used on any marketing page.

**Recommendation:** Create `/partners` and `/integrations` pages. The integrations page should show supported tools (using the existing logos) and link to technical docs for each.

---

### 2.5 Navigation & Information Architecture

#### Current State — **Weak**

**Current Navbar:** Logo | Our Approach | Features ▾ | Documentation | [Book Demo]

**Issues:**
1. Features dropdown parent (`href="#"`) is not clickable — should link to `/docs/product/features/`
2. No "Resources" section (blog, case studies, datasheets, webinars)
3. No "Solutions" or "Industries" section for vertical content
4. No "Company" section (about, contact, partners) — these are buried in footer and link externally to limepoint.com
5. "Documentation" links externally with no visual indicator that it leaves the site
6. Only one CTA (Book Demo) — no secondary CTA for lower-commitment actions (e.g., "Watch Demo", "Download Datasheet")

**Homepage Hero Issues:**
- No H1 tag
- No primary CTA button (Book Demo is only in navbar)
- Value proposition ("Enterprise Operations. Intelligent. Autonomous. Governed.") is abstract — a cold visitor cannot understand what the product does within 5 seconds
- No sub-headline explaining the product category
- No social proof (customer logos, metrics)

**Recommendation — Revised Hero:**
```
H1: Automate and Govern Enterprise Operations at Scale
Sub: OpsChain is the AI-powered operations platform that orchestrates change
     across your infrastructure — with full audit trails and compliance built in.
CTA1: [Book a Demo]  CTA2: [Watch Overview →]
Social proof: Trusted by teams in utilities, banking, and telecommunications
```

---

### 2.6 Messaging & Positioning

#### "What is OpsChain?" — **Weak**

The site never clearly states what OpsChain *is* in a single, plain-language sentence. The homepage leads with "Enterprise Operations. Intelligent. Autonomous. Governed." — which is a tagline, not a definition. A technical evaluator visiting for the first time must click through multiple pages to understand the product category.

**Recommendation:** Add a clear definition to the homepage above the fold:
> "OpsChain is an enterprise operations platform that automates infrastructure change management with AI-powered agents, governed workflows, and end-to-end audit trails."

#### Competitive Differentiation — **Weak**

No comparison to alternatives. No "OpsChain vs." content. The site doesn't address:
- How OpsChain differs from ServiceNow Change Management
- Our Approach over Jenkins/Ansible/Terraform pipelines alone
- What OpsChain adds beyond custom-scripted change tooling

**Recommendation:** Create a `/our-approach/compare` page with comparison tables for each alternative. Target search terms like "ServiceNow change management alternative" and "GitOps change governance."

#### Vertical Messaging — **Missing**

No vertical-specific content for the three priority verticals:

| Vertical | Compliance Frameworks | Current Content | Gap |
|----------|----------------------|-----------------|-----|
| Utilities & Energy | NERC CIP, IEC 62443 | None | No landing page, no framework mentions |
| Banking & Financial Services | PCI-DSS, APRA CPS 234 | None | No landing page, no framework mentions |
| Telecommunications | IEC 62443, 5G/IMS | None | No landing page, no framework mentions |

**Recommendation:** Create `/solutions/utilities`, `/solutions/banking`, `/solutions/telecommunications` with:
- Vertical-specific problem statement
- Compliance framework alignment
- Use case examples
- Vertical-relevant CTA (demo, datasheet download)
- `schema.org/Product` structured data with `audience` field

#### Buyer Language Alignment — **Weak**

The site uses internal product terminology ("Governed Intelligence", "Pluggable Automation") rather than terms buyers search for ("change management automation", "infrastructure orchestration", "DevOps governance", "compliance-ready automation"). Feature page titles should lead with buyer language, with product branding as secondary.

---

### 2.7 Trust, Social Proof & Enterprise Readiness

#### Customer Logos / Testimonials — **Missing**
No customer logos, testimonials, or case studies anywhere on the site. For an enterprise product, this is a significant credibility gap.

#### Security / Compliance Badges — **Missing**
No mention of SOC 2, ISO 27001, or any certification. The security feature page is generic with no specifics.

#### Analyst Recognition — **Missing**
No Gartner, Forrester, or analyst mentions on the marketing site (though the blog CEI post references Gartner data).

#### Partner Ecosystem — **Missing**
No AWS/Azure/GCP marketplace listings, no SI partner logos, no partner programme page. Tool logos exist in static assets but aren't displayed.

#### Pricing / Packaging — **Missing**
No pricing page, no packaging tiers, no "Talk to Sales" strategy beyond the demo form. Enterprise buyers expect at minimum a "Contact for Pricing" page that signals enterprise-grade engagement.

#### Copyright — **Outdated**
Footer shows "Copyright © 2025" — should be 2026.

---

## 3. Quick Wins (0–30 days)

Changes requiring no rebuild — meta tags, schema, static files, config changes, and copy fixes:

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | Create `static/robots.txt` with sitemap reference | Critical SEO fix | 5 min |
| 2 | Fix book-demo meta description (add `description:` to MDX frontmatter) | Critical SEO fix | 5 min |
| 3 | Fix homepage H1 (change hero `<h2>` to `<h1>` in `src/pages/index.js`) | SEO | 10 min |
| 4 | Add descriptive title to homepage (`siteConfig` or `<Head>` override) | SEO | 10 min |
| 5 | Add `title` and `description` frontmatter to `book-demo.mdx` | SEO | 5 min |
| 6 | Create `static/llms.txt` for AI search discoverability | AI SEO | 30 min |
| 7 | Add JSON-LD `Organization` schema to `docusaurus.config.js` headTags | SEO | 30 min |
| 8 | Fix copyright year in footer (2025 → 2026) | Credibility | 5 min |
| 9 | Fix feature page heading hierarchy (H3 → H2) | SEO | 15 min |
| 10 | Write proper meta descriptions for all feature pages (replace taglines) | SEO | 30 min |
| 11 | Fix image alt text on homepage ("Screenshot 2023-06-27 at 5" → descriptive) | Accessibility/SEO | 10 min |
| 12 | Add primary "Book a Demo" CTA button to homepage hero section | Conversion | 15 min |
| 13 | Add links to Observability and Analytics feature cards on homepage | UX/Conversion | 10 min |
| 14 | Fix Features dropdown parent link (`href="#"` → `/docs/product/features/`) | UX | 5 min |
| 15 | Add `title` attribute to Airtable iframe on book-demo (accessibility) | WCAG | 5 min |
| 16 | Remove duplicate paragraph on Our Approach page | Content quality | 5 min |
| 17 | Add OG social sharing image (1200×630) to replace nav logo | Social sharing | 1 hr |

---

## 4. Medium-Term (1–3 months)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | Build Salesforce Web-to-Lead React form component (`src/components/SalesforceForm/`) | Lead capture | 1–2 weeks |
| 2 | Replace Airtable iframe on `/book-demo` with Salesforce React form | CRM integration | 1 day (after #1) |
| 3 | Implement GTM container, replace direct gtag.js | Analytics maturity | 1 week |
| 4 | Configure GA4 custom events (form_submit, cta_click, scroll_depth, outbound_click) | Signal capture | 1 week |
| 5 | Fix and merge blog branch (fix broken links, stale dates, glob syntax, duplicate config) | Content/SEO | 2–3 days |
| 6 | Build `GatedAsset` React component for datasheet downloads | Lead gen | 1 week |
| 7 | Create placeholder datasheet pages with Salesforce-gated download | Lead gen | 1 week |
| 8 | Create `/solutions/utilities`, `/solutions/banking`, `/solutions/telecommunications` landing pages | Vertical targeting | 2 weeks |
| 9 | Create `/integrations` page using existing tool logos (Ansible, Terraform, Kubernetes) | Technical credibility | 1 week |
| 10 | Add "What is OpsChain?" definition paragraph to homepage | Messaging clarity | 1 day |
| 11 | Create comparison content (OpsChain vs. ServiceNow, vs. CI/CD pipelines) | Competitive positioning | 1 week |
| 12 | Add customer logos / testimonials to homepage (if available) | Trust/social proof | 1 day |
| 13 | Fix docs.opschain.io `baseUrl` configuration error | Credibility | 1 day |
| 14 | Implement UTM parameter capture in sessionStorage + pass to all forms | Attribution | 2 days |
| 15 | Restructure navbar: add Resources dropdown, Solutions dropdown | Navigation/IA | 1 week |

---

## 5. Strategic (3–6 months)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | Full content programme: 2 blog posts/month, 1 case study/quarter, 1 datasheet/quarter | SEO/Authority | Ongoing |
| 2 | Build webinar/events page architecture (upcoming, past, on-demand with gating) | Lead gen | 2–3 weeks |
| 3 | Implement lead scoring model in Salesforce based on page visits and asset downloads | Sales efficiency | 2–4 weeks |
| 4 | Create FAQ sections on feature pages with `FAQPage` schema markup | AI search / SEO | 2 weeks |
| 5 | Evaluate Docusaurus vs. marketing-oriented platform (see Platform section below) | Long-term scale | 2 weeks eval |
| 6 | Introduce headless CMS layer (Decap/Tina CMS) for non-technical content contributors | Content velocity | 2–3 weeks |
| 7 | Build AI search presence programme: ensure OpsChain is cited in ChatGPT, Perplexity, Gemini, Claude for relevant queries | Brand discovery | Ongoing |
| 8 | Implement progressive profiling across all forms | Lead quality | 2 weeks |
| 9 | Create partner programme page and SI enablement content | Channel | 2 weeks |
| 10 | Add security/compliance badges and certifications to relevant pages | Trust | As available |
| 11 | Regional landing page support for ANZ, Europe, USA, Japan, Singapore campaigns | Internationalisation | 4 weeks |
| 12 | Implement hreflang tags if Japanese content is planned | i18n SEO | 1 week |

---

## 6. Revised Sitemap Recommendation

```
/                                          Homepage
├── /our-approach                          Our Approach (positioning)
│   └── /our-approach/compare              Competitive comparison (vs ServiceNow, CI/CD)
│
├── /features/                             Features overview
│   ├── /features/autonomous-agents        Autonomous Agents
│   ├── /features/governed-intelligence    Governed Intelligence
│   ├── /features/workflow-orchestration   Unified Workflow Orchestration
│   ├── /features/pluggable-automation     Pluggable Automation
│   ├── /features/security-compliance      Security, Auditability & Compliance
│   ├── /features/observability            Real-Time Observability (currently unlinked)
│   └── /features/analytics                Analytics & Continuous Improvement (currently unlinked)
│
├── /solutions/                            Solutions by industry
│   ├── /solutions/utilities               Utilities & Energy (NERC CIP, IEC 62443)
│   ├── /solutions/banking                 Banking & Financial Services (PCI-DSS, APRA CPS 234)
│   └── /solutions/telecommunications      Telecommunications (IEC 62443, 5G/IMS)
│
├── /resources/                            Resource centre hub
│   ├── /blog/                             Blog / thought leadership
│   ├── /resources/case-studies/           Case studies
│   │   └── /resources/case-studies/{slug}
│   ├── /resources/datasheets/             Datasheets & brochures (gated)
│   │   └── /resources/datasheets/{slug}
│   └── /resources/webinars/               Webinars & events
│       └── /resources/webinars/{slug}
│
├── /integrations                          Integrations & ecosystem
├── /partners                              Partner programme
├── /pricing                               Pricing / contact sales
├── /book-demo                             Book a demo (Salesforce form)
│
├── /docs/ → docs.opschain.io             Technical documentation (external)
│
├── /privacy                               Privacy policy
├── /terms-of-use                          Terms of use
├── /eula                                  End user licence agreement
│
├── /robots.txt                            Search engine directives
├── /sitemap.xml                           XML sitemap
└── /llms.txt                              LLM discoverability file
```

**Navigation restructure:**

```
Logo | Our Approach | Features ▾ | Solutions ▾ | Resources ▾ | Integrations | Docs↗ | [Book Demo]
```

- **Features ▾**: Autonomous Agents, Governed Intelligence, Workflow Orchestration, Security & Compliance, Pluggable Automation, Observability, Analytics
- **Solutions ▾**: Utilities & Energy, Banking & Financial Services, Telecommunications
- **Resources ▾**: Blog, Case Studies, Datasheets, Webinars

---

## 7. Platform Assessment: Docusaurus Suitability

### Where Docusaurus Works Well
- **Feature documentation pages** — the docs plugin with auto-generated sidebars is ideal
- **Blog** — native support with MDX, tags, pagination, RSS
- **SEO basics** — sitemap generation, canonical URLs, meta tags via frontmatter
- **Performance** — static site generation produces fast, CDN-friendly output
- **Developer workflow** — git-based content, PR reviews, CI/CD via Netlify

### Where Docusaurus Creates Friction
- **Marketing landing pages** — requires custom React components for anything beyond basic MDX; no visual builder
- **Forms** — no native form handling; requires React components or third-party embeds
- **Gated content** — requires client-side React logic for form-then-download flows; no server-side support
- **Dynamic content** — webinar schedules, event status toggling, personalisation all require client-side state management
- **Non-technical contributors** — file-based content model with MDX frontmatter is a barrier for marketing teams

### Recommendation
Docusaurus is **adequate for the current stage** (small team, developer-led content). However, as the content programme scales:
- **Short-term (now):** Stay on Docusaurus. Add Decap CMS or Tina CMS for blog/resource content management by non-developers.
- **Medium-term evaluation (6 months):** If the marketing team grows or content velocity needs to exceed 4 pieces/month, evaluate migration to **Next.js + headless CMS** (Contentful, Sanity, or Storyblok) or **Webflow** for marketing pages with Docusaurus retained for technical docs only.
- **Do not migrate now** — the content gaps are the priority, not the platform. Platform migration without content is wasted effort.

---

## 8. Internationalisation Assessment

### Current State
- Single locale (`en`), no hreflang tags, no regional content
- Compliance references are generic (no region-specific frameworks mentioned)
- No geo-targeting or regional landing pages

### Recommendation
Given the multi-region footprint (ANZ, Europe, USA, Japan, Singapore):

1. **Do not over-engineer now** — English-only is appropriate for the current stage
2. **Support campaign URLs** — ensure the site structure can accommodate `/solutions/banking?region=anz` or `/campaigns/apra-compliance` style UTM landing pages without architectural changes
3. **Add region-specific compliance mentions** — APRA CPS 234 on banking pages targeting ANZ, GDPR references for European campaigns, NERC CIP for US utilities
4. **If Japanese content is planned** — Docusaurus supports i18n natively with `i18n` config. Add hreflang tags and `/ja/` prefix routes when ready. Do not pre-build the i18n infrastructure until content is committed.
5. **Privacy policy** — current policy references only Australian privacy law. Add GDPR provisions (data subject rights, DPO contact, lawful basis) before running European campaigns.

---

## 9. Detailed Page-Level Findings

### Homepage (`/`)

| Element | Current State | Rating | Action |
|---------|--------------|--------|--------|
| Title tag | `OpsChain` | Weak | Add value proposition |
| Meta description | Tagline only | Adequate | Rewrite for CTR |
| H1 | Missing (hero is H2) | Weak | Fix to H1 |
| Hero CTA | None | Missing | Add Book Demo + secondary CTA |
| Product definition | None | Missing | Add "What is OpsChain?" |
| Social proof | None | Missing | Add customer logos |
| Feature cards | 6 cards, 2 without links | Adequate | Add links to all |
| JSON-LD | None | Missing | Add Organization + WebSite |
| OG image | Nav logo (small) | Weak | Create 1200×630 social image |
| Image alt text | "Screenshot 2023-06-27 at 5" | Weak | Write descriptive alt text |

### Book Demo (`/book-demo`)

| Element | Current State | Rating | Action |
|---------|--------------|--------|--------|
| Title tag | `OpsChain` | Weak | Change to "Book a Demo" |
| Meta description | `<iframe>` | Critical bug | Add frontmatter description |
| H1 | None | Missing | Add heading |
| Form | Airtable iframe | Weak | Replace with Salesforce React form |
| Context copy | None | Missing | Add value prop + what to expect |
| Iframe accessibility | No title attribute | Weak | Add title |
| GA4 tracking | None (iframe blocks it) | Missing | Implement with native form |

### Feature Pages (all 5)

| Element | Current State | Rating | Action |
|---------|--------------|--------|--------|
| Meta descriptions | Taglines, not descriptions | Weak | Write proper descriptions |
| Heading hierarchy | H3 used as primary (skipping H2) | Weak | Fix to H2 |
| Content depth | 3–4 paragraphs each | Weak | Expand with details, diagrams, use cases |
| Image alt text | Generic "img" | Weak | Write descriptive alt text |
| Cross-links | None between features | Missing | Add related feature links |
| Technical specifics | Generic claims | Weak | Add architecture details, tool names |
| CTA consistency | Different wording per page | Adequate | Standardise CTA text |

### Our Approach (`/our-approach`)

| Element | Current State | Rating | Action |
|---------|--------------|--------|--------|
| Title / meta | Good | Strong | — |
| H1 | Present | Strong | — |
| Content | Duplicate paragraph | Weak | Remove duplicate |
| Heading hierarchy | Skips H3, uses H4 in blockquotes | Weak | Fix hierarchy |
| Layout | Docs-like with ToC sidebar | Adequate | Consider marketing layout |
| Cross-links to features | None | Missing | Add feature page links |

### Legal Pages (`/privacy`, `/terms-of-use`, `/eula`)

| Element | Current State | Rating | Action |
|---------|--------------|--------|--------|
| Meta descriptions | None | Missing | Add basic descriptions |
| GDPR provisions | None | Missing | Add before EU campaigns |
| Contact mechanism | "Contact us" with no details | Weak | Add email/form |
| EULA currency | References MintPress, DriftGuard | Adequate | Verify still current |
| Last updated dates | EULA: Feb 2023 | Adequate | Review and update |
