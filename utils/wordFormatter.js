export const formatLabel = (value) =>
  value
    .split("_")
    .map(word => word.replace(/_/g, " ").toUpperCase())
    .join(" ");

