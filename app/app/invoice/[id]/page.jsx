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
import Menu from "@/app/components/dashboard/HamburgerMenu"
import useDelete from "@/hooks/useDelete"
import { AnimatePresence, motion } from "framer-motion";
import CopyButton from "@/app/components/dashboard/CopyButton";
import { 
  ChatBubbleBottomCenterTextIcon,
  TrashIcon,
  PencilIcon,
  ReceiptPercentIcon,
  PrinterIcon
} from "@heroicons/react/24/outline";
import PersonalNote from "@/app/components/dashboard/PersonalNote"

export default function InvoicePage() {

  const [menuOpen, setMenuOpen] = useState(false)

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
      <p className="text-sm text-gray-900">
        <strong>Note:</strong> This action can <strong>not</strong> be reversed.
      </p>
    </div>
  )

  if (!isAuth) return <ProtectedRoute />;
  if (loading) return <div className="app-body-wrapper flex justify-center">
    <Loader size={60} />
  </div>;
  if (error) return <div className="app-body-wrapper flex justify-center">Error Fetching Invoice</div>;

  return (
    <ProtectedRoute>
      <section className='app-body-wrapper pt-0! pb-[7px]!'>
        <div className="w-full pt-2.5 pb-2.5 sticky top-29.75 z-20 bg-white/40 backdrop-blur-[6.5px]">
          <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
            <div className='flex items-center gap-3'>
              <BackButton onClick={() => router.back()} />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl"><span className="font-bold">Invoice #: {invoice?.reference_number || 'SAMPLE-1234' }</span></h1>
                  <CopyButton
                    value={invoice.reference_number}
                    message="Invoice number copied!"
                    className="h-7 w-7 hover:bg-gray-100 text-gray-500"
                  />
                </div>
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
                <PencilIcon strokeWidth={1.5} className="h-5" />
                <span className="hidden md:inline-block">Edit</span>
              </Link>
              <Link href={`/app/create-receipt?mode=generate&id=${invoice?.id}`} className='border border-gray-200 gap-1 text-black h-9 px-3 flex items-center justify-center font-medium text-[0.88rem] rounded-4xl bg-gray-50 hover:bg-gray-100 transition-colors'>
                  <ReceiptPercentIcon className="h-5"/>
                <span className="hidden md:inline-block">Generate Receipt</span>
              </Link>
              <button onClick={() => handlePrint()} className={'h-9 px-3 border flex items-center justify-center font-medium text-[0.88rem] rounded-4xl  border-gray-200 gap-1 text-black bg-gray-50 hover:bg-gray-100 transition-colors'}>
                <PrinterIcon strokeWidth={1.5} className="h-5"/>
                <span className="hidden md:inline-block">Print Invoice</span>
              </button>
              <DropdownMenu
                trigger={<Menu menuOpen={menuOpen}/>}
                onOpenChange={setMenuOpen}
                width="w-30"
                >
                <button
                  className="text-red-600 w-full flex gap-1 items-center text-left px-3 py-2 hover:bg-red-50 text-sm transition font-medium"
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
          <AnimatePresence>
            {
              showNote && (
                <motion.div
                  className="relative md:w-[550px] w-full "
                  initial={{ x: 320, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 320, opacity: 0 }}
                  transition={{
                    duration: 0.28,
                    ease: [0.22, 1, 0.36, 1], // nice smooth ease
                  }}
                >
                  <PersonalNote
                    note={invoice?.personal_note}
                    onClick={() => setShowNote(prev => !prev)}
                    isFloating={false}
                  />
                </motion.div>
              )
            }
          </AnimatePresence>
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