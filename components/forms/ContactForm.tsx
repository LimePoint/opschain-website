'use client'

import { SalesforceForm, FormField } from './SalesforceForm'

export function ContactForm() {
  return (
    <SalesforceForm formName='Contact Form' leadSource='Website - Contact' submitLabel='Send Message'>
      <div className='grid gap-4 sm:grid-cols-2'>
        <FormField label='First Name' name='first_name' required placeholder='Tony' />
        <FormField label='Last Name' name='last_name' required placeholder='Stark' />
      </div>
      <FormField label='Work Email' name='email' type='email' required placeholder='tony@starkindustries.com' />
      <FormField label='Company' name='company' required placeholder='Stark Industries' />
      <FormField label='Job Title' name='title' placeholder='CEO' />
      <FormField label='Message' name='description' type='textarea' placeholder='Tell us how we can help...' />
    </SalesforceForm>
  )
}
