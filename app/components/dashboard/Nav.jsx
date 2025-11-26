'use client'

import React from 'react'
import NavItem from './NavItem'
import Link from 'next/link'
import { useAuthStore } from "@/store/authStore";


const menus = [
  { name: 'Home', href: '/app'},
  { name: 'All Invoice', href: '/app/all-invoice'},
  { name: 'Quotes', href: '/app/quotes'},
  { name: 'Subscribers', href: '/app/subscribers'},
  { name: 'Company Info', href: '/app/company-info'}
]


function Nav() {

  const isAuth = useAuthStore((state) => state.isAuth)

  if (!isAuth) 
  return
  
  return (
    <nav datatype="auth" className='px-5 py-2 flex items-center justify-between border-b border-gray-100 bg-white/40 backdrop-blur-[6.5px]'>
      <ul className='flex gap-2'>
        {
          menus.map((item, index) => (
            <NavItem key={index} item={item} />
          ))
        }
      </ul>
      <div>
        <Link href={'/app/create-invoice'} className='myHover-translate bg-black text-white px-4 py-2.5 text-[0.88rem] rounded-4xl font-medium inline-block'>Create invoice</Link>
      </div>
    </nav>
  )
}

export default Nav