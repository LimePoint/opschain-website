import type { Metadata } from 'next'
import { Poppins, Rubik } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import { GTMHead, GTMBody } from '@/components/analytics/GTMProvider'
import { RouteChangeTracker } from '@/components/analytics/RouteChangeTracker'
import { SearchData } from '@/components/search/SearchData'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opschain.io'

export const metadata: Metadata = {
  title: {
    default: 'OpsChain | Enterprise Operations Automation & Governance Platform',
    template: '%s | OpsChain',
  },
  description:
    'OpsChain is an enterprise operations platform that automates infrastructure change management with AI-powered agents, governed workflows, and end-to-end audit trails.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'OpsChain',
    title: 'OpsChain | Enterprise Operations Automation & Governance Platform',
    description:
      'OpsChain is an enterprise operations platform that automates infrastructure change management with AI-powered agents, governed workflows, and end-to-end audit trails.',
    images: [
      {
        url: '/img/og-default.png',
        width: 1200,
        height: 630,
        alt: 'OpsChain — Enterprise Operations Automation & Governance Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/img/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${poppins.variable} ${rubik.variable}`}>
      <head>
        <GTMHead />
      </head>
      <body className='flex min-h-screen flex-col font-body antialiased'>
        <GTMBody />
        <RouteChangeTracker />
        <Navbar />
        <main className='flex-1'>{children}</main>
        <Footer />
        <SearchData />
      </body>
    </html>
  )
}
