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
import useLocalSearch from "@/hooks/useLocalSearch";
import SearchInput from '@/app/components/dashboard/SearchInput';
import NoSearchResult from "@/app/components/dashboard/NoSearchResult"
import usePagination from "@/hooks/usePagination"
import PaginationFooter from '@/app/components/dashboard/PaginationFooter';



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

  const [showNote, setShowNote] = useState(false)
  const [selectedNote, setSelectedNote] = useState('')

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
  const options = [
    {label: 10, value: 10},
    {label: 25, value: 25},
    {label: 50, value: 50},
    {label: 100, value: 100},
  ]

  const {
  data: paginatedInvoices,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    goToPage,
    hasNextPage,
    hasPreviousPage,
  } = usePagination(filteredInvoices, perPage);

  // empty state
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
                    onDelete={() => {
                      setInvoiceToDelete(invoice);
                      setDeleteModalOpen(true);
                    }}
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
            Are you sure you want to delete invoice: <strong>{invoiceToDelete?.reference_number}</strong>?
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
                if (invoiceToDelete) await handleDeleteInvoice(invoiceToDelete.id);
                setInvoiceToDelete(null);
              }}
              >
              Yes, Delete
            </SubmitButton>
          </div>
        </Modal>
        <Modal
          isOpen={showNote}
          onClose={() => setShowNote(false)}
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