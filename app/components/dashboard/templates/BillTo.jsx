import React from 'react'
import QRCode from './QRCode';
import {
    EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";


function BillTo({
  data,
  qrData = null,
}) {
  return (
    <div className="invoice-section">
      <h2 className=" text-black text-base font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">Bill to:</h2>
      <div className="p-4 bg-white border border-gray-200 gap-5 rounded-lg flex justify-between items-center">
        <div className="text-neutral-800 text-base font-normal leading-normal grid max-w-2/3">
          <div className="inline-flex gap-1.5 text-black"><span className="font-bold">{data?.name || 'N/A'}</span></div>
          { data?.address && <div className="inline-flex gap-1.5"><span className="font-bold flex items-start"><MapPinIcon className="h-5 mt-0.5 text-gray-500" /></span><span className="text-black">{data.address}</span></div> }
          { data?.email && <div className="inline-flex gap-1.5"><span className="font-bold flex items-start"><EnvelopeIcon className="h-5 mt-0.5 text-gray-500" /></span><span className="text-black">{data.email}</span></div> }
          { data?.phone && <div className="inline-flex gap-1.5"><span className="font-bold flex items-start"><PhoneIcon className="h-5 mt-0.5 text-gray-500" /></span><span className="text-black">{data.phone}</span></div> }
        </div>
        {qrData && <QRCode qrData={qrData} size={50} />}
      </div>
    </div>
  )
}

export default BillTo