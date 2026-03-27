'use client'

import { SalesforceForm, FormField } from './SalesforceForm'

interface WebinarRegistrationFormProps {
  webinarName: string
}

export function WebinarRegistrationForm({ webinarName }: WebinarRegistrationFormProps) {
  return (
    <div className='rounded-lg border border-gray-200 bg-gray-50 p-6'>
      <h3 className='mb-4 text-lg font-semibold text-gray-900'>Register for this Webinar</h3>
      <p className='mb-4 text-sm text-gray-600'>
        Fill in the form below to register. You&apos;ll receive joining details via email.
      </p>
      <SalesforceForm
        formName={`Webinar - ${webinarName}`}
        leadSource='Website - Webinar'
        leadSourceDetail={webinarName}
        submitLabel='Register Now'
      >
        <div className='grid gap-4 sm:grid-cols-2'>
          <FormField label='First Name' name='first_name' required placeholder='Tony' />
          <FormField label='Last Name' name='last_name' required placeholder='Stark' />
        </div>
        <FormField label='Work Email' name='email' type='email' required placeholder='tony@starkindustries.com' />
        <FormField label='Company' name='company' required placeholder='Stark Industries' />
        <FormField label='Job Title' name='title' placeholder='CEO' />
      </SalesforceForm>
    </div>
  )
}
