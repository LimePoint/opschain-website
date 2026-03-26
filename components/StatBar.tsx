'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// TODO: replace with real metrics
const stats = [
  { value: 500000, suffix: '+', label: 'Changes Automated Monthly' },
  { value: 99.9, suffix: '%', label: 'Compliance Rate', decimals: 1 },
  // { value: 3, suffix: '', label: 'Regulated Verticals' },
  { value: 100, suffix: '+', label: 'Pluggable Automation Integrations' },
  { value: 24, suffix: '/7', label: 'Autonomous Operations' },
] as const

function AnimatedCounter({
  value,
  suffix,
  decimals = 0,
  animate,
}: {
  value: number
  suffix: string
  decimals?: number
  animate: boolean
}) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!animate) return

    const duration = 1500
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(eased * value)

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [animate, value])

  const formatted = animate
    ? decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toString()
    : decimals > 0
      ? value.toFixed(decimals)
      : value.toString()

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  )
}

export function StatBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  const shouldAnimate = isInView && !shouldReduce

  return (
    <section ref={ref} className='bg-gray-950 py-16'>
      <div className='mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 lg:grid-cols-4'>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className='text-center'
            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : i * 0.1 }}
          >
            <p className='font-heading text-4xl font-bold text-accent'>
              {shouldReduce ? (
                <span>
                  {'decimals' in stat && stat.decimals ? stat.value.toFixed(stat.decimals) : stat.value}
                  {stat.suffix}
                </span>
              ) : (
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={'decimals' in stat ? stat.decimals : 0}
                  animate={shouldAnimate}
                />
              )}
            </p>
            <p className='mt-2 font-body text-sm text-gray-400'>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
