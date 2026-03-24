'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { CTAButton } from '@/components/analytics/CTAButton'

const headlineWords = 'Automate and Govern Enterprise Operations at Scale'.split(' ')

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Hero() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      className='relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950'
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 20% 40%, rgba(46,133,85,0.3) 0%, transparent 60%),
          radial-gradient(ellipse 60% 60% at 80% 20%, rgba(37,194,160,0.2) 0%, transparent 50%),
          radial-gradient(ellipse 50% 80% at 50% 80%, rgba(46,133,85,0.15) 0%, transparent 50%),
          linear-gradient(180deg, #0a0f1a 0%, #111827 50%, #0a0f1a 100%)
        `,
      }}
    >
      <div className='relative z-10 mx-auto max-w-4xl px-6 py-24 text-center'>
        <motion.div
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduce ? 0 : 0.5 }}
          className='mb-8'
        >
          <Image src='/img/TextNoLine.svg' alt='OpsChain' width={280} height={60} className='mx-auto' priority />
        </motion.div>

        <motion.h1
          className='font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl'
          variants={shouldReduce ? undefined : containerVariants}
          initial={shouldReduce ? { opacity: 1 } : 'hidden'}
          animate='visible'
        >
          {headlineWords.map((word, i) => (
            <motion.span key={i} className='mr-[0.3em] inline-block' variants={shouldReduce ? undefined : wordVariants}>
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className='mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-gray-300 sm:text-xl'
          variants={shouldReduce ? undefined : fadeUp}
          initial={shouldReduce ? { opacity: 1 } : 'hidden'}
          animate='visible'
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 1.2 }}
        >
          OpsChain is the AI-powered operations platform that orchestrates change across your infrastructure — with full
          audit trails and compliance built in.
        </motion.p>

        <motion.div
          className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'
          variants={shouldReduce ? undefined : fadeUp}
          initial={shouldReduce ? { opacity: 1 } : 'hidden'}
          animate='visible'
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 1.5 }}
        >
          <CTAButton href='/book-demo/' label='Book a Demo' variant='primary' />
          <CTAButton href='/why-opschain/' label='Learn More' variant='secondary' />
        </motion.div>

        <motion.p
          className='mt-12 font-body text-sm text-gray-400'
          variants={shouldReduce ? undefined : fadeUp}
          initial={shouldReduce ? { opacity: 1 } : 'hidden'}
          animate='visible'
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : 1.8 }}
        >
          Trusted by teams in utilities, banking, and telecommunications
        </motion.p>
      </div>
    </section>
  )
}
