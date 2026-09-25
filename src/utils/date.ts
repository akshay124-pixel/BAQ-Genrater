import { format, parseISO } from 'date-fns';

/**
 * Formats date for display (DD MMM YYYY)
 * @example formatDateForDisplay('2026-09-24') // Returns "24 Sep 2026"
 */
export function formatDateForDisplay(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd MMM yyyy');
  } catch (error) {
    console.error('Invalid date:', dateString);
    return dateString;
  }
}

/**
 * Formats date for PDF (DD-MM-YYYY)
 * @example formatDateForPdf('2026-09-24') // Returns "24-09-2026"
 */
export function formatDateForPdf(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd-MM-yyyy');
  } catch (error) {
    console.error('Invalid date:', dateString);
    return dateString;
  }
}

/**
 * Formats date for filename (YYYY-MM-DD)
 * @example formatDateForFilename('2026-09-24') // Returns "2026-09-24"
 */
export function formatDateForFilename(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'yyyy-MM-dd');
  } catch (error) {
    console.error('Invalid date:', dateString);
    return dateString;
  }
}

/**
 * Gets today's date in ISO format (YYYY-MM-DD)
 */
export function getTodayISO(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

/**
 * Checks if a date string is valid
 */
export function isValidDate(dateString: string): boolean {
  try {
    const date = parseISO(dateString);
    return !isNaN(date.getTime());
  } catch {
    return false;
  }
}
