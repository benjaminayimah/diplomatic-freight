'use client'

import React, {useState} from 'react'
import { useParams } from 'next/navigation';
import ProtectedRoute from "@/app/components/ProtectedRoute";
import useFetchData from "@/hooks/useFetchData";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import BackButton from '@/app/components/dashboard/BackButton'
import DeleteModal from "@/app/components/modals/DeleteModal";
import useDeleteModal from "@/hooks/useDeleteModal";
import { TrashIcon } from "@heroicons/react/24/outline";
import DropdownMenu from "@/app/components/dashboard/DropdownMenu"
import useDelete from "@/hooks/useDelete"


function page() {

  const router = useRouter();

  const isAuth = useAuthStore((state) => state.isAuth);
  
  const params = useParams();
  const { id } = params;
  
  const { data, loading, error } = useFetchData(
    isAuth ? `/quote/${id}` : null
  );

  const quote = data?.data;

  // delete quote
  const setDeleteQuoteById = useAuthStore(
    (state) => state.setDeleteQuoteById
  );

  const {
    deleteModalOpen,
    itemToDelete,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteModal();

  
  const { quoteDelete } = useAuth();
 
  const {
    deleting,
    handleDelete,
  } = useDelete({
    deleteRequest: quoteDelete,
    removeFromStore: setDeleteQuoteById,
    closeModal: closeDeleteModal,
    successMessage: "Quote deleted successfully!",
    onSuccess: () => router.back(),
  });


  const deleteModalInner = (
    <div>
      <p className="text-sm mb-4 text-gray-900">
        Are you sure you want to delete quote from: <strong>{itemToDelete?.name}</strong>?
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
    <p>Loading...</p>
  </div>;
  if (error) return <div className="app-body-wrapper">Error loading quote</div>;

  return (
    <ProtectedRoute>
      <section className='app-body-wrapper pt-0!'>
        <div className="w-full pt-2.5 pb-2.5 sticky top-29.75 z-20 bg-white/40 backdrop-blur-[6.5px]">
          <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
            <div className='flex items-center gap-4'>
              <BackButton onClick={() => router.back()} />
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
            <div>
              <DropdownMenu trigger={Menu} width="w-30">
                <button
                  className="text-red-600 w-full flex gap-1 items-center text-left px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
                  onClick={() => openDeleteModal(quote)}

                >
                  <TrashIcon className="h-4.5" />
                  Delete
                </button>
              </DropdownMenu>
            </div>
          </div>          
        </div>
        <div className="body-content w-full">
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
  )
}

export default page