import React from 'react'
import { useRouter } from 'next/navigation'



function BackButton({ onClick }) {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <button onClick={ onClick } type='button' className='bg-gray-50 h-10 w-10 grid place-items-center rounded-3xl mb-3 border border-gray-200 hover:bg-gray-100 transition-all duration-300'>
      <svg width="14.677" height="13" viewBox="0 0 14.677 13">
        <path d="M7.061,12.751a.885.885,0,0,0,.007-1.246L2.959,7.382H13.8a.88.88,0,0,0,0-1.76H2.959L7.075,1.5A.891.891,0,0,0,7.068.253.877.877,0,0,0,5.829.26L.251,5.879h0a.988.988,0,0,0-.183.278A.84.84,0,0,0,0,6.5a.882.882,0,0,0,.251.616l5.579,5.619A.862.862,0,0,0,7.061,12.751Z" fill="#000"/>
      </svg>
    </button>
  )
}

export default BackButton