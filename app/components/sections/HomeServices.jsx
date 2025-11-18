import React from 'react'
import TextReveal from '../TextReveal'
import ServicesCard from '../ServicesCard'

const what_we_deliver = [
  "Whether", "you're", <span className='text-orange-600 font-semibold'>exporting</span>, "across", "continents", "or", <span className='text-blue-600 font-semibold'>importing</span>, "products",
  "into", "complex", "markets,", "our,", "tailored", "logistic", "solutions", "ensures", "speed,", "compliance",
  "and", "peace", "of", "mind.", "We", "manage", "every", "detail", "so", "you", "can", "focus", "on", "growing",
  "your", "business."
];


function HomeServices() {

  const services = [
    { id: 1, name: 'Cargo Handling', description: "We possess a first class expertise to manage your cargo no matter the type.", src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1763150133/loaded-onto-transport_wqzptw.jpg' },
    { id: 2, name: 'Sea & Air Freight Forwarding', description: "Our fleet of aircraft and vessels are at your service to transport your cargo to and from any part of the world by air and sea.", src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1762964255/about-image-3_gyllra.png' },
    { id: 3, name: 'Warehousing', description: "We are equipped with more than adequate facilities to store your cargo.", src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1763149619/two-workers_dc4dpp.jpg' },
    { id: 4, name: 'Air Charter', description: "We provide private air charter services to customers on-demand.", src: 'https://res.cloudinary.com/dl4wyqxbe/image/upload/v1763150547/air-charter_nd7cpf.png' },
  ]

  return (
    <section id='services' className='bg-gray-100 py-20 md:py-30'>
      <div className='container w-[92vw] sm:w-[88vw]'>
        <div className='grid md:grid-cols-2 gap-6 md:mb-20 mb-10'>
          <div>
            <h2 className='text-3xl md:text-4xl font-bold'>Our services</h2>
          </div>
          <div className='lg:pl-36 text-xl'>
            <TextReveal words={what_we_deliver} textOffset={'0.9'} />
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          { services.map((data, index) => (
            <ServicesCard key={data.id} service={data} index={index} />
          ))}

        </div>
      </div>
    </section>
  )
}

export default HomeServices