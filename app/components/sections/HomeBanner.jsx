'use client'

import React, { useRef } from 'react'
import { useUIStore } from "../../store"
import { useScroll, useTransform, motion } from 'framer-motion'
import Image from 'next/image'
import { shallow } from 'zustand/shallow'

const words = [
  { word: 'Moving', style: 'h-lg p-2 pl-0', spanStyle: '' },
  { word: 'Business', style: 'h-lg p-2 pr-0', spanStyle: '' },
  { word: '', style: 'h-full', spanStyle: '', src: 'https://res.cloudinary.com/dl4wyqxbe/video/upload/v1762651643/truck-between-shipping-containers_qyaoyy.mp4', video: true },
  { word: 'BEYOND', style: 'h-xlg font-bold p-3 pl-0', spanStyle: '' },
  { word: 'BORDERS', style: 'h-xlg font-bold p-3 pl-0 pr-0', spanStyle: 'mt-[-1vw]' },
]

function HomeBanner() {
  const MotionImage = motion.create(Image)
  const targetRef = useRef(null)
  const height = useUIStore((state) => state.height, shallow)

  const { scrollY } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start']
  })

  const from = 0
  const to = height * 0.8
  const translateY = useTransform(scrollY, [from, to], ['0px', '-60vh'])
  const translateY2 = useTransform(scrollY, [from, to], ['0px', '-30vh'])

  const opacity = useTransform(scrollY, [from, to], [1, 0])

  return (
    <motion.section
      ref={targetRef}
      id="home_banner"
      className="h-dvh sticky top-0 overflow-hidden"
      initial={{ background: 'linear-gradient(110deg, #000 0%, #000 100%)'}}
      animate={{ background: 'linear-gradient(110deg, #000 7.63%, #2665E4 83.83%)'}}
      transition={{
        duration: 1,
        ease: 'easeInOut',
        delay: 1,
      }}
    >
      <MotionImage
        id="hero_image"
        style={{ translateY: translateY2, opacity, objectFit: "cover" }}
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
        style={{ translateY, opacity }}
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

        <div className="absolute bottom-6 md:bottom-10 overflow-hidden">
          <motion.div
            style={{ opacity }}
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
            className="text-white text-[14px] max-w-90 inline-flex gap-1.5"
          >
            <span className="block bg-white h-2 w-2 mt-1.5 shrink-0" />
            <p>
              We provide logistics solutions tailor-made for individual clients
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default HomeBanner
