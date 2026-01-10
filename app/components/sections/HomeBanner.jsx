'use client'

import React, { useRef } from 'react'
import { useScroll, useTransform, useInView, motion } from 'framer-motion'
import Image from 'next/image'
import StaggeredText from '../StaggeredText'

const words = [
  { line: '1', word: 'Moving', style: 'text-[clamp(2rem,4vw,4rem)] p-2 pl-0', spanStyle: '' },
  { line: '1', word: 'Business', style: 'text-[clamp(2rem,4vw,4rem)] p-2 pr-0', spanStyle: '' },
  { line: '2', word: '', style: 'h-full', spanStyle: '', src: 'https://res.cloudinary.com/dl4wyqxbe/video/upload/v1763463538/5928077-sd_360_640_30fps_lgqrjh.mp4', video: true },
  { line: '2', word: 'BEYOND', style: 'text-[calc(clamp(2rem,5vw,4rem)*1.5)] font-bold p-3 pl-0', spanStyle: '' },
  { line: '3', word: 'BORDERS', style: 'text-[calc(clamp(2rem,5vw,4rem)*1.5)] font-bold p-3 pl-0 pr-0', spanStyle: '' },
]

const colors = [
  "#2563EB", // blue
  "#4663E5",// blue
  "#A379FF", // purple
  "#45CBF8", // light blue  
  "#0D9488", // teal
  "#516781", // steel blue
  "#B2D0E5", // pale blue
  "#FFAD89", // light orange
  "#FF7979", // light red
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

  const isInView = useInView(targetRef, {
    amount: 0,      // 0% visible to count as "in view"
    margin: "0px",
  });

  const gradientVariants = {
    animate: {
      "--end": ["#000000", ...colors],
      transition: {
        duration: 20,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
    paused: {
      // When paused, keep the current color (Framer Motion handles freezing)
      transition: { duration: 0 },
    },
  };


  return (
    <motion.section
      ref={targetRef}
      id="home"
      className="h-svh sm:h-dvh relative overflow-hidden"
      initial={{ "--end": "#000000" }}
      animate={isInView ? "animate" : "paused"}
      variants={gradientVariants}
      style={{
        background: "linear-gradient(110deg, #000 7.63%, var(--end) 83.83%)",
      }}
    >
      <MotionImage
         id="hero_image"
          className="mt-[40%] md:mt-0 will-change-transform"
          style={{ translateY: translateY2, objectFit: "cover" }}
          src="https://res.cloudinary.com/dl4wyqxbe/image/upload/v1763470951/bg-cargo-plane_2_-min_ush5mi.png"
          alt="Hero background"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          initial={{ x: '10vw'}}
          animate={{ x: 0 }}
          transition={{
            duration: 20,
            ease: [0.1, 0.5, 0.7, 1],
          }}
      />

      <motion.div
        style={{ translateY }}
        className="relative h-full container flex flex-col md:flex-row gap-5 pb-30 md:pb-0 pl-8 pr-8 md:pl-[60px] lg:pl-[130px]"
      >
        <div className="text-white h-full flex items-center">
          <h1 className="leading-none tracking-tighter">
            {/* LINE 1 */}
            <span className="block whitespace-nowrap">
              {words.filter(w => w.line === '1').map((data, index) => (
                <StaggeredText data={data} index={index} key={index} />
              ))}
            </span>
            {/* LINE 2 */}
            <span className="block whitespace-nowrap">
              {words.filter(w => w.line === '2').map((data, index) => (
                <StaggeredText data={data} index={index} key={index} />
              ))}
            </span>
            {/* LINE 3 */}
            <span className="block whitespace-nowrap">
              {words.filter(w => w.line === '3').map((data, index) => (
                <StaggeredText data={data} index={index} key={index} />
              ))}
            </span>
          </h1>
        </div>

        <motion.div
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          transition={{
            duration: 1.3,
            delay: (words.length-1) * 0.1,
            ease: 'easeOut',
            type: 'spring',
            stiffness: 200,
            damping: 50,
          }}
          className="absolute bottom-6 md:bottom-10 overflow-hidden flex flex-col-reverse md:flex-row gap-6 justify-between lg:w-[50%]">
          <div className="text-white text-[0.88rem] max-w-120 inline-flex gap-1.5">
            <span className="block bg-[#FF6A3D] h-2 w-2 mt-1.5 shrink-0" />
            <p>
              Our mission is to provide efficient, secure, and customized air cargo solutions with uncompromising professionalism, trust, and reliability.
            </p>
          </div>
          <div>
            <ul className='flex gap-2'>
            <li className='myHover-translate group'><a href="#" className='text-[0.88rem] text-white whitespace-nowrap bg-black/32 px-1 py-0.5 group-hover:bg-white group-hover:text-black transition-colors duration-300'>[Aircraft Charter]</a></li>
            <li className='myHover-translate group'><a href="#" className='text-[0.88rem] text-white whitespace-nowrap bg-black/32 px-1 py-0.5 group-hover:bg-white group-hover:text-black transition-colors duration-300'>[Logistics Services]</a></li>
          </ul>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default HomeBanner