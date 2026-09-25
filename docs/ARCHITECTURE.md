# Fast BOQ Generator - Architecture Document

## 1. Architecture Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         React App                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Layout    │  │     Forms    │  │  BOQ Items   │      │
│  │ Components  │  │  Components  │  │  Components  │      │
│  └─────────────┘  └──────────────┘  └──────────────┘      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    State    │  │     Hooks    │  │   Services   │      │
│  │ Management  │  │              │  │   (PDF)      │      │
│  └─────────────┘  └──────────────┘  └──────────────┘      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Data     │  │   Utilities  │  │   Storage    │      │
│  │   (Static)  │  │ (Calc/Format)│  │(localStorage)│      │
│  └─────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Technology Stack

**Core Framework:**
- React 18.2 (with strict mode)
- TypeScript 5.2 (strict mode enabled)
- Vite 5.2 (build tool)

**UI Framework:**
- Tailwind CSS 3.4 (utility-first styling)
- Custom design tokens

**PDF Generation:**
- jsPDF 2.5.1 (core PDF library)
- jspdf-autotable 3.8.2 (table generation with pagination)

**Utilities:**
- date-fns 3.3.1 (date manipulation)
- clsx 2.1.0 (conditional class names)

**Testing:**
- Vitest 1.4 (unit/component testing)
- @testing-library/react 14.2 (React component testing)
- jsdom 24.0 (DOM environment)

**Development Tools:**
- ESLint 8.57 (code linting)
- TypeScript ESLint (TS linting)
- PostCSS + Autoprefixer (CSS processing)

### 1.3 Design Decisions

**Why jsPDF + jspdf-autotable?**
- Lightweight client-side solution (no server required)
- Excellent multi-page table support with auto-pagination
- Repeated headers on each page
- Selectable text in PDF (not screenshot-based)
- Mature, well-documented library
- Good handling of long content
- Landscape orientation support
- A4 format support

**Why React State over Redux?**
- Application state is relatively simple
- No need for global state management overhead
- useReducer for complex form state
- Context only where necessary (theme, if needed)
- Easier to maintain and understand

**Why localStorage over Backend (v1)?**
- Faster time to production
- No server infrastructure required
- Instant draft persistence
- Easy to migrate to API later
- Suitable for single-user desktop workflow

**Why Tailwind CSS?**
- Rapid UI development
- Consistent design system
- Small production bundle (tree-shaking)
- Easy responsive design
- Professional appearance without custom CSS
- Good developer experience

## 2. Project Structure

```
fast-boq-generator/
├── public/                    # Static assets
│   └── logo.png              # Company logo (placeholder)
├── src/
│   ├── components/           # React components
│   │   ├── layout/          # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Container.tsx
│   │   ├── forms/           # Form components
│   │   │   ├── CustomerInfoForm.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   └── FormField.tsx
│   │   ├── products/        # Product selection
│   │   │   ├── ProductSelector.tsx
│   │   │   └── ProductBuilderForm.tsx
│   │   ├── boq/             # BOQ management
│   │   │   ├── BoqItemList.tsx
│   │   │   ├── BoqItemRow.tsx
│   │   │   ├── BoqSummary.tsx
│   │   │   └── BoqActions.tsx
│   │   ├── common/          # Reusable components
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── EmptyState.tsx
│   │   └── pdf/             # PDF preview (if needed)
│   │       └── PdfPreview.tsx
│   ├── data/                # Static data
│   │   ├── products.ts      # Product catalog
│   │   ├── units.ts         # Unit types
│   │   ├── company.ts       # Company config
│   │   └── terms.ts         # Terms & conditions
│   ├── hooks/               # Custom React hooks
│   │   ├── useBoqState.ts   # Main BOQ state management
│   │   ├── useLocalStorage.ts # localStorage hook
│   │   ├── useDebouncedValue.ts # Debounce hook
│   │   └── useCalculations.ts # Calculation logic
│   ├── types/               # TypeScript types
│   │   ├── product.ts       # Product types
│   │   ├── boq.ts          # BOQ types
│   │   └── company.ts      # Company types
│   ├── utils/               # Utility functions
│   │   ├── calculations.ts  # Pure calculation functions
│   │   ├── currency.ts     # Currency formatting
│   │   ├── validation.ts   # Validation functions
│   │   ├── storage.ts      # localStorage utilities
│   │   └── date.ts         # Date utilities
│   ├── services/            # Service layer
│   │   └── pdf/
│   │       ├── pdfGenerator.ts    # Main PDF generation
│   │       ├── pdfStyles.ts       # PDF styling constants
│   │       └── pdfUtils.ts        # PDF helper functions
│   ├── tests/               # Test files
│   │   ├── setup.ts         # Test setup
│   │   ├── calculations.test.ts
│   │   ├── currency.test.ts
│   │   └── components/
│   │       └── *.test.tsx
│   ├── App.tsx              # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── docs/                    # Documentation
│   ├── REQUIREMENTS.md
│   ├── ARCHITECTURE.md (this file)
│   ├── PDF_GENERATION.md
│   ├── TESTING.md
│   └── PRODUCT_CATALOG.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 3. Data Models

### 3.1 Core Types

```typescript
// types/product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  defaultUnit: string;
  defaultRate: number;
  gstPercentage: number;
  category?: string;
  active: boolean;
}

