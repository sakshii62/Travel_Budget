// Number of days between two dates (inclusive)
export function daysBetween(start, end) {
  if (!start || !end) return 0;
  const diff = new Date(end) - new Date(start);
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)) + 1);
}

// 2026-12-20  ->  20 Dec 2026
export function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}