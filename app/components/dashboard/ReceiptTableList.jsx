import React from 'react'
import Link from 'next/link';
import { useFormatter } from '@/hooks/useFormatter'
import DropdownMenu from './DropdownMenu';
import FileProfileIcon from './FileProfileIcon'
import {
  EyeIcon,
  ReceiptPercentIcon,
  TrashIcon
} from "@heroicons/react/24/outline";



function ReceiptTableList({ receipt, onDelete }) {

  const { dateFormat } = useFormatter()

  const Menu = (
    <button type='button' className='h-10 w-10 rounded-3xl grid place-items-center hover:bg-gray-100 transition-all duration-300'>
      <svg height="3" viewBox="0 0 17 3.334">
        <path className="group-hover:fill-black" d="M-1977.333,1.667A1.667,1.667,0,0,1-1975.667,0,1.667,1.667,0,0,1-1974,1.667a1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1977.333,1.667Zm-6.834,0A1.667,1.667,0,0,1-1982.5,0a1.667,1.667,0,0,1,1.667,1.667,1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1984.167,1.667Zm-6.833,0A1.667,1.667,0,0,1-1989.333,0a1.667,1.667,0,0,1,1.667,1.667,1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1991,1.667Z" transform="translate(1991)" fill="#5a5a5a"/>
      </svg>
    </button>
  )

  return (
    <li className='group border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300 inline-block w-full'>
      <div className='flex'>
        <Link href={`/app/receipt/${receipt?.id}`} className='py-3.5 p-4 flex flex-1 gap-3 items-center'>
          <FileProfileIcon
            icon={ReceiptPercentIcon} 
            color={receipt.color}
          />
          <div className='flex flex-col max-w-125'>
            <div className='flex gap-1 flex-wrap'>
              <span className='clamp clamp-line-1 font-medium'>{receipt?.name || receipt?.receipt_number}</span>
            </div>
            <div className='text-sm text-gray-500 flex items-center gap-1.5'>
              <div className="flex gap-1">
                <span className='font-medium hidden md:block'>Receipt no.:</span><span>{receipt?.receipt_number}</span>
              </div>
              <span className="font-bold">&middot;</span>
              <div className="flex gap-1">
                <span className='font-medium hidden md:block'>Created:</span><span>{dateFormat(receipt?.createdAt)}</span>
              </div>
            </div>
          </div>
        </Link>
        <div className='grid place-items-center pr-3'>
          <DropdownMenu trigger={Menu} width="w-30">
              <Link
                href={`/app/receipt/${receipt?.id}`}
                className="flex gap-2 px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
              >
                <EyeIcon strokeWidth={2} className="h-5" />
                View
              </Link>
              {/* <Link
                href={`/app/create-receipt?mode=generate&id=${receipt?.id}`}
                className="block px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
              >
                Edit
              </Link> */}
              <button
                className="flex gap-2 text-red-600 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
                onClick={() => onDelete(receipt.id)} 
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

export default ReceiptTableList