// types/boq.ts
export interface BoqHeader {
  clientName: string;
  date: string; // ISO format
  projectDetail: string;
  salesPerson: string;
  location: string;
  version: string;
  subject: string;
}

export interface BoqItem {
  id: string;
  productId: string;
  itemName: string;
  description: string;
  quantity: number;
  unit: string;
  unitRate: number;
  gstPercentage: number;
  gstAmount: number;
  rateIncludingTax: number;
  totalAmount: number;
}

export interface BoqData {
  header: BoqHeader;
  items: BoqItem[];
}

export interface BoqSummary {
  itemCount: number;
  subtotal: number;
  totalGst: number;
  grandTotal: number;
}

// types/company.ts
export interface CompanyConfig {
  name: string;
  logo?: string;
  cin: string;
  gstin: string;
  pan: string;
  address: string;
  contact: string;
  email?: string;
  website?: string;
  footer: string;
  termsAndConditions: string[];
}
```

## 4. State Management

### 4.1 State Architecture

**Main State Container:** `useBoqState` custom hook

```typescript
interface BoqState {
  header: BoqHeader;
  items: BoqItem[];
  currentItem: Partial<BoqItem> | null;
  isEditing: boolean;
  editingId: string | null;
}

type BoqAction =
  | { type: 'UPDATE_HEADER'; payload: Partial<BoqHeader> }
  | { type: 'ADD_ITEM'; payload: BoqItem }
  | { type: 'UPDATE_ITEM'; payload: { id: string; data: Partial<BoqItem> } }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'REORDER_ITEMS'; payload: BoqItem[] }
  | { type: 'START_EDIT'; payload: string }
  | { type: 'CANCEL_EDIT' }
  | { type: 'RESET' }
  | { type: 'LOAD_DRAFT'; payload: BoqData };
```

### 4.2 State Flow

```
User Action
    ↓
Component Event Handler
    ↓
Dispatch Action
    ↓
Reducer Updates State
    ↓
Calculations Triggered (if needed)
    ↓
React Re-renders
    ↓
localStorage Updated (debounced)
```

## 5. Component Architecture

### 5.1 Component Hierarchy

```
App
├── Navbar
│   ├── Logo
│   ├── Title
│   └── Actions (Reset, Generate)
├── Container
│   ├── CustomerInfoForm
│   │   ├── FormField (Client Name)
│   │   ├── FormField (Project Detail)
│   │   ├── FormField (Location)
│   │   ├── FormField (Sales Person)
│   │   ├── FormField (Date)
│   │   ├── FormField (Version)
│   │   └── FormField (Subject)
│   ├── ProductBuilderForm
│   │   ├── ProductSelector
│   │   ├── Input (Quantity)
│   │   ├── Select (Unit)
│   │   ├── Input (Rate - readonly/editable)
│   │   ├── Select (GST)
│   │   └── Button (Add/Update)
│   ├── BoqItemList
│   │   ├── EmptyState (if no items)
│   │   └── BoqItemRow[] (for each item)
│   │       ├── Item details
│   │       ├── Expandable description
│   │       └── Actions (Edit, Delete, Duplicate)
│   └── BoqSummary
│       ├── Item count
│       ├── Subtotal
│       ├── Total GST
│       ├── Grand Total
│       └── Generate Button
└── Toast (notifications)
```

### 5.2 Component Design Patterns

**Presentation/Container Pattern:**
- Smart components handle state
- Dumb components handle presentation
- Props are typed and validated

**Compound Components:**
- FormField = Label + Input + Error
- Card = Header + Body + Footer

**Render Props / Hooks:**
- useBoqState for state management
- useCalculations for derived values
- useLocalStorage for persistence

## 6. Calculation Engine

### 6.1 Calculation Functions (Pure)

```typescript
// utils/calculations.ts

