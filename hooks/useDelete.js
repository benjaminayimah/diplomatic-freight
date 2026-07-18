import { useState } from "react";
import { useSnackbar } from "@/app/components/SnackbarContext";

export default function useDelete({
  deleteRequest,
  removeFromStore,
  closeModal,
  onSuccess,
  successMessage = "Deleted successfully!",
  errorMessage = "Error deleting. Try again",
}) {
  const [deleting, setDeleting] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleDelete = async (id) => {
    setDeleting(true);

    try {
      const response = await deleteRequest(id);

      if (response?.success) {
        removeFromStore(id);

        closeModal?.();
        onSuccess?.(id, response);

        showSnackbar(successMessage, "success");

        return true;
      }

      showSnackbar(response?.error || errorMessage, "error");
      return false;

    } catch {
      showSnackbar(errorMessage, "error");
      return false;

    } finally {
      setDeleting(false);
    }
  };

  return {
    deleting,
    handleDelete,
  };
}