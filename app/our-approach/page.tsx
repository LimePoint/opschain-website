import type { Metadata } from 'next'
import Link from 'next/link'
import { CTAButton } from '@/components/analytics/CTAButton'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Our Approach',
  description:
    'Modern enterprises need operations that are intelligent, autonomous, and governed, all in one platform. Discover why OpsChain is the answer.',
}

export default function OurApproachPage() {
  return (
    <PageTransition>
      <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8'>
        {/*<h1 className='text-4xl font-bold font-heading text-gray-900'>Our Approach</h1>*/}
        <p className='mt-4 text-lg text-gray-600'>
          Modern enterprises need operations that are intelligent, autonomous, and governed, all in one platform.
        </p>

        <section className='mt-12'>
          <h2 className='text-2xl font-semibold font-heading text-gray-900'>The Problem We Solve</h2>
          <p className='mt-4 text-gray-700'>
            Enterprise operations are more complex than ever: hybrid environments, legacy systems, global teams, and
            endless manual tasks. Even the best-run organisations struggle with:
          </p>
          <ul className='mt-4 space-y-2 text-gray-700'>
            {[
              'Rising operational costs and vendor overhead',
              'Human error, fatigue, and inconsistency',
              'Limited 24x7 coverage',
              'Compliance and audit fatigue',
              'Difficulty scaling with scarce talent',
            ].map((item) => (
              <li key={item} className='flex items-start gap-3'>
                <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400' />
                {item}
              </li>
            ))}
          </ul>
          <p className='mt-6 text-gray-700'>
            <strong>Traditional automation tools</strong> can improve speed, but not trust. They lack governance,
            visibility, and continuous performance.
          </p>
          <blockquote className='mt-6 border-l-4 border-primary pl-4 italic text-gray-700'>
            OpsChain doesn&apos;t just automate operations, it governs them. Where intelligence meets control.
          </blockquote>
        </section>

        <section className='mt-12'>
          <h2 className='text-2xl font-semibold font-heading text-gray-900'>Our Vision</h2>
          <p className='mt-4 text-gray-700'>
            To empower every enterprise to run operations that are autonomous, intelligent, and compliant by design.
          </p>
        </section>

        <section className='mt-12'>
          <h2 className='text-2xl font-semibold font-heading text-gray-900'>Our Technology Philosophy</h2>
          <div className='mt-6 space-y-4'>
            <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
              <h3 className='font-semibold text-gray-900'>Governance first</h3>
              <p className='mt-1 text-sm text-gray-600'>
                Trust and transparency aren&apos;t optional. They&apos;re foundational.
              </p>
            </div>
            <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
              <h3 className='font-semibold text-gray-900'>Human + AI collaboration</h3>
              <p className='mt-1 text-sm text-gray-600'>People set direction; AI executes with precision.</p>
            </div>
            <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
              <h3 className='font-semibold text-gray-900'>Continuous improvement</h3>
              <p className='mt-1 text-sm text-gray-600'>Every action makes the next smarter, faster, and safer.</p>
            </div>
          </div>
        </section>

        <section className='mt-12'>
          <h2 className='text-2xl font-semibold font-heading text-gray-900'>What Makes OpsChain Unique</h2>
          <p className='mt-4 text-gray-700'>
            The only platform combining governance, automation, and AI into a single enterprise operations stack.
          </p>
          <ul className='mt-6 space-y-3'>
            {[
              {
                text: 'Always-on Autonomous Agents: digital teammates that work 24x7 with full compliance and traceability.',
                href: '/features/autonomous-agents/',
              },
              {
                text: 'Governed Intelligence: the governance and control engine ensuring every action is compliant, logged, and auditable.',
                href: '/features/governed-intelligence/',
              },
              {
                text: "Security, Auditability & Compliance: built for the world's most regulated industries.",
                href: '/features/security-compliance/',
              },
            ].map((item) => (
              <li key={item.href} className='flex items-start gap-3 text-gray-700'>
                <span className='mt-0.5 text-primary font-bold'>&#10003;</span>
                <span>
                  <Link href={item.href} className='text-primary hover:underline font-medium'>
                    {item.text.split(': ')[0]}
                  </Link>
                  {': '}
                  {item.text.split(': ')[1]}
                </span>
              </li>
            ))}
          </ul>
          <p className='mt-8 text-center text-lg font-semibold italic text-gray-900'>
            Intelligent. Autonomous. Governed.
          </p>
        </section>

        <section className='mt-12 text-center'>
          <CTAButton href='/book-demo/' label='Book Your Demo Today' />
          <p className='mt-4 text-sm text-gray-500'>
            See why teams choose OpsChain. Start transforming your operations.
          </p>
        </section>
      </div>
    </PageTransition>
  )
}
