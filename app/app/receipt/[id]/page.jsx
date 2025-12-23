'use client';

import { useParams } from 'next/navigation';
import ProtectedRoute from "@/app/components/ProtectedRoute";
import React, { useRef } from "react";
import useFetchData from "@/hooks/useFetchData";
import SubmitButton from "@/app/components/SubmitButton"
import ReceiptTemplate from '@/app/components/dashboard/ReceiptTemplate';
import { useAuthStore } from "@/store/authStore";
import Link from 'next/link';
import BackButton from '@/app/components/dashboard/BackButton'
import { useReactToPrint } from "react-to-print";
import Loader from '@/app/components/Loader';
import { useRouter } from 'next/navigation';

export default function ReceiptPage() {

  const router = useRouter();

  const isAuth = useAuthStore((state) => state.isAuth);
  const params = useParams();
  const { id } = params;
  const printRef = useRef(null);


  const shouldFetch = Boolean(isAuth && id);
  const { data: dataObj, loading, error } = useFetchData(
    shouldFetch ? `/receipt/${id}` : null
  );

  const data = dataObj?.data;

  const receipt = data?.receipt;
  const profile = data?.profile;
  

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: receipt ? `Receipt-${receipt.receipt_number}` : "Receipt",
  });

  const goBack = () => {
    router.back()
  }

  if (!isAuth) return <ProtectedRoute />;
  if (loading) return <div className="app-body-wrapper flex justify-center mt-20">
    <Loader size={60} />
  </div>;
  if (error) return <div className="app-body-wrapper">Error loading receipt</div>;

  return (
    <ProtectedRoute>
      <section className='app-body-wrapper'>
        <div className="mb-5">
          <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-5'>
            <div className='flex items-center gap-3'>
              <BackButton onClick={goBack} />
              <div>
                <h1 className="text-xl"><span className="font-bold">Receipt #{receipt?.receipt_number || 'SAMPLE-1234' }</span></h1>
                <div className="text-sm text-gray-500 flex gap-2 items-center">
                  <div className='flex gap-1'>
                    <span className='font-bold'>Created on:</span>
                      <span>
                        {
                          new Date(receipt?.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                        }
                      </span>
                  </div>
                  <span className='inline-block h-3 w-px border-r border-gray-200' />
                  <div className='flex gap-1'>
                    <span className='font-bold'>By:</span><span>{data?.issuedBy}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              {/* <Link href={`/app/create-invoice?mode=edit&id=${receipt?.id}`} className='border border-gray-200 text-black h-10 px-4 py-2 flex items-center justify-center font-semibold text-[0.88rem] rounded-4xl min-w-[86px] bg-gray-50 hover:bg-gray-100 transition-colors'>
                Edit invoice
              </Link> */}
              {/* <Link href={`/app/create-receipt?mode=generate&id=${receipt?.id}`} className='border border-gray-200 text-black h-10 px-4 py-2 flex items-center justify-center font-semibold text-[0.88rem] rounded-4xl min-w-[86px] bg-gray-50 hover:bg-gray-100 transition-colors'>
                Generate Receipt
              </Link> */}
              <SubmitButton onClick={() => handlePrint()} className={'border border-gray-200 text-black bg-gray-50 hover:bg-gray-100 transition-colors'}>
                Print / Download
              </SubmitButton>
            </div>
          </div>          
        </div>
        <div className="body-content relative">
          <ReceiptTemplate
            profile={profile}
            receipt={receipt}
            printRef={printRef}
          />
        </div>
      </section>
    </ProtectedRoute>
  );
}