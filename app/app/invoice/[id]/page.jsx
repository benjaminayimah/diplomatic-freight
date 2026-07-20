'use client';

import { useParams } from 'next/navigation';
import ProtectedRoute from "@/app/components/ProtectedRoute";
import React, { useRef, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import InvoiceTemplate from '@/app/components/dashboard/InvoiceTemplate';
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import Link from 'next/link';
import BackButton from '@/app/components/dashboard/BackButton'
import { useReactToPrint } from "react-to-print";
import Loader from '@/app/components/Loader';
import { useRouter } from 'next/navigation';
import DeleteModal from "@/app/components/modals/DeleteModal";
import useDeleteModal from "@/hooks/useDeleteModal";
import DropdownMenu from "@/app/components/dashboard/DropdownMenu"
import useDelete from "@/hooks/useDelete"

import { 
  ChatBubbleBottomCenterTextIcon,
  TrashIcon,
  ReceiptPercentIcon,
  PrinterIcon
} from "@heroicons/react/24/outline";
import PersonalNote from "@/app/components/dashboard/PersonalNote"

export default function InvoicePage() {

  const router = useRouter();

  const isAuth = useAuthStore(
    (state) => state.isAuth
  );
  const setDeleteInvoiceById = useAuthStore(
    (state) => state.setDeleteInvoiceById
  );


  const params = useParams();
  const { id } = params;
  const printRef = useRef(null);

  const [showNote, setShowNote ] = useState(false)


  const shouldFetch = Boolean(isAuth && id);
  const { data: dataObj, loading, error } = useFetchData(
    shouldFetch ? `/invoice/${id}` : null
  );

  const data = dataObj?.data;

  const invoice = data?.invoice;
  const profile = data?.profile;
  const qrData = data?.qrData;
  

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: invoice ? `Invoice-${invoice.reference_number}` : "Invoice",
  });

  // delete invoice
  const {
    deleteModalOpen,
    itemToDelete,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteModal();

  const { invoiceDelete } = useAuth();

  const {
    deleting,
    handleDelete,
  } = useDelete({
    deleteRequest: invoiceDelete,
    removeFromStore: setDeleteInvoiceById,
    closeModal: closeDeleteModal,
    successMessage: "Invoice deleted successfully!",
    onSuccess: () => router.back(),
  });

  const deleteModalInner = (
    <div>
      <p className="text-sm mb-4 text-gray-900">
        Are you sure you want to delete invoice: <strong>{itemToDelete?.reference_number}</strong>?
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
  if (error) return <div className="app-body-wrapper">Error loading invoice</div>;

  return (
    <ProtectedRoute>
      <section className='app-body-wrapper pt-0!'>
        <div className="w-full pt-2.5 pb-2.5 sticky top-29.75 z-20 bg-white/40 backdrop-blur-[6.5px]">
          <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
            <div className='flex items-center gap-3'>
              <BackButton onClick={() => router.back()} />
              <div>
                <h1 className="text-xl"><span className="font-bold">Invoice #{invoice?.reference_number || 'SAMPLE-1234' }</span></h1>
                <div className="text-sm text-gray-500 flex gap-1.5 items-center">
                  <div className='flex gap-1'>
                    <span className='font-bold'>Created on:</span>
                      <span>
                        {
                          new Date(invoice?.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        }
                      </span>
                  </div>
                  <span className="font-bold">&middot;</span>
                  <div className='flex gap-1'>
                    <span className='font-bold'>By:</span><span>{data?.createdBy}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() => setShowNote(prev => !prev)}
                className={`grid place-items-center relative w-9 p-1 h-9 shrink-0 rounded-3xl transition duration-300 ${showNote ? 'bg-black text-white hover:bg-gray-900' : 'border border-gray-200 hover:bg-gray-100 hover:text-black' }`}
                >
                  {
                    invoice?.personal_note && (
                      <span className={`${showNote ? "border-black" : "border-white"} absolute bg-blue-600 h-2 w-2 rounded-full border top-[24%] right-[22%]`}></span>
                    )
                  }
                  <ChatBubbleBottomCenterTextIcon strokeWidth={2} fill={showNote ? "currentColor" : "none"} className="h-4.5" />
                </button>
              <Link href={`/app/create-invoice?mode=edit&id=${invoice?.id}`} className='border border-gray-200 gap-2 text-black h-9 px-3 flex items-center justify-center font-medium text-[0.88rem] rounded-4xl bg-gray-50 hover:bg-gray-100 transition-colors'>
                <svg height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M17.1207 3.12109C17.1207 2.97399 17.092 2.8283 17.0358 2.69238C16.9794 2.55634 16.8967 2.43225 16.7926 2.32812C16.6885 2.22405 16.5643 2.14129 16.4283 2.08496C16.2924 2.02874 16.1467 2 15.9996 2C15.7023 2 15.4169 2.11791 15.2067 2.32812L2.90198 14.6318L2.37268 16.7471L4.48791 16.2188L16.7926 3.91406C16.8966 3.81002 16.9794 3.68668 17.0358 3.55078C17.0921 3.41474 17.1207 3.26835 17.1207 3.12109ZM18.9996 17.1211C19.5518 17.1211 19.9995 17.5689 19.9996 18.1211C19.9996 18.6734 19.5519 19.1211 18.9996 19.1211H9.99963C9.44735 19.1211 8.99963 18.6734 8.99963 18.1211C8.99976 17.5689 9.44742 17.1211 9.99963 17.1211H18.9996ZM19.1207 3.12109C19.1207 3.53087 19.0402 3.93683 18.8834 4.31543C18.7266 4.69408 18.4965 5.03831 18.2067 5.32812L5.70666 17.8281C5.57851 17.9563 5.41765 18.0478 5.24182 18.0918L1.24182 19.0918C0.901166 19.1768 0.540884 19.0764 0.292602 18.8281C0.0443094 18.5798 -0.0552662 18.2196 0.0299069 17.8789L1.02991 13.8789L1.07092 13.75C1.12105 13.6246 1.19647 13.5102 1.2926 13.4141L13.7926 0.914062C14.378 0.328772 15.1719 0 15.9996 0C16.4095 0 16.8153 0.0805044 17.194 0.237305C17.5726 0.394145 17.9168 0.624275 18.2067 0.914062C18.4965 1.20389 18.7266 1.54808 18.8834 1.92676C19.0403 2.30538 19.1207 2.71127 19.1207 3.12109Z" />
                </svg>
                Edit
              </Link>
              <Link href={`/app/create-receipt?mode=generate&id=${invoice?.id}`} className='border border-gray-200 gap-1 text-black h-9 px-3 flex items-center justify-center font-medium text-[0.88rem] rounded-4xl bg-gray-50 hover:bg-gray-100 transition-colors'>
                  <ReceiptPercentIcon className="h-5"/>
                Generate Receipt
              </Link>
              <button onClick={() => handlePrint()} className={'h-9 px-3 border flex items-center justify-center font-medium text-[0.88rem] rounded-4xl  border-gray-200 gap-1 text-black bg-gray-50 hover:bg-gray-100 transition-colors'}>
                <PrinterIcon strokeWidth={1.5} className="h-5"/>
                Print Invoice
              </button>
              <DropdownMenu trigger={Menu} width="w-30">
                <button
                  className="text-red-600 w-full flex gap-1 items-center text-left px-4 py-2 hover:bg-gray-100 text-sm transition font-medium"
                  onClick={() => openDeleteModal(invoice)}
                >
                  <TrashIcon strokeWidth={2} className="h-5" />
                  Delete
                </button>
              </DropdownMenu>
            </div>
          </div>          
        </div>
        <div className="body-content relative w-full flex flex-col-reverse md:flex-row gap-5 md:gap-2">
          <InvoiceTemplate
            profile={profile}
            invoice={invoice}
            printRef={printRef}
            qrData={qrData} 
          />
          {
            showNote && (
              <PersonalNote
                note={invoice?.personal_note}
                onClick={() => setShowNote(prev => !prev)}
                isFloating={false}
              />
            )
          }
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