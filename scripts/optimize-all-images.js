// optimize-all-images.js
// A script to optimize all downloaded Unsplash images

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get current file's directory with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base image directory
const baseImagesDir = path.join(__dirname, '../src/assets/images');

// Directories to process
const imageDirs = [
  'index',
  'sprint',
  'blueprint',
  'momentum-club',
  'action-program' // Include this for completeness
];

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
        .then(data => {
          fs.writeFileSync(filePath, data);
          console.log(`✅ Optimized: ${path.relative(baseImagesDir, filePath)}`);
        });
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Function to create WebP version of an image
async function generateWebP(filePath) {
  try {
    // Only process JPG/JPEG files
    if (filePath.toLowerCase().endsWith('.jpg') || filePath.toLowerCase().endsWith('.jpeg')) {
      const fileBaseName = path.basename(filePath, path.extname(filePath));
      const webpFilePath = path.join(path.dirname(filePath), `${fileBaseName}.webp`);
      
      // Skip if WebP version already exists
      if (fs.existsSync(webpFilePath)) {
        console.log(`⏭️ Skipping: ${path.relative(baseImagesDir, webpFilePath)} already exists`);
        return;
      }
      
      const image = sharp(filePath);
      const metadata = await image.metadata();
      
      // Create WebP version with good quality/size balance
      await image
        .resize({
          width: Math.min(metadata.width, 1200),
          withoutEnlargement: true,
        })
        .webp({
          quality: 80,
          effort: 6, // Higher effort = better compression but slower
        })
        .toFile(webpFilePath);
      
      console.log(`✅ Created: ${path.relative(baseImagesDir, webpFilePath)}`);
    }
  } catch (error) {
    console.error(`Error creating WebP for ${filePath}:`, error);
  }
}

// Function to process all images in a directory
async function processImagesInDir(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      console.log(`Directory does not exist: ${dirPath}`);
      return;
    }
    
    const files = fs.readdirSync(dirPath);
    
    console.log(`\nProcessing ${files.length} files in ${path.relative(baseImagesDir, dirPath)}`);
    
    // First optimize all JPEGs
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isFile() && (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg'))) {
        await optimizeImage(filePath);
      }
    }
    
    // Then create WebP versions
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isFile() && (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg'))) {
        await generateWebP(filePath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
  }
}

// Main function to process all image directories
async function processAllImageDirs() {
  console.log('Starting image optimization process...');
  
  for (const dir of imageDirs) {
    const dirPath = path.join(baseImagesDir, dir);
    await processImagesInDir(dirPath);
  }
  
  console.log('\nAll images have been processed!');
}

// Run the optimization
processAllImageDirs();
