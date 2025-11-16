'use client'

import React, { useRef } from 'react'
import TextReveal from '../TextReveal'
import Image from 'next/image';
import WhyChooseCard from '../WhyChooseCard'
import { useScroll, useTransform, motion } from 'framer-motion'



const who_we_are = [
  "We", "guarantee", "fast", "reliable", "and", "affordable", "logistics",
  "solutions", "tailored", "to", "your", "needs.",
  <br key="br1" />,
  "Our", "experience", "ensures", "a", "smooth", "and", "quality", "shipping", "experience", "from",
  "start", "to", "finish."
];
const why_choose_us = [
  "We", "deliver", "safe", "and", "smart", "-", "so",
  "your", "shipment", "always", "arrives,", "on", "time.", "and", "in", "great", "condition"
];

const why_choose_card = [
  {title: 'Global Reach', description: 'Access to thousand of airports worldwide, getting your closer to your final destination.' },
  {title: '24/7 Concierge', description: 'Dedicated support for all your needs, from in-flight catering to ground transportation.' },
  {title: 'Unmatched Privacy', description: 'Travel with complete discretion and security through private terminals and aircraft.' },
  {title: 'Safety First', description: 'We adhere to the highest safety standards with rigorously maintained aircraft and experienced crews.' },
]


function HomeAbout() {
  // const MotionImage = motion.create(Image)

  const targetRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start']
  })

  const translateY = useTransform(scrollYProgress, [0, 0.4], ['0px', '-50vh']);
  const scale = useTransform(scrollYProgress, [0, 1], ['1', '0.8']);
  const opacity = useTransform(scrollYProgress, [0, 0.2], ['1', '0']);


  return (
    <section id='about' className='bg-white py-20 md:py-30'>
      <div className='container w-[92vw] sm:w-[88vw]'>
        <div className='grid md:grid-cols-2 gap-6 mb-20 md:mb-30'>
          <div>
            <h2 className='text-3xl md:text-4xl font-bold'>Who we are</h2>
          </div>
          <div className='lg:pl-36 text-[1.7rem]'>
            <TextReveal words={who_we_are} textOffset={'0.9'} />
          </div>
        </div>
        <div ref={targetRef} className='relative h-[200dvh]'>
          <div className='sticky top-[25dvh] md:top-10'>
            <motion.div style={{scale}} className='relative h-[50dvh] md:h-[calc(100dvh-80px)] w-full rounded-3xl overflow-hidden'>
              <div className='absolute inset-0 flex items-center justify-center z-2 bg-linear-to-b from-black/70 via-black/10 to-black/70'>
                <motion.div style={{opacity, translateY}} className='text-white'>
                  <h1 className='text-3xl lg:text-7xl text-center font-semibold'>Global Logistics, <br />Local Care</h1>
                </motion.div>
              </div>
              {/* <Image
                src={'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1763305284/essence-of-global-trade-throu_ekbfrs.jpg'}
                // style={{translateY}}
                alt="About us"
                fill
                className='object-cover'
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              /> */}
              <video
                src='https://res.cloudinary.com/dl4wyqxbe/video/upload/v1763325209/harbour-compresed-med_nswmcw.mp4'
                className="object-cover w-full h-full"
                preload="metadata"
                autoPlay
                loop
                muted
                playsInline
                />
            </motion.div>
          </div>
        </div>
        <div>
          <div className='grid gap-6 mb-10'>
            <div>
              <h2 className='text-3xl md:text-4xl font-bold'>
                Why choose us
              </h2>
            </div>
            <div className='lg:w-[45%] text-[1.7rem]'>
              <TextReveal words={why_choose_us} textOffset={'0.7'} />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            { why_choose_card.map((data, index) => (
              <WhyChooseCard key={index} data={data} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeAbout