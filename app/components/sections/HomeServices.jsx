'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import ServicesCard from '../ServicesCard'
import MoreModal from '../../components/MoreModal'
import Image from 'next/image'
import { motion } from 'framer-motion'

const services = [
    { id: 1, name: 'Air Cargo Chartering', description: "We arrange full and partial aircraft charters for clients who require dedicated lift capacity, specific routing, or time-critical delivery. Available aircraft range from turboprops to wide-body freighters, depending on the cargo type, volume, and destination.", src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1765119496/pexels-salahdarwish-11943178_f9jzqe.jpg' },
    { id: 2, name: 'High-Value & Sensitive Cargo Handling', description: "Our process includes controlled handling, discreet routing, and end-to-end monitoring.", src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1763483321/pexels-saturnus99-12366223_vxpig2.jpg' },
    { id: 3, name: 'Freight Forwarding & Door-to-Door Solutions', description: "We manage the full logistics chain — from pickup to final delivery — including packaging, documentation, customs assistance, and ground handling.", src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1763150133/loaded-onto-transport_wqzptw.jpg' },
    { id: 4, name: 'Customs & Documentation Support', description: "We assist with export/import permits, customs clearance, airway bills, and all operational paperwork to eliminate delays.", src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1765118951/pexels-yankrukov-8867272_hdvxce.jpg' },
    { id: 5, name: 'Route & Aircraft Consultation', description: "Our team advises on:", bullet1: 'Best aircraft for the cargo', bullet2: 'Fastest or most cost-effective routing', bullet3: 'Load planning', bullet4: 'Regulatory requirements', footnote: 'We ensure clients receive the most suitable and economical logistics solution.', src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1763149619/two-workers_dc4dpp.jpg' },
  ]

function HomeServices() {
  const [open, setOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const handleCloseModal = useCallback(() => {
    setOpen(false)
    setModalContent(null)
  }, [])

  // Update scroll button state
  const updateScrollButtons = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1) // -1 for rounding errors
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    updateScrollButtons()
    container.addEventListener('scroll', updateScrollButtons)
    window.addEventListener('resize', updateScrollButtons)

    return () => {
      container.removeEventListener('scroll', updateScrollButtons)
      window.removeEventListener('resize', updateScrollButtons)
    }
  }, [])

  const scroll = (direction = 'left') => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const scrollAmount = container.clientWidth * 0.8
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    <section id='services' className='bg-[#ecf2ff] pb-20 md:pb-30 relative'>
      <motion.div
        initial={{ opacity: 0, y: '50px'}}
        whileInView={{ opacity: 1, y: '0px', transition: {duration: 1}}}
        viewport={{
          once: true,
          amount: 0.3
        }}
        className='container w-[92vw] sm:w-[88vw]'>
        <div className='grid md:grid-cols-2 gap-6 md:mb-20 mb-10'>
          <h2 className='text-4xl md:text-5xl font-semibold'>Our services</h2>
          <div className='lg:pl-36 text-xl'>
            Whether you're exporting across continents or importing products into complex markets, our tailored logistic solutions ensures speed, compliance and peace of mind.
          </div>
        </div>
      </motion.div>
      <div
        ref={scrollRef}
        className='grid grid-cols-1 gap-6 md:flex px-[6vw] scroll-px-[6vw] md:overflow-x-auto scroll-snap hide-scrollbar'
        >
        {services.map((data) => (
          <ServicesCard
            key={data.id}
            service={data}
            id={modalContent?.id}
            onClick={() => {
              setModalContent(data)
              setOpen(true)
            }}
            isOpen={open}
          />
        ))}
      </div>
      <div className='md:flex justify-end gap-4 px-[6%] hidden'>
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`${canScrollLeft ? 'hover:bg-gray-100' : ''} h-10 w-10 p-2 grid place-items-center rounded-full bg-white shadow transition disabled:opacity-40 disabled:cursor-not-allowed!`}
          >
          <svg height="15" viewBox="0 0 5.714 10">
            <path d="M1.533,10a.714.714,0,0,1-.505-1.219L4.809,5,1.028,1.22A.714.714,0,0,1,2.038.21L6.324,4.5a.714.714,0,0,1,0,1.01L2.038,9.791A.712.712,0,0,1,1.533,10Z" transform="translate(6.533 10.001) rotate(180)" fill="#000"/>
          </svg>
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`${canScrollRight ? 'hover:bg-gray-100' : ''} h-10 w-10 p-2 grid place-items-center rounded-full bg-white shadow transition disabled:opacity-40 disabled:cursor-not-allowed!`}
          >
          <svg height="15" viewBox="0 0 5.714 10">
            <path d="M1.533,10a.714.714,0,0,1-.505-1.219L4.809,5,1.028,1.22A.714.714,0,0,1,2.038.21L6.324,4.5a.714.714,0,0,1,0,1.01L2.038,9.791A.712.712,0,0,1,1.533,10Z" transform="translate(-0.819 -0.001)" fill="#000"/>
          </svg>
        </button>
      </div>
      <div className='mt-5 text-center'>
        <a href="/get-a-quote" className='text-xl font-medium inline-block text-black border border-black py-3.5 px-7 rounded-4xl hover:bg-black hover:text-white transition-colors duration-400'>
          Get a Quote
        </a>
      </div>
      <MoreModal
        isOpen={open}
        onClose={handleCloseModal}
        maxWidth="1000px"
        >
          <div className='h-100 bg-gray-100 relative overflow-hidden rounded-t-4xl'>
            <Image
              src={modalContent?.src}
              alt={modalContent?.name}
              fill
              className="object-cover transition-transform duration-700 ease-out scale-105 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className='px-6 pt-8 pb-16 md:py-18 flex justify-center'>
            <div className='w-full md:w-[60%]'>
              <h1 className='text-3xl mb-5 font-semibold'>
                {modalContent?.name}
              </h1>
              <div>
                <p className='text-lg mb-3'>
                  {modalContent?.description}
                </p>
                <ul className='mb-5 pl-8'>
                  { modalContent?.bullet1 &&  <li className='list-disc text-lg'>{modalContent.bullet1}</li> }
                  { modalContent?.bullet2 &&  <li className='list-disc text-lg'>{modalContent.bullet2}</li> }
                  { modalContent?.bullet3 &&  <li className='list-disc text-lg'>{modalContent.bullet3}</li> }
                  { modalContent?.bullet4 &&  <li className='list-disc text-lg'>{modalContent.bullet4}</li> }
                </ul>
                { modalContent?.footnote &&  <p className='text-lg'>{modalContent.footnote}</p>}
              </div>
              <div className='mt-8 pt-8 border-t border-gray-100'>
                <a
                  href="/get-a-quote" 
                  className='text-base font-medium flex gap-2 justify-center items-center text-white border py-3.5 px-6 rounded-4xl bg-black hover:bg-neutral-900 transition-colors duration-300'
                  >
                  Get a Quote
                  <svg height="14" viewBox="0 0 5.714 10">
                    <path d="M1.533,10a.714.714,0,0,1-.505-1.219L4.809,5,1.028,1.22A.714.714,0,0,1,2.038.21L6.324,4.5a.714.714,0,0,1,0,1.01L2.038,9.791A.712.712,0,0,1,1.533,10Z" transform="translate(-0.819 -0.001)" fill="#fff"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </MoreModal>
    </section>
  )
}

export default HomeServices
