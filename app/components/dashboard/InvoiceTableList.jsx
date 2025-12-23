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
            <Link href={`/app/invoice/${invoice?.id}`} className='flex gap-3 cursor-pointer'>
              <div className='h-11 w-11 rounded-3xl bg-blue-50 border border-blue-100 grid place-items-center'>
                <svg height="20" viewBox="0 0 18 22">
                  <path className='fill-blue-600' d="M-3633,131a2.981,2.981,0,0,1-2.122-.879A2.979,2.979,0,0,1-3636,128V112a2.98,2.98,0,0,1,.879-2.122A2.981,2.981,0,0,1-3633,109h8.5a1,1,0,0,1,.707.293l5.5,5.5a1,1,0,0,1,.293.707V128a2.978,2.978,0,0,1-.879,2.121A2.979,2.979,0,0,1-3621,131Zm-.707-19.707A.994.994,0,0,0-3634,112v16a.993.993,0,0,0,.293.706A.994.994,0,0,0-3633,129h12a.994.994,0,0,0,.707-.293A.992.992,0,0,0-3620,128V117h-5a1,1,0,0,1-1-1v-5h-7A.994.994,0,0,0-3633.707,111.293ZM-3624,115h3.085l-3.085-3.085Zm-1,11a1,1,0,0,1-1-1,1,1,0,0,1,1-1h2a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm-6,0a1,1,0,0,1-1-1,1,1,0,0,1,1-1h2a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm6-4a1,1,0,0,1-1-1,1,1,0,0,1,1-1h2a1,1,0,0,1,1,1,1,1,0,0,1-1,1Zm-6,0a1,1,0,0,1-1-1,1,1,0,0,1,1-1h2a1,1,0,0,1,1,1,1,1,0,0,1-1,1Z" transform="translate(3636 -109)"/>
                </svg>
              </div>
              <div className='flex flex-col'>
                <div className='group-hover:underline flex gap-1 flex-wrap'>
                  { invoice?.name && <span className='font-medium'>{invoice?.name}</span>}
                  <span className='font-normal'>[{invoice?.reference_number}]</span>
                </div>
                <div className='text-sm text-gray-500'><span className='font-medium'>Date created: </span><span>{dateFormat(invoice?.createdAt)}</span></div>
              </div>
            </Link>
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
                  <Link
                    href={`/app/create-receipt?mode=generate&id=${invoice?.id}`}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
                  >
                    Generate receipt
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