import React from 'react'
import TemplateMain from "./templates/TemplateMain"


function InvoiceTemplate({ profile, invoice, printRef, qrData }) {

  return (
    <TemplateMain
      name={'invoice'}
      data={invoice}
      profile={profile}
      printRef={printRef}
      qrData={qrData}
      payments={invoice.payments}
    />
  )
}

export default InvoiceTemplate