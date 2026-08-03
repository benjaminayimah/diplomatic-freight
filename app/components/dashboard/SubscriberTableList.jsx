import React, { useState } from 'react'
import { useFormatter } from '@/hooks/useFormatter'
import DropdownMenu from './DropdownMenu';
import FileProfileIcon from "./FileProfileIcon"
import Menu from './HamburgerMenu'
import {
  TrashIcon,
  UserIcon
} from "@heroicons/react/24/outline";


function SubscriberTableList({ subscriber, onDelete }) {

  const [menuOpen, setMenuOpen] = useState(false)

  const { dateFormat } = useFormatter()

  return (
    <li className='py-3.5 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300 inline-block w-full'>
      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <FileProfileIcon
            icon={UserIcon} 
            color={subscriber.color}
            styles={'rounded-full'}
          />
          <div className='flex flex-col'>
            <div>
              <span className="font-medium">{subscriber?.email}</span>
            </div>
            <div className='text-sm text-gray-500 flex gap-1'>
              <span className='font-medium hidden md:block'>Subscribed on:</span><span>{dateFormat(subscriber?.createdAt)}</span>
            </div>
          </div>
        </div>
        <div>
          <DropdownMenu
            trigger={<Menu menuOpen={menuOpen}/>}
            onOpenChange={setMenuOpen}
            width="w-30"
            >
              <button
                className="flex gap-2 text-red-600 w-full text-left px-3 py-2 hover:bg-red-50 text-sm transition font-medium"
                onClick={() => onDelete(subscriber.id)} 
              >
                <TrashIcon strokeWidth={2} className="h-5" />
                Delete
              </button>
            </DropdownMenu>
        </div>
      </div>
    </li>
  )
}

export default SubscriberTableList