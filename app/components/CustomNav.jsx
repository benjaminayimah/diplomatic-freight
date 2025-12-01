'use client'

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import Link from 'next/link';
import { useUIStore } from "../../store"




function Nav({ links }) {
  const { device, mobileMenu } = useUIStore()
  
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0
  })
  

  return (
    <nav
      datatype="website"
      id='menu'
        className={`flex items-center ${mobileMenu ? 'menu-open' : 'menu-close'}` }
        aria-label="Menu" 
      >
      <ul
        onMouseLeave={() => {
          setPosition(prev => ({
            ...prev,
            opacity: 0,
          }))
        }}
        className="relative"
      >
        { links.map((link) => (
          <li key={link.name} className={`h-full inline-flex items-center justify-center group`}>
            <Tab href={link.href} setPosition={setPosition}>
              {link.name}
            </Tab>
          </li>
        ))}
        <Cursor position={position} />
      </ul>
    </nav>
  )
}

export default Nav


function Tab({ children, href, setPosition }) {
  const ref = useRef(null)

  return (
    <Link
      ref={ref}
      href={href}
      onMouseEnter={() => {
        if (!ref.current) return
        const { width } = ref.current.getBoundingClientRect()
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft
        })
      }}
      className="flex h-full items-center whitespace-nowrap transition-colors duration-300 px-4 md:px-6 py-2 text-base font-medium"
    >
      {children}
    </Link>
  )
}



function Cursor({ position }) {
  return (
    <motion.span
      className="block absolute"
      animate={position}
      transition={{ type: 'spring', bounce: 0.3 }}
    />
  )
}
