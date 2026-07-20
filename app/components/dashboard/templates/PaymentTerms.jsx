import React from 'react'

function PaymentTerms({
  refundPolicy = true
}) {
  return (
    <div className='grid invoice-section pt-12 pb-6'>
      <h3 className="font-bold text-black">Payment Terms</h3>
      <p className="text-black text-sm mb-4">
        <strong className="font-bold">Reservation:</strong>{" "}
        Aircraft rate is reserved only from the issue date until the invoice due date. If payment is not received within this window, pricing and availability cannot be guaranteed.
      </p>
      {
        refundPolicy && (
          <p className="text-black text-sm">
            <strong className="font-bold">Refund Policy:</strong>{" "}
            All aircraft fees are non-refundable and non-transferable once the aircraft has been reserved or contracted. This policy applies under all circumstances, including but not limited to client cancellation, governmental or regulatory actions, weather conditions, operational constraints, force majeure, or third-party failures.
          </p>
        )
      }
    </div>
  )
}

export default PaymentTerms