'use client';
import BackButton from '@/app/components/dashboard/BackButton'; 

import React, { useState, useEffect, useCallback } from 'react'
import Input from '@/app/components/Input';
import Textarea from '@/app/components/Textarea';
import InvoiceItem from '@/app/components/dashboard/InvoiceItem';
import SubmitButton from '@/app/components/SubmitButton';
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import ErrorCard from '@/app/components/ErrorCard';
import { useSnackbar } from "@/app/components/SnackbarContext"; 
import { useRouter } from "next/navigation"; // Added useRouter
import Modal from './Modal';
import InvoiceTemplate from './InvoiceTemplate';


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
    items: [],
    vat: '',
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
        items: invoice.items,
        vat: invoice.vat,
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
        items: [],
        vat: '',
        id: null,
        items: [
          { id: Date.now(), description: '', quantity: 1, rate: '', extra_charges: '', amount: '' }
        ],
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
        { id: Date.now(), description: '', quantity: 1, rate: '', extra_charges: '', amount: '' }
      ]
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
    updatedItems[index].amount =
      Number(updatedItems[index].quantity || 0) * Number(updatedItems[index].rate || 0) +
      Number(updatedItems[index].extra_charges || 0);

    setForm((prev) => ({ ...prev, items: updatedItems }));
    setIsDirty(true); // ✅ Mark dirty
  };


  const getTotalAmount = () => {
    const vatRate = Number(form.vat)/100 || 0
    const subtotal = form.items?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const vat = subtotal * vatRate;

    const total = subtotal + vat;
    return total?.toLocaleString("en-US",{ style: "currency", currency: "USD"});
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


  const [open, setOpen] = useState(false);

  // Close modal
  const handleCloseModal = useCallback(() => {
    setOpen(false);
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

  return (
    <section className='app-body-wrapper'>
      <div className="mb-5">
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
      <div className="body-content relative">
        { error && <ErrorCard error={error} /> }

        <div className='p-4 bg-gray-50 rounded-xl border border-gray-100 mb-40'>
          <form onSubmit={handleFormSubmit} className='flex flex-col gap-5'>
            <fieldset className="border border-gray-200 rounded-xl p-5 bg-white">
              <legend className="px-2 text-sm font-semibold">Client information</legend>
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
                </div>
                <div className='flex flex-col md:flex-row gap-4'>
                  <Textarea
                    label="Address"
                    id="address"
                    value={form.address ?? ''}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    onFocus={() => clearFieldError('address')}
                    errors={errors.address || []}
                    rows={2}
                  />
                  <Textarea
                    label="Special Note"
                    id="note"
                    value={form.note ?? ''}
                    onChange={(e) => handleInputChange('note', e.target.value)}
                    onFocus={() => clearFieldError('note')}
                    errors={errors.note || []}
                    rows={2}
                  />  
                </div>
              </div>
            </fieldset>
            <fieldset className="border border-gray-200 rounded-xl p-5 bg-white">
              <legend className="px-2 text-sm font-semibold">Invoice detail</legend>
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
              </div>
            </fieldset>
            <fieldset className="border border-gray-200 rounded-xl p-5 bg-white">
              <legend className="px-2 text-sm font-semibold">Items</legend>
              <div>
                <div className='mb-4 flex flex-col gap-3'>
                  { form.items?.map((item, index) => (
                    <InvoiceItem
                      key={item.id}
                      data={item}
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
            <div className='sticky bottom-0 w-full pb-4'>
              <div className='flex justify-center'>
                <div className='p-1 flex gap-2 items-center bg-white border border-gray-100 h-12 rounded-3xl'>
                  <button onClick={() => setOpen(true)} type='button' className='inline-block text-[0.88rem] font-semibold py-2 px-4 border bg-gray-50 border-gray-300 transition duration-300 hover:bg-gray-200 rounded-3xl'>Preview</button>
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
        isOpen={open}
        onClose={handleCloseModal}
        title={'Preview Invoice'}
        subTitle={'Here is how your invoice will look like'}
        maxWidth='1200px'
        dismissibleOutsideClick={false}
        >
          <div className='max-w-275 w-full'>
            <InvoiceTemplate
              invoice={form}
              profile={profile}
              payments={payments}
            />
          </div>
        </Modal>
    </section>
  )
}

export default CreateOrUpdateInvoiceForm