'use client'

import Image from 'next/image'

function TestimonialCard({ testimonial }) {

  const fistName = testimonial?.name.split(' ')[0]
  const lastName = testimonial?.name.split(' ')[1]



  return (
    <div className="flex gap-3 rounded-3xl bg-gray-100 p-7.5 w-100 h-40">
      <div className={`flex items-center overflow-hidden w-25`}>
        <div className={`${testimonial.bgColor} grid place-items-center w-25 h-25 rounded-full`}>
          <span className='font-semibold'>{fistName.slice(' ')[0] + lastName.slice(' ')[0]}</span>
        </div>
      </div>
      <div className='flex flex-1 gap-1.5'>
        <div className="flex justify-center flex-col gap-1">
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
