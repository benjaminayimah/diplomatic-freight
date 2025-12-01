'use client'
import React from 'react'
import Logo from '../Logo'
import Button from '../Button'
import HamburgerMenu from '../HamburgerMenu'
import { useUIStore } from "../../../store"
import CustomNav from '../CustomNav'
import { motion } from 'framer-motion'
import { redirect } from 'next/navigation'


function Header() {

  const { device, mobileMenu } = useUIStore()

  const menus = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Our Process', href: '/#our-process' },
    { name: 'Contact', href: '/#contact' },
    { name: 'FAQs', href: '/#faqs' }
  ]

  return (
    <motion.header
      id="header"
      className={`fixed py-7 sm:py-11 top-0 z-20 flex w-full items-center`}
      initial={{ y: -100, }}
      animate={{ y: 0, }}
      transition={{ duration: 0.5, ease: ['easeInOut'] }}
      >
      <div className='relative h-12 container w-[92vw] sm:w-[88vw] justify-between flex items-center'>
        <a href="/" id='logo' className="logo absolute left-0">
            <Logo />
        </a>
        <CustomNav links={menus} />
        <div className='inline-flex items-center gap-4 absolute right-0'>
          {/* <Button onClick={() => redirect('/get-a-quote')} /> */}
          <a href="/get-a-quote" className='myHover-translate h-11 md:h-12 px-3.5 md:px-5 py-3 bg-[#FF6A3D] rounded-[44px] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15)] inline-flex items-center text-white text-base font-medium'>Get a quote</a>
          <HamburgerMenu />
        </div>
      </div>
    </motion.header>
  )
}

{/* <button onClick={onClick} className="myHover-translate h-11 md:h-12 px-3.5 md:px-5 py-3 bg-[#FF6A3D] rounded-[44px] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15)] inline-flex items-center">
      <span className="text-center justify-start text-white text-base font-medium">Get a quote</span>
    </button> */}

export default Header