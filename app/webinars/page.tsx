import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllWebinars, isWebinarsVisible } from '@/lib/content'
import { CountdownTimer } from '@/components/CountdownTimer'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Webinars',
  description:
    'Upcoming, past, and on-demand webinars from OpsChain covering enterprise operations automation, DevOps governance, and AI-powered change management.',
}

export default function WebinarsIndex() {
  if (!isWebinarsVisible()) notFound()
  const webinars = getAllWebinars()
  const upcoming = webinars.filter((w) => w.status === 'upcoming')
  const past = webinars.filter((w) => w.status === 'past')
  const onDemand = webinars.filter((w) => w.status === 'on-demand')

  return (
    <PageTransition>
      <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold font-heading text-gray-900'>Webinars & Events</h1>
        <p className='mt-4 text-lg text-gray-600'>
          Join us for live discussions on enterprise operations, or watch past sessions on demand.
        </p>

        {upcoming.length > 0 && (
          <section className='mt-12'>
            <h2 className='text-2xl font-semibold font-heading text-gray-900'>Upcoming</h2>
            <div className='mt-6 space-y-6'>
              {upcoming.map((w) => (
                <Link
                  key={w.slug}
                  href={`/webinars/${w.slug}/`}
                  className='group block rounded-xl border border-primary/20 bg-primary/5 p-6 transition-shadow hover:shadow-md'
                >
                  <div className='flex items-center gap-2 text-sm text-primary font-medium'>
                    <span>&#128197;</span>
                    <time dateTime={w.date}>
                      {new Date(w.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </time>
                  </div>
                  <div className='mt-2 flex items-center gap-2'>
                    <h3 className='text-xl font-semibold font-heading text-gray-900 group-hover:text-primary'>
                      {w.title}
                    </h3>
                    {w.draft && (
                      <span className='rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800'>
                        Draft
                      </span>
                    )}
                  </div>
                  <p className='mt-2 text-gray-600'>{w.description}</p>
                  {w.speakers.length > 0 && (
                    <p className='mt-2 text-sm text-gray-500'>Speakers: {w.speakers.join(', ')}</p>
                  )}
                  <div className='mt-3'>
                    <CountdownTimer targetDate={w.date} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {onDemand.length > 0 && (
          <section className='mt-12'>
            <h2 className='text-2xl font-semibold font-heading text-gray-900'>On-Demand</h2>
            <div className='mt-6 space-y-6'>
              {onDemand.map((w) => (
                <Link
                  key={w.slug}
                  href={`/webinars/${w.slug}/`}
                  className='group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'
                >
                  <div className='flex items-center gap-2'>
                    <h3 className='text-xl font-semibold font-heading text-gray-900 group-hover:text-primary'>
                      {w.title}
                    </h3>
                    {w.draft && (
                      <span className='rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800'>
                        Draft
                      </span>
                    )}
                  </div>
                  <p className='mt-2 text-gray-600'>{w.description}</p>
                  <span className='mt-3 inline-block text-sm font-medium text-primary'>Watch now &rarr;</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {past.length > 0 && (
          <section className='mt-12'>
            <h2 className='text-2xl font-semibold font-heading text-gray-900'>Past Events</h2>
            <div className='mt-6 space-y-4'>
              {past.map((w) => (
                <Link
                  key={w.slug}
                  href={`/webinars/${w.slug}/`}
                  className='group block rounded-lg border border-gray-200 bg-gray-50 p-4 transition-shadow hover:shadow-sm'
                >
                  <div className='flex items-center justify-between'>
                    <div>
                      <div className='flex items-center gap-2'>
                        <h3 className='text-lg font-semibold text-gray-900 group-hover:text-primary'>{w.title}</h3>
                        {w.draft && (
                          <span className='rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800'>
                            Draft
                          </span>
                        )}
                      </div>
                      <p className='mt-1 text-sm text-gray-500'>
                        {new Date(w.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <span className='text-sm font-medium text-primary'>View &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  )
}
