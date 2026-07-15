import { useMemo } from "react";

export default function useLocalSearch(items = [], query = "", fields = []) {
  return useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return items;

    return items.filter((item) =>
      fields.some((field) => {
        const value = item[field];

        if (value == null) return false;

        return String(value).toLowerCase().includes(search);
      })
    );
  }, [items, query, fields]);
}