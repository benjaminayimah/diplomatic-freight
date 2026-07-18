import React from 'react'
import {
  BuildingLibraryIcon,
  WalletIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

function PaymentListDisplayCard({data, onToggle}) {
  return (
    <li className="bg-white px-3 py-2 border border-gray-200 rounded-xl select-none flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        { data?.payment_method === "bank_transfer" && (
          <>
            <div className="flex items-center justify-center h-9 w-9 rounded-lg border border-blue-100 bg-blue-50">
              <BuildingLibraryIcon strokeWidth={1.5} className="text-base h-5 text-blue-600" />
            </div>
            <div>
              <div>{data.bank_name}</div>
              <div className="text-sm text-gray-600"><code>{data.account_number}</code></div>
            </div>
          </>
        )}
        { data?.payment_method === "usdt_wallet" && (
          <>
            <div className="flex items-center justify-center h-9 w-9 rounded-lg border border-teal-100 bg-teal-50">
              <WalletIcon strokeWidth={1.5} className="text-base h-5 text-teal-600" />
            </div>
            <div>
              <div className="uppercase">{data.network}</div>
              <div className="text-sm text-gray-600"><code>{data.wallet_address}</code></div>
            </div>
          </>
        )}
      </div>
      <button
        type="button"
        onClick={onToggle}
        className="h-9 border border-red-100 text-red-500 hover:bg-red-50 gap-1 text-sm rounded-3xl flex justify-center items-center px-3 md:px-0 md:w-9"
      >
        <TrashIcon className="h-4.5" />
        <span className='font-medium md:hidden'>Delete</span>
      </button>
    </li>
  )
}

export default PaymentListDisplayCard