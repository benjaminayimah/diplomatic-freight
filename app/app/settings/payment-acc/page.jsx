'use client'

import React, { useState, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import BankCard from "../../../components/dashboard/BankCard";
import { useAuth } from "@/hooks/useAuth";
import Modal from "@/app/components/modals/Modal";
import DeleteModal from "@/app/components/modals/DeleteModal";
import Input from "@/app/components/Input";
import ErrorCard from "../../../components/ErrorCard";
import SubmitButton from "../../../components/SubmitButton";
import { useSnackbar } from "@/app/components/SnackbarContext";
import Select from '@/app/components/Select';
import { RadioGroup } from "../../../components/RadioGroup";
import Radio from "../../../components/Radio";
import { validateWalletAddress } from "@/utils/crypto/validateWalletAddress";
import useDeleteModal from "@/hooks/useDeleteModal";
import useDelete from "@/hooks/useDelete"
import { PAYMENT_METHODS, USDT_NETWORKS } from "@/app/constants/payment";



function Settings() {

  const profile = useAuthStore((state) => state.profile);
  const payments = useAuthStore((state) => state.payments);

  const setDeletePaymentById = useAuthStore(
    (state) => state.setDeletePaymentById
  );
  const setPaymentData = useAuthStore(
    (state) => state.setPaymentData
  );

  const [open, setOpen] = useState(false);

  const [modalTitle, setModalTitle] = useState('')
  const [modalSubTitle, setModalSubTitle] = useState('')
  const [modalSubmitBtnText, setModalSubmitBtnText] = useState('')

  const [isEditingBank, setIsEditingBank] = useState(false)
  

  const { createBankOrUpdate, paymentDelete } = useAuth();
  
  const [bankForm, setBankForm] = useState({
    payment_method: PAYMENT_METHODS[0].value,
    bank_name: '',
    bank_branch: '',
    account_name: '',
    account_number: '',
    swift_code: '',
    wallet_address: '',
    network: '',
    id: null
  });

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});


  const formatErrors = (errors) => {
    const fieldErrors = {};
    errors.forEach(({ path, msg }) => {
      fieldErrors[path] = [...(fieldErrors[path] || []), msg];
    });
    return fieldErrors;
  };

  const { showSnackbar } = useSnackbar()
  

  // Open modal
    const handleOpenModal = useCallback(() => {
          setBankForm({
            payment_method: PAYMENT_METHODS[0].value,
            bank_name: '',
            bank_branch: '',
            account_name: '',
            account_number: '',
            swift_code: '',
            wallet_address: '',
            network: '',
            id: null
          })
          setModalTitle('Add Payment Account')
          setModalSubTitle('Add a new payment account detail')
          setModalSubmitBtnText('Add account')
          setOpen(true);
      },
      [profile]
    );

  // Close modal
  const handleCloseModal = useCallback(() => {
    setOpen(false);
    resetErrors()
  }, []);

  const resetErrors = () => {
    setErrors({});
    setError(null);
  }
  const clearFieldError = useCallback((field) => {
    setErrors((prev) => ({ ...prev, [field]: [] }));
  }, []);

  // Handle submit

  const handlePaymentPrefetch = async (payload) => {
    setBankForm({
      payment_method: payload.payment_method || PAYMENT_METHODS[0].value,
      bank_name: payload.bank_name || '',
      bank_branch: payload.bank_branch || '',
      account_name: payload.account_name || '',
      account_number: payload.account_number || '',
      swift_code: payload.swift_code || '',
      wallet_address: payload.wallet_address || '',
      network: payload.network || '',
      id: payload.id 
    });
    setModalTitle('Edit payment detail')
    setModalSubTitle('Edit this payment account detail')
    setModalSubmitBtnText('Save changes')
    setIsEditingBank(true)
    setOpen(true);
  }
  
  const handleSubmitBank = async (e) => {
    e.preventDefault();
    resetErrors()

    if (bankForm.payment_method === "usdt_wallet") {
      const walletError = validateWalletAddress(
        bankForm.network,
        bankForm.wallet_address
      );

      if (walletError) {
        setErrors((prev) => ({
          ...prev,
          wallet_address: [walletError],
        }));

        return;
      }
    }

    setLoading(true);

    const response = await createBankOrUpdate(bankForm);
    setLoading(false);

    if (response?.success) {
      setPaymentData(response.data);
      handleCloseModal();
      showSnackbar(
        `${ isEditingBank? 'Changes saved successfully!' : 'New Bank has been added'}`,
        "success"
      )
      setIsEditingBank(false)
    } else if (response?.errors) {
      setErrors(formatErrors(response.errors));
      showSnackbar(
        "Validation error. Please check your inputs",
        "error"
      )
    } else {
      showSnackbar(
        `${response?.error || 'Something went wrong. Please try again.'}`,
        "error"
      )
    }
  }


  const {
    deleteModalOpen,
    itemToDelete,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteModal();

  const {
    deleting,
    handleDelete,
  } = useDelete({
    deleteRequest: paymentDelete,
    removeFromStore: setDeletePaymentById,
    closeModal: closeDeleteModal,
    successMessage: "Payment deleted successfully!",
  });

  const placeholders = {
    erc20: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    bep20: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    polygon: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    avalanche: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    trc20: "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE",
    solana: "9xQeWvG816bUx9EPjHmaT23r2K6q7hXnX8pY4rQd8sW",
    ton: "EQD8...",
  };

  const deleteModalInner = (
    <div>
      <p className="text-sm mb-4 text-gray-900">
        Are you sure you want to delete this account?
      </p>
      <p className="text-sm mb-4 text-gray-900">
        <strong>Note:</strong> This action can <strong>not</strong> be reversed.
      </p>
    </div>
  )
  

  return (
      <>
        <article className="p-4 flex-1 flex flex-col bg-gray-50 rounded-xl border border-gray-100 mb-10">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl">Payment Accounts</h2>
            { payments?.length > 0 && (
              <div>
                <button
                  onClick={() => handleOpenModal()}
                  className="flex gap-1 text-[#0077FF] items-center text-[0.88rem] font-semibold py-2 px-3 transition duration-300 hover:bg-gray-100 rounded-3xl"
                >
                  <svg height="14" viewBox="0 0 14 14">
                    <path d="M7,0a.875.875,0,0,1,.875.875v5.25h5.25a.875.875,0,0,1,0,1.75H7.875v5.25a.875.875,0,0,1-1.75,0V7.875H.875a.875.875,0,0,1,0-1.75h5.25V.875A.875.875,0,0,1,7,0Z" fill="#2563EB"/>
                  </svg>
                  Add Account
                </button>
              </div>
            )}
            
          </div>
            {
              payments?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                  payments.map((payment) => (
                    <BankCard
                      key={payment.id}
                      data={payment}
                      onEdit={handlePaymentPrefetch}
                      showMenu={true}
                      onDelete={() => openDeleteModal(payment)}
                    />
                  ))
                }
                </div>
              ) : (
                <div className="p-10 border bg-white border-gray-200 rounded-2xl grid place-items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className="mb-4">
                      <h3 className="text-xl text-center mb-2">You Have No Saved Accounts!</h3>
                      <div className="text-gray-500 text-sm text-center">To show your payment details on invoices, add your payment account details</div>
                  </div>
                  <button
                    onClick={() => handleOpenModal()}
                    className="myHover-translate inline-block text-[0.88rem] font-semibold py-2 px-4 border bg-gray-50 border-gray-300 transition duration-300 hover:bg-gray-200 rounded-3xl"
                  >
                    Add payment detail
                  </button>
                  </div>
                  
                </div>
              )
            }
        </article>
        {/* Modal */}
          <Modal
            isOpen={open}
            onClose={handleCloseModal}
            title={modalTitle}
            subTitle={modalSubTitle}
          >
            { error && <ErrorCard error={error} /> }
              <div className="mt-4">
                <form onSubmit={ handleSubmitBank } className="flex flex-col gap-5">
                    <div className="flex flex-col gap-4">
                      <RadioGroup label="Select Payment Method">
                        <div className="grid grid-cols-3">
                          {PAYMENT_METHODS.map((method) => (
                            <Radio
                              key={method.value}
                              label={method.label}
                              name="payment_method"
                              value={method.value}
                              checked={bankForm.payment_method === method.value}
                              onChange={(e) => setBankForm({ ...bankForm, payment_method: e.target.value })}
                              disabled={method.disabled}  
                            />
                          ))}
                        </div>
                      </RadioGroup>
                      { bankForm.payment_method === "bank_transfer" && (
                        <>
                          <Input
                            label="Bank Name"
                            id="bank_name"
                            type="text"
                            placeholder="Enter bank name"
                            value={bankForm.bank_name}
                            onChange={(e) => setBankForm({ ...bankForm, bank_name: e.target.value })}
                            errors={errors.bank_name || []}
                            onFocus={() => clearFieldError('bank_name')}
                            required
                          />
                          <Input
                            label="Bank Branch"
                            id="bank_branch"
                            type="text"
                            placeholder="Enter bank branch"
                            value={bankForm.bank_branch}
                            onChange={(e) => setBankForm({ ...bankForm, bank_branch: e.target.value })}
                            errors={errors.bank_branch || []}
                            onFocus={() => clearFieldError('bank_branch')}
                          />
                          <Input
                            label="Account Name"
                            id="account_name"
                            type="text"
                            placeholder="Enter account name"
                            value={bankForm.account_name}
                            onChange={(e) => setBankForm({ ...bankForm, account_name: e.target.value })}
                            errors={errors.account_name || []}
                            onFocus={() => clearFieldError('account_name')}
                            required
                          />
                          <Input
                            label="Account Number"
                            id="account_number"
                            type="text"
                            placeholder="Enter account number"
                            value={bankForm.account_number}
                            onChange={(e) => setBankForm({ ...bankForm, account_number: e.target.value })}
                            errors={errors.account_number || []}
                            onFocus={() => clearFieldError('account_number')}
                            required
                          />
                          <Input
                            label="SWIFT Code"
                            id="swift_code"
                            type="text"
                            placeholder="Enter SWIFT code"
                            value={bankForm.swift_code}
                            onChange={(e) => setBankForm({ ...bankForm, swift_code: e.target.value })}
                            errors={errors.swift_code || []}
                            onFocus={() => clearFieldError('swift_code')}
                          />
                        </>
                        
                      )}
                      { bankForm.payment_method === "usdt_wallet" && (
                        <>
                          <Select
                            label="Network"
                            id="network"
                            required
                            placeholder="Select network"
                            options={USDT_NETWORKS}
                            value={bankForm.network}
                            onChange={(e) => {
                              setBankForm({
                                ...bankForm,
                                network: e.target.value,
                                wallet_address: ""
                              });
                              clearFieldError("network");
                              clearFieldError("wallet_address");
                            }}
                            errors={errors.network || []}
                            onFocus={() => clearFieldError('network')}
                          />
                          
                          <Input
                            label="Wallet Address"
                            id="wallet_address"
                            type="text"
                            placeholder={placeholders[bankForm.network] || "Enter wallet address"}
                            value={bankForm.wallet_address}
                            disabled={!bankForm.network}
                            onChange={(e) => setBankForm({ ...bankForm, wallet_address: e.target.value })}
                            errors={errors.wallet_address || []}
                            onFocus={() => clearFieldError('wallet_address')}
                            required
                          />
                        </>
                      )}
                    </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={handleCloseModal} className="text-[0.88rem] font-medium px-4 py-2 rounded-3xl bg-gray-100 border border-gray-200 transition duration-300 hover:bg-gray-200">
                      Cancel
                    </button>
                    <SubmitButton loading={loading} className={'bg-[#0077FF] text-white'}>
                      {modalSubmitBtnText}
                    </SubmitButton>
                  </div>
                </form>
              </div>
          </Modal>

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
      </>
  )
}

export default Settings