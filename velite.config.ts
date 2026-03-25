import { defineConfig, s } from 'velite'

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    posts: {
      name: 'Post',
      pattern: 'blog/**/*.md',
      schema: s.object({
        title: s.string().max(200),
        date: s.isodate(),
        description: s.string().max(500),
        author: s.string(),
        slug: s.string(),
        tags: s.array(s.string()).default([]),
        draft: s.boolean().default(false),
        ogImage: s.string().optional(),
        content: s.markdown(),
        metadata: s.metadata(),
      }),
    },
    datasheets: {
      name: 'Datasheet',
      pattern: 'datasheets/**/*.md',
      schema: s.object({
        title: s.string().max(200),
        description: s.string().max(500),
        slug: s.string(),
        highlights: s.array(s.string()).default([]),
        downloadUrl: s.string().default(''),
        available: s.boolean().default(false),
        draft: s.boolean().default(false),
        content: s.markdown(),
      }),
    },
    webinars: {
      name: 'Webinar',
      pattern: 'webinars/**/*.md',
      schema: s.object({
        title: s.string().max(200),
        date: s.isodate(),
        description: s.string().max(500),
        slug: s.string(),
        status: s.enum(['upcoming', 'past', 'on-demand']),
        speakers: s.array(s.string()).default([]),
        zoomLink: s.string().default(''),
        recordingUrl: s.string().default(''),
        draft: s.boolean().default(false),
        content: s.markdown(),
      }),
    },
    pages: {
      name: 'Page',
      pattern: 'pages/**/*.md',
      schema: s.object({
        title: s.string().max(200),
        description: s.string().optional(),
        slug: s.string(),
        content: s.markdown(),
      }),
    },
  },
})
