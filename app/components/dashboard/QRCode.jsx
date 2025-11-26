import { QRCodeCanvas } from "qrcode.react";

<div className="flex items-center mt-6">
  <QRCodeCanvas
    value={data.qrData} // e.g., https://domain.com/invoice/verify/123
    size={100}          // pixels
    // includeMargin={true}
  />
  <p className="ml-4 text-sm text-gray-600">Scan to verify</p>
</div>
