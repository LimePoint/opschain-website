'use client'

import { useEffect, useRef } from 'react'
import { useGTM } from './useGTM'

const THRESHOLDS = [25, 50, 75, 100]

export function ScrollTracker() {
  const { push } = useGTM()
  const firedRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const percent = Math.round((window.scrollY / scrollHeight) * 100)

      for (const threshold of THRESHOLDS) {
        if (percent >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold)
          push('scroll_depth', {
            percent_scrolled: threshold,
            page_path: window.location.pathname,
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [push])

  return null
}
