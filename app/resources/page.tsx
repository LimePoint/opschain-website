import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllDatasheets } from '@/lib/content'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Datasheets, brochures, and technical resources for OpsChain — enterprise operations automation and governance platform.',
}

export default function ResourcesIndex() {
  const datasheets = getAllDatasheets()

  return (
    <PageTransition>
      <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold font-heading text-gray-900'>Resources</h1>
        <p className='mt-4 text-lg text-gray-600'>
          Datasheets, brochures, and technical resources to help you evaluate OpsChain.
        </p>

        <div className='mt-12 grid gap-6 sm:grid-cols-2'>
          {datasheets.map((ds) => (
            <Link
              key={ds.slug}
              href={`/resources/${ds.slug}/`}
              className='group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'
            >
              <h2 className='text-lg font-semibold font-heading text-gray-900 group-hover:text-primary'>{ds.title}</h2>
              <p className='mt-2 text-sm text-gray-600'>{ds.description}</p>
              {ds.highlights.length > 0 && (
                <ul className='mt-3 space-y-1'>
                  {ds.highlights.slice(0, 3).map((h) => (
                    <li key={h} className='flex items-start gap-2 text-xs text-gray-500'>
                      <span className='mt-1 text-primary'>&#10003;</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              <span className='mt-4 inline-block text-sm font-medium text-primary'>
                {ds.available ? 'Download' : 'Learn more'} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
