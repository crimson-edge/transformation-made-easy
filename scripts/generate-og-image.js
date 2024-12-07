import sharp from 'sharp';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const svgBuffer = readFileSync(join(publicDir, 'og-image.svg'));

sharp(svgBuffer)
  .resize(1200, 630)
  .toFormat('jpg', { quality: 90 })
  .toFile(join(publicDir, 'og-image.jpg'))
  .then(() => console.log('Generated og-image.jpg'))
  .catch(console.error);
