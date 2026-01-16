'use client'

import React, { useState, useCallback } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useAuthStore } from "@/store/authStore";
import BankCard from "../../components/dashboard/BankCard";
import { useAuth } from "@/hooks/useAuth";
import Modal from "@/app/components/dashboard/Modal";
import Input from "@/app/components/Input";
import ErrorCard from "../../components/ErrorCard";
import SubmitButton from "../../components/SubmitButton";
import { useSnackbar } from "@/app/components/SnackbarContext";
import { useUIStore } from "@/store";
import Select from '@/app/components/Select';
import { RadioGroup } from "../../components/RadioGroup";
import Radio from "../../components/Radio";


function CompanyInfo() {

  const profile = useAuthStore((state) => state.profile);
  const payments = useAuthStore((state) => state.payments);
  const { setCompanyData, setPaymentData, setDeletePaymentById } = useAuthStore()

  const [open, setOpen] = useState(false);

  const [modalType, setModalType] = useState(''); // "edit" | "password"
  const [modalTitle, setModalTitle] = useState('')
  const [modalSubTitle, setModalSubTitle] = useState('')
  const [modalSubmitBtnText, setModalSubmitBtnText] = useState('')

  const [isEditingBank, setIsEditingBank] = useState(false)


  

  const { updateProfile, createBankOrUpdate, deletePayment } = useAuth();

  const [profileForm, setProfileForm] = useState({
    company_name: '',
    email: '',
    phone: '',
    mobile: '',
    address_line_1: '',
    address_line_2: '',
    address_line_3: '',
    po_box: '',
    website: '',
    tagline: ''
  });

  const paymentMethods = useUIStore((state) => state.paymentMethods);
  
  const [bankForm, setBankForm] = useState({
    payment_method: paymentMethods[0].value,
    bank_name: '',
    bank_branch: '',
    account_name: '',
    account_number: '',
    swift_code: '',
    wallet_address: '',
    network: '',
    qr_code: '',
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
    const handleOpenModal = useCallback(
      (type) => {
        setModalType(type);
        if (type === "profile" && profile) {
          setProfileForm({
            company_name: profile.company_name || '',
            email: profile.email || '',
            phone: profile.phone || '',
            mobile: profile.mobile || '',
            address_line_1: profile.address_line_1 || '',
            address_line_2: profile.address_line_2 || '',
            address_line_3: profile.address_line_3 || '',
            po_box: profile.po_box || '',
            website: profile.website || '',
            tagline: profile.tagline || ''
          });
          setModalTitle('Update Company Profile')
          setModalSubTitle('Edit company profile details')
          setModalSubmitBtnText('Save changes')

        } else if (type === "bank") {
          setBankForm({
            payment_method: paymentMethods[0].value,
            bank_name: '',
            bank_branch: '',
            account_name: '',
            account_number: '',
            swift_code: '',
            wallet_address: '',
            network: '',
            qr_code: '',
            id: null
          })
          setModalTitle('Add Payment Account')
          setModalSubTitle('Add a new payment account detail')
          setModalSubmitBtnText('Add account')
        }
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

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    resetErrors()
    setLoading(true);

    const response = await updateProfile(profileForm, profile?.id);
    setLoading(false);

    if (response?.success) {
      setCompanyData(response.data);
      handleCloseModal();
      showSnackbar(
        `Company profile updated successfully!`,
        "success"
      )
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

  

  const handlePaymentPrefetch = async (payload) => {
    setModalType('bank');
    setBankForm({
      payment_method: payload.payment_method || paymentMethods[0].value,
      bank_name: payload.bank_name || '',
      bank_branch: payload.bank_branch || '',
      account_name: payload.account_name || '',
      account_number: payload.account_number || '',
      swift_code: payload.swift_code || '',
      wallet_address: payload.wallet_address || '',
      network: payload.network || '',
      qr_code: payload.qr_code || '',
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

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);
  
  const handleDeletePayment = async (id) => {
    resetErrors()
    setLoading(true);
    const response = await deletePayment(id)
    setLoading(false);

    if (response?.success) {
      setDeletePaymentById(id);
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

  return (
    <ProtectedRoute>
      <section className='app-body-wrapper'>
        <div className="mb-5">
          <h1 className="text-xl"><span className="font-semibold">Company Information</span></h1>
          <span className="text-sm text-gray-500">View and manage your company's information</span>
        </div>
        <div className="body-content">
          <div className="flex flex-col gap-6">
            <article className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <h2 className="mb-3 text-xl">Basic Details</h2>
              <div className="px-6 py-2 border bg-white border-gray-200 rounded-2xl">
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Company name</span>
                  <div className="text-gray-600 md:text-right">{profile?.company_name}</div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Email</span>
                  <div className="text-gray-600 md:text-right">{profile?.email}</div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Phone</span>
                  <div className="text-gray-600 md:text-right">{profile?.phone}</div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Mobile</span>
                  <div className="text-gray-600 md:text-right">{profile?.mobile}</div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Address</span>
                  <div className="text-gray-600 md:text-right">
                    {profile?.address_line_1}<br />
                    {profile?.address_line_2}<br />
                    {profile?.address_line_3}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Post Office Box</span>
                  <div className="text-gray-600 md:text-right">{profile?.po_box}</div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Website</span>
                  <div className="text-gray-600 md:text-right">{profile?.website}</div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
                  <span className="font-semibold">Tagline</span>
                  <div className="text-gray-600 md:text-right">{profile?.tagline}</div>
                </div>
                <div className="flex gap-2 py-5 justify-end">
                  <button
                    onClick={() => handleOpenModal('profile')}
                    className="myHover-translate inline-block text-[0.88rem] font-semibold py-2 px-4 border bg-gray-50 border-gray-300 transition duration-300 hover:bg-gray-200 rounded-3xl"
                  >
                    Edit profile
                  </button>
                </div>
              </div>
            </article>
            <article className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-10">
              <div className="flex justify-between items-cente mb-2">
                <h2 className="mb-3 text-xl">Bank Details</h2>
                <div>
                  <button
                    onClick={() => handleOpenModal('bank')}
                    className="flex gap-1 text-[#0077FF] items-center text-[0.88rem] font-semibold py-2 px-3 transition duration-300 hover:bg-gray-100 rounded-3xl"
                  >
                    <svg height="14" viewBox="0 0 14 14">
                      <path d="M7,0a.875.875,0,0,1,.875.875v5.25h5.25a.875.875,0,0,1,0,1.75H7.875v5.25a.875.875,0,0,1-1.75,0V7.875H.875a.875.875,0,0,1,0-1.75h5.25V.875A.875.875,0,0,1,7,0Z" fill="#2563EB"/>
                    </svg>
                    Add payment account
                  </button>
                </div>
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
                          onDelete={() => {
                            setPaymentToDelete(payment);
                            setDeleteModalOpen(true);
                          }}
                        />
                      ))
                    }
                    </div>
                  ) : (
                    <div className="p-10 border bg-white border-gray-200 rounded-2xl grid place-items-center">
                      <div className="mb-4">
                        <h3 className="text-xl text-center">Your have no Payment detail saved!</h3>
                        <div className="text-gray-500 text-sm text-center">To show your payment details on invoices, add a payment account detail</div>
                      </div>
                      <button
                        onClick={() => handleOpenModal('bank')}
                        className="myHover-translate inline-block text-[0.88rem] font-semibold py-2 px-4 border bg-gray-50 border-gray-300 transition duration-300 hover:bg-gray-200 rounded-3xl"
                      >
                        Add payment detail
                      </button>
                    </div>
                  )
                }
            </article>
          </div>
        </div>

        {/* Modal */}
          <Modal
            isOpen={open}
            onClose={handleCloseModal}
            title={modalTitle}
            subTitle={modalSubTitle}
          >
            { error && <ErrorCard error={error} /> }
              <div className="mt-4">
                <form onSubmit={modalType === 'profile' ? handleSubmitProfile : handleSubmitBank } className="flex flex-col gap-5">
                  {modalType === "profile" && (
                    <div className="flex flex-col gap-4">
                      <Input
                        label="Company Name"
                        id="company_name"
                        type="text"
                        placeholder="Enter company"
                        value={profileForm.company_name}
                        onChange={(e) => setProfileForm({ ...profileForm, company_name: e.target.value })}
                        errors={errors.company_name || []}
                        onFocus={() => clearFieldError('company_name')}
                      />
                      <Input
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        errors={errors.email || []}
                        onFocus={() => clearFieldError('email')}
                      />
                      <Input
                        label="Phone"
                        id="phone"
                        type="text"
                        placeholder="Enter phone number"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        errors={errors.phone || []}
                        onFocus={() => clearFieldError('phone')}
                      />
                      <Input
                        label="Mobile"
                        id="mobile"
                        type="text"
                        placeholder="Enter mobile number"
                        value={profileForm.mobile}
                        onChange={(e) => setProfileForm({ ...profileForm, mobile: e.target.value })}
                        errors={errors.mobile || []}
                        onFocus={() => clearFieldError('mobile')}
                      />
                      <Input
                        label="Address Line 1"
                        id="address_line_1"
                        type="text"
                        placeholder="Enter address line 1"
                        value={profileForm.address_line_1}
                        onChange={(e) => setProfileForm({ ...profileForm, address_line_1: e.target.value })}
                        errors={errors.address_line_1 || []}
                        onFocus={() => clearFieldError('address_line_1')}
                      />
                      <Input
                        label="Address Line 2"
                        id="address_line_2"
                        type="text"
                        placeholder="Enter address line 2"
                        value={profileForm.address_line_2}
                        onChange={(e) => setProfileForm({ ...profileForm, address_line_2: e.target.value })}
                        errors={errors.address_line_2 || []}
                        onFocus={() => clearFieldError('address_line_2')}
                      />
                      <Input
                        label="Address Line 3"
                        id="address_line_3"
                        type="text"
                        placeholder="Enter address line 3"
                        value={profileForm.address_line_3}
                        onChange={(e) => setProfileForm({ ...profileForm, address_line_3: e.target.value })}
                        errors={errors.address_line_3 || []}
                        onFocus={() => clearFieldError('address_line_3')}
                      />
                      <Input
                        label="P.O. Box"
                        id="po_box"
                        type="text"
                        placeholder="Enter P.O. Box"
                        value={profileForm.po_box}
                        onChange={(e) => setProfileForm({ ...profileForm, po_box: e.target.value })}
                        errors={errors.po_box || []}
                        onFocus={() => clearFieldError('po_box')}
                      />
                      <Input
                        label="Website Address"
                        id="website"
                        type="text"
                        placeholder="Enter website"
                        value={profileForm.website}
                        onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                        errors={errors.website || []}
                        onFocus={() => clearFieldError('website')}
                      />
                      <Input
                        label="Tagline"
                        id="tagline"
                        type="text"
                        placeholder="Enter tagline"
                        value={profileForm.tagline}
                        onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                        errors={errors.tagline || []}
                        onFocus={() => clearFieldError('tagline')}
                      />
                    </div>
                  )}
                  { modalType === "bank" && (
                    <div className="flex flex-col gap-4">
                      <RadioGroup label="Select Payment Method">
                        <div className="grid grid-cols-3">
                          {paymentMethods.map((method) => (
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
                      {/* <Select
                        label="Payment method"
                        id="payment_method"
                        required
                        placeholder="Select payment method"
                        options={paymentMethods.filter(method => !method.disabled)}
                        value={bankForm.payment_method}
                        onChange={(e) => setBankForm({ ...bankForm, payment_method: e.target.value })}
                        errors={errors.payment_method}
                      /> */}
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
                          <Input
                            label="Wallet Address"
                            id="wallet_address"
                            type="text"
                            placeholder="Enter wallet address"
                            value={bankForm.wallet_address}
                            onChange={(e) => setBankForm({ ...bankForm, wallet_address: e.target.value })}
                            errors={errors.wallet_address || []}
                            onFocus={() => clearFieldError('wallet_address')}
                            required
                          />
                          <Input
                            label="Network"
                            id="network"
                            type="text"
                            placeholder="Enter network"
                            value={bankForm.network}
                            onChange={(e) => setBankForm({ ...bankForm, network: e.target.value })}
                            errors={errors.network || []}
                            onFocus={() => clearFieldError('network')}
                            required
                          />
                          <Input
                            label="QR Code Link"
                            id="qr_code"
                            type="text"
                            placeholder="Enter QR code url"
                            value={bankForm.qr_code}
                            onChange={(e) => setBankForm({ ...bankForm, qr_code: e.target.value })}
                            errors={errors.qr_code || []}
                            onFocus={() => clearFieldError('qr_code')}
                            required
                          />
                        </>
                      )}
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={handleCloseModal} className="myHover-translate text-[0.88rem] font-medium px-4 py-2 rounded-3xl bg-gray-100 border border-gray-200 transition duration-300 hover:bg-gray-200">
                      Cancel
                    </button>
                    <SubmitButton loading={loading} className={'bg-[#0077FF] text-white'}>
                      {modalSubmitBtnText}
                    </SubmitButton>
                  </div>
                </form>
              </div>
          </Modal>

          <Modal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Confirm Delete"
            maxWidth="460px"
          >
            <p className="text-sm mb-4 text-gray-500">
              Are you sure you want to delete payment: <strong>{paymentToDelete?.payment_name}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="text-[0.88rem] font-medium px-4 py-2 rounded-3xl bg-gray-100 border border-gray-200 transition duration-300 hover:bg-gray-200"
              >
                Cancel
              </button>
              <SubmitButton
                loading={loading}
                className={'bg-red-600 text-white hover:bg-red-700'}
                onClick={async () => {
                  setDeleteModalOpen(false);
                  if (paymentToDelete) await handleDeletePayment(paymentToDelete.id);
                  setPaymentToDelete(null);
                }}
                >
                Delete
              </SubmitButton>
            </div>
          </Modal>

      </section>
    </ProtectedRoute>
  )
}

export default CompanyInfo