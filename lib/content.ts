import { posts, datasheets, webinars } from '@/.velite'
import authors, { type Author } from '@/content/authors'

export type { Author }
export type BlogPost = (typeof posts)[number]
export type Datasheet = (typeof datasheets)[number]
export type Webinar = (typeof webinars)[number]

export function getAuthor(name: string): Author | undefined {
  return authors[name]
}

const showDrafts = process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true'

export function getAllBlogPosts({ includeDrafts = showDrafts } = {}): BlogPost[] {
  return posts
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return getAllBlogPosts().map((post) => post.slug)
}

export function getAllDatasheets(): Datasheet[] {
  return datasheets
}

export function getDatasheet(slug: string): Datasheet | undefined {
  return datasheets.find((ds) => ds.slug === slug)
}

export function getAllWebinars(): Webinar[] {
  return webinars.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getWebinar(slug: string): Webinar | undefined {
  return webinars.find((w) => w.slug === slug)
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
