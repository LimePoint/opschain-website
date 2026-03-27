import Link from 'next/link'

const footerLinks = {
  product: {
    title: 'Product',
    items: [
      { label: 'Features', href: '/features/autonomous-agents/' },
      { label: 'Our Approach', href: '/our-approach/' },
      // { label: 'Solutions', href: '/solutions/utilities-energy/' },
    ],
  },
  resources: {
    title: 'Resources',
    items: [
      { label: 'Blog', href: '/blog/' },
      ...(process.env.NEXT_PUBLIC_SHOW_DATASHEETS !== 'false' ? [{ label: 'Datasheets', href: '/resources/' }] : []),
      ...(process.env.NEXT_PUBLIC_SHOW_WEBINARS !== 'false' ? [{ label: 'Webinars', href: '/webinars/' }] : []),
    ],
  },
  docs: {
    title: 'Documentation',
    items: [
      {
        label: 'Documentation Library',
        href: 'https://docs.opschain.io',
        external: true,
      },
      {
        label: 'Getting Started',
        href: 'https://docs.opschain.io/docs/category/getting-started',
        external: true,
      },
    ],
  },
  company: {
    title: 'Company',
    items: [
      {
        label: 'About Us',
        href: 'https://www.limepoint.com/about-limepoint',
        external: true,
      },
      { label: 'Contact Us', href: '/contact/' },
    ],
  },
  legal: {
    title: 'Legal',
    items: [
      { label: 'End User Licence Agreement', href: '/eula/' },
      { label: 'Terms of Use', href: '/terms-of-use/' },
      { label: 'Privacy', href: '/privacy/' },
    ],
  },
}

export function Footer() {
  return (
    <footer className='border-t border-gray-200 bg-gray-900 text-gray-300'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5'>
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className='text-sm font-semibold uppercase tracking-wider text-white'>{section.title}</h3>
              <ul className='mt-4 space-y-2'>
                {section.items.map((item) => (
                  <li key={item.href}>
                    {'external' in item && item.external ? (
                      <a
                        href={item.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-sm text-gray-400 hover:text-white transition-colors'
                      >
                        {item.label} <span className='text-xs text-gray-500'>↗</span>
                      </a>
                    ) : (
                      <Link href={item.href} className='text-sm text-gray-400 hover:text-white transition-colors'>
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500'>
          Copyright &copy; {new Date().getFullYear()}{' '}
          <a href='https://limepoint.com/' className='hover:text-white transition-colors'>
            LimePoint
          </a>{' '}
          Pty Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
