
'use client'

import StaggeredText from '../../components/StaggeredText'
import { motion } from 'framer-motion'

const words = [
  { word: 'Terms', style: '' },
  { word: 'of', style: 'px-2.5 lg:px-5' },
  { word: 'Service', style: ''},
]

function Terms() {
  return (
    <section className="bg-gray-200 flex justify-center min-h-screen">
      <div className="max-w-[800px] pt-[calc(20vw+90px)] pb-20 md:pt-[calc(90px+10vw)] w-full px-6">
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
            delay: (words.length-1) * 0.4,
            ease: 'easeOut',
            type: 'spring',
            stiffness: 200,
            damping: 50,
          }}
          className="pt-20 sm:pt-[calc(4vw+40px)] ">
          <h2 className="mb-6"><span className="text-[1.13rem] font-semibold">Last updated:</span><span> November 17, 2025</span></h2>
          <p className="mb-10">
            Welcome to Diplomatic Freight and Logistics Services Limited, your trusted partner in logistics, cargo handling, and freight-forwarding services. By accessing or using our website, booking a shipment, or engaging any of our services, you agree to the following Terms & Conditions.
          </p>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">1. Services Provided</h2>
            <p>
              We offer logistics and transportation services including:
            </p>
            <ul className="my-4 pl-4">
              <li className="list-disc mb-2">Freight forwarding (air, sea, and land)</li>
              <li className="list-disc mb-2">Customs clearance and documentation</li>
              <li className="list-disc mb-2">Warehousing, packaging, and cargo handling</li>
              <li className="list-disc">Delivery and distribution</li>
            </ul>
            <p>
              All services are subject to availability, applicable regulations, and operational requirements.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">2. User Responsibilities</h2>
            <p>
              By using our services, you agree to provide:
            </p>
            <ul className="my-4 pl-4">
              <li className="list-disc mb-2">Accurate shipment information</li>
              <li className="list-disc mb-2">Correct documentation for customs or regulatory processes</li>
              <li className="list-disc">Goods that meet safety, packaging, and legal requirements</li>
            </ul>
            <p>
              We reserve the right to refuse or halt shipments that violate laws, pose safety risks, or contain prohibited items.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">3. Shipping & Transit</h2>
            <p>
              Transit times provided are estimates and may vary due to:
            </p>
            <ul className="my-4 pl-4">
              <li className="list-disc mb-2">Customs delays</li>
              <li className="list-disc mb-2">Weather conditions</li>
              <li className="list-disc mb-2">Carrier availability</li>
              <li className="list-disc">Operational or security checks</li>
            </ul>
            <p>
              We are not liable for delays outside our control, but we work diligently to resolve them.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">4. Rates & Payments</h2>
            <ul className="my-4 pl-4">
              <li className="list-disc mb-2">All fees are based on weight, dimensions, destination, and service type.</li>
              <li className="list-disc mb-2">Additional charges may apply for storage, customs penalties, demurrage, or misdeclared goods.</li>
              <li className="list-disc">Payments are due before shipment unless otherwise agreed.</li>
            </ul>
            <p>
              Unpaid shipments may be withheld until full payment is received.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">5. Liability</h2>
            <p>
              We take every measure to protect your shipment, but liability is limited to:
            </p>
            <ul className="my-4 pl-4">
              <li className="list-disc mb-2">Damage caused by proven negligence</li>
              <li className="list-disc">Loss directly under our custody (excluding external carriers)</li>
            </ul>
            <p>
              We are not responsible for:
            </p>
            <ul className="my-4 pl-4">
              <li className="list-disc mb-2">Delays caused by customs or third-party carriers</li>
              <li className="list-disc mb-2">Damage due to improper packaging by the customer</li>
              <li className="list-disc">Concealed damage or natural wear</li>
            </ul>
            <p>
              Insurance is available upon request.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">6. Prohibited Items</h2>
            <p>
              We do not handle:
            </p>
            <ul className="my-4 pl-4">
              <li className="list-disc mb-2">Illegal goods</li>
              <li className="list-disc mb-2">Hazardous materials without proper declaration</li>
              <li className="list-disc">Currency, precious stones, or restricted items unless approved</li>
            </ul>
            <p>
              Shipping prohibited goods may lead to legal actions.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">7. Intellectual Property</h2>
            <p>
              All website content—including text, graphics, logos, images—is the property of [Your Company Name] and may not be reproduced without permission.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">8. Amendments</h2>
            <p>
              We may update these Terms at any time. Continued use of our website or services indicates acceptance of revised terms.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">9. Contact</h2>
            <p className="mb-4 ">
              For any concerns or clarifications, please reach us through:
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

export default Terms