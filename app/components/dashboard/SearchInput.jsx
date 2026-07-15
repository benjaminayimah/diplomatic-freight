import React from "react";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function SearchInput({
  onChange,
  value,
  placeholder = "Search...",
}) {
  return (
    <div className="relative w-full">
      <MagnifyingGlassIcon
        className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 hover:border-gray-400 bg-white py-2.5 pl-10 pr-10 text-sm placeholder:text-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          aria-label="Clear search"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;