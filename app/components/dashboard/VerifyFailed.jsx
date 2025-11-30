'use client'

import React from 'react'
import VerifyFooter from './VerifyFooter'

function VerifyFailed() {


  return (
    <section className="app-body-wrapper min-h-dvh flex verifiable">
      <div className="flex items-center justify-center rounded-2xl w-full">
        <div className='flex flex-col gap-6 justify-center items-center'>
          <div className="bg-white shadow-2xs rounded-2xl p-8 max-w-md w-full text-center border border-red-200">
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-red-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-red-600">Verification Failed</h1>
            <p className="text-gray-600 mt-2">The invoice you are trying to verify does not exist, has been altered, or is not recognized.</p>
            <p className='text-gray-600  mt-4'>
              If you have any questions or concerns, please contact our support team.
            </p>
            <a href='/' className="myHover-translate mt-6 w-full py-2.5 bg-black text-white rounded-3xl hover:bg-gray-900 font-medium inline-block">
              Contact support
            </a>
          </div>
          <VerifyFooter />
        </div>
      </div>
    </section>
  )
}

export default VerifyFailed