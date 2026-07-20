import React from 'react'
import Footer from "./Footer"
import Header from "./Header"
import WaterMark from "./WaterMark"
import BillTo from "./BillTo"
import SpecialNote from "./SpecialNote"
import PaymentTerms from "./PaymentTerms"
import Table from "./Table"
import PaymentOptions from "./PaymentOptions"

function TemplateMain({
  data,
  name,
  profile,
  qrData = "",
  printRef,
  payments = []
}) {
  return (
    <div className='px-4 py-4 md:py-12 bg-gray-50 rounded-xl border border-gray-100 flex justify-center flex-1'>
      <div className='shadow-sm rounded-xl overflow-hidden max-w-225 w-full'>
        <article ref={printRef} className='bg-white relative'>
          <WaterMark />
          <main className="p-6 sm:p-10 min-h-200 z-10 relative">
            <Header name={name} profile={profile} data={data} />
            <BillTo data={data} qrData={qrData} />
            <Table data={data} />
            {
              name === "invoice" && (
                <>
                  {data?.note ? (
                    <SpecialNote data={data.note} />
                  ) : (
                    <div className="pt-12 pb-6" />
                  )}

                  <div className="grid grid-cols-1 gap-6">
                    {/* Payment Information */}
                    {payments?.length > 0 && (
                      <PaymentOptions payments={payments} />
                    )}

                    {/* Terms */}
                    <PaymentTerms
                      refundPolicy={data?.has_refund_policy}
                    />
                  </div>
                </>
              )
            }
          </main>
          <Footer
            name={name}
            profile={profile}
            qrData={qrData}
            disclaimer={true}
            />
        </article>
      </div>
    </div>
  )
}

export default TemplateMain