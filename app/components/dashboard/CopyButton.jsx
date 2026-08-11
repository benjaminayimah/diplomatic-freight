"use client";

import React, { useState, useRef, useEffect } from "react";
import Tooltip from "./Tooltip";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useSnackbar } from "@/app/components/SnackbarContext"; // adjust path if needed

function CopyButton({
  value,
  className = "",
  iconClassName = "h-4 w-4",
  duration = 2500,
  message = "Copied to clipboard!",
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const { showSnackbar } = useSnackbar();

  const handleCopy = async () => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);

      showSnackbar(message, "success");

      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, duration);
    } catch (error) {
      console.error("Failed to copy:", error);
      showSnackbar("Failed to copy to clipboard.", "error");
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Tooltip content={copied ? "Copied" : "Copy number"} placement="bottom">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy"}
        className={`
          grid
          place-items-center
          transition
          duration-300
          rounded-full
          hover:text-gray-600
          ${copied ? "bg-gray-100" : ""}
          ${className}
        `}
      >
        {copied ? (
          <CheckIcon
            strokeWidth={2}
            className={iconClassName}
          />
        ) : (
          <svg width="13" height="13" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M20 10C20 9.44771 19.5523 9 19 9H10C9.44771 9 9 9.44771 9 10V19C9 19.5523 9.44771 20 10 20H19C19.5523 20 20 19.5523 20 19V10ZM13 4V3C13 2.73478 12.8946 2.48051 12.707 2.29297C12.5195 2.10543 12.2652 2 12 2H3C2.73478 2 2.4805 2.10543 2.29297 2.29297C2.10543 2.4805 2 2.73478 2 3V12C2 12.2652 2.10543 12.5195 2.29297 12.707C2.48051 12.8946 2.73478 13 3 13H4C4.55228 13 5 13.4477 5 14C5 14.5523 4.55228 15 4 15H3C2.20435 15 1.44152 14.6837 0.878906 14.1211C0.316297 13.5585 0 12.7956 0 12V3C0 2.20435 0.316297 1.44152 0.878906 0.878906C1.44152 0.316297 2.20435 0 3 0H12C12.7956 0 13.5585 0.316297 14.1211 0.878906C14.6837 1.44152 15 2.20435 15 3V4C15 4.55228 14.5523 5 14 5C13.4477 5 13 4.55228 13 4ZM22 19C22 20.6569 20.6569 22 19 22H10C8.34315 22 7 20.6569 7 19V10C7 8.34315 8.34315 7 10 7H19C20.6569 7 22 8.34315 22 10V19Z" />
          </svg>
        )}
      </button>
    </Tooltip>
  );
}

export default CopyButton;