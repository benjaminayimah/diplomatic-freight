'use client';
import BackButton from '@/app/components/dashboard/BackButton'; 

import React, { useState, useEffect, useCallback } from 'react'
import Input from '@/app/components/Input';
import Textarea from '@/app/components/Textarea';
import Select from '@/app/components/Select';
import InvoiceItem from '@/app/components/dashboard/InvoiceItem';
import SubmitButton from '@/app/components/SubmitButton';
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import ErrorCard from '@/app/components/ErrorCard';
import { useSnackbar } from "@/app/components/SnackbarContext"; 
import { useRouter } from "next/navigation"; // Added useRouter
import Modal from '../modals/Modal';
import InvoiceTemplate from './InvoiceTemplate';
import { useUIStore } from "@/store";
import PaymentSelectCard from './PaymentSelectCard'
import Link from 'next/link';
import PaymentListDisplayCard from './PaymentListDisplayCard';
import RichTextEditor from './RichTextEditor';
import PersonalNote from "@/app/components/dashboard/PersonalNote"
import { CURRENCIES } from "@/app/constants/currencies";




function CreateOrUpdateInvoiceForm({ mode = null, id = null }) {

  const isEditing = mode === "edit" && id;
  const router = useRouter(); 

  const VAT = process.env.NEXT_PUBLIC_VAT

  const [vatOld, setVatOld] = useState(null)

  const [appliedVat, setAppliedVat] = useState(true)
  const [newVat, setNewVat] = useState(false)
  
  // ✅ 1. New State to track if form is modified
  const [isDirty, setIsDirty] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    note: '',
    date_issue: '',
    date_due: '',
    date_of_departure: '',
    currency: CURRENCIES[0]?.value || 'USD',
    items: [],
    paymentIDs: [],
    vat: '',
    personal_note: '',
    has_refund_policy: true,
    id: null
  })

  const invoices = useAuthStore((state) => state.invoices);
  const payments = useAuthStore((state) => state.payments);
  const profile = useAuthStore((state) => state.profile);


  const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // ✅ 2. Warn user on Browser Refresh, Close Tab, or Back Button
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = ''; // Required for Chrome/modern browsers
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);


  useEffect(() => {
    if (!isEditing || !invoices) return;
    const invoice = invoices.find((item) => String(item.id) === String(id));

    if (invoice) {
      setVatOld(invoice.vat)
      if(invoice.vat && VAT === invoice.vat) {
        setNewVat(true)
      }

      setForm({
        name: invoice.name,
        email: invoice.email,
        phone: invoice.phone,
        address: invoice.address,
        note: invoice.note,
        date_issue: formatDateForInput(invoice.date_issue),
        date_due: formatDateForInput(invoice.date_due),
        date_of_departure: formatDateForInput(invoice.date_of_departure),
        currency: invoice.currency || 'USD',
        items: invoice.items,
        paymentIDs: invoice.payments?.map(payment => payment.id) || [],
        vat: invoice.vat,
        has_refund_policy: invoice.has_refund_policy,
        personal_note: invoice.personal_note,
        id: id
      })
      // Note: We do NOT set isDirty to true here, because this is the initial load
    }
  }, [isEditing, id, invoices, VAT]);

  useEffect(() => {
    if (!isEditing) {
      setVatOld(null)
      setAppliedVat(false)
      setNewVat(false)
      setForm(() => ({
        name: '',
        email: '',
        phone: '',
        address: '',
        note: '',
        date_issue: '',
        date_due: '',
        date_of_departure: '',
        currency: CURRENCIES[0]?.value || 'USD',
        vat: '',
        id: null,
        has_refund_policy: true,
        paymentIDs: [],
        personal_note: '',
        items: [
          { id: Date.now(), description: '', quantity: 1, rate: '', amount: '' }
        ],                                                // extra_charges: '',
      }));
    }
  }, [isEditing]);


  // ✅ Helper to handle generic input changes and mark dirty
  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { id: Date.now(), description: '', quantity: 1, rate: '', amount: '' }
      ]                                                     //, extra_charges: ''
    }));
    setIsDirty(true); // ✅ Mark dirty
  };

  const removeItem = (id) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
    setIsDirty(true); // ✅ Mark dirty
  };

  const includeNewVat = (e, vat) => {
    setIsDirty(true); // ✅ Mark dirty
    if(e) {
      setForm({...form, vat: vat })
      setNewVat(true)
      appliedVat ? setAppliedVat(false) : ''
    }else {
      setForm({...form, vat: '' })
      setNewVat(false)
    }
  }
   const includeAppliedVat = (e, vat) => {
    setIsDirty(true); // ✅ Mark dirty
    if(e) {
      setForm({...form, vat: vat })
      setAppliedVat(true)
      newVat ? setNewVat(false) : ''
    }else {
      setForm({...form, vat: '' })
      setAppliedVat(false)
    }
  }


  // Helper to update a row
  const updateItem = (index, field, value) => {
    const updatedItems = [...form.items];
    updatedItems[index][field] = value;

    setForm((prev) => ({ ...prev, items: updatedItems }));
    setIsDirty(true); // ✅ Mark dirty
  };


  const getTotalAmount = () => {
    const vatRate = Number(form.vat)/100 || 0
    const subtotal = form.items?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const vat = subtotal * vatRate;

    const total = subtotal + vat;
    return total?.toLocaleString("en-US",{ style: "currency", currency: form.currency || 'USD'});
  };


  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});


  const resetErrors = () => {
    setErrors({});
    setError(null);
  }
  const clearFieldError = useCallback((field) => {
    setErrors((prev) => ({ ...prev, [field]: [] }));
  }, []);

  const formatErrors = (errors) => {
    const fieldErrors = {};
    errors.forEach(({ path, msg }) => {
      fieldErrors[path] = [...(fieldErrors[path] || []), msg];
    });
    return fieldErrors;
  };

  const { createInvoiceOrUpdate } = useAuth();
  const { setInvoiceData } = useAuthStore();

  const { showSnackbar } = useSnackbar()

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    resetErrors()
    setLoading(true);

    const response = await createInvoiceOrUpdate(form);
    setLoading(false);

    // console.log('Response from createInvoiceOrUpdate:', response);

    if (response?.success) {
      // ✅ Clear dirty flag so redirect doesn't trigger warning
      setIsDirty(false); 

      setInvoiceData(response.data);
      showSnackbar(
        `${isEditing? 'Changes saved' : 'Invoice created'} successfully!`,
        "success"
      )
      // Use router.push or redirect. 
      // Note: redirect() from next/navigation throws an error in client components if not caught, usually router.push is safer in event handlers
      router.push('/app/all-invoice'); 
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
  };


  const [openPreview, setOpenPreview] = useState(false);

  // Close modal
  const handleClosePreviewModal = useCallback(() => {
    setOpenPreview(false);
    resetErrors()
  }, []);


   // ✅ Intercept any Nav change
  useEffect(() => {
    if (!isDirty) return;

    const confirmNav = (message) => {
      return window.confirm(message || "You have unsaved changes. Leave this page?");
    };

    const handleBeforeUnload = (e) => {
      if (!confirmNav()) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    const handleDocumentClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      if (!confirmNav()) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [isDirty]);

 // ✅ Intercept Custom Back Button Click
  const handleBackClick = (e) => {
    if (isDirty) {
      const confirmLeave = window.confirm("You have unsaved changes. Are you sure you want to leave?");
      if (!confirmLeave) {
        e.preventDefault(); // Stop navigation
        return;
      }
    }
    router.back();
  };

  const [openPayment, setOpenPayment] = useState(false);

   const handleClosePaymentModal = useCallback(() => {
    setOpenPayment(false);
  }, []);


  const togglePayment = (id) => {
    setForm((prev) => ({
      ...prev,
      paymentIDs: prev.paymentIDs.includes(id)
        ? prev.paymentIDs.filter(paymentId => paymentId !== id)
        : [...prev.paymentIDs, id],
    }));

    setIsDirty(true);
  };
  

  const selectedPaymentDetails = payments?.filter(payment =>
    form.paymentIDs.includes(payment.id)
  ) || [];


  return (
    <section className='app-body-wrapper'>
      <div className="mb-5 w-full">
        <div className='flex items-center gap-3'>
          <div className="cursor-pointer">
             <BackButton onClick={ handleBackClick } />
          </div>
          <div>
            <h1 className="text-xl"><span className="font-semibold">{isEditing ? 'Edit Invoice' : 'Create Invoice'}</span></h1>
            <span className="text-sm text-gray-500">{isEditing ? 'Update the details about this invoice' : 'Create new invoice for your client'}</span>
          </div>
        </div>
      </div>
      <div className="body-content relative w-full">
        { error && <ErrorCard error={error} /> }

        <div className='p-4 bg-gray-50 rounded-xl border border-gray-100 mb-40'>
          <form onSubmit={handleFormSubmit} className='flex flex-col gap-5'>
            <fieldset className="border border-gray-200 rounded-xl p-5 bg-white">
              <legend className="px-2 text-sm font-semibold">Client Information</legend>
              <div className="flex flex-col gap-4">
                <Input
                  label="Name"
                  id="name"
                  type="text"
                  placeholder="Enter client's name or organization"
                  value={form.name ?? ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  errors={errors.name || []}
                  onFocus={() => clearFieldError('name')}
                />
                <div className='flex flex-col md:flex-row gap-4'>
                  <Input
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={form.email ?? ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    errors={errors.email || []}
                    onFocus={() => clearFieldError('email')}
                  />
                  <Input
                    label="Phone"
                    id="phone"
                    type="text"
                    placeholder="Enter phone number"
                    value={form.phone ?? ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    errors={errors.phone || []}
                    onFocus={() => clearFieldError('phone')}
                  />
                  <Textarea
                    label="Address"
                    id="address"
                    value={form.address ?? ''}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    onFocus={() => clearFieldError('address')}
                    errors={errors.address || []}
                    rows={1}
                  />
                </div>
                <RichTextEditor
                  id="note"
                  label="Special Note"
                  value={form.note ?? ""}
                  onChange={(value) => handleInputChange("note", value)}
                  errors={errors.note || []}
                  onFocus={() => clearFieldError('note')}
                  placeholder="Enter any special notes for your client..."
                />
              </div>
            </fieldset>
            <div className='flex flex-col md:flex-row gap-4'>
              <fieldset className="border border-gray-200 rounded-xl p-5 bg-white">
                <legend className="px-2 text-sm font-semibold">Invoice Detail</legend>
                <div className="flex flex-col gap-4">
                  <div className='flex flex-col md:flex-row gap-4'>
                    <Input
                      label="Date of issue"
                      id="date_issue"
                      type="date"
                      value={form.date_issue ?? ''}
                      onChange={(e) => handleInputChange('date_issue', e.target.value)}
                      errors={errors.date_issue || []}
                      onFocus={() => clearFieldError('date_issue')}
                    />
                    <Input
                      label="Due date"
                      id="date_due"
                      type="date"
                      value={form.date_due ?? ''}
                      onChange={(e) => handleInputChange('date_due', e.target.value)}
                      errors={errors.date_due || []}
                      onFocus={() => clearFieldError('date_due')}
                    />
                    <Input
                      label="Date of departure"
                      id="date_of_departure"
                      type="date"
                      value={form.date_of_departure ?? ''}
                      onChange={(e) => handleInputChange('date_of_departure', e.target.value)}
                      errors={errors.date_of_departure || []}
                      onFocus={() => clearFieldError('date_of_departure')}
                    />
                  </div>
                  <div className='flex flex-col md:flex-row gap-4'>
                    <Select
                      label="Currency"
                      id="currency"
                      required
                      placeholder="Select currency"
                      options={CURRENCIES}
                      value={form.currency}
                      onChange={(e) => setForm({ ...form, currency: e.target.value })}
                      errors={errors.currency}
                      onFocus={() => clearFieldError('currency')}
                    />
                  </div>
                  <div className="text-sm font-semibold text-gray-700 underline">More options</div>
                  <div>
                    <label htmlFor="has_refund_policy">
                      <input
                        id='has_refund_policy'
                        className="scale-120"
                        checked={form.has_refund_policy}
                        type="checkbox"
                        onChange={(e) => setForm({ ...form, has_refund_policy: e.target.checked })}
                        />
                      <span className='inline-block ml-2 font-medium'>Include Refund Policy?</span>
                    </label>
                    <div className="text-gray-500 text-xs">If checked, the company's default Refund Policy will be displayed on the invoice.</div>
                  </div>
                </div>
              </fieldset>
              <fieldset className="border w-full border-gray-200 rounded-xl px-5 py-2 bg-gray-100">
                <legend className="px-2 text-sm font-semibold">Payment Accounts</legend>
                <div className="text-gray-700 mb-2">Select payment accounts for this invoice</div>
                <div className="flex flex-col gap-2">
                    { selectedPaymentDetails.map((payment) => (
                      <PaymentListDisplayCard
                        key={payment.id}
                        data={payment}
                        onToggle={() => togglePayment(payment.id)}
                      />
                    ))}
                </div>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => setOpenPayment(true)}
                    className="flex gap-1 text-[#0077FF] items-center text-[0.88rem] font-semibold py-2 px-3 transition duration-300 hover:bg-gray-200 rounded-3xl"
                    >
                      <svg height="14" viewBox="0 0 14 14">
                        <path d="M7,0a.875.875,0,0,1,.875.875v5.25h5.25a.875.875,0,0,1,0,1.75H7.875v5.25a.875.875,0,0,1-1.75,0V7.875H.875a.875.875,0,0,1,0-1.75h5.25V.875A.875.875,0,0,1,7,0Z" fill="#2563EB"/>
                      </svg>
                      Add Account
                  </button>
                </div>
              </fieldset>

            </div>
            <fieldset className="border border-gray-200 rounded-xl p-5 bg-white">
              <legend className="px-2 text-sm font-semibold">Items</legend>
              <div>
                <div className='mb-4 flex flex-col gap-3'>
                  { form.items?.map((item, index) => (
                    <InvoiceItem
                      key={item.id}
                      data={item}
                      currency={form.currency}
                      index={index}
                      onChange={updateItem}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}
                </div>
                <div className='flex flex-col md:flex-row md:justify-between gap-4 md:items-center'>
                  <div>
                    <button
                      type="button"
                      onClick={addItem}
                      className="flex gap-1 text-[#0077FF] items-center text-[0.88rem] font-semibold py-2 px-3 transition duration-300 hover:bg-gray-100 rounded-3xl"
                      >
                        <svg height="14" viewBox="0 0 14 14">
                          <path d="M7,0a.875.875,0,0,1,.875.875v5.25h5.25a.875.875,0,0,1,0,1.75H7.875v5.25a.875.875,0,0,1-1.75,0V7.875H.875a.875.875,0,0,1,0-1.75h5.25V.875A.875.875,0,0,1,7,0Z" fill="#2563EB"/>
                        </svg>
                      Insert New Item
                    </button>
                  </div>
                  <div className='flex flex-col md:flex-row gap-8 items-end md:items-center'>
                    <div className='flex flex-col md:flex-row gap-3'>
                      {
                        isEditing && vatOld && VAT !== vatOld && (
                          <>
                            <label htmlFor="applied_vat">
                              <input
                                id='applied_vat'
                                className="scale-120"
                                type="checkbox"
                                checked={appliedVat}
                                onChange={(e) => includeAppliedVat(e.target.checked, vatOld)}
                                />
                              <span className='inline-block ml-2 text-gray-500'>Applied VAT ({vatOld}%)</span>
                            </label>
                            {/* <button type='button' onClick={excludeAll}>Exclude all</button> */}
                          </>
                        )
                      }
                      <label htmlFor="vat">
                        <input
                          id='vat'
                          className="scale-120"
                          checked={newVat}
                          type="checkbox"
                          onChange={(e) => includeNewVat(e.target.checked, VAT)}
                          />
                        <span className='inline-block ml-2 text-gray-500'>Include VAT ({VAT}%)</span>
                      </label>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      <span className='text-xl'>Subtotal:</span>
                      <strong className='text-xl'>{getTotalAmount()}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="flex items-center gap-4 my-3">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-sm font-medium text-black border border-gray-200 rounded-xl bg-white py-1 px-2 whitespace-nowrap">
                Attachments
              </span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>
            <div className="grid gap-1">
              <h4 className="font-semibold">Personal Note</h4>
              <div className="text-sm">Attach a personal note to this invoice. This will not be visible to clients.</div>
            </div>
            <RichTextEditor
                id="personal_note"
                value={form.personal_note ?? ""}
                onChange={(value) => handleInputChange("personal_note", value)}
                errors={errors.personal_note || []}
                onFocus={() => clearFieldError('personal_note')}
                placeholder="Compose your note..."
              />
            <div className='sticky bottom-0 w-full pb-4'>
              <div className='flex justify-center'>
                <div className='p-1 flex gap-2 items-center bg-white border border-gray-100 h-12 rounded-3xl'>
                  <button onClick={() => setOpenPreview(true)} type='button' className='inline-block text-[0.88rem] font-semibold py-2 px-4 border bg-gray-50 border-gray-300 transition duration-300 hover:bg-gray-200 rounded-3xl'>Preview</button>
                  <SubmitButton loading={loading} className={'bg-[#0077FF] text-white'}>
                    {isEditing ? 'Save Changes' : 'Save Invoice'}
                  </SubmitButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Modal
        isOpen={openPreview}
        onClose={handleClosePreviewModal}
        title={'Preview Invoice'}
        subTitle={'Here is how your invoice will look like'}
        maxWidth='1200px'
        dismissibleOutsideClick={true}
        >
          <div className='max-w-275 w-full'>
            <InvoiceTemplate
              invoice={{
                ...form,
                payments: selectedPaymentDetails,
              }}
              profile={profile}
            />
            {
              form.personal_note && (
                <div className='mt-4 md:py-12 bg-gray-50 rounded-xl border border-gray-100 flex justify-center flex-1'>
                  <div className="shadow-sm rounded-xl overflow-hidden max-w-225 w-full">
                    <PersonalNote
                      note={form.personal_note}
                      onClick={() => {}}
                      isFloating={true}
                    />
                  </div>
                </div>
              )
            }
          </div>
        </Modal>

        <Modal
          isOpen={openPayment}
          onClose={handleClosePaymentModal}
          maxWidth='600px'
          title="Select Payment Account"
          subTitle="Select payment accounts for this invoice. You can select multiple accounts."
        >
            <div className="mt-4">
              {
                payments?.length > 0 ? (
                  <div className="flex flex-col gap-2">
                  {
                    payments.map((payment) => (
                      <PaymentSelectCard
                        key={payment.id}
                        data={payment}
                        selectedIDs={form.paymentIDs}
                        onToggle={() => togglePayment(payment.id)}
                      />
                    ))
                  }
                  </div>
                ) : (
                  <div className="p-10 rounded-2xl grid place-items-center flex-1">
                    <div className="flex flex-col items-center gap-5">
                      <div className="flex flex-col items-center">
                        <div className="mb-5">
                          <svg height="50" viewBox="0 0 151 127" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.22754 50.3309L118.138 27.7554L113.678 4.85892C113.528 4.08456 113.226 3.3475 112.79 2.6898C112.354 2.0321 111.793 1.46665 111.139 1.02575C110.485 0.584845 109.75 0.277116 108.977 0.120134C108.204 -0.0368489 107.408 -0.0400121 106.633 0.110828L0 38.894L2.22754 50.3309Z" fill="#0E84E5"/>
                            <path d="M0.0700989 39.2573L126.828 14.5698C128.651 14.2149 130.539 14.5984 132.079 15.636C133.618 16.6735 134.683 18.2802 135.038 20.1025L149.616 94.954C149.971 96.7763 149.587 98.6649 148.549 100.204C147.512 101.744 145.905 102.808 144.083 103.163L24.1955 126.512C22.3732 126.867 20.4846 126.484 18.9451 125.446C17.4056 124.409 16.3413 122.802 15.9864 120.98L0.0700989 39.2573Z" fill="#A2BDFF"/>
                            <path d="M94.2995 50.9823L138.609 42.3526C140.431 41.9976 142.32 42.3812 143.86 43.4188C145.399 44.4563 146.463 46.063 146.818 47.8853L150.109 64.7822C150.464 66.6044 150.08 68.4931 149.043 70.0326C148.005 71.5721 146.399 72.6363 144.576 72.9913L100.267 81.621C99.9181 81.6889 99.5567 81.6156 99.2621 81.417C98.9675 81.2185 98.7639 80.9111 98.696 80.5624L93.2409 52.553C93.173 52.2044 93.2464 51.843 93.4449 51.5484C93.6434 51.2539 93.9508 51.0502 94.2995 50.9823Z" fill="#418DF9"/>
                            <path d="M111.828 70.6126C115.774 70.6126 118.973 67.4134 118.973 63.4671C118.973 59.5208 115.774 56.3216 111.828 56.3216C107.882 56.3216 104.682 59.5208 104.682 63.4671C104.682 67.4134 107.882 70.6126 111.828 70.6126Z" fill="white"/>
                          </svg>
                        </div>
                        <h3 className="text-xl text-center font-semibold mb-2">No Saved Payment Account</h3>
                        <div className="text-gray-500 text-base text-center">In order to continue, add a payment account first.</div>
                      </div>
                      <Link href="/app/settings/payment-acc" className="myHover-translate inline-block text-[0.88rem] font-semibold py-2 px-4 border bg-gray-50 border-gray-300 transition duration-300 hover:bg-gray-200 rounded-3xl">
                        Take Me There &rarr;
                      </Link>
                    </div>
                  </div>
                )
              }
            </div>
        </Modal>
    </section>
  )
}

export default CreateOrUpdateInvoiceForm