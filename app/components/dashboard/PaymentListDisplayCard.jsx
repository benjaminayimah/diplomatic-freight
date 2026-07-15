import React from 'react'
import {
  BuildingLibraryIcon,
  WalletIcon,
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
        className="h-9 border border-red-100 hover:bg-red-50 gap-1 text-sm rounded-3xl flex justify-center items-center px-3 md:px-0 md:w-9"
      >
        <svg height="16" viewBox="0 0 15 16.001">
          <path d="M-4749.25-716a2.286,2.286,0,0,1-1.562-.668,2.153,2.153,0,0,1-.688-1.514v-9.455h-.75a.739.739,0,0,1-.75-.728.74.74,0,0,1,.75-.728h3v-.726a2.154,2.154,0,0,1,.688-1.515A2.286,2.286,0,0,1-4747-732h3a2.286,2.286,0,0,1,1.562.668,2.154,2.154,0,0,1,.688,1.515v.726h3a.74.74,0,0,1,.75.728.739.739,0,0,1-.75.728h-.749v9.455a2.15,2.15,0,0,1-.689,1.514,2.286,2.286,0,0,1-1.562.668Zm-.75-2.182a.733.733,0,0,0,.249.485.775.775,0,0,0,.5.241h7.5a.773.773,0,0,0,.5-.241.732.732,0,0,0,.25-.485v-9.455h-9Zm2.5-12.123a.739.739,0,0,0-.25.487v.726h4.5v-.726a.739.739,0,0,0-.25-.487.774.774,0,0,0-.5-.241h-3A.774.774,0,0,0-4747.5-730.3Zm2.75,9.941v-4.365a.739.739,0,0,1,.75-.726.739.739,0,0,1,.75.726v4.365a.739.739,0,0,1-.75.726A.739.739,0,0,1-4744.75-720.363Zm-3,0v-4.365a.739.739,0,0,1,.75-.726.739.739,0,0,1,.75.726v4.365a.739.739,0,0,1-.75.726A.739.739,0,0,1-4747.75-720.363Z" transform="translate(4753 732.001)" fill="#ef4444"/>
        </svg>
        <span className='text-red-500 font-medium md:hidden'>Delete</span>
      </button>
    </li>
  )
}

export default PaymentListDisplayCard