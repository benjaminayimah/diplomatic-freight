'use client';
import BackButton from '@/app/components/dashboard/BackButton'; 

import React, { useState, useEffect, useCallback } from 'react'
import Input from '@/app/components/Input';
import Select from '@/app/components/Select';
import Textarea from '@/app/components/Textarea';
import InvoiceItem from '@/app/components/dashboard/InvoiceItem';
import SubmitButton from '@/app/components/SubmitButton';
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import ErrorCard from '@/app/components/ErrorCard';
import { useSnackbar } from "@/app/components/SnackbarContext"; 
import { useRouter } from "next/navigation"; // Added useRouter
import Modal from './Modal';
import ReceiptTemplate from './ReceiptTemplate';
import { useUIStore } from "@/store";


function CreateOrGenerateReceiptForm({ mode = null, id = null }) {

  const isEditing = mode === "generate" && id;
  const router = useRouter(); 

  const VAT = process.env.NEXT_PUBLIC_VAT

  const [vat, setVat] = useState(false)
  
  // ✅ 1. New State to track if form is modified
  const [isDirty, setIsDirty] = useState(false);

  const paymentMethods = useUIStore((state) => state.paymentMethods);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    payment_method: paymentMethods[0].value,
    paid_on: new Date().toISOString().split('T')[0],
    items: [],
    vat: '',
    id: null
  })

  const invoices = useAuthStore((state) => state.invoices);
  const banks = useAuthStore((state) => state.banks);
  const profile = useAuthStore((state) => state.profile);

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
      if(invoice.vat) {
        setVat(true)
      }
      setForm({
        name: invoice.name,
        email: invoice.email,
        phone: invoice.phone,
        address: invoice.address,
        payment_method: paymentMethods[0].value,
        paid_on: new Date().toISOString().split('T')[0],
        items: invoice.items,
        vat: invoice.vat,
        id: id
      })
      // Note: We do NOT set isDirty to true here, because this is the initial load
    }
  }, [isEditing, id, invoices, VAT]);

  useEffect(() => {
    if(!isEditing) {
      setForm((prev) => ({
        ...prev,
        items: [
          { id: Date.now(), description: '', quantity: 1, rate: '', extra_charges: '', amount: '' }
        ]
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

  const includeVat = (checked) => {
    setIsDirty(true); 
    checked ? setForm({...form, vat: VAT }) : setForm({...form, vat: '' })
    setVat(checked)
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

  const { createReceiptOrGenerate } = useAuth();
  const { setReceiptData } = useAuthStore();

  const { showSnackbar } = useSnackbar()

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    resetErrors()
    setLoading(true);

    const response = await createReceiptOrGenerate(form);
    setLoading(false);

    if (response?.success) {
      // ✅ Clear dirty flag so redirect doesn't trigger warning
      setIsDirty(false); 

      setReceiptData(response.data);
      showSnackbar(
        "Receipt created successfully!",
        "success"
      )
      // Use router.push or redirect. 
      // Note: redirect() from next/navigation throws an error in client components if not caught, usually router.push is safer in event handlers
      router.push('/app/all-receipt'); 
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

  // ✅ Intercept Custom Back Button Click
  const handleBackClick = (e) => {
    // This assumes BackButton is a div or button you can wrap or pass onClick to.
    // If BackButton has its own internal link, you might need to wrap it in a div and use onClickCapture
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
             <BackButton onClick={handleBackClick} />
          </div>
          <div>
            <h1 className="text-xl"><span className="font-semibold">{isEditing ? 'Generate Receipt' : 'Create Receipt'}</span></h1>
            <span className="text-sm text-gray-500">{isEditing ? 'Generate receipt for this invoice' : 'Create new receipt for your client'}</span>
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
                </div>
              </div>
            </fieldset>
            <fieldset className="border border-gray-200 rounded-xl p-5 bg-white">
              <legend className="px-2 text-sm font-semibold">Payment detail</legend>
              <div className="flex flex-col gap-4">
                <div className='flex flex-col md:flex-row gap-4'>
                  <Select
                    label="Payment method"
                    id="payment_method"
                    required
                    placeholder="Select payment method"
                    options={paymentMethods}
                    value={form.payment_method}
                    onChange={(e) => setForm({ ...form, payment_method: e.target.value })}
                    errors={errors.payment_method}
                  />
                  <Input
                    label="Paid on"
                    id="paid_on"
                    type="date"
                    value={form.paid_on ?? ''}
                    onChange={(e) => handleInputChange('paid_on', e.target.value)}
                    errors={errors.paid_on || []}
                    onFocus={() => clearFieldError('paid_on')}
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
                      <label htmlFor="vat">
                        <input
                          id='vat'
                          checked={vat}
                          type="checkbox"
                          onChange={(e) => includeVat(e.target.checked)}
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
                    Save Receipt
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
        title={'Preview Receipt'}
        subTitle={'Here is how your receipt will look like'}
        maxWidth='1200px'
        dismissibleOutsideClick={false}
        >
          <div className='max-w-[1100px] w-full'>
            <ReceiptTemplate
              receipt={form}
              profile={profile}
              banks={banks}
            />
          </div>
        </Modal>
    </section>
  )
}

export default CreateOrGenerateReceiptForm