import ExcelJS from 'exceljs';
import { BoqData } from '../../types/boq';
import { CompanyConfig } from '../../types/company';
import { calculateBoqSummary } from '../../utils/calculations';
import { formatDateForPdf } from '../../utils/date';
import { generateFilename } from '../pdf/pdfUtils';
import { PROMARK_LOGO_BASE64 } from '../../assets/promarkLogo';

/**
 * Professional Promark Brand Color Palette (ARGB for ExcelJS)
 */
const BRAND = {
  primary: 'FF00529B',       // Promark Signature Blue
  primaryDark: 'FF00386B',   // Deep Corporate Blue
  primaryLight: 'FFEBF3FA',  // Soft Ice Blue Tint for Card Headers
  cardHeaderBg: 'FFEBF2F9',  // Subtle Ice Blue Background for Card Titles
  cardBg: 'FFF8FAFC',        // Clean Light Slate Background for Cards
  rowAlternate: 'FFF4F8FD',  // Very Subtle Alternating Table Row Fill
  totalBoxBg: 'FF00529B',    // Prominent Blue for Grand Total Box
  totalSubBg: 'FFF1F5F9',    // Soft Background for Subtotals
  white: 'FFFFFFFF',         // Pure White
  textPrimary: 'FF0F172A',   // Slate 900 Primary Text
  textSecondary: 'FF334155', // Slate 700 Body Text
  textMuted: 'FF64748B',     // Slate 500 Label Text
  textBrand: 'FF00529B',     // Brand Blue Text
  borderPrimary: 'FF00529B', // Brand Blue Border
  borderMedium: 'FFCBD5E1',  // Slate 300 Card Outer Border
  borderLight: 'FFE2E8F0',   // Slate 200 Subtle Divider
  borderDark: 'FF003366',    // Deep Navy Border for Total Box
};

/**
 * Reusable Border Definitions
 */
const BORDERS = {
  thinLight: { style: 'thin' as const, color: { argb: BRAND.borderLight } },
  thinMedium: { style: 'thin' as const, color: { argb: BRAND.borderMedium } },
  mediumPrimary: { style: 'medium' as const, color: { argb: BRAND.borderPrimary } },
  thickPrimary: { style: 'medium' as const, color: { argb: BRAND.borderPrimary } },
  mediumDark: { style: 'medium' as const, color: { argb: BRAND.borderDark } },
};

/**
 * Generates a premium, corporate-grade BOQ Excel quotation document
 */
