import React from 'react'

function VerifyFooter() {
  return (
    <div className='max-w-md'>
      <ul className='flex flex-wrap items-center gap-2 justify-center'>
        <li><a href="/" className='text-sm text-gray-500 hover:underline hover:text-gray-800 transition-all duration-300'>Website</a></li>
        <span className='inline-block h-3 w-px border-r border-gray-200' />
        <li><a href="/terms-of-service" className='text-sm text-gray-500 hover:underline hover:text-gray-800 transition-all duration-300'>Terms of Service</a></li>
        <span className='inline-block h-3 w-px border-r border-gray-200' />
        <li><a href="/privacy-policy" className='text-sm text-gray-500 hover:underline hover:text-gray-800 transition-all duration-300'>Privacy Policy</a></li>
      </ul>
      <div className='text-center'>
        <span className='text-[13px] text-gray-400'>
        {`Copyright © ${process.env.NEXT_PUBLIC_CURRENT_YEAR} Diplomatic Freight & Logistics Service Ltd. All rights reserved`}
      </span>
      </div>
    </div>
  )
}

export default VerifyFooter