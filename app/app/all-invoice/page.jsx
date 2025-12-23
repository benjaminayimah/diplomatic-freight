'use client'

import React, { useState, useEffect, useCallback } from 'react'
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import InvoiceTableList from '../../components/dashboard/InvoiceTableList';
import Modal from "@/app/components/dashboard/Modal";
import SubmitButton from '../../components/SubmitButton';
import { useSnackbar } from "@/app/components/SnackbarContext"; 
import useFetchData from "@/hooks/useFetchData";
import Loader from '@/app/components/Loader';



function AllInvoice() {

  const invoices = useAuthStore((state) => state.invoices);
  const setInvoices = useAuthStore((state) => state.setInvoices);
  const setDeleteInvoiceById = useAuthStore((state) => state.setDeleteInvoiceById);

  const { data, loading, error, refetch } = useFetchData("/invoice");


  useEffect(() => {
    if (!data?.invoices) return;

    const sortedInvoices = [...data.invoices].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setInvoices(sortedInvoices);

  }, [data, setInvoices]);  // use the full data object



  const [open, setOpen] = useState(false);

  const [deleting, setDeleting] = useState(false)
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);

  const { invoiceDelete } = useAuth();
  



  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);


  const { showSnackbar } = useSnackbar()
 

  const handleDeleteInvoice = async (id) => {
    setDeleting(true);
    const response = await invoiceDelete(id)
    setDeleting(false);

    if (response?.success) {
      setDeleteInvoiceById(id);
      handleCloseModal();

      showSnackbar (
        "Deleted successfully!",
        "success"
      )
    } else showSnackbar (
        "Error deleting. Try again",
        "error"
      )
  }

  if (loading) return <div className="app-body-wrapper flex justify-center mt-20">
    <Loader size={60} />
  </div>;
  if(invoices.length === 0) return <div className="app-body-wrapper flex justify-center mt-20">
    <p className="text-gray-500">No Invoices Found.</p>
  </div>;
  if (error) return <div className="app-body-wrapper flex justify-center mt-20">
    <p className="text-red-500">Error: {error}</p>
  </div>;

  return (
    <ProtectedRoute>
      <section className='app-body-wrapper'>
        <div className="mb-5">
          <h1 className="text-xl"><span className="font-semibold">All Invoices</span></h1>
          <span className="text-sm text-gray-500">View and manage all invoices</span>
        </div>
        <div className="body-content">
          <div>
            <ul className='flex flex-col gap-2'>
              {
                invoices?.map((invoice) => (
                  <InvoiceTableList
                    key={invoice.id}
                    invoice={invoice}
                    onDelete={() => {
                      setInvoiceToDelete(invoice);
                      setDeleteModalOpen(true);
                    }}
                  />
                ))
              }
            </ul>
          </div>
        </div>
      </section>
      <Modal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Confirm Delete"
          maxWidth="460px"
        >
          <p className="text-sm mb-4 text-gray-500">
            Are you sure you want to delete invoice: <strong>{invoiceToDelete?.reference_number}</strong>?
          </p>
          <p className="text-sm mb-4 text-gray-500">
            This action can't be undone
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="text-[0.88rem] font-medium px-4 py-2 rounded-3xl bg-gray-100 border border-gray-200 transition duration-300 hover:bg-gray-200"
            >
              Cancel
            </button>
            <SubmitButton
              loading={deleting}
              className={'bg-red-600 text-white hover:bg-red-700'}
              onClick={async () => {
                setDeleteModalOpen(false);
                if (invoiceToDelete) await handleDeleteInvoice(invoiceToDelete.id);
                setInvoiceToDelete(null);
              }}
              >
              Yes, Delete
            </SubmitButton>
          </div>
        </Modal>
    </ProtectedRoute>
  )
}

export default AllInvoice