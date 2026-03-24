'use client'

import Link from 'next/link'
import { useGTM } from './GTMProvider'

interface CTAButtonProps {
  href: string
  label: string
  variant?: 'primary' | 'secondary'
  className?: string
  external?: boolean
}

export function CTAButton({ href, label, variant = 'primary', className = '', external = false }: CTAButtonProps) {
  const { push } = useGTM()

  const baseClasses = 'inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors shadow-sm'
  const variantClasses =
    variant === 'primary'
      ? 'bg-primary text-white hover:bg-primary-dark'
      : 'border border-primary text-primary hover:bg-primary hover:text-white'

  function handleClick() {
    push('cta_click', {
      cta_label: label,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    })
  }

  if (external) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={`${baseClasses} ${variantClasses} ${className}`}
        onClick={handleClick}
      >
        {label}
      </a>
    )
  }

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses} ${className}`} onClick={handleClick}>
      {label}
    </Link>
  )
}
