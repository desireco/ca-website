// generate-webp.js
// A script to generate WebP versions of images in the action-program folder

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get current file's directory with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing the images
const imagesDir = path.join(__dirname, '../src/assets/images/action-program');

// Function to generate WebP version of an image
async function generateWebP(filePath) {
  try {
    // Only process JPG/JPEG files
    if (filePath.toLowerCase().endsWith('.jpg') || filePath.toLowerCase().endsWith('.jpeg')) {
      const fileBaseName = path.basename(filePath, path.extname(filePath));
      const webpFilePath = path.join(path.dirname(filePath), `${fileBaseName}.webp`);
      
      // Skip if WebP version already exists
      if (fs.existsSync(webpFilePath)) {
        console.log(`⏭️ Skipping: ${fileBaseName}.webp already exists`);
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
      
      console.log(`✅ Created: ${fileBaseName}.webp`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Get all images in the directory and generate WebP versions
async function generateAllWebP() {
  try {
    const files = fs.readdirSync(imagesDir);
    
    console.log(`Found ${files.length} files to process`);
    
    // Process files in parallel with Promise.all
    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(imagesDir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isFile()) {
          await generateWebP(filePath);
        }
      })
    );
    
    console.log('WebP generation complete!');
  } catch (error) {
    console.error('Error generating WebP images:', error);
  }
}

// Run the WebP generation
generateAllWebP();
