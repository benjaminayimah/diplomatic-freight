import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Select({
  label,
  id,
  options = [],
  errors,
  className = "",
  required = false,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-gray-700 whitespace-nowrap"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={`appearance-none w-full px-3 py-2 border hover:border-gray-400 rounded-md outline-none transition focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500!
            ${errors?.length > 0 ? "border-red-500!" : "border-gray-300"} 
            bg-white
            ${className}`}
          required={required}
          {...props}
        >
          {/* Optional placeholder if needed */}
          {props.placeholder && (
            <option value="" disabled hidden>
              {props.placeholder}
            </option>
          )}

          {options.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          strokeWidth={2}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-600"
        />
      </div>
      {errors?.length > 0 &&
        errors.map((error, index) => (
          <p key={index} className="text-sm text-red-500">
            {error}
          </p>
        ))}
    </div>
  );
}