export async function generateBoqExcel(
  boqData: BoqData,
  companyConfig: CompanyConfig
): Promise<void> {
  const wb = new ExcelJS.Workbook();
  wb.creator = companyConfig.name;
  wb.lastModifiedBy = companyConfig.name;
  wb.created = new Date();
  wb.modified = new Date();

  // Create worksheet with hidden gridlines and print-optimized page setup
  const ws = wb.addWorksheet('Commercial Quotation', {
    views: [{ showGridLines: false }],
    pageSetup: {
      paperSize: 9, // A4
      orientation: 'landscape',
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0, // Unconstrained height allows multi-page flow while keeping full width
      horizontalCentered: true,
      margins: {
        left: 0.4,
        right: 0.4,
        top: 0.4,
        bottom: 0.4,
        header: 0.2,
        footer: 0.2,
      },
    },
  });

  // Define optimized column widths (Columns A to J, 10 columns)
  ws.columns = [
    { key: 'srNo', width: 6 },      // Col A (1): Sr. No.
    { key: 'item', width: 24 },     // Col B (2): Item Name
    { key: 'desc', width: 44 },     // Col C (3): Description (wide, wrapped)
    { key: 'qty', width: 8 },       // Col D (4): Qty
    { key: 'unit', width: 8 },      // Col E (5): Unit
    { key: 'rate', width: 15 },     // Col F (6): Unit Rate
    { key: 'gst', width: 8 },       // Col G (7): GST %
    { key: 'gstAmt', width: 14 },   // Col H (8): GST Amount
    { key: 'rateIncl', width: 16 }, // Col I (9): Rate Incl. Tax
    { key: 'amount', width: 17 },   // Col J (10): Total Amount
  ];

  let r = 1;

  // ========== ROW 1: Top Padding ==========
  ws.getRow(r).height = 8;
  r++;

  // ========== ROWS 2-4: BRANDED HEADER WITH LOGO & TITLE ==========
  // Embed the exact supplied Promark logo image
  try {
    const logoImageId = wb.addImage({
      base64: PROMARK_LOGO_BASE64,
      extension: 'png',
    });

    // Place logo in top left (Columns A-C, Rows 2-4)
    // Preserves native 1024x342 aspect ratio (~2.994:1)
    ws.addImage(logoImageId, {
      tl: { col: 0.1, row: 1.1 },
      ext: { width: 168, height: 56 },
    });
  } catch (error) {
    console.error('Failed to embed logo into Excel:', error);
  }

  // Row heights for header
  ws.getRow(2).height = 24;
  ws.getRow(3).height = 18;
  ws.getRow(4).height = 18;

  // Title on right (G2:J2)
  ws.mergeCells('G2:J2');
  const titleCell = ws.getCell('G2');
  titleCell.value = 'COMMERCIAL QUOTATION';
  titleCell.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: BRAND.primary } };
  titleCell.alignment = { horizontal: 'right', vertical: 'middle' };

  // Company Name on right (G3:J3)
  ws.mergeCells('G3:J3');
  const companyCell = ws.getCell('G3');
  companyCell.value = companyConfig.name.toUpperCase();
  companyCell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: BRAND.textSecondary } };
  companyCell.alignment = { horizontal: 'right', vertical: 'middle' };

  // Ref & Date on right (G4:J4)
  ws.mergeCells('G4:J4');
  const refDateCell = ws.getCell('G4');
  refDateCell.value = `Ref: ${boqData.header.version || 'v1.0'}   |   Date: ${formatDateForPdf(boqData.header.date)}`;
  refDateCell.font = { name: 'Segoe UI', size: 9, color: { argb: BRAND.textMuted } };
  refDateCell.alignment = { horizontal: 'right', vertical: 'middle' };

  r = 5;

  // ========== ROW 5: ACCENT BRAND DIVIDER ==========
  ws.getRow(r).height = 4;
  for (let c = 1; c <= 10; c++) {
    const cell = ws.getCell(r, c);
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.primary } };
  }
  r++;

  // ========== ROW 6: Spacing ==========
  ws.getRow(r).height = 12;
  r++;

  // Card Header Row (Row 7)
  ws.getRow(r).height = 24;

  // Left Card Header: CLIENT & PROJECT INFORMATION (Cols A to E)
  ws.mergeCells(`A${r}:E${r}`);
  const clientHeaderCell = ws.getCell(`A${r}`);
  clientHeaderCell.value = '  CLIENT & PROJECT INFORMATION';
  clientHeaderCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: BRAND.primary } };
  clientHeaderCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.cardHeaderBg } };
  clientHeaderCell.alignment = { horizontal: 'left', vertical: 'middle' };
  applyBorderBox(ws, r, 1, r, 5, {
    top: BORDERS.mediumPrimary,
    left: BORDERS.thinMedium,
    right: BORDERS.thinMedium,
    bottom: BORDERS.thinMedium,
  });

  // Right Card Header: DOCUMENT DETAILS (Cols F to J)
  ws.mergeCells(`F${r}:J${r}`);
  const docHeaderCell = ws.getCell(`F${r}`);
  docHeaderCell.value = '  DOCUMENT DETAILS';
  docHeaderCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: BRAND.primary } };
  docHeaderCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.cardHeaderBg } };
  docHeaderCell.alignment = { horizontal: 'left', vertical: 'middle' };
  applyBorderBox(ws, r, 6, r, 10, {
    top: BORDERS.mediumPrimary,
    left: BORDERS.thinMedium,
    right: BORDERS.thinMedium,
    bottom: BORDERS.thinMedium,
  });
  r++;

  // Information Card Fields (Rows 8, 9, 10)
  const infoFields = [
    {
      leftLabel: 'Client Name:',
      leftValue: boqData.header.clientName || '—',
      rightLabel: 'Date:',
      rightValue: formatDateForPdf(boqData.header.date),
    },
    {
      leftLabel: 'Project Detail:',
      leftValue: boqData.header.projectDetail || '—',
      rightLabel: 'Sales Person:',
      rightValue: boqData.header.salesPerson || '—',
    },
    {
      leftLabel: 'Location:',
      leftValue: boqData.header.location || '—',
      rightLabel: 'Version:',
      rightValue: boqData.header.version || 'v1.0',
    },
  ];

  infoFields.forEach((field, idx) => {
    ws.getRow(r).height = 22;

    // Left Card: Label (Cols A-B), Value (Cols C-E)
    ws.mergeCells(`A${r}:B${r}`);
    const lLabelCell = ws.getCell(`A${r}`);
    lLabelCell.value = `  ${field.leftLabel}`;
    lLabelCell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: BRAND.textMuted } };
    lLabelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.cardBg } };
    lLabelCell.alignment = { horizontal: 'left', vertical: 'middle' };

    ws.mergeCells(`C${r}:E${r}`);
    const lValCell = ws.getCell(`C${r}`);
    lValCell.value = field.leftValue;
    lValCell.font = { name: 'Segoe UI', size: 9.5, bold: idx === 0, color: { argb: BRAND.textPrimary } };
    lValCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.cardBg } };
    lValCell.alignment = { horizontal: 'left', vertical: 'middle' };

    applyBorderBox(ws, r, 1, r, 5, {
      left: BORDERS.thinMedium,
      right: BORDERS.thinMedium,
      bottom: BORDERS.thinLight,
    });

    // Right Card: Label (Cols F-G), Value (Cols H-J)
    ws.mergeCells(`F${r}:G${r}`);
    const rLabelCell = ws.getCell(`F${r}`);
    rLabelCell.value = `  ${field.rightLabel}`;
    rLabelCell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: BRAND.textMuted } };
    rLabelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.cardBg } };
    rLabelCell.alignment = { horizontal: 'left', vertical: 'middle' };

    ws.mergeCells(`H${r}:J${r}`);
    const rValCell = ws.getCell(`H${r}`);
    rValCell.value = field.rightValue;
    rValCell.font = { name: 'Segoe UI', size: 9.5, color: { argb: BRAND.textPrimary } };
    rValCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.cardBg } };
    rValCell.alignment = { horizontal: 'left', vertical: 'middle' };

    applyBorderBox(ws, r, 6, r, 10, {
      left: BORDERS.thinMedium,
      right: BORDERS.thinMedium,
      bottom: BORDERS.thinLight,
    });

    r++;
  });

  // Row 11: Subject Bar (Cols A to J)
  ws.getRow(r).height = 24;
  ws.mergeCells(`A${r}:B${r}`);
  const subLabel = ws.getCell(`A${r}`);
  subLabel.value = '  Subject:';
  subLabel.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: BRAND.textMuted } };
  subLabel.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.cardBg } };
  subLabel.alignment = { horizontal: 'left', vertical: 'middle' };

  ws.mergeCells(`C${r}:J${r}`);
  const subValue = ws.getCell(`C${r}`);
  subValue.value = boqData.header.subject || 'Commercial Offer for AV Solution & Equipment';
  subValue.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: BRAND.textPrimary } };
  subValue.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.cardBg } };
  subValue.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };

  applyBorderBox(ws, r, 1, r, 10, {
    left: BORDERS.thinMedium,
    right: BORDERS.thinMedium,
    bottom: BORDERS.thinMedium,
  });
  r++;

  // ========== ROW 12: Spacing ==========
  ws.getRow(r).height = 10;
  r++;

  // ========== ROWS 13-14: GREETING & INTRO ==========
  ws.getRow(r).height = 18;
  ws.mergeCells(`A${r}:J${r}`);
  const greetingCell = ws.getCell(`A${r}`);
  greetingCell.value = 'Dear Sir / Madam,';
  greetingCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: BRAND.textSecondary } };
  greetingCell.alignment = { horizontal: 'left', vertical: 'middle' };
  r++;

  ws.getRow(r).height = 18;
  ws.mergeCells(`A${r}:J${r}`);
  const introCell = ws.getCell(`A${r}`);
  introCell.value = 'This is with reference to your requirement. Please find below our commercial offer as under:';
  introCell.font = { name: 'Segoe UI', size: 9.5, italic: true, color: { argb: BRAND.textMuted } };
  introCell.alignment = { horizontal: 'left', vertical: 'middle' };
  r++;

  // Spacing before table
  ws.getRow(r).height = 8;
  r++;

  // ========== PRODUCT TABLE SECTION ==========
  const tableHeaderRow = r;
  ws.getRow(r).height = 30;

  const tableHeaders = [
    { text: 'Sr.', align: 'center' as const },
    { text: 'Item', align: 'left' as const },
    { text: 'Description', align: 'left' as const },
    { text: 'Qty', align: 'center' as const },
    { text: 'Unit', align: 'center' as const },
    { text: 'Rate (₹)', align: 'right' as const },
    { text: 'GST', align: 'center' as const },
    { text: 'GST Amount (₹)', align: 'right' as const },
    { text: 'Rate Incl. Taxes (₹)', align: 'right' as const },
    { text: 'Amount (₹)', align: 'right' as const },
  ];

  tableHeaders.forEach((th, idx) => {
    const colIdx = idx + 1;
    const cell = ws.getCell(r, colIdx);
    cell.value = th.text;
    cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: BRAND.white } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.primary } };
    cell.alignment = {
      horizontal: th.align,
      vertical: 'middle',
      wrapText: true,
      indent: th.align === 'left' ? 1 : 0,
    };
    cell.border = {
      top: BORDERS.mediumPrimary,
      bottom: BORDERS.mediumPrimary,
      left: { style: 'thin', color: { argb: 'FF1D6FB8' } },
      right: { style: 'thin', color: { argb: 'FF1D6FB8' } },
    };
  });
  r++;

  // Table Data Rows
  boqData.items.forEach((item, index) => {
    const isAlternate = index % 2 === 1;
    const rowBg = isAlternate ? BRAND.rowAlternate : BRAND.white;

    // Dynamic row height based on description length
    const descLength = (item.description || '').length;
    let rowHeight = 28;
    if (descLength > 90) rowHeight = 52;
    else if (descLength > 45) rowHeight = 40;
    else if (descLength > 25) rowHeight = 32;

    ws.getRow(r).height = rowHeight;

    const rowValues = [
      { val: index + 1, align: 'center' as const, valign: 'middle' as const, numFmt: undefined, bold: false },
      { val: item.itemName, align: 'left' as const, valign: 'middle' as const, numFmt: undefined, bold: true },
      { val: item.description, align: 'left' as const, valign: 'top' as const, numFmt: undefined, bold: false },
      { val: item.quantity, align: 'center' as const, valign: 'middle' as const, numFmt: '#,##0', bold: false },
      { val: item.unit, align: 'center' as const, valign: 'middle' as const, numFmt: undefined, bold: false },
      { val: item.unitRate, align: 'right' as const, valign: 'middle' as const, numFmt: '₹#,##,##0.00', bold: false },
      { val: `${item.gstPercentage}%`, align: 'center' as const, valign: 'middle' as const, numFmt: undefined, bold: false },
      { val: item.gstAmount, align: 'right' as const, valign: 'middle' as const, numFmt: '₹#,##,##0.00', bold: false },
      { val: item.rateIncludingTax, align: 'right' as const, valign: 'middle' as const, numFmt: '₹#,##,##0.00', bold: false },
      { val: item.totalAmount, align: 'right' as const, valign: 'middle' as const, numFmt: '₹#,##,##0.00', bold: true },
    ];

    rowValues.forEach((rv, idx) => {
      const colIdx = idx + 1;
      const cell = ws.getCell(r, colIdx);
      cell.value = rv.val;
      cell.font = {
        name: 'Segoe UI',
        size: 9.5,
        bold: rv.bold,
        color: { argb: rv.bold ? BRAND.textPrimary : (idx === 2 ? BRAND.textSecondary : BRAND.textPrimary) },
      };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rowBg } };
      cell.alignment = {
        horizontal: rv.align,
        vertical: rv.valign,
        wrapText: idx === 1 || idx === 2,
        indent: rv.align === 'left' ? 1 : 0,
      };
      cell.border = {
        top: BORDERS.thinLight,
        bottom: BORDERS.thinLight,
        left: colIdx === 1 ? BORDERS.thinMedium : BORDERS.thinLight,
        right: colIdx === 10 ? BORDERS.thinMedium : BORDERS.thinLight,
      };
      if (rv.numFmt) {
        cell.numFmt = rv.numFmt;
      }
    });

    r++;
  });
  const tableDataEndRow = r - 1;

  // Table bottom border
  for (let c = 1; c <= 10; c++) {
    const cell = ws.getCell(tableDataEndRow, c);
    cell.border = {
      ...cell.border,
      bottom: BORDERS.thinMedium,
    };
  }

  // Spacing after table
  ws.getRow(r).height = 6;
  r++;

  // ========== TOTAL SUMMARY BOX ==========
  const summary = calculateBoqSummary(boqData.items);

  // Subtotal row (Taxable Value)
  ws.getRow(r).height = 24;
  ws.mergeCells(`G${r}:I${r}`);
  const subLabelCell = ws.getCell(`G${r}`);
  subLabelCell.value = 'Subtotal (Excl. Taxes):';
  subLabelCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: BRAND.textMuted } };
  subLabelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.totalSubBg } };
  subLabelCell.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };

  const subValCell = ws.getCell(`J${r}`);
  subValCell.value = summary.subtotal;
  subValCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: BRAND.textPrimary } };
  subValCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.totalSubBg } };
  subValCell.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };
  subValCell.numFmt = '₹#,##,##0.00';

  applyBorderBox(ws, r, 7, r, 10, {
    top: BORDERS.thinMedium,
    left: BORDERS.thinMedium,
    right: BORDERS.thinMedium,
    bottom: BORDERS.thinLight,
  });
  r++;

  // Total GST row
  ws.getRow(r).height = 24;
  ws.mergeCells(`G${r}:I${r}`);
  const gstLabelCell = ws.getCell(`G${r}`);
  gstLabelCell.value = 'Total GST:';
  gstLabelCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: BRAND.textMuted } };
  gstLabelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.totalSubBg } };
  gstLabelCell.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };

  const gstValCell = ws.getCell(`J${r}`);
  gstValCell.value = summary.totalGst;
  gstValCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: BRAND.textPrimary } };
  gstValCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.totalSubBg } };
  gstValCell.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };
  gstValCell.numFmt = '₹#,##,##0.00';

  applyBorderBox(ws, r, 7, r, 10, {
    left: BORDERS.thinMedium,
    right: BORDERS.thinMedium,
    bottom: BORDERS.thinLight,
  });
  r++;

  // Prominent Grand Total Box
  ws.getRow(r).height = 34;
  ws.mergeCells(`G${r}:I${r}`);
  const grandLabelCell = ws.getCell(`G${r}`);
  grandLabelCell.value = 'TOTAL AMOUNT (INCL. TAXES):';
  grandLabelCell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: BRAND.white } };
  grandLabelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.totalBoxBg } };
  grandLabelCell.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };

  const grandValCell = ws.getCell(`J${r}`);
  grandValCell.value = summary.grandTotal;
  grandValCell.font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: BRAND.white } };
  grandValCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.totalBoxBg } };
  grandValCell.alignment = { horizontal: 'right', vertical: 'middle', indent: 1 };
  grandValCell.numFmt = '₹#,##,##0.00';

  applyBorderBox(ws, r, 7, r, 10, {
    top: BORDERS.mediumDark,
    bottom: BORDERS.mediumDark,
    left: BORDERS.mediumDark,
    right: BORDERS.mediumDark,
  });
  r++;

  // Spacing after totals
  ws.getRow(r).height = 14;
  r++;

  // ========== TERMS & CONDITIONS SECTION ==========
  ws.getRow(r).height = 26;
  ws.mergeCells(`A${r}:J${r}`);
  const termsHeader = ws.getCell(`A${r}`);
  termsHeader.value = '  TERMS & CONDITIONS';
  termsHeader.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: BRAND.white } };
  termsHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.primary } };
  termsHeader.alignment = { horizontal: 'left', vertical: 'middle' };
  applyBorderBox(ws, r, 1, r, 10, {
    top: BORDERS.mediumPrimary,
    left: BORDERS.thinMedium,
    right: BORDERS.thinMedium,
    bottom: BORDERS.thinMedium,
  });
  r++;

  // Terms Content in Card Format
  companyConfig.termsAndConditions.forEach((term, index) => {
    const termLength = term.length;
    let tHeight = 22;
    if (termLength > 120) tHeight = 36;
    else if (termLength > 60) tHeight = 26;

    ws.getRow(r).height = tHeight;
    ws.mergeCells(`A${r}:J${r}`);
    const termCell = ws.getCell(`A${r}`);
    termCell.value = `   ${index + 1}.)  ${term}`;
    termCell.font = { name: 'Segoe UI', size: 9, color: { argb: BRAND.textSecondary } };
    termCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.cardBg } };
    termCell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
    applyBorderBox(ws, r, 1, r, 10, {
      left: BORDERS.thinMedium,
      right: BORDERS.thinMedium,
      bottom: index === companyConfig.termsAndConditions.length - 1 ? BORDERS.thinMedium : BORDERS.thinLight,
    });
    r++;
  });

  // Spacing after terms
  ws.getRow(r).height = 12;
  r++;

  // ========== PAYMENT INSTRUCTIONS & COMPANY DETAILS ==========
  ws.getRow(r).height = 26;
  ws.mergeCells(`A${r}:J${r}`);
  const payHeader = ws.getCell(`A${r}`);
  payHeader.value = '  PAYMENT INSTRUCTIONS & COMPANY DETAILS';
  payHeader.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: BRAND.white } };
  payHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.primary } };
  payHeader.alignment = { horizontal: 'left', vertical: 'middle' };
  applyBorderBox(ws, r, 1, r, 10, {
    top: BORDERS.mediumPrimary,
    left: BORDERS.thinMedium,
    right: BORDERS.thinMedium,
    bottom: BORDERS.thinMedium,
  });
  r++;

  // Payment instruction row 1
  ws.getRow(r).height = 22;
  ws.mergeCells(`A${r}:J${r}`);
  const payText1 = ws.getCell(`A${r}`);
  payText1.value = '   You may kindly raise the Purchase Order & Cheque / DD for advance amount in favour of:';
  payText1.font = { name: 'Segoe UI', size: 9, color: { argb: BRAND.textMuted } };
  payText1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.cardBg } };
  payText1.alignment = { horizontal: 'left', vertical: 'middle' };
  applyBorderBox(ws, r, 1, r, 10, { left: BORDERS.thinMedium, right: BORDERS.thinMedium, bottom: BORDERS.thinLight });
  r++;

  // Payment instruction row 2: Company Name
  ws.getRow(r).height = 24;
  ws.mergeCells(`A${r}:J${r}`);
  const payText2 = ws.getCell(`A${r}`);
  payText2.value = `   ${companyConfig.name}`;
  payText2.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: BRAND.primary } };
  payText2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.cardBg } };
  payText2.alignment = { horizontal: 'left', vertical: 'middle' };
  applyBorderBox(ws, r, 1, r, 10, { left: BORDERS.thinMedium, right: BORDERS.thinMedium, bottom: BORDERS.thinLight });
  r++;

  // Payment instruction row 3: CIN, GSTIN, PAN
  ws.getRow(r).height = 22;
  ws.mergeCells(`A${r}:J${r}`);
  const payText3 = ws.getCell(`A${r}`);
  payText3.value = `   CIN: ${companyConfig.cin}    |    GSTIN: ${companyConfig.gstin}    |    PAN: ${companyConfig.pan}`;
  payText3.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: BRAND.textSecondary } };
  payText3.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.cardBg } };
  payText3.alignment = { horizontal: 'left', vertical: 'middle' };
  applyBorderBox(ws, r, 1, r, 10, { left: BORDERS.thinMedium, right: BORDERS.thinMedium, bottom: BORDERS.thinLight });
  r++;

  // Payment instruction row 4: Locations & Website
  ws.getRow(r).height = 22;
  ws.mergeCells(`A${r}:J${r}`);
  const payText4 = ws.getCell(`A${r}`);
  payText4.value = `   Corporate Office: ${companyConfig.address}    |    Website: ${companyConfig.website}`;
  payText4.font = { name: 'Segoe UI', size: 8.5, color: { argb: BRAND.textMuted } };
  payText4.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.cardBg } };
  payText4.alignment = { horizontal: 'left', vertical: 'middle' };
  applyBorderBox(ws, r, 1, r, 10, { left: BORDERS.thinMedium, right: BORDERS.thinMedium, bottom: BORDERS.thinMedium });
  r++;

  // Spacing before closing
  ws.getRow(r).height = 14;
  r++;

  // ========== CLOSING SECTION ==========
  ws.getRow(r).height = 20;
  ws.mergeCells(`A${r}:J${r}`);
  const close1 = ws.getCell(`A${r}`);
  close1.value = 'We hope the estimate is in line with your requirements. For any clarifications, please get back to us.';
  close1.font = { name: 'Segoe UI', size: 9.5, italic: true, color: { argb: BRAND.textSecondary } };
  close1.alignment = { horizontal: 'left', vertical: 'middle' };
  r++;

  ws.getRow(r).height = 10;
  r++;

  ws.getRow(r).height = 18;
  ws.mergeCells(`A${r}:J${r}`);
  const close2 = ws.getCell(`A${r}`);
  close2.value = 'Thanks & Regards,';
  close2.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: BRAND.textPrimary } };
  close2.alignment = { horizontal: 'left', vertical: 'middle' };
  r++;

  ws.getRow(r).height = 20;
  ws.mergeCells(`A${r}:J${r}`);
  const close3 = ws.getCell(`A${r}`);
  close3.value = companyConfig.name;
  close3.font = { name: 'Segoe UI', size: 10.5, bold: true, color: { argb: BRAND.primary } };
  close3.alignment = { horizontal: 'left', vertical: 'middle' };
  r++;

  ws.getRow(r).height = 16;
  ws.mergeCells(`A${r}:J${r}`);
  const close4 = ws.getCell(`A${r}`);
  close4.value = 'Authorized Signatory';
  close4.font = { name: 'Segoe UI', size: 8.5, italic: true, color: { argb: BRAND.textMuted } };
  close4.alignment = { horizontal: 'left', vertical: 'middle' };

  // Set print area and repeating table header
  ws.pageSetup.printArea = `A1:J${r}`;
  ws.pageSetup.printTitlesRow = `${tableHeaderRow}:${tableHeaderRow}`;

  // Generate safe filename matching standard
  const filename = generateFilename(
    boqData.header.clientName,
    boqData.header.projectDetail,
    boqData.header.date
  ).replace('.pdf', '.xlsx');

  // Universal export: works in browser and Node environments
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } else {
    // Node environment (e.g. testing, scripting, server)
    await wb.xlsx.writeFile(filename);
  }
}

/**
 * Helper to apply outer and inner borders to a rectangular cell range
 */
function applyBorderBox(
  ws: ExcelJS.Worksheet,
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number,
  borders: {
    top?: ExcelJS.Border;
    bottom?: ExcelJS.Border;
    left?: ExcelJS.Border;
    right?: ExcelJS.Border;
  }
) {
  for (let r = startRow; r <= endRow; r++) {
    for (let c = startCol; c <= endCol; c++) {
      const cell = ws.getCell(r, c);
      const currentBorder = cell.border || {};

      cell.border = {
        top: r === startRow && borders.top ? borders.top : currentBorder.top,
        bottom: r === endRow && borders.bottom ? borders.bottom : currentBorder.bottom,
        left: c === startCol && borders.left ? borders.left : currentBorder.left,
        right: c === endCol && borders.right ? borders.right : currentBorder.right,
      };
    }
  }
}
