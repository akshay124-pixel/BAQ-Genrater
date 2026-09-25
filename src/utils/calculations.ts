import { BoqItem, BoqSummary } from '../types/boq';

/**
 * Rounds a number to 2 decimal places for currency
 */
function roundTo2Decimals(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Calculates GST amount based on unit rate and GST percentage
 * @param unitRate - The base unit rate in INR
 * @param gstPercentage - GST percentage (e.g., 18 for 18%)
 * @returns GST amount in INR, rounded to 2 decimal places
 * 
 * @example
 * calculateGstAmount(550000, 18) // Returns 99000.00
 * calculateGstAmount(11000, 18) // Returns 1980.00
 */
export function calculateGstAmount(
  unitRate: number,
  gstPercentage: number
): number {
  if (unitRate < 0 || gstPercentage < 0) {
    return 0;
  }
  const gstAmount = (unitRate * gstPercentage) / 100;
  return roundTo2Decimals(gstAmount);
}

/**
 * Calculates rate including tax (unit rate + GST amount)
 * @param unitRate - The base unit rate in INR
 * @param gstAmount - GST amount in INR
 * @returns Rate including taxes, rounded to 2 decimal places
 * 
 * @example
 * calculateRateIncludingTax(550000, 99000) // Returns 649000.00
 */
export function calculateRateIncludingTax(
  unitRate: number,
  gstAmount: number
): number {
  if (unitRate < 0) return 0;
  return roundTo2Decimals(unitRate + gstAmount);
}

/**
 * Calculates total amount for an item (rate including tax × quantity)
 * @param rateIncludingTax - Rate per unit including taxes
 * @param quantity - Quantity of items
 * @returns Total amount, rounded to 2 decimal places
 * 
 * @example
 * calculateItemTotal(649000, 1) // Returns 649000.00
 * calculateItemTotal(12980, 5) // Returns 64900.00
 */
export function calculateItemTotal(
  rateIncludingTax: number,
  quantity: number
): number {
  if (rateIncludingTax < 0 || quantity < 0) return 0;
  return roundTo2Decimals(rateIncludingTax * quantity);
}

/**
 * Recalculates all derived fields for a BOQ item
 * @param item - Partial BOQ item with at least unitRate, gstPercentage, and quantity
 * @returns Calculated fields: gstAmount, rateIncludingTax, totalAmount
 * 
 * @example
 * recalculateItem({ unitRate: 550000, gstPercentage: 18, quantity: 1 })
 * // Returns { gstAmount: 99000, rateIncludingTax: 649000, totalAmount: 649000 }
 */
export function recalculateItem(
  item: Partial<BoqItem>
): Pick<BoqItem, 'gstAmount' | 'rateIncludingTax' | 'totalAmount'> {
  const unitRate = item.unitRate || 0;
  const gstPercentage = item.gstPercentage || 0;
  const quantity = item.quantity || 0;

  const gstAmount = calculateGstAmount(unitRate, gstPercentage);
  const rateIncludingTax = calculateRateIncludingTax(unitRate, gstAmount);
  const totalAmount = calculateItemTotal(rateIncludingTax, quantity);

  return { gstAmount, rateIncludingTax, totalAmount };
}

/**
 * Calculates summary totals for entire BOQ
 * @param items - Array of BOQ items
 * @returns Summary with item count, subtotal, total GST, and grand total
 * 
 * @example
 * const summary = calculateBoqSummary(items);
 * console.log(summary.grandTotal); // Total including all taxes
 */
export function calculateBoqSummary(items: BoqItem[]): BoqSummary {
  if (!items || items.length === 0) {
    return {
      itemCount: 0,
      subtotal: 0,
      totalGst: 0,
      grandTotal: 0,
    };
  }

  const itemCount = items.length;

  // Subtotal: sum of (unitRate × quantity) for all items
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitRate * item.quantity,
    0
  );

  // Total GST: sum of (gstAmount × quantity) for all items
  const totalGst = items.reduce(
    (sum, item) => sum + item.gstAmount * item.quantity,
    0
  );

  // Grand Total: sum of all totalAmount
  const grandTotal = items.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );

  return {
    itemCount,
    subtotal: roundTo2Decimals(subtotal),
    totalGst: roundTo2Decimals(totalGst),
    grandTotal: roundTo2Decimals(grandTotal),
  };
}

/**
 * Validates if calculated values match expected totals (for testing)
 * @param items - Array of BOQ items
 * @returns true if subtotal + totalGst equals grandTotal
 */
export function validateCalculations(items: BoqItem[]): boolean {
  const summary = calculateBoqSummary(items);
  const calculatedTotal = roundTo2Decimals(summary.subtotal + summary.totalGst);
  return Math.abs(calculatedTotal - summary.grandTotal) < 0.01; // Allow 1 paisa difference due to rounding
}
