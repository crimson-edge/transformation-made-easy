import sharp from 'sharp';
import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const svgPath = join(publicDir, 'og-image.svg');

async function generateOgImage() {
  try {
    if (!existsSync(svgPath)) {
      console.log('No og-image.svg found, skipping OG image generation');
      return;
    }

    const svgBuffer = readFileSync(svgPath);
    await sharp(svgBuffer)
      .resize(1200, 630)
      .toFormat('jpg', { quality: 90 })
      .toFile(join(publicDir, 'og-image.jpg'));
    
    console.log('Generated og-image.jpg successfully');
  } catch (error) {
    console.error('Error generating OG image:', error.message);
    // Don't fail the build if image generation fails
    process.exit(0);
  }
}

generateOgImage();
