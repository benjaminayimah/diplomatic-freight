'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

function FaqList({ data }) {
  const { title, body } = data
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef(null)
  const contentId = `faq-content-${title.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div className="group border-b border-[#E6E9F2] my-0 faq-list">
      {/* Use a semantic button instead of clickable <h3> for keyboard & ARIA support */}
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex py-4 items-center justify-between text-left text-xl  md:text-2xl font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2665E4] transition-colors ${
            isOpen ? 'text-black' : 'text-[#4F535B]'
          }`}
        >
          <span className='group-hover:text-black'>{title}</span>
          <span className='h-10 w-10 shrink-0 grid place-items-center rounded-full bg-gray-100'>
            <motion.svg 
              height="13"
              animate={{ rotate: isOpen ? 225 : 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.521 11.521">
              <path
                d="M19.678,26.263V21.326H14.74V19.68h4.938V14.742h1.646V19.68h4.938v1.646H21.324v4.938Z" transform="translate(-14.74 -14.742)"
              />
            </motion.svg>
          </span>
        </button>
      </h3>

      <motion.div
        id={contentId}
        ref={contentRef}
        role="region"
        aria-labelledby={contentId}
        className="overflow-hidden"
        animate={{
          height: isOpen ? contentRef.current?.scrollHeight : 0,
        }}
        initial={false}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="pb-4 text-[#4F535B] text-[1.13rem] leading-relaxed">
          <p className='w-[calc(100%-16px)]'>{body}</p>
        </div>
      </motion.div>
    </div>
  )
}

export default FaqList
