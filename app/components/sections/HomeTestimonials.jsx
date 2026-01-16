'use client'


import React, { useState } from 'react'
import TestimonialCard from '../TestimonialCard'

import { useScrollerAnimation } from '../../../hooks/useScrollerAnimation';


const testimonialsArray = [
  {
    id: 1,
    name: 'Jonathan A.',
    bgColor: 'bg-orange-300',
    testimony: 'Diplomatic Freight has transformed our supply chain, providing us with seamless freight solutions.'
  },
  {
    id: 2,
    name: 'Peterson T.',
    bgColor: 'bg-pink-300',
    testimony: 'Their air charter service is exceptional. The team is professional, and the service is always reliable.'
  },
  {
    id: 3,
    name: 'Katherine H.',
    bgColor: 'bg-lime-300',
    testimony: 'We rely on Diplomatic Freight for our critical shipments. Their commitment to excellence is unmatched.'
  },
  {
    id: 4,
    name: 'Emmanuel O.',
    bgColor: 'bg-indigo-300',
    testimony: 'From planning to delivery, the process was smooth and transparent. We always feel confident shipping with them.'
  },
  {
    id: 5,
    name: 'Daniel B.',
    bgColor: 'bg-red-300',
    testimony: 'Their logistics expertise and attention to detail have helped us meet tight deadlines without compromise.'
  },
  {
    id: 6,
    name: 'Chris K.',
    bgColor: 'bg-green-300',
    testimony: 'Diplomatic Freight understands urgency. Their responsiveness and reliability set them apart.'
  },
  {
    id: 7,
    name: 'Katherine H.',
    bgColor: 'bg-violet-300',
    testimony: 'A trusted partner we can depend on for time-sensitive and high-value cargo movements.'
  }
];


function HomeTestimonials() {
  
  const [testimonials] = useState(testimonialsArray)

  useScrollerAnimation();

  return (
    <section id='testimonials' className='py-20 md:py-30 bg-white flex justify-center'>
      <div className='container w-[92vw] sm:w-[88vw] flex justify-center'>
        <div className='flex flex-col w-full md:items-center'>
          <div className='max-w-[76vw] sm:max-w-[56vw] md:max-w-[30vw] md:text-center mb-10 md:mb-18'>
            <span className='pill-tag mb-4 text-black border border-black/10'>Testimonials</span>
            <h2 className='text-3xl md:text-4xl font-bold'>See what our customers are saying...</h2>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <div className='scroller' data-direction="left">
                <div className='scroller-inner'>
                    {
                        testimonials.map((testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))
                    }
                </div>
            </div>
            <div className='scroller' data-direction="right">
                <div className='scroller-inner'>
                    {
                        testimonials.map((testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))
                    }
                </div>
            </div>
        </div>
        </div>
      </div>
    </section>
  )
}

export default HomeTestimonials