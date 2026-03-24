import type { Metadata } from 'next'
import { DemoRequestForm } from '@/components/forms/DemoRequestForm'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Book a Demo | OpsChain',
  description:
    'Book a personalised demo of OpsChain and see how governed, intelligent automation can transform your enterprise operations.',
}

export default function BookDemoPage() {
  return (
    <PageTransition>
      <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold font-heading text-gray-900'>Book a Demo</h1>
          <p className='mt-4 text-lg text-gray-600'>
            See OpsChain in action — personalised to your environment and challenges.
          </p>
        </div>

        <section className='mt-12'>
          <h2 className='text-2xl font-semibold font-heading text-gray-900'>What to Expect</h2>
          <ul className='mt-6 space-y-3'>
            {[
              'A personalised walkthrough of OpsChain tailored to your industry and operational challenges',
              'Live demonstration of autonomous agents, governed intelligence, and end-to-end audit trails',
              'Discussion of how OpsChain integrates with your existing tools and workflows',
              'Clear understanding of deployment options, timelines, and next steps',
              'No obligation — just a conversation about how to transform your operations',
            ].map((item) => (
              <li key={item} className='flex items-start gap-3 text-gray-700'>
                <span className='mt-0.5 text-primary font-bold'>&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className='mt-12 rounded-xl border border-gray-200 bg-gray-50 p-8'>
          <h2 className='text-2xl font-semibold font-heading text-gray-900 text-center mb-6'>Request Your Demo</h2>
          <DemoRequestForm />
        </section>
      </div>
    </PageTransition>
  )
}
