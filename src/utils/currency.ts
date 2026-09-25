/**
 * Currency formatting utilities for Indian Rupee (INR)
 * Uses Indian numbering system: 1,00,000 not 100,000
 */

const indianCurrencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const indianNumberFormatter = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const indianIntegerFormatter = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Formats a number as Indian currency with ₹ symbol
 * @param amount - Amount in INR
 * @returns Formatted currency string
 * 
 * @example
 * formatCurrency(649000) // Returns "₹6,49,000.00"
 * formatCurrency(1980.50) // Returns "₹1,980.50"
 * formatCurrency(100000) // Returns "₹1,00,000.00"
 */
export function formatCurrency(amount: number): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '₹0.00';
  }
  return indianCurrencyFormatter.format(amount);
}

/**
 * Formats a number with Indian numbering (no currency symbol)
 * @param value - Number to format
 * @returns Formatted number string with 2 decimal places
 * 
 * @example
 * formatNumber(649000) // Returns "6,49,000.00"
 * formatNumber(1980.5) // Returns "1,980.50"
 */
export function formatNumber(value: number): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '0.00';
  }
  return indianNumberFormatter.format(value);
}

/**
 * Formats a number as integer with Indian numbering (no decimals)
 * @param value - Number to format
 * @returns Formatted integer string
 * 
 * @example
 * formatInteger(649000) // Returns "6,49,000"
 * formatInteger(1980.75) // Returns "1,981" (rounded)
 */
export function formatInteger(value: number): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '0';
  }
  return indianIntegerFormatter.format(value);
}

/**
 * Formats percentage
 * @param value - Percentage value (e.g., 18 for 18%)
 * @returns Formatted percentage string
 * 
 * @example
 * formatPercentage(18) // Returns "18%"
 * formatPercentage(5.5) // Returns "5.5%"
 */
export function formatPercentage(value: number): string {
  if (value === null || value === undefined || isNaN(value)) {
    return '0%';
  }
  return `${value}%`;
}

/**
 * Parses currency string to number (removes ₹, commas)
 * @param currencyString - Currency string to parse
 * @returns Parsed number or 0 if invalid
 * 
 * @example
 * parseCurrency("₹6,49,000.00") // Returns 649000
 * parseCurrency("1,980.50") // Returns 1980.50
 */
export function parseCurrency(currencyString: string): number {
  if (!currencyString) return 0;
  
  // Remove currency symbol, commas, and spaces
  const cleaned = currencyString
    .replace(/[₹,\s]/g, '')
    .trim();
  
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Validates if a number is a valid currency amount
 * @param value - Value to validate
 * @returns true if valid currency amount
 */
export function isValidCurrencyAmount(value: number): boolean {
  return typeof value === 'number' && 
         !isNaN(value) && 
         isFinite(value) && 
         value >= 0;
}
