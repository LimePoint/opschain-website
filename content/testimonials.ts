export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'OpsChain transformed how we manage infrastructure changes. What used to take days of manual coordination now happens automatically with full compliance. Our audit team loves it.',
    name: 'Jane Smith',
    role: 'VP of Operations',
    company: 'Acme Utilities',
  },
  {
    quote:
      'We evaluated five platforms before choosing OpsChain. The governed AI agents and end-to-end audit trail were the deciding factors. Nothing else came close for our compliance requirements.',
    name: 'Michael Chen',
    role: 'CTO',
    company: 'Global Banking Corp',
  },
  {
    quote:
      'Rolling out changes across 200+ network nodes used to be a weekend-long ordeal. With OpsChain, we orchestrate the entire process in hours with zero manual intervention and full traceability.',
    name: 'Sarah Andersson',
    role: 'Head of Network Engineering',
    company: 'TeleConnect',
  },
  {
    quote:
      'The pluggable automation framework meant we could bring our existing Ansible and Terraform investments into OpsChain without rewriting anything. That alone saved us months.',
    name: 'David Okafor',
    role: 'Director of Platform Engineering',
    company: 'SecureOps Inc',
  },
]

export default testimonials
