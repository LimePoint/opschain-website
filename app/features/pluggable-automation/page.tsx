import { Metadata } from 'next'
import { FeaturePageLayout } from '@/components/ui/FeaturePageLayout'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Pluggable Automation | Tool-Agnostic Framework',
  description:
    "OpsChain's pluggable automation framework gives you the freedom to integrate any tool, system, or workflow into a single, secure operations ecosystem.",
}

export default function PluggableAutomationPage() {
  return (
    <PageTransition>
      <FeaturePageLayout
        title='Pluggable Automation | Tool-Agnostic Framework'
        tagline='Automate Without Limits.'
        description="OpsChain's pluggable automation framework gives you the freedom to integrate any tool, system, or workflow into a single, secure operations ecosystem. Whether you rely on Terraform, Ansible, custom scripts, or emerging technologies, OpsChain is completely tool-agnostic."
        icon='/img/ocplugins.png'
        details={[
          'Tool-agnostic framework supporting any automation tool',
          'Terraform, Ansible, Bash, Python, Java, CLIs. All supported',
          'Bring your own automation capability',
          'Zero friction integration with existing toolchains',
          'Governed execution regardless of underlying tool',
        ]}
      />
    </PageTransition>
  )
}
