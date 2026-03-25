'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import testimonials from '@/content/testimonials'

const AUTO_SCROLL_INTERVAL = 6000

export function SocialProof() {
  const shouldReduce = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (testimonials.length <= 1) return
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length)
    }, AUTO_SCROLL_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  if (testimonials.length === 0) return null

  const variants = shouldReduce
    ? { enter: {}, center: {}, exit: {} }
    : {
        enter: { opacity: 0, x: 40 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -40 },
      }

  return (
    <section className='bg-white py-16'>
      <div className='mx-auto max-w-3xl px-6 text-center'>
        <h2 className='font-heading text-3xl font-bold text-gray-900'>What Our Customers Say</h2>

        <div className='relative mt-8 min-h-[160px]'>
          <AnimatePresence mode='wait'>
            <motion.blockquote
              key={activeIndex}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{ duration: shouldReduce ? 0 : 0.4, ease: 'easeInOut' }}
            >
              <p className='font-body text-lg italic leading-relaxed text-gray-600'>
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </p>
              <footer className='mt-4'>
                <p className='font-heading text-sm font-semibold text-gray-900'>{testimonials[activeIndex].name}</p>
                <p className='font-body text-sm text-gray-500'>
                  {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {testimonials.length > 1 && (
          <div className='mt-6 flex justify-center gap-2'>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === activeIndex ? 'w-6 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
