'use client'

import React from 'react'
import ProtectedRoute from "@/app/components/ProtectedRoute";
import useFetchData from "@/hooks/useFetchData";
import Loader from '@/app/components/Loader';


function Subscribers() {
  
  const { data, loading, error, refetch } = useFetchData("/subscriber");
  const subscribers = data.subscribers || []

 if (loading) return <div className="app-body-wrapper flex justify-center mt-20">
    <Loader size={60} />
  </div>;

  return (
    <ProtectedRoute>
      <section className='app-body-wrapper'>
        <div className="mb-5">
          <h1 className="text-xl"><span className="font-semibold">Subscribers</span></h1>
          <span className="text-sm text-gray-500">View all newsletter subscribers</span>
        </div>
        <div className="body-content">
          This is a body content
        </div>
      </section>
    </ProtectedRoute>
  )
}

export default Subscribers