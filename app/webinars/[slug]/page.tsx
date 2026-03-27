import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllWebinars, getWebinar, getWebinarStatus, formatWebinarDate, isWebinarsVisible } from '@/lib/content'
import { EventSchema } from '@/components/seo/JsonLd'
import { GatedAssetForm } from '@/components/forms/GatedAssetForm'
import { WebinarRegistrationForm } from '@/components/forms/WebinarRegistrationForm'
import { PageTransition } from '@/components/PageTransition'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opschain.io'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  if (!isWebinarsVisible()) return [{ slug: '__placeholder__' }]
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
  if (!isWebinarsVisible()) notFound()
  const w = getWebinar(slug)
  if (!w) notFound()
  const status = getWebinarStatus(w)

  return (
    <PageTransition>
      <EventSchema
        title={w.title}
        description={w.description}
        date={w.date}
        status={status}
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
              status === 'upcoming'
                ? 'bg-green-100 text-green-800'
                : status === 'on-demand'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600'
            }`}
          >
            {status === 'upcoming' ? 'Upcoming' : status === 'on-demand' ? 'On-Demand' : 'Past Event'}
          </span>
        </div>

        <h1 className='text-3xl font-bold font-heading text-gray-900'>{w.title}</h1>

        <div className='mt-4 flex items-center gap-4 text-sm text-gray-500'>
          <time dateTime={w.date}>{formatWebinarDate(w)}</time>
          {w.speakers.length > 0 && (
            <>
              <span>&middot;</span>
              <span>{w.speakers.join(', ')}</span>
            </>
          )}
        </div>

        {w.highlights.length > 0 && (
          <div className='mt-6'>
            <h2 className='text-lg font-semibold font-heading text-gray-900'>Key Highlights</h2>
            <ul className='mt-3 space-y-2'>
              {w.highlights.map((h) => (
                <li key={h} className='flex items-start gap-3 text-gray-700'>
                  <span className='mt-0.5 text-primary font-bold'>&#10003;</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className='prose mt-8 max-w-none' dangerouslySetInnerHTML={{ __html: w.content }} />

        <div className='mt-10'>
          {status === 'upcoming' && <WebinarRegistrationForm webinarName={w.title} />}
          {status === 'on-demand' && (
            <GatedAssetForm
              assetName={w.title}
              downloadUrl={w.recordingUrl || undefined}
              available={!!w.recordingUrl}
            />
          )}
          {status === 'past' && w.recordingUrl && (
            <GatedAssetForm assetName={w.title} downloadUrl={w.recordingUrl} available={true} />
          )}
        </div>
      </div>
    </PageTransition>
  )
}
