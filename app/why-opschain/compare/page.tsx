import type { Metadata } from 'next'
import { CTAButton } from '@/components/analytics/CTAButton'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'OpsChain vs. The Alternatives',
  description:
    'Compare OpsChain against Ansible Automation Platform, ServiceNow ITOM, Automation Anywhere, and Octopus Deploy across key enterprise operations capabilities.',
}

const capabilities = [
  {
    name: 'Governed AI Agents',
    opschain: true,
    ansible: false,
    servicenow: false,
    automationAnywhere: false,
    octopus: false,
  },
  {
    name: 'End-to-End Audit Trail',
    opschain: true,
    ansible: false,
    servicenow: true,
    automationAnywhere: false,
    octopus: false,
  },
  {
    name: 'Unified Orchestration',
    opschain: true,
    ansible: true,
    servicenow: false,
    automationAnywhere: false,
    octopus: false,
  },
  {
    name: 'Pluggable Automation',
    opschain: true,
    ansible: true,
    servicenow: false,
    automationAnywhere: false,
    octopus: true,
  },
  {
    name: 'Compliance-Ready',
    opschain: true,
    ansible: false,
    servicenow: true,
    automationAnywhere: false,
    octopus: false,
  },
  {
    name: 'Real-Time Observability',
    opschain: true,
    ansible: false,
    servicenow: true,
    automationAnywhere: false,
    octopus: false,
  },
]

const columns = [
  { key: 'opschain', label: 'OpsChain' },
  { key: 'ansible', label: 'Ansible Automation Platform' },
  { key: 'servicenow', label: 'ServiceNow ITOM' },
  { key: 'automationAnywhere', label: 'Automation Anywhere' },
  { key: 'octopus', label: 'Octopus Deploy' },
] as const

export default function ComparePage() {
  return (
    <PageTransition>
      <div className='mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold font-heading text-gray-900'>OpsChain vs. The Alternatives</h1>
        <p className='mt-4 text-lg text-gray-600'>
          See how OpsChain compares to traditional automation, ITSM, and RPA platforms across key enterprise operations
          capabilities.
        </p>

        <div className='mt-12 overflow-x-auto'>
          <table className='w-full min-w-[800px] border-collapse text-sm'>
            <thead>
              <tr className='border-b-2 border-gray-200'>
                <th className='py-3 pr-4 text-left font-semibold text-gray-900'>Capability</th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-3 py-3 text-center font-semibold ${col.key === 'opschain' ? 'text-primary bg-primary/5' : 'text-gray-900'}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {capabilities.map((cap) => (
                <tr key={cap.name} className='border-b border-gray-100'>
                  <td className='py-3 pr-4 font-medium text-gray-900'>{cap.name}</td>
                  {columns.map((col) => {
                    const value = cap[col.key]
                    return (
                      <td
                        key={col.key}
                        className={`px-3 py-3 text-center ${col.key === 'opschain' ? 'bg-primary/5' : ''}`}
                      >
                        {value ? (
                          <span className='text-green-600 font-bold' aria-label='Yes'>
                            &#10003;
                          </span>
                        ) : (
                          <span className='text-gray-300 font-bold' aria-label='No'>
                            &#10007;
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className='mt-8 text-sm text-gray-500'>
          Comparison based on publicly available product documentation as of 2025. Capabilities may vary by edition and
          configuration.
        </p>

        <section className='mt-12 rounded-xl border border-gray-200 bg-gray-50 p-8 text-center'>
          <h2 className='text-2xl font-semibold font-heading text-gray-900'>Ready to See the Difference?</h2>
          <p className='mt-2 text-gray-600'>
            Book a personalised demo and see how OpsChain delivers governed, intelligent operations where others fall
            short.
          </p>
          <CTAButton href='/book-demo/' label='Book a Demo' className='mt-6' />
        </section>
      </div>
    </PageTransition>
  )
}
