/**
 * Formats a Date object into a 'YYYY-MM-DD' string based on the user's local timezone.
 * This avoids the UTC conversion issue inherent in `toISOString()`.
 * @param date The date to format.
 * @returns The formatted date string.
 */
export const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  // getMonth() is 0-indexed, so we add 1.
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Formats a 'YYYY-MM-DD' date string into a more readable format (e.g., "May 12, 2019").
 * It correctly handles potential timezone issues by parsing the date components manually.
 * @param dateString The date string in 'YYYY-MM-DD' format.
 * @returns The formatted, human-readable date string.
 */
export const formatDateForDisplay = (dateString: string): string => {
  if (!dateString || !dateString.includes('-')) {
    // Return a fallback for invalid or unexpected date formats
    return "Invalid Date";
  }
  const [year, month, day] = dateString.split('-').map(Number);
  // Create a date in UTC to avoid timezone shifts, then format it.
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
};