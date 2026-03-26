import type { Metadata } from 'next'
import Link from 'next/link'
import { PageTransition } from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Terms of Use | OpsChain',
  description: 'Terms of use for the OpsChain website operated by LimePoint Pty Ltd.',
}

export default function TermsOfUsePage() {
  return (
    <PageTransition>
      <div className='mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold font-heading text-gray-900'>Terms of Use</h1>

        <div className='mt-8 prose prose-gray max-w-none'>
          <p>
            This web site is owned and operated by LimePoint Pty Ltd and will be referred to as &quot;We&quot;,
            &quot;our&quot; and &quot;us&quot; in this Terms of Use policy. By using this site, you agree to the Terms
            of Use Policy of this web site (&quot;the web site&quot;), which is set out on this web site page.
          </p>

          <h2>Using Our Web Site</h2>
          <p>
            When using this web site you agree to be legally bound by these terms and conditions as they may be modified
            and posted to our web site from time to time.
          </p>
          <p>
            Without prejudice to the above, by using or accessing our website, you agree to be legally bound by these
            terms and conditions of use as they apply to your use of or access to our website.
          </p>
          <p>If you do not wish to be bound by these terms and conditions then you may not use our website.</p>
          <p>
            You must ensure that the personal information you provide is accurate and complete and that all ordering or
            registration details (where applicable) contain your correct name, address and other requested details. For
            more information about how we deal with your personal information, please read our privacy policy on this
            website.
          </p>

          <h2>Applicability of Online Materials</h2>
          <p>
            Unless otherwise specified the materials published on our web site are presented solely for your private,
            personal and non-commercial use.
          </p>
          <p>
            We have used our reasonable endeavours to ensure that our web site complies with Australian law. However, we
            make no representations that the materials on our web site are appropriate or available for use in locations
            outside of Australia.
          </p>
          <p>
            We make no warranties, express or implied that making the Products available in any particular jurisdiction
            outside of Australia is permitted under any applicable non-Australian laws or regulations. Accordingly, if
            making the Products or any part thereof available in your jurisdiction or to you (by reason of nationality,
            residence or otherwise) is prohibited, those Products are not offered for sale to you. You accept that if
            you are resident outside of Australia, you must satisfy yourself that you are lawfully able to purchase the
            Products. We accept no liability, to the extent permitted by applicable law, for any costs, losses or
            damages resulting from or related to the purchase or attempted purchase of the Products by persons in
            jurisdictions outside of Australia or who are nominees of or trustees for citizens, residents or nationals
            of other countries.
          </p>

          <h2>Copyright & Monitoring</h2>
          <p>
            The contents of our web site are protected by international copyright laws and other intellectual property
            rights. We, or other third party licensors, are the owner of these rights. All product and company names and
            logos mentioned in our web site are the trademarks, service marks or trading names of their respective
            owners, including us. You may download material from our web site for the sole purpose of using it as a
            information resource for our services. However, you may not modify, copy, reproduce, republish, upload,
            post, transmit or distribute, by any means or in any manner, any material or information on or downloaded
            from our web site including, but not limited to text, graphics, video, messages, code and/or software
            without our prior written consent, except where expressly invited to do so, for example in order to complete
            any test or questionnaire.
          </p>

          <h2>Linked Sites</h2>
          <p>
            We make no representations whatsoever about any other web sites which you may access through our web site or
            which may link to our web site. When you access any other web site you understand that it is independent
            from us and that we have no control over the content or availability of that web site. In addition, a link
            to any other site does not mean that we endorse or accept any responsibility for the content, or the use of,
            such a web site and shall not be liable for any loss or damage caused or alleged to be caused by or in
            connection with use of or reliance on any content, goods or services available on or through any other web
            or resource. Any concerns regarding any external link should be directed to its web site administrator or
            web master.
          </p>

          <h2>Availability of Our Web Site</h2>
          <p>
            We will try to make our web site available but cannot guarantee that our web site will operate continuously
            or without interruptions or be error free and can accept no liability for its unavailability. You must not
            attempt to interfere with the proper working of our web site and, in particular, you must not attempt to
            circumvent security, tamper with, hack into, or otherwise disrupt any computer system, server, web site,
            router or any other internet connected device.
          </p>

          <h2>Privacy</h2>
          <p>
            We reserve the right to alter, suspend or discontinue any aspect of our website or the content or services
            available through it, including your access to it. Unless explicitly stated, any new features including new
            content and/or the sale of new products and/or the release of new software tools or resources shall be
            subject to these terms and conditions.
          </p>
          <p>
            We are committed to safeguarding the privacy of our users. We take your privacy very seriously and it is
            important to us that you can use and enjoy our website without having to compromise your privacy in any way.
          </p>
          <p>
            For more information, please see our{' '}
            <Link href='/privacy/' className='text-primary hover:underline'>
              privacy policy
            </Link>
            .
          </p>
        </div>
      </div>
    </PageTransition>
  )
}
