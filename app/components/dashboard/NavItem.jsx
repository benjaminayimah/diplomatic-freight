'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation";

function NavItem({item}) {

  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <li >
      <Link
        href={item.href}
        className={`inline-block text-[0.88rem] whitespace-nowrap font-medium py-2 px-4 border rounded-3xl transition duration-300 ${isActive ? "bg-blue-50 text-blue-600 border-blue-300" : "border-gray-300 hover:bg-gray-100 bg-white"}`}
        >
        {item.name}
      </Link>
    </li>
  )
}

export default NavItem