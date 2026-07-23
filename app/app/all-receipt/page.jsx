'use client'

import React, { useState, useEffect } from 'react'
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import ReceiptTableList from '../../components/dashboard/ReceiptTableList';
import DeleteModal from "@/app/components/modals/DeleteModal";
import useFetchData from "@/hooks/useFetchData";
import SearchInput from "@/app/components/dashboard/SearchInput"
import useLocalSearch from "@/hooks/useLocalSearch";
import NoSearchResult from "@/app/components/dashboard/NoSearchResult"
import usePagination from "@/hooks/usePagination"
import PaginationFooter from '@/app/components/dashboard/PaginationFooter';
import useDeleteModal from "@/hooks/useDeleteModal";
import useDelete from "@/hooks/useDelete"
import { PAGE_OPTIONS } from "@/app/constants/pagination";
import Link from 'next/link';
import { PlusIcon } from "@heroicons/react/24/outline";
import EmptyState from "@/app/components/dashboard/EmptyState"
import SkeletonLoader from "@/app/components/dashboard/SkeletonLoader"




function AllReceipt() {

  const receipts = useAuthStore(
    (state) => state.receipts
  );
  const setReceipts = useAuthStore(
    (state) => state.setReceipts
  );
  const setDeleteReceiptById = useAuthStore(
    (state) => state.setDeleteReceiptById
  );

  const { data, loading, error } = useFetchData("/receipt");

  useEffect(() => {
    if (!data?.receipts) return;
    const sortedReceipts = [...data.receipts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setReceipts(sortedReceipts);
  }, [data, setReceipts]);  // use the full data object


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
  });

   // search
  const [search, setSearch] = useState("");

  const filteredReceipts = useLocalSearch(
    receipts,
    search,
    [
      "receipt_number",
      "name",
      "email",
      "phone",
    ]
  );

  // pagination
  const [perPage, setPerPage] = useState(10);

  const {
  data: paginatedReceipts,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination(filteredReceipts, perPage);


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
  const Button = (
    <div className="mt-5">
      <Link href={'/app/create-receipt'} className="myHover-translate flex gap-1 text-[0.88rem] font-semibold py-2 px-4 border bg-gray-50 border-gray-300 transition duration-300 hover:bg-gray-200 rounded-3xl">
        <PlusIcon strokeWidth={2} className="h-5 shrink-0" />
        Create Receipt
      </Link>
    </div>
  )



  if (loading) return <SkeletonLoader />;
  if (error) return <div className="app-body-wrapper flex justify-center mt-20">
    <p className="text-red-500">Error: {error}</p>
  </div>;
  if(receipts.length === 0) return <EmptyState button={Button} title="No Receipts Found" subTitle="All your receipts will appear here." />;

  return (
    <ProtectedRoute>
      <section className='app-body-wrapper'>
        <div className="mb-5 w-full flex justify-between items-center">
          <div>
            <h1 className="text-xl"><span className="font-semibold">All Receipts</span></h1>
            <span className="text-sm text-gray-500">View and manage all receipts</span>
          </div>
          <div>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search receipts..."
            />
          </div>
        </div>
        <div className="body-content mb-96 w-full">
          <div>
            <ul className='grid ul-table border border-gray-200 rounded-2xl'>
              { paginatedReceipts.length > 0 ? (
                paginatedReceipts.map((receipt) => (
                  <ReceiptTableList 
                    key={receipt.id}
                    receipt={receipt}
                    onDelete={() => openDeleteModal(receipt)}
                  />
                ))
              ) : search ? (
                <NoSearchResult input="receipts" onClick={setSearch} />
              ) : null }
            </ul>
          </div>
          {
            paginatedReceipts.length > 0 && (
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

export default AllReceipt