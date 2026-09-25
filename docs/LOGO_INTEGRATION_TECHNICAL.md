# Promark Logo Integration - Technical Documentation

## Overview

The PDF generation system has been refactored to replace the text-based "promark" header with the actual Promark logo image, ensuring professional branding consistency across all generated quotation documents.

## Architecture Changes

### Image Loading System

Created a new image loading utility (`src/services/pdf/imageLoader.ts`) that handles:
- Asynchronous image loading via HTML Image API
- Conversion to base64 data URLs for PDF embedding
- Natural dimension detection
- Aspect-ratio-preserving scaling calculations

### PDF Header Rendering

The PDF generator (`src/services/pdf/pdfGenerator.ts`) now:
1. Attempts to load the logo image asynchronously before PDF generation
2. Converts the image to base64 format
3. Retrieves original dimensions
4. Calculates scaled dimensions (max 60mm × 20mm while preserving aspect ratio)
5. Embeds the image using jsPDF's `addImage()` method
6. Falls back to text-based header if image loading fails

## Implementation Details

### File: `src/services/pdf/imageLoader.ts`

```typescript
export async function loadImageAsBase64(imagePath: string): Promise<string>
```
- Loads an image from a URL/path
- Returns base64-encoded data URL
- Uses HTML Canvas API for conversion
- Throws error if loading fails

```typescript
export async function getImageDimensions(imagePath: string): Promise<{ width: number; height: number }>
```
- Determines natural dimensions of an image
- Returns width and height in pixels
- Required for aspect ratio calculations

```typescript
export function calculateScaledDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number }
```
- Calculates scaled dimensions while preserving aspect ratio
- Ensures image fits within maximum bounds
- Prevents stretching or distortion

### File: `src/services/pdf/pdfGenerator.ts`

#### Modified Function: `generateBoqPdf()`

Now async and includes logo loading:

```typescript
export async function generateBoqPdf(
  boqData: BoqData,
  companyConfig: CompanyConfig
): Promise<void>
```

Logo loading flow:
```typescript
try {
  const logoBase64 = await loadImageAsBase64(PROMARK_LOGO_PATH);
  const logoDimensions = await getImageDimensions(PROMARK_LOGO_PATH);
  yPosition = await addPromarkHeader(doc, yPosition, logoBase64, logoDimensions);
} catch (error) {
  console.error('Failed to load logo, using fallback:', error);
  yPosition = addPromarkHeaderFallback(doc, yPosition);
}
```

#### New Function: `addPromarkHeader()`

```typescript
async function addPromarkHeader(
  doc: jsPDF,
  startY: number,
  logoBase64: string,
  logoDimensions: { width: number; height: number }
): Promise<number>
```

Implementation:
- Calculates scaled dimensions using `calculateScaledDimensions()`
- Uses jsPDF's `addImage()` method
- Format: PNG
- Compression: 'FAST' (prioritizes quality)
- Returns Y-position after logo for subsequent content

#### Preserved Function: `addPromarkHeaderFallback()`

Renamed from original `addPromarkHeader()`:
- Renders text-based "promark" header
- Used when logo image cannot be loaded
- Ensures PDFs can still be generated without the logo file
- Maintains backward compatibility

### File: `src/assets/promarkLogo.ts`

Centralized logo configuration:

```typescript
export const PROMARK_LOGO_PATH = '/assets/images/promark-logo.png';

export const PROMARK_LOGO_METADATA = {
  preferredMaxWidth: 60, // mm
  preferredMaxHeight: 20, // mm
};
```

## Asset Management

### Logo File Location

**Path**: `public/assets/images/promark-logo.png`

**Why `/public`?**
- Vite serves files from `/public` directory at root level
- Referenced as `/assets/images/promark-logo.png` in code
- Automatically copied to `dist/` during production builds
- No import/bundling required
- Works consistently in dev and production

### Logo Specifications

**Required**:
- Filename: `promark-logo.png`
- Format: PNG (recommended) or JPEG
- Quality: High resolution (1000px+ width recommended)

**Content**:
- Blue "promark" wordmark
- Registered trademark symbol (®)
- "MARK OF PROFICIENCY" tagline
- Transparent or white background

## PDF Rendering Details

### jsPDF Image Embedding

Method used:
```typescript
doc.addImage(
  logoBase64,          // Base64 data URL
  'PNG',               // Format
  x,                   // X position (mm)
  y,                   // Y position (mm)
  width,               // Width (mm)
  height,              // Height (mm)
  undefined,           // Alias (optional)
  'FAST'              // Compression mode
);
```

### Compression Mode: 'FAST'

- Prioritizes quality over file size
- Suitable for logos and branding
- Alternative: 'SLOW' (smaller file, slower processing)

### Positioning

- X: `PAGE_CONFIG.marginLeft` (10mm from left edge)
- Y: `startY + 5` (typically 15mm from top)
- Width/Height: Calculated dynamically, respecting aspect ratio

## Error Handling

### Graceful Degradation

If logo loading fails:
1. Error logged to console
2. Fallback text-based header used
3. PDF generation continues normally
4. No user-facing error

### Common Failure Scenarios

1. **File not found**: 404 error, fallback triggered
2. **CORS issue**: Cross-origin error (shouldn't occur with local files)
3. **Invalid format**: Image decode failure
4. **Network timeout**: In dev mode with slow file system

All handled by try-catch in `generateBoqPdf()`.

## Performance Considerations

### Image Loading

- Asynchronous: Doesn't block UI
- Cached by browser after first load
- Base64 conversion done once per PDF generation

### PDF File Size

- Logo embedded as base64 in PDF
- Increases PDF file size by logo size
- Typical impact: +50-200KB per PDF
- FAST compression balances quality and size

## Testing

### Unit Test Considerations

Image loading utilities can be tested with:
- Mock Image objects
- Test image data URLs
- Dimension calculation validation

### Integration Testing

Test scenarios:
1. Logo file present → Image rendered
2. Logo file missing → Fallback used
3. Invalid logo format → Fallback used
4. Large logo → Correctly scaled
5. Small logo → Correctly scaled

### Manual Testing Checklist

- [ ] Logo appears in PDF header
- [ ] Logo is sharp and clear
- [ ] No stretching or distortion
- [ ] Correct positioning
- [ ] Consistent across all pages (if multi-page)
- [ ] Works in production build
- [ ] Fallback works when logo removed

## Build Process

### Development

```bash
npm run dev
```

- Vite dev server serves `/public` at root
- Logo accessible at `http://localhost:5173/assets/images/promark-logo.png`
- Hot module reload doesn't affect public assets

### Production

```bash
npm run build
```

- Vite copies `/public` contents to `dist/`
- Logo available at `dist/assets/images/promark-logo.png`
- Relative path `/assets/images/promark-logo.png` works identically

## Browser Compatibility

### Image API

- `Image()` constructor: All modern browsers
- `canvas.toDataURL()`: All modern browsers
- Base64 encoding: Universal support

### jsPDF Image Support

- PNG: Fully supported
- JPEG: Fully supported
- SVG: Not directly supported (would need conversion)

## Future Enhancements

### Potential Improvements

1. **Preload logo**: Load once at app start, cache in memory
2. **Offline support**: Embed as base64 constant in code
3. **Multiple logos**: Support different logos for different companies
4. **Dynamic branding**: Load logo based on company config
5. **Image optimization**: Pre-process logo for optimal PDF size

### Alternative Approaches Considered

1. **SVG Recreation**: Not chosen (jsPDF SVG support limited)
2. **Embedded base64**: Not chosen (increases bundle size)
3. **External URL**: Not chosen (requires internet connection)
4. **Canvas rendering**: Not chosen (more complex, no benefit)

## Migration Notes

### Changes from Previous Implementation

**Before**:
- Text-based "promark" header
- Font: Helvetica Bold, 24pt
- Color: RGB(0, 82, 155)
- ® symbol and tagline added separately

**After**:
- Image-based logo
- Exact brand assets
- Professional appearance
- Consistent with other materials

### Backward Compatibility

- Fallback ensures PDFs can still be generated
- No breaking changes to public API
- `generateBoqPdf()` signature unchanged (still async-friendly)

## Debugging

### Enable Verbose Logging

Add to `pdfGenerator.ts`:
```typescript
console.log('Logo loaded:', { width: logoDimensions.width, height: logoDimensions.height });
console.log('Scaled to:', scaledDimensions);
```

### Verify Logo Loading

Check browser console for:
```
Failed to load logo, using fallback: Error: ...
```

### Inspect Generated PDF

Use PDF viewer's inspector to check:
- Image embedded correctly
- Image resolution
- Image format

## Dependencies

### New Dependencies

None added (uses existing jsPDF and browser APIs)

### Used Browser APIs

- `Image`: For loading images
- `HTMLCanvasElement`: For base64 conversion
- `FileReader`: (Not used, but alternative approach)

### Used jsPDF APIs

- `doc.addImage()`: For image embedding
- Compression options: 'FAST' mode

## Code Quality

### TypeScript

- Full type safety maintained
- No `any` types (except for jsPDF internals)
- Async/await used correctly
- Error handling with try-catch

### Best Practices

- Separation of concerns (imageLoader separate from pdfGenerator)
- Single responsibility principle
- Error handling at appropriate level
- Configuration centralized
- Comments for complex logic

## Maintenance

### Adding a New Logo

1. Save logo to `public/assets/images/`
2. Update `PROMARK_LOGO_PATH` in `promarkLogo.ts`
3. Adjust `PROMARK_LOGO_METADATA` if different size needed

### Changing Logo Dimensions

Update `PROMARK_LOGO_METADATA`:
```typescript
export const PROMARK_LOGO_METADATA = {
  preferredMaxWidth: 80,  // Wider logo
  preferredMaxHeight: 25, // Taller logo
};
```

### Removing Logo Feature

To revert to text-based header:
1. Remove logo loading try-catch in `generateBoqPdf()`
2. Call `addPromarkHeaderFallback()` directly
3. Remove imageLoader imports

## Security Considerations

### Image Source

- Loaded from local public assets (trusted)
- No user-uploaded images (prevents XSS via images)
- No external URLs (prevents data leakage)

### Base64 Encoding

- Standard browser API (safe)
- No server-side processing required
- Stays in browser memory

## Conclusion

The Promark logo integration provides professional branding for PDF quotations while maintaining robustness through fallback mechanisms. The implementation uses standard web APIs and jsPDF capabilities, ensuring broad compatibility and maintainability.

---

**Implementation Status**: ✅ Complete
**Remaining**: Place logo file at `public/assets/images/promark-logo.png`
**Breaking Changes**: None
**Dependencies Added**: None
