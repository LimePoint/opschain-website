import { Hero } from '@/components/Hero'
import { StatBar } from '@/components/StatBar'
import { ProductTour } from '@/components/ProductTour'
import { SocialProof } from '@/components/SocialProof'
import { ComparisonTable } from '@/components/ComparisonTable'
import { CTABanner } from '@/components/CTABanner'
import { VerticalCard } from '@/components/VerticalCard'
import { AnimatedSection } from '@/components/AnimatedSection'
import { ScrollTracker } from '@/components/analytics/ScrollTracker'
import { OrganizationSchema, SoftwareApplicationSchema } from '@/components/seo/JsonLd'
import { PageTransition } from '@/components/PageTransition'
import Image from 'next/image'
import Link from 'next/link'

const features = [
  {
    title: 'Autonomous Agents',
    tagline: 'Operate Smarter. Continuously.',
    description:
      '24x7 AI-powered teammates that execute BAU operations autonomously, improving efficiency, cutting costs, and ensuring compliance under governed control.',
    icon: '/img/opschain-autonomous-agents.svg',
    href: '/features/autonomous-agents/',
  },
  {
    title: 'Governed Intelligence',
    tagline: 'AI That Works, and Stays Governed.',
    description:
      'The governance and control engine ensuring every human, system, and AI action is compliant, logged, and auditable.',
    icon: '/img/opschain-governed-intelligence.svg',
    href: '/features/governed-intelligence/',
  },
  {
    title: 'Security, Auditability & Compliance',
    tagline: 'Automation You Can Trust.',
    description: 'Built for regulated enterprises. Every action governed, secured, and compliant by design.',
    icon: '/img/opschain-security.svg',
    href: '/features/security-compliance/',
  },
  {
    title: 'Unified Workflow Orchestration',
    tagline: 'Unify and Automate Everything.',
    description:
      'Automate complex, multi-system workflows through a unified control plane. No more siloed tools or manual handoffs.',
    icon: '/img/opschain-unified-workflow.svg',
    href: '/features/workflow-orchestration/',
  },
  {
    title: 'Real-Time Observability',
    tagline: 'Always-On Visibility. Self-Healing by Design.',
    description:
      'Gain full visibility into every process and empower the platform to detect and fix issues before they impact your business.',
    icon: '/img/opschain-observability.svg',
    href: '/features/observability/',
  },
  {
    title: 'Analytics & Continuous Improvement',
    tagline: 'Measure. Learn. Optimise.',
    description:
      'Turn operational data into actionable insights that drive continuous improvement across your entire operations stack.',
    icon: '/img/opschain-analytics.svg',
    href: '/features/analytics/',
  },
]

const verticals = [
  {
    icon: '/img/industry-utilities.svg',
    title: 'Utilities & Energy',
    description:
      'Automate and govern operational change across critical infrastructure with compliance built in for NERC CIP and IEC 62443.',
    complianceTags: ['NERC CIP', 'IEC 62443'],
    href: '/solutions/utilities-energy/',
  },
  {
    icon: '/img/industry-finance.svg',
    title: 'Banking & Financial Services',
    description:
      'PCI-DSS and APRA CPS 234 aligned automation for regulated financial operations with full audit trail.',
    complianceTags: ['PCI-DSS', 'APRA CPS 234'],
    href: '/solutions/banking-finance/',
  },
  {
    icon: '/img/industry-telco.svg',
    title: 'Telecommunications',
    description:
      'Unified change governance across 5G, IMS, and hybrid network infrastructure with real-time observability.',
    complianceTags: ['IEC 62443', '5G/IMS'],
    href: '/solutions/telecommunications/',
  },
]

export default function HomePage() {
  return (
    <PageTransition>
      <OrganizationSchema />
      <SoftwareApplicationSchema />
      <ScrollTracker />

      {/* 1. Hero */}
      <Hero />

      {/* 2. StatBar */}
      <AnimatedSection delay={0.1}>
        <StatBar />
      </AnimatedSection>

      {/* 3. Feature Grid */}
      <section className='bg-gray-50 py-16 sm:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <AnimatedSection>
            <div className='text-center'>
              <h2 className='text-3xl font-bold font-heading text-gray-900'>Platform Capabilities</h2>
              <p className='mt-4 text-lg text-gray-600'>
                Everything you need to automate, govern, and optimise enterprise operations.
              </p>
            </div>
          </AnimatedSection>
          <div className='mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 0.1} direction='up'>
                <Link
                  href={feature.href}
                  className='group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md h-full'
                >
                  <Image src={feature.icon} alt={feature.title} width={64} height={64} className='mb-4' />
                  <h3 className='text-lg font-semibold font-heading text-gray-900 group-hover:text-primary'>
                    {feature.title}
                  </h3>
                  <p className='mt-1 text-sm font-medium italic text-primary'>{feature.tagline}</p>
                  <p className='mt-2 text-sm text-gray-600'>{feature.description}</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Product Tour */}
      <section className='bg-white py-16 sm:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <AnimatedSection>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold font-heading text-gray-900'>How OpsChain Works</h2>
              <p className='mt-4 text-lg text-gray-600'>An interactive walkthrough of the OpsChain platform.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <ProductTour />
          </AnimatedSection>
        </div>
      </section>

      {/* 5. Vertical Cards */}
      <section className='bg-gray-50 py-16 sm:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <AnimatedSection>
            <div className='text-center'>
              <h2 className='text-3xl font-bold font-heading text-gray-900'>Built for Regulated Industries</h2>
              <p className='mt-4 text-lg text-gray-600'>
                Purpose-built solutions for the most demanding operational environments.
              </p>
            </div>
          </AnimatedSection>
          <div className='mt-12 grid gap-8 md:grid-cols-3'>
            {verticals.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.15}>
                <VerticalCard {...v} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Social Proof (controlled by NEXT_PUBLIC_SHOW_TESTIMONIALS) */}
      {process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS !== 'false' && (
        <AnimatedSection>
          <SocialProof />
        </AnimatedSection>
      )}

      {/* 7. Comparison Table (controlled by NEXT_PUBLIC_SHOW_COMPARISON_TABLE) */}
      {process.env.NEXT_PUBLIC_SHOW_COMPARISON_TABLE === 'true' && (
        <section className='bg-gray-50 py-16 sm:py-20'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <AnimatedSection>
              <div className='text-center mb-8'>
                <h2 className='text-3xl font-bold font-heading text-gray-900'>How OpsChain Compares</h2>
                <p className='mt-4 text-lg text-gray-600'>See how OpsChain stacks up against the alternatives.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <ComparisonTable />
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* 8. CTA Banner */}
      <CTABanner />
    </PageTransition>
  )
}
