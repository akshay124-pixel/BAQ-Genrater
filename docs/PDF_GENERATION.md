# PDF Generation Documentation

## Overview

The Fast BOQ Generator uses **jsPDF** with **jspdf-autotable** plugin for professional PDF generation with automatic pagination, multi-page tables, and proper text rendering.

## Technology Choice

### Why jsPDF + jspdf-autotable?

**Advantages:**
- ✅ Pure client-side (no server required)
- ✅ Excellent multi-page table support
- ✅ Automatic pagination with repeated headers
- ✅ Selectable text (not screenshot-based)
- ✅ A4 landscape format support
- ✅ Professional typography control
- ✅ Handles long descriptions gracefully
- ✅ Mature, actively maintained library
- ✅ Small bundle size (~200KB total)

**Alternatives Considered:**
- **@react-pdf/renderer**: Heavier, JSX-based, more complex pagination control
- **Puppeteer/Playwright**: Requires server infrastructure, overkill for this use case
- **html2canvas + jsPDF**: Screenshot-based, non-selectable text, poor quality

## Architecture

### File Structure
```
src/services/pdf/
├── pdfGenerator.ts    # Main PDF generation logic
├── pdfStyles.ts       # Styling constants and configuration
└── pdfUtils.ts        # Helper functions
```

## PDF Structure

### 1. Company Header
- Company name (bold, primary color)
- CIN, GSTIN, PAN
- Address and contact information
- Horizontal divider line

### 2. BOQ Header
- Quotation title
- Date and version (right-aligned)
- Customer information:
  - Client name
  - Project detail
  - Location
  - Sales person
  - Subject

### 3. Greeting Message
Standard professional greeting text

### 4. BOQ Table
**Columns:**
1. Sr. No. (12mm)
2. Item (30mm)
3. Description (75mm) - **Can be very long**
4. Qty (15mm)
5. Unit (18mm)
6. Rate (23mm)
7. GST (12mm)
8. GST Amount (23mm)
9. Rate Incl. Taxes (25mm)
10. Amount (27mm)

**Features:**
- Repeated headers on each page
- Auto-pagination with `pageBreak: 'auto'`
- Row integrity with `rowPageBreak: 'avoid'`
- Alternate row colors for readability
- Indian currency formatting
- Professional typography (Helvetica)

### 5. Summary Section
- Subtotal
- Total GST
- Grand Total (bold, primary color)

### 6. Terms & Conditions
- Numbered list
- Auto-pagination if terms exceed space
- Professional formatting

### 7. Footer
- Company footer text
- Page numbers (centered)
- Repeated on all pages

## Configuration

### Page Settings (pdfStyles.ts)

```typescript
export const PDF_CONFIG = {
  orientation: 'landscape',
  unit: 'mm',
  format: 'a4',
  pageWidth: 297,    // A4 landscape
  pageHeight: 210,
  marginTop: 15,
  marginBottom: 15,
  marginLeft: 10,
  marginRight: 10,
};
```

### Colors

```typescript
export const COLORS = {
  primary: [0, 54, 97],        // Dark blue
  primaryLight: [14, 165, 233],
  text: [50, 50, 50],
  textLight: [100, 100, 100],
  border: [200, 200, 200],
  background: [245, 245, 245],
  white: [255, 255, 255],
};
```

### Font Sizes

```typescript
export const FONTS = {
  title: 16,
  subtitle: 12,
  heading: 11,
  body: 9,
  small: 8,
  tiny: 7,
};
```

## Usage

### Basic Generation

```typescript
import { generateBoqPdf } from './services/pdf/pdfGenerator';
import { companyConfig } from './data/company';

const boqData = {
  header: {
    clientName: 'ABC Corp',
    date: '2026-09-24',
    projectDetail: 'Conference Room',
    salesPerson: 'John Doe',
    location: 'Delhi',
    version: 'v1.0',
    subject: 'AV System Quotation',
  },
  items: [
    // BOQ items array
  ],
};

await generateBoqPdf(boqData, companyConfig);
```

### Filename Generation

PDFs are automatically saved with descriptive filenames:

**Format:** `BOQ_[ClientName]_[ProjectName]_[Date].pdf`

**Example:** `BOQ_ABC_Corp_Conference_Room_2026-09-24.pdf`

## Pagination Logic

### Table Pagination

```typescript
autoTable(doc, {
  head: [columns],
  body: rows,
  startY: startY,
  
  // Auto-pagination settings
  pageBreak: 'auto',           // Automatically add pages
  rowPageBreak: 'avoid',       // Don't split rows
  showHead: 'everyPage',       // Repeat headers
  
  // Margins preserved on all pages
  margin: {
    top: 15,
    bottom: 15,
    left: 10,
    right: 10,
  },
});
```

### Terms & Conditions Pagination

```typescript
terms.forEach((term, index) => {
  const lines = doc.splitTextToSize(`${index + 1}. ${term}`, maxWidth);
  
  // Check if we need a new page
  if (y + (lines.length * 4) > pageHeight - marginBottom - 15) {
    doc.addPage();
    y = marginTop + 10;
  }
  
  // Add term lines
});
```

## Handling Long Descriptions

### Problem
Product descriptions can be hundreds of characters long (e.g., technical specifications).

### Solution
```typescript
columnStyles: {
  2: { 
    cellWidth: 75,        // Fixed width
    halign: 'left',       // Left-aligned
    overflow: 'linebreak', // Auto line break
    cellWidth: 'wrap',    // Wrap text
  },
}
```

**Result:** Long descriptions automatically wrap within the cell and expand the row height as needed.

## Testing Recommendations

### Test Cases

1. **Single Item BOQ**
   - Verify header, table, summary, terms

2. **5 Items BOQ**
   - Verify table layout
   - Check calculations

3. **20+ Items BOQ**
   - Verify pagination
   - Check repeated headers
   - Ensure no row splitting

4. **Long Descriptions**
   - Use products with 500+ character descriptions
   - Verify text wrapping
   - Check row height adjustment

5. **Large Quantities**
   - Test with quantities like 305 (Cat-6 cable)
   - Verify number formatting

6. **Mixed GST Rates**
   - Test 0%, 5%, 12%, 18%, 28%
   - Verify calculations

7. **Large Totals**
   - Test with grand totals > ₹1 crore
   - Verify Indian number formatting

### Visual Inspection

Open generated PDFs and check:
- [ ] Company header is clear and professional
- [ ] Customer information is complete
- [ ] Table columns are properly aligned
- [ ] Numbers use Indian formatting (1,00,000)
- [ ] Currency has ₹ symbol
- [ ] Long descriptions don't overflow
- [ ] Headers repeat on each page
- [ ] Page numbers are correct
- [ ] Terms & conditions are readable
- [ ] Footer appears on all pages
- [ ] No overlapping text
- [ ] Professional appearance

## Common Issues & Solutions

### Issue: Text Overflowing

**Solution:** Adjust column width in `TABLE_STYLES.columnWidths`

### Issue: Page Break in Wrong Place

**Solution:** Adjust `startY` positions or use `checkAddPage()` utility

### Issue: Font Not Loading

**Solution:** jsPDF includes Helvetica by default. For custom fonts, add TTF files.

### Issue: Currency Formatting Wrong

**Solution:** Use utilities from `utils/currency.ts` which handle Indian formatting

### Issue: PDF Too Large

**Solution:** 
- Don't embed images unnecessarily
- Use standard fonts
- Compress if using images

## Performance

### Typical Generation Time
- **1-10 items:** < 500ms
- **11-50 items:** 500ms - 2s
- **51-100 items:** 2s - 5s

### Optimization Tips
1. Lazy load jsPDF only when needed
2. Show loading indicator during generation
3. Debounce PDF preview if implementing live preview
4. Consider Web Workers for large BOQs (100+ items)

## Future Enhancements

### Potential Improvements
1. **Custom Templates:** Multiple PDF templates/themes
2. **Logo Upload:** Dynamic company logo
3. **Digital Signatures:** Add signature fields
4. **Watermarks:** Draft/Final watermarks
5. **Attachments:** Embed additional documents
6. **Email Integration:** Send PDF directly via email
7. **Cloud Storage:** Save to Google Drive/Dropbox
8. **PDF Preview:** In-app preview before download
9. **Custom Colors:** Company-specific color schemes
10. **Multiple Languages:** i18n support

## Browser Compatibility

### Supported Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+
- ❌ Internet Explorer (not supported)

### Mobile Browsers
- ✅ Chrome Android
- ✅ Safari iOS
- ⚠️ Note: PDF download behavior varies by mobile browser

## Security Considerations

### Client-Side Generation
- No data leaves the browser
- No server required
- No privacy concerns
- Works offline

### Sanitization
- Text content is automatically escaped by jsPDF
- No HTML injection risk
- No XSS vulnerabilities

## Maintenance

### Updating jsPDF

```bash
npm update jspdf jspdf-autotable
```

**Check compatibility** after updates:
1. Run tests
2. Generate sample PDFs
3. Verify pagination works
4. Check visual appearance

### Debugging

Enable debug mode:
```typescript
const doc = new jsPDF({
  orientation: 'landscape',
  unit: 'mm',
  format: 'a4',
  putOnlyUsedFonts: true,
  compress: false, // Disable compression for debugging
});
```

## Resources

- [jsPDF Documentation](https://github.com/parallax/jsPDF)
- [jspdf-autotable Documentation](https://github.com/simonbengtsson/jsPDF-AutoTable)
- [PDF Specification](https://www.adobe.com/devnet/pdf/pdf_reference.html)

---

**Last Updated:** 2026-09-24  
**Version:** 1.0
