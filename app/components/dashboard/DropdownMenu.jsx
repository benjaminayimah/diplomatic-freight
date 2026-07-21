// components/DropdownMenu.jsx

"use client";

import { useEffect, useRef, useState } from "react";

export default function DropdownMenu({
  trigger,
  children,
  width = "min-w-40",
  dismissibleOutsideClick = true,
  dismissibleEsc = true,
  onOpenChange,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const closeMenu = () => {
    setOpen(false);
    onOpenChange?.(false);
  };

  const toggleMenu = () => {
    setOpen((prev) => {
      const next = !prev;
      onOpenChange?.(next);
      return next;
    });
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (
        dismissibleOutsideClick &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };

    const handleKeyDown = (e) => {
      if (dismissibleEsc && e.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, dismissibleOutsideClick, dismissibleEsc]);

  return (
    <div className="relative" ref={menuRef}>
      <div
        onClick={toggleMenu}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {open && (
        <div
          className={`
            ${width}
            absolute right-0 mt-0 rounded-2xl
            border border-gray-200 bg-white
            shadow-lg z-50 py-2
            transition-all duration-200
          `}
          onClick={closeMenu}
        >
          {children}
        </div>
      )}
    </div>
  );
}