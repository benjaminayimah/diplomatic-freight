import React from "react";

export default function Textarea({
  label,
  id,
  errors = [],
  className = "",
  rows = 4,
  ...props
  }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}

      <textarea
        id={id}
        rows={rows}
        className={`w-full px-3 py-2 border hover:border-gray-400 rounded-md outline-none transition resize-none
          ${errors.length > 0 ? "border-red-500!" : "border-gray-300"} 
          ${className}`}
        {...props}
      />

      {errors.length > 0 &&
        errors.map((error, index) => (
          <p key={index} className="text-xs text-red-500">
            {error}
          </p>
        ))}
    </div>
  );
}
