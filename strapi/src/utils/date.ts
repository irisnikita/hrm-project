/**
 * Extracts the year, month, and day from the given date.
 * @param date - The date to extract the parts from.
 * @returns An object containing the year, month, and day.
 */
export function extractDateParts(date: Date) {
  const year = date.getFullYear(); // Get the full year
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so add 1
  const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with '0' if needed

  return { year, month, day };
}
