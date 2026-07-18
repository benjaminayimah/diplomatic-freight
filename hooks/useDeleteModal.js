import { useState } from "react";

export default function useDeleteModal() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  return {
    deleteModalOpen,
    itemToDelete,
    openDeleteModal,
    closeDeleteModal,
  };
}