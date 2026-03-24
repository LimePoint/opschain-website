import { posts, datasheets, webinars } from '@/.velite'

export type BlogPost = (typeof posts)[number]
export type Datasheet = (typeof datasheets)[number]
export type Webinar = (typeof webinars)[number]

export function getAllBlogPosts(): BlogPost[] {
  return posts
    .filter((post) => {
      if (process.env.NODE_ENV === 'production' && post.draft) return false
      return true
    })
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
