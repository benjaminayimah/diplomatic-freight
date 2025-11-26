import React from 'react'

function ErrorCard({error}) {
  return (
    <p className="text-red-500 mb-4 py-3 px-4 bg-red-50 rounded-lg border border-red-100 flex gap-2 items-center">
      <svg height="16" viewBox="0 0 20.003 18">
          <path d="M11.14,4.494a1,1,0,0,1,1.72,0l7,12.008A1,1,0,0,1,19,18H5a1,1,0,0,1-.86-1.5Zm3.447-1.007a2.994,2.994,0,0,0-5.174,0l-7,12.007A3,3,0,0,0,5,20H19a3,3,0,0,0,2.587-4.506ZM13,9.019a1,1,0,0,0-2,0v2.994a1,1,0,0,0,2,0V9.02ZM12,13.75A1.25,1.25,0,1,0,13.25,15,1.25,1.25,0,0,0,12,13.75Z" transform="translate(-1.998 -2)" fill="#f22121"/>
      </svg>
      {error}
    </p>
  )
}

export default ErrorCard