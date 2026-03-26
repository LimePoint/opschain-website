import { Metadata } from 'next'
import { FeaturePageLayout } from '@/components/ui/FeaturePageLayout'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Autonomous Agents | AI-Powered Operations',
  description:
    'AI-powered agents work around the clock to autonomously manage business-as-usual (BAU) and DevOps tasks, from routine maintenance and monitoring to incident response, deployments, and beyond.',
}

export default function AutonomousAgentsPage() {
  return (
    <PageTransition>
      <FeaturePageLayout
        title='Autonomous Agents | AI-Powered Operations'
        tagline='Operate Smarter. Continuously.'
        description='AI-powered agents work around the clock to autonomously manage business-as-usual (BAU) and DevOps tasks, from routine maintenance and monitoring to incident response, deployments, and beyond. By eliminating manual effort and reducing human error, these digital teammates free up your teams to focus on innovation while ensuring operations remain efficient, resilient, and cost-effective.'
        icon='/img/opschain-autonomous-agents.svg'
        details={[
          '24x7 autonomous operations for BAU and DevOps tasks',
          'Reduces manual effort and human error',
          'Scales effortlessly with demand',
          'Integrates with existing environments, tools, and workflows',
          'Full governance and compliance traceability for every agent action',
        ]}
      />
    </PageTransition>
  )
}
