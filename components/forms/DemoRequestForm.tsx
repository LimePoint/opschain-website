'use client'

import { SalesforceForm, FormField } from './SalesforceForm'

interface DemoRequestFormProps {
  leadSource?: string
}

export function DemoRequestForm({ leadSource = 'Website - Demo Request' }: DemoRequestFormProps) {
  return (
    <SalesforceForm formName='Demo Request' leadSource={leadSource} submitLabel='Request a Demo'>
      <div className='grid gap-4 sm:grid-cols-2'>
        <FormField label='First Name' name='first_name' required placeholder='Jane' />
        <FormField label='Last Name' name='last_name' required placeholder='Smith' />
      </div>
      <FormField label='Work Email' name='email' type='email' required placeholder='jane@company.com' />
      <FormField label='Company' name='company' required placeholder='Acme Corp' />
      <FormField label='Job Title' name='title' placeholder='VP Engineering' />
      <FormField label='Phone' name='phone' type='tel' placeholder='+1 (555) 000-0000' />
      <FormField
        label='Message'
        name='description'
        type='textarea'
        placeholder='Tell us about your operations challenges...'
      />
    </SalesforceForm>
  )
}
