import type { Metadata } from 'next'
import { DemoRequestForm } from '@/components/forms/DemoRequestForm'
import { CTAButton } from '@/components/analytics/CTAButton'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'OpsChain for Banking & Financial Services',
  description:
    'How OpsChain helps banking and financial services organisations automate operations while meeting PCI-DSS and APRA CPS 234 compliance requirements.',
}

export default function BankingFinancePage() {
  return (
    <PageTransition>
      <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold font-heading text-gray-900'>OpsChain for Banking & Financial Services</h1>
        <p className='mt-4 text-lg text-gray-600'>
          Automate and govern operational change across banking environments, with compliance built in for PCI-DSS, APRA
          CPS 234, and beyond.
        </p>

        <section className='mt-12'>
          <h2 className='text-2xl font-semibold font-heading text-gray-900'>Key Challenges</h2>
          <div className='mt-6 space-y-4'>
            <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
              <h3 className='font-semibold text-gray-900'>PCI-DSS Compliance</h3>
              <p className='mt-1 text-sm text-gray-600'>
                Payment card industry data security standards require strict change control, vulnerability management,
                and comprehensive audit trails across all systems handling cardholder data.
              </p>
            </div>
            <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
              <h3 className='font-semibold text-gray-900'>APRA CPS 234 Information Security</h3>
              <p className='mt-1 text-sm text-gray-600'>
                APRA-regulated entities must maintain information security capabilities commensurate with the size and
                extent of threats, with clear accountability and robust change management processes.
              </p>
            </div>
            <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
              <h3 className='font-semibold text-gray-900'>Multi-Cloud Banking Environments</h3>
              <p className='mt-1 text-sm text-gray-600'>
                Managing governed change across hybrid and multi-cloud banking infrastructure with diverse tooling,
                distributed teams, and stringent regulatory oversight.
              </p>
            </div>
          </div>
        </section>

        <section className='mt-12'>
          <h2 className='text-2xl font-semibold font-heading text-gray-900'>How OpsChain Helps</h2>
          <ul className='mt-6 space-y-3'>
            {[
              'PCI-DSS compliant change workflows with built-in security controls',
              'APRA CPS 234 aligned information security controls and evidence collection',
              'Immutable audit logs for regulatory evidence and compliance reporting',
              'Segregation of duties enforcement with AI oversight',
              'Governed automation across multi-cloud banking environments',
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
            href='/resources/opschain-banking-finance/'
            label='Download Banking & Finance Datasheet'
            variant='secondary'
            className='mb-6'
          />
        </section>

        <section className='mt-12 rounded-xl border border-gray-200 bg-gray-50 p-8'>
          <h2 className='text-2xl font-semibold font-heading text-gray-900 text-center mb-6'>
            Request a Demo for Your Organisation
          </h2>
          <DemoRequestForm leadSource='Website - Banking & Financial Services' />
        </section>
      </div>
    </PageTransition>
  )
}
