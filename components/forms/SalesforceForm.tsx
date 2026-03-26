'use client'

import { useState, useEffect, useRef, type FormEvent, type ReactNode } from 'react'
import { getUTMParams, captureUTMParams } from '@/lib/utm'
import { useGTM } from '@/components/analytics/useGTM'

const SF_ENDPOINT = 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8'
const SF_ORG_ID = process.env.NEXT_PUBLIC_SF_ORG_ID || '00DQE00000BdTqD'

export interface SalesforceFormProps {
  formName: string
  leadSource?: string
  leadSourceDetail?: string
  onSuccess?: () => void
  children: ReactNode
  submitLabel?: string
  className?: string
}

export function SalesforceForm({
  formName,
  leadSource = 'Website',
  leadSourceDetail = '',
  onSuccess,
  children,
  submitLabel = 'Submit',
  className = '',
}: SalesforceFormProps) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const { push } = useGTM()

  useEffect(() => {
    captureUTMParams()
  }, [])

  useEffect(() => {
    // Listen for iframe load after form submit to detect completion
    const iframe = iframeRef.current
    if (!iframe) return

    function handleLoad() {
      if (submitting) {
        setSubmitted(true)
        setSubmitting(false)
        push('form_submit', {
          form_name: formName,
          page_path: window.location.pathname,
        })
        onSuccess?.()
      }
    }

    iframe.addEventListener('load', handleLoad)
    return () => iframe.removeEventListener('load', handleLoad)
  }, [submitting, formName, onSuccess, push])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const form = formRef.current
    if (!form) return

    // Inject UTM params as hidden fields before submit
    const utmParams = getUTMParams()
    for (const [key, value] of Object.entries(utmParams)) {
      let input = form.querySelector<HTMLInputElement>(`input[name="${key}"]`)
      if (!input) {
        input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        form.appendChild(input)
      }
      input.value = value
    }

    // Submit the form into the hidden iframe
    form.submit()

    // Fallback: if iframe load doesn't fire (e.g. cross-origin), assume success after timeout
    setTimeout(() => {
      if (!submitted) {
        setSubmitted(true)
        setSubmitting(false)
        push('form_submit', {
          form_name: formName,
          page_path: window.location.pathname,
        })
        onSuccess?.()
      }
    }, 3000)
  }

  if (submitted) {
    return (
      <div className='rounded-lg border border-green-200 bg-green-50 p-6 text-center'>
        <div className='mb-2 text-2xl'>&#10003;</div>
        <h3 className='text-lg font-semibold text-green-800'>Thank you!</h3>
        <p className='mt-1 text-sm text-green-700'>We&apos;ve received your submission and will be in touch shortly.</p>
      </div>
    )
  }

  return (
    <>
      <iframe ref={iframeRef} name='sf_submit_frame' title='Form submission' className='hidden' aria-hidden='true' />
      <form
        ref={formRef}
        action={SF_ENDPOINT}
        method='POST'
        target='sf_submit_frame'
        onSubmit={handleSubmit}
        className={`space-y-4 ${className}`}
      >
        <input type='hidden' name='oid' value={SF_ORG_ID} />
        <input type='hidden' name='lead_source' value={leadSource} />
        <input type='hidden' name='00NOl000003kEmD' value={leadSourceDetail} />
        <input type='hidden' name='retURL' value={typeof window !== 'undefined' ? window.location.href : ''} />

        {children}

        {error && (
          <p className='text-sm text-red-600' role='alert'>
            {error}
          </p>
        )}

        <button
          type='submit'
          disabled={submitting}
          className='w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark disabled:opacity-50'
        >
          {submitting ? 'Submitting...' : submitLabel}
        </button>
      </form>
    </>
  )
}

export function FormField({
  label,
  name,
  type = 'text',
  required = false,
  placeholder = '',
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={name} className='mb-1 block text-sm font-medium text-gray-700'>
        {label}
        {required && <span className='text-red-500'> *</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          required={required}
          placeholder={placeholder}
          rows={4}
          className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none'
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none'
        />
      )}
    </div>
  )
}
