import React from 'react'
import { QRCodeCanvas } from "qrcode.react";
import { generateWalletQR } from "@/utils/crypto/walletQR";

function PaymentOptions({
  payments
}) {
  return (
    <div className="invoice-section pt-12 pb-6">
      <div className="mb-4">
        <h3 className="font-bold text-black mb-1">Payment Account{payments.length > 1 && 's' }</h3>
        <p className="text-black text-sm">Kindly make your payment to {payments.length > 1 && 'any of' } the following account{payments.length > 1 && 's' }:</p>
      </div>
      <div className='grid grid-cols-1 gap-8'>
        {
          payments?.map((payment) => (
            payment.payment_method === 'bank_transfer' ? (
              <li key={payment.id} className={`text-black text-sm space-y-1 ${payments.length > 1 ? 'list-decimal' : 'list-none'}`} >
                <p><span className="font-medium"><strong>Payment Method:</strong></span> <span className='uppercase'>{payment?.payment_method.replace("_", " ")}</span></p>
                <p><span className="font-medium"><strong>Bank:</strong></span> {payment?.bank_name || 'N/A'}</p>
                <p><span className="font-medium"><strong>Account Name:</strong></span> {payment?.account_name || 'N/A'}</p>
                <p><span className="font-medium"><strong>Account Number:</strong></span> <code>{payment?.account_number || 'N/A'}</code></p>
                <p><span className="font-medium"><strong>SWIFT/BIC:</strong></span> <code>{payment?.swift_code || 'N/A'}</code></p>
                <p><span className="font-medium"><strong>Bank Branch:</strong></span> {payment?.bank_branch || 'N/A'}</p>
              </li>
            ) : (
              <li key={payment.id} className={`text-black text-sm space-y-1 ${payments.length > 1 ? 'list-decimal' : 'list-none'}`} >
                <p><span className="font-medium"><strong>Payment Method:</strong></span> <span className='uppercase'>{payment?.payment_method.replace("_", " ")} Deposit</span></p>
                <p><span className="font-medium"><strong>Wallet Address:</strong></span> <code>{payment?.wallet_address || 'N/A'}</code></p>
                <p><span className="font-medium"><strong>Network:</strong></span> <span className='uppercase'>{payment?.network || 'N/A'}</span></p>
                <div className='mt-4'>
                  <div className="relative w-fit">
                    <QRCodeCanvas
                      value={generateWalletQR(
                        payment?.network,
                        payment?.wallet_address
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
              </li>
            )
          ))
        }
      </div>
    </div>
  )
}

export default PaymentOptions