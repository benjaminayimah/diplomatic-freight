'use client'

import React from 'react'
import NavItem from './NavItem'
import { useAuthStore } from "@/store/authStore";
import Link from 'next/link';


const menus = [
  { name: 'Home', href: '/app'},
  { name: 'All Invoice', href: '/app/all-invoice'},
  { name: 'All Receipt', href: '/app/all-receipt'},
  { name: 'Quotes', href: '/app/quotes'},
  { name: 'Subscribers', href: '/app/subscribers'},
  { name: 'Company Info', href: '/app/company-info'}
]


function Nav() {

  const isAuth = useAuthStore((state) => state.isAuth)

  if (!isAuth) 
  return
  
  return (
    <nav datatype="auth" className='px-5 py-2 flex flex-col sm:flex-row sm:justify-between border-b border-gray-100 bg-white/40 backdrop-blur-[6.5px] gap-4'>
      <ul className='flex gap-2 flex-wrap items-start'>
        {
          menus.map((item, index) => (
            <NavItem key={index} item={item} />
          ))
        }
      </ul>
      <div className='flex gap-2 h-10.5'>
        <Link href={'/app/create-receipt'} className='myHover-translate bg-gray-200 text-black px-4 py-2.5 text-[0.88rem] rounded-4xl font-medium whitespace-nowrap w-full sm:w-auto text-center flex items-center justify-center gap-1'>
          <svg height="18" viewBox="0 0 22 22">
            <path d="M-3453.778-81.221A10.928,10.928,0,0,1-3457-89a10.924,10.924,0,0,1,3.222-7.778A10.926,10.926,0,0,1-3446-100a10.928,10.928,0,0,1,7.779,3.222A10.927,10.927,0,0,1-3435-89a10.931,10.931,0,0,1-3.221,7.779A10.931,10.931,0,0,1-3446-78,10.929,10.929,0,0,1-3453.778-81.221ZM-3455-89a9.01,9.01,0,0,0,9,9,9.01,9.01,0,0,0,9-9,9.01,9.01,0,0,0-9-9A9.01,9.01,0,0,0-3455-89Zm8,4v-3h-3a1,1,0,0,1-1-1,1,1,0,0,1,1-1h3v-3a1,1,0,0,1,1-1,1,1,0,0,1,1,1v3h3a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-3v3a1,1,0,0,1-1,1A1,1,0,0,1-3447-85Z" transform="translate(3457 100)"/>
          </svg>
          New Receipt
        </Link>
        <Link href={'/app/create-invoice'} className='myHover-translate bg-black text-white px-4 py-2.5 text-[0.88rem] rounded-4xl font-medium flex items-center gap-1 whitespace-nowrap w-full sm:w-auto justify-center'>
        <svg height="18" viewBox="0 0 22 22">
          <path d="M-3453.778-81.221A10.928,10.928,0,0,1-3457-89a10.924,10.924,0,0,1,3.222-7.778A10.926,10.926,0,0,1-3446-100a10.928,10.928,0,0,1,7.779,3.222A10.927,10.927,0,0,1-3435-89a10.931,10.931,0,0,1-3.221,7.779A10.931,10.931,0,0,1-3446-78,10.929,10.929,0,0,1-3453.778-81.221ZM-3455-89a9.01,9.01,0,0,0,9,9,9.01,9.01,0,0,0,9-9,9.01,9.01,0,0,0-9-9A9.01,9.01,0,0,0-3455-89Zm8,4v-3h-3a1,1,0,0,1-1-1,1,1,0,0,1,1-1h3v-3a1,1,0,0,1,1-1,1,1,0,0,1,1,1v3h3a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-3v3a1,1,0,0,1-1,1A1,1,0,0,1-3447-85Z" transform="translate(3457 100)" fill='white'/>
        </svg>
          New Invoice
        </Link>
      </div>
    </nav>
  )
}

export default Nav