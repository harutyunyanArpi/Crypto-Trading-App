export function sortByField<T>(
  data: T[],
  field: keyof T,
  direction: "asc" | "desc",
): T[] {
  return [...data].sort((a, b) => {
    const aVal = String(a[field]).toLowerCase?.() ?? a[field];
    const bVal = String(b[field]).toLowerCase?.() ?? b[field];

    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
}
