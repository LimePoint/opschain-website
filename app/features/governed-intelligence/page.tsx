import { Metadata } from 'next'
import { FeaturePageLayout } from '@/components/ui/FeaturePageLayout'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Governed Intelligence | AI That Stays Accountable',
  description:
    'AI agents operate within a governed framework that enforces policies, tracks every action, and ensures complete auditability, without compromising speed or autonomy.',
}

export default function GovernedIntelligencePage() {
  return (
    <PageTransition>
      <FeaturePageLayout
        title='Governed Intelligence | AI That Stays Accountable'
        tagline='AI That Works, and Stays Governed.'
        description='AI agents operate within a governed framework that enforces policies, tracks every action, and ensures complete auditability, without compromising speed or autonomy. Every decision and execution step taken by an agent is logged and attributable, giving teams full transparency and traceability across automated operations.'
        icon='/img/opschain-governed-intelligence.svg'
        details={[
          'Policy enforcement at every step of AI execution',
          'Complete audit trail for all agent actions',
          'Configurable approval workflows. Use where needed, skip where speed matters',
          'Explainable AI decisions with full attribution',
          'Compliance-ready governance for regulated industries',
        ]}
      />
    </PageTransition>
  )
}
