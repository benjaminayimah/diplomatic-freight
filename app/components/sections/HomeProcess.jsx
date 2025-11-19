import React from 'react'
import ProcessCard from '../ProcessCard'


const process = [
  {title: '01: Submit Your Request', description: 'Tell us your travel needs through our simple inquiry form. Our team is available 24/7 to assist you.' },
  {title: '02: Receive a Custom Quote', description: 'We provide a transparent, all-inclusive quote tailored to your specific itenerary and preferences.' },
  {title: '03: Confirm & Fly', description: 'Once confirmed, your dedicated concierge handles every detail, ensuring a flawless journey from start to finish.' },
]


function HomeProcess() {
  return (
    <section id='our-process' className='bg-white pt-20 md:pt-30'>
      <div className='container w-[92vw] sm:w-[88vw]'>
        <div className='grid md:grid-cols-2 gap-6 md:mb-20 mb-10'>
          <div>
            <h2 className='text-3xl md:text-4xl font-bold'>Our process</h2>
          </div>
          <div className='lg:pl-[30%] text-xl'>
            Every successful shipment begins with a streamlined process - and here's how we do it.
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-30'>
          {
            process.map((data, index) => (
              <ProcessCard key={index} data={data} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default HomeProcess