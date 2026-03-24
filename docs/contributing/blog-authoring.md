# Blog Authoring Guide

## Creating a New Post

Create a new Markdown file in `content/blog/` with the following frontmatter:

```markdown
---
title: "Your Post Title"
date: "2026-03-24T10:00"
description: "A concise summary of the post (150-160 characters). Used as meta description."
author: "Author Name"
slug: "your-post-slug"
tags:
  - Tag1
  - Tag2
draft: false
ogImage: "/img/blog/your-image.png"
---

Your post content here...
```

## Frontmatter Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title. Used in H1, page title, OG title. |
| `date` | string (ISO 8601) | Yes | Publication date. Format: `YYYY-MM-DDTHH:mm` |
| `description` | string | Yes | Meta description. 150-160 characters for SEO. |
| `author` | string | Yes | Author full name. |
| `slug` | string | Yes | URL slug. Must be unique. URL: `/blog/{slug}/` |
| `tags` | string[] | No | Array of tag strings for categorisation. |
| `draft` | boolean | No | Set to `true` to hide from production builds. |
| `ogImage` | string | No | Path to Open Graph image (1200x630px recommended). Falls back to default. |

## Content Guidelines

- Use H2 (`##`) as the top-level heading within the post body (H1 is rendered from the title).
- Include a compelling introduction in the first paragraph — it may be shown in listings.
- Use descriptive alt text for all images.
- Internal links should use relative paths: `/blog/other-post-slug/`.
- Add images to `public/img/blog/` and reference them as `/img/blog/filename.png`.

## Draft Posts

Posts with `draft: true` are visible in development but excluded from production builds. Use this for work-in-progress content.

## Tags

Consistent tagging helps with related post discovery. Current tag categories:

- **Technology**: AI, AIOps, Agentic AI, DevOps, Platform Engineering, CICD
- **Governance**: Governance, Compliance, Change Management, Audit
- **Product**: OpsChain, Governed Automation, Governed Intelligence
- **Industry**: ServiceNow, GitHub, GitHub Actions
- **Series**: Modern Operations without Friction

## Editing via Tina CMS

Non-developers can create and edit blog posts using the Tina CMS admin interface at `/admin`. Changes are saved as Git commits.
