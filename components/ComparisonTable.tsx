'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

type CellValue = '✓' | '✗' | 'Partial'

interface ComparisonRow {
  capability: string
  opschain: CellValue
  ansible: CellValue
  servicenow: CellValue
  automationAnywhere: CellValue
  octopus: CellValue
}

// TODO: verify competitive claims
const rows: ComparisonRow[] = [
  {
    capability: 'Governed AI Agents',
    opschain: '✓',
    ansible: '✗',
    servicenow: 'Partial',
    automationAnywhere: 'Partial',
    octopus: '✗',
  },
  {
    capability: 'End-to-End Audit Trail',
    opschain: '✓',
    ansible: 'Partial',
    servicenow: '✓',
    automationAnywhere: 'Partial',
    octopus: 'Partial',
  },
  {
    capability: 'Unified Orchestration',
    opschain: '✓',
    ansible: 'Partial',
    servicenow: 'Partial',
    automationAnywhere: '✗',
    octopus: 'Partial',
  },
  {
    capability: 'Pluggable Automation',
    opschain: '✓',
    ansible: '✓',
    servicenow: 'Partial',
    automationAnywhere: '✓',
    octopus: '✓',
  },
  {
    capability: 'Compliance-Ready Governance',
    opschain: '✓',
    ansible: 'Partial',
    servicenow: '✓',
    automationAnywhere: '✗',
    octopus: '✗',
  },
  {
    capability: 'Real-Time Observability',
    opschain: '✓',
    ansible: 'Partial',
    servicenow: '✓',
    automationAnywhere: 'Partial',
    octopus: 'Partial',
  },
]

const columns = [
  { key: 'opschain' as const, label: 'OpsChain' },
  { key: 'ansible' as const, label: 'Ansible Automation Platform' },
  { key: 'servicenow' as const, label: 'ServiceNow ITOM' },
  { key: 'automationAnywhere' as const, label: 'Automation Anywhere' },
  { key: 'octopus' as const, label: 'Octopus Deploy' },
]

function CellBadge({ value }: { value: CellValue }) {
  if (value === '✓') {
    return <span className='text-primary font-semibold text-lg'>✓</span>
  }
  if (value === '✗') {
    return <span className='text-red-400 font-semibold text-lg'>✗</span>
  }
  return <span className='text-amber-500 text-xs font-medium px-2 py-0.5 bg-amber-50 rounded-full'>Partial</span>
}

function AnimatedRow({ row, index }: { row: ComparisonRow; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.tr
      ref={ref}
      initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: shouldReduce ? 0 : 0.4,
        delay: shouldReduce ? 0 : index * 0.08,
        ease: 'easeOut',
      }}
      className='border-b border-gray-100 last:border-b-0'
    >
      <td className='sticky left-0 z-10 bg-white px-4 py-4 font-body font-medium text-gray-800 text-sm whitespace-nowrap'>
        {row.capability}
      </td>
      {columns.map((col) => (
        <td
          key={col.key}
          className={`px-4 py-4 text-center ${col.key === 'opschain' ? 'bg-primary/5 sticky left-[200px] z-10' : ''}`}
        >
          <CellBadge value={row[col.key]} />
        </td>
      ))}
    </motion.tr>
  )
}

export function ComparisonTable() {
  return (
    <section className='w-full py-16 px-4 md:px-8'>
      <div className='overflow-x-auto rounded-xl border border-gray-200 shadow-sm'>
        <table className='w-full min-w-[800px] border-collapse'>
          <thead>
            <tr className='bg-gray-50'>
              <th className='sticky left-0 z-20 bg-gray-50 px-4 py-4 text-left text-xs font-heading font-semibold uppercase tracking-wider text-gray-500'>
                Capability
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-4 text-center text-xs font-heading font-semibold uppercase tracking-wider whitespace-nowrap ${
                    col.key === 'opschain' ? 'bg-primary/10 text-primary sticky left-[200px] z-20' : 'text-gray-500'
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <AnimatedRow key={row.capability} row={row} index={i} />
            ))}
          </tbody>
        </table>
      </div>
      <p className='mt-4 text-xs text-gray-400 text-center'>
        {/* TODO: verify competitive claims */}
        Comparison based on publicly available product documentation as of 2024. Verify claims before publishing.
      </p>
    </section>
  )
}
