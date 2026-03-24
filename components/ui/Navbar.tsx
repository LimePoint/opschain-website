'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { SearchDialog } from '@/components/search/SearchDialog'

// ---------------------------------------------------------------------------
// Types & data
// ---------------------------------------------------------------------------

interface DropdownItem {
  label: string
  href: string
  external?: boolean
}

interface NavDropdown {
  label: string
  items: DropdownItem[]
}

const SCROLL_THRESHOLD = 60

const featureItems: DropdownItem[] = [
  { label: 'Autonomous Agents', href: '/features/autonomous-agents/' },
  { label: 'Governed Intelligence', href: '/features/governed-intelligence/' },
  { label: 'Workflow Orchestration', href: '/features/workflow-orchestration/' },
  { label: 'Security & Compliance', href: '/features/security-compliance/' },
  { label: 'Pluggable Automation', href: '/features/pluggable-automation/' },
  { label: 'Observability', href: '/features/observability/' },
  { label: 'Analytics', href: '/features/analytics/' },
]

const solutionItems: DropdownItem[] = [
  { label: 'Utilities & Energy', href: '/solutions/utilities-energy/' },
  { label: 'Banking & Financial Services', href: '/solutions/banking-finance/' },
  { label: 'Telecommunications', href: '/solutions/telecommunications/' },
]

const resourceItems: DropdownItem[] = [
  { label: 'Blog', href: '/blog/' },
  { label: 'Datasheets', href: '/resources/' },
  { label: 'Webinars', href: '/webinars/' },
]

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const dropdownVariants = {
  hidden: { opacity: 0, y: -4, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -4, scale: 0.98 },
}

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
}

const instantVariants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 1, y: 0, scale: 1 },
}

const instantMobileVariants = {
  hidden: { opacity: 1, height: 'auto' },
  visible: { opacity: 1, height: 'auto' },
  exit: { opacity: 1, height: 0 },
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

function useScrolled(threshold: number) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold)
    }

    // Check initial position (page may be loaded already scrolled)
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}

/**
 * Returns true when `pathname` starts with the given `href`, handling
 * trailing-slash variations. For exact matches (e.g. `/why-opschain/`) we
 * also accept the version without trailing slash.
 */
function isActive(pathname: string, href: string): boolean {
  if (pathname === href) return true
  // Strip trailing slash for comparison
  const normalised = href.endsWith('/') ? href.slice(0, -1) : href
  return pathname === normalised || pathname.startsWith(normalised + '/')
}

