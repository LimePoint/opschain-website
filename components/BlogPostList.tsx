'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { readingTime, tagToSlug } from '@/lib/content'

const POSTS_PER_PAGE = 10

interface BlogPostItem {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  draft: boolean
  featured: boolean
  series?: string
  seriesOrder?: number
  seriesTotalParts?: number
  coverImage?: string
  metadata: { readingTime: number; wordCount: number }
}

export function BlogPostList({ posts }: { posts: BlogPostItem[] }) {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)
  const visiblePosts = posts.slice(0, visibleCount)
  const hasMore = visibleCount < posts.length

  return (
    <div className='space-y-10'>
      {visiblePosts.map((post) => (
        <article key={post.slug} className='border-b border-gray-200 pb-10'>
          <div className='flex gap-5'>
            {post.coverImage && (
              <Link href={`/blog/${post.slug}/`} className='hidden sm:block shrink-0 overflow-hidden rounded-lg'>
                <Image
                  src={post.coverImage}
                  alt=''
                  width={160}
                  height={107}
                  className='h-[107px] w-[160px] object-contain transition-transform hover:scale-105'
                />
              </Link>
            )}
            <div className='min-w-0'>
              <div className='flex items-center gap-3 text-sm text-gray-500'>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>&middot;</span>
                <span>{readingTime(post)} min read</span>
                {post.draft && (
                  <>
                    <span>&middot;</span>
                    <span className='rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800'>Draft</span>
                  </>
                )}
                {post.featured && (
                  <>
                    <span>&middot;</span>
                    <span className='rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary'>Featured</span>
                  </>
                )}
                {post.series && post.seriesOrder && post.seriesTotalParts && (
                  <>
                    <span>&middot;</span>
                    <Link
                      href={`/blog/${tagToSlug(post.series)}/`}
                      className='rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 hover:bg-blue-200 transition-colors'
                    >
                      Part {post.seriesOrder} of {post.seriesTotalParts}
                    </Link>
                  </>
                )}
              </div>
              <h2 className='mt-2 text-2xl font-semibold font-heading'>
                <Link href={`/blog/${post.slug}/`} className='text-gray-900 hover:text-primary transition-colors'>
                  {post.title}
                </Link>
              </h2>
              <p className='mt-2 text-gray-600 line-clamp-2'>{post.description}</p>
              <div className='mt-3 flex flex-wrap gap-2'>
                {(post.series
                  ? [post.series, ...post.tags.filter((t) => t !== post.series)].slice(0, 4)
                  : post.tags.slice(0, 4)
                ).map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tags/${tagToSlug(tag)}/`}
                    className={
                      tag === post.series
                        ? 'rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800 hover:bg-blue-100 transition-colors'
                        : 'rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 hover:border-primary hover:bg-primary hover:text-white transition-colors'
                    }
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
      ))}

      {hasMore && (
        <div className='flex justify-center pt-4'>
          <button
            onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
            className='rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary'
          >
            Load more posts
          </button>
        </div>
      )}
    </div>
  )
}
