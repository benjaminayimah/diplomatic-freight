import React from 'react'

function Button({onClick}) {
  return (
    <button onClick={onClick} className="myHover-translate h-11 md:h-12 px-3.5 md:px-5 py-3 bg-[#FF6A3D] rounded-[44px] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15)] inline-flex items-center">
      <span className="text-center justify-start text-white text-base font-medium">Get a Quote</span>
    </button>
  )
}

export default Button