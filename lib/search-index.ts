import { getAllBlogPosts, getAllDatasheets, getAllWebinars, isDatasheetsVisible, isWebinarsVisible } from './content'

export interface SearchEntry {
  title: string
  description: string
  url: string
  type: 'blog' | 'datasheet' | 'webinar' | 'feature' | 'solution' | 'page'
  tags?: string[]
  date?: string
}

const sitePages: SearchEntry[] = [
  {
    title: 'Contact Us',
    description:
      'Get in touch with the OpsChain team. Tell us about your operational challenges and discover how governed, intelligent automation can help.',
    url: '/contact/',
    type: 'page',
  },
  {
    title: 'Our Approach',
    description:
      'Modern enterprises need operations that are intelligent, autonomous, and governed — all in one platform. Discover why OpsChain is the answer.',
    url: '/our-approach/',
    type: 'page',
  },
  {
    title: 'Autonomous Agents — AI-Powered Operations',
    description:
      'AI-powered agents work around the clock to autonomously manage business-as-usual (BAU) and DevOps tasks — from routine maintenance and monitoring to incident response, deployments, and beyond.',
    url: '/features/autonomous-agents/',
    type: 'feature',
  },
  {
    title: 'Governed Intelligence — AI That Stays Accountable',
    description:
      'AI agents operate within a governed framework that enforces policies, tracks every action, and ensures complete auditability — without compromising speed or autonomy.',
    url: '/features/governed-intelligence/',
    type: 'feature',
  },
  {
    title: 'Unified Workflow Orchestration',
    description:
      'A single control plane to orchestrate workflows across cloud, on-prem, and hybrid environments — seamlessly integrating tools, systems, and teams.',
    url: '/features/workflow-orchestration/',
    type: 'feature',
  },
  {
    title: 'Enterprise-Grade Security, Auditability & Compliance',
    description:
      'Designed for regulated and security-conscious enterprises, the platform enforces strict controls across every action and interaction.',
    url: '/features/security-compliance/',
    type: 'feature',
  },
  {
    title: 'Pluggable Automation — Tool-Agnostic Framework',
    description:
      "OpsChain's pluggable automation framework gives you the freedom to integrate any tool, system, or workflow into a single, secure operations ecosystem.",
    url: '/features/pluggable-automation/',
    type: 'feature',
  },
  {
    title: 'Real-Time Observability & Self-Healing',
    description:
      'Gain full visibility into every process and empower the platform to detect and fix issues before they impact your business.',
    url: '/features/observability/',
    type: 'feature',
  },
  {
    title: 'Analytics, Insights & Continuous Improvement',
    description:
      'Turn operational data into actionable insights that drive continuous improvement across your entire operations stack.',
    url: '/features/analytics/',
    type: 'feature',
  },
  {
    title: 'OpsChain for Utilities & Energy',
    description:
      'How OpsChain helps utilities and energy companies automate operations while meeting NERC CIP and IEC 62443 compliance requirements.',
    url: '/solutions/utilities-energy/',
    type: 'solution',
  },
  {
    title: 'OpsChain for Banking & Financial Services',
    description:
      'How OpsChain helps banking and financial services organisations automate operations while meeting PCI-DSS and APRA CPS 234 compliance requirements.',
    url: '/solutions/banking-finance/',
    type: 'solution',
  },
  {
    title: 'OpsChain for Telecommunications',
    description:
      'How OpsChain helps telecommunications companies automate operations while meeting IEC 62443 compliance and managing complex 5G/IMS infrastructure.',
    url: '/solutions/telecommunications/',
    type: 'solution',
  },
]

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [...sitePages]

  for (const post of getAllBlogPosts()) {
    entries.push({
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}/`,
      type: 'blog',
      tags: post.tags,
      date: post.date,
    })
  }

  if (isDatasheetsVisible()) {
    for (const ds of getAllDatasheets()) {
      entries.push({
        title: ds.title,
        description: ds.description,
        url: `/resources/${ds.slug}/`,
        type: 'datasheet',
      })
    }
  }

  if (isWebinarsVisible()) {
    for (const w of getAllWebinars()) {
      entries.push({
        title: w.title,
        description: w.description,
        url: `/webinars/${w.slug}/`,
        type: 'webinar',
        date: w.date,
      })
    }
  }

  return entries
}
