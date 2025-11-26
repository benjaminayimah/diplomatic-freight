"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GuestRoute({ children }) {
  const { user, token, loadAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadAuth(); // restore auth from localStorage
    setLoading(false);
  }, [loadAuth]);

  const isAuth = !!user && !!token;

  useEffect(() => {
    if (!loading && isAuth) {
      router.push("/app"); // redirect logged-in users
    }
  }, [isAuth, loading, router]);

  if (loading) return null; // don't render anything while checking

  return !isAuth ? children : null; // render page only for guests
}
