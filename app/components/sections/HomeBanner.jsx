'use client'

import { useRef } from 'react'
import { useScroll, useTransform, useInView, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import StaggeredText from '../StaggeredText'
import useLazyImage from "@/hooks/useLazyImage.js"


const words = [
  { line: '1', word: 'Moving', style: 'text-[clamp(2rem,4vw,4rem)] p-2 pl-0', spanStyle: '' },
  { line: '1', word: 'Business', style: 'text-[clamp(2rem,4vw,4rem)] p-2 pr-0', spanStyle: '' },
  { line: '2', word: '', style: 'h-full', spanStyle: '', src: 'https://res.cloudinary.com/dl4wyqxbe/video/upload/v1763463538/5928077-sd_360_640_30fps_lgqrjh.mp4', poster: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1766484314/alt-10_xflh62.jpg', video: true },
  { line: '2', word: 'BEYOND', style: 'text-[calc(clamp(2rem,5vw,4rem)*1.5)] font-bold p-3 pl-0', spanStyle: '' },
  { line: '3', word: 'BORDERS', style: 'text-[calc(clamp(2rem,5vw,4rem)*1.5)] font-bold p-3 pl-0 pr-0', spanStyle: '' },
]

const wordsByLine = {
  1: words.filter((word) => word.line === '1'),
  2: words.filter((word) => word.line === '2'),
  3: words.filter((word) => word.line === '3'),
};

// const colors = [
//   "#2563EB", // blue
//   "#4663E5",// blue-ple
//   "#A379FF", // purple
//   "#45CBF8", // light blue  
//   "#0D9488", // teal
//   "#516781", // steel blue
//   "#B2D0E5", // pale blue
//   "#FFAD89", // light orange
//   "#FF7979", // light red
// ];

// const gradientVariants = {
//   animate: {
//     "--end": ["#000000", ...colors],
//     transition: {
//       duration: 20,
//       ease: "easeInOut",
//       repeat: Infinity,
//       repeatType: "mirror",
//     },
//   },
//   paused: {
//     // When paused, keep the current color (Framer Motion handles freezing)
//     transition: { duration: 0 },
//   },
// };

const MotionImage = motion.create(Image)

const heroBlurImage = "https://res.cloudinary.com/dl4wyqxbe/image/upload/w_20,e_blur:300,q_auto/bg-hero-image_btzkox.png"
const heroFullImage = "https://res.cloudinary.com/dl4wyqxbe/image/upload/f_auto,q_auto/v1763470951/bg-hero-image_btzkox.png"

const bgBlurImage = "https://res.cloudinary.com/dl4wyqxbe/image/upload/w_20,e_blur:300,q_auto/bg_oumicq.jpg"
const bgFullImage = "https://res.cloudinary.com/dl4wyqxbe/image/upload/v1787930027/bg_oumicq.jpg"

function HomeBanner() {
  const targetRef = useRef(null)
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start']
  })

  // const isInView = useInView(targetRef, {
  //   amount: 0,      // 0% visible to count as "in view"
  //   margin: "0px",
  // });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : ['0px', '20vh']

  );

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : ['0px', '40vh']
  );

  // const { ref, src } = useLazyImage(heroFullImage);

  const hero = useLazyImage(heroFullImage);
  const bg = useLazyImage(bgFullImage);


  return (
    <section
      ref={targetRef}
      id="home"
      className="h-svh sm:h-dvh relative overflow-hidden"
      // initial={{ "--end": "#000000" }}
      // animate={isInView ? "animate" : "paused"}
      // variants={gradientVariants}
      style={{
        background: "linear-gradient(110deg, #000 0%, #2563EB 83.83%)",
      }}
    >
        {/* <div
          ref={bg.ref}
          className="absolute inset-0"
        >
          {
            bg.src ? (
              <Image
                src={bg.src}
                alt="Bg Image"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />

            ) : (
              <Image
                src={bgBlurImage}
                alt="Bg Image"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            )
          }
        </div> */}
      <motion.div
      style={{ y }}
        ref={hero.ref}
        className="absolute inset-0"
      >
        {hero.src ? (
          <MotionImage
            src={hero.src}
            id="hero_image"
            className="mt-[40%] md:mt-0"
            style={{ imageY, objectFit: "cover" }}
            alt="Hero Image"
            fill
            sizes="100vw"
            priority
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.6,
              ease: "easeOut",
              delay: 0.6,
            }}
          />
        ) : (
          <Image
            src={heroBlurImage}
            alt="Hero Image"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        )
      }
      </motion.div>

      <div
        // style={{ y }}
        className="relative h-full container flex flex-col md:flex-row gap-5 pb-30 md:pb-0 pl-8 pr-8 md:pl-15 lg:pl-32.5"
      >
        <div className="text-white h-full flex items-center">
          <h1 className="leading-none tracking-tighter">
            {/* LINE 1 */}
            <span className="block whitespace-nowrap">
              {wordsByLine[1].map((data, index) => (
                <StaggeredText
                  data={data}
                  index={index}
                  key={`${data.line}-${data.word || 'video'}-${index}`}
                />
              ))}
            </span>
            {/* LINE 2 */}
            <span className="block whitespace-nowrap">
              {wordsByLine[2].map((data, index) => (
                <StaggeredText
                  data={data}
                  index={index}
                  key={`${data.line}-${data.word || 'video'}-${index}`}
                />
              ))}
            </span>
            {/* LINE 3 */}
            <span className="block whitespace-nowrap">
              {wordsByLine[3].map((data, index) => (
                <StaggeredText
                  data={data}
                  index={index}
                  key={`${data.line}-${data.word || 'video'}-${index}`}
                />
              ))}
            </span>
          </h1>
        </div>

        <motion.div
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          transition={{
            duration: 1.3,
            delay: (words.length-1) * 0.02,
            ease: 'easeOut',
            type: 'spring',
            stiffness: 200,
            damping: 50,
          }}
          className="absolute bottom-6 md:bottom-10 overflow-hidden lg:w-[50%] w-full pr-15 left-8 md:left-15 lg:left-32.5">
          <div className="text-white text-[0.88rem] max-w-120 inline-flex gap-1.5">
            <span className="block bg-[#FF6A3D] h-2 w-2 mt-1.5 shrink-0" />
            <p>
              Our mission is to provide efficient, secure, and customized air cargo solutions with uncompromising professionalism, trust, and reliability.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HomeBanner