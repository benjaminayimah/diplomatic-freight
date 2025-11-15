import React from 'react'

function CookieConsent() {
  return (
    <div className='fixed bg-white p-5 w-full bottom-0 sm:w-100 sm:right-45 sm:bottom-10 shadow-[0px_100px_200px_0px_rgba(35,36,45,0.3)] z-10'>
      <div className='flex items-center gap-5'>
        <div className='flex-1'>
          <p className='text-[0.88rem] w-full'>
            We use third party <a href="" className='underline text-gray-700'>cookies</a> in order to personalise your site expierence.
          </p>
        </div>
        <div>
          <button className='bg-black text-white px-4 py-3 text-[0.88rem] rounded-4xl font-medium'>Okay!</button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent