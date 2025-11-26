// components/DropdownMenu.jsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function DropdownMenu({ trigger, children }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div
          className="absolute right-0 mt-2 min-w-40 rounded-lg border border-gray-300 bg-white shadow-lg py-2
          transition-all duration-200 z-50"
          onClick={() => setOpen(false)} 
        >
          {children}
        </div>
      )}
    </div>
  );
}
