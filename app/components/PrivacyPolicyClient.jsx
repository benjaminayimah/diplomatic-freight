
'use client'

import StaggeredText from './StaggeredText'
import { motion } from 'framer-motion'

const words = [
  { word: 'Privacy', style: 'pr-2.5 lg:pr-5' },
  { word: 'Policy', style: '' },
]

function PrivacyPolicyClient() {
  return (
    <section className="bg-gray-200 flex justify-center min-h-screen">
      <div className="max-w-200 pt-[calc(20vw+90px)] pb-20 md:pt-[calc(90px+10vw)] w-full px-6">
        <h1 className="text-[clamp(1.8rem,4vw,5rem)] font-extrabold text-center uppercase leading-none">
          <span className="block whitespace-nowrap">
            {words.map((data, index) => (
              <StaggeredText data={data} index={index} key={index} />
            ))}
          </span>
        </h1>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.3,
            delay: (words.length-1) * 0.6,
            ease: 'easeOut',
            type: 'spring',
            stiffness: 200,
            damping: 50,
          }}
          className="pt-20 sm:pt-[calc(4vw+40px)] ">
          <h2 className="mb-6"><span className="text-[1.13rem] font-semibold">Last updated:</span><span> November 17, 2025</span></h2>
          <p className="mb-6">
            At Diplomatic Freight and Logistics Services Limited, we value your privacy and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data when you use our website, https://www.diplomaticfreight.com/ (Website).
          </p>
          <p className="mb-10">
            This Privacy Policy applies to https://www.diplomaticfreight.com (hereinafter, "us", "we", or "www.diplomaticfreight.com/").
          </p>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">1. Information We Collect</h2>
            <p>
              We may collect:
            </p>
            <ul className="my-4 pl-4">
              <li className="list-disc mb-2">Full name, phone number, email address</li>
              <li className="list-disc mb-2">Delivery and pickup addresses</li>
              <li className="list-disc mb-2">Shipment details (package weight, content descriptions)</li>
              <li className="list-disc mb-2">Payment information</li>
              <li className="list-disc">Website usage data through <a href="/cookie-policy" className='underline'>cookies</a></li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">2. How We Use Your Information</h2>
            <p>
              We use your data to:
            </p>
            <ul className="my-4 pl-4">
              <li className="list-disc mb-2">Process and manage shipments</li>
              <li className="list-disc mb-2">Provide customer support</li>
              <li className="list-disc mb-2">Generate shipping documents and customs forms</li>
              <li className="list-disc mb-2">Improve our website and digital services</li>
              <li className="list-disc">Send notifications about your shipment status</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">3. Sharing Your Information</h2>
            <p>
              We may share data with:
            </p>
            <ul className="my-4 pl-4">
              <li className="list-disc mb-2">Customs authorities</li>
              <li className="list-disc mb-2">Third-party carriers and logistics partners</li>
              <li className="list-disc mb-2">Payment processors</li>
              <li className="list-disc mb-2">Insurance providers</li>
              <li className="list-disc">Regulatory agencies (when required by law)</li>
            </ul>
            <p>
              We do not sell your information.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">4. Data Security</h2>
            <p>
              We implement technical and administrative safeguards to protect your information from unauthorized access, alteration, or disclosure.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">5. Data Retention</h2>
            <p>
              We keep shipment and customer records only as long as necessary for:
            </p>
            <ul className="my-4 pl-4">
              <li className="list-disc mb-2">Legal compliance</li>
              <li className="list-disc mb-2">Operational purposes</li>
              <li className="list-disc">Financial and audit requirements</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">6. Your Rights</h2>
            <p>
              You may:
            </p>
            <ul className="my-4 pl-4">
              <li className="list-disc mb-2">Request access to your personal data</li>
              <li className="list-disc mb-2">Request corrections</li>
              <li className="list-disc mb-2">Request deletion where legally permissible</li>
              <li className="list-disc">Opt out of marketing communications</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">7. Third-Party Links</h2>
            <p>
              Our website may include links to partners or carriers. We are not responsible for their privacy practices.              </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">8. Contact</h2>
            <p className="mb-4 ">
              For privacy inquiries, please reach us through:
            </p>
            <div className="flex flex-col gap-1.5">
              <div className="flex gap-3">
                <div className="font-semibold">Email:</div>
                <a href="mailTo:info@diplomaticfreight.com" className="font-medium hover:underline">info@diplomaticfreight.com</a>
              </div>
              <div className="flex gap-3">
                <div className="font-semibold">Phone:</div>
                <a href="tel:+233(0) 30 290 8064/5" className="font-medium hover:underline">+233(0) 30 290 8064/5</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PrivacyPolicyClient