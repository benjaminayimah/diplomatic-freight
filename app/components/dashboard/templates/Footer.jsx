import React from 'react'
import QRCode from './QRCode';
import Disclaimer from './Disclaimer';

function Footer({
  name,
  profile,
  qrData = null,
  disclaimer = false
}) {

  const footerItems = [
    profile?.po_box,
    profile?.phone,
    profile?.mobile,
    profile?.email,
    profile?.website
  ].filter(Boolean);

  return (
    <footer className="invoice-section grid grid-cols-1 p-6 sm:p-10 mt-auto text-gray-500 text-xs">
      {
        (name === "invoice") && (
          <>
            <Disclaimer />
            <div className="mt-6 mb-8">
              <QRCode qrData={qrData} size={100} />
            </div>
          </>
        )
      }
      <div className='text-center'>
        <p className="font-bold text-blue-500 text-base mb-2">Thank you for your business!</p>
        <p className='my-6 text-black'>For any questions regarding this {name}, please contact us using any of the contact details below.</p>
        <p className="flex flex-wrap justify-center items-center gap-2">
          {footerItems.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span className="inline-block h-3 w-px border-r border-gray-400" />
              )}
              <span>{item}</span>
            </React.Fragment>
          ))}
        </p>

        {profile?.company_name && (
          <p className="mt-4">
            © {new Date().getFullYear()} {profile.company_name} All rights reserved.
          </p>
        )}
      </div>
    </footer>
  )
}

export default Footer