import React from 'react'
import Modal from './Modal'
import SubmitButton from '../../components/SubmitButton';

function DeleteModal({
  deleteModalOpen,
  closeDeleteModal,
  deleteModalInner,
  deleting,
  onClick
}) {
  return (
    <Modal
      isOpen={deleteModalOpen}
      onClose={() => closeDeleteModal()}
      title="Confirm Delete"
      maxWidth="460px"
    >
      { deleteModalInner }
      <div className="flex justify-end gap-2">
        <button
          onClick={() => closeDeleteModal()}
          className="text-[0.88rem] font-medium px-4 py-2 rounded-3xl bg-gray-100 border border-gray-200 transition duration-300 hover:bg-gray-200"
        >
          Cancel
        </button>
        <SubmitButton
          loading={deleting}
          className={'bg-red-600 text-white hover:bg-red-700'}
          onClick={onClick}
          >
          Yes, Delete
        </SubmitButton>
      </div>
    </Modal>
  )
}

export default DeleteModal