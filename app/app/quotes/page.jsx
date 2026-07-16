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
import useLocalSearch from "@/hooks/useLocalSearch";
import SearchInput from '@/app/components/dashboard/SearchInput';
import NoSearchResult from "@/app/components/dashboard/NoSearchResult"
import usePagination from "@/hooks/usePagination"
import PaginationFooter from '@/app/components/dashboard/PaginationFooter';


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

  // search
  const [search, setSearch] = useState("");

  const filteredQuotes = useLocalSearch(
    quotes,
    search,
    [
      "name",
      "email",
      "phone",
      "departure_city",
      "destination_city",
      "cargo_type"
    ]
  );

  // pagination
  const [perPage, setPerPage] = useState(10);
  const options = [
    {label: 10, value: 10},
    {label: 25, value: 25},
    {label: 50, value: 50},
    {label: 100, value: 100},
  ]

  const {
  data: paginatedQuotes,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    goToPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination(filteredQuotes, perPage);




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
        <div className="mb-5 w-full flex justify-between items-center">
          <div>
            <h1 className="text-xl"><span className="font-semibold">Quotes</span></h1>
            <span className="text-sm text-gray-500">View all submitted quotes</span>
          </div>
          <div>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search quotes..."
            />
          </div>
        </div>
        <div className="body-content mb-96 w-full">
          <div>
            <ul className='grid ul-table border border-gray-200 rounded-2xl'>
              { paginatedQuotes.length > 0 ? (
                paginatedQuotes.map((quote) => (
                  <QuoteTableList 
                    key={quote.id}
                    quote={quote}
                    onDelete={() => {
                      setQuoteToDelete(quote);
                      setDeleteModalOpen(true);
                    }}
                  />
                ))
              ) : search ? (
                <NoSearchResult input="quotes" onClick={setSearch} />
              ) : null }
            </ul>
          </div>
          {
            paginatedQuotes.length > 0 && (
              <div className="flex justify-end py-4 mt-2">
                <PaginationFooter
                  value={perPage}
                  onChange={setPerPage}
                  options={options}
                  onClickPrev={previousPage}
                  disabledPrev={!hasPreviousPage}
                  disabledNext={!hasNextPage}
                  onClickNext={nextPage}
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </div>
            )
          }
        </div>
      </section>
      <Modal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Confirm Delete"
          maxWidth="460px"
        >
          <p className="text-sm mb-4 text-gray-900">
            Are you sure you want to delete quote from: <strong>{quoteToDelete?.name}</strong>?
          </p>
          <p className="text-sm mb-4 text-gray-900">
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