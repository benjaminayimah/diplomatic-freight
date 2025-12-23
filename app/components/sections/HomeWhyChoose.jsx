'use client'

import React from 'react'
import WhyChooseCard from '../WhyChooseCard'
import { motion } from 'framer-motion'

const why_choose_card = [
  {id: 1, title: 'Global Reach', description: 'Through our global network of operators, partners, and airline contacts, we deliver cargo to any major destination worldwide.' },
  {id: 2, title: 'Operational Precision', description: 'Every movement is managed by professionals with deep knowledge of air cargo, compliance, and international logistics.' },
  {id: 3, title: 'Confidential & Secure', description: 'We protect client information, cargo details, and routing data with strict confidentiality measures.' },
  {id: 4, title: '24/7 Support', description: 'A dedicated team monitors and manages your shipment from departure to arrival, offering real-time updates.' },
]

function HomeWhyChoose() {
  return (
    <section id='why_choose_us' className='bg-[#ecf2ff] py-20 md:py-30'>
      <motion.div
        initial={{ opacity: 0, y: '50px'}}
        whileInView={{ opacity: 1, y: '0px', transition: {duration: 1}}}
        viewport={{
          once: true,
          amount: 0.3
        }}
        className='container w-[92vw] sm:w-[88vw]'>
        <div className='grid gap-6 mb-10 md:mb-20'>
          <div>
            <h2 className='text-4xl md:text-5xl font-semibold'>
              Why choose us
            </h2>
          </div>
          <div className='lg:w-[40%] text-xl'>
            We deliver safe and smart - so your shipment always arrives, on time and in great condition
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          { why_choose_card.map((data) => (
            <WhyChooseCard key={data.id} data={data} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default HomeWhyChoose