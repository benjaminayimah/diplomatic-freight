import React from "react";
import Select from "@/app/components/Select";
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

function PaginationFooter({
  onChange,
  value,
  options,
  onClickPrev,
  disabledPrev,
  disabledNext,
  onClickNext,
  currentPage,
  totalPages
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">

      <div className="flex items-center gap-1">
        <span className="text-sm text-gray-500">
          Rows per page:
        </span>
        <div>
          <Select
            id="row_per_page"
            options={options}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            errors={[]}
            onFocus={() => {}}
            chevronCSS="right-2 h-3.5"
            className="
              py-1! pl-2.5! h-8 pr-5! border-0 bg-gray-100!
              hover:bg-gray-200! text-gray-700 font-medium
              rounded-full! focus-within:ring-0!
            "
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={disabledPrev}
          onClick={onClickPrev}
          className="
            h-8 w-8 grid place-items-center rounded-full
            bg-gray-100 transition
            disabled:text-gray-400 disabled:cursor-default
            enabled:hover:bg-gray-200
          "
          aria-label="Previous page"
        >
          <ChevronLeftIcon 
            strokeWidth={2}
            className="h-4"
          />
        </button>
        <span className="text-sm text-gray-700 whitespace-nowrap">
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          disabled={disabledNext}
          onClick={onClickNext}
          className="
            h-8 w-8 grid place-items-center rounded-full
            bg-gray-100 transition
            disabled:text-gray-400 disabled:cursor-default
            enabled:hover:bg-gray-200
          "
          aria-label="Next page"
        >
          <ChevronRightIcon 
            strokeWidth={2}
            className="h-4"
          />
        </button>
      </div>
    </div>
  );
}

export default PaginationFooter;