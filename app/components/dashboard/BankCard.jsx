import React from 'react'
import { QRCodeCanvas } from "qrcode.react";
import { generateWalletQR } from "@/utils/crypto/walletQR";
import DropdownMenu from './DropdownMenu';
import { formatLabel } from "@/utils/wordFormatter.js"
import Link from 'next/link';

import {
  BuildingLibraryIcon,
  WalletIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

function BankCard({data, onEdit, onDelete, showMenu}) {

  const hasInvoice = (data?.invoices?.length ?? 0) > 0;
  const invoiceCount = data?.invoices?.length ?? 0;

  const Menu = (
    <button type='button' className='h-10 w-10 rounded-3xl grid place-items-center hover:bg-gray-100 transition-all duration-300'>
      <svg height="3.3" viewBox="0 0 17 3.334">
        <path d="M-1977.333,1.667A1.667,1.667,0,0,1-1975.667,0,1.667,1.667,0,0,1-1974,1.667a1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1977.333,1.667Zm-6.834,0A1.667,1.667,0,0,1-1982.5,0a1.667,1.667,0,0,1,1.667,1.667,1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1984.167,1.667Zm-6.833,0A1.667,1.667,0,0,1-1989.333,0a1.667,1.667,0,0,1,1.667,1.667,1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1991,1.667Z" transform="translate(1991)" fill="#5a5a5a"/>
      </svg>
    </button>
  )

  return (
      <div className="bank-col flex-1">
        <div className="flex flex-col px-6 py-2 border bg-white border-gray-100 rounded-2xl h-full">
          <div className="flex items-center justify-between">
            <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4">
              <div className="text-gray-600 font-medium uppercase flex items-center gap-2">
                <div className="flex items-center justify-center h-9 w-9 rounded-lg border border-blue-100 bg-blue-50">
                  {
                    data?.payment_method === 'bank_transfer' ? (
                      <div className="flex items-center justify-center h-9 w-9 rounded-lg border border-blue-100 bg-blue-50">
                        <BuildingLibraryIcon strokeWidth={1.5} className="text-base h-6 text-blue-600" />
                      </div>
                    ) : (
                        <div className="flex items-center justify-center h-9 w-9 rounded-lg border border-teal-100 bg-teal-50">
                          <WalletIcon strokeWidth={1.5} className="text-base h-6 text-green-600" />
                        </div>
                    )
                  }
                </div>
                {formatLabel(data?.payment_method)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                {hasInvoice ? (
                  <div className="inline-flex items-center gap-1 text-sm font-base pl-2 pr-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-100">
                    <InformationCircleIcon strokeWidth={1.5} className="h-4 w-4" />
                    <div className="inline-flex gap-1">
                      Used by{" "}
                      <div className="group relative">
                        <span className="underline decoration-dotted underline-offset-3 cursor-pointer text-blue-700">
                          {invoiceCount} {invoiceCount === 1 ? "invoice" : "invoices"}
                        </span>
                        <div className="absolute hidden -right-3 group-hover:block bg-black min-w-35 px-3 py-2 rounded-xl">
                          {data.invoices.map(invoice => (
                            <Link
                              key={invoice.id}
                              href={`/app/invoice/${invoice.id}`}
                              className="text-white block text-xs hover:underline py-1"
                            >
                              {invoice.reference_number}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1 text-sm font-base pl-2 pr-3 py-1 rounded-full bg-gray-100 text-gray-900 border border-gray-200">
                    <InformationCircleIcon strokeWidth={1.5} className="h-4 w-4" />
                    No invoices linked
                  </div>
                )}
              </div>
              {
                showMenu && (
                  <DropdownMenu trigger={Menu}>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
                      onClick={() => onEdit(data)}
                    >
                      Edit
                    </button>
                    <button
                      className="block text-red-600 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
                      onClick={() => onDelete(data.id)}
                    >
                      Delete
                    </button>
                  </DropdownMenu>
                )
              }
            </div>
          </div>
            {
              data?.payment_method === 'bank_transfer' && (
                <>
                  <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-3 border-t border-dashed border-gray-200">
                    <span className="font-medium">Bank Name</span>
                    <div className="text-gray-600 md:text-right">{data?.bank_name || 'N/A'}</div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-3 border-t border-dashed border-gray-200">
                    <span className="font-medium">Account Name</span>
                    <div className="text-gray-600 md:text-right">{data?.account_name || 'N/A'}</div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-3 border-t border-dashed border-gray-200">
                    <span className="font-medium">Account Number</span>
                    <div className="text-gray-600 md:text-right"><code>{data?.account_number || 'N/A'}</code></div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-3 border-t border-dashed border-gray-200">
                    <span className="font-medium">SWIFT Code</span>
                    <div className="text-gray-600 md:text-right"><code>{data?.swift_code || 'N/A'}</code></div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-3 border-t border-dashed border-gray-200">
                    <span className="font-medium">Bank Branch</span>
                    <div className="text-gray-600 md:text-right">{data?.bank_branch || 'N/A'}</div>
                  </div>
                </>
              )
            }
            { data?.payment_method === 'usdt_wallet' && (
              <>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-3 border-t border-dashed border-gray-200">
                  <span className="font-medium">Wallet Address</span>
                  <div className="text-gray-600 md:text-right"><code>{data?.wallet_address || 'N/A'}</code></div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-3 border-t border-dashed border-gray-200">
                  <span className="font-medium">Network</span>
                  <div className="text-gray-600 uppercase md:text-right">{data?.network || 'N/A'}</div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-3 border-t border-dashed border-gray-200">
                  <span className="font-medium">QR Code</span>
                  <div className="text-gray-600 md:text-right">
                    <div className="relative w-fit">
                      <QRCodeCanvas
                        value={generateWalletQR(
                          data?.network,
                          data?.wallet_address
                        )}
                        size={100}
                      />
                      <img
                        src="/usdt-logo.png"
                        alt="USDT"
                        className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
        </div>
      </div>
  )
}

export default BankCard