"use client";

import { useState } from "react";

const placements = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrows = {
  top: "top-full left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-gray-900",
  bottom:
    "bottom-full left-1/2 -translate-x-1/2 border-x-4 border-b-4 border-x-transparent border-b-gray-900",
  left:
    "left-full top-1/2 -translate-y-1/2 border-y-4 border-l-4 border-y-transparent border-l-gray-900",
  right:
    "right-full top-1/2 -translate-y-1/2 border-y-4 border-r-4 border-y-transparent border-r-gray-900",
};

export default function Tooltip({
  children,
  content,
  placement = "top",
  delay = 200,
  disabled = false,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(null);

  function handleMouseEnter() {
    if (disabled) return;

    const timeout = setTimeout(() => {
      setOpen(true);
    }, delay);

    setTimer(timeout);
  }

  function handleMouseLeave() {
    clearTimeout(timer);
    setOpen(false);
  }

  if (disabled) return children;

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {open && (
        <div
          role="tooltip"
          className={`
            absolute z-50 whitespace-nowrap
            rounded-md bg-gray-900 px-3 py-1.5
            text-xs text-white shadow-lg
            ${placements[placement]}
            ${className}
          `}
        >
          {content}

          <span
            className={`
              absolute h-0 w-0
              ${arrows[placement]}
            `}
          />
        </div>
      )}
    </div>
  );
}