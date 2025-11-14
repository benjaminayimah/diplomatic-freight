'use client'


import React, { useState } from 'react'
import TestimonialCard from '../TestimonialCard'

import { useScrollerAnimation } from '../../hooks/useScrollerAnimation';


const testimonialsArray = [
    {id: 1, name: 'John D.', image: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1746969678/samples/man-portrait.jpg', testimony: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.'},
    {id: 2, name: 'Stephanie T.', image: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1746969673/samples/two-ladies.jpg', testimony: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.'},
    {id: 3, name: 'Katherine H.', image: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1763022323/thought-catalog--v7EOw5SA4I-unsplash_nxqwzf.jpg', testimony: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.'},
    {id: 4, name: 'Emmanuel O.', image: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1746969669/samples/people/smiling-man.jpg', testimony: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.'},
    {id: 5, name: 'Daniel B.', image: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1746969668/samples/people/kitchen-bar.jpg', testimony: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.'},
    {id: 6, name: 'Jane K.', image: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1746969679/cld-sample.jpg', testimony: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.'},
    {id: 7, name: 'Katherine H.', image: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1763022323/thought-catalog--v7EOw5SA4I-unsplash_nxqwzf.jpg', testimony: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.'}
]

function HomeTestimonials() {
  
  const [testimonials] = useState(testimonialsArray)

  useScrollerAnimation();

  return (
    <section id='testimonials' className='py-10 md:py-15 bg-white relative flex justify-center'>
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