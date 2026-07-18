// components/DropdownMenu.jsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function DropdownMenu({ trigger, children, width = "min-w-40" }) {
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
          className={`
            ${width}
            absolute right-0 mt-0 rounded-2xl 
            border border-gray-200 bg-white shadow-lg
            transition-all duration-200 z-50 py-2
            `}
          onClick={() => setOpen(false)} 
        >
          {children}
        </div>
      )}
    </div>
  );
}
