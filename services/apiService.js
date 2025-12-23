// src/services/apiClient.js
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store"


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const token = useAuthStore.getState().token;
    if (token && error.response?.status === 401) {
      // Token invalid / expired
      useUIStore.getState().setTokenExpired();
    }
    return Promise.reject(error)
  }
)


export default api;
