// components/AuthProvider.jsx
'use client';

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthProvider({ children }) {
  const loadAuth = useAuthStore((state) => state.loadAuth);

  useEffect(() => {
    loadAuth(); // restore user/token from localStorage
  }, [loadAuth]);

  return children;
}
