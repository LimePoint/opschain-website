import { Metadata } from 'next'
import { FeaturePageLayout } from '@/components/ui/FeaturePageLayout'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Real-Time Observability & Self-Healing',
  description:
    'Gain full visibility into every process and empower the platform to detect and fix issues before they impact your business.',
}

export default function ObservabilityPage() {
  return (
    <PageTransition>
      <FeaturePageLayout
        title='Real-Time Observability & Self-Healing'
        tagline='Always-On Visibility. Self-Healing by Design.'
        description="Gain full visibility into every process and empower the platform to detect and fix issues before they impact your business. OpsChain's observability capabilities provide real-time insights across all automated operations."
        icon='/img/manage.svg'
        details={[
          'Real-time visibility into all operational processes',
          'Proactive issue detection before business impact',
          'Self-healing capabilities for automated remediation',
          'End-to-end operational dashboards and metrics',
          'Integration with existing monitoring and observability tools',
        ]}
      />
    </PageTransition>
  )
}
