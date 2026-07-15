'use client'

import React, { useEffect } from 'react'
import ProtectedRoute from "@/app/components/ProtectedRoute";
import useFetchData from "@/hooks/useFetchData";
import Loader from '@/app/components/Loader';
import { useAuthStore } from '@/store/authStore';
import SubscriberTableList from '../../components/dashboard/SubscriberTableList';
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


function Subscribers() {

  const subscribers = useAuthStore((state) => state.subscribers);
  const { setSubscribers } = useAuthStore();
  
  const { data, loading, error, refetch } = useFetchData("/subscriber");

  useEffect(() => {
    if (data?.subscribers) {
      setSubscribers(data.subscribers);
    }
  }, [data?.subscribers, setSubscribers]);

  const { setDeleteSubscriberById } = useAuthStore()
    
  const [open, setOpen] = useState(false);

  const [deleting, setDeleting] = useState(false)
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [subscriberToDelete, setSubscriberToDelete] = useState(null);

  const { subscriberDelete } = useAuth();
    


  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);
  
  
  const { showSnackbar } = useSnackbar()
  

  const handleDelete = async (id) => {
    setDeleting(true);
    const response = await subscriberDelete(id)
    setDeleting(false);

    if (response?.success) {
      setDeleteSubscriberById(id);
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

  const filteredSubscribers = useLocalSearch(
    subscribers,
    search,
    [
      "email"
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
  data: paginatedSubscribers,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    goToPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination(filteredSubscribers, perPage);



 if (loading) return <div className="app-body-wrapper flex justify-center mt-20">
    <Loader size={60} />
  </div>;
  if(subscribers.length === 0) return <div className="app-body-wrapper flex justify-center mt-20">
    <p className="text-gray-500">No Subscribers Found.</p>
  </div>;
  if (error) return <div className="app-body-wrapper flex justify-center mt-20">
    <p className="text-red-500">Error: {error}</p>
  </div>;


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
            <ul className='flex flex-col gap-2'>
              { paginatedSubscribers.length > 0 ? (
                paginatedSubscribers.map((subscriber) => (
                  <SubscriberTableList 
                    key={subscriber.id}
                    subscriber={subscriber}
                    onDelete={() => {
                      setSubscriberToDelete(subscriber);
                      setDeleteModalOpen(true);
                    }}
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
        <p className="text-sm mb-4 text-gray-500">
          Are you sure you want to delete email: <strong>{subscriberToDelete?.email}</strong>?
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
              if (subscriberToDelete) await handleDelete(subscriberToDelete.id);
              setSubscriberToDelete(null);
            }}
            >
            Yes, Delete
          </SubmitButton>
        </div>
      </Modal>
    </ProtectedRoute>
  )
}

export default Subscribers



