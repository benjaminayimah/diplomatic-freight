import React from 'react'

function StatItem({ stat }) {
  return (
    <div className='grid grid-cols-1 place-items-center'>
      <div>
        <h1 className='text-4xl md:text-7xl text-white font-extrabold mb-2'>{stat.value}</h1>
        <span className='md:text-xl text-[#97CCFA]'>{stat.label}</span>
      </div>
    </div>
  )
}

export default StatItem