'use client'
import React from 'react'
import NavList from '../NavList'
import Logo from '../Logo'
import Button from '../Button'
import HamburgerMenu from '../HamburgerMenu'
import { useUIStore } from "../../store"
import CustomNav from '../CustomNav'
import { motion } from 'framer-motion'


function Header() {
  const { device, mobileMenu } = useUIStore()

  const menus = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#' },
    { name: 'Services', href: '/#' },
    { name: 'Our Process', href: '/#' },
    { name: 'Contact', href: '/#' },
    { name: 'FAQs', href: '/#' }
  ]

  return (
    <motion.header
      id="header"
      className={`fixed py-7 sm:py-11 top-0 z-10 flex w-full items-center`}
      initial={{ y: -100, }}
      animate={{ y: 0, }}
      transition={{ duration: 0.5, ease: ['easeInOut'] }}
      >
      <div className='container w-[92vw] sm:w-[88vw] justify-between flex items-center'>
        <a href="#home" id='logo' className="logo">
            <Logo />
        </a>
        <CustomNav links={menus} />
        {/* <nav 
          id='menu'
          className={ mobileMenu ? 'menu-open' : 'menu-close' }
          aria-label="Menu" 
          >
            <ul>
                { menus.map((menu, index) => (
                  <NavList
                  key={index}
                  data={{ name: menu.name, href: menu.href }} 
                  />
                ))}
            </ul>
          </nav> */}
          <div className='inline-flex items-center gap-4'>
            <Button />
            <HamburgerMenu />
          </div>
      </div>
    </motion.header>
  )
}

export default Header