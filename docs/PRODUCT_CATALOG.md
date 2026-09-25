# Product Catalog Documentation

## Overview

The Fast BOQ Generator includes a demo product catalog with 22 products representing a typical AV/IT system installation project. This document explains how the catalog is structured and how to customize it.

## Product Data Model

```typescript
interface Product {
  id: string;              // Unique identifier (e.g., 'prod-001')
  name: string;            // Product name (e.g., '110" IFPD')
  description: string;     // Detailed specification (can be very long)
  defaultUnit: string;     // Default unit (e.g., 'Nos', 'Meter')
  defaultRate: number;     // Default unit rate in INR
  gstPercentage: number;   // Default GST percentage (0-100)
  category?: string;       // Optional category (e.g., 'Display', 'Audio')
  active: boolean;         // Whether product is active/available
}
```

## Demo Products

### Display Category
1. **110" IFPD** - ₹5,50,000 (18% GST)
2. **Retractable Display** - ₹11,000 (18% GST)

### Furniture Category
3. **Digital Podium** - ₹85,000 (18% GST)

### Computing Category
4. **Micro PC / OPS** - ₹35,000 (18% GST)

### Camera Category
5. **4K PTZ 20x Optical Zoom @60FPS** - ₹3,85,000 (18% GST)

### Audio Category
6. **Flush Mount Chairman Unit** - ₹32,900 (18% GST)
7. **Flush Mount Delegate Unit** - ₹29,900 (18% GST)
8. **Cascade Connectors** - ₹990 (18% GST)
9. **Wireless Handheld and Lapel Microphone** - ₹1,38,500 (18% GST)
10. **DSP** - ₹80,860 (18% GST)
11. **50 Watt Wall Speaker** - ₹6,760 (18% GST)

### Accessories Category
12. **Wireless Presenter** - ₹3,900 (18% GST)
13. **Other Required Cables and Accessories** - ₹45,000 (18% GST)

### Connectivity Category
14. **HDMI Extender** - ₹11,000 (18% GST)
15. **Full HD HDMI Extender over Cat-6** - ₹7,500 (18% GST)
16. **4 Port USB Extender over Cat-6** - ₹9,900 (18% GST)

### Cable Category
17. **HDMI Cable** - ₹3,900 (18% GST)
18. **USB 3.0 Booster Cable** - ₹2,500 (18% GST)
19. **Cat-6 UTP Ethernet Cable** - ₹45/meter (18% GST)

### Infrastructure Category
20. **6U Wall Mount Rack** - ₹38,500 (18% GST)

### Service Category
21. **Installation** - ₹1,50,000 (18% GST)

## File Location

```
src/data/products.ts
```

## Customizing the Catalog

### Adding a New Product

```typescript
{
  id: 'prod-023',
  name: 'New Product Name',
  description: 'Detailed product specification and features...',
  defaultUnit: 'Nos',
  defaultRate: 50000,
  gstPercentage: 18,
  category: 'Electronics',
  active: true,
}
```

### Modifying Existing Products

Edit `src/data/products.ts` and update the relevant product object.

**Example:** Change rate of HDMI Cable
```typescript
{
  id: 'prod-017',
  name: 'HDMI Cable',
  description: '...',
  defaultUnit: 'Nos',
  defaultRate: 4500,  // Changed from 3900
  gstPercentage: 18,
  category: 'Cable',
  active: true,
}
```

### Deactivating a Product

Set `active: false` to hide a product from the selector:

```typescript
{
  id: 'prod-001',
  name: '110" IFPD',
  description: '...',
  defaultUnit: 'Nos',
  defaultRate: 550000,
  gstPercentage: 18,
  category: 'Display',
  active: false,  // Product will not appear in selector
}
```

## Helper Functions

### getProductById
```typescript
const product = getProductById('prod-001');
// Returns: Product | undefined
```

### getActiveProducts
```typescript
const activeProducts = getActiveProducts();
// Returns: Product[] (only active products)
```

### searchProducts
```typescript
const results = searchProducts('hdmi');
// Returns: Product[] (searches name, description, category)
```

## Units

Supported units are defined in `src/data/units.ts`:

```typescript
export const units = [
  'Nos',
  'Meter',
  'Pair',
  'Set',
  'Feet',
  'Kg',
  'Ltr',
  'Sq Ft',
  'Sq Meter',
  'Box',
  'Unit',
  'Lot',
  'Project',
] as const;
```

