import React from 'react'
import Link from 'next/link';
import { useFormatter } from '@/hooks/useFormatter'
import DropdownMenu from './DropdownMenu';


function ReceiptTableList({ receipt, onDelete }) {

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
        >
          <div className='flex justify-between'>
            <Link href={`/app/receipt/${receipt?.id}`} className='flex gap-3 cursor-pointer'>
              <div className='h-11 w-11 rounded-3xl bg-purple-50 border border-purple-100 grid place-items-center'>
                <svg height="20" viewBox="0 0 16 20.001">
                  <path className='fill-purple-600' d="M-3514-93h-8a3,3,0,0,1-3-3v-2a1,1,0,0,1,1-1,1.986,1.986,0,0,0,1.414-.586A1.987,1.987,0,0,0-3522-101a1.987,1.987,0,0,0-.586-1.415A1.989,1.989,0,0,0-3524-103a1,1,0,0,1-1-1v-2a2.981,2.981,0,0,1,.879-2.121A2.98,2.98,0,0,1-3522-109h14a2.981,2.981,0,0,1,2.121.878A2.981,2.981,0,0,1-3505-106v2a1,1,0,0,1-1,1,1.99,1.99,0,0,0-1.415.585A1.986,1.986,0,0,0-3508-101a1.986,1.986,0,0,0,.586,1.414A1.987,1.987,0,0,0-3506-99a1,1,0,0,1,1,1v2a2.978,2.978,0,0,1-.879,2.121A2.978,2.978,0,0,1-3508-93Zm6-2a.993.993,0,0,0,.707-.292A.993.993,0,0,0-3507-96v-1.125a3.972,3.972,0,0,1-1.828-1.047A3.97,3.97,0,0,1-3510-101a3.974,3.974,0,0,1,1.172-2.829,3.971,3.971,0,0,1,1.828-1.046V-106a.99.99,0,0,0-.292-.706A.994.994,0,0,0-3508-107h-5v1a1,1,0,0,1-1,1,1,1,0,0,1-1-1v-1h-7a1,1,0,0,0-.708.293A.99.99,0,0,0-3523-106v1.126a3.971,3.971,0,0,1,1.828,1.046A3.973,3.973,0,0,1-3520-101a3.97,3.97,0,0,1-1.172,2.828A3.972,3.972,0,0,1-3523-97.125V-96a1,1,0,0,0,1,1h7v-1a1,1,0,0,1,1-1,1,1,0,0,1,1,1v1Zm-7-5v-2a1,1,0,0,1,1-1,1,1,0,0,1,1,1v2a1,1,0,0,1-1,1A1,1,0,0,1-3515-100Z" transform="translate(-93 3525) rotate(90)"/>
                </svg>
              </div>
              <div className='flex flex-col'>
                <div className='group-hover:underline flex gap-1 flex-wrap'>
                  { receipt?.name && <span className='font-medium'>{receipt?.name}</span>}
                  <span className='font-normal'>[{receipt?.receipt_number}]</span>
                </div>
                <div className='text-sm text-gray-500'><span className='font-medium'>Date created: </span><span>{dateFormat(receipt?.createdAt)}</span></div>
              </div>
            </Link>
            <div>
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
      </div>
    </li>
  )
}

export default ReceiptTableList