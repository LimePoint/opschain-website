'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const IMAGE_BASE = '/img/product-tour'
const IMAGE_EXTENSIONS = ['svg', 'png', 'jpg', 'webp']

interface Tab {
  id: string
  label: string
  heading: string
  description: string
}

const tabs: Tab[] = [
  {
    id: 'governed-workflows',
    label: 'Governed Workflows',
    heading: 'Governed Workflows',
    description:
      "Define, enforce, and audit every step of your operational workflows with built-in governance guardrails. Ensure every change follows your organization's policies before it reaches production.",
  },
  {
    id: 'autonomous-agents',
    label: 'Autonomous Agents',
    heading: 'Autonomous Agents',
    description:
      'Deploy intelligent agents that execute complex operational tasks autonomously — while remaining fully governed and auditable. Free your teams from repetitive toil without sacrificing control.',
  },
  {
    id: 'unified-orchestration',
    label: 'Unified Orchestration',
    heading: 'Unified Orchestration',
    description:
      'Coordinate across cloud providers, on-prem infrastructure, and third-party tools from a single control plane. One workflow engine to rule your entire stack.',
  },
  {
    id: 'compliance-audit',
    label: 'Compliance & Audit',
    heading: 'Compliance & Audit',
    description:
      'Every action recorded, every decision traceable. Meet SOC 2, ISO 27001, and industry-specific compliance requirements with an immutable, end-to-end audit trail.',
  },
  {
    id: 'pluggable-automation',
    label: 'Pluggable Automation',
    heading: 'Pluggable Automation',
    description:
      'Pluggable automation framework gives you the freedom to integrate any tool, system, or workflow into a single, secure operations ecosystem. Whether you rely on Terraform, Ansible, custom scripts, or emerging technologies, OpsChain is completely tool-agnostic.',
  },
]

function TourImage({ id, alt }: { id: string; alt: string }) {
  const [extIndex, setExtIndex] = useState(0)
  const src = `${IMAGE_BASE}/${id}.${IMAGE_EXTENSIONS[extIndex]}`

  const handleError = useCallback(() => {
    setExtIndex((i) => (i + 1 < IMAGE_EXTENSIONS.length ? i + 1 : i))
  }, [])

  return <Image src={src} alt={alt} fill className='object-contain' onError={handleError} />
}

export function ProductTour() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const shouldReduce = useReducedMotion()

  const activeContent = tabs.find((t) => t.id === activeTab)!

  return (
    <section className='w-full py-16 px-4 md:px-8'>
      {/* Desktop: horizontal tabs */}
      <div className='hidden md:flex gap-2 border-b border-gray-200 mb-8'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-3 text-sm font-heading font-medium transition-colors ${
              activeTab === tab.id ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId='active-tab-indicator'
                className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary'
                transition={{ duration: shouldReduce ? 0 : 0.25 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Mobile: vertical accordion */}
      <div className='md:hidden space-y-2 mb-8'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-heading font-medium transition-colors ${
              activeTab === tab.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panel */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeTab}
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
          transition={{ duration: shouldReduce ? 0 : 0.25, ease: 'easeOut' }}
          className='max-w-4xl mx-auto'
        >
          <h3 className='text-2xl md:text-3xl font-heading font-semibold mb-4'>{activeContent.heading}</h3>
          <p className='text-gray-600 font-body mb-8 max-w-2xl'>{activeContent.description}</p>
          <div className='w-full aspect-video relative rounded-xl overflow-hidden border border-gray-200'>
            <TourImage id={activeContent.id} alt={activeContent.heading} />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
