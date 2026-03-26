import { posts, datasheets, webinars } from '@/.velite'
import authors, { type Author } from '@/content/authors'

export type { Author }
export type BlogPost = (typeof posts)[number]
export type Datasheet = (typeof datasheets)[number]
export type Webinar = (typeof webinars)[number]

export function getAuthor(name: string): Author | undefined {
  return authors[name]
}

const WORDS_PER_MINUTE = 230

export function readingTime(post: { metadata: { wordCount: number } }): number {
  const minutes = post.metadata.wordCount / WORDS_PER_MINUTE
  return Math.max(1, Math.ceil(minutes))
}

function isDraftVisible(): boolean {
  const value = process.env.NEXT_PUBLIC_SHOW_DRAFTS
  // Default to false — drafts are hidden unless explicitly set to 'true'
  return value !== undefined && value !== null && value.toLowerCase() === 'true'
}

export function isDatasheetsVisible(): boolean {
  const value = process.env.NEXT_PUBLIC_SHOW_DATASHEETS
  // Default to true — datasheets are shown unless explicitly set to 'false'
  return value === undefined || value === null || value.toLowerCase() !== 'false'
}

export function isWebinarsVisible(): boolean {
  const value = process.env.NEXT_PUBLIC_SHOW_WEBINARS
  // Default to true — webinars are shown unless explicitly set to 'false'
  return value === undefined || value === null || value.toLowerCase() !== 'false'
}

function filterDraft<T extends { draft: boolean }>(items: T[]): T[] {
  if (isDraftVisible()) {
    // console.log("Returning entire list")
    return items
  }
  // console.log("Returning filtered list")
  return items.filter((item) => !item.draft)
}

export function getAllBlogPosts(): BlogPost[] {
  return filterDraft(posts).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedPosts(limit: number = 3): BlogPost[] {
  return getAllBlogPosts()
    .filter((post) => post.featured)
    .slice(0, limit)
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return getAllBlogPosts().map((post) => post.slug)
}

export function getAllDatasheets(): Datasheet[] {
  return filterDraft(datasheets)
}

export function getDatasheet(slug: string): Datasheet | undefined {
  return getAllDatasheets().find((ds) => ds.slug === slug)
}

export function getAllWebinars(): Webinar[] {
  return filterDraft(webinars).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getWebinar(slug: string): Webinar | undefined {
  return getAllWebinars().find((w) => w.slug === slug)
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  for (const post of getAllBlogPosts()) {
    for (const tag of post.tags) tags.add(tag)
  }
  return Array.from(tags).sort()
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.tags.includes(tag))
}

export function tagToSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '-')
}

export function slugToTag(slug: string): string | undefined {
  return getAllTags().find((tag) => tagToSlug(tag) === slug)
}

export function getSeriesPosts(seriesName: string): BlogPost[] {
  return getAllBlogPosts()
    .filter((p) => p.series === seriesName && p.seriesOrder)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0))
}

export function getSeriesInfo(post: BlogPost): { name: string; part: number; total: number; indexSlug: string } | null {
  if (!post.series || !post.seriesOrder) return null
  const total = getSeriesPosts(post.series).length
  return {
    name: post.series,
    part: post.seriesOrder,
    total,
    indexSlug: tagToSlug(post.series),
  }
}

export function getRelatedPosts(currentSlug: string, tags: string[], limit: number = 3): BlogPost[] {
  const allPosts = getAllBlogPosts().filter((p) => p.slug !== currentSlug)

  const scored = allPosts.map((post) => {
    const sharedTags = post.tags.filter((t) => tags.includes(t))
    return { post, score: sharedTags.length }
  })

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post)
}
