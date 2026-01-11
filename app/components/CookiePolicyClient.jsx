
'use client'

import StaggeredText from './StaggeredText'
import { motion } from 'framer-motion'

const words = [
  { word: 'Cookie', style: 'pr-2.5 lg:pr-5' },
  { word: 'Policy', style: '' },
]

function CookiePolicyClient() {
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
          <p className="mb-10">
            Our website uses cookies to enhance your browsing experience and help us improve our logistics and freight-forwarding services.
          </p>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device to help websites remember information.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">2. Types of Cookies We Use</h2>
            <p>
              We use:
            </p>
            <ul className="my-4 pl-4">
              <li className="list-disc mb-2"><strong>Essential Cookies:</strong> Required for site functionality (forms, bookings, tracking pages).</li>
              <li className="list-disc mb-2"><strong>Analytics Cookies:</strong> Help us understand site usage to improve user experience.</li>
              <li className="list-disc mb-2"><strong>Preference Cookies:</strong> Store your language or region selections.</li>
              <li className="list-disc mb-2"><strong>Marketing Cookies:</strong> Used for personalized ads (if applicable).</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">3. Why We Use Cookies</h2>
            <p>
              We use cookies to:
            </p>
            <ul className="my-4 pl-4">
              <li className="list-disc mb-2">Improve website performance</li>
              <li className="list-disc mb-2">Analyze traffic</li>
              <li className="list-disc mb-2">Remember your preferences</li>
              <li className="list-disc">Track shipment-related interactions</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">4. Managing Cookies</h2>
            <p>
              You may disable cookies through your browser settings. However, some parts of the site may not function properly.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">5. Changes to This Policy</h2>
            <p>
              We may update our cookie policy to reflect technical or regulatory changes.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">9. Contact</h2>
            <p className="mb-4 ">
              For questions about cookies, please reach us through:
            </p>
            <div className="flex flex-col gap-1.5">
              <div className="flex gap-3">
                <div className="font-semibold">Email:</div>
                <a href="mailTo:info@diplomaticfreight.com" className="font-medium hover:underline">info@diplomaticfreight.com</a>
              </div>
              <div className="flex gap-3">
                <div className="font-semibold">Phone:</div>
                <a href="tel:+233302908064" className="font-medium hover:underline">+233(0) 30 290 8064/5</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CookiePolicyClient