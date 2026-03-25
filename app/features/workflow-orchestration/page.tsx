import { Metadata } from 'next'
import { FeaturePageLayout } from '@/components/ui/FeaturePageLayout'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Unified Workflow Orchestration',
  description:
    'A single control plane to orchestrate workflows across cloud, on-prem, and hybrid environments, seamlessly integrating tools, systems, and teams.',
}

export default function WorkflowOrchestrationPage() {
  return (
    <PageTransition>
      <FeaturePageLayout
        title='Unified Workflow Orchestration'
        tagline='Unify and Automate Everything.'
        description='A single control plane to orchestrate workflows across cloud, on-prem, and hybrid environments, seamlessly integrating tools, systems, and teams. AI agents and humans can both initiate and participate in the same workflows, enabling true collaboration and automation without boundaries.'
        icon='/img/workflow.svg'
        details={[
          'Single control plane for cloud, on-prem, and hybrid',
          'Cross-system automation spanning infrastructure, applications, and services',
          'AI and human collaboration in the same workflows',
          'Pluggable automation framework for any tool',
          'End-to-end workflow visibility and governance',
        ]}
      />
    </PageTransition>
  )
}
