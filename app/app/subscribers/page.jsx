'use client'

import React, { useEffect } from 'react'
import ProtectedRoute from "@/app/components/ProtectedRoute";
import useFetchData from "@/hooks/useFetchData";
import Loader from '@/app/components/Loader';
import { useAuthStore } from '@/store/authStore';


function Subscribers() {

  const subscribers = useAuthStore((state) => state.subscribers);
  const { setSubscribers } = useAuthStore();
  
  const { data, loading, error, refetch } = useFetchData("/subscriber");

  useEffect(() => {
    if (data?.subscribers) {
      setSubscribers(data.subscribers);
    }
  }, [data?.subscribers, setSubscribers]);
  

 if (loading) return <div className="app-body-wrapper flex justify-center mt-20">
    <Loader size={60} />
  </div>;
  if(subscribers.length === 0) return <div className="app-body-wrapper flex justify-center mt-20">
    <p className="text-gray-500">No Subscribers Found.</p>
  </div>;
  if (error) return <div className="app-body-wrapper flex justify-center mt-20">
    <p className="text-red-500">Error: {error}</p>
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