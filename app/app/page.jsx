
'use client';

import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import BankCard from "@/app/components/dashboard/BankCard";
import DashboardCard from "@/app/components/dashboard/DashboardCard";
import { useState } from "react";
import {
  DocumentTextIcon,
  ReceiptPercentIcon,
  DocumentDuplicateIcon,
  UsersIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

// import useFetchData from "@/hooks/useFetchData";


export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const invoices = useAuthStore((state) => state.invoices);
  const receipts = useAuthStore((state) => state.receipts);
  const subscribers = useAuthStore((state) => state.subscribers);
  const quotes = useAuthStore((state) => state.quotes);
  const payments = useAuthStore((state) => state.payments);

const [showAllPayments, setShowAllPayments] = useState(false);

const hasMorePayments = (payments?.length || 0) > 2;

const displayedPayments = showAllPayments
  ? payments || []
  : payments?.slice(0, 2) || [];

  return (
    <ProtectedRoute>
      <section className="app-body-wrapper">
        <div className="mb-5 w-full">
          <h1 className="text-xl">Welcome, <span className="font-semibold">{user?.name || user?.email}!</span></h1>
          <span className="text-sm text-gray-500">What are we doing today?</span>
        </div>
        <div className="body-content flex flex-col flex-1 w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard title="Invoices" array={invoices} href={'app/all-invoice'} icon={DocumentTextIcon} color= {{ icon: "text-blue-600", wrapper: "border-blue-100 bg-blue-50" }} />
            <DashboardCard title="Receipts" array={receipts} href={'app/all-receipt'} icon={ReceiptPercentIcon} color= {{ icon: "text-purple-600", wrapper: "border-purple-100 bg-purple-50" }} />
            <DashboardCard title="Quotes" array={quotes} href={'app/quotes'} icon={DocumentDuplicateIcon} color= {{ icon: "text-amber-600", wrapper: "border-amber-100 bg-amber-50" }} />
            <DashboardCard title="Subscribers" array={subscribers} href={'app/subscribers'} icon={UsersIcon} color= {{ icon: "text-teal-600", wrapper: "border-teal-100 bg-teal-50" }} />
          </div>
          <article className="p-4 flex-1 flex flex-col mt-8 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl">Payment Accounts</h2>
              <div>
                {
                  payments?.length > 0 && (
                    <Link href="/app/settings/payment-acc" className="flex gap-1 text-blue-600 items-center text-[0.88rem] font-semibold py-2 px-3 transition duration-300 hover:bg-gray-100 rounded-3xl">
                      <Cog6ToothIcon strokeWidth={2} className="text-base h-5"  />
                      Manage Payments
                    </Link>
                  )
                }
              </div>
            </div>
            {
              payments?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {
                      displayedPayments.map((payment) => (
                        <BankCard
                          key={payment.id}
                          data={payment}
                        />
                      ))
                    }
                  </div>
                ) : (
                <div className="p-10 rounded-2xl grid place-items-center flex-1">
                  <div className="flex flex-col items-center gap-5">
                    <div className="flex flex-col items-center">
                      <div className="mb-5">
                        <svg height="80" viewBox="0 0 151 127" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.22754 50.3309L118.138 27.7554L113.678 4.85892C113.528 4.08456 113.226 3.3475 112.79 2.6898C112.354 2.0321 111.793 1.46665 111.139 1.02575C110.485 0.584845 109.75 0.277116 108.977 0.120134C108.204 -0.0368489 107.408 -0.0400121 106.633 0.110828L0 38.894L2.22754 50.3309Z" fill="#0E84E5"/>
                          <path d="M0.0700989 39.2573L126.828 14.5698C128.651 14.2149 130.539 14.5984 132.079 15.636C133.618 16.6735 134.683 18.2802 135.038 20.1025L149.616 94.954C149.971 96.7763 149.587 98.6649 148.549 100.204C147.512 101.744 145.905 102.808 144.083 103.163L24.1955 126.512C22.3732 126.867 20.4846 126.484 18.9451 125.446C17.4056 124.409 16.3413 122.802 15.9864 120.98L0.0700989 39.2573Z" fill="#A2BDFF"/>
                          <path d="M94.2995 50.9823L138.609 42.3526C140.431 41.9976 142.32 42.3812 143.86 43.4188C145.399 44.4563 146.463 46.063 146.818 47.8853L150.109 64.7822C150.464 66.6044 150.08 68.4931 149.043 70.0326C148.005 71.5721 146.399 72.6363 144.576 72.9913L100.267 81.621C99.9181 81.6889 99.5567 81.6156 99.2621 81.417C98.9675 81.2185 98.7639 80.9111 98.696 80.5624L93.2409 52.553C93.173 52.2044 93.2464 51.843 93.4449 51.5484C93.6434 51.2539 93.9508 51.0502 94.2995 50.9823Z" fill="#418DF9"/>
                          <path d="M111.828 70.6126C115.774 70.6126 118.973 67.4134 118.973 63.4671C118.973 59.5208 115.774 56.3216 111.828 56.3216C107.882 56.3216 104.682 59.5208 104.682 63.4671C104.682 67.4134 107.882 70.6126 111.828 70.6126Z" fill="white"/>
                        </svg>
                      </div>
                      <h3 className="text-xl text-center font-semibold mb-2">Set Up Your Payment Account</h3>
                      <div className="text-gray-500 text-base text-center">To show your payment details on invoices, add payment accounts</div>
                    </div>
                    <Link href="/app/settings/payment-acc" className="myHover-translate inline-block text-[0.88rem] font-semibold py-2 px-4 border bg-gray-50 border-gray-300 transition duration-300 hover:bg-gray-200 rounded-3xl">
                      Take Me There &rarr;
                    </Link>
                  </div>
                </div>
              )
            }
            {
              hasMorePayments && (
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllPayments(prev => !prev)}
                    className="flex text-sm w-full justify-center items-center gap-2 text-black font-medium py-2 px-4 border border-gray-200 hover:bg-gray-100 transition rounded-3xl"
                  >
                    {showAllPayments ? (
                      <>
                        Show less
                        <ChevronUpIcon strokeWidth={2}  className="h-4.5" />
                      </>
                    ) : (
                      <>
                        Show more
                        <ChevronDownIcon strokeWidth={2}  className="h-4.5" />
                      </>
                    )}
                  </button>
                </div>
              )}
          </article>
        </div>
      </section>
    </ProtectedRoute>
  );
}
