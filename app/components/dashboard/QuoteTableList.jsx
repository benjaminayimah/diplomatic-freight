import React from 'react'
import Link from 'next/link';
import { useFormatter } from '@/hooks/useFormatter'
import DropdownMenu from './DropdownMenu';


function QuoteTableList({ quote, onDelete }) {

  const { dateFormat } = useFormatter()

  const Menu = (
    <button type='button' className='h-10 w-10 rounded-3xl grid place-items-center hover:bg-gray-100 transition-all duration-300'>
      <svg height="3.3" viewBox="0 0 17 3.334">
        <path d="M-1977.333,1.667A1.667,1.667,0,0,1-1975.667,0,1.667,1.667,0,0,1-1974,1.667a1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1977.333,1.667Zm-6.834,0A1.667,1.667,0,0,1-1982.5,0a1.667,1.667,0,0,1,1.667,1.667,1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1984.167,1.667Zm-6.833,0A1.667,1.667,0,0,1-1989.333,0a1.667,1.667,0,0,1,1.667,1.667,1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1991,1.667Z" transform="translate(1991)" fill="#5a5a5a"/>
      </svg>
    </button>
  )
// href={`/app/quote/${quote?.id}`}
  return (
    <li className='group'>
      <div className='p-5 border border-gray-200 hover:bg-gray-50 transition-colors duration-300 inline-block w-full rounded-[10px]'
        >
          <div className='flex justify-between'>
            <Link href={`/app/quote/${quote?.id}`} className='flex gap-3 cursor-pointer'>
              <div className='h-11 w-11 rounded-3xl bg-amber-50 border border-amber-100 grid place-items-center'>
                <svg height="20" viewBox="0 0 20 22">
                  <path className='fill-amber-600' d="M-3673,130a1,1,0,0,1-1-1,1,1,0,0,1,1-1h14a1,1,0,0,0,.708-.292A.992.992,0,0,0-3658,127V116h-5a1,1,0,0,1-1-1v-5h-7a.99.99,0,0,0-.707.293A.991.991,0,0,0-3672,111v4a1,1,0,0,1-1,1,1,1,0,0,1-1-1v-4a2.976,2.976,0,0,1,.879-2.121A2.979,2.979,0,0,1-3671,108h8.5a1,1,0,0,1,.708.293l5.5,5.5a1,1,0,0,1,.292.708V127a2.983,2.983,0,0,1-.878,2.122A2.982,2.982,0,0,1-3659,130Zm11-16h3.086l-3.086-3.086Zm-6.707,11.707a1,1,0,0,1,0-1.414l1.294-1.293H-3675a1,1,0,0,1-1-1,1,1,0,0,1,1-1h7.586l-1.293-1.293a1,1,0,0,1,0-1.414,1,1,0,0,1,1.414,0l3,3c.022.022.043.045.063.069l0,0,.011.014,0,.006.01.012.006.008.008.011.007.01.006.009.009.013,0,.005.011.017v0A1,1,0,0,1-3664,122a1,1,0,0,1-.293.707h0l-3,3A1,1,0,0,1-3668,126,1,1,0,0,1-3668.707,125.707Z" transform="translate(3676 -108)"/>
                </svg>
              </div>
              <div className='flex flex-col'>
                <div className='group-hover:underline'>
                  <span className='font-medium'>{quote?.name}</span>
                </div>
                <div className='text-sm text-gray-500'><span className='font-medium'>Date requested: </span><span>{dateFormat(quote?.createdAt)}</span></div>
              </div>
            </Link>
            <div>
              <DropdownMenu trigger={Menu}>
                  <Link
                    href={`/app/quote/${quote?.id}`}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
                  >
                    View
                  </Link>
                  <button
                    className="block text-red-600 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
                    onClick={() => onDelete(quote.id)} 
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

export default QuoteTableList