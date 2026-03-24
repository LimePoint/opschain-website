import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllDatasheets, getDatasheet } from '@/lib/content'
import { GatedAssetForm } from '@/components/forms/GatedAssetForm'
import { PageTransition } from '@/components/PageTransition'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllDatasheets().map((ds) => ({ slug: ds.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const ds = getDatasheet(slug)
  if (!ds) return {}
  return {
    title: ds.title,
    description: ds.description,
  }
}

export default async function DatasheetPage({ params }: PageProps) {
  const { slug } = await params
  const ds = getDatasheet(slug)
  if (!ds) notFound()

  return (
    <PageTransition>
      <div className='mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <Link href='/resources/' className='text-sm text-primary hover:text-primary-dark'>
            &larr; Back to Resources
          </Link>
        </div>

        <h1 className='text-3xl font-bold font-heading text-gray-900'>{ds.title}</h1>
        <p className='mt-4 text-lg text-gray-600'>{ds.description}</p>

        {ds.highlights.length > 0 && (
          <div className='mt-6'>
            <h2 className='text-lg font-semibold font-heading text-gray-900'>Key Highlights</h2>
            <ul className='mt-3 space-y-2'>
              {ds.highlights.map((h) => (
                <li key={h} className='flex items-start gap-3 text-gray-700'>
                  <span className='mt-0.5 text-primary font-bold'>&#10003;</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className='mt-10'>
          <GatedAssetForm assetName={ds.title} downloadUrl={ds.downloadUrl || undefined} available={ds.available} />
        </div>
      </div>
    </PageTransition>
  )
}
