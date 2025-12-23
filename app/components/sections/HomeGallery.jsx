'use client'

import React from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from '../../styles/gallery.module.css'
import { useRef } from 'react'
import Picture1 from '../../../public/images/alt-1.webp'
import Picture2 from '../../../public/images/alt-2.jpg'
import Picture3 from '../../../public/images/alt-3.jpg'
import Picture4 from '../../../public/images/alt-4.jpg'
import Picture5 from '../../../public/images/alt-5.jpg'
import Picture6 from '../../../public/images/alt-6.jpg'
import Picture7 from '../../../public/images/alt-7.jpg'
import Picture8 from '../../../public/images/alt-8.jpg'
import Picture9 from '../../../public/images/alt-9.jpg'
import Picture10 from '../../../public/images/alt-10.jpg'


function HomeGallery() {
  const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end']
    })

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
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
        <div className={styles.sticky}>
          {
            pictures.map( ({src, scale}, index) => {
                return <motion.div key={index} style={{scale}} className={styles.el}>
                  <div className={styles.imageContainer}>
                      <Image
                        src={src}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt="image"
                        // placeholder='blur'
                    />
                    {
                      index === 0 && 
                      <motion.div
                        style={{opacity}}
                        className='inset-0 p-2 md:p-5 text-white bg-black/80 pointer-events-none absolute flex flex-col gap-2 items-center justify-center text-center'
                        >
                          <h1 className='text-xl md:text-3xl font-medium'>Photo Gallery</h1>
                          <p className='text-sm md:text-base'>Keep scrolling for a cool parallax effect.</p>
                      </motion.div>
                    }
                  </div>
                </motion.div>
            })
          }
        </div>

      </div>
    </section>
  )
}

export default HomeGallery