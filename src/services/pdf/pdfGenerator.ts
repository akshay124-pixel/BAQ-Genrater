import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BoqData } from '../../types/boq';
import { CompanyConfig } from '../../types/company';
import { calculateBoqSummary } from '../../utils/calculations';
import { formatCurrency } from '../../utils/currency';
import { formatDateForPdf } from '../../utils/date';
import { generateFilename, formatBoqTableData } from './pdfUtils';
import { calculateScaledDimensions } from './imageLoader';
import {
  PROMARK_LOGO_BASE64,
  PROMARK_LOGO_DIMENSIONS,
  PROMARK_LOGO_METADATA,
} from '../../assets/promarkLogo';

// Page configuration
const PAGE_CONFIG = {
  pageWidth: 297,
  pageHeight: 210,
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 10,
  marginRight: 10,
};

// Colors matching the reference document
const COLORS = {
  promarkBlue: [0, 82, 155] as [number, number, number], // Promark blue
  footerBlue: [0, 68, 130] as [number, number, number], // Footer blue bar
  headerText: [80, 80, 80] as [number, number, number],
  tableHeader: [217, 217, 217] as [number, number, number], // Light gray
  text: [0, 0, 0] as [number, number, number],
  border: [0, 0, 0] as [number, number, number],
};

/**
 * Generates a professional BOQ PDF document matching the reference format
 */
export async function generateBoqPdf(
  boqData: BoqData,
  companyConfig: CompanyConfig
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  let yPosition = PAGE_CONFIG.marginTop;

  // Add Promark logo header using the exact supplied logo image asset
  yPosition = addPromarkHeader(doc, yPosition);
  
  // Add spacing
  yPosition += 8;

  // Add client and project info section
  yPosition = addClientInfo(doc, boqData.header, yPosition);
  
  // Add spacing
  yPosition += 8;

  // Add greeting and reference text
  yPosition = addGreeting(doc, boqData.header, yPosition);
  
  // Add spacing
  yPosition += 5;

  // Add BOQ table
  yPosition = addBoqTable(doc, boqData.items, yPosition);

  // Add spacing
  yPosition += 8;

  // Add summary
  yPosition = addSummary(doc, boqData.items, yPosition);

  // Add terms & conditions on new page
  addTermsAndConditions(doc, companyConfig.termsAndConditions);

  // Add footer to all pages
  addFooter(doc, companyConfig);

  // Save PDF
  const filename = generateFilename(
    boqData.header.clientName,
    boqData.header.projectDetail,
    boqData.header.date
  );
  doc.save(filename);
}

/**
 * Adds Promark logo (directly embedded supplied image) and company header
 */
function addPromarkHeader(doc: jsPDF, startY: number): number {
  const y = startY + 2;

  // Calculate logo dimensions to fit nicely in header while strictly preserving aspect ratio
  const scaledDimensions = calculateScaledDimensions(
    PROMARK_LOGO_DIMENSIONS.width,
    PROMARK_LOGO_DIMENSIONS.height,
    PROMARK_LOGO_METADATA.preferredMaxWidth,
    PROMARK_LOGO_METADATA.preferredMaxHeight
  );

  // Directly embed the exact supplied Promark logo image asset with high quality
  doc.addImage(
    PROMARK_LOGO_BASE64,
    'PNG',
    PAGE_CONFIG.marginLeft,
    y,
    scaledDimensions.width,
    scaledDimensions.height,
    undefined,
    'FAST'
  );

  // Return position after logo
  return y + scaledDimensions.height + 2;
}

/**
 * Adds client and project information section
 */
function addClientInfo(doc: jsPDF, header: BoqData['header'], startY: number): number {
  let y = startY;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.text);

  // Left column - labels and values
  const leftX = PAGE_CONFIG.marginLeft;
  const valueX = leftX + 25; // Position for values
  
  // Client Name
  doc.text('Client Name:', leftX, y);
  doc.text(header.clientName || '', valueX, y);
  
  // Project Detail
  doc.text('Project Detail:', leftX, y + 4);
  doc.text(header.projectDetail || '', valueX, y + 4);
  
  // Location
  doc.text('Location:', leftX, y + 8);
  doc.text(header.location || '', valueX, y + 8);

  // Right column (Date, Sales Person, Version)
  const rightLabelX = PAGE_CONFIG.pageWidth - PAGE_CONFIG.marginRight - 60;
  const rightValueX = rightLabelX + 25;
  
  // Date
  doc.text('Date:', rightLabelX, y);
  doc.text(formatDateForPdf(header.date), rightValueX, y);
  
  // Sales Person
  doc.text('Sales Person:', rightLabelX, y + 4);
  doc.text(header.salesPerson || '', rightValueX, y + 4);
  
  // Version
  doc.text('Version:', rightLabelX, y + 8);
  doc.text(header.version || '', rightValueX, y + 8);

  y += 12;

  // Subject line
  doc.text('Sub:', leftX, y);
  if (header.subject) {
    const subjectText = doc.splitTextToSize(header.subject, PAGE_CONFIG.pageWidth - leftX - PAGE_CONFIG.marginRight - 10);
    doc.text(subjectText, valueX, y);
    y += (subjectText.length * 4);
  }
  
  y += 1;

  return y;
}

