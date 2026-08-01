/**
 * Downloads free travel-style photos from Lorem Picsum (picsum.photos) for
 * every gallery location and saves them as the gallery WebP files.
 *
 * Unsplash Source (source.unsplash.com) was shut down in 2023 and returns 503.
 * Lorem Picsum is a maintained, free, no-key-required alternative.
 *
 * URL format used:
 *   https://picsum.photos/seed/<location>-<n>/800/600
 *
 * The seed makes images deterministic — re-running always fetches the same photo.
 * Skips any file that already exists AND is larger than 1 000 bytes (real image).
 *
 * Usage: node scripts/download-gallery-images.js
 */
const https   = require('https');
const http    = require('http');
const fs      = require('fs');
const path    = require('path');
const { URL } = require('url');

const GALLERY_DIR           = path.join(__dirname, '..', 'public', 'images', 'gallery');
const PLACEHOLDER_MAX_BYTES = 1000;
const REQUEST_DELAY_MS      = 250;
const MAX_REDIRECTS         = 15;

// Locations that need gallery images (18 locations × 5 = 90 files)
const LOCATIONS = [
  'manali', 'shimla', 'kashmir', 'kerala', 'goa',
  'rajasthan', 'golden-triangle', 'uttarakhand', 'ladakh', 'andaman',
  'northeast', 'gujarat', 'amarnath', 'thailand', 'dubai',
  'singapore', 'nepal', 'hongkong',
];

/** Follow redirects and stream the final response body to destPath. */
function downloadFile(startUrl, destPath) {
  return new Promise((resolve, reject) => {
    function fetch(rawUrl, hopsLeft) {
      if (hopsLeft <= 0) return reject(new Error(`Too many redirects: ${startUrl}`));

      let parsed;
      try { parsed = new URL(rawUrl); } catch (e) { return reject(e); }

      const lib     = parsed.protocol === 'https:' ? https : http;
      const options = {
        hostname: parsed.hostname,
        port:     parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
        path:     parsed.pathname + parsed.search,
        headers:  { 'User-Agent': 'HolidayYatraBot/1.0 (gallery-image-downloader)' },
      };

      const req = lib.get(options, (res) => {
        const { statusCode, headers } = res;

        if ([301, 302, 303, 307, 308].includes(statusCode)) {
          res.resume();
          let loc = headers.location || '';
          if (!loc.startsWith('http')) loc = `${parsed.protocol}//${parsed.host}${loc}`;
          return fetch(loc, hopsLeft - 1);
        }

        if (statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${statusCode} for ${rawUrl}`));
        }

        const tmp  = destPath + '.tmp';
        const file = fs.createWriteStream(tmp);
        res.pipe(file);

        file.on('finish', () => {
          file.close((err) => {
            if (err) { fs.unlink(tmp, () => {}); return reject(err); }
            fs.rename(tmp, destPath, (e2) => {
              if (e2) { fs.unlink(tmp, () => {}); return reject(e2); }
              resolve();
            });
          });
        });
        file.on('error', (err) => { fs.unlink(tmp, () => {}); reject(err); });
        res.on('error',  (err) => { fs.unlink(tmp, () => {}); reject(err); });
      });

      req.on('error', reject);
      req.setTimeout(25000, () => req.destroy(new Error(`Timeout: ${rawUrl}`)));
    }

    fetch(startUrl, MAX_REDIRECTS);
  });
}

const sleep     = (ms) => new Promise((r) => setTimeout(r, ms));
const fileSize  = (p)  => { try { return fs.statSync(p).size; } catch { return 0; } };
const kb        = (n)  => `${(n / 1024).toFixed(1)} KB`;

async function main() {
  fs.mkdirSync(GALLERY_DIR, { recursive: true });

  let downloaded = 0, skipped = 0, failed = 0;
  const total = LOCATIONS.length * 5;

  console.log(`Downloading up to ${total} gallery images from picsum.photos …\n`);

  for (const location of LOCATIONS) {
    console.log(`── ${location}`);

    for (let n = 1; n <= 5; n++) {
      const filename = `${location}-${n}.webp`;
      const destPath = path.join(GALLERY_DIR, filename);
      const existing = fileSize(destPath);

      if (existing > PLACEHOLDER_MAX_BYTES) {
        console.log(`   [SKIP] ${filename}  (${kb(existing)} — real image)`);
        skipped++;
        continue;
      }

      // Deterministic seed keeps the same photo across re-runs
      const seed = `${location}-${n}`;
      const url  = `https://picsum.photos/seed/${seed}/800/600`;
      process.stdout.write(`   [DL]  ${filename} … `);

      try {
        await downloadFile(url, destPath);
        const size = fileSize(destPath);
        console.log(`${kb(size)}  ✓`);
        downloaded++;
      } catch (err) {
        console.log(`FAILED — ${err.message}`);
        failed++;
      }

      if (n < 5) await sleep(REQUEST_DELAY_MS);
    }

    await sleep(REQUEST_DELAY_MS);
  }

  console.log(`\n${'─'.repeat(52)}`);
  console.log(`Downloaded : ${downloaded} / ${total}`);
  console.log(`Skipped    : ${skipped}  (already real)`);
  console.log(`Failed     : ${failed}`);
  console.log(`Saved to   : ${GALLERY_DIR}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
