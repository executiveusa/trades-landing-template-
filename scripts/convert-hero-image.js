/**
 * Convert HEIC image to optimized JPG for web use
 * Run with: node scripts/convert-hero-image.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function convertImage() {
  try {
    // Check if sharp is available
    let sharp;
    try {
      sharp = (await import('sharp')).default;
    } catch (e) {
      console.log('📦 Installing sharp for image processing...');
      execSync('npm install sharp --save', { stdio: 'inherit' });
      sharp = (await import('sharp')).default;
    }

    const inputPath = process.argv[2] || 'C:\\Users\\execu\\Downloads\\CUBA WEBSITE\\20260310_112956[1].heic';
    const outputPath = path.join(__dirname, '..', 'public', 'hero-bg.jpg');
    const outputDir = path.dirname(outputPath);

    // Ensure public directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`🖼️  Converting HEIC image from:\n   ${inputPath}`);
    console.log(`📤 Optimizing for web (1920x1080+)...`);

    // Resize to common hero dimensions and optimize
    const result = await sharp(inputPath)
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true
      })
      .toFile(outputPath);

    // Also create a mobile-optimized version
    const mobileOutputPath = path.join(__dirname, '..', 'public', 'hero-bg-mobile.jpg');
    await sharp(inputPath)
      .resize(1080, 1440, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: 80,
        progressive: true,
        mozjpeg: true
      })
      .toFile(mobileOutputPath);

    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const mobileSize = fs.statSync(mobileOutputPath).size;

    console.log(`\n✅ Conversion complete!\n`);
    console.log(`📊 File sizes:`);
    console.log(`   Original HEIC: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Desktop JPG:   ${(newSize / 1024).toFixed(0)} KB`);
    console.log(`   Mobile JPG:    ${(mobileSize / 1024).toFixed(0)} KB`);
    console.log(`\n📁 Output files:`);
    console.log(`   ✓ ${outputPath}`);
    console.log(`   ✓ ${mobileOutputPath}`);
    console.log(`\n🚀 Ready to use in HeroEnhanced.tsx!`);

  } catch (error) {
    console.error('❌ Conversion failed:', error.message);
    process.exit(1);
  }
}

convertImage();
