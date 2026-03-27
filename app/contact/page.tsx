import type { Metadata } from 'next'
import { ContactForm } from '@/components/forms/ContactForm'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Contact Us | OpsChain',
  description:
    'Get in touch with the OpsChain team. Tell us about your operational challenges and discover how governed, intelligent automation can help.',
}

export default function ContactPage() {
  return (
    <PageTransition>
      <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold font-heading text-gray-900'>Contact Us</h1>
          <p className='mt-4 text-lg text-gray-600'>
            Have a question or want to learn more? Send us a message and we&apos;ll get back to you.
          </p>
        </div>

        <section className='mt-12 rounded-xl border border-gray-200 bg-gray-50 p-8'>
          <h2 className='text-2xl font-semibold font-heading text-gray-900 text-center mb-6'>Send Us a Message</h2>
          <ContactForm />
        </section>
      </div>
    </PageTransition>
  )
}
