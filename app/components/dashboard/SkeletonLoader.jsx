"use client";

function SkeletonLoader({ rows = 8 }) {
  return (
    <>
      <div className="mb-1 flex p-5 justify-between items-center animate-pulse">
        <div>
          <div className="h-6 w-44 rounded bg-gray-200 mb-2" />
          <div className="h-4 w-56 rounded bg-gray-100" />
        </div>
        <div className="h-10 w-57 rounded-xl bg-gray-200" />
      </div>
      <div className="px-5">
        <ul className="grid border border-gray-200 rounded-2xl overflow-hidden">
          {Array.from({ length: rows }).map((_, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b border-gray-200 last:border-b-0 px-4 py-3.5 animate-pulse"
            >
              {/* Left */}
              <div className="flex items-center gap-3 flex-1">
                {/* Icon */}
                <div className="h-11 w-11 rounded-xl bg-gray-200 shrink-0" />

                {/* Text */}
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-4 w-52 rounded bg-gray-200" />

                  <div className="flex gap-3 flex-wrap">
                    <div className="h-3 w-32 rounded bg-gray-100" />
                    <div className="h-3 w-24 rounded bg-gray-100" />
                  </div>
                </div>

                {/* Note pill */}
                {/* <div className="hidden md:block h-7 w-16 rounded-full bg-gray-100" /> */}
              </div>

              {/* Menu */}
              <div className="ml-4 h-10 w-10 rounded-full bg-gray-200 shrink-0" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SkeletonLoader;