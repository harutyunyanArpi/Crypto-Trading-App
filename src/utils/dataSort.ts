export function sortByField<T>(
  data: T[],
  field: keyof T,
  direction: "asc" | "desc",
): T[] {
  return [...data].sort((a, b) => {
    const aVal = isNaN(Number(a[field]))
      ? String(a[field]).toLowerCase()
      : Number(a[field]);
    const bVal = isNaN(Number(b[field]))
      ? String(b[field]).toLowerCase()
      : Number(b[field]);

    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
}