// All calculations use proper decimal arithmetic
// Returns numbers in smallest currency unit (paise) internally
// Formatted for display externally

export function calculateGstAmount(
  unitRate: number,
  gstPercentage: number
): number {
  return (unitRate * gstPercentage) / 100;
}

export function calculateRateIncludingTax(
  unitRate: number,
  gstAmount: number
): number {
  return unitRate + gstAmount;
}

export function calculateItemTotal(
  rateIncludingTax: number,
  quantity: number
): number {
  return rateIncludingTax * quantity;
}

export function calculateBoqSummary(items: BoqItem[]): BoqSummary {
  const itemCount = items.length;
  
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitRate * item.quantity,
    0
  );
  
  const totalGst = items.reduce(
    (sum, item) => sum + item.gstAmount * item.quantity,
    0
  );
  
  const grandTotal = items.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );
  
  return { itemCount, subtotal, totalGst, grandTotal };
}

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
```

### 6.2 Currency Formatting

```typescript
// utils/currency.ts

const indianCurrencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(amount: number): string {
  return indianCurrencyFormatter.format(amount);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
```

## 7. PDF Generation Architecture

### 7.1 PDF Technology Choice

**Selected: jsPDF + jspdf-autotable**

**Rationale:**
- Pure client-side (no server required)
- Excellent pagination support
- Auto-repeat headers on each page
- Handles long tables automatically
- A4 landscape support
- Proper text rendering (not screenshot)
- Easy to control typography and spacing
- Active maintenance

**Alternative Considered:**
- @react-pdf/renderer: Heavier, JSX-based, harder to control pagination
- Puppeteer/Playwright: Requires server, overkill for this use case
- html2canvas + jsPDF: Screenshot-based, not selectable text

### 7.2 PDF Structure

```typescript
// services/pdf/pdfGenerator.ts

export async function generateBoqPdf(
  boqData: BoqData,
  companyConfig: CompanyConfig
): Promise<void> {
  // 1. Create jsPDF instance (A4 landscape)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });
  
  // 2. Add company header
  addCompanyHeader(doc, companyConfig);
  
  // 3. Add BOQ header (client info)
  addBoqHeader(doc, boqData.header);
  
  // 4. Add greeting message
  addGreeting(doc);
  
  // 5. Generate BOQ table with auto-pagination
  addBoqTable(doc, boqData.items);
  
  // 6. Add summary section
  addSummary(doc, boqData.items);
  
  // 7. Add terms & conditions
  addTermsAndConditions(doc, companyConfig.termsAndConditions);
  
  // 8. Add footer on all pages
  addFooter(doc, companyConfig);
  
  // 9. Save with proper filename
  const filename = generateFilename(boqData.header);
  doc.save(filename);
}
```

### 7.3 Table Pagination Strategy

```typescript
// jspdf-autotable configuration
autoTable(doc, {
  head: [columns],
  body: rows,
  startY: startY,
  
  // Pagination settings
  margin: { top: 20, bottom: 20, left: 10, right: 10 },
  pageBreak: 'auto',
  rowPageBreak: 'avoid', // Don't split rows
  
  // Repeat header on each page
  showHead: 'everyPage',
  
  // Column widths (landscape A4 = 297mm - 20mm margins = 277mm)
  columnStyles: {
    0: { cellWidth: 15 },  // Sr. No.
    1: { cellWidth: 35 },  // Item
    2: { cellWidth: 70 },  // Description
    3: { cellWidth: 20 },  // Qty
    4: { cellWidth: 20 },  // Unit
    5: { cellWidth: 25 },  // Rate
    6: { cellWidth: 15 },  // GST
    7: { cellWidth: 25 },  // GST Amt
    8: { cellWidth: 25 },  // Rate incl.
    9: { cellWidth: 27 },  // Amount
  },
  
  // Styling
  styles: {
    fontSize: 8,
    cellPadding: 2,
    overflow: 'linebreak',
    cellWidth: 'wrap',
  },
  
  headStyles: {
    fillColor: [0, 54, 97], // Dark blue
    textColor: 255,
    fontSize: 9,
    fontStyle: 'bold',
    halign: 'center',
  },
  
  bodyStyles: {
    textColor: 50,
  },
  
  alternateRowStyles: {
    fillColor: [245, 245, 245],
  },
});
```

## 8. Validation Architecture

### 8.1 Validation Strategy

**Two-level validation:**
1. Field-level (real-time as user types)
2. Form-level (on submit)

```typescript
// utils/validation.ts

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateBoqHeader(header: Partial<BoqHeader>): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (!header.clientName?.trim()) {
    errors.clientName = 'Client name is required';
  }
  
  if (!header.projectDetail?.trim()) {
    errors.projectDetail = 'Project detail is required';
  }
  
  if (!header.location?.trim()) {
    errors.location = 'Location is required';
  }
  
  if (!header.salesPerson?.trim()) {
    errors.salesPerson = 'Sales person is required';
  }
  
  if (!header.date) {
    errors.date = 'Date is required';
  }
  
  if (!header.subject?.trim()) {
    errors.subject = 'Subject is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateBoqItem(item: Partial<BoqItem>): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (!item.productId) {
    errors.product = 'Please select a product';
  }
  
  if (!item.quantity || item.quantity <= 0) {
    errors.quantity = 'Quantity must be greater than 0';
  }
  
  if (!item.unit) {
    errors.unit = 'Unit is required';
  }
  
  if (item.unitRate === undefined || item.unitRate < 0) {
    errors.unitRate = 'Rate must be 0 or greater';
  }
  
  if (item.gstPercentage === undefined || item.gstPercentage < 0) {
    errors.gstPercentage = 'GST must be 0 or greater';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function canGeneratePdf(boqData: BoqData): ValidationResult {
  const errors: Record<string, string> = {};
  
  const headerValidation = validateBoqHeader(boqData.header);
  if (!headerValidation.isValid) {
    errors.header = 'Please complete customer information';
  }
  
  if (boqData.items.length === 0) {
    errors.items = 'Please add at least one item';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
```

## 9. Local Storage Architecture

### 9.1 Storage Strategy

```typescript
// utils/storage.ts

const STORAGE_KEYS = {
  DRAFT_HEADER: 'boq_draft_header',
  DRAFT_ITEMS: 'boq_draft_items',
  DRAFT_TIMESTAMP: 'boq_draft_timestamp',
} as const;

export function saveDraft(boqData: BoqData): void {
  try {
    localStorage.setItem(
      STORAGE_KEYS.DRAFT_HEADER,
      JSON.stringify(boqData.header)
    );
    localStorage.setItem(
      STORAGE_KEYS.DRAFT_ITEMS,
      JSON.stringify(boqData.items)
    );
    localStorage.setItem(
      STORAGE_KEYS.DRAFT_TIMESTAMP,
      new Date().toISOString()
    );
  } catch (error) {
    console.error('Failed to save draft:', error);
  }
}

export function loadDraft(): BoqData | null {
  try {
    const headerJson = localStorage.getItem(STORAGE_KEYS.DRAFT_HEADER);
    const itemsJson = localStorage.getItem(STORAGE_KEYS.DRAFT_ITEMS);
    
    if (!headerJson || !itemsJson) return null;
    
    return {
      header: JSON.parse(headerJson),
      items: JSON.parse(itemsJson),
    };
  } catch (error) {
    console.error('Failed to load draft:', error);
    return null;
  }
}

export function clearDraft(): void {
  localStorage.removeItem(STORAGE_KEYS.DRAFT_HEADER);
  localStorage.removeItem(STORAGE_KEYS.DRAFT_ITEMS);
  localStorage.removeItem(STORAGE_KEYS.DRAFT_TIMESTAMP);
}

export function getDraftTimestamp(): Date | null {
  const timestamp = localStorage.getItem(STORAGE_KEYS.DRAFT_TIMESTAMP);
  return timestamp ? new Date(timestamp) : null;
}
```

### 9.2 Auto-save Strategy

```typescript
// hooks/useAutoSave.ts

export function useAutoSave(
  boqData: BoqData,
  delay: number = 2000
) {
  const debouncedData = useDebouncedValue(boqData, delay);
  
  useEffect(() => {
    if (debouncedData) {
      saveDraft(debouncedData);
      // Show toast: "Draft saved"
    }
  }, [debouncedData]);
}
```

## 10. Performance Optimization

### 10.1 Optimization Strategies

**Memoization:**
```typescript
// Memoize expensive calculations
const summary = useMemo(
  () => calculateBoqSummary(items),
  [items]
);

// Memoize formatted currency
const formattedTotal = useMemo(
  () => formatCurrency(summary.grandTotal),
  [summary.grandTotal]
);
```

**Debouncing:**
```typescript
// Debounce localStorage writes
const debouncedSave = useDebouncedCallback(saveDraft, 2000);

// Debounce search/filter
const debouncedSearch = useDebouncedValue(searchTerm, 300);
```

**Lazy Loading:**
```typescript
// Lazy load PDF library only when needed
const jsPDF = lazy(() => import('jspdf'));
const autoTable = lazy(() => import('jspdf-autotable'));
```

**Virtual Scrolling (if needed for 100+ items):**
- Consider react-window for large item lists
- Not implemented in v1 unless performance issues observed

## 11. Error Handling

### 11.1 Error Boundaries

```typescript
// components/common/ErrorBoundary.tsx
class ErrorBoundary extends React.Component<Props, State> {
  // Catch React errors
  // Show fallback UI
  // Log errors
}
```

### 11.2 Try-Catch Blocks

```typescript
// PDF generation
try {
  await generateBoqPdf(boqData, companyConfig);
  showToast('PDF generated successfully', 'success');
} catch (error) {
  console.error('PDF generation failed:', error);
  showToast('Failed to generate PDF. Please try again.', 'error');
}

// localStorage
try {
  saveDraft(boqData);
} catch (error) {
  console.error('Failed to save draft:', error);
  // Silently fail, don't block user
}
```

## 12. Testing Architecture

### 12.1 Test Structure

```
src/tests/
├── setup.ts                    # Vitest setup
├── utils/
│   ├── calculations.test.ts    # Pure function tests
│   ├── currency.test.ts
│   ├── validation.test.ts
│   └── storage.test.ts
├── hooks/
│   ├── useBoqState.test.ts
│   └── useCalculations.test.ts
└── components/
    ├── ProductSelector.test.tsx
    ├── BoqItemRow.test.tsx
    └── BoqSummary.test.tsx
```

### 12.2 Test Strategy

**Unit Tests (utils):**
- 100% coverage for calculations
- Test edge cases (zero, negative, large numbers)
- Test currency formatting
- Test validation logic

**Component Tests:**
- Test user interactions
- Test prop changes
- Test error states
- Test loading states

**Integration Test:**
- Full workflow test
- Add multiple items
- Edit item
- Delete item
- Generate PDF

## 13. Responsive Design Strategy

### 13.1 Breakpoints

```javascript
// tailwind.config.js
theme: {
  screens: {
    'sm': '640px',   // Mobile landscape
    'md': '768px',   // Tablet
    'lg': '1024px',  // Desktop
    'xl': '1280px',  // Large desktop
  }
}
```

### 13.2 Layout Strategy

**Desktop (lg+):**
- Two-column layout
- Form on left, summary on right
- Wide table view

**Tablet (md):**
- Single column
- Stacked sections
- Horizontal scroll for table if needed

**Mobile (sm):**
- Single column
- Card-based item view (not table)
- Touch-friendly buttons
- Collapsible sections

## 14. Accessibility Features

### 14.1 WCAG 2.1 Compliance

**Keyboard Navigation:**
- Tab through all interactive elements
- Enter/Space to activate buttons
- Arrow keys for dropdowns
- Escape to close modals

**Screen Reader Support:**
- Semantic HTML (button, input, label, etc.)
- ARIA labels where needed
- ARIA live regions for notifications
- Proper heading hierarchy

**Visual:**
- Sufficient color contrast (4.5:1 minimum)
- Focus indicators
- No color-only information
- Resizable text

## 15. Future Migration Paths

### 15.1 Backend Integration

**Current Architecture Supports:**

```typescript
// Current: Static data
import { products } from '@/data/products';

// Future: API call
const { data: products } = await fetch('/api/products');
```

**Changes Required:**
- Add axios/fetch layer
- Add loading states
- Add error handling
- Add authentication
- Keep same component interfaces

### 15.2 Database Integration

**Current localStorage → Future Database:**
- Same data models
- Swap storage layer
- Add sync indicators
- Add conflict resolution
- Add version control

### 15.3 Multi-tenancy

**Architecture supports:**
- Company config already isolated
- Easy to add company ID to all data
- Easy to add user context
- Product catalog per company

## 16. Security Considerations

### 16.1 Current Security

**Client-side Only:**
- No authentication required (v1)
- No sensitive data transmission
- localStorage is domain-isolated
- XSS prevention via React (escaped by default)

**Input Sanitization:**
- TypeScript type checking
- Validation before processing
- No eval() or dangerous operations
- No innerHTML usage

### 16.2 Future Security

**When adding backend:**
- JWT authentication
- HTTPS only
- CORS configuration
- Rate limiting
- Input validation server-side
- SQL injection prevention
- Role-based access control

## 17. Deployment Architecture

### 17.1 Build Process

```bash
npm run build
# → Creates dist/ folder
# → Optimized, minified, tree-shaken
# → Assets hashed for cache busting
```

### 17.2 Deployment Targets

**Static Hosting (v1):**
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps

**Requirements:**
- Serve index.html for all routes
- HTTPS enabled
- Compression enabled (gzip/brotli)

## 18. Monitoring & Logging

### 18.1 Production Logging

```typescript
// Structured logging
function logError(error: Error, context: Record<string, unknown>) {
  console.error({
    timestamp: new Date().toISOString(),
    error: error.message,
    stack: error.stack,
    context,
  });
  
  // Future: Send to monitoring service (Sentry, LogRocket)
}
```

### 18.2 Performance Monitoring

```typescript
// Performance marks
performance.mark('pdf-generation-start');
await generateBoqPdf();
performance.mark('pdf-generation-end');
performance.measure('pdf-generation', 'pdf-generation-start', 'pdf-generation-end');
```

## 19. Documentation Strategy

### 19.1 Code Documentation

**JSDoc for public APIs:**
```typescript
/**
 * Calculates GST amount based on unit rate and GST percentage
 * @param unitRate - The base unit rate in INR
 * @param gstPercentage - GST percentage (e.g., 18 for 18%)
 * @returns GST amount in INR
 */
export function calculateGstAmount(
  unitRate: number,
  gstPercentage: number
): number {
  return (unitRate * gstPercentage) / 100;
}
```

### 19.2 User Documentation

**To be created:**
- README.md (quick start)
- USER_GUIDE.md (how to use)
- ADMIN_GUIDE.md (how to customize)
- DEPLOYMENT.md (how to deploy)

## 20. Conclusion

This architecture provides:

✅ **Scalability:** Can handle 1-100+ items without performance issues  
✅ **Maintainability:** Clear separation of concerns, typed interfaces  
✅ **Testability:** Pure functions, component isolation  
✅ **Extensibility:** Easy to add features without refactoring  
✅ **Performance:** Optimized rendering, efficient calculations  
✅ **Professional:** Production-grade code quality  
✅ **Future-proof:** Easy migration to backend/database  

---

**Document Version:** 1.0  
**Last Updated:** 2026-09-24  
**Status:** Final  
**Author:** Principal Software Engineer
