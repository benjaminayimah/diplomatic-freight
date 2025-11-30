import React from 'react'
import Link from 'next/link';
import { useFormatter } from '@/hooks/useFormatter'
import DropdownMenu from './DropdownMenu';


function InvoiceTableList({ invoice, onDelete }) {

  const { dateFormat } = useFormatter()

  const Menu = (
    <button type='button' className='h-10 w-10 rounded-3xl grid place-items-center hover:bg-gray-100 transition-all duration-300'>
      <svg height="3.3" viewBox="0 0 17 3.334">
        <path d="M-1977.333,1.667A1.667,1.667,0,0,1-1975.667,0,1.667,1.667,0,0,1-1974,1.667a1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1977.333,1.667Zm-6.834,0A1.667,1.667,0,0,1-1982.5,0a1.667,1.667,0,0,1,1.667,1.667,1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1984.167,1.667Zm-6.833,0A1.667,1.667,0,0,1-1989.333,0a1.667,1.667,0,0,1,1.667,1.667,1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1991,1.667Z" transform="translate(1991)" fill="#5a5a5a"/>
      </svg>
    </button>
  )

  return (
    <li className='group'>
      <div className='p-5 border border-gray-200 hover:bg-gray-50 transition-colors duration-300 inline-block w-full rounded-[10px]'
        // href={`/app/invoice/${invoice?.id}`}
        >
          <div className='flex justify-between'>
            <div>
              <Link href={`/app/invoice/${invoice?.id}`} className='font-medium group-hover:underline'>
                <span>{invoice?.name} </span>
                <span>[{invoice?.reference_number}]</span>
              </Link>
              <div className='text-sm text-gray-500'><span className='font-medium'>Date created: </span><span>{dateFormat(invoice?.createdAt)}</span></div>
            </div>
            <div>
              <DropdownMenu trigger={Menu}>
                  <Link
                    href={`/app/invoice/${invoice?.id}`}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
                  >
                    View
                  </Link>
                  <Link
                    href={`/app/create-invoice?mode=edit&id=${invoice?.id}`}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    className="block text-red-600 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
                    onClick={() => onDelete(invoice.id)} 
                  >
                    Delete
                  </button>
                </DropdownMenu>
            </div>
          </div>
      </div>
    </li>
  )
}

export default InvoiceTableList