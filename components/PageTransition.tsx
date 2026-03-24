'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduce ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: shouldReduce ? 0 : 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
