'use client'

import React, { useState, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import Modal from "@/app/components/modals/Modal";
import Input from "@/app/components/Input";
import ErrorCard from "../../components/ErrorCard";
import SubmitButton from "../../components/SubmitButton";
import { useSnackbar } from "@/app/components/SnackbarContext";


function Settings() {

  const profile = useAuthStore((state) => state.profile);
  const setCompanyData = useAuthStore(
    (state) => state.setCompanyData
  );

  const [open, setOpen] = useState(false);

  const [modalTitle, setModalTitle] = useState('')
  const [modalSubTitle, setModalSubTitle] = useState('')
  const [modalSubmitBtnText, setModalSubmitBtnText] = useState('')

  const { updateProfile } = useAuth();

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

  return (
      <>
        <article className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex justify-between items-cente mb-2">
            <h2 className="mb-3 text-xl">Company Profile</h2>
            <div>
              <button
                onClick={() => handleOpenModal()}
                className="flex gap-1 text-[#0077FF] items-center text-[0.88rem] font-semibold py-2 px-3 transition duration-300 hover:bg-gray-100 rounded-3xl"
              >
                <svg height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.1207 3.12109C17.1207 2.97399 17.092 2.8283 17.0358 2.69238C16.9794 2.55634 16.8967 2.43225 16.7926 2.32812C16.6885 2.22405 16.5643 2.14129 16.4283 2.08496C16.2924 2.02874 16.1467 2 15.9996 2C15.7023 2 15.4169 2.11791 15.2067 2.32812L2.90198 14.6318L2.37268 16.7471L4.48791 16.2188L16.7926 3.91406C16.8966 3.81002 16.9794 3.68668 17.0358 3.55078C17.0921 3.41474 17.1207 3.26835 17.1207 3.12109ZM18.9996 17.1211C19.5518 17.1211 19.9995 17.5689 19.9996 18.1211C19.9996 18.6734 19.5519 19.1211 18.9996 19.1211H9.99963C9.44735 19.1211 8.99963 18.6734 8.99963 18.1211C8.99976 17.5689 9.44742 17.1211 9.99963 17.1211H18.9996ZM19.1207 3.12109C19.1207 3.53087 19.0402 3.93683 18.8834 4.31543C18.7266 4.69408 18.4965 5.03831 18.2067 5.32812L5.70666 17.8281C5.57851 17.9563 5.41765 18.0478 5.24182 18.0918L1.24182 19.0918C0.901166 19.1768 0.540884 19.0764 0.292602 18.8281C0.0443094 18.5798 -0.0552662 18.2196 0.0299069 17.8789L1.02991 13.8789L1.07092 13.75C1.12105 13.6246 1.19647 13.5102 1.2926 13.4141L13.7926 0.914062C14.378 0.328772 15.1719 0 15.9996 0C16.4095 0 16.8153 0.0805044 17.194 0.237305C17.5726 0.394145 17.9168 0.624275 18.2067 0.914062C18.4965 1.20389 18.7266 1.54808 18.8834 1.92676C19.0403 2.30538 19.1207 2.71127 19.1207 3.12109Z" fill="#2563EB"/>
                </svg>
                Edit Profile
              </button>
            </div>
          </div>
          <div className="px-6 py-2 border bg-white border-gray-100 rounded-2xl">
            <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4">
              <span className="font-semibold">Company name</span>
              <div className="text-gray-600 md:text-right">{profile?.company_name}</div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-t border-dashed border-gray-200">
              <span className="font-semibold">Email</span>
              <div className="text-gray-600 md:text-right">{profile?.email}</div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-t border-dashed border-gray-200">
              <span className="font-semibold">Phone</span>
              <div className="text-gray-600 md:text-right">{profile?.phone}</div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-t border-dashed border-gray-200">
              <span className="font-semibold">Mobile</span>
              <div className="text-gray-600 md:text-right">{profile?.mobile}</div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-t border-dashed border-gray-200">
              <span className="font-semibold">Address</span>
              <div className="text-gray-600 md:text-right">
                {profile?.address_line_1}<br />
                {profile?.address_line_2}<br />
                {profile?.address_line_3}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-t border-dashed border-gray-200">
              <span className="font-semibold">Post Office Box</span>
              <div className="text-gray-600 md:text-right">{profile?.po_box}</div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-t border-dashed border-gray-200">
              <span className="font-semibold">Website</span>
              <div className="text-gray-600 md:text-right">{profile?.website}</div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-t border-dashed border-gray-200">
              <span className="font-semibold">Tagline</span>
              <div className="text-gray-600 md:text-right">{profile?.tagline}</div>
            </div>
          </div>
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
                <form onSubmit={ handleSubmitProfile } className="flex flex-col gap-5">
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
      </>
  )
}

export default Settings