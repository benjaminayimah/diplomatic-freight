'use client'

import React from 'react'
import VerifyFooter from './VerifyFooter';
import { useFormatter } from '@/hooks/useFormatter'

function VerifySuccess({ invoice }) {

  const getTotalAmount = () => {
    const vatRate = Number(invoice?.vat)/100 || 0
    const subtotal = invoice?.items?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const vat = subtotal * vatRate;

    const total = subtotal + vat;
    return total?.toLocaleString("en-US",{ style: "currency", currency: "USD"});
  };

  const { dateFormat } = useFormatter()

  return (
    <section className="app-body-wrapper min-h-dvh flex verifiable">
      <div className="flex items-center justify-center rounded-2xl w-full">
        <div className='flex flex-col gap-6 justify-center items-center'>
          <div className="bg-white shadow-2xs rounded-2xl p-8 max-w-md w-full text-center border border-green-200">
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-green-600">Invoice Verified</h1>
            <p className="text-gray-600 mt-2">This invoice is valid and has been successfully authenticated.</p>

            <div className="mt-6 mb-6 text-left text-gray-700 space-y-2">
              <p><strong>Invoice No:</strong> { invoice?.reference_number }</p>
              <p><strong>Client:</strong> { invoice?.name || 'N/A' }</p>
              <p><strong>Total Amount:</strong> { getTotalAmount() }</p>
              <p><strong>Issued By:</strong> { 'Diplomatic Freight & Logistics Services Ltd.' }</p>
              <p><strong>Issued Date:</strong> { invoice?.date_issue ? dateFormat(invoice.date_issue) : 'N/A' }</p>
            </div>
            <p className='text-gray-500 text-[12px]'>
              This invoice is duly verified as an authentic copy and can be safely used for record-keeping and payment purposes. If you have any questions or concerns, please contact our support team.
            </p>
            <a href='/' className="myHover-translate mt-6 w-full py-2.5 bg-black text-white rounded-3xl hover:bg-gray-900 font-medium inline-block">
              Back to Home
            </a>
          </div>
          <VerifyFooter />
        </div>
      </div>
    </section>
  )
}

export default VerifySuccess