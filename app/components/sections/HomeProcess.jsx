'use client'

import React from 'react'
import ProcessCard from '../ProcessCard'
import { motion } from 'framer-motion'


const process = [
  {id: 1, title: '01: Submit Your Request', description: 'Tell us your travel needs through our simple inquiry form. Our team is available 24/7 to assist you.' },
  {id: 2, title: '02: Receive a Custom Quote', description: 'We provide a transparent, all-inclusive quote tailored to your specific itenerary and preferences.' },
  {id: 3, title: '03: Confirm & Fly', description: 'Once confirmed, your dedicated concierge handles every detail, ensuring a flawless journey from start to finish.' },
]


function HomeProcess() {
  return (
    <section id='our-process' className='bg-white pt-20 md:pt-30'>
      <motion.div
        initial={{ opacity: 1, y: '50px'}}
        whileInView={{ y: '0px', transition: {duration: 1}}}
        viewport={{
            once: true,
            amount: 0.3
        }}
        className='container w-[92vw] sm:w-[88vw]'>
        <div className='grid gap-6 mb-10 md:mb-20'>
          <div>
            <h2 className='text-4xl md:text-5xl font-semibold'>
              Our process
            </h2>
          </div>
          <div className='lg:w-[36%] text-xl'>
            Every successful shipment begins with a streamlined process - and here's how we do it.
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-30'>
          {
            process.map((data) => (
              <ProcessCard key={data.id} data={data} />
            ))
          }
        </div>
      </motion.div>

    </section>
  )
}

export default HomeProcess