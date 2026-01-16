import React from 'react'
import { QRCodeCanvas } from "qrcode.react";

function BankCard({data, onEdit, onDelete}) {
  return (
      <div className="bank-col flex-1">
        <div className="px-6 py-2 border bg-white border-gray-200 rounded-2xl">
          <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
            <span className="font-semibold">Payment method</span>
            <div className="text-gray-600 md:text-right uppercase text-sm">{data?.payment_method?.replace("_", " ")}</div>
          </div>
          {
            data?.payment_method === 'bank_transfer' && (
              <>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Bank name</span>
                  <div className="text-gray-600 md:text-right">{data?.bank_name || 'N/A'}</div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Bank branch</span>
                  <div className="text-gray-600 md:text-right">{data?.bank_branch || 'N/A'}</div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Account name</span>
                  <div className="text-gray-600 md:text-right">{data?.account_name || 'N/A'}</div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Account number</span>
                  <div className="text-gray-600 md:text-right">{data?.account_number || 'N/A'}</div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">SWIFT code</span>
                  <div className="text-gray-600 md:text-right">{data?.swift_code || 'N/A'}</div>
                </div>
              </>
            )
          }
          { data?.payment_method === 'usdt_wallet' && (
            <>
              <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                <span className="font-semibold">Wallet address</span>
                <div className="text-gray-600 md:text-right">{data?.wallet_address || 'N/A'}</div>
              </div>
              <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                <span className="font-semibold">Network</span>
                <div className="text-gray-600 md:text-right">{data?.network || 'N/A'}</div>
              </div>
              <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                <span className="font-semibold">QR code</span>
                <div className="text-gray-600 md:text-right">
                  <QRCodeCanvas
                    value={data?.qr_code  || 'https://example.com/verify-invoice'}
                    size={70}
                  />
                </div>
              </div>
            </>
          )}
          
          <div className="flex gap-2 py-5 justify-end">
            <button
              onClick={() => onEdit(data)}
              className="myHover-translate inline-block text-[0.88rem] font-semibold py-2 px-4 border bg-gray-50 border-gray-300 transition duration-300 hover:bg-gray-200 rounded-3xl"
            >
              Edit payment
            </button>
            <button
              onClick={() => onDelete(data.id)} 
              className="myHover-translate inline-block text-[0.88rem] font-semibold py-2 px-4 border bg-red-50 border-red-300 transition duration-300 hover:bg-red-200 rounded-3xl"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
  )
}

export default BankCard