# Fast BOQ Generator 🚀

A professional Bill of Quantities (BOQ) / Quotation Generator built with React, TypeScript, and Tailwind CSS. Generate accurate, professional quotations with automatic calculations and export to PDF.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![React](https://img.shields.io/badge/React-18.2-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Core Functionality
- 📝 **Fast Data Entry** - Searchable product selector with auto-population
- 🧮 **Automatic Calculations** - GST, totals, and Indian currency formatting
- 📄 **Professional PDFs** - Multi-page support with proper pagination
- 📊 **Excel Export** - Download BOQ as formatted Excel spreadsheet
- 💾 **Draft Persistence** - Auto-save to localStorage
- 🎯 **Validation** - Comprehensive form and data validation
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

### Professional Features
- **Searchable Product Catalog** - 22 demo products with detailed specifications
- **Indian Number Formatting** - ₹1,00,000 (not ₹100,000)
- **Multiple Units** - Nos, Meter, Pair, Set, Kg, Ltr, etc.
- **Flexible GST** - 0%, 5%, 12%, 18%, 28% support
- **Long Descriptions** - Handles multi-paragraph product specifications
- **Item Management** - Add, edit, delete, duplicate items
- **Summary Dashboard** - Real-time totals and item count

### PDF Features
- ✅ A4 Landscape format
- ✅ Company branding and header
- ✅ Customer/project information
- ✅ Multi-page table with repeated headers
- ✅ Automatic pagination (no row splitting)
- ✅ Professional typography
- ✅ Terms & conditions
- ✅ Page numbering
- ✅ Selectable text (not screenshot)

### Excel Features
- ✅ Professional spreadsheet formatting
- ✅ Proper column widths and alignment
- ✅ Formatted headers with styling
- ✅ Currency formatting with Indian number system
- ✅ Border and cell styling
- ✅ Merged cells for headers where appropriate
- ✅ Same data consistency as PDF export
- ✅ Easy to edit and customize post-export

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd fast-boq-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## 📖 Usage

### Basic Workflow

1. **Enter Customer Information**
   - Client name, project detail, location
   - Sales person, date, version, subject

2. **Add Products**
   - Search and select from product catalog
   - Quantity and unit automatically populated
   - Override rate or GST if needed

3. **Review BOQ**
   - View all items with calculations
   - Edit, duplicate, or delete items
   - Check summary totals

4. **Export BOQ**
   - Click "PDF" button to download PDF
   - Click "Excel" button to download Excel spreadsheet
   - Both formats contain identical data
   - Draft is cleared after successful generation

### Demo Products

The application includes 22 demo products:
- Display: 110" IFPD, Retractable Display
- Audio: Conference units, DSP, Speakers
- Connectivity: HDMI extenders, USB extenders
- Cables: HDMI, USB, Cat-6
- Services: Installation

See [docs/PRODUCT_CATALOG.md](docs/PRODUCT_CATALOG.md) for details.

## 🏗️ Architecture

```
fast-boq-generator/
├── src/
│   ├── components/       # React components
│   │   ├── common/      # Reusable UI components
│   │   ├── layout/      # Layout components
│   │   ├── forms/       # Form components
│   │   ├── products/    # Product selection
│   │   └── boq/         # BOQ management
│   ├── data/            # Static data (products, company)
│   ├── hooks/           # Custom React hooks
│   ├── services/        # Services (PDF/Excel generation)
│   │   ├── pdf/        # PDF generation logic
│   │   ├── excel/      # Excel generation logic
│   │   └── export/     # Unified export service
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   └── tests/           # Unit tests
├── docs/                # Documentation
└── public/              # Static assets
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed architecture.

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with UI
npm test:ui

# Type checking
npm run type-check

# Linting
npm run lint
```

**Test Coverage:**
- ✅ 35+ unit tests for calculations and currency formatting
- ✅ TypeScript strict mode
- ✅ Validation tests
- ✅ Edge case coverage

## 📐 Calculations

All calculations use proper decimal arithmetic:

```typescript
// Example 1: 110" IFPD
Rate: ₹5,50,000
GST: 18%
Quantity: 1
→ GST Amount: ₹99,000
→ Rate Incl. Tax: ₹6,49,000
→ Total: ₹6,49,000

// Example 2: Retractable Display
Rate: ₹11,000
GST: 18%
Quantity: 5
→ GST Amount: ₹1,980
→ Rate Incl. Tax: ₹12,980
→ Total: ₹64,900
```

## 🎨 Customization

### Company Information

Edit `src/data/company.ts`:

```typescript
export const companyConfig = {
  name: 'Your Company Name',
  cin: 'Your CIN',
  gstin: 'Your GSTIN',
  pan: 'Your PAN',
  address: 'Your Address',
  contact: 'Your Contact',
  termsAndConditions: [
    // Your terms
  ],
};
```

### Product Catalog

Edit `src/data/products.ts` to add/modify products:

```typescript
{
  id: 'prod-023',
  name: 'New Product',
  description: 'Detailed specification...',
  defaultUnit: 'Nos',
  defaultRate: 50000,
  gstPercentage: 18,
  category: 'Electronics',
  active: true,
}
```

See [docs/PRODUCT_CATALOG.md](docs/PRODUCT_CATALOG.md) for details.

### Styling

The application uses Tailwind CSS. Customize in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your brand colors
      },
    },
  },
}
```

## 📄 Documentation

- [Requirements](docs/REQUIREMENTS.md) - Functional requirements and specifications
- [Architecture](docs/ARCHITECTURE.md) - System architecture and design decisions
- [PDF Generation](docs/PDF_GENERATION.md) - PDF generation implementation details
- [Product Catalog](docs/PRODUCT_CATALOG.md) - Product catalog management

## 🔧 Configuration

### Environment Variables

No environment variables required for v1.0 (client-side only).

### Build Configuration

Vite configuration in `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
```

## 🚢 Deployment

### Static Hosting

Build and deploy to any static hosting:

```bash
npm run build
# Deploy dist/ folder
```

**Recommended Platforms:**
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps

### Netlify Deployment

```bash
# Build command
npm run build

# Publish directory
dist
```

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🔒 Security

### Current (v1.0)
- ✅ Client-side only (no backend)
- ✅ No sensitive data transmission
- ✅ XSS prevention via React
- ✅ Input validation
- ✅ localStorage isolation

### Future Backend
- JWT authentication
- HTTPS only
- Input sanitization
- Rate limiting
- CORS configuration

## 📊 Performance

### Bundle Size
- Initial: ~615KB (gzipped: ~199KB)
- Includes: React, jsPDF, Tailwind CSS

### Optimization
- Code splitting
- Tree shaking
- Lazy loading (PDF library)
- Memoization
- Debounced autosave

### Load Time
- First load: < 3 seconds
- Subsequent: < 1 second (cached)

## 🐛 Known Issues

None currently. See [GitHub Issues](issues) for tracking.

## 🗺️ Roadmap

### v1.1 (Planned)
- [x] Export to Excel
- [ ] Product category filtering
- [ ] BOQ templates
- [ ] Print preview

### v2.0 (Future)
- [ ] Backend API integration
- [ ] User authentication
- [ ] BOQ history/archive
- [ ] Product management UI
- [ ] Email functionality
- [ ] Multi-company support
- [ ] Custom PDF templates

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines

- Follow TypeScript strict mode
- Write tests for new features
- Maintain documentation
- Follow existing code style
- Keep PRs focused and small

## 📝 License

MIT License - see LICENSE file for details

## 👥 Authors

- **Principal Software Engineer** - Initial work

## 🙏 Acknowledgments

- React team for the excellent framework
- jsPDF for PDF generation
- Tailwind CSS for styling
- Vite for blazing fast builds

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check documentation in `docs/`
- Review examples in code comments

## 📈 Changelog

### v1.1.0 (2026-09-25)
- ✨ Added Excel export functionality
- ✨ Dual download buttons (PDF and Excel)
- ✨ Professional Excel formatting matching original document structure
- ✨ Unified export service for consistency
- 🎨 Improved BOQ Summary UI with separate download buttons
- 📦 Added xlsx library dependency

### v1.0.0 (2026-09-24)
- ✨ Initial release
- ✅ Complete BOQ generation workflow
- ✅ Professional PDF export
- ✅ 22 demo products
- ✅ Responsive UI
- ✅ Draft persistence
- ✅ Comprehensive documentation

---

**Made with ❤️ for efficient quotation management**
