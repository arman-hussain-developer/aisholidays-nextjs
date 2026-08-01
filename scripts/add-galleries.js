/**
 * Adds gallery arrays to packages in packages.ts that are missing them.
 * Safe to run multiple times — already-gallered packages are skipped.
 */
const fs = require('fs');
const path = require('path');

const PACKAGES_FILE = path.join(__dirname, '..', 'src', 'data', 'packages.ts');

// Pre-computed gallery location per slug based on cities + location mapping rules
const packageGalleryMap = {
  // ── HIMACHAL ──────────────────────────────────────────────────────────────
  'manali-volvo-extended':           'manali',
  'shimla-volvo-break':              'shimla',
  'manali-volvo-honeymoon':          'manali',
  'shimla-manali-volvo-combo':       'manali',   // has Manali → rule 1
  'shimla-manali-chandigarh-car':    'manali',   // has Manali
  'grand-himachal-luxury-drive':     'manali',   // has Manali
  'grand-himachal-amritsar':         'manali',   // has Manali
  'himachal-honeymoon-circuit':      'manali',   // has Manali
  'grand-himachal-ex-delhi':         'manali',   // has Manali
  // ── KASHMIR / VAISHNO DEVI ────────────────────────────────────────────────
  'ultimate-kashmir-tour':           'kashmir',
  'exclusive-kashmir-tour':          'kashmir',
  'mata-vaishno-devi-tour':          'kashmir',  // destination vaishno-devi → kashmir gallery
  'ultimate-kashmir-honeymoon':      'kashmir',
  'ultimate-jannat-e-kashmir':       'kashmir',
  'ultimate-vaishno-devi-kashmir':   'kashmir',
  // ── KERALA ────────────────────────────────────────────────────────────────
  'ultimate-kerala-tour':            'kerala',
  'ultimate-kerala-wilderness':      'kerala',
  'ultimate-kerala-honeymoon':       'kerala',
  'ultimate-kerala-family':          'kerala',
  'ultimate-kerala-coconut':         'kerala',
  'ultimate-complete-kerala':        'kerala',
  // ── RAJASTHAN / GOLDEN TRIANGLE ───────────────────────────────────────────
  'ultimate-golden-triangle':        'golden-triangle',  // Delhi+Agra+Jaipur
  'ultimate-rajasthan-heritage':     'golden-triangle',  // Delhi+Agra+Jaipur
  'ultimate-royal-rajasthan':        'golden-triangle',  // Delhi+Agra+Jaipur
  'ultimate-royal-rajasthan-agra':   'golden-triangle',  // Delhi+Agra+Jaipur
  'ultimate-magnificent-rajasthan':  'golden-triangle',  // Delhi+Agra+Jaipur
  'ultimate-royal-rajasthan-grand':  'rajasthan',        // no Delhi+Agra combo
  // ── GOA ───────────────────────────────────────────────────────────────────
  'ultimate-goa-tour-3n':            'goa',
  'ultimate-goa-tour-2n':            'goa',
  'ultimate-best-goa-tour':          'goa',
  // ── UTTARAKHAND ───────────────────────────────────────────────────────────
  'ultimate-nainital-tour':          'uttarakhand',
  'ultimate-nainital-corbett':       'uttarakhand',
  'ultimate-haridwar-rishikesh':     'uttarakhand',
  'ultimate-uttarakhand-tour':       'uttarakhand',
  'ultimate-uttaranchal-tour':       'uttarakhand',
  // ── LEH-LADAKH ────────────────────────────────────────────────────────────
  'leh-ladakh-explorer':             'ladakh',
  // ── ANDAMAN ───────────────────────────────────────────────────────────────
  'andaman-island-romance':          'andaman',
  // ── NORTH EAST ────────────────────────────────────────────────────────────
  'ultimate-darjeeling-tour':                        'northeast',
  'ultimate-darjeeling-gangtok':                     'northeast',
  'ultimate-gangtok-kalimpong-darjeeling':            'northeast',
  'ultimate-gangtok-pelling-lachung-darjeeling':      'northeast',
  // ── GUJARAT ───────────────────────────────────────────────────────────────
  'ultimate-family-gujarat-tour':    'gujarat',
  'ultimate-dwarka-somnath-tour':    'gujarat',
  'ultimate-gujarat-honeymoon-tour': 'gujarat',
  // ── GOLDEN TRIANGLE (standalone destination) ──────────────────────────────
  'ultimate-golden-triangle-3n':     'golden-triangle',
  // ── AMARNATH ──────────────────────────────────────────────────────────────
  'amarnath-yatra-tour':             'amarnath',
  'amarnath-yatra-helicopter':       'amarnath',
  // ── INTERNATIONAL ─────────────────────────────────────────────────────────
  'thailand-discovery':              'thailand',
  'dubai-shimmer':                   'dubai',
  'dubai-family-getaway':            'dubai',
  'singapore-family-fun':            'singapore',
  'nepal-himalayan-charm':           'nepal',
  'hong-kong-disney-magic':          'hongkong',
};

/**
 * Builds the gallery array text to insert before the closing brace of a package.
 * Uses 4-space indent for 'gallery:' and 6-space indent for items (matching existing style).
 */
function makeGalleryEntry(location) {
  const items = [1, 2, 3, 4, 5]
    .map(n => `      "/images/gallery/${location}-${n}.webp"`)
    .join(',\n');
  return `\n    gallery: [\n${items},\n    ],`;
}

let content = fs.readFileSync(PACKAGES_FILE, 'utf8');
let modifiedCount = 0;

for (const [slug, location] of Object.entries(packageGalleryMap)) {
  // Find the slug line (try both quote styles)
  const patterns = [`slug: "${slug}"`, `slug: '${slug}'`];
  let slugPos = -1;
  for (const p of patterns) {
    const idx = content.indexOf(p);
    if (idx !== -1) { slugPos = idx; break; }
  }

  if (slugPos === -1) {
    console.log(`[WARN] Package not found: ${slug}`);
    continue;
  }

  // Find the next package-level closing brace: '\n  },' (exactly 2-space indent)
  const endPos = content.indexOf('\n  },', slugPos);
  if (endPos === -1) {
    console.log(`[WARN] Cannot find end of package: ${slug}`);
    continue;
  }

  // Check if a gallery already exists within this package range
  const packageSlice = content.substring(slugPos, endPos);
  if (packageSlice.includes('gallery:')) {
    console.log(`[SKIP] Already has gallery: ${slug}`);
    continue;
  }

  // Insert gallery just before '\n  },'
  const galleryText = makeGalleryEntry(location);
  content = content.substring(0, endPos) + galleryText + content.substring(endPos);
  modifiedCount++;
  console.log(`[OK]   Added gallery (${location}): ${slug}`);
}

fs.writeFileSync(PACKAGES_FILE, content, 'utf8');
console.log(`\nDone — ${modifiedCount} packages updated.`);
