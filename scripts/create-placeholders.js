/**
 * Reads all image/gallery paths from packages.ts and creates a 1×1 transparent
 * WebP placeholder for every path that does not yet exist in public/.
 * Directories are created automatically.
 *
 * Usage: node scripts/create-placeholders.js
 */
const fs   = require('fs');
const path = require('path');

// Minimal valid 1×1 transparent WebP (36 bytes, lossless VP8L)
const TRANSPARENT_WEBP = Buffer.from(
  'UklGRiQAAABXRUJQVlA4IBgAAACQAQCdASoBAAEAAUAmJYgCdAEO/gHOAAA=',
  'base64'
);

const ROOT_DIR      = path.join(__dirname, '..');
const PUBLIC_DIR    = path.join(ROOT_DIR, 'public');
const PACKAGES_FILE = path.join(ROOT_DIR, 'src', 'data', 'packages.ts');

const content = fs.readFileSync(PACKAGES_FILE, 'utf8');

// Collect every /images/... path found in the file (both quote styles)
const imagePaths = new Set();

const dqRegex = /"(\/images\/[^"]+)"/g;
const sqRegex = /'(\/images\/[^']+)'/g;

let m;
while ((m = dqRegex.exec(content)) !== null) imagePaths.add(m[1]);
while ((m = sqRegex.exec(content)) !== null) imagePaths.add(m[1]);

// Filter to image file extensions we care about
const IMAGE_EXTS = new Set(['.webp', '.jpg', '.jpeg', '.png', '.avif', '.jfif']);
const filteredPaths = [...imagePaths].filter(p => IMAGE_EXTS.has(path.extname(p).toLowerCase()));

console.log(`Found ${filteredPaths.length} image paths in packages.ts\n`);

let created = 0;
let skipped = 0;

for (const imgPath of filteredPaths) {
  const fullPath = path.join(PUBLIC_DIR, imgPath);

  if (fs.existsSync(fullPath)) {
    skipped++;
    continue;
  }

  // Ensure parent directory exists
  const dir = path.dirname(fullPath);
  fs.mkdirSync(dir, { recursive: true });

  // Write placeholder (use a real WebP for .webp; others get the same binary as a stand-in)
  fs.writeFileSync(fullPath, TRANSPARENT_WEBP);
  console.log(`Created: ${imgPath}`);
  created++;
}

console.log(`\nSummary: ${created} placeholder(s) created, ${skipped} already existed.`);
