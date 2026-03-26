import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import {
  getAllBlogSlugs,
  getBlogPost,
  getRelatedPosts,
  getAuthor,
  getSeriesInfo,
  readingTime,
  tagToSlug,
} from '@/lib/content'
import { BlogPostingSchema } from '@/components/seo/JsonLd'
import { ScrollTracker } from '@/components/analytics/ScrollTracker'
import { PageTransition } from '@/components/PageTransition'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opschain.io'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  if (slugs.length === 0) return [{ slug: '__placeholder__' }]
  return slugs.map((slug) => ({ slug }))
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
  const author = getAuthor(post.author)
  const seriesInfo = getSeriesInfo(post)

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
            {author && (
              <Image src={author.avatarUrl} alt={author.name} width={32} height={32} className='rounded-full' />
            )}
            {author?.links?.linkedin ? (
              <a
                href={author.links.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-700 hover:text-primary transition-colors'
              >
                {author.name}
              </a>
            ) : (
              <span>{author?.name ?? post.author}</span>
            )}
            <span>&middot;</span>
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
          {seriesInfo && (
            <Link
              href={`/blog/${seriesInfo.indexSlug}/`}
              className='mt-3 inline-block rounded bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800 hover:bg-blue-200 transition-colors'
            >
              Part {seriesInfo.part} of {seriesInfo.total} — {seriesInfo.name}
            </Link>
          )}
          <h1 className='mt-4 text-4xl font-bold font-heading text-gray-900 leading-tight'>{post.title}</h1>
          <div className='mt-4 flex flex-wrap gap-2'>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tags/${tagToSlug(tag)}/`}
                className={
                  tag === post.series
                    ? 'rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 hover:bg-blue-200 transition-colors'
                    : 'rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-primary hover:text-white transition-colors'
                }
              >
                {tag}
              </Link>
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

        {/* Author bio */}
        {author && (
          <div className='mt-12 flex items-start gap-4 rounded-xl border border-gray-200 p-6'>
            <Image src={author.avatarUrl} alt={author.name} width={64} height={64} className='rounded-full shrink-0' />
            <div>
              {author.links?.linkedin ? (
                <a
                  href={author.links.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-semibold font-heading text-gray-900 hover:text-primary transition-colors'
                >
                  {author.name}
                </a>
              ) : (
                <p className='font-semibold font-heading text-gray-900'>{author.name}</p>
              )}
              <p className='text-sm text-gray-500'>{author.role}</p>
              <p className='mt-2 text-sm text-gray-600'>{author.bio}</p>
              {author.links && (
                <div className='mt-2 flex gap-3'>
                  {author.links.linkedin && (
                    <a
                      href={author.links.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-sm text-primary hover:text-primary-dark'
                    >
                      LinkedIn
                    </a>
                  )}
                  {author.links.github && (
                    <a
                      href={author.links.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-sm text-primary hover:text-primary-dark'
                    >
                      GitHub
                    </a>
                  )}
                  {author.links.website && (
                    <a
                      href={author.links.website}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-sm text-primary hover:text-primary-dark'
                    >
                      Website
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <div className='mt-12'>
            <h3 className='text-xl font-semibold font-heading text-gray-900'>Related Posts</h3>
            <div className='mt-4 grid gap-6 sm:grid-cols-3'>
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}/`} className='group'>
                  <h4 className='text-sm font-medium text-gray-900 group-hover:text-primary'>{r.title}</h4>
                  <p className='mt-1 text-xs text-gray-500'>{readingTime(r)} min read</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </PageTransition>
  )
}
