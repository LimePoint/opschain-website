'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { CTAButton } from '@/components/analytics/CTAButton'

export function CTABanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <section ref={ref} className='bg-gray-900 py-20'>
      <div className='mx-auto max-w-3xl px-6 text-center'>
        <motion.h2
          className='font-heading text-3xl font-bold text-white sm:text-4xl'
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: shouldReduce ? 0 : 0.5 }}
        >
          Ready to Transform Your Operations?
        </motion.h2>

        <motion.p
          className='mx-auto mt-4 max-w-xl font-body text-lg text-gray-300'
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.15 }}
        >
          See how OpsChain can streamline your infrastructure changes with a personalized demo tailored to your
          environment.
        </motion.p>

        <motion.div
          className='mt-8'
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 0.3 }}
        >
          <CTAButton href='/book-demo/' label='Book a Demo' variant='primary' />
        </motion.div>
      </div>
    </section>
  )
}
