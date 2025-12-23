
'use client';

import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
// import useFetchData from "@/hooks/useFetchData";


export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const invoices = useAuthStore((state) => state.invoices);
  const receipts = useAuthStore((state) => state.receipts);
  // const banks = useAuthStore((state) => state.banks);
  const subscribers = useAuthStore((state) => state.subscribers);
  const quotes = useAuthStore((state) => state.quotes);


  // const { data, loading, error, refetch } = useFetchData("/profile");

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  
  return (
    <ProtectedRoute>
      <section className="app-body-wrapper">
        <div className="mb-5">
          <h1 className="text-xl">Welcome, <span className="font-semibold">{user?.name || user?.email}!</span></h1>
          <span className="text-sm text-gray-500">What are we doing today?</span>
        </div>
        <div className="body-content">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
            <Link href={'app/all-invoice'} className="border border-gray-200 hover:border-gray-400 h-40 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-sm text-gray-500">Total Invoices</h2>
                <p className="text-2xl font-bold">{invoices?.length ?? 0}</p>
              </div>
              <div className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Invoices &rarr;</div>
            </Link>
            <Link href={'app/all-receipt'} className="border border-gray-200 hover:border-gray-400 h-40 rounded-2xl">
              <div className="p-4 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-sm text-gray-500">Total Receipts</h2>
                  <p className="text-2xl font-bold">{receipts?.length ?? 0}</p>
                </div>
                <div className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Receipts &rarr;</div>
              </div>
            </Link>
            <Link href={'app/quotes'} className="border border-gray-200 hover:border-gray-400 h-40 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-sm text-gray-500">Quotes Requested</h2>
                <p className="text-2xl font-bold">{quotes?.length || 0}</p>
              </div>
              <div className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Quotes &rarr;</div>
            </Link> 
            <Link href={'app/subscribers'} className="border border-gray-200 hover:border-gray-400 h-40 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-sm text-gray-500">Newsletter Subscribers</h2>
                <p className="text-2xl font-bold">{subscribers?.length ?? 0}</p>
              </div>
              <div  className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Subscribers &rarr;</div>
            </Link>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
