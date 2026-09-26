/* ============================================================
   AIyachts — Sanity content loader (build-time)
   Reads published yachts from the public Sanity read API and maps
   them to the FLEET shape consumed by site.mjs / pages.mjs.

   No token: the dataset must be PUBLIC. Coordinates come from the
   repo-root sanity.project.json. If Sanity is disabled, misconfigured
   or unreachable, loadFleet() returns the static fallback so the
   build never breaks.
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.join(HERE, '..', 'sanity.project.json');

function readConfig() {
  try {
    const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    return {
      projectId: process.env.SANITY_PROJECT_ID || cfg.projectId,
      dataset: process.env.SANITY_DATASET || cfg.dataset || 'production',
      apiVersion: process.env.SANITY_API_VERSION || cfg.apiVersion || '2025-02-19',
      useSanity: process.env.USE_SANITY
        ? process.env.USE_SANITY === 'true'
        : cfg.useSanity === true
    };
  } catch {
    return { projectId: '', dataset: 'production', apiVersion: '2025-02-19', useSanity: false };
  }
}

const isPlaceholder = (id) => !id || /^replace/i.test(id);

// GROQ: only yachts flagged for the website, ordered like the site.
const QUERY = `*[_type == "yacht" && showOnWebsite == true] | order(coalesce(order, 999) asc, name asc){
  "slug": slug.current,
  name, builder, year,
  "cat": category, type,
  cabins, guests, berths, heads,
  tag, blurb, highlights,
  owner,
  "image": mainImage.asset->url,
  specs,
  photos[]{ "slug": slug, alt, cat, title },
  "equipment": equipment[]{ title, items }
}`;

const REQUIRED = ['slug', 'name', 'builder', 'year', 'cat', 'type', 'tag', 'blurb', 'image'];

function toYacht(doc) {
  const missing = REQUIRED.filter((k) => doc[k] === undefined || doc[k] === null || doc[k] === '');
  if (missing.length) {
    console.warn(`  ⚠ Sanity yacht "${doc.name || doc.slug || '?'}" missing ${missing.join(', ')} — skipped`);
    return null;
  }
  const equipment = {};
  for (const g of doc.equipment || []) {
    if (g && g.title && Array.isArray(g.items) && g.items.length) equipment[g.title] = g.items;
  }
  return {
    slug: doc.slug,
    name: doc.name,
    builder: doc.builder,
    year: String(doc.year),
    cat: doc.cat,
    type: doc.type,
    cabins: doc.cabins ?? 0,
    guests: doc.guests ?? 0,
    berths: doc.berths ?? 0,
    heads: doc.heads ?? 0,
    tag: doc.tag,
    blurb: doc.blurb,
    highlights: Array.isArray(doc.highlights) ? doc.highlights : [],
    owner: doc.owner || 'partner',
    image: doc.image,
    photos: (doc.photos || []).filter((p) => p && p.slug && p.alt),
    equipment,
    // Optional specs spread onto the yacht (site.mjs reads y.loa, y.beam, ...)
    ...(doc.specs || {})
  };
}

async function fetchFromSanity(cfg) {
  const url = `https://${cfg.projectId}.api.sanity.io/v${cfg.apiVersion}/data/query/${cfg.dataset}?query=${encodeURIComponent(QUERY)}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Sanity ${res.status} ${res.statusText}`);
  const { result } = await res.json();
  if (!Array.isArray(result)) throw new Error('Sanity returned no result array');
  return result.map(toYacht).filter(Boolean);
}

/**
 * Returns the fleet array. Uses Sanity when enabled and configured,
 * otherwise (or on any error) the provided static fallback.
 */
export async function loadFleet(staticFleet) {
  const cfg = readConfig();
  if (!cfg.useSanity || isPlaceholder(cfg.projectId)) {
    if (cfg.useSanity) console.warn('  ⚠ Sanity enabled but projectId not set — using static fleet');
    return staticFleet;
  }
  try {
    const fleet = await fetchFromSanity(cfg);
    if (!fleet.length) {
      console.warn('  ⚠ Sanity returned 0 valid yachts — using static fleet');
      return staticFleet;
    }
    console.log(`  ✓ Loaded ${fleet.length} yachts from Sanity (${cfg.projectId}/${cfg.dataset})`);
    return fleet;
  } catch (err) {
    console.warn(`  ⚠ Sanity fetch failed (${err.message}) — using static fleet`);
    return staticFleet;
  }
}
