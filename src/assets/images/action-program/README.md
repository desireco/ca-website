# Action Program Image Assets

This directory contains optimized images used in the Action Program page of the Completionist Academy website.

## Images Overview

| Image File | WebP Version | Purpose | Description |
|------------|--------------|---------|-------------|
| team-collaboration.jpg | team-collaboration.webp | Hero section | People collaborating in a meeting setting |
| planning-meeting.jpg | planning-meeting.webp | Core Promise section | Team planning session |
| strategy-session.jpg | strategy-session.webp | How to Join section | Planning and strategy visualization |
| focused-person.jpg | focused-person.webp | Who This Is For section | Person focused and determined |
| overwhelmed-person.jpg | overwhelmed-person.webp | Not Right For section | Person showing signs of stress/overwhelm |
| coach-headshot.jpg | coach-headshot.webp | Completionist Approach section | Professional headshot of coach |

## Optimization Details

All images have been:

1. **Downloaded from Unsplash**: Original high-quality sources
2. **Resized**: Maximum width of 1200px to balance quality and performance
3. **Compressed**: Optimized JPEGs with 85% quality for good visual fidelity
4. **WebP versions**: Generated WebP alternatives at 80% quality for modern browsers
   - WebP files are significantly smaller (30-60% reduction in size)
   - Modern browsers will automatically use WebP when available

## Usage in Astro Components

Images are referenced in templates using the `~/assets/images/action-program/` path pattern:

```astro
image={{
  src: '~/assets/images/action-program/team-collaboration.jpg',
  alt: 'Team collaboration and planning',
}}
```

The Astro image handling system will handle the rest, including:
- Responsive image generation
- Proper loading attributes
- Width/height attributes to prevent layout shifts

## Benefits of Local Image Optimization

1. **Improved Performance**: Faster page loads with properly sized images
2. **Reduced Bandwidth**: Smaller file sizes mean less data transfer
3. **Better Control**: Full control over image quality and formats
4. **No External Dependencies**: No reliance on third-party image services
5. **Content Ownership**: Assets are fully owned and controlled by the website

## Maintenance

When adding new images to this directory:

1. Use descriptive filenames that indicate the image content
2. Optimize images before adding (resize to max 1200px width, compress appropriately)
3. Generate WebP versions using the project's scripts:
   ```
   node scripts/generate-webp.js
   ```
4. Update this README if adding images for new sections