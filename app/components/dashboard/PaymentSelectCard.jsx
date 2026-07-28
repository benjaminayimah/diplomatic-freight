import React from 'react'
import {
  BuildingLibraryIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { formatLabel } from "@/utils/wordFormatter.js"


function PaymentSelectCard({data, selectedIDs, onToggle}) {

  const isChecked = selectedIDs.includes(data.id);

  return (
      <li 
        className={`
        border rounded-xl select-none transition-colors
        ${
          isChecked
            ? "border-blue-300 bg-blue-50"
            : "border-gray-200 hover:bg-gray-50"
        }
      `}
        >
        <label
          htmlFor={`payment_${data.id}`}
          className="flex justify-between w-full px-4 py-3 cursor-pointer gap-2"
        >
          <div className="flex items-center gap-2">
          { data?.payment_method === "bank_transfer" && (
            <>
              <div className="flex items-center justify-center h-9 w-9 rounded-lg border border-blue-200 bg-blue-100">
                <BuildingLibraryIcon strokeWidth={1.5} className="text-base h-5 text-blue-600" />
              </div>
              <div>
                <div className="flex gap-1 items-center">
                  <span className="font-medium">{data.bank_name}</span>
                  &middot;
                  <span className="text-sm text-gray-500">{formatLabel(data.payment_method)}</span>
                </div>
                <code className="text-gray-600">{data.account_number}</code>
              </div>
            </>
          )}

          { data?.payment_method === "usdt_wallet" && (
            <>
              <div className="flex items-center justify-center h-9 w-9 rounded-lg border border-teal-200 bg-teal-100">
                <WalletIcon strokeWidth={1.5} className="text-base h-5 text-teal-600" />
              </div>
              <div>
                <div className="flex gap-1 items-center">
                  <span className="font-medium uppercase">{data.network}</span>
                  &middot;
                  <span className="text-sm text-gray-500">{formatLabel(data.payment_method)}</span>
                </div>
                <code className="text-gray-600">{data.wallet_address}</code>
              </div>
            </>
          )}
          </div>
          <input
            id={`payment_${data.id}`}
            type="checkbox"
            checked={isChecked}
            onChange={onToggle}
            className="cursor-pointer"
          />
        </label>
      </li>
  )
}

export default PaymentSelectCard