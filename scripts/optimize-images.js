// optimize-images.js
// A script to optimize images using Sharp

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get current file's directory with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing the images
const imagesDir = path.join(__dirname, '../src/assets/images/action-program');

// Function to optimize an image
async function optimizeImage(filePath) {
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Only process JPG/JPEG files
    if (['jpeg', 'jpg'].includes(metadata.format)) {
      // Create an optimized version
      await image
        .resize({
          width: Math.min(1200, metadata.width), // Max width 1200px
          withoutEnlargement: true,
        })
        .jpeg({
          quality: 85,
          progressive: true,
        })
        .toBuffer()
        .then((data) => {
          fs.writeFileSync(filePath, data);
          console.log(`✅ Optimized: ${path.basename(filePath)}`);
        });
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Get all images in the directory and optimize them
async function optimizeAllImages() {
  try {
    const files = fs.readdirSync(imagesDir);

    console.log(`Found ${files.length} files to process`);

    for (const file of files) {
      const filePath = path.join(imagesDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isFile()) {
        await optimizeImage(filePath);
      }
    }

    console.log('All images have been optimized!');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

// Run the optimization
optimizeAllImages();
