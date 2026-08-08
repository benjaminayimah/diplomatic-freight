import React from 'react'
import Loader from './Loader'

function SubmitButton({loading, onClick, className, children}) {

  const classes = `
    h-10 px-4 py-2 flex items-center
    justify-center gap-2 font-semibold
    text-[0.88rem] rounded-full min-w-21.5
    transition duration-300
  `

  if (loading) {
    return (
      <div
       className={`
       ${classes}
       bg-gray-100
        text-gray-400
      `}
      >
        <Loader size={20} />
        {children}...
      </div>
    )
  }
  return (
    <button
      onClick={onClick}
      type='submit'
      className={`${className} ${classes}`}
    >
      {children}
    </button>
  )
}

export default SubmitButton