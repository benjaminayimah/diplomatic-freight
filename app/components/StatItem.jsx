import React from 'react'

function StatItem({ stat }) {
  return (
    <div className='grid grid-cols-1 place-items-center'>
      <div>
        <h1 className='text-4xl md:text-7xl text-white font-extrabold mb-4 pb-4 border-b border-[#157ad1]'>{stat.value}</h1>
        <h3 className='text-white font-semibold'>{stat.label}</h3>
        <p className='text-[#97CCFA]'>{stat.description}</p>
      </div>
    </div>
  )
}

export default StatItem