import { Metadata } from 'next'
import { FeaturePageLayout } from '@/components/ui/FeaturePageLayout'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Analytics, Insights & Continuous Improvement',
  description:
    'Turn operational data into actionable insights that drive continuous improvement across your entire operations stack.',
}

export default function AnalyticsPage() {
  return (
    <PageTransition>
      <FeaturePageLayout
        title='Analytics, Insights & Continuous Improvement'
        tagline='Measure. Learn. Optimise.'
        description='Turn operational data into actionable insights that drive continuous improvement across your entire operations stack. Track change efficiency, identify bottlenecks, and optimise workflows with data-driven decisions.'
        icon='/img/opschain-analytics.svg'
        details={[
          'Operational analytics and performance dashboards',
          'Change efficiency tracking and bottleneck identification',
          'Data-driven workflow optimisation',
          'Historical trend analysis for capacity planning',
          'Continuous improvement metrics aligned to business outcomes',
        ]}
      />
    </PageTransition>
  )
}
