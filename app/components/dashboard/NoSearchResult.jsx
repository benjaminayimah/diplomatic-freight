import React from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";


function NoSearchResult({input, onClick}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <MagnifyingGlassIcon className="h-10 w-10 text-gray-300 mb-3" />

      <p className="text-xl font-medium text-gray-900">
        No results found
      </p>
      <p className="text-base text-gray-500 mt-1">
        No {input} match your search.
      </p>
      <button
        onClick={() => onClick("")}
        className="mt-4 rounded-full border px-4 py-2 text-sm border-gray-300 hover:bg-gray-50"
      >
        Clear search
      </button>
    </div>
  )
}

export default NoSearchResult