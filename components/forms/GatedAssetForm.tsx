'use client'

import { useState } from 'react'
import { SalesforceForm, FormField } from './SalesforceForm'
import { useGTM } from '@/components/analytics/useGTM'

interface GatedAssetFormProps {
  assetName: string
  downloadUrl?: string
  available?: boolean
}

export function GatedAssetForm({ assetName, downloadUrl, available = false }: GatedAssetFormProps) {
  const [unlocked, setUnlocked] = useState(false)
  const { push } = useGTM()

  function handleSuccess() {
    setUnlocked(true)
    push('asset_download_unlock', {
      asset_name: assetName,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    })
  }

  if (unlocked) {
    if (!available || !downloadUrl) {
      return (
        <div className='rounded-lg border border-blue-200 bg-blue-50 p-6 text-center'>
          <div className='mb-2 text-2xl'>&#128233;</div>
          <h3 className='text-lg font-semibold text-blue-800'>Thank you!</h3>
          <p className='mt-1 text-sm text-blue-700'>
            You&apos;ll be notified when this resource is available for download.
          </p>
        </div>
      )
    }

    return (
      <div className='rounded-lg border border-green-200 bg-green-50 p-6 text-center'>
        <div className='mb-2 text-2xl'>&#128196;</div>
        <h3 className='text-lg font-semibold text-green-800'>Your download is ready</h3>
        <a
          href={downloadUrl}
          download
          className='mt-3 inline-flex items-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors'
          onClick={() =>
            push('asset_download', {
              asset_name: assetName,
              page_path: typeof window !== 'undefined' ? window.location.pathname : '',
            })
          }
        >
          Download {assetName}
        </a>
      </div>
    )
  }

  return (
    <div className='rounded-lg border border-gray-200 bg-gray-50 p-6'>
      <h3 className='mb-4 text-lg font-semibold text-gray-900'>Download {assetName}</h3>
      <p className='mb-4 text-sm text-gray-600'>Fill in the form below to access this resource.</p>
      <SalesforceForm
        formName={`Datasheet - ${assetName}`}
        leadSource='Website - Datasheet'
        leadSourceDetail={assetName}
        onSuccess={handleSuccess}
        submitLabel='Access Resource'
      >
        <div className='grid gap-4 sm:grid-cols-2'>
          <FormField label='First Name' name='first_name' required placeholder='Tony' />
          <FormField label='Last Name' name='last_name' required placeholder='Stark' />
        </div>
        <FormField label='Work Email' name='email' type='email' required placeholder='tony@starkindustries.com' />
        <FormField label='Company' name='company' required placeholder='Stark Industries' />
        <FormField label='Job Title' name='title' placeholder='CEO' />
        <input type='hidden' name='00NOl000003maDx' value={assetName} />
        <input type='hidden' name='00NOl000003maHB' value={downloadUrl || ''} />
      </SalesforceForm>
    </div>
  )
}
