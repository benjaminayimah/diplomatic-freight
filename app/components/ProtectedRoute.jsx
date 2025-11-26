"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const { user, token, loadAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Restore auth from localStorage
    loadAuth();
    setLoading(false);
  }, [loadAuth]);

  const isAuth = !!user && !!token;

  useEffect(() => {
    if (!loading && !isAuth) {
      router.push("/auth"); // redirect if not authenticated
    }
  }, [isAuth, loading, router]);

  // Show nothing while checking auth
  if (loading) return null;

  return isAuth ? children : null;
}
