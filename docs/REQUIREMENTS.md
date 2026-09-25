# Fast BOQ Generator - Requirements Document

## 1. Project Overview

**Application Name:** Fast BOQ Generator  
**Purpose:** Professional Bill of Quantities (BOQ) / Quotation Generator for rapid generation of accurate, professional quotations with automatic calculations and PDF export.

**Target Users:** Sales personnel, project managers, business development teams who need to quickly create professional quotations.

## 2. Functional Requirements

### 2.1 Customer & Project Information Management

**Required Fields:**
- Client Name (text, required)
- Project Detail (text, required)
- Location (text, required)
- Sales Person (text, required)
- Date (date, required, default: today)
- Version (text, default: "v1.0")
- Subject (text, required)

**Validation:**
- All required fields must be filled before PDF generation
- Date must be valid
- Fields should persist in localStorage for draft recovery

### 2.2 Product Catalog

**Product Data Model:**
```typescript
interface Product {
  id: string;
  name: string;
  description: string; // Can be very long, multi-line
  defaultUnit: string;
  defaultRate: number;
  gstPercentage: number;
  category?: string;
  active: boolean;
}
```

**Initial Demo Products (from reference document):**
1. 110" IFPD - ₹5,50,000, 18% GST
2. Retractable Display - ₹11,000, 18% GST
3. Digital Podium - ₹85,000, 18% GST
4. Micro PC / OPS - ₹35,000, 18% GST
5. 4K PTZ 20x Optical Zoom @60FPS - ₹3,85,000, 18% GST
6. Flush Mount Chairman Unit - ₹32,900, 18% GST
7. Flush Mount Delegate Unit - ₹29,900, 18% GST
8. Cascade Connectors - ₹990, 18% GST
9. Wireless Handheld and Lapel Microphone - ₹1,38,500, 18% GST
10. Digital Conference Control Unit - ₹4,49,000, 18% GST
11. DSP - ₹80,860, 18% GST
12. 50 Watt Wall Speaker - ₹6,760, 18% GST
13. Wireless Presenter - ₹3,900, 18% GST
14. HDMI Extender - ₹11,000, 18% GST
15. Full HD HDMI Extender over Cat-6 - ₹7,500, 18% GST
16. 4 Port USB Extender over Cat-6 - ₹9,900, 18% GST
17. HDMI Cable - ₹3,900, 18% GST
18. USB 3.0 Booster Cable - ₹2,500, 18% GST
19. Cat-6 UTP Ethernet Cable - ₹45, 18% GST (per meter)
20. 6U Wall Mount Rack - ₹38,500, 18% GST
21. Other Required Cables and Accessories - ₹45,000, 18% GST
22. Installation - ₹1,50,000, 18% GST

### 2.3 Unit Types

**Supported Units:**
- Nos (Numbers/Pieces)
- Meter
- Pair
- Set
- Feet
- Kg (Kilogram)
- Ltr (Liter)
- Sq Ft (Square Feet)
- Sq Meter (Square Meter)
- Box
- Unit

### 2.4 BOQ Item Management

**BOQ Item Data Model:**
```typescript
interface BoqItem {
  id: string;
  productId: string;
  itemName: string;
  description: string;
  quantity: number;
  unit: string;
  unitRate: number;
  gstPercentage: number;
  gstAmount: number; // calculated
  rateIncludingTax: number; // calculated
  totalAmount: number; // calculated
}
```

**Capabilities:**
- Add new item
- Edit existing item
- Delete item
- Duplicate item
- Reorder items (drag-and-drop or move up/down)
- View/expand full description
- Override unit rate for specific item
- Override GST for specific item
- Modify quantity

**Validation:**
- Quantity must be > 0
- Unit rate must be >= 0
- GST must be >= 0
- Product must be selected
- At least one item required for PDF generation

### 2.5 Automatic Calculations

**Calculation Rules:**

For each item:
```
gstAmount = unitRate × (gstPercentage / 100)
rateIncludingTax = unitRate + gstAmount
totalAmount = rateIncludingTax × quantity
```

**Example 1:**
- Rate: ₹5,50,000
- GST: 18%
- Qty: 1
- GST Amount: ₹99,000
- Rate Including Tax: ₹6,49,000
- Total: ₹6,49,000

**Example 2:**
- Rate: ₹11,000
- GST: 18%
- Qty: 5
- GST Amount: ₹1,980
- Rate Including Tax: ₹12,980
- Total: ₹64,900

**Summary Calculations:**
```
subtotal = sum of all (unitRate × quantity)
totalGst = sum of all (gstAmount × quantity)
grandTotal = sum of all totalAmount
```

**Currency Formatting:**
- Indian numbering: 1,00,000 not 100,000
- Two decimal places for precision
- Currency symbol: ₹
- Format: Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })

### 2.6 Product Selection UX

**Requirements:**
- Searchable dropdown (not basic HTML select)
- Keyboard navigation
- Clear selection option
- Show product name prominently
- Optional category display
- Handle loading states
- Handle no-results state
- Auto-populate description, unit, rate, GST on selection

### 2.7 Draft Persistence

**localStorage Strategy:**
- Auto-save form state on changes (debounced)
- Persist: customer info, project info, BOQ items
- Restore on page reload
- Show "Draft saved" indicator
- Clear draft on successful PDF generation or manual reset

**Storage Keys:**
- `boq_draft_header`: Customer/project information
- `boq_draft_items`: Array of BOQ items
- `boq_draft_timestamp`: Last save time

### 2.8 Reset Functionality

**Behavior:**
- Clear all customer/project information
- Clear all BOQ items
- Clear product builder form
- Reset to default state
- Show confirmation if unsaved data exists
- Update localStorage

### 2.9 PDF Generation

**PDF Content Requirements:**

**Page Header:**
- Company logo (placeholder for demo)
- Company name: Promark Techsolutions Pvt. Ltd.
- Company information (CIN, GST, PAN)
- Client name, date, project detail
- Sales person, location, version
- Subject line
- Greeting message

**BOQ Table:**
- Columns: Sr. No., Item, Description, Qty, Unit, Rate, GST, GST Amount, Rate incl. Taxes, Amount
- Support long descriptions (multi-line, no truncation)
- Proper column widths
- Multi-page support with repeated headers
- No row splitting across pages (keep rows intact)
- Proper pagination

**Footer Section:**
- Subtotal (optional)
- Total GST
- Grand Total
- Terms & Conditions
- Company footer information

**PDF Technical Requirements:**
- Format: A4
- Orientation: Landscape (to accommodate wide table)
- Selectable text (not screenshot)
- Proper page margins
- Page numbering
- Professional typography
- Consistent spacing
- Indian currency formatting

**Filename:**
- Format: `BOQ_[ClientName]_[ProjectName]_[Date].pdf`
- Example: `BOQ_ABC_Technologies_Conference_Room_2026-09-24.pdf`

### 2.10 Company Configuration

**Company Data Model:**
```typescript
interface CompanyConfig {
  name: string;
  logo?: string;
  cin: string;
  gstin: string;
  pan: string;
  address: string;
  contact: string;
  footer: string;
  termsAndConditions: string[];
}
```

**Demo Values (from reference):**
- Name: Promark Techsolutions Pvt. Ltd.
- CIN: U36109PB2010PTC034337
- GST: 03AAFCP7669C1ZF
- PAN: AAFCP7669C

**Terms & Conditions (Demo):**
1. Order should be placed in company name
2. Prices include supply and installation including taxes
3. Freight extra as applicable
4. Electrical work excluded
5. Civil work excluded
6. Scaffolding excluded
7. Power points/UPS/backup power by others
8. LAN ports by others
9. Cable/speaker quantities may vary; charges based on actual
10. Other relevant terms

## 3. Non-Functional Requirements

### 3.1 Performance
- Fast initial load (< 3 seconds)
- No visible lag during typing
- Smooth item addition/removal
- PDF generation < 5 seconds for typical BOQ (< 50 items)
- Support up to 100 items without performance degradation

### 3.2 Usability
- Intuitive workflow
- Clear visual hierarchy
- Accessible keyboard navigation
- Responsive design (desktop, tablet, mobile)
- Professional business appearance
- Helpful error messages
- Loading indicators
- Empty states
- Success feedback

### 3.3 Accessibility
- Semantic HTML
- ARIA labels where appropriate
- Keyboard navigation
- Visible focus states
- Sufficient color contrast
- Screen reader friendly

### 3.4 Browser Compatibility
- Modern browsers (Chrome, Firefox, Edge, Safari)
- ES2020+ support
- No IE11 support required

### 3.5 Code Quality
- TypeScript strict mode
- No `any` types except where absolutely necessary
- Comprehensive unit tests for calculations
- Component tests for critical paths
- E2E test for complete workflow
- ESLint passing
- No console errors in production

## 4. Edge Cases & Special Scenarios

### 4.1 Data Scenarios
- Empty BOQ (no items)
- Single item BOQ
- Large BOQ (100+ items)
- Very long product descriptions (multi-paragraph)
- Duplicate products in same BOQ
- Zero GST items
- Mixed GST rates
- Large quantities (e.g., 305 meters cable)
- Decimal quantities
- Very large unit rates
- Very large total amounts

### 4.2 UI Scenarios
- Small mobile screens
- Large desktop screens
- Browser refresh during editing
- localStorage corruption
- Network issues (N/A for v1, but architecture should support)
- PDF generation failure

### 4.3 Validation Scenarios
- Missing required fields
- Invalid date
- Negative quantities
- Negative rates
- Invalid GST percentages
- No items added

## 5. Future Extensibility

**Architecture should support future addition of:**
- Backend API integration
- User authentication
- Product CRUD management
- BOQ history/search
- Customer database
- Multiple company templates
- Email/WhatsApp sharing
- Digital signatures
- Revision management
- Admin panel

**Important:** Do NOT implement these now, but ensure architecture doesn't prevent them.

## 6. Testing Requirements

### 6.1 Unit Tests
- Currency formatting
- GST calculation
- Total calculation
- Subtotal calculation
- Indian number formatting
- Validation functions
- Date formatting

### 6.2 Component Tests
- Product selector
- Item form
- Item list
- Summary display
- Customer form
- Validation messages

### 6.3 E2E Test
- Complete workflow from empty state to PDF generation
- Add multiple items
- Edit item
- Delete item
- Reset functionality
- Draft persistence

### 6.4 PDF Testing
- Visual inspection required
- Verify all data present
- Verify calculations correct
- Verify multi-page rendering
- Verify long descriptions
- Verify page breaks
- Verify header/footer on all pages

## 7. Success Criteria

**Project is production-ready when:**

1. ✅ All core functionality implemented
2. ✅ Calculations 100% accurate
3. ✅ PDF generation works reliably
4. ✅ Multi-page PDFs render correctly
5. ✅ Long descriptions don't truncate
6. ✅ Indian currency formatting correct
7. ✅ All validations work
8. ✅ Draft persistence works
9. ✅ Reset works
10. ✅ All unit tests pass
11. ✅ E2E test passes
12. ✅ TypeScript compiles with no errors
13. ✅ ESLint passes
14. ✅ No console errors
15. ✅ Responsive UI works
16. ✅ Professional appearance
17. ✅ Documentation complete
18. ✅ Build succeeds
19. ✅ Visual QA passed
20. ✅ Edge cases handled

## 8. Out of Scope (v1.0)

- User authentication
- Backend database
- Product management UI
- BOQ history/archive
- Email functionality
- Multi-company support
- Custom PDF templates
- Digital signatures
- Approval workflows
- Role-based access
- API development

---

**Document Version:** 1.0  
**Last Updated:** 2026-09-24  
**Status:** Final
