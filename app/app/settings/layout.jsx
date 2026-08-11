'use client'
import ProtectedRoute from "@/app/components/ProtectedRoute";
import NavItem from "@/app/components/dashboard/NavItem";
import {
  WalletIcon as WalletOutlineIcon,
  BuildingOffice2Icon as BuildingOffice2OutlineIcon,
} from "@heroicons/react/24/outline";
import {
  WalletIcon as WalletSolidIcon,
  BuildingOffice2Icon as BuildingOffice2SolidIcon,
} from "@heroicons/react/24/solid";

const menus = [
    { name: 'Company Info', href: '/app/settings', icon: BuildingOffice2OutlineIcon, activeIcon: BuildingOffice2SolidIcon },
    { name: "Payment Accounts", href: "/app/settings/payment-acc", icon: WalletOutlineIcon, activeIcon: WalletSolidIcon },
  ]

export default function RootLayout({ children }) {

  
  return (
    <ProtectedRoute>
      <section className='app-body-wrapper'>
        <div className="mb-4 w-full">
          <h1 className="text-xl"><span className="font-semibold">Settings</span></h1>
          <span className="text-sm text-gray-500">Manage your company's information & Payment accounts</span>
        </div>
        <ul className='flex gap-2 flex-wrap items-start mb-5 w-full'>
          {
            menus.map((item, index) => (
              <NavItem key={index} item={item} />
            ))
          }
        </ul>
        <div className="body-content w-full flex flex-col flex-1">
          <div className="flex flex-col gap-6 flex-1">
            {children} 
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
