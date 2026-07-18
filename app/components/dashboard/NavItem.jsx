'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation";

function NavItem({item}) {

  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <li >
      <Link
        href={item.href}
        className={`flex gap-1 text-[0.88rem] whitespace-nowrap font-semibold py-2 px-3.5 rounded-3xl transition duration-300 ${isActive ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-600"}`}
        >
          {Icon && <Icon className="text-base h-5" />}
          {item.name}
      </Link>
    </li>
  )
}

export default NavItem