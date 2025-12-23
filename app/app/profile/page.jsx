"use client";

import React, { useState, useCallback } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useAuthStore } from "@/store/authStore";
import Modal from "@/app/components/dashboard/Modal";
import Input from "@/app/components/Input";
import { useAuth } from "@/hooks/useAuth";
import ErrorCard from "../../components/ErrorCard";
import SubmitButton from "../../components/SubmitButton";
import { useSnackbar } from "@/app/components/SnackbarContext"; 


function Profile() {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // "edit" | "password"
  const user = useAuthStore((state) => state.user);
  const { setUserData } = useAuthStore();

  const [profileForm, setProfileForm] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ current_password: "", new_password: "" });

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

  const { update, updatePass } = useAuth();

  // Open modal
  const handleOpenModal = useCallback(
    (type) => {
      setModalType(type);
      if (type === "edit" && user) {
        setProfileForm({ name: user.name || "", email: user.email || "" });
      }
      setOpen(true);
    },
    [user]
  );

  // Close modal
  const handleCloseModal = useCallback(() => {
    setOpen(false);
    setModalType(null);
    resetErrors()
  }, []);

  const resetErrors = () => {
    setErrors({});
    setError(null);
  }
  const clearFieldError = useCallback((field) => {
    setErrors((prev) => ({ ...prev, [field]: [] }));
  }, []);

  const { showSnackbar } = useSnackbar()
  

  const handleEditProfile = useCallback(async (e) => {
    e.preventDefault();
    resetErrors()
    setLoading(true);

    const response = await update(profileForm, user.id);
    setLoading(false);

    if (response?.success) {
      setUserData(response.data);
      handleCloseModal();
      showSnackbar(
        `Profile updated successfully!`,
        "success"
      )
    } else if (response?.errors) {
      setErrors(formatErrors(response.errors));
    } else {
      setError(response?.error || "Something went wrong. Please try again.");
    }
  }, [profileForm, user?.id, update, setUserData, handleCloseModal]);

  const handleChangePassword = useCallback(
    async (e) => {
      e.preventDefault();
      resetErrors()
      setLoading(true);

      const response = await updatePass(passwordForm);
      setLoading(false);

      if (response?.success) {
        handleCloseModal();
        setPasswordForm({current_password: "", new_password: "" })
        showSnackbar(
          `Password is changed successfully!`,
          "success"
        )
      } else if (response?.errors) {
        setErrors(formatErrors(response.errors));
      } else {
        setError(response?.error || "Something went wrong. Please try again.");
      }
    },
    [passwordForm, updatePass, handleCloseModal]
  );

  return (
    <ProtectedRoute>
      <section className="app-body-wrapper">
        <div className="mb-5">
          <h1 className="text-xl">
            <span className="font-semibold">My Profile</span>
          </h1>
          <span className="text-sm text-gray-500">Manage your basic profile</span>
        </div>

        <div className="body-content">
          <div className="px-6 py-2 border border-gray-200 rounded-2xl mb-4">
            <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
              <span className="font-semibold">Full name</span>
              <div className="text-gray-600 md:text-right">{user?.name}</div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
              <span className="font-semibold">Email</span>
              <div className="text-gray-600 md:text-right">{user?.email}</div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between py-4 border-b border-gray-100">
              <span className="font-semibold">Password</span>
              <div className="text-gray-600 md:text-right">*************</div>
            </div>
            <div className="flex gap-2 py-5 justify-end">
              <button
                onClick={() => handleOpenModal("edit")}
                className="myHover-translate inline-block text-[0.88rem] font-semibold py-2 px-4 border bg-gray-50 border-gray-300 transition duration-300 hover:bg-gray-200 rounded-3xl"
              >
                Edit profile
              </button>
              <button
                onClick={() => handleOpenModal("password")}
                className="myHover-translate inline-block text-[0.88rem] font-semibold py-2 px-4 border bg-gray-50 border-gray-300 transition duration-300 hover:bg-gray-200 rounded-3xl"
              >
                Change password
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
          <Modal
            isOpen={open}
            onClose={handleCloseModal}
            maxWidth="560px"
            title={modalType === "edit" ? "Edit Profile" : "Change Password"}
            subTitle={modalType === "edit" ? "Update your profile details" : "Change your password"}
          >
            { error && <ErrorCard error={error} /> }
              <div className="mt-4">
                <form onSubmit={ modalType === 'edit' ? handleEditProfile : handleChangePassword} className="flex flex-col gap-5">
                  {modalType === "edit" && (
                    <div className="flex flex-col gap-4">
                      <Input
                        label="Name"
                        id="name"
                        type="text"
                        placeholder="Enter name"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        errors={errors.name || []}
                        onFocus={() => clearFieldError('name')}
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
                    </div>
                  )}
                  {modalType === "password" && (
                    <div className="flex flex-col gap-4">
                      <Input
                        label="Current password"
                        id="current_password"
                        type="password"
                        value={passwordForm.current_password}
                        onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                        errors={errors.current_password || []}
                        onFocus={() => clearFieldError('current_password')}
                      />
                      <Input
                        label="New password"
                        id="new_password"
                        type="password"
                        value={passwordForm.new_password}
                        onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                        errors={errors.new_password || []}
                        onFocus={() => clearFieldError('new_password')}
                      />
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={handleCloseModal} className="myHover-translate text-[0.88rem] font-medium px-4 py-2 rounded-3xl bg-gray-100 border border-gray-200 transition duration-300 hover:bg-gray-200">
                      Cancel
                    </button>
                    <SubmitButton loading={loading} className={'bg-[#0077FF] text-white'}>
                      {modalType === "edit" ? "Save changes" : "Update password"}
                    </SubmitButton>
                  </div>
                </form>
              </div>
          </Modal>
      </section>

    </ProtectedRoute>
  );
}

export default Profile;
