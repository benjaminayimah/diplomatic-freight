import React from "react";

export default function Input({
  label,
  id,
  type = "text",
  errors,
  className = "",
  required = false,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-gray-700 whitespace-nowrap">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`w-full px-3 py-2 border hover:border-gray-400 rounded-md outline-none transition
          ${errors?.length > 0 ? "border-red-500!" : "border-gray-300"} 
          ${className}`}
        {...props}
        required={required}
      />
      {errors?.length > 0 &&
        errors.map((error, index) => (
          <p key={index} className="text-xs text-red-500">
            {error}
          </p>
        ))}
    </div>
  );
}