/**
 * Adds greeting and reference text
 */
function addGreeting(doc: jsPDF, _header: BoqData['header'], startY: number): number {
  let y = startY;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.text);

  doc.text('Dear Sir/Mam,', PAGE_CONFIG.marginLeft, y);
  y += 4;
  doc.text('This is with reference to your requirement, Please find below the Offer as under.', PAGE_CONFIG.marginLeft, y);
  y += 6;

  return y;
}

/**
 * Adds BOQ table with auto-pagination
 */
function addBoqTable(doc: jsPDF, items: BoqData['items'], startY: number): number {
  const tableData = formatBoqTableData(items);

  const columns = [
    { header: 'Sr. No.', dataKey: 'srNo' },
    { header: 'Item', dataKey: 'item' },
    { header: 'Description', dataKey: 'description' },
    { header: 'Qty', dataKey: 'qty' },
    { header: 'Unit', dataKey: 'unit' },
    { header: 'Rate', dataKey: 'rate' },
    { header: 'GST', dataKey: 'gst' },
    { header: 'GST amount', dataKey: 'gstAmt' },
    { header: 'Rate incl. taxes', dataKey: 'rateIncl' },
    { header: 'Amount', dataKey: 'amount' },
  ];

  const runAutoTable = (d: jsPDF, opts: any) => {
    if (typeof autoTable === 'function') {
      autoTable(d, opts);
    } else if (typeof (autoTable as any)?.default === 'function') {
      (autoTable as any).default(d, opts);
    } else if (typeof (d as any).autoTable === 'function') {
      (d as any).autoTable(opts);
    }
  };

  runAutoTable(doc, {
    head: [columns.map(col => col.header)],
    body: tableData,
    startY: startY,
    
    margin: {
      top: PAGE_CONFIG.marginTop,
      bottom: PAGE_CONFIG.marginBottom,
      left: PAGE_CONFIG.marginLeft,
      right: PAGE_CONFIG.marginRight,
    },
    
    pageBreak: 'auto',
    rowPageBreak: 'avoid',
    showHead: 'everyPage',
    
    columnStyles: {
      0: { cellWidth: 12, halign: 'center' },
      1: { cellWidth: 30, halign: 'left' },
      2: { cellWidth: 75, halign: 'left' },
      3: { cellWidth: 12, halign: 'right' },
      4: { cellWidth: 15, halign: 'center' },
      5: { cellWidth: 22, halign: 'right' },
      6: { cellWidth: 12, halign: 'center' },
      7: { cellWidth: 22, halign: 'right' },
      8: { cellWidth: 25, halign: 'right' },
      9: { cellWidth: 25, halign: 'right' },
    },
    
    styles: {
      fontSize: 8,
      cellPadding: 2,
      overflow: 'linebreak',
      cellWidth: 'wrap',
      lineColor: COLORS.border,
      lineWidth: 0.1,
      textColor: COLORS.text,
    },
    
    headStyles: {
      fillColor: COLORS.tableHeader,
      textColor: COLORS.text,
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'center',
      valign: 'middle',
      lineColor: COLORS.border,
      lineWidth: 0.1,
    },
    
    bodyStyles: {
      textColor: COLORS.text,
      lineColor: COLORS.border,
      lineWidth: 0.1,
    },
    
    alternateRowStyles: {
      fillColor: [255, 255, 255],
    },
  });

  return (doc as any).lastAutoTable.finalY + 5;
}

/**
 * Adds summary section with total amount
 */
function addSummary(doc: jsPDF, items: BoqData['items'], startY: number): number {
  const summary = calculateBoqSummary(items);
  
  // Check if we need a new page for summary
  if (startY > PAGE_CONFIG.pageHeight - 30) {
    doc.addPage();
    startY = PAGE_CONFIG.marginTop + 10;
  }

  let y = startY;

  const rightX = PAGE_CONFIG.pageWidth - PAGE_CONFIG.marginRight;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.text);

  // Total Amount - right aligned like in the table
  const totalText = 'Total Amount';
  const totalValue = formatCurrency(summary.grandTotal).replace('₹', '');
  
  // Calculate position to align with last two columns of table
  const amountColumnX = rightX - 27; // Align with Amount column
  const labelColumnX = amountColumnX - 25; // Align with "Rate incl. taxes" column
  
  doc.text(totalText, labelColumnX, y, { align: 'right' });
  doc.text(totalValue, amountColumnX, y, { align: 'right' });

  return y + 10;
}

