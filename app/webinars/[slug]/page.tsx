import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllWebinars, getWebinar } from '@/lib/content'
import { EventSchema } from '@/components/seo/JsonLd'
import { GatedAssetForm } from '@/components/forms/GatedAssetForm'
import { PageTransition } from '@/components/PageTransition'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opschain.io'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  const all = getAllWebinars()
  if (all.length === 0) return [{ slug: '__placeholder__' }]
  return all.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const w = getWebinar(slug)
  if (!w) return {}
  return { title: w.title, description: w.description }
}

export default async function WebinarPage({ params }: PageProps) {
  const { slug } = await params
  const w = getWebinar(slug)
  if (!w) notFound()

  return (
    <PageTransition>
      <EventSchema
        title={w.title}
        description={w.description}
        date={w.date}
        status={w.status}
        url={`${siteUrl}/webinars/${w.slug}/`}
      />
      <div className='mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <Link href='/webinars/' className='text-sm text-primary hover:text-primary-dark'>
            &larr; Back to Webinars
          </Link>
        </div>

        <div className='mb-4'>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              w.status === 'upcoming'
                ? 'bg-green-100 text-green-800'
                : w.status === 'on-demand'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600'
            }`}
          >
            {w.status === 'upcoming' ? 'Upcoming' : w.status === 'on-demand' ? 'On-Demand' : 'Past Event'}
          </span>
        </div>

        <h1 className='text-3xl font-bold font-heading text-gray-900'>{w.title}</h1>

        <div className='mt-4 flex items-center gap-4 text-sm text-gray-500'>
          <time dateTime={w.date}>
            {new Date(w.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </time>
          {w.speakers.length > 0 && (
            <>
              <span>&middot;</span>
              <span>{w.speakers.join(', ')}</span>
            </>
          )}
        </div>

        <div className='prose mt-8 max-w-none' dangerouslySetInnerHTML={{ __html: w.content }} />

        <div className='mt-10'>
          {w.status === 'upcoming' && w.zoomLink && (
            <a
              href={w.zoomLink}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors'
            >
              Register Now
            </a>
          )}
          {w.status === 'upcoming' && !w.zoomLink && (
            <p className='text-sm text-gray-500'>Registration link coming soon.</p>
          )}
          {w.status === 'on-demand' && (
            <GatedAssetForm
              assetName={w.title}
              downloadUrl={w.recordingUrl || undefined}
              available={!!w.recordingUrl}
            />
          )}
          {w.status === 'past' && !w.recordingUrl && <p className='text-sm text-gray-500'>Recording coming soon.</p>}
          {w.status === 'past' && w.recordingUrl && (
            <GatedAssetForm assetName={w.title} downloadUrl={w.recordingUrl} available={true} />
          )}
        </div>
      </div>
    </PageTransition>
  )
}
