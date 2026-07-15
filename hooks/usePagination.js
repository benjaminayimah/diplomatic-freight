import { useMemo, useState, useEffect } from "react";

export default function usePagination(items = [], itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page whenever the data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [items, itemsPerPage]);

  const totalPages = Math.max(
    1,
    Math.ceil(items.length / itemsPerPage)
  );

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const nextPage = () =>
    setCurrentPage((page) => Math.min(page + 1, totalPages));

  const previousPage = () =>
    setCurrentPage((page) => Math.max(page - 1, 1));

  const goToPage = (page) => {
    setCurrentPage(
      Math.min(Math.max(page, 1), totalPages)
    );
  };

  return {
    data: paginatedItems,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    goToPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    totalItems: items.length,
    itemsPerPage,
  };
}