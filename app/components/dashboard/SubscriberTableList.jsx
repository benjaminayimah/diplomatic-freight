import React from 'react'
import { useFormatter } from '@/hooks/useFormatter'
import DropdownMenu from './DropdownMenu';


function SubscriberTableList({ subscriber, onDelete }) {

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
            <div className='flex gap-3'>
              <div className='h-11 w-11 rounded-3xl bg-teal-50 border border-teal-100 grid place-items-center'>
                <svg height="20" viewBox="0 0 16 20.001">
                  <path className='fill-teal-600' d="M-3548,121v-2a2.984,2.984,0,0,0-.878-2.121A2.984,2.984,0,0,0-3551,116h-6a2.981,2.981,0,0,0-2.121.878A2.979,2.979,0,0,0-3560,119v2a1,1,0,0,1-1,1,1,1,0,0,1-1-1v-2a4.965,4.965,0,0,1,1.465-3.535A4.967,4.967,0,0,1-3557,114h6a4.967,4.967,0,0,1,3.535,1.464A4.967,4.967,0,0,1-3546,119v2a1,1,0,0,1-1,1A1,1,0,0,1-3548,121Zm-11-14a5.006,5.006,0,0,1,5-5,5.006,5.006,0,0,1,5,5,5.005,5.005,0,0,1-5,5A5.005,5.005,0,0,1-3559,107Zm2,0a3,3,0,0,0,3,3,3,3,0,0,0,3-3,3,3,0,0,0-3-3A3,3,0,0,0-3557,107Z" transform="translate(3562 -102)"/>
                </svg>
              </div>
              <div className='flex flex-col'>
                <div className=''>
                  <span className='font-medium'>{subscriber?.email}</span>
                </div>
                <div className='text-sm text-gray-500'><span className='font-medium'>Date subscribed: </span><span>{dateFormat(subscriber?.createdAt)}</span></div>
              </div>
            </div>
            <div>
              <DropdownMenu trigger={Menu}>
                  <button
                    className="block text-red-600 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
                    onClick={() => onDelete(subscriber.id)} 
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

export default SubscriberTableList