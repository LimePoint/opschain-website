'use client'

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

export type UTMParams = Record<(typeof UTM_PARAMS)[number], string>

export function captureUTMParams(): void {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(window.location.search)
  const utms: Partial<UTMParams> = {}

  for (const key of UTM_PARAMS) {
    const value = params.get(key)
    if (value) utms[key] = value
  }

  if (Object.keys(utms).length > 0) {
    sessionStorage.setItem('utm_params', JSON.stringify(utms))
  }
}

export function getUTMParams(): Partial<UTMParams> {
  if (typeof window === 'undefined') return {}

  try {
    const stored = sessionStorage.getItem('utm_params')
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}
