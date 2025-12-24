# Image Optimization Guidelines

## Current Status
As of the current implementation, the portfolio uses:
- **React Icons** for all icon displays (SVG-based, no optimization needed)
- **No raster images** (PNG, JPG, WebP) are currently in use
- **Public folder** contains no images yet

## Future Image Usage

When adding images to the portfolio (e.g., project screenshots, technology logos, profile photos), follow these guidelines:

### Use Next.js Image Component

Always use the Next.js `Image` component instead of HTML `<img>` tags:

```tsx
import Image from 'next/image';

// Example usage
<Image
  src="/images/vectorloom-screenshot.png"
  alt="VectorLoom 3D vector visualization interface"
  width={800}
  height={600}
  loading="lazy" // Enable lazy loading for below-fold images
  placeholder="blur" // Optional: show blur placeholder while loading
  blurDataURL="data:image/..." // Optional: base64 blur placeholder
/>
```

### Benefits of Next.js Image

1. **Automatic optimization**: Images are automatically optimized and served in modern formats (WebP, AVIF)
2. **Lazy loading**: Images below the fold load only when needed
3. **Responsive images**: Automatically generates multiple sizes for different devices
4. **Prevents layout shift**: Width and height prevent CLS (Cumulative Layout Shift)
5. **Performance**: Reduces bandwidth and improves Core Web Vitals

### Best Practices

1. **Always provide width and height**: Prevents layout shift
2. **Use descriptive alt text**: Improves accessibility and SEO
3. **Enable lazy loading**: For images below the fold (not in viewport initially)
4. **Optimize source images**: Use appropriate resolution (don't upload 4K images for thumbnails)
5. **Use appropriate formats**: 
   - PNG for images with transparency
   - JPG for photographs
   - SVG for logos and icons (when possible)

### Example Locations for Future Images

```
public/
├── images/
│   ├── projects/
│   │   ├── vectorloom-hero.png
│   │   ├── vectorloom-3d-viz.png
│   │   └── vectorloom-search.png
│   ├── tech-logos/
│   │   ├── weaviate.png
│   │   ├── fastapi.png
│   │   └── langchain.png
│   └── profile/
│       └── avatar.jpg
```

### Priority Loading

For above-the-fold images (visible immediately), use priority loading:

```tsx
<Image
  src="/images/hero-image.png"
  alt="Hero image"
  width={1200}
  height={600}
  priority // Loads immediately, no lazy loading
/>
```

## Validation

To verify image optimization:
1. Run Lighthouse audit: `npm run build && npm start`
2. Check performance score (should be 90+)
3. Verify images are served in WebP/AVIF format in Network tab
4. Confirm lazy loading works for below-fold images

## Requirements Satisfied

This approach satisfies **Requirement 8.3**: "WHEN images are loaded THEN the Portfolio_System SHALL use Next.js Image optimization with lazy loading"
