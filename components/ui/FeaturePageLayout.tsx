import Image from 'next/image'
import Link from 'next/link'
import { CTAButton } from '@/components/analytics/CTAButton'

interface FeaturePageLayoutProps {
  title: string
  tagline: string
  description: string
  icon: string
  details: string[]
  ctaText?: string
}

export function FeaturePageLayout({
  title,
  tagline,
  description,
  icon,
  details,
  ctaText = 'See it in action — book a demo',
}: FeaturePageLayoutProps) {
  return (
    <div className='mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8'>
      <div className='mb-8'>
        <Link href='/' className='text-sm text-primary hover:text-primary-dark'>
          &larr; Back to Home
        </Link>
      </div>

      <div className='flex items-start gap-6'>
        <Image src={icon} alt={title} width={80} height={80} className='shrink-0' />
        <div>
          <h1 className='text-3xl font-bold font-heading text-gray-900'>{title}</h1>
          <p className='mt-1 text-lg font-medium italic text-primary'>{tagline}</p>
        </div>
      </div>

      <p className='mt-6 text-lg text-gray-700 leading-relaxed'>{description}</p>

      <div className='mt-8 space-y-4'>
        {details.map((detail, i) => (
          <div key={i} className='flex items-start gap-3'>
            <span className='mt-1 text-primary font-bold'>&#10003;</span>
            <p className='text-gray-700'>{detail}</p>
          </div>
        ))}
      </div>

      <div className='mt-10'>
        <CTAButton href='/book-demo/' label={ctaText} />
      </div>
    </div>
  )
}
