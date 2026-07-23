'use client'

import React, { useState, useEffect } from 'react'
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import InvoiceTableList from '../../components/dashboard/InvoiceTableList';
import Modal from "@/app/components/modals/Modal";
import DeleteModal from "@/app/components/modals/DeleteModal";
import useFetchData from "@/hooks/useFetchData";
import useLocalSearch from "@/hooks/useLocalSearch";
import SearchInput from '@/app/components/dashboard/SearchInput';
import NoSearchResult from "@/app/components/dashboard/NoSearchResult"
import usePagination from "@/hooks/usePagination"
import PaginationFooter from '@/app/components/dashboard/PaginationFooter';
import useDeleteModal from "@/hooks/useDeleteModal";
import useDelete from "@/hooks/useDelete"
import { PAGE_OPTIONS } from "@/app/constants/pagination";
import EmptyState from "@/app/components/dashboard/EmptyState"
import Link from 'next/link';
import { PlusIcon } from "@heroicons/react/24/outline";
import SkeletonLoader from "@/app/components/dashboard/SkeletonLoader"





function AllInvoice() {


  const invoices = useAuthStore(
    (state) => state.invoices
  );
  const setInvoices = useAuthStore(
    (state) => state.setInvoices
  );
  const setDeleteInvoiceById = useAuthStore(
    (state) => state.setDeleteInvoiceById
  );


  const { data, loading, error } = useFetchData("/invoice");

  useEffect(() => {
    if (!data?.invoices) return;

    setInvoices(
      [...data.invoices].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    );
  }, [data, setInvoices]);


  const [showNote, setShowNote] = useState(false)
  const [selectedNote, setSelectedNote] = useState('')

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
  });

  // search
  const [search, setSearch] = useState("");

  const filteredInvoices = useLocalSearch(
    invoices,
    search,
    [
      "reference_number",
      "name",
      "email",
      "phone",
    ]
  );

  // pagination
  const [perPage, setPerPage] = useState(10);

  const {
  data: paginatedInvoices,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    // goToPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination(filteredInvoices, perPage);


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

  const Button = (
    <div className="mt-5">
      <Link href={'/app/create-invoice'} className="myHover-translate flex gap-1 text-[0.88rem] font-semibold py-2 px-4 border bg-gray-50 border-gray-300 transition duration-300 hover:bg-gray-200 rounded-3xl">
        <PlusIcon strokeWidth={2} className="h-5 shrink-0" />
        Create Invoice
      </Link>
    </div>
  )

  // empty state
  if (loading) return <SkeletonLoader />;
  if (error) return <div className="app-body-wrapper flex justify-center mt-20">
    <p className="text-red-500">Error: {error}</p>
  </div>;
  if(invoices.length === 0) return <EmptyState button={Button} title="No Invoices Found" subTitle="All your invoices will appear here." />;

  return (
    <ProtectedRoute>
      <section className='app-body-wrapper'>
        <div className="mb-5 w-full flex justify-between items-center">
          <div>
            <h1 className="text-xl"><span className="font-semibold">All Invoices</span></h1>
            <span className="text-sm text-gray-500">View and manage all invoices</span>
          </div>
          <div>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search invoices..."
            />
          </div>
        </div>
        <div className="body-content mb-96 w-full">
          <div>
            <ul className='grid ul-table border border-gray-200 rounded-2xl'>
              { paginatedInvoices.length > 0 ? (
                paginatedInvoices.map((invoice) => (
                  <InvoiceTableList 
                    key={invoice.id}
                    invoice={invoice}
                    onClick={(note) => {
                      setSelectedNote(note);
                      setShowNote(true);
                    }}
                    onDelete={() => openDeleteModal(invoice)}
                  />
                ))
              ) : search ? (
                <NoSearchResult input="invoices" onClick={setSearch} />
              ) : null }
            </ul>
          </div>
          {
            paginatedInvoices.length > 0 && (
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
      <Modal
        isOpen={showNote}
        onClose={() => {
          setShowNote(false);
          setSelectedNote('');
        }}
        title="Personal note"
        maxWidth="600px"
      >
        <div className="mt-3">
          <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: selectedNote,
              }}
            />
        </div>
      </Modal>
    </ProtectedRoute>
  )
}

export default AllInvoice