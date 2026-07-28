"use client";

import { useEffect, useRef, useState } from "react";

export default function DropdownMenu({
  trigger,
  children,
  width = "min-w-40",
  placement = "auto", // auto | top | bottom
  dismissibleOutsideClick = true,
  dismissibleEsc = true,
  onOpenChange,
}) {
  const [open, setOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);

  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  // Close other dropdowns
  useEffect(() => {
    const handleDropdownOpened = (e) => {
      if (
        open &&
        menuRef.current &&
        menuRef.current !== e.detail
      ) {
        closeMenu();
      }
    };

    document.addEventListener("dropdown-opened", handleDropdownOpened);

    return () => {
      document.removeEventListener(
        "dropdown-opened",
        handleDropdownOpened
      );
    };
  }, [open]);

  // Calculate menu position
  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      if (!menuRef.current || !dropdownRef.current) return;

      if (placement === "top") {
        setOpenUpwards(true);
        return;
      }

      if (placement === "bottom") {
        setOpenUpwards(false);
        return;
      }

      const triggerRect = menuRef.current.getBoundingClientRect();
      const menuHeight = dropdownRef.current.offsetHeight;

      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;

      setOpenUpwards(
        spaceBelow < menuHeight && spaceAbove > spaceBelow
      );
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, placement]);

  // Outside click + Escape
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
    <div
      ref={menuRef}
      className="relative inline-block"
    >
      <div
        onClick={toggleMenu}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className={`
            ${width}
            absolute right-0
            rounded-2xl
            border border-gray-200
            bg-white
            shadow-lg
            py-2
            z-50
            overflow-hidden
            transition-all duration-200

            ${
              openUpwards
                ? "bottom-full origin-bottom-right"
                : "top-full origin-top-right"
            }
          `}
          onClick={closeMenu}
        >
          {children}
        </div>
      )}
    </div>
  );
}