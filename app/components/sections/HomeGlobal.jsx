'use client'

import React, { useRef } from 'react'
import StatItem from '../StatItem'
import Image from 'next/image'
import { useUIStore } from "../../../store"

import { useScroll, useTransform, motion } from 'framer-motion'



const stats = [
  { label: "Network Countries", value: "30+", description: "Serving clients across major global trade regions." },
  { label: "Tons Moved Annually", value: "1M+", description: "Reliable freight movement across air, sea and land." },
  { label: "Global Clients", value: "100+", description: "Trusted by businesses worldwide for efficient logistics." },
  { label: "Years of Experience", value: "10+", description: "A decade of proven logistics and shipping expertise." }
]

function HomeGlobal() {
  const MotionImage = motion.create(Image)
  
  const targetRef = useRef(null)

  const { device } = useUIStore()

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start']
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
    const translateY = useTransform(scrollYProgress, [0, 1], ['-10vh', '10vh'])
  

  return (
    <section ref={targetRef} className='bg-[#0A47C9] py-20 md:py-30 overflow-hidden'>
      <div className='container w-[92vw] sm:w-[88vw]'>
        <div className={`mb-15`}>
          <div className=''>
            <div className='md:max-w-[500px] max-w-[70%] mb-15'>
              <span className='pill-tag mb-4 text-white border border-white/30'>Global presence</span>
              <h2 className='text-3xl md:text-4xl font-bold text-white'>We have a strong presence in over 30 countries</h2>
            </div>
            <div className='relative h-[20vh] md:h-[50vh] w-full'>
              <MotionImage
                style={{translateY}} 
                src={'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1763145907/world_gvphbb.png'}
                alt='global coverage'
                className='object-contain'
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
              />
            </div>
          </div>
        </div>
        
        <div className='grid grid-cols-2 gap-10 lg:grid-cols-4 lg:px-[5%]'>
          {
            stats.map((data, index) => (
              <StatItem key={index} stat={data} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default HomeGlobal