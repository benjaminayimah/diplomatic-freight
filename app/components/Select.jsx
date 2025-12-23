import React from "react";

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

      <select
        id={id}
        className={`w-full px-3 py-2 border hover:border-gray-400 rounded-md outline-none transition
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

      {errors?.length > 0 &&
        errors.map((error, index) => (
          <p key={index} className="text-xs text-red-500">
            {error}
          </p>
        ))}
    </div>
  );
}
