'use client'

import { useReducedMotion } from 'framer-motion'

// TODO: replace with real logos
const companies: string[] = [
  'Acme Utilities',
  'Global Banking Corp',
  'TeleConnect',
  'SecureOps Inc',
  'CloudScale Ltd',
  'DataBridge Systems',
]

export function SocialProof() {
  const shouldReduce = useReducedMotion()

  return (
    <section className='bg-white py-16'>
      {/* Logo strip */}
      <div className='mx-auto max-w-5xl px-6'>
        <p className='mb-8 text-center font-body text-sm font-medium uppercase tracking-widest text-gray-500'>
          Trusted by industry leaders
        </p>

        <div className='relative overflow-hidden'>
          {/* Fade edges */}
          <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent' />
          <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent' />

          <div className={`flex gap-12 ${shouldReduce ? 'justify-center flex-wrap' : 'animate-marquee'}`}>
            {/* Double the items for seamless loop */}
            {[...companies, ...companies].map((company, i) => (
              <div
                key={`${company}-${i}`}
                className='flex h-12 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-6'
              >
                {/* TODO: replace with real logos */}
                <span className='whitespace-nowrap font-body text-sm font-medium text-gray-500'>{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className='mx-auto mt-16 max-w-3xl px-6 text-center'>
        <h2 className='font-heading text-3xl font-bold text-gray-900'>What Our Customers Say</h2>

        {/* TODO: replace with real testimonials */}
        <blockquote className='mt-8'>
          <p className='font-body text-lg italic leading-relaxed text-gray-600'>
            &ldquo;OpsChain transformed how we manage infrastructure changes. What used to take days of manual
            coordination now happens automatically with full compliance — our audit team loves it.&rdquo;
          </p>
          <footer className='mt-4'>
            <p className='font-heading text-sm font-semibold text-gray-900'>Jane Smith</p>
            <p className='font-body text-sm text-gray-500'>VP of Operations, Acme Utilities</p>
          </footer>
        </blockquote>
      </div>

      {/* Marquee keyframes */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  )
}
