import React from 'react'
import Link from 'next/link';
import { useFormatter } from '@/hooks/useFormatter'
import DropdownMenu from './DropdownMenu';
import FileProfileIcon from './FileProfileIcon'
import {
  DocumentDuplicateIcon,
  EyeIcon,
  TrashIcon
} from "@heroicons/react/24/outline";


function QuoteTableList({ quote, onDelete }) {

  const { dateFormat } = useFormatter()

  const Menu = (
    <button type='button' className='h-10 w-10 rounded-3xl grid place-items-center hover:bg-gray-100 transition-all duration-300'>
      <svg height="3" viewBox="0 0 17 3.334">
        <path className="group-hover:fill-black" d="M-1977.333,1.667A1.667,1.667,0,0,1-1975.667,0,1.667,1.667,0,0,1-1974,1.667a1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1977.333,1.667Zm-6.834,0A1.667,1.667,0,0,1-1982.5,0a1.667,1.667,0,0,1,1.667,1.667,1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1984.167,1.667Zm-6.833,0A1.667,1.667,0,0,1-1989.333,0a1.667,1.667,0,0,1,1.667,1.667,1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1991,1.667Z" transform="translate(1991)" fill="#5a5a5a"/>
      </svg>
    </button>
  )
// href={`/app/quote/${quote?.id}`}
  return (
    <li className='group border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300 inline-block w-full'>
        <div className='flex'>
          <Link href={`/app/quote/${quote?.id}`} className='py-3.4 p-4 flex flex-1 gap-3 items-center'>
            <FileProfileIcon
              icon={DocumentDuplicateIcon} 
              color={quote.color}
            />
            <div className='flex flex-col max-w-125'>
              <div>
                <span className='clamp clamp-line-1 font-medium'>{quote?.name}</span>
              </div>
              <div className='text-sm text-gray-500 flex gap-1'>
                <span className='font-medium hidden md:inline-block'>Requested on:</span><span>{dateFormat(quote?.createdAt)}</span>
              </div>
            </div>
          </Link>
          <div className='grid place-items-center pr-3'>
            <DropdownMenu trigger={Menu} width="w-30">
                <Link
                  href={`/app/quote/${quote?.id}`}
                  className="flex gap-2 px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
                >
                  <EyeIcon strokeWidth={2} className="h-5" />
                  View
                </Link>
                <button
                  className="flex gap-2 text-red-600 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
                  onClick={() => onDelete(quote.id)} 
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

export default QuoteTableList