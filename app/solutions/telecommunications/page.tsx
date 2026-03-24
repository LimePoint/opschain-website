import type { Metadata } from 'next'
import { DemoRequestForm } from '@/components/forms/DemoRequestForm'
import { CTAButton } from '@/components/analytics/CTAButton'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'OpsChain for Telecommunications',
  description:
    'How OpsChain helps telecommunications companies automate operations while meeting IEC 62443 compliance and managing complex 5G/IMS infrastructure.',
}

export default function TelecommunicationsPage() {
  return (
    <PageTransition>
      <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold font-heading text-gray-900'>OpsChain for Telecommunications</h1>
        <p className='mt-4 text-lg text-gray-600'>
          Automate and govern operational change across network and IT environments — with compliance built in for IEC
          62443, 5G operations, and beyond.
        </p>

        <section className='mt-12'>
          <h2 className='text-2xl font-semibold font-heading text-gray-900'>Key Challenges</h2>
          <div className='mt-6 space-y-4'>
            <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
              <h3 className='font-semibold text-gray-900'>IEC 62443 Network Security</h3>
              <p className='mt-1 text-sm text-gray-600'>
                Industrial network security standards require defence-in-depth strategies, secure change management, and
                continuous monitoring across critical telecommunications infrastructure.
              </p>
            </div>
            <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
              <h3 className='font-semibold text-gray-900'>5G/IMS Infrastructure Complexity</h3>
              <p className='mt-1 text-sm text-gray-600'>
                Next-generation network infrastructure demands automated, governed change processes across virtualised
                and containerised environments with zero tolerance for service disruption.
              </p>
            </div>
            <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
              <h3 className='font-semibold text-gray-900'>Cross-Domain Operations</h3>
              <p className='mt-1 text-sm text-gray-600'>
                Managing governed change across network operations, IT operations, and cloud infrastructure with
                different tooling, teams, and service-level expectations.
              </p>
            </div>
          </div>
        </section>

        <section className='mt-12'>
          <h2 className='text-2xl font-semibold font-heading text-gray-900'>How OpsChain Helps</h2>
          <ul className='mt-6 space-y-3'>
            {[
              'IEC 62443 aligned network change governance and security controls',
              'Cross-domain orchestration for network and IT operations',
              'Automated change governance for 5G and IMS infrastructure',
              'Real-time observability across distributed network elements',
              'Compliance-ready audit trails for telecommunications regulators',
            ].map((item) => (
              <li key={item} className='flex items-start gap-3 text-gray-700'>
                <span className='mt-0.5 text-primary font-bold'>&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className='mt-12'>
          <CTAButton
            href='/resources/opschain-telecommunications/'
            label='Download Telecommunications Datasheet'
            variant='secondary'
            className='mb-6'
          />
        </section>

        <section className='mt-12 rounded-xl border border-gray-200 bg-gray-50 p-8'>
          <h2 className='text-2xl font-semibold font-heading text-gray-900 text-center mb-6'>
            Request a Demo for Your Network
          </h2>
          <DemoRequestForm leadSource='Website - Telecommunications' />
        </section>
      </div>
    </PageTransition>
  )
}
