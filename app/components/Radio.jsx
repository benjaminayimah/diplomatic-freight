import React from "react";

export default function Radio({
  label,
  name,
  value,
  checked,
  onChange,
  className = "",
  disabled = false,
}) {
  return (
    <label
      className={`flex items-center gap-2 cursor-pointer select-none
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="hidden peer"
      />

      {/* Custom radio */}
      <span
        className="h-4 w-4 rounded-full border-2 border-gray-400 flex items-center justify-center
        peer-checked:border-blue-600 peer-checked:bg-blue-100
        transition-all"
      >
        <span className="h-2 w-2 rounded-full bg-blue-600 scale-0 peer-checked:scale-100 transition-transform" />
      </span>

      {label && <span className="text-base text-gray-700">{label}</span>}
    </label>
  );
}
