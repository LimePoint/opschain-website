import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllBlogPosts, tagToSlug } from '@/lib/content'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on enterprise operations automation, DevOps governance, AI-powered change management, and compliance-ready automation from the OpsChain team.',
}

export default function BlogIndex() {
  const posts = getAllBlogPosts()

  return (
    <PageTransition>
      <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold font-heading text-gray-900'>Blog</h1>
        <p className='mt-4 text-lg text-gray-600'>
          Insights on enterprise operations, DevOps governance, and AI-powered automation.
        </p>

        <div className='mt-12 space-y-10'>
          {posts.map((post) => (
            <article key={post.slug} className='border-b border-gray-200 pb-10'>
              <div className='flex items-center gap-3 text-sm text-gray-500'>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>&middot;</span>
                <span>{Math.ceil(post.metadata.readingTime)} min read</span>
                {post.draft && (
                  <>
                    <span>&middot;</span>
                    <span className='rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800'>Draft</span>
                  </>
                )}
              </div>
              <h2 className='mt-2 text-2xl font-semibold font-heading'>
                <Link href={`/blog/${post.slug}/`} className='text-gray-900 hover:text-primary transition-colors'>
                  {post.title}
                </Link>
              </h2>
              <p className='mt-2 text-gray-600'>{post.description}</p>
              <div className='mt-3 flex flex-wrap gap-2'>
                {post.tags.slice(0, 4).map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tags/${tagToSlug(tag)}/`}
                    className='rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-primary hover:text-white transition-colors'
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}/`}
                className='mt-4 inline-block text-sm font-medium text-primary hover:text-primary-dark'
              >
                Read more &rarr;
              </Link>
            </article>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
