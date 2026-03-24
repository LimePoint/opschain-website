import type { Metadata } from 'next'
import { DemoRequestForm } from '@/components/forms/DemoRequestForm'
import { CTAButton } from '@/components/analytics/CTAButton'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'OpsChain for Utilities & Energy',
  description:
    'How OpsChain helps utilities and energy companies automate operations while meeting NERC CIP and IEC 62443 compliance requirements.',
}

export default function UtilitiesEnergyPage() {
  return (
    <PageTransition>
      <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold font-heading text-gray-900'>OpsChain for Utilities & Energy</h1>
        <p className='mt-4 text-lg text-gray-600'>
          Automate and govern operational change across critical infrastructure — with compliance built in for NERC CIP,
          IEC 62443, and beyond.
        </p>

        <section className='mt-12'>
          <h2 className='text-2xl font-semibold font-heading text-gray-900'>Key Challenges</h2>
          <div className='mt-6 space-y-4'>
            <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
              <h3 className='font-semibold text-gray-900'>NERC CIP Compliance</h3>
              <p className='mt-1 text-sm text-gray-600'>
                Mandatory cybersecurity standards for bulk electric systems require rigorous change control, access
                management, and audit evidence — often managed across legacy and modern systems simultaneously.
              </p>
            </div>
            <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
              <h3 className='font-semibold text-gray-900'>IEC 62443 Security</h3>
              <p className='mt-1 text-sm text-gray-600'>
                Industrial automation and control system security standards demand defence-in-depth strategies, secure
                change management, and continuous monitoring across OT environments.
              </p>
            </div>
            <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
              <h3 className='font-semibold text-gray-900'>OT/IT Convergence</h3>
              <p className='mt-1 text-sm text-gray-600'>
                Managing change governance across both operational technology and information technology environments
                with different tooling, teams, and risk profiles.
              </p>
            </div>
          </div>
        </section>

        <section className='mt-12'>
          <h2 className='text-2xl font-semibold font-heading text-gray-900'>How OpsChain Helps</h2>
          <ul className='mt-6 space-y-3'>
            {[
              'Governed change pipelines that enforce NERC CIP and IEC 62443 requirements at every step',
              'Immutable audit trails for regulatory evidence and compliance reporting',
              'Unified orchestration across OT and IT environments under a single control plane',
              'AI-assisted change risk assessment and automated compliance checks',
              'Role-based access control and segregation of duties for critical infrastructure',
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
            href='/resources/opschain-utilities-energy/'
            label='Download Utilities & Energy Datasheet'
            variant='secondary'
            className='mb-6'
          />
        </section>

        <section className='mt-12 rounded-xl border border-gray-200 bg-gray-50 p-8'>
          <h2 className='text-2xl font-semibold font-heading text-gray-900 text-center mb-6'>
            Request a Demo for Your Utility
          </h2>
          <DemoRequestForm leadSource='Website - Utilities & Energy' />
        </section>
      </div>
    </PageTransition>
  )
}
