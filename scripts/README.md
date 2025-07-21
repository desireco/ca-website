# Completionist Academy Website Scripts

This directory contains utility scripts for the Completionist Academy website.

## Image Optimization Workflow

The scripts in this directory help maintain optimized images for the website, reducing load times and improving performance.

### Scripts Overview

- `optimize-images.js` - Optimizes existing JPEG images in a directory
- `generate-webp.js` - Creates WebP versions of images for modern browsers

### Optimization Workflow

#### 1. Downloading Images

When downloading images from external sources like Unsplash:

```bash
# Create a dedicated directory for the images
mkdir -p src/assets/images/your-section-name

# Download with curl, applying size constraints directly
curl -L 'https://images.unsplash.com/photo-id?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' \
  -o src/assets/images/your-section-name/descriptive-name.jpg
```

#### 2. Optimize JPG/JPEG Images

```bash
# Run the optimize-images.js script
node scripts/optimize-images.js
```

This script:
- Resizes large images to max 1200px width
- Compresses with quality level 85
- Makes JPEGs progressive for better loading

#### 3. Generate WebP Versions

```bash
# Run the generate-webp.js script
node scripts/generate-webp.js
```

This script:
- Creates WebP versions of all JPG/JPEG images
- Uses quality level 80 for good balance
- Typically reduces file size 30-60%

#### 4. Update Image References

In your Astro components, use the local path with the `~/assets/` prefix:

```astro
image={{
  src: '~/assets/images/your-section-name/descriptive-name.jpg',
  alt: 'Descriptive alt text for accessibility',
}}
```

### Benefits

- **Performance**: Properly sized and compressed images load faster
- **SEO**: Page speed is a ranking factor for search engines
- **UX**: Faster loading = better user experience
- **Sustainability**: Reduced data transfer is better for the environment
- **Cost**: Lower bandwidth usage = lower hosting costs

### Best Practices

1. **Always optimize**: Never use raw downloaded images
2. **Descriptive filenames**: Use clear naming conventions
3. **Appropriate sizes**: Don't use 4K images for small thumbnails
4. **Alt text**: Always include descriptive alt text for accessibility
5. **WebP**: Always generate WebP versions for modern browsers
6. **Documentation**: Update READMEs when adding new image directories

### Adding New Optimization Features

When adding new optimization scripts:
1. Update this README
2. Document the script with comments
3. Include usage examples
4. Make sure scripts work with ES modules format