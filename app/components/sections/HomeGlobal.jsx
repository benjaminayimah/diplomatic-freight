'use client'

import React, { useRef } from 'react'
import StatItem from '../StatItem'
import Image from 'next/image'
import { useUIStore } from "../../store"

import { useScroll, useTransform, motion } from 'framer-motion'



const stats = [
  {label: 'Network Countries', value: '30+'},
  {label: 'Tons Moved Annually', value: '1M+'},
  {label: 'Global Clients', value: '100+'},
  {label: 'Years of Experience', value: '10+'}

]

function HomeGlobal() {
  const MotionImage = motion(Image)
  
  const targetRef = useRef(null)

  const { device } = useUIStore()

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section ref={targetRef} className='bg-[#0A47C9] relative py-15 md:py-30'>
      <div className='container w-[92vw] sm:w-[88vw]'>
        <div className={`mb-15 ${(device === 'desktop' || device === 'tablet') ? 'h-[200vh]' : ''}`}>
          <div className='sticky top-30'>
            <div className='md:max-w-[500px] max-w-[70%] mb-15'>
              <span className='pill-tag mb-4 text-white border border-white/30'>Global presence</span>
              <h2 className='text-3xl md:text-4xl font-bold text-white'>We have a strong presence in over 20 countries</h2>
            </div>
            <div className='relative h-[20vh] md:h-[50vh] w-full'>
              <MotionImage
                style={{scale: (device === 'desktop' || device === 'tablet') ? scale : 1}} 
                src={'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1763145907/world_gvphbb.png'}
                alt='global coverage'
                className='object-contain'
                fill
              />
            </div>
          </div>
        </div>
        
        <div className='flex justify-center gap-3 md:gap-[10%]'>
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