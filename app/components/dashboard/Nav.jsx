'use client'

import React from 'react'
import NavItem from './NavItem'
import { useAuthStore } from "@/store/authStore";
import Link from 'next/link';
import DropdownMenu from './DropdownMenu';
import {
  HomeIcon as HomeOutlineIcon,
  DocumentTextIcon as DocumentTextOutlineIcon,
  ReceiptPercentIcon as ReceiptPercentOutlineIcon,
  DocumentDuplicateIcon as DocumentDuplicateOutlineIcon,
  UsersIcon as UsersOutlineIcon,
  ChevronDownIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

import {
  HomeIcon as HomeSolidIcon,
  DocumentTextIcon as DocumentTextSolidIcon,
  ReceiptPercentIcon as ReceiptPercentSolidIcon,
  DocumentDuplicateIcon as DocumentDuplicateSolidIcon,
  UsersIcon as UsersSolidIcon,
} from "@heroicons/react/24/solid";


const menus = [
  { name: 'Home', href: '/app', icon: HomeOutlineIcon, activeIcon: HomeSolidIcon},
  { name: 'Invoices', href: '/app/all-invoice', icon: DocumentTextOutlineIcon, activeIcon: DocumentTextSolidIcon},
  { name: 'Receipts', href: '/app/all-receipt', icon: ReceiptPercentOutlineIcon, activeIcon: ReceiptPercentSolidIcon},
  { name: 'Quotes', href: '/app/quotes', icon: DocumentDuplicateOutlineIcon, activeIcon: DocumentDuplicateSolidIcon},
  { name: 'Subscribers', href: '/app/subscribers', icon: UsersOutlineIcon, activeIcon: UsersSolidIcon},
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
    <nav datatype="auth" className='border-b h-14.75 border-gray-100 bg-white/40 backdrop-blur-[6.5px] change-color'>
      <div className="flex items-center gap-3 pr-5 py-2 bg-white/40 change-color">
        <div className="flex-1 overflow-hidden relative">
          <ul className='flex gap-2 overflow-x-auto whitespace-nowrap min-w-0 scroll-hidden pl-5 pr-6'>
            {
              menus.map((item, index) => (
                <NavItem key={index} item={item} />
              ))
            }
          </ul>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-linear-to-l from-white to-transparent change-color" />
          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-linear-to-r from-white to-transparent change-color" />
        </div>
        <div>
          <DropdownMenu trigger={CreateButton} placement="bottom" width="w-34">
            <Link
              href={'/app/create-invoice'}
              className="flex items-center gap-1.5 px-3 py-2 hover:bg-gray-100 text-sm font-medium transition shrink-0"
            >
              <DocumentTextOutlineIcon strokeWidth={2} className="h-5"/>
              Invoice
            </Link>
            <div className="border-b border-b-gray-200/80 my-1.5 mx-2" />
            <Link
              href={'/app/create-receipt'}
              className="flex items-center gap-1.5 px-3 py-2 hover:bg-gray-100 text-sm font-medium transition shrink-0"
            >
              <ReceiptPercentOutlineIcon strokeWidth={2} className="h-5" />
              Receipt
            </Link>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

export default Nav