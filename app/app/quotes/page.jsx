import React from 'react'
import ProtectedRoute from "@/app/components/ProtectedRoute";

function Quotes() {
  return (
    <ProtectedRoute>
      <section className='app-body-wrapper'>
        <div className="mb-5">
          <h1 className="text-xl"><span className="font-semibold">Quotes</span></h1>
          <span className="text-sm text-gray-500">View all submitted quotes</span>
        </div>
        <div className="body-content">
          This is a body content
        </div>
      </section>
    </ProtectedRoute>
  )
}

export default Quotes