function isDropdownActive(pathname: string, items: DropdownItem[]): boolean {
  return items.some((item) => isActive(pathname, item.href))
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function DropdownMenu({
  dropdown,
  pathname,
  reducedMotion,
}: {
  dropdown: NavDropdown
  pathname: string
  reducedMotion: boolean | null
}) {
  const [open, setOpen] = useState(false)
  const active = isDropdownActive(pathname, dropdown.items)
  const variants = reducedMotion ? instantVariants : dropdownVariants

  return (
    <div className='relative' onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className={clsx(
          'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors',
          active ? 'text-primary' : 'text-gray-700 hover:text-primary'
        )}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {dropdown.label}
        <svg
          className={clsx('h-4 w-4 transition-transform', open && 'rotate-180')}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={variants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ duration: reducedMotion ? 0 : 0.15, ease: 'easeOut' }}
            className='absolute left-0 top-full z-50 mt-0 w-64 overflow-hidden rounded-lg border border-gray-100 bg-white py-2 shadow-lg'
          >
            {dropdown.items.map((item) => {
              const itemActive = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'block px-4 py-2 text-sm transition-colors',
                    itemActive
                      ? 'bg-primary/5 font-medium text-primary'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                  )}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {item.label}
                  {item.external && <span className='ml-1 text-xs text-gray-400'>↗</span>}
                </Link>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function HamburgerIcon({ open, reducedMotion }: { open: boolean; reducedMotion: boolean | null }) {
  const transition = reducedMotion ? { duration: 0 } : { duration: 0.25 }

  return (
    <svg
      className='h-6 w-6'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      {/* Top bar */}
      <motion.line
        x1='4'
        x2='20'
        animate={open ? { y1: 6, y2: 18, x1: 6, x2: 18 } : { y1: 6, y2: 6, x1: 4, x2: 20 }}
        transition={transition}
      />
      {/* Middle bar */}
      <motion.line
        x1='4'
        y1='12'
        x2='20'
        y2='12'
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={transition}
      />
      {/* Bottom bar */}
      <motion.line
        x1='4'
        x2='20'
        animate={open ? { y1: 18, y2: 6, x1: 6, x2: 18 } : { y1: 18, y2: 18, x1: 4, x2: 20 }}
        transition={transition}
      />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = useScrolled(SCROLL_THRESHOLD)
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()

  const mobileVariants = reducedMotion ? instantMobileVariants : mobileMenuVariants

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80'
          : 'bg-transparent'
      )}
    >
      <nav className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <Image src='/img/opschain-nav-logo.png' alt='OpsChain' width={32} height={32} />
          <span className='text-lg font-semibold font-heading'>OpsChain</span>
        </Link>

        {/* Desktop nav */}
        <div className='hidden items-center gap-1 lg:flex'>
          <Link
            href='/why-opschain/'
            className={clsx(
              'px-3 py-2 text-sm font-medium transition-colors',
              isActive(pathname, '/why-opschain/') ? 'text-primary' : 'text-gray-700 hover:text-primary'
            )}
          >
            Why OpsChain
          </Link>
          <DropdownMenu
            dropdown={{ label: 'Features', items: featureItems }}
            pathname={pathname}
            reducedMotion={reducedMotion}
          />
          <DropdownMenu
            dropdown={{ label: 'Solutions', items: solutionItems }}
            pathname={pathname}
            reducedMotion={reducedMotion}
          />
          <DropdownMenu
            dropdown={{ label: 'Resources', items: resourceItems }}
            pathname={pathname}
            reducedMotion={reducedMotion}
          />
          <a
            href='https://docs.opschain.io'
            target='_blank'
            rel='noopener noreferrer'
            className='px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors'
          >
            Docs <span className='text-xs text-gray-400'>↗</span>
          </a>
        </div>

        {/* Search + CTA */}
        <div className='hidden items-center gap-3 lg:flex'>
          <SearchDialog />
          <Link
            href='/book-demo/'
            className='inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors'
          >
            Book a Demo
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className='lg:hidden rounded-md p-2 text-gray-700'
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label='Toggle menu'
        >
          <HamburgerIcon open={mobileOpen} reducedMotion={reducedMotion} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: 'easeOut' }}
            className='overflow-hidden border-t border-gray-100 bg-white lg:hidden'
          >
            <div className='space-y-1 px-4 py-4'>
              <Link
                href='/why-opschain/'
                onClick={closeMobile}
                className={clsx(
                  'block rounded-md px-3 py-2 text-sm font-medium',
                  isActive(pathname, '/why-opschain/') ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                Why OpsChain
              </Link>

              <div className='px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400'>Features</div>
              {featureItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className={clsx(
                    'block rounded-md px-6 py-2 text-sm',
                    isActive(pathname, item.href)
                      ? 'bg-primary/5 font-medium text-primary'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <div className='px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400'>Solutions</div>
              {solutionItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className={clsx(
                    'block rounded-md px-6 py-2 text-sm',
                    isActive(pathname, item.href)
                      ? 'bg-primary/5 font-medium text-primary'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <div className='px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400'>Resources</div>
              {resourceItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className={clsx(
                    'block rounded-md px-6 py-2 text-sm',
                    isActive(pathname, item.href)
                      ? 'bg-primary/5 font-medium text-primary'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <a
                href='https://docs.opschain.io'
                target='_blank'
                rel='noopener noreferrer'
                className='block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
              >
                Docs ↗
              </a>

              <div className='pt-2'>
                <Link
                  href='/book-demo/'
                  onClick={closeMobile}
                  className='block rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-primary-dark'
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
