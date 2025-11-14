'use client'

import Image from 'next/image'

function TestimonialCard({ testimonial }) {
  return (
    <div className="flex gap-3 rounded-3xl bg-gray-100 p-7.5 w-100 h-40">
      <div className={`flex items-center overflow-hidden w-25`}>
        <div className='relative w-25 h-25'>
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            className='object-cover rounded-full'
            fill
          />
        </div>
      </div>
      <div className='flex flex-1 gap-1.5'>
        <div className="flex justify-center flex-col gap-2">
          <h4 className='font-bold text-black'>{testimonial.name}</h4>
          <p className="text-gray-500 text-[0.9rem]">
            {testimonial.testimony}
          </p>
        </div>
        <div className='text-gray-300 font-semibold text-7xl'>"</div>
      </div>
    </div>
  )
}

export default TestimonialCard