### Adding New Units

Edit `src/data/units.ts`:

```typescript
export const units = [
  // ... existing units
  'Roll',
  'Bundle',
  'Piece',
] as const;
```

## Product Descriptions

### Best Practices

1. **Be Detailed:** Include specifications, features, dimensions
2. **Use Line Breaks:** Descriptions can be multi-line
3. **Include Key Features:** Highlight important capabilities
4. **Mention Inclusions:** List what's included in the package
5. **Keep Professional:** Use proper grammar and formatting

### Example Good Description

```typescript
description: 'Professional 4K UHD PTZ camera with 20x optical zoom, ' +
  '60fps frame rate, wide dynamic range (WDR), low-light performance ' +
  '(0.05 Lux), 355° pan and 120° tilt range, multiple video outputs ' +
  '(HDMI, SDI, IP), and PoE+ support. Includes remote control, mounting ' +
  'bracket, and cables.'
```

### Example Poor Description

```typescript
description: 'Camera'  // Too brief, not helpful
```

## GST Rates

Common GST rates in India:
- **0%** - Basic necessities
- **5%** - Essential goods
- **12%** - Standard goods
- **18%** - Most products (default)
- **28%** - Luxury/sin goods

## Categories

Categories help organize products in the UI:

```typescript
category?: 'Display' | 'Audio' | 'Camera' | 'Computing' | 
           'Connectivity' | 'Cable' | 'Infrastructure' | 
           'Furniture' | 'Service' | 'Accessories'
```

Categories are optional but recommended for better UX.

## Migration to Database

### Current Architecture
Products are defined in a TypeScript file for simplicity.

### Future Backend Integration

When adding a backend, you can easily migrate:

**Step 1:** Create API endpoints
```typescript
GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

**Step 2:** Update data layer
```typescript
// Before (static)
import { products } from '../data/products';

// After (API)
const { data: products } = await fetch('/api/products');
```

**Step 3:** Add loading states
```typescript
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchProducts();
}, []);
```

**Component interfaces remain the same!**

## Product Management UI (Future)

For a production system, consider adding:

1. **Admin Panel**
   - CRUD operations for products
   - Bulk import/export
   - Product search/filter

2. **Categories Management**
   - Add/edit/delete categories
   - Category hierarchy

3. **Pricing Management**
   - Price history
   - Bulk price updates
   - Discount management

4. **Inventory Integration**
   - Stock levels
   - Availability status

## Importing Products

### From CSV

Create a migration script:

```typescript
import { parse } from 'csv-parse/sync';
import fs from 'fs';

const csv = fs.readFileSync('products.csv', 'utf-8');
const records = parse(csv, { columns: true });

const products = records.map((row, index) => ({
  id: `prod-${String(index + 1).padStart(3, '0')}`,
  name: row.name,
  description: row.description,
  defaultUnit: row.unit,
  defaultRate: parseFloat(row.rate),
  gstPercentage: parseFloat(row.gst),
  category: row.category,
  active: true,
}));

fs.writeFileSync(
  'src/data/products.ts',
  `export const products = ${JSON.stringify(products, null, 2)};`
);
```

### From Excel

Use libraries like `xlsx` or `exceljs`:

```typescript
import * as XLSX from 'xlsx';

const workbook = XLSX.readFile('products.xlsx');
const worksheet = workbook.Sheets['Products'];
const data = XLSX.utils.sheet_to_json(worksheet);

// Convert to Product[] format
```

## Testing Product Changes

After modifying the product catalog:

1. **Run type check:** `npm run type-check`
2. **Start dev server:** `npm run dev`
3. **Test product selector:** Search and select products
4. **Test calculations:** Verify rates and GST
5. **Generate PDF:** Check descriptions render correctly

## Best Practices

### DO ✅
- Keep product IDs unique and sequential
- Write detailed descriptions
- Use appropriate categories
- Set realistic rates
- Test after changes
- Version control product data

### DON'T ❌
- Hardcode products in components
- Use duplicate IDs
- Leave descriptions empty
- Use arbitrary GST rates
- Forget to set `active: true`
- Store sensitive pricing data in public repos

## Backup & Version Control

### Git
```bash
git add src/data/products.ts
git commit -m "Updated product catalog"
```

### Manual Backup
Keep periodic backups of `products.ts` before major changes.

---

**Last Updated:** 2026-09-24  
**Version:** 1.0
