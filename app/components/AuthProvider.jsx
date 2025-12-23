
// components/AuthProvider.jsx
'use client';

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store";
import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";
import { useSnackbar } from "@/app/components/SnackbarContext";
import Loader from '@/app/components/Loader';



export default function AuthProvider({ children }) {
  const { setAuthData, isAuth } = useAuthStore();
  const loadAuth = useAuthStore((state) => state.loadAuth);
  const tokenExpired = useUIStore((state) => state.tokenExpired);

  const { data, loading, error } = useFetchData("/auth");
  const { showSnackbar } = useSnackbar();

  // 1. Restore token + user from localStorage on first mount
  useEffect(() => {
    loadAuth(); 
  }, [loadAuth]);

  useEffect(() => {
    if (!isAuth) return;             // Prevents fetching on invalid localStorage
    if (!data) return;                        // Data not loaded yet

    if (data?.success) {
      setAuthData(
        data.profile,
        data.invoices,
        data.banks,
        data.subscribers,
        data.quotes,
        data.receipts
      );
    } else if (error) {
      showSnackbar(error, "error");
    }
  }, [data, isAuth, error, setAuthData]);

  const logOut = () => {
    localStorage.removeItem('auth')
    window.location.href = '/auth'
  }

  if (tokenExpired) {
    return (
      <div className="h-screen flex flex-col justify-center items-center session-expired">
        <h1 className="text-3xl mb-2 text-center">Session Expired!</h1>
        <p className="mb-5 text-center">Your login session has expired. Please log in again.</p>
        <button
          onClick={logOut}
          className="bg-black myHover-translate text-white h-10 px-6 py-2 flex items-center justify-center font-semibold text-[0.88rem] rounded-4xl min-w-[86px]"
        >
          Log in
        </button>
      </div>
    );
  }

  if (loading) return <div className="h-screen flex flex-col justify-center items-center">
    <Loader size={60} />
  </div>;

  return children;
}
