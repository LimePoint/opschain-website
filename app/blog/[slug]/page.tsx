import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllBlogSlugs, getBlogPost, getRelatedPosts } from '@/lib/content'
import { BlogPostingSchema } from '@/components/seo/JsonLd'
import { ScrollTracker } from '@/components/analytics/ScrollTracker'
import { PageTransition } from '@/components/PageTransition'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opschain.io'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `${siteUrl}/blog/${post.slug}/`,
      images: post.ogImage ? [{ url: post.ogImage }] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post.slug, post.tags)

  return (
    <PageTransition>
      <BlogPostingSchema
        title={post.title}
        description={post.description}
        date={post.date}
        author={post.author}
        url={`${siteUrl}/blog/${post.slug}/`}
        image={post.ogImage}
      />
      <ScrollTracker />

      <article className='mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <Link href='/blog/' className='text-sm text-primary hover:text-primary-dark'>
            &larr; Back to Blog
          </Link>
        </div>

        <header className='mb-8'>
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
            <span>&middot;</span>
            <span>{post.author}</span>
          </div>
          <h1 className='mt-4 text-4xl font-bold font-heading text-gray-900 leading-tight'>{post.title}</h1>
          <div className='mt-4 flex flex-wrap gap-2'>
            {post.tags.map((tag) => (
              <span key={tag} className='rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600'>
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* CTA */}
        <div className='mt-12 rounded-xl bg-gray-50 p-8 text-center'>
          <h3 className='text-xl font-semibold font-heading text-gray-900'>Ready to see OpsChain in action?</h3>
          <p className='mt-2 text-gray-600'>
            Book a personalised demo and see how OpsChain can transform your operations.
          </p>
          <Link
            href='/book-demo/'
            className='mt-4 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors'
          >
            Book a Demo
          </Link>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className='mt-12'>
            <h3 className='text-xl font-semibold font-heading text-gray-900'>Related Posts</h3>
            <div className='mt-4 grid gap-6 sm:grid-cols-3'>
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}/`} className='group'>
                  <h4 className='text-sm font-medium text-gray-900 group-hover:text-primary'>{r.title}</h4>
                  <p className='mt-1 text-xs text-gray-500'>{Math.ceil(r.metadata.readingTime)} min read</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </PageTransition>
  )
}
