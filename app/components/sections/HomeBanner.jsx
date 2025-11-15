'use client'

import React, { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import Image from 'next/image'

const words = [
  { word: 'Moving', style: 'h-lg p-2 pl-0', spanStyle: '' },
  { word: 'Business', style: 'h-lg p-2 pr-0', spanStyle: '' },
  { word: '', style: 'h-full', spanStyle: '', src: 'https://res.cloudinary.com/dl4wyqxbe/video/upload/v1762651643/truck-between-shipping-containers_qyaoyy.mp4', video: true },
  { word: 'BEYOND', style: 'h-xlg font-bold p-3 pl-0', spanStyle: '' },
  { word: 'BORDERS', style: 'h-xlg font-bold p-3 pl-0 pr-0', spanStyle: 'mt-[-1vw]' },
]

const colors = [
  "#2563EB", // blue,
  "#4F46E5", // indigo
  "#7C3AED", // violet
  "#9333EA", // purple
  "#DB2777", // pink
  "#DC2626", // red
  "#EA580C", // orange
  "#16A34A", // green
  "#0D9488", // teal

];

function HomeBanner() {
  const MotionImage = motion.create(Image)
  const targetRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start']
  })

  const translateY = useTransform(scrollYProgress, [0, 1], ['0px', '20vh'])
  const translateY2 = useTransform(scrollYProgress, [0, 1], ['0px', '40vh'])

  return (
    <motion.section
      ref={targetRef}
      id="home"
      className="h-dvh relative overflow-hidden"
      initial={{ "--end": "#000000" }}                // ⬅️ start BLACK
      animate={{ "--end": ["#000000", ...colors] }}   // fade black → blue → cycle
      transition={{
        duration: 16,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
        delay: 1,
      }}
      style={{
        background: "linear-gradient(110deg, #000 7.63%, var(--end) 83.83%)",
      }}
    >
      {/* initial={{ background: 'linear-gradient(110deg, #000 0%, #000 100%)'}}
      animate={{ background: 'linear-gradient(110deg, #000 7.63%, #2665E4 83.83%)'}}
      transition={{ duration: 1, ease: 'easeInOut', delay: 1, }} */}
      <MotionImage
        id="hero_image"
        style={{ translateY: translateY2, objectFit: "cover" }}
        src={'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1763145907/hero-image_nvqf8w.png'}
        alt="Hero background"
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        initial={{ x: '10vw', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1.8,
          ease: [0.7, 0.11, 0.2, 1],
        }}
      />
      

      <motion.div
        style={{ translateY }}
        className="relative h-full container flex flex-col md:flex-row gap-5 pb-30 md:pb-0 pl-8 pr-8 md:pl-[60px] lg:pl-[130px]"
      >
        <div className="text-white h-full flex items-center shrink-0">
          <h1 className="leading-none tracking-tighter max-w-[38%] min-w-[350px]">
            {words.map((data, index) => (
              <span
                key={`${data.word}-${index}`}
                className={`${data.spanStyle} align-middle overflow-hidden inline-block`}
              >
                <motion.div
                  className={`${!data.video ? 'inline-block' : ''} ${data.style}`}
                  initial={{ y: 300 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.3,
                    delay: index * 0.1,
                    ease: 'easeOut',
                    type: 'spring',
                    stiffness: 200,
                    damping: 50,
                  }}
                >
                  {!data.video ? (
                    data.word
                  ) : (
                    <span className="heroVideoWrapper rounded-full p-4 pl-0 inline-block w-27 h-25 md:h-30 md:w-35">
                      <video
                        src={data.src}
                        preload="auto"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    </span>
                  )}
                </motion.div>
              </span>
            ))}
          </h1>
        </div>

        <motion.div
          initial={{ y: 300 }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.3,
              delay: words.length * 0.1,
              ease: 'easeOut',
              type: 'spring',
              stiffness: 200,
              damping: 50,
            }}
          className="absolute bottom-6 md:bottom-10 overflow-hidden flex flex-col-reverse md:flex-row gap-6 justify-between lg:w-[50%]">
          <div className="text-white text-[0.88rem] max-w-90 inline-flex gap-1.5">
            <span className="block bg-white h-2 w-2 mt-1.5 shrink-0" />
            <p>
              We provide logistics solutions tailor-made for individual clients
            </p>
          </div>
          <ul className='flex gap-2'>
            <li><a href="" className='text-[0.88rem] text-white whitespace-nowrap bg-black/32 px-1 py-0.5 hover:bg-white hover:text-black transition-all duration-300'>[Logistics Services]</a></li>
            <li><a href="" className='text-[0.88rem] text-white whitespace-nowrap bg-black/32 px-1 py-0.5 hover:bg-white hover:text-black transition-all duration-300'>[Air Charter]</a></li>
          </ul>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default HomeBanner


