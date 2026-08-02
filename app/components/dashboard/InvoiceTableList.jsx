import React, { useState } from 'react'
import Link from 'next/link';
import { useFormatter } from '@/hooks/useFormatter'
import DropdownMenu from './DropdownMenu';
import FileProfileIcon from './FileProfileIcon'
import Menu from './HamburgerMenu'
import {
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
  EyeIcon,
  PencilIcon,
  ReceiptPercentIcon,
  TrashIcon
} from "@heroicons/react/24/outline";


function InvoiceTableList({ invoice, onDelete, onClick }) {

  const { dateFormat } = useFormatter()

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <li className='group border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300 inline-block w-full'>
      <div className='flex'>
        <Link href={`/app/invoice/${invoice?.id}`} className='py-3.5 p-4 flex gap-3 flex-1 items-center'>
          <FileProfileIcon
            icon={DocumentTextIcon} 
            color={invoice.color}
          />
          <div className='flex flex-col max-w-125'>
            <div className='flex gap-1 flex-wrap'>
              <span className='clamp clamp-line-1 font-medium'>{invoice?.name || invoice?.reference_number}</span>
            </div>
            <div className='text-sm text-gray-500 flex items-center gap-1.5'>
              <div className="flex gap-1">
                <span className='font-medium hidden md:block'>Invoice no.:</span><span>{invoice?.reference_number}</span>
              </div>
              <span className="font-bold">&middot;</span>
              <div className="flex gap-1">
                <span className='font-medium hidden md:block'>Created:</span><span>{dateFormat(invoice?.createdAt)}</span>
              </div>
            </div>
          </div>
          {
            invoice?.personal_note && (
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick(invoice.personal_note);
              }}
              className="flex items-center gap-1 relative px-2 h-7 text-xs rounded-3xl text-black border border-gray-200 bg-gray-100 hover:bg-gray-200">
              <ChatBubbleBottomCenterTextIcon strokeWidth={2} className="h-4 text-blue-600" />
              Note
            </span>
            )
          }
        </Link>
        <div className='grid place-items-center pr-3'>
          <DropdownMenu
            trigger={<Menu menuOpen={menuOpen}/>}
            onOpenChange={setMenuOpen}
            width="w-40"
            >
            <Link
              href={`/app/invoice/${invoice?.id}`}
              className="flex gap-2 px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
            >
              <EyeIcon strokeWidth={2} className="h-5" />
              View
            </Link>
            <Link
              href={`/app/create-invoice?mode=edit&id=${invoice?.id}`}
              className="flex gap-2 px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
            >
              <PencilIcon strokeWidth={2} className="h-5" />
              Edit
            </Link>
            <Link
              href={`/app/create-receipt?mode=generate&id=${invoice?.id}`}
              className="flex gap-2 px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
            >
              <ReceiptPercentIcon strokeWidth={2} className="h-5" />
              Issue Receipt
            </Link>
            <button
              className="flex gap-2 text-red-600 w-full text-left px-4 py-2 hover:bg-red-50 text-sm transition font-medium"
              onClick={() => onDelete(invoice.id)} 
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

export default InvoiceTableList