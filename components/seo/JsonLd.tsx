interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opschain.io'

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': 'https://www.opschain.io/#organization',
        name: 'LimePoint',
        legalName: 'LimePoint Pty Ltd',
        url: 'https://limepoint.com',
        logo: `${siteUrl}/img/opschain-nav-logo.png`,
        sameAs: ['https://www.linkedin.com/company/limepoint/', 'https://github.com/LimePoint'],
      }}
    />
  )
}

export function SoftwareApplicationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://www.opschain.io/#software',
        name: 'OpsChain',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'IT Operations Automation',
        operatingSystem: 'Cloud, On-Premise, Hybrid',
        description:
          'OpsChain is an enterprise operations automation and governance platform with AI-powered agents, governed workflows, and end-to-end audit trails. Designed for regulated enterprises in utilities, banking, and telecommunications.',
        url: siteUrl,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'PriceSpecification',
            description: 'Enterprise licensing — contact for pricing',
          },
          seller: {
            '@type': 'Organization',
            name: 'LimePoint',
            url: 'https://www.limepoint.com',
          },
        },
        publisher: {
          '@type': 'Organization',
          '@id': 'https://www.opschain.io/#organization',
          name: 'LimePoint',
        },
      }}
    />
  )
}

export function BlogPostingSchema({
  title,
  description,
  date,
  author,
  url,
  image,
}: {
  title: string
  description: string
  date: string
  author: string
  url: string
  image?: string
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        datePublished: date,
        dateModified: date,
        author: {
          '@type': 'Person',
          name: author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'LimePoint',
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/img/opschain-nav-logo.png`,
          },
        },
        url,
        image: image || `${siteUrl}/img/og-default.png`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
      }}
    />
  )
}

export function EventSchema({
  title,
  description,
  date,
  status,
  url,
}: {
  title: string
  description: string
  date: string
  status: 'upcoming' | 'past' | 'on-demand'
  url: string
}) {
  const eventStatus =
    status === 'upcoming' ? 'https://schema.org/EventScheduled' : 'https://schema.org/EventMovedOnline'

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: title,
        description,
        startDate: date,
        eventStatus,
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        location: {
          '@type': 'VirtualLocation',
          url,
        },
        organizer: {
          '@type': 'Organization',
          name: 'LimePoint',
          url: 'https://limepoint.com',
        },
      }}
    />
  )
}

export function FAQSchema({ questions }: { questions: { question: string; answer: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: questions.map((q) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer,
          },
        })),
      }}
    />
  )
}
