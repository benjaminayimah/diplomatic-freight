import React from 'react'
import Loader from './Loader'

function SubmitButton({loading, onClick, className, children}) {
  if (loading) {
    return (
      <div
       className='bg-gray-100 px-4 py-3 font-medium rounded-4xl h-10 flex items-center justify-center min-w-[86px] text-[0.88rem] '
      >
        <Loader size={20} />
      </div>
    )
  }
  return (
    <button
      onClick={onClick}
      type='submit'
      className={`h-10 px-4 py-2 flex items-center justify-center font-semibold text-[0.88rem] rounded-4xl min-w-[86px] ${className}`}
    >
      {children}
    </button>
  )
}

export default SubmitButton