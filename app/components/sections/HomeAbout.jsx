import React from 'react'
import TextReveal from '../TextReveal'
import Image from 'next/image';
import WhyChooseCard from '../WhyChooseCard'


const who_we_are = [
  "We", "guarantee", "fast", "reliable", "and", "affordable", "logistics",
  "solutions", "tailored", "to", "your,", "needs.",
  <br key="br1" />,
  "Our", "experience", "ensures", "a", "smooth", "and", "qaulity", "shipping", "experience", "from",
  "start", "to", "finish."
];
const why_choose_us = [
  "We", "deliver", "safe", "and", "smart", "-", "so",
  "your", "shipment", "always", "arrives,", "on", "time.", "and", "in", "great", "condition"
];

const why_choose_card = [
  {title: 'Global Reach', description: 'Access to thousand of airports worldwide, getting your closer to your final destination.' },
  {title: '24/7 Concierge', description: 'Dedicated support for all your needs, from in-flight catering to ground transportation.' },
  {title: 'Unmatched Privacy', description: 'Travel with complete discretiion and security through private terminals and aircraft.' },
  {title: 'Safety First', description: 'We adhere to the highest safety standardsm with rigorously maintained aircraft and experienced crews.' },
]


function HomeAbout() {
  return (
    <section className='bg-white relative py-15 md:py-30'>
      <div className='container w-[92vw] sm:w-[88vw]'>
        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <h2 className='text-3xl md:text-4xl font-bold'>Who we are</h2>
          </div>
          <div className='lg:pr-36 text-[1.7rem]'>
            <TextReveal words={who_we_are} textOffset={'0.9'} />
          </div>
        </div>
        <hr className='border-t-b border-slate-200 my-10 md:my-20'/>
        <div className='mb-20'>
          <h3 className='text-xl font-semibold mb-4 md:mb-8 text-gray-500'>Why choose us?</h3>
          <div className='md:max-w-[700px] text-[1.7rem] font-semibold'>
            <TextReveal words={why_choose_us} textOffset={'0.7'} />
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          { why_choose_card.map((data, index) => (
            <WhyChooseCard key={index} data={data} />
          ))}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-10 mt-10 md:mt-20'>
          <div className='relative aspect-square w-full rounded-[5%] overflow-hidden'>
            <Image
              src={'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1763150133/loaded-onto-transport_wqzptw.jpg'}
              alt={'About image'}
              className='object-cover'
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </div>
          <div className='relative aspect-square w-full rounded-[5%] overflow-hidden'>
            <Image
              src={'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1763149619/two-workers_dc4dpp.jpg'}
              alt={'Product image'}
              className='object-cover'
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </div>
          <div className='relative aspect-square w-full rounded-[5%] overflow-hidden'>
            <Image
              src={'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1762964255/about-image-3_gyllra.png'}
              alt={'About image'}
              className='object-cover'
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeAbout