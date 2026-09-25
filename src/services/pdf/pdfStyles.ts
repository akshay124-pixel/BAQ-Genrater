/**
 * PDF styling constants for consistent design
 */

export const PDF_CONFIG = {
  // Page settings
  orientation: 'landscape' as const,
  unit: 'mm' as const,
  format: 'a4' as const,
  
  // A4 Landscape dimensions
  pageWidth: 297,
  pageHeight: 210,
  
  // Margins
  marginTop: 15,
  marginBottom: 15,
  marginLeft: 10,
  marginRight: 10,
};

export const COLORS = {
  primary: [0, 54, 97] as [number, number, number], // Dark blue
  primaryLight: [14, 165, 233] as [number, number, number],
  text: [50, 50, 50] as [number, number, number],
  textLight: [100, 100, 100] as [number, number, number],
  border: [200, 200, 200] as [number, number, number],
  background: [245, 245, 245] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
};

export const FONTS = {
  title: 16,
  subtitle: 12,
  heading: 11,
  body: 9,
  small: 8,
  tiny: 7,
};

export const TABLE_STYLES = {
  columnWidths: {
    srNo: 12,
    item: 30,
    description: 75,
    qty: 15,
    unit: 18,
    rate: 23,
    gst: 12,
    gstAmount: 23,
    rateIncl: 25,
    amount: 27,
  },
  
  headStyles: {
    fillColor: COLORS.primary,
    textColor: COLORS.white,
    fontSize: FONTS.body,
    fontStyle: 'bold' as const,
    halign: 'center' as const,
    valign: 'middle' as const,
    cellPadding: 2,
  },
  
  bodyStyles: {
    textColor: COLORS.text,
    fontSize: FONTS.small,
    cellPadding: 2,
  },
  
  alternateRowStyles: {
    fillColor: COLORS.background,
  },
  
  footerStyles: {
    fillColor: COLORS.primary,
    textColor: COLORS.white,
    fontSize: FONTS.body,
    fontStyle: 'bold' as const,
    halign: 'right' as const,
  },
};

export const SPACING = {
  sectionGap: 8,
  lineGap: 5,
  smallGap: 3,
};
