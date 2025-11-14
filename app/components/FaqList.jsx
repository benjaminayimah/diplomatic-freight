'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

function FaqList({ data }) {
  const { title, body } = data
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef(null)
  const contentId = `faq-content-${title.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div className="group border-b border-[#E6E9F2] py-4 my-0 faq-list">
      {/* Use a semantic button instead of clickable <h3> for keyboard & ARIA support */}
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between text-left text-2xl font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2665E4] transition-colors ${
            isOpen ? 'text-black' : 'text-[#4F535B]'
          }`}
        >
          <span className='group-hover:text-black'>{title}</span>
          <span className='h-10 w-10 shrink-0 grid place-items-center rounded-full bg-gray-100'>
            <motion.svg
              height="8"
              viewBox="0 0 21 12"
              fill="none"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            >
            <motion.path
              d="M0.311229 0.275025C0.711623 -0.105374 1.34458 -0.0891647 1.72498 0.311229L10.5006 9.5481L19.275 0.311276C19.6554 -0.0891423 20.2883 -0.105393 20.6887 0.27498C21.0891 0.655353 21.1054 1.28831 20.725 1.68873L11.2256 11.6887C11.0369 11.8875 10.7748 12 10.5007 12C10.2265 12 9.96445 11.8875 9.77564 11.6888L0.275025 1.68878C-0.105374 1.28838 -0.0891647 0.655424 0.311229 0.275025Z"
              fill="#000"
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
        <div className="pt-3 text-[#4F535B] text-[1.13rem] leading-relaxed">
          <p className='w-[calc(100%-16px)]'>{body}</p>
        </div>
      </motion.div>
    </div>
  )
}

export default FaqList
