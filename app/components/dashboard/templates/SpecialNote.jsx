import React from 'react'

function SpecialNote({
  data = null
}) {
  return (
    <div className="invoice-section pt-12 pb-6">
        <div className="p-4 bg-white border border-black flex justify-between items-center">
          <div className="text-sm text-black">
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: data,
              }}
            />
          </div>
        </div>
    </div>
  )
}

export default SpecialNote