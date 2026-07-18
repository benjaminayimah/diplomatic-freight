'use client';

import { useParams } from 'next/navigation';
import ProtectedRoute from "@/app/components/ProtectedRoute";
import React, { useRef, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import ReceiptTemplate from '@/app/components/dashboard/ReceiptTemplate';
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import BackButton from '@/app/components/dashboard/BackButton'
import { useReactToPrint } from "react-to-print";
import Loader from '@/app/components/Loader';
import { useRouter } from 'next/navigation';
import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import useDeleteModal from "@/hooks/useDeleteModal";
import DeleteModal from "@/app/components/modals/DeleteModal";
import DropdownMenu from "@/app/components/dashboard/DropdownMenu"
import useDelete from "@/hooks/useDelete"




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

  // delete receipt
  const setDeleteReceiptById = useAuthStore(
    (state) => state.setDeleteReceiptById
  );

  const {
    deleteModalOpen,
    itemToDelete,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteModal();

  const { receiptDelete } = useAuth();

  const {
    deleting,
    handleDelete,
  } = useDelete({
    deleteRequest: receiptDelete,
    removeFromStore: setDeleteReceiptById,
    closeModal: closeDeleteModal,
    successMessage: "Receipt deleted successfully!",
    onSuccess: () => router.back(),
  });

  const deleteModalInner = (
    <div>
      <p className="text-sm mb-4 text-gray-900">
        Are you sure you want to delete receipt: <strong>{itemToDelete?.receipt_number}</strong>?
      </p>
      <p className="text-sm mb-4 text-gray-900">
        <strong>Note:</strong> This action can <strong>not</strong> be reversed.
      </p>
    </div>
  )

  const Menu = (
    <button type='button' className='h-9 w-9 rounded-3xl grid place-items-center hover:bg-gray-100 transition-all duration-300'>
      <svg height="3.3" viewBox="0 0 17 3.334">
        <path d="M-1977.333,1.667A1.667,1.667,0,0,1-1975.667,0,1.667,1.667,0,0,1-1974,1.667a1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1977.333,1.667Zm-6.834,0A1.667,1.667,0,0,1-1982.5,0a1.667,1.667,0,0,1,1.667,1.667,1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1984.167,1.667Zm-6.833,0A1.667,1.667,0,0,1-1989.333,0a1.667,1.667,0,0,1,1.667,1.667,1.667,1.667,0,0,1-1.667,1.667A1.667,1.667,0,0,1-1991,1.667Z" transform="translate(1991)" fill="#5a5a5a"/>
      </svg>
    </button>
  )

  if (!isAuth) return <ProtectedRoute />;
  if (loading) return <div className="app-body-wrapper flex justify-center mt-20">
    <Loader size={60} />
  </div>;
  if (error) return <div className="app-body-wrapper">Error loading receipt</div>;

  return (
    <ProtectedRoute>
      <section className='app-body-wrapper pt-0!'>
        <div className="w-full pt-2.5 pb-2.5 sticky top-29.75 z-20 bg-white/40 backdrop-blur-[6.5px]">
          <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
            <div className='flex items-center gap-4'>
              <BackButton onClick={() => router.back()} />
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
              <button onClick={() => handlePrint()} className={'h-9 px-3 border flex items-center justify-center font-medium text-[0.88rem] rounded-4xl  border-gray-200 gap-1 text-black bg-gray-50 hover:bg-gray-100 transition-colors'}>
                <ArrowDownTrayIcon strokeWidth={2} className="h-5"/>
                Download PDF
              </button>
              <DropdownMenu trigger={Menu} width="w-30">
                <button
                  className="text-red-600 w-full flex gap-1 items-center text-left px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
                  onClick={() => openDeleteModal(receipt)}
                >
                  <TrashIcon className="h-4.5" />
                  Delete
                </button>
              </DropdownMenu>
            </div>
          </div>          
        </div>
        <div className="body-content relative w-full">
          <ReceiptTemplate
            profile={profile}
            receipt={receipt}
            printRef={printRef}
          />
        </div>
      </section>
      <DeleteModal
        deleteModalOpen={deleteModalOpen}
        closeDeleteModal={closeDeleteModal}
        deleting={deleting}
        deleteModalInner={deleteModalInner}
        onClick={async () => {
          if (itemToDelete) {
            await handleDelete(itemToDelete.id);
          }
        }}
      />
    </ProtectedRoute>
  );
}