/**
 * Adds terms & conditions
 */
function addTermsAndConditions(doc: jsPDF, terms: string[]): void {
  doc.addPage();
  
  let y = PAGE_CONFIG.marginTop + 10;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.text);
  doc.text('Terms and conditions:', PAGE_CONFIG.marginLeft, y);
  y += 6;

  // Terms
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.text);

  const maxWidth = PAGE_CONFIG.pageWidth - PAGE_CONFIG.marginLeft - PAGE_CONFIG.marginRight;

  terms.forEach((term, index) => {
    const lines = doc.splitTextToSize(`${index + 1}.) ${term}`, maxWidth);
    
    // Check if we need a new page
    if (y + (lines.length * 3.5) > PAGE_CONFIG.pageHeight - PAGE_CONFIG.marginBottom - 20) {
      doc.addPage();
      y = PAGE_CONFIG.marginTop + 10;
    }

    lines.forEach((line: string) => {
      doc.text(line, PAGE_CONFIG.marginLeft, y);
      y += 3.5;
    });
    y += 1;
  });

  // Add payment instructions
  y += 4;
  doc.text('You may kindly raise the Purchase Order & Cheque /DD for advance amount in favour of:', PAGE_CONFIG.marginLeft, y);
  y += 4;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Promark Techsolutions Pvt. Ltd.', PAGE_CONFIG.marginLeft, y);
  y += 4;
  
  doc.setFont('helvetica', 'normal');
  doc.text('CIN: U36109PB2010PTC034337. GST 03AAFCP7669C1ZF. PAN: AAFCP7669C', PAGE_CONFIG.marginLeft, y);
  y += 6;
  
  doc.text('We hope the estimate is in line with your requirements. For any clarifications, please get back to us.', PAGE_CONFIG.marginLeft, y);
  y += 4;
  doc.text('Thanks & Regards', PAGE_CONFIG.marginLeft, y);
}

/**
 * Adds footer to all pages - blue bar with company info
 */
function addFooter(doc: jsPDF, _company: CompanyConfig): void {
  const pageCount = (doc as any).internal.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    const footerY = PAGE_CONFIG.pageHeight - 20;
    
    // Blue footer bar
    doc.setFillColor(...COLORS.footerBlue);
    doc.rect(0, footerY, PAGE_CONFIG.pageWidth, 20, 'F');
    
    // Footer text - white color
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    
    // Center: Company name
    const centerText = 'PROMARK TECHSOLUTIONS PRIVATE LIMITED';
    doc.text(centerText, PAGE_CONFIG.pageWidth / 2, footerY + 5, { align: 'center' });
    
    // Three columns for office details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    
    // Left: Corporate Office
    const leftX = 15;
    doc.setFont('helvetica', 'bold');
    doc.text('CORPORATE OFFICE', leftX, footerY + 9);
    doc.setFont('helvetica', 'normal');
    const corpOffice = doc.splitTextToSize('Promark Corporate Mansion, Plot No E-250, Industrial Area 8-B, Mohali, Punjab, India-160071', 70);
    doc.text(corpOffice, leftX, footerY + 12);
    
    // Center: Factory
    const centerX = PAGE_CONFIG.pageWidth / 2 - 35;
    doc.setFont('helvetica', 'bold');
    doc.text('FACTORY', centerX, footerY + 9);
    doc.setFont('helvetica', 'normal');
    const factory = doc.splitTextToSize('Village Baddi Madouli, Morinda By-Pass, Adjoining Preet Palace, Ludhiana Highway (NH-95), Mormda, Distt Rupnagar, Punjab, India-140101', 70);
    doc.text(factory, centerX, footerY + 12);
    
    // Right: Sales Office
    const rightX = PAGE_CONFIG.pageWidth - 85;
    doc.setFont('helvetica', 'bold');
    doc.text('SALES OFFICE', rightX, footerY + 9);
    doc.setFont('helvetica', 'normal');
    const sales = doc.splitTextToSize('Tower-5, Office No-414, RPS 12th Avenue, Adjoining Sarai Metro Station, Faridabad (NCR)-121001 India', 70);
    doc.text(sales, rightX, footerY + 12);
    
    // Bottom row - CIN, GSTIN, PAN
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text('CIN:U3109PB2010PTC034337', leftX, footerY + 18);
    doc.text('GSTIN: 03AAFCP7669C1Z5', PAGE_CONFIG.pageWidth / 2, footerY + 18, { align: 'center' });
    doc.text('PAN: AAFCP7669C', PAGE_CONFIG.pageWidth - PAGE_CONFIG.marginRight - 5, footerY + 18, { align: 'right' });
  }
}
