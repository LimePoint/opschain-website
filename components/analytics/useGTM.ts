'use client'

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export function useGTM() {
  const push = (event: string, data?: Record<string, unknown>) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event, ...data })
    }
  }

  return { push }
}
