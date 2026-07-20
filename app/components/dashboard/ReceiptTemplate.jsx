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
    // <div className='px-4 py-4 md:py-12 bg-gray-50 rounded-xl border border-gray-100 flex justify-center'>
    //   <div className='shadow-sm rounded-xl overflow-hidden max-w-225 w-full'>
    //     <article ref={printRef} className='bg-white relative'>
    //       <WaterMark />
    //       <main className="p-6 sm:p-10 min-h-200 z-10 relative">
    //         <Header
    //           name={'receipt'}
    //           profile={profile}
    //           data={receipt}
    //         />
    //         <BillTo data={receipt} />
    //         <Table data={receipt} />
    //       </main>
    //       <Footer
    //         name={name}
    //         profile={profile}
    //       />
    //     </article>
    //   </div>
    // </div>
  )
}

export default ReceiptTemplate