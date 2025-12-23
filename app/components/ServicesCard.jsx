'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { useScroll, useTransform, motion } from 'framer-motion'


function ServicesCard({ service, onClick, isOpen, id }) {

  const MotionImage = motion.create(Image)
  
  const targetRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start']
  })

  const translateY = useTransform(scrollYProgress, [0, 1], ['-40px', '50px']);

  return (
    <div ref={targetRef} className='w-full md:w-[382px] shrink-0'>
      <div onClick={onClick} className="group relative aspect-3/4 rounded-3xl w-full overflow-hidden hover:scale-97 transition-transform duration-700 ease-out cursor-pointer">
      {/* <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/40 to-black/90 transition-opacity duration-700 group-hover:opacity-90 z-5" /> */}
        <div className="absolute flex flex-col justify-end p-4 inset-0 z-5">
          <div className='flex justify-end'>
            <button onClick={onClick} className={`h-10 w-10 rounded-3xl grid place-items-center bg-black/70 hover:bg-black/90 transition-all duration-400 ${isOpen && id === service.id ? 'rotate-45' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M6.679,14.68V9.322H1.322a1.322,1.322,0,1,1,0-2.644H6.679V1.322a1.321,1.321,0,1,1,2.642,0V6.679h5.357a1.322,1.322,0,1,1,0,2.644H9.321v5.357a1.321,1.321,0,0,1-2.642,0Z" fill="#fff"/>
              </svg>
            </button>
          </div>
        </div>
        <MotionImage
          style={{translateY}}
          src={service.src}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-700 ease-out scale-105 group-hover:scale-120"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className='py-5'>
        <h4 className="text-black text-2xl font-semibold">{service.name}</h4>
        <p className="text-gray-500 mb-3 line-clamp-2">
          {service.description}
          <span className='list-disc'>{service.bullet1 ?? ''}</span>
          <span className='list-decimal'>{service.bullet2 ?? ''}</span>
          <span className='list-decimal'>{service.bullet3 ?? ''}</span>
          <span className='list-decimal'>{service.bullet4 ?? ''}</span>
          </p>
      </div>
        {/* <button onClick={() => redirect('/get-a-quote') } className="text-[0.9rem] font-medium flex items-center h-9 px-4 bg-white rounded-3xl translate-y-50 group-hover:translate-y-0 transition-all duration-400 ease-in-out">
          Get a Quote
        </button> */}
    </div>
  )
}

export default ServicesCard