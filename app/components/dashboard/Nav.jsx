'use client'

import React from 'react'
import NavItem from './NavItem'
import { useAuthStore } from "@/store/authStore";
import Link from 'next/link';
import DropdownMenu from './DropdownMenu';
import {
  HomeIcon,
  DocumentTextIcon,
  ReceiptPercentIcon,
  DocumentDuplicateIcon,
  UsersIcon,
  ChevronDownIcon,
  PlusIcon
} from "@heroicons/react/24/outline";


const menus = [
  { name: 'Home', href: '/app', icon: HomeIcon},
  { name: 'Invoices', href: '/app/all-invoice', icon: DocumentTextIcon},
  { name: 'Receipts', href: '/app/all-receipt', icon: ReceiptPercentIcon},
  { name: 'Quotes', href: '/app/quotes', icon: DocumentDuplicateIcon},
  { name: 'Subscribers', href: '/app/subscribers', icon: UsersIcon},
]


function Nav() {

  const CreateButton = (
    <button className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-3 md:px-4 py-2.5 text-[0.88rem] rounded-4xl font-semibold flex items-center gap-1 whitespace-nowrap justify-center shrink-0">
      <PlusIcon strokeWidth={2} className="h-5 shrink-0" />
      <span className="hidden md:inline">Create...</span>
      <ChevronDownIcon strokeWidth={2} className="h-3.5 shrink-0 hidden md:block" />
    </button>
  );

  const isAuth = useAuthStore((state) => state.isAuth)

  if (!isAuth) 
  return
  
  return (
    <nav datatype="auth" className='border-b h-14.75 border-gray-100 bg-white/40 backdrop-blur-[6.5px]'>
      <div className="flex items-center gap-3 px-5 py-2">
        <div className="flex-1 overflow-hidden relative">
          <ul className='flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide min-w-0'>
            {
              menus.map((item, index) => (
                <NavItem key={index} item={item} />
              ))
            }
          </ul>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent" />
        </div>
        <div>
          <DropdownMenu trigger={CreateButton} width="w-34">
            <Link
              href={'/app/create-invoice'}
              className="flex items-center gap-1.5 px-4 py-2 hover:bg-gray-100 text-sm font-medium transition shrink-0"
            >
              <DocumentTextIcon strokeWidth={2} className="h-5"/>
              Invoice
            </Link>
            <Link
              href={'/app/create-receipt'}
              className="flex items-center gap-1.5 px-4 py-2 hover:bg-gray-100 text-sm font-medium transition shrink-0"
            >
              <ReceiptPercentIcon strokeWidth={2} className="h-5" />
              Receipt
            </Link>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

export default Nav