import React from 'react'
import Link from 'next/link';
import { useFormatter } from '@/hooks/useFormatter'
import DropdownMenu from './DropdownMenu';
import { ReceiptPercentIcon } from "@heroicons/react/24/outline";


function ReceiptTableList({ receipt, onDelete }) {

  const { dateFormat } = useFormatter()

  const Menu = (
    <button type='button' className='h-10 w-10 rounded-3xl grid place-items-center hover:bg-gray-100 transition-all duration-300'>
      <svg height="3" viewBox="0 0 17 3.334">
        <path d="M-1977.333,1.667A1.667,1.667,0,0,1-1975.667,0,1.667,1.667,0,0,1-1974,1.667a1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1977.333,1.667Zm-6.834,0A1.667,1.667,0,0,1-1982.5,0a1.667,1.667,0,0,1,1.667,1.667,1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1984.167,1.667Zm-6.833,0A1.667,1.667,0,0,1-1989.333,0a1.667,1.667,0,0,1,1.667,1.667,1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1991,1.667Z" transform="translate(1991)" fill="#5a5a5a"/>
      </svg>
    </button>
  )

  return (
    <li className='group border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300 inline-block w-full'>
      <div className='flex'>
        <Link href={`/app/receipt/${receipt?.id}`} className='p-4 flex flex-1 gap-3 cursor-pointer'>
          <div className='h-11 w-11 shrink-0 text-purple-600 rounded-3xl bg-purple-50 border border-purple-100 grid place-items-center'>
            <ReceiptPercentIcon strokeWidth={1.5} className="h-6" />
          </div>
          <div className='flex flex-col'>
            <div className='flex gap-1 flex-wrap'>
              <span className='font-medium'>{receipt?.name || receipt?.receipt_number}</span>
            </div>
            <div className='text-sm text-gray-500 flex items-center gap-1.5'>
              <div className="flex gap-1">
                <span className='font-medium'>Date created: </span><span>{dateFormat(receipt?.createdAt)}</span>
              </div>
              &middot;
              <div className="flex gap-1">
                <span className='font-medium'>Receipt no.: </span><span>{receipt?.receipt_number}</span>
              </div>
            </div>
            {/* <div className='text-sm text-gray-500'><span className='font-medium'>Date created: </span><span>{dateFormat(receipt?.createdAt)}</span></div> */}
          </div>
        </Link>
        <div className='grid place-items-center pr-3'>
          <DropdownMenu trigger={Menu}>
              <Link
                href={`/app/receipt/${receipt?.id}`}
                className="block px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
              >
                View
              </Link>
              {/* <Link
                href={`/app/create-receipt?mode=generate&id=${receipt?.id}`}
                className="block px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
              >
                Edit
              </Link> */}
              <button
                className="block text-red-600 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
                onClick={() => onDelete(receipt.id)} 
              >
                Delete
              </button>
            </DropdownMenu>
        </div>
      </div>
    </li>
  )
}

export default ReceiptTableList