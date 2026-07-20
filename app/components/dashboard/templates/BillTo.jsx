import React from 'react'
import QRCode from './QRCode';


function BillTo({
  data,
  qrData = null,
}) {
  return (
    <div className="invoice-section">
      <h2 className=" text-black text-base font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">Bill to:</h2>
      <div className="p-4 bg-white border border-gray-200  rounded-lg flex justify-between items-center">
        <div className="text-neutral-800 text-base font-normal leading-normal grid">
          <div className="inline-flex gap-1.5 text-black"><span className="font-bold">{data?.name || 'N/A'}</span></div>
          { data?.address && <div className="inline-flex gap-1.5"><span className="font-bold flex text-black">A: </span><span>{data.address}</span></div> }
          { data?.email && <div className="inline-flex gap-1.5"><span className="font-bold flex text-black">E: </span><span>{data.email}</span></div> }
          { data?.phone && <div className="inline-flex gap-1.5"><span className="font-bold flex text-black">P: </span><span>{data.phone}</span></div> }
        </div>

        {qrData && <QRCode qrData={qrData} size={50} />}

        {/* <div className="flex gap-2 items-center flex-col shrink-0">
          <QRCodeCanvas
            value={qrData || 'https://example.com/verify-invoice'}
            size={50}
          />
          <p className="text-xs text-gray-600">Scan to verify</p>
        </div> */}
      </div>
    </div>
  )
}

export default BillTo