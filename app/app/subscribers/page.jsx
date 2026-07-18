'use client'

import React, { useEffect } from 'react'
import ProtectedRoute from "@/app/components/ProtectedRoute";
import useFetchData from "@/hooks/useFetchData";
import Loader from '@/app/components/Loader';
import { useAuthStore } from '@/store/authStore';
import SubscriberTableList from '../../components/dashboard/SubscriberTableList';
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




function Subscribers() {

  const subscribers = useAuthStore((state) => state.subscribers);
  const setSubscribers = useAuthStore(
    (state) => state.setSubscribers
  );
  
  const { data, loading, error } = useFetchData("/subscriber");

  useEffect(() => {
    if (data?.subscribers) {
      setSubscribers(data.subscribers);
    }
  }, [data?.subscribers, setSubscribers]);

  const setDeleteSubscriberById = useAuthStore(
    (state) => state.setDeleteSubscriberById
  );
  

  const {
    deleteModalOpen,
    itemToDelete,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteModal();

  const { subscriberDelete } = useAuth();

  const {
    deleting,
    handleDelete,
  } = useDelete({
    deleteRequest: subscriberDelete,
    removeFromStore: setDeleteSubscriberById,
    closeModal: closeDeleteModal,
    successMessage: "Subscriber deleted successfully!",
  });

  // search
  const [search, setSearch] = useState("");

  const filteredSubscribers = useLocalSearch(
    subscribers,
    search,
    [
      "email"
    ]
  );

  // pagination
  const [perPage, setPerPage] = useState(10);
  const {
  data: paginatedSubscribers,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination(filteredSubscribers, perPage);

  const deleteModalInner = (
    <div>
      <p className="text-sm mb-4 text-gray-900">
        Are you sure you want to delete the email: <strong>{itemToDelete?.email}</strong>?
      </p>
      <p className="text-sm mb-4 text-gray-900">
        <strong>Note:</strong> This action can <strong>not</strong> be reversed.
      </p>
    </div>
  )



 if (loading) return <div className="app-body-wrapper flex justify-center mt-20">
    <Loader size={60} />
  </div>;
  if (error) return <div className="app-body-wrapper flex justify-center mt-20">
    <p className="text-red-500">Error: {error}</p>
  </div>;
  if(subscribers.length === 0) return <EmptyState title="No Subscribers Found" subTitle="All newsletter subscribers will appear here." />;


  return (
    <ProtectedRoute>
      <section className='app-body-wrapper'>
        <div className="mb-5 w-full flex justify-between items-center">
          <div>
            <h1 className="text-xl"><span className="font-semibold">Subscribers</span></h1>
            <span className="text-sm text-gray-500">View all newsletter subscribers</span>
          </div>
          <div>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search subscribers..."
            />
          </div>
        </div>
        <div className="body-content mb-96 w-full">
          <div>
            <ul className='grid ul-table border border-gray-200 rounded-2xl'>
              { paginatedSubscribers.length > 0 ? (
                paginatedSubscribers.map((subscriber) => (
                  <SubscriberTableList 
                    key={subscriber.id}
                    subscriber={subscriber}
                    onDelete={() => openDeleteModal(subscriber)}
                  />
                ))
              ) : search ? (
                <NoSearchResult input="subscribers" onClick={setSearch} />
              ) : null }
            </ul>
          </div>
          {
            paginatedSubscribers.length > 0 && (
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

export default Subscribers



