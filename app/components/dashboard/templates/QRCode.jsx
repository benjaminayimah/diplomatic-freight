import React from 'react'
import { QRCodeCanvas } from "qrcode.react";

function QRCode({qrData, size = 100}) {
  return (
    <div className="flex gap-2 items-center flex-col shrink-0 ">
        <QRCodeCanvas
          value={qrData || 'https://example.com/verify-invoice'}
          size={size}
        />
      <p className="text-sm text-gray-600">Scan to verify</p>
    </div>
  )
}

export default QRCode