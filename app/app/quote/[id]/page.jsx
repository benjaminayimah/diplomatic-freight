'use client'

import React from 'react'
import { useParams } from 'next/navigation';
import ProtectedRoute from "@/app/components/ProtectedRoute";
import useFetchData from "@/hooks/useFetchData";
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import BackButton from '@/app/components/dashboard/BackButton'
import Link from 'next/link';
// import InvoiceTemplate from '@/app/components/dashboard/InvoiceTemplate';
// import Loader from '@/app/components/Loader';

function page() {

  const router = useRouter();

  const isAuth = useAuthStore((state) => state.isAuth);
  const params = useParams();
  const { id } = params;
  
  const { data, loading, error } = useFetchData(
    isAuth ? `/quote/${id}` : null
  );

  const quote = data?.data;

  const goBack = () => {
    router.back()
  }

  if (!isAuth) return <ProtectedRoute />;
  if (loading) return <div className="app-body-wrapper flex justify-center mt-20">
    <p>Loading...</p>
  </div>;
  if (error) return <div className="app-body-wrapper">Error loading quote</div>;

  return (
    <ProtectedRoute>
      <section className='app-body-wrapper'>
        <div className="mb-5">
          <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-5'>
            <div className='flex items-center gap-3'>
              <BackButton onClick={goBack} />
              <div>
                <h1 className="text-xl"><span className="font-bold">Quote from: {quote?.name}</span></h1>
                <div className="text-sm text-gray-500 flex gap-2 items-center">
                  <div className='flex gap-1'>
                    <span className='font-bold'>Sent on:</span>
                      <span>
                        {
                          new Date(quote?.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        }
                      </span>
                  </div>
                </div>
              </div>
            </div>
          </div>          
        </div>
        <div className="body-content">
          <div className="flex flex-col gap-6">
            <article className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <h2 className="mb-3 text-xl">Quote Details</h2>
              <div className="px-6 py-2 border bg-white border-gray-200 rounded-2xl">
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">From</span>
                  <div className="text-gray-600 md:text-right">{quote?.name}</div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Email</span>
                  <div className="text-gray-600 md:text-right">{quote?.email}</div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Phone</span>
                  <div className="text-gray-600 md:text-right">{quote?.phone}</div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Departure City</span>
                  <div className="text-gray-600 md:text-right">{quote?.departure_city}</div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Destination City</span>
                  <div className="text-gray-600 md:text-right">{quote?.destination_city}</div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Shipping Date</span>
                  <div className="text-gray-600 md:text-right">
                    {
                      new Date(quote?.shipping_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    }
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Cargo Type</span>
                  <div className="text-gray-600 md:text-right">{quote?.cargo_type}</div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Estimated Weight</span>
                  <div className="text-gray-600 md:text-right">{quote?.weight} <i>kg</i></div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Dimensions</span>
                  <div className="text-gray-600 md:text-right">{quote?.dimensions} <i>cm</i></div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 ">
                  <span className="font-semibold">Additional Information</span>
                  <div className="text-gray-600 md:text-right">{quote?.additional_info || 'N/A'}</div>
                </div>
              </div>
            </article>
            
          </div>
        </div>
        {/* <div className="body-content relative">
          <InvoiceTemplate
            profile={profile}
            invoice={invoice}
            printRef={printRef}
            banks={banks}
            qrData={qrData} 
          />
        </div> */}
      </section>
    </ProtectedRoute>
  )
}

export default page