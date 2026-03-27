import { posts, datasheets, webinars } from '@/.velite'
import authors, { type Author } from '@/content/authors'

export type { Author }
export type BlogPost = (typeof posts)[number]
export type Datasheet = (typeof datasheets)[number]
export type Webinar = (typeof webinars)[number]
export type WebinarStatus = 'upcoming' | 'past' | 'on-demand'

export function getWebinarStatus(w: Webinar): WebinarStatus {
  if (new Date(w.date) > new Date()) return 'upcoming'
  if (w.onDemand) return 'on-demand'
  return 'past'
}

export function formatWebinarDate(
  w: Webinar,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }
): string {
  const formatted = new Date(w.date).toLocaleString('en-AU', { timeZone: w.timezone, ...options })
  const abbr = getWebinarTimezoneAbbr(w)
  return `${formatted} ${abbr}`
}

/**
 * Returns an ISO 8601 string with the correct UTC offset for the webinar's timezone.
 * Useful for client-side Date parsing that needs the correct absolute time.
 */
export function getWebinarISODate(w: Webinar): string {
  const date = new Date(w.date)
  // Format the date parts in the target timezone
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: w.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00'
  const localStr = `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`
  // Compute offset: difference between UTC and the timezone-local representation
  const utcMs = date.getTime()
  const localDate = new Date(localStr + 'Z')
  const offsetMs = localDate.getTime() - utcMs
  // Invert: UTC + offset = local, so timezone offset from UTC = -offsetMs
  const totalMinutes = Math.round(-offsetMs / 60000)
  const sign = totalMinutes >= 0 ? '+' : '-'
  const absMinutes = Math.abs(totalMinutes)
  const offH = String(Math.floor(absMinutes / 60)).padStart(2, '0')
  const offM = String(absMinutes % 60).padStart(2, '0')
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}${sign}${offH}:${offM}`
}

export function getWebinarTimezoneAbbr(w: Webinar): string {
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: w.timezone,
    timeZoneName: 'short',
  }).formatToParts(new Date(w.date))
  return parts.find((p) => p.type === 'timeZoneName')?.value ?? w.timezone
}

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
