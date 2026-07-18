'use client'

import React, { useEffect } from 'react'
import ProtectedRoute from "@/app/components/ProtectedRoute";
import useFetchData from "@/hooks/useFetchData";
import Loader from '@/app/components/Loader';
import { useAuthStore } from '@/store/authStore';
import QuoteTableList from '../../components/dashboard/QuoteTableList';
import { useAuth } from "@/hooks/useAuth";
import { useState } from 'react';
import DeleteModal from "@/app/components/modals/DeleteModal";
import useLocalSearch from "@/hooks/useLocalSearch";
import SearchInput from '@/app/components/dashboard/SearchInput';
import NoSearchResult from "@/app/components/dashboard/NoSearchResult"
import usePagination from "@/hooks/usePagination"
import PaginationFooter from '@/app/components/dashboard/PaginationFooter';
import useDeleteModal from "@/hooks/useDeleteModal";
import useDelete from "@/hooks/useDelete"
import { PAGE_OPTIONS } from "@/app/constants/pagination";
import EmptyState from "@/app/components/dashboard/EmptyState"


function Quotes() {

  const quotes = useAuthStore((state) => state.quotes);
  const { setQuotes } = useAuthStore();
  
  
  const { data, loading, error } = useFetchData("/quote");

  useEffect(() => {
    if (data?.quotes) {
      setQuotes(data.quotes);
    }
  }, [data?.quotes, setQuotes]);


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
  });
  

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

  const {
  data: paginatedQuotes,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination(filteredQuotes, perPage);

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



  if (loading) return <div className="app-body-wrapper flex justify-center">
    <Loader size={60} />
  </div>;
  if (error) return <div className="app-body-wrapper flex justify-center">
    <p className="text-red-500">Error: {error}</p>
  </div>;
  if(quotes.length === 0) return <EmptyState title="No Quotes Found" subTitle="All submitted quotes will appear here." />;

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
                    onDelete={() => openDeleteModal(quote)}
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
                  options={PAGE_OPTIONS}
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

export default Quotes