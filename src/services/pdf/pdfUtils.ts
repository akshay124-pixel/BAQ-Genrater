import { formatCurrency } from '../../utils/currency';
import { formatDateForPdf } from '../../utils/date';

/**
 * Generates a safe filename for the PDF
 */
export function generateFilename(clientName: string, projectDetail: string, date: string): string {
  const sanitize = (str: string) =>
    str
      .replace(/[^a-z0-9]/gi, '_')
      .replace(/_{2,}/g, '_')
      .substring(0, 50);

  const client = sanitize(clientName);
  const project = sanitize(projectDetail);
  const dateStr = formatDateForPdf(date).replace(/\//g, '-');

  return `BOQ_${client}_${project}_${dateStr}.pdf`;
}

/**
 * Wraps text to fit within specified width
 */
export function wrapText(text: string, _maxWidth: number): string[] {
  // Simple word wrap - jsPDF handles this internally for table cells
  return [text];
}

/**
 * Formats BOQ table data for jsPDF autoTable
 */
export function formatBoqTableData(items: any[]) {
  return items.map((item, index) => [
    (index + 1).toString(),
    item.itemName || '',
    item.description || '',
    item.quantity.toString(),
    item.unit || '',
    formatCurrency(item.unitRate).replace('₹', ''),
    `${item.gstPercentage}%`,
    formatCurrency(item.gstAmount).replace('₹', ''),
    formatCurrency(item.rateIncludingTax).replace('₹', ''),
    formatCurrency(item.totalAmount).replace('₹', ''),
  ]);
}

/**
 * Calculates vertical position with page break check
 */
export function checkAddPage(doc: any, currentY: number, requiredHeight: number, pageHeight: number, marginBottom: number): number {
  if (currentY + requiredHeight > pageHeight - marginBottom) {
    doc.addPage();
    return 20; // Reset to top margin
  }
  return currentY;
}
