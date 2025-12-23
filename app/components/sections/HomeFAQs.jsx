'use client'

import React from 'react'
import FaqList from '../FaqList'
import { motion } from 'framer-motion'

function FAQs() {

  const faqs = [
    {id: 1, title: 'What types of freight services do you offer?', body: 'We provide a full range of freight solutions, including air, ocean, and ground transport. From small parcels to oversized and high-value cargo, we offer specialized handling to ensure safe and efficient delivery.'},
    {id: 2, title: 'How do I get a quote for a private charter flight?', body: 'Request a quote directly on our website by selecting “Get a Quote” or “Contact Us” and our charter team will follow up within hours.'},
    {id: 3, title: 'Can you handle international customs clearance?', body: 'Yes. Our customs experts manage all paperwork, duties, and taxes to ensure your shipments clear customs smoothly and remain fully compliant with international regulations.'},
    {id: 4, title: 'What kind of aircraft are available for charter?', body: 'Our network includes a wide selection of aircraft — from light payload cargo for short range journeys,  to heavy payload cargo for long-range jouneys. We match you with the ideal aircraft based on your capacity, range, and comfort needs.'},
    {id: 5, title: 'How do you ensure the safety and security of my cargo and charter flights?', body: 'Safety is our top priority. We use secure handling protocols and advanced tracking for all freight. For charter flights, we work exclusively with operators who meet strict aviation standards. Every aircraft is maintained to the highest level of discretion and security.'},
  ]

  return (
    <section id='faqs' className='pt-20 md:pt-30 bg-white relative flex justify-center z-2'>
      <motion.div
        initial={{ opacity: 1, y: '50px'}}
          whileInView={{ y: '0px', transition: {duration: 1}}}
          viewport={{
              once: true,
              amount: 0.3
          }}
        className='container w-[92vw] sm:w-[88vw] flex justify-center'>
        <div className='max-w-4xl w-full'>
          <div className=' md:text-center mb-10 md:mb-18'>
            <span className='pill-tag text-black border border-black/10 mb-4'>FAQs</span>
            <h2 className='text-3xl md:text-4xl font-bold'>Frequently Asked Questions</h2>
          </div>
          <div className='space-y-6'>
            {
              faqs.map(faq => (
                <FaqList
                  key={faq.id}
                  data={faq} 
                />
              ))
            }
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default FAQs