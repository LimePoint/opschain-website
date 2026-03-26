'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

interface VerticalCardProps {
  icon: string
  title: string
  description: string
  complianceTags: string[]
  href: string
}

export function VerticalCard({ icon, title, description, complianceTags, href }: VerticalCardProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      whileHover={
        shouldReduce
          ? undefined
          : {
              y: -4,
              boxShadow: '0 8px 30px rgba(46, 133, 85, 0.15)',
            }
      }
      transition={{ duration: shouldReduce ? 0 : 0.2, ease: 'easeOut' }}
      className='group flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-colors hover:border-primary/30'
    >
      <div className='mb-4 h-12 w-12 flex-shrink-0'>
        <Image src={icon} alt='' width={48} height={48} className='h-12 w-12 object-contain' />
      </div>

      <h3 className='mb-2 text-lg font-heading font-semibold text-gray-900'>{title}</h3>

      <p className='mb-4 flex-1 text-sm font-body text-gray-600 leading-relaxed'>{description}</p>

      {complianceTags.length > 0 && (
        <div className='mb-4 flex flex-wrap gap-2'>
          {complianceTags.map((tag) => (
            <span
              key={tag}
              className='inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary'
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <Link
        href={href}
        className='inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark transition-colors'
      >
        Learn more
        <span className='ml-1 transition-transform group-hover:translate-x-0.5' aria-hidden='true'>
          &rarr;
        </span>
      </Link>
    </motion.div>
  )
}
