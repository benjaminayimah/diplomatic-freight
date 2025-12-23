'use client'

import React from 'react'
import StatItem from '../StatItem'
import StripeGlobe from '../../components/StripeGlobe'
import {  motion } from 'framer-motion'



const stats = [
  { label: "Network Countries", value: "82+", description: "Serving clients across major global trade regions." },
  { label: "Tons Moved Annually", value: "1M+", description: "Reliable freight movement across air, sea and land." },
  { label: "Global Clients", value: "100+", description: "Trusted by businesses worldwide for efficient logistics." },
  { label: "Years of Experience", value: "15+", description: "More than a decade of proven logistics and shipping expertise." }
]

function HomeGlobal() {
  
  

  return (
    <section className='bg-[#0A47C9] h-svh overflow-hidden relative'>
      <div className='container w-[92vw] sm:w-[88vw] flex flex-col h-full justify-between py-20'>
        <motion.div
          initial={{ opacity: 0, y: '50px'}}
          whileInView={{ opacity: 1, y: '0px', transition: {duration: 1}}}
          viewport={{
            once: true,
            amount: 0.3
          }}
          className='md:max-w-[500px] max-w-[70%] mb-15'>
          <span className='pill-tag mb-4 text-white border border-white/30'>Global presence</span>
          <h2 className='text-3xl md:text-4xl font-bold text-white'>We have a strong presence in over 82 countries</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: '50px'}}
          whileInView={{ opacity: 1, y: '0px', transition: {duration: 1}}}
          viewport={{
            once: true,
            amount: 0.3
          }}
          className='grid grid-cols-2 gap-10 lg:grid-cols-4 lg:px-[5%]'>
          {
            stats.map((data, index) => (
              <StatItem key={index} stat={data} />
            ))
          }
        </motion.div>
      </div>
      <div className='absolute inset-0 w-full h-full'>
        <StripeGlobe />
      </div>
    </section>
  )
}

export default HomeGlobal