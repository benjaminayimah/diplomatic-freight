
'use client'
import React from 'react'
import { useAuthStore } from "@/store/authStore";
import Link from 'next/link';
import DropdownMenu from './DropdownMenu';
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

function Header() {
  const user = useAuthStore((state) => state.user);
  const isAuth = useAuthStore((state) => state.isAuth)


  const router = useRouter()
  const { setLogout } = useAuthStore();
  const { logout } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    
    await logout();
    setLogout()
    router.push("/auth");
  }

  const UserAvatar = (
    <div className="flex gap-2 items-center">
      <div className="h-10 w-10 grid place-items-center text-white font-bold rounded-full bg-purple-600">
        {user?.name?.charAt(0)?.toUpperCase()}
      </div>
      <span className="font-medium whitespace-nowrap">
        {user?.name?.split(" ")[0]}
      </span>
    </div>
  );

  if (!isAuth) 
  return

  return (
    <div className="bg-white h-[60px] px-5 border-b border-gray-100 flex items-center header-wrapper">
      <div className="flex-1 flex justify-between items-center">
        <a href="/">
          <svg id="logo_icon" className="h-[35px]" viewBox="0 0 53.65 45">
            <path fill="#000" id="icon" d="M11.766,44.887C-.109,43.852-.484,35.888.211,32.393A10.5,10.5,0,0,0,8.9,40.518c13.469,1.759,28.588-11.795,33.106-16.25,0,0-1.208-1.274-2.089-2.1s-2.43-2.1-2.43-2.1L53.65,17.628l-4,16.162s-.826-1.49-1.391-2.359-1.388-2.009-1.388-2.009C41.146,35.508,28.413,45,14.4,45Q13.09,45,11.766,44.887ZM9.354,37.044A6.784,6.784,0,0,1,4.48,33.756a24.2,24.2,0,1,1,44.534-18.97l-3.6.545A20.726,20.726,0,0,0,30.7,3.886,36.088,36.088,0,0,1,36.5,16.68l-3.477.526A32.586,32.586,0,0,0,26.716,4.44a32.582,32.582,0,0,0-7.14,18.005H33.855q-.034-.444-.08-.888l1.487,1.223h0l0,0,.011.009.047.039.179.149c.154.127.366.305.606.508.274.232.567.484.837.722-.926.827-1.994,1.742-3.176,2.692q.05-.474.086-.952H19.576a32.579,32.579,0,0,0,1.893,8.737A34.2,34.2,0,0,1,18.2,35.96a36.085,36.085,0,0,1-2.141-10.012H6.1a20.6,20.6,0,0,0,4.483,11.2C10.166,37.132,9.758,37.1,9.354,37.044ZM6.1,22.445h9.967A36.094,36.094,0,0,1,22.736,3.886,20.7,20.7,0,0,0,6.1,22.445Z" />
          </svg>
        </a>
        <DropdownMenu trigger={UserAvatar}>
          <Link
            href="/app/profile"
            className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium transition"
          >
            Profile
          </Link>
          {/* <Link
            href="/settings"
            className="block px-4 py-2 hover:bg-gray-100 text-sm transition"
          >
            Settings
          </Link> */}
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-medium transition"
            onClick={handleLogout}
          >
            Log out
          </button>
        </DropdownMenu>
      </div>
    </div>
  );
}


export default Header