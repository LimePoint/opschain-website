import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllTags, getPostsByTag, slugToTag, tagToSlug } from '@/lib/content'
import { PageTransition } from '@/components/PageTransition'

interface PageProps {
  params: Promise<{ tag: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  const tags = getAllTags()
  if (tags.length === 0) return [{ tag: '__placeholder__' }]
  return tags.map((tag) => ({ tag: tagToSlug(tag) }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params
  const tag = slugToTag(tagSlug)
  if (!tag) return {}

  return {
    title: `Posts tagged "${tag}"`,
    description: `Blog posts about ${tag} from the OpsChain team.`,
  }
}

export default async function TagPage({ params }: PageProps) {
  const { tag: tagSlug } = await params
  const tag = slugToTag(tagSlug)
  if (!tag) return null

  const posts = getPostsByTag(tag)

  return (
    <PageTransition>
      <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mb-4'>
          <Link href='/blog/' className='text-sm text-primary hover:text-primary-dark'>
            &larr; All Posts
          </Link>
        </div>
        <h1 className='text-4xl font-bold font-heading text-gray-900'>Posts tagged &ldquo;{tag}&rdquo;</h1>
        <p className='mt-4 text-lg text-gray-600'>
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} found.
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
              </div>
              <h2 className='mt-2 text-2xl font-semibold font-heading'>
                <Link href={`/blog/${post.slug}/`} className='text-gray-900 hover:text-primary transition-colors'>
                  {post.title}
                </Link>
              </h2>
              <p className='mt-2 text-gray-600'>{post.description}</p>
              <div className='mt-3 flex flex-wrap gap-2'>
                {post.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/blog/tags/${tagToSlug(t)}/`}
                    className={`rounded-full px-3 py-1 text-xs transition-colors ${
                      t === tag
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-primary hover:text-white'
                    }`}
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
