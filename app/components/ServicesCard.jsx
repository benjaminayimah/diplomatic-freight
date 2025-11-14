'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { useScroll, useTransform, motion } from 'framer-motion'


function ServicesCard({ service, index }) {

  const MotionImage = motion.create(Image)
  
  const targetRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start']
  })

  const translateY = useTransform(scrollYProgress, [0, 1], ['-60px', '50px']);

  return (
    <div ref={targetRef} className="group relative aspect-3/4 rounded-3xl w-full overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/40 to-black/90 transition-opacity duration-700 group-hover:opacity-90 z-5" />
        <div className="absolute flex flex-col justify-between p-6 inset-0 z-5">
          <div className="text-white text-2xl h-12 w-12 grid place-items-center rounded-full bg-white/10">
            0{index + 1}
          </div>
          <div className='overflow-hidden'>
            <h4 className="text-white text-2xl font-semibold">{service.name}</h4>
            <p className="text-white/80 mb-3 line-clamp-2">{service.description}</p>
            <button className="text-[0.9rem] font-medium flex items-center h-9 px-4 bg-white rounded-3xl md:mb-[-40] group-hover:mb-0 transition-margin duration-300 ease-out ">
              Contact us
            </button>
          </div>
        </div>
        <MotionImage
          style={{translateY}}
          src={service.src}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-700 ease-out scale-105 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
    </div>
  )
}

export default ServicesCard