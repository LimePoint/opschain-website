import { Metadata } from 'next'
import { FeaturePageLayout } from '@/components/ui/FeaturePageLayout'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Enterprise-Grade Security, Auditability & Compliance',
  description:
    'Designed for regulated and security-conscious enterprises, the platform enforces strict controls across every action and interaction.',
}

export default function SecurityCompliancePage() {
  return (
    <PageTransition>
      <FeaturePageLayout
        title='Enterprise-Grade Security, Auditability & Compliance'
        tagline='Automation You Can Trust.'
        description='Designed for regulated and security-conscious enterprises, the platform enforces strict controls across every action and interaction. Secrets and credentials are secured via internal vaults or your own enterprise-grade vault solution, giving you flexibility without compromise.'
        icon='/img/opschain-security.svg'
        details={[
          'Enterprise-grade vault integration for secrets management',
          'Every action fully logged, traceable, and governed by policy',
          'Immutable audit trails for regulatory compliance',
          'Role-based access control and segregation of duties',
          'Security by design, not an afterthought',
        ]}
      />
    </PageTransition>
  )
}
