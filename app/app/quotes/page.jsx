'use client'

import React, { useEffect } from 'react'
import ProtectedRoute from "@/app/components/ProtectedRoute";
import useFetchData from "@/hooks/useFetchData";
import Loader from '@/app/components/Loader';
import { useAuthStore } from '@/store/authStore';
import QuoteTableList from '../../components/dashboard/QuoteTableList';
import { useAuth } from "@/hooks/useAuth";
import { useState, useCallback } from 'react';
import Modal from "@/app/components/dashboard/Modal";
import SubmitButton from '../../components/SubmitButton';
import { useSnackbar } from "@/app/components/SnackbarContext";

function Quotes() {

  const quotes = useAuthStore((state) => state.quotes);
  const { setQuotes } = useAuthStore();
  
  
  const { data, loading, error, refetch } = useFetchData("/quote");

  useEffect(() => {
    if (data?.quotes) {
      setQuotes(data.quotes);
    }
  }, [data?.quotes, setQuotes]);


  const { setDeleteQuoteById } = useAuthStore()
  
  const [open, setOpen] = useState(false);

  const [deleting, setDeleting] = useState(false)
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [quoteToDelete, setQuoteToDelete] = useState(null);

  const { quoteDelete } = useAuth();
    


  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);
  
  
  const { showSnackbar } = useSnackbar()
  

  const handleDelete = async (id) => {
    setDeleting(true);
    const response = await quoteDelete(id)
    setDeleting(false);

    if (response?.success) {
      setDeleteQuoteById(id);
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
  if(quotes.length === 0) return <div className="app-body-wrapper flex justify-center mt-20">
    <p className="text-gray-500">No Quotes Found.</p>
  </div>;
  if (error) return <div className="app-body-wrapper flex justify-center mt-20">
    <p className="text-red-500">Error: {error}</p>
  </div>;

  return (
    <ProtectedRoute>
      <section className='app-body-wrapper'>
        <div className="mb-5">
          <h1 className="text-xl"><span className="font-semibold">Quotes</span></h1>
          <span className="text-sm text-gray-500">View all submitted quotes</span>
        </div>
        <div className="body-content">
          <div>
            <ul className='flex flex-col gap-2'>
              {
                quotes?.map((quote) => (
                  <QuoteTableList
                    key={quote.id}
                    quote={quote}
                    onDelete={() => {
                      setQuoteToDelete(quote);
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
            Are you sure you want to delete quote from: <strong>{quoteToDelete?.name}</strong>?
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
                if (quoteToDelete) await handleDelete(quoteToDelete.id);
                setQuoteToDelete(null);
              }}
              >
              Yes, Delete
            </SubmitButton>
          </div>
        </Modal>
    </ProtectedRoute>
  )
}

export default Quotes