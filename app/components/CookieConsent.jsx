'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { usePathname } from "next/navigation"
import { useState, useEffect } from 'react'



function CookieConsent() {
  const pathname = usePathname()
  const darkRoutes = ["/terms-of-service", "/privacy-policy", "/cookie-policy"]
  const isNotHome = darkRoutes.includes(pathname)
  const rightPosition = isNotHome ? "sm:right-8" : "sm:right-45"

  const [showBanner, setShowBanner] = useState(false)
  useEffect(() => {
    const accepted = localStorage.getItem('cookieAccepted')
    if (!accepted) {
      setShowBanner(true)
    }
  }, [])

  const dismissCookie = () => {
    localStorage.setItem('cookieAccepted', true)
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <motion.div
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      transition={{
        delay: 3,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 300,
        damping: 40,
      }}
      className={`fixed bg-white p-5 w-full bottom-0 sm:bottom-8 sm:w-100 shadow-[0px_100px_200px_0px_rgba(35,36,45,0.3)] z-10 ${rightPosition}`}>
      <div className='flex items-center gap-5'>
        <div className='flex-1'>
          <p className='text-[0.88rem] w-full'>
            <span>
              We use third party <a href="/cookie-policy" className='myHover-translate underline text-gray-700 hover:text-gray-500'>cookies</a> in order to personalise your site expierence.
            </span>
          </p>
        </div>
        <div>
          <button
            className='myHover-translate bg-black text-white px-4 py-3 text-[0.88rem] rounded-4xl font-medium'
            onClick={dismissCookie}
            >
              Okay!
            </button>
        </div>
      </div>
    </motion.div>
  )
}

export default CookieConsent