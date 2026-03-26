import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllBlogPosts, getAllTags, getFeaturedPosts, getPostsByTag, readingTime, tagToSlug } from '@/lib/content'
import { BlogPostList } from '@/components/BlogPostList'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on enterprise operations automation, DevOps governance, AI-powered change management, and compliance-ready automation from the OpsChain team.',
}

export default function BlogIndex() {
  const allPosts = getAllBlogPosts()
  const featuredPosts = getFeaturedPosts()
  const featuredSlugs = new Set(featuredPosts.map((p) => p.slug))
  const posts = allPosts.filter((p) => !featuredSlugs.has(p.slug))
  const tags = getAllTags()

  return (
    <PageTransition>
      <div className='mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold font-heading text-gray-900'>Blog</h1>
        <p className='mt-4 text-lg text-gray-600'>
          Insights on enterprise operations, DevOps governance, and AI-powered automation.
        </p>

        {featuredPosts.length > 0 && (
          <div className='mt-12'>
            <div className='grid gap-6 sm:grid-cols-2'>
              {featuredPosts.map((post) => (
                <article
                  key={post.slug}
                  className='group overflow-hidden rounded-lg border-l-4 border-l-primary bg-gray-50 transition-shadow hover:shadow-md'
                >
                  {post.coverImage && (
                    <Link href={`/blog/${post.slug}/`} className='block overflow-hidden'>
                      <Image
                        src={post.coverImage}
                        alt=''
                        width={600}
                        height={200}
                        className='h-40 w-full object-cover transition-transform group-hover:scale-105'
                      />
                    </Link>
                  )}
                  <div className='p-6'>
                    <span className='inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary'>
                      Featured
                    </span>
                    <h2 className='mt-3 text-lg font-semibold font-heading'>
                      <Link href={`/blog/${post.slug}/`} className='text-gray-900 hover:text-primary transition-colors'>
                        {post.title}
                      </Link>
                    </h2>
                    <p className='mt-2 text-sm text-gray-700 line-clamp-3'>{post.description}</p>
                    <div className='mt-3 flex items-center gap-3 text-xs text-gray-600'>
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span>&middot;</span>
                      <span>{readingTime(post)} min read</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}/`}
                      className='mt-4 inline-block text-sm font-medium text-primary hover:text-primary-dark'
                    >
                      Read more &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className='mt-12 grid gap-12 lg:grid-cols-[1fr_240px]'>
          <BlogPostList posts={posts} />

          <aside className='hidden lg:block'>
            <div className='sticky top-24'>
              <h3 className='text-sm font-semibold font-heading uppercase tracking-wide text-gray-900'>Tags</h3>
              <div className='mt-4 flex flex-wrap gap-2'>
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tags/${tagToSlug(tag)}/`}
                    className='rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 hover:bg-primary hover:text-white transition-colors'
                  >
                    {tag} ({getPostsByTag(tag).length})
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PageTransition>
  )
}
