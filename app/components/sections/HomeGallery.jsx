'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import GalleryImages from "../GalleryImages"

function HomeGallery() {
  const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end']
    })

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);



    const pictures = [
      {
          src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1766484314/alt-1_j5s4xr.webp',
          scale: scale4
      },
      {
          src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1766484313/alt-2_mizlbq.jpg',
          scale: scale8
      },
      {
          src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1766484313/alt-3_kf5mln.jpg',
          scale: scale6
      },
      {
          src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1766484312/alt-4_mqssp9.jpg',
          scale: scale6
      },
      {
          src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1766484313/alt-5_p3ollq.jpg',
          scale: scale8
      },
      {
          src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1766484313/alt-6_f03fto.jpg',
          scale: scale6
      },
      {
          src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1766484316/alt-7_zmzgn8.jpg',
          scale: scale6
      },
      {
          src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1766484315/alt-8_j79qoe.jpg',
          scale: scale9
      },
      {
          src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1766484314/alt-9_t5p6ck.jpg',
          scale: scale6
      },
      {
          src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1766484314/alt-10_xflh62.jpg',
          scale: scale9
      }, 
  ]

  return (
    <section className='bg-black h-[300vh] pt-20 rounded-bl-[55px] rounded-br-[55px]'>
      <div ref={targetRef}  className='relative h-full'>
        <div className="sticky top-0 h-svh overflow-hidden">
          {
            pictures.map( ({src, scale}, index) => {
              return (
                <motion.div key={index} style={{scale}} className="el">
                  <GalleryImages
                    index={index}
                    fullSrc={src}
                    opacity={opacity}
                  />
                </motion.div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default HomeGallery