import React from 'react'
import TemplateMain from "./templates/TemplateMain"


function ReceiptTemplate({ profile, receipt, printRef }) {

  return (
    <TemplateMain
      name={'receipt'}
      data={receipt}
      profile={profile}
      printRef={printRef}
    />
  )
}

export default ReceiptTemplate