import React from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";



function NoSearchResult({type, search, onClick}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <MagnifyingGlassIcon className="h-10 w-10 text-gray-300 mb-3" />
      <p className="text-xl font-medium text-gray-900">
        No results found
      </p>
      <p className="text-base text-gray-500 mt-1">
        No {type} match your search for "<span className="font-semibold">{search}</span>".
      </p>
      <button
        onClick={() => onClick("")}
        className="mt-4 font-medium flex items-center gap-0.5 rounded-full border px-3 py-2 text-sm border-gray-200 hover:bg-gray-100"
      >
        <XMarkIcon className="h-4.5 w-4.5" />
        Clear search
      </button>
    </div>
  )
}

export default NoSearchResult