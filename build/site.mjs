/* ============================================================
   AIyachts — site configuration & content data
   Change ORIGIN here and re-run `node build/build.mjs` to update
   every canonical URL, og:url and sitemap entry at once.
   ============================================================ */
import { loadFleet } from './sanity.mjs';

export const SITE = {
  origin: 'https://ai-yachting.com',
  name: 'AIyachts',
  legalName: 'AIyachts',
  tagline: 'Set Sail for Unforgettable Memories',
  locale: 'en_GB',
  lang: 'en',
  themeLight: '#FFFFFF',
  themeDark: '#06232B',
  email: 'aiyachtsea@gmail.com',
  phones: ['+30 697 23 56 502', '+30 694 099 28 94', '+44 (0) 7471 137 874'],
  bases: [
    { name: 'Athens base', street: 'Alexandroupoleos 20', postal: '11527', city: 'Athens', region: 'Attica', country: 'GR', lat: 37.9838, lon: 23.7275 },
    { name: 'Lefkas base', street: 'Tsoukalades', postal: '31100', city: 'Lefkada', region: 'Lefkada', country: 'GR', lat: 38.7290, lon: 20.6390 }
  ],
  social: []
};

export const NAV = [
  { href: 'about.html',          label: 'About us' },
  { href: 'destinations.html',   label: 'Destinations & Itineraries' },
  { href: 'fleet.html',          label: 'Fleet' },
  { href: 'experiences.html',    label: 'Experiences' },
  { href: 'services.html',       label: 'Services' },
  { href: 'brokerage.html',      label: 'Brokerage' },
  { href: 'special-offers.html', label: 'Special offers' },
  { href: 'contact.html',        label: 'Contact' }
];

/* ---------------- THE TEAM ----------------
   Portraits live in assets/team/<slug>-400 and -800 (.jpg + .webp).      */
export const TEAM = [
  {
    slug: 'afroditi-kazakou',
    name: 'Afroditi Kazakou',
    role: 'Head of Marketing, Customer Experience & Innovation',
    alt: 'Afroditi Kazakou, Head of Marketing, Customer Experience and Innovation at AIyachts, at the helm of a sailing yacht',
    paras: [
      'Afroditi\u2019s journey to AIyachts is a story shaped by sailing, place identity, and a lifelong fascination with how people create and share meaningful experiences.',
      'Afroditi brings to AIyachts a deep love for classic yachts\u2019 sailing, a respect for maritime heritage, and a commitment to co-creating journeys that feel authentic and personal. She believes that the stronger the network \u2014 from skippers and mechanics to local F&amp;B, accommodation providers, and island communities \u2014 the richer the stories guests can live. Her work ethic is defined by care, precision, and pride in place; a belief that Greek islands deserve to be experienced with honesty, not clich\u00e9s.',
      'A researcher and tutor at Manchester Metropolitan University, she specialises in innovation, knowledge transfer, and the development of stakeholder networks in niche tourism sectors. Her work explores how strong relationships between local businesses, professionals, communities, and regional actors create the conditions for new knowledge, better experiences, and meaningful collaboration \u2014 the very principles that shape AIyachts today.',
      'Through research, teaching, and an instinctive connection to the sea, Afroditi ensures that every journey becomes more than a holiday \u2014 it becomes a shared narrative shaped by people, culture, and the quiet magic of the Ionian and Aegean seas.'
    ]
  },
  {
    slug: 'ilias-tzannetoulakos',
    name: 'Ilias Tzannetoulakos',
    role: 'Head of Maritime Operations',
    alt: 'Ilias Tzannetoulakos, Head of Maritime Operations at AIyachts, aboard a yacht in the Ionian Sea',
    paras: [
      'Ilias is the mentor behind AIyachts \u2014 a skipper shaped by a lifetime at sea and a family legacy rooted in Greek maritime and yachting. Born in Piraeus and raised on boats, his journey began in the early 1980s, when his family started offering crewed and bareboat charters across Greece and abroad. What followed was a natural progression: an offshore sailing diploma, racing with university teams in the UK and Greece, yacht deliveries, and eventually the founding of his own charter company, which operated successfully for more than fifteen years.',
      'Today, Ilias brings to AIyachts a rare blend of academic insight and deep practical knowledge. His background in Maritime Business, Social Sciences, and Political Philosophy enriches his approach to leadership, problem-solving, and long-term development. But at his core, Ilias is a sailor \u2014 someone who teaches guests to navigate with pencil and compass, who knows every sound a boat makes, and who treats maintenance as an act of care rather than obligation.',
      'His work ethic is defined by precision, responsibility, and genuine meraki. Whether he\u2019s improving vessel performance, coordinating winterisation plans, or exploring new investment opportunities for the company, Ilias drives AIyachts forward with vision and competitiveness. For him, sailing is not just a profession; it\u2019s a lifelong commitment to craftsmanship, growth, and the sea itself.'
    ]
  }
];

/* ---------------- FLEET ----------------
   The figures below are the ones AIyachts supplied. No dimension,
   engine or price data is invented here — add it in this file and
   the fleet pages pick it up automatically.

   owner      'partner' → listed under “Partners’ Yachts”
              'own'     → listed under “Our Fleet”
   photos[]   the yacht’s own gallery. Each entry is
              { slug, alt, cat:'exterior'|'interior' } and expects
              assets/fleet/gallery/<slug>-800 and -1600 (.jpg + .webp).
              Leave empty and the page shows the main photograph only.
   equipment  optional equipment list, grouped exactly as the client’s
              example. Leave {} and the block is omitted. Shape:
                equipment: {
                  'Outdoor equipment': ['Bimini', 'Bathing ladder'],
                  'Leisure activities': ['Paddle board', 'Snorkelling equipment'],
                  'Sails & rigging': ['Battened mainsail', 'Furling genoa']
                }
   Optional extra specs, shown in the table only when present:
   loa, beam, draft, displacement, engine, fuel, water, mainsail, headsail. */
const STATIC_FLEET = [
  {
    slug: 'bavaria-33-cruiser', name: 'Bavaria 33 Cruiser', builder: 'Bavaria Yachts',
    year: '2007', cat: '2 Cabins', type: 'Monohull', cabins: 2, guests: 6, berths: 6, heads: 1,
    tag: 'Couples & small families',
    blurb: 'The most compact yacht in the fleet and the easiest to fall in love with. Two cabins, a cockpit that seats everyone comfortably, and a sail plan that one confident sailor can manage alone — ideal for a couple, or a family finding its sea legs in the sheltered Ionian.',
    highlights: ['Simple, forgiving sail plan', 'Slips into the smallest bays', 'Light on fuel and on the wallet'],
    owner: 'partner', photos: [], equipment: {}
  },
  {
    slug: 'bavaria-40-cruiser', name: 'Bavaria 40 Cruiser', builder: 'Bavaria Yachts',
    year: '2011', cat: '3 Cabins', type: 'Monohull', cabins: 3, guests: 7, berths: 7, heads: 2,
    tag: 'The all-rounder',
    blurb: 'Three cabins, two heads and a wide, stable hull — the yacht we recommend most often to groups of six or seven. Steady enough for a first bareboat week, lively enough to keep experienced sailors interested when the afternoon breeze fills in.',
    highlights: ['Three private cabins', 'Two heads for a full crew', 'Confidence-inspiring in a fresh breeze'],
    owner: 'partner', photos: [], equipment: {}
  },
  {
    slug: 'bavaria-39-cruiser', name: 'Bavaria 39 Cruiser', builder: 'Bavaria Yachts',
    year: '2007', cat: '3 Cabins', type: 'Monohull', cabins: 3, guests: 7, berths: 6, heads: 2,
    tag: 'Easy miles',
    blurb: 'A roomy deck-saloon feel below and an uncomplicated rig above. The 39 Cruiser is the yacht for crews who want to spend the day swimming and the evening in a taverna, with just enough sailing in between to feel like sailors.',
    highlights: ['Generous, shaded cockpit', 'Bright saloon and galley', 'Undemanding to handle short-handed'],
    owner: 'partner', photos: [], equipment: {}
  },
  {
    slug: 'jeanneau-sun-odyssey-36i', name: 'Jeanneau Sun Odyssey 36i', builder: 'Jeanneau',
    year: '2007', cat: '3 Cabins', type: 'Monohull', cabins: 3, guests: 6, berths: 6, heads: 1,
    tag: 'For the helmsman',
    blurb: 'The liveliest boat we keep. The Sun Odyssey 36i rewards a sailor who trims — light on the helm, quick to accelerate, and happiest on a reach between the islands. Three cabins keep it practical for six.',
    highlights: ['Responsive, well-balanced helm', 'Slippery in light Ionian mornings', 'Compact enough for tight quays'],
    owner: 'partner', photos: [], equipment: {}
  },
  {
    slug: 'elan-impression-384', name: 'Elan Impression 384', builder: 'Elan Yachts',
    year: '2009', cat: '3 Cabins', type: 'Monohull', cabins: 3, guests: 6, berths: 6, heads: 2,
    tag: 'Performance cruiser',
    blurb: 'Slovenian-built and noticeably better finished than most charter yachts of its era. The Impression 384 combines a performance-oriented hull with a genuine cruising interior — three cabins, two heads, and a cockpit built for long lunches.',
    highlights: ['Two heads across three cabins', 'Sails well off the wind', 'Solid, well-detailed build'],
    owner: 'partner', photos: [], equipment: {}
  },
  {
    slug: 'elan-impression-344', name: 'Elan Impression 344', builder: 'Elan Yachts',
    year: '2006', cat: '3 Cabins', type: 'Monohull', cabins: 3, guests: 6, berths: 6, heads: 1,
    tag: 'Nimble & shallow',
    blurb: 'Small, agile and easy to place — the 344 gets into the coves that bigger yachts have to admire from the entrance. A good choice for six who value anchorages over cabin space.',
    highlights: ['Manoeuvres beautifully under power', 'Reaches shallow, quiet bays', 'Simple systems, few surprises'],
    owner: 'partner', photos: [], equipment: {}
  },
  {
    slug: 'bavaria-42-cruiser', name: 'Bavaria 42 Cruiser', builder: 'Bavaria Yachts',
    year: '2000', cat: '4 Cabins', type: 'Monohull', cabins: 4, guests: 8, berths: 8, heads: 2,
    tag: 'Four cabins, honest value',
    blurb: 'A proven hull from a generation of Bavarias that simply keep going. Four cabins for eight guests at a price that leaves room in the budget for the tavernas — maintained by us to a standard that matters more than the model year.',
    highlights: ['Four separate cabins', 'Hard-wearing, well-sorted systems', 'The value choice for eight'],
    owner: 'partner', photos: [], equipment: {}
  },
  {
    slug: 'bavaria-46-cruiser', name: 'Bavaria 46 Cruiser', builder: 'Bavaria Yachts',
    year: '2010', cat: '4 Cabins', type: 'Monohull', cabins: 4, guests: 10, berths: 10, heads: 2,
    tag: 'Volume for ten',
    blurb: 'Enormous interior volume for its length, and a cockpit that comfortably seats ten around the table. The 46 is our answer for two families sailing together who refuse to compromise on personal space.',
    highlights: ['Ten berths in four cabins', 'Huge cockpit and bathing platform', 'Steady in the afternoon breeze'],
    owner: 'partner', photos: [], equipment: {}
  },
  {
    slug: 'jeanneau-sun-odyssey-469', name: 'Jeanneau Sun Odyssey 469', builder: 'Jeanneau',
    year: '2014', cat: '4 Cabins', type: 'Monohull', cabins: 4, guests: 9, berths: 9, heads: 4,
    tag: 'Four en-suites',
    blurb: 'Twin wheels, a walk-through transom and a head for every cabin. The 469 is the yacht for four couples who want a genuine sailing boat without asking anyone to queue for the shower.',
    highlights: ['Four cabins, four heads', 'Twin helms and open transom', 'Modern deck layout, easy sail handling'],
    owner: 'partner', photos: [], equipment: {}
  },
  {
    slug: 'beneteau-oceanis-50-family', name: 'Beneteau Oceanis 50 Family', builder: 'Beneteau',
    year: '2010', cat: '5 Cabins', type: 'Monohull', cabins: 5, guests: 12, berths: 12, heads: 3,
    tag: 'Big groups',
    blurb: 'Purpose-built for large crews: five cabins plus a skipper cabin, three heads, and deck space that keeps twelve people from ever feeling crowded. The obvious choice for a milestone birthday or a company week afloat.',
    highlights: ['5 + 1 cabins for twelve guests', 'Three heads and generous stowage', 'Wide side decks and a vast cockpit'],
    owner: 'partner', photos: [], equipment: {}
  },
  {
    slug: 'jeanneau-53', name: 'Jeanneau 53', builder: 'Jeanneau',
    year: '2011', cat: '5 Cabins', type: 'Monohull', cabins: 5, guests: 10, berths: 9, heads: 4,
    tag: 'Flagship monohull',
    blurb: 'Our largest monohull, and the one that turns heads on the quay. Five cabins, four heads and a saloon with real headroom — a yacht that feels closer to a small crewed vessel than a bareboat charter.',
    highlights: ['Five cabins, four heads', 'Saloon and galley on a grand scale', 'Ideal with one of our skippers aboard'],
    owner: 'partner', photos: [], equipment: {}
  },
  {
    slug: 'bavaria-51-1', name: 'Bavaria 51.1', builder: 'Bavaria Yachts',
    year: '2018', cat: '5 Cabins', type: 'Monohull', cabins: 5, guests: 12, berths: 12, heads: 3,
    tag: 'Newest monohull',
    blurb: 'The most recent monohull in the fleet, with a modern hull shape that carries its beam aft — more space below, more stability on deck. Five cabins and twelve berths, in a yacht that still feels contemporary underway.',
    highlights: ['Contemporary 2018 interior', 'Twelve berths in five cabins', 'Powerful, well-mannered under sail'],
    owner: 'partner', photos: [], equipment: {}
  },
  {
    slug: 'lagoon-40', name: 'Lagoon 40', builder: 'Lagoon Catamarans',
    year: '2022', cat: 'Catamaran', type: 'Catamaran', cabins: 4, guests: 10, berths: 10, heads: 4,
    tag: 'Newest yacht in the fleet',
    blurb: 'A 2022 catamaran, and the boat guests ask for by name. No heeling, a flat trampoline for the afternoons, a cockpit and saloon on one level, and a head for every cabin. Sailing made effortless for people who came for the swimming.',
    highlights: ['Level sailing — no heel', 'Four cabins, four heads', 'Shallow draft for close-in anchoring'],
    owner: 'partner', photos: [], equipment: {}
  },
  {
    slug: 'lagoon-450-f', name: 'Lagoon 450 F', builder: 'Lagoon Catamarans',
    year: '2019', cat: 'Catamaran', type: 'Catamaran', cabins: 4, guests: 12, berths: 12, heads: 4,
    tag: 'Flybridge catamaran',
    blurb: 'The flybridge changes everything: you steer from above the cockpit, with the whole anchorage laid out in front of you. Four en-suite cabins, twelve berths and an aft deck made for long dinners at anchor.',
    highlights: ['Flybridge helm and sunbed', 'Four en-suite cabins', 'The most space per guest in the fleet'],
    owner: 'partner', photos: [], equipment: {}
  }
];

/* Resolved fleet: Sanity when enabled in sanity.project.json, else STATIC_FLEET. */
export const FLEET = await loadFleet(STATIC_FLEET);

/* ---------------- GALLERY OF EXPERIENCES ----------------
   cat  — filter group
   cs / rs — desktop column & row span in the 6-column mosaic  */
export const GALLERY = [
  { slug:'olive-framed-cove', type:'photo', cat:'coves', cs:4, rs:3, w:1600, h:900,
    title:'Anchored in an olive-framed cove',
    alt:'Sailing yacht at anchor in a turquoise Ionian cove framed by olive trees, on an AIyachts bareboat charter in Greece' },
  { slug:'pastel-dawn-anchorage', type:'photo', cat:'golden', cs:2, rs:3, w:1528, h:1528,
    title:'Pastel dawn',
    alt:'Pastel pink and blue dawn over yachts anchored in a calm Ionian bay' },
  { slug:'dawn-tender-run', type:'photo', cat:'golden', cs:2, rs:4, w:1205, h:1600,
    title:'First light, tender running',
    alt:'Catamaran at anchor on a mirror-calm sea at sunrise with a tender crossing the bay, Ionian Sea, Greece' },
  { slug:'skipper-at-the-helm', type:'photo', cat:'onboard', cs:4, rs:4, w:1600, h:1200,
    title:'The helm, mid-morning',
    alt:'Skipper at the wheel of a charter yacht under the bimini on a bright morning in Greece' },
  { slug:'pebble-beach-cove', type:'photo', cat:'coves', cs:3, rs:2, w:1600, h:900,
    title:'A pebble beach to yourselves',
    alt:'Empty white pebble beach and pine-covered headland beside a clear Ionian bay reached by sailing yacht' },
  { slug:'emerald-bay-anchorage', type:'photo', cat:'coves', cs:3, rs:2, w:1600, h:900,
    title:'Emerald bay, no neighbours',
    alt:'Yacht anchored alone in an emerald green bay framed by trees on a Greek sailing holiday' },
  { slug:'sea-cave-from-the-bow', type:'photo', cat:'coves', cs:3, rs:3, w:1600, h:1200,
    title:'Into the sea cave',
    alt:'View from the bow of a charter yacht towards a limestone sea cave over bright turquoise water in the Ionian' },
  { slug:'harbour-blue-hour', type:'photo', cat:'islands', cs:3, rs:3, w:1600, h:1200,
    title:'Blue hour on the quay',
    alt:'Greek island harbour at blue hour with lit tavernas along the quay and moored boats' },
  { slug:'first-mate', type:'photo', cat:'onboard', cs:2, rs:4, w:675, h:900,
    title:'First mate',
    alt:'An English setter sitting in the cockpit of a charter yacht on a sunny day in Greece' },
  { slug:'crew-of-two', type:'photo', cat:'onboard', cs:4, rs:4, w:900, h:675,
    title:'Crew of two',
    alt:'Crew member in a yellow oilskin jacket with a dog on the deck of a sailing yacht' },
  { slug:'meganisi-anchorage', type:'photo', cat:'coves', cs:2, rs:3, w:900, h:900,
    title:'Meganisi anchorage',
    alt:'Yachts anchored off a pine-covered headland and pebble beach in the Ionian Sea, Greece' },
  { slug:'village-harbour', type:'photo', cat:'islands', cs:2, rs:3, w:900, h:900,
    title:'Village harbour',
    alt:'Colourful Greek island village above a small harbour full of moored sailing yachts' },
  { slug:'from-the-masthead', type:'photo', cat:'coves', cs:2, rs:3, w:953, h:1000,
    title:'From the masthead',
    alt:'Looking down from the masthead onto a sailing yacht moored bow-to a rocky quay over turquoise water' },
  { slug:'under-sail-with-guests', type:'photo', cat:'sailing', cs:2, rs:4, w:1200, h:1600,
    title:'Underway with guests on deck',
    alt:'Charter sailing yacht underway with guests relaxing on the side deck, mountains of the Ionian behind' },
  { slug:'sea-cave-swim-stop', type:'photo', cat:'onboard', cs:4, rs:4, w:1600, h:1200,
    title:'Everyone in the cave',
    alt:'Group of AIyachts charter guests together in a boat inside a blue-lit Ionian sea cave' },
  { slug:'hillside-harbour-view', type:'photo', cat:'islands', cs:3, rs:2, w:1600, h:900,
    title:'The harbour from above',
    alt:'View down from a hillside over a small Greek island harbour with yachts and fishing boats at anchor' },
  { slug:'aerial-turquoise-anchorage', type:'video', cat:'films', cs:3, rs:2, w:568, h:320, duration:'PT12S',
    title:'Aerial — turquoise anchorage',
    alt:'Aerial film over yachts anchored in clear turquoise water in the Ionian Sea' },
  { slug:'aerial-over-the-fleet', type:'video', cat:'films', cs:4, rs:3, w:568, h:320, duration:'PT57S',
    title:'Aerial — over the anchorage',
    alt:'Drone film flying over a busy turquoise anchorage and approaching a charter yacht with guests aboard' },
  { slug:'turquoise-from-the-bow', type:'photo', cat:'onboard', cs:2, rs:3, w:1600, h:1200,
    title:'Off the bow, before the swim',
    alt:'Looking forward over the bow of a yacht into a shallow turquoise bay before a swim stop' },
  { slug:'golden-hour-catamaran', type:'video', cat:'films', cs:2, rs:4, w:478, h:850, duration:'PT46S',
    title:'Golden hour at anchor',
    alt:'Vertical film of a catamaran at anchor on glassy water during golden hour in the Ionian Sea' },
  { slug:'island-village-waterfront', type:'photo', cat:'islands', cs:4, rs:4, w:1600, h:1200,
    title:'The village, from the water',
    alt:'Greek island village of white and terracotta houses on a green hillside seen from a sailing yacht' },
  { slug:'concierge-served', type:'photo', cat:'onboard', cs:2, rs:3, w:843, h:900,
    title:'Concierge, served',
    alt:'A guest holding an Aperol spritz on the deck of a charter yacht in a green Ionian bay' },
  { slug:'charting-the-course', type:'photo', cat:'onboard', cs:2, rs:3, w:957, h:1000,
    title:'Charting the course',
    alt:'Paper chart of the Greek islands with dividers and parallel rule on a yacht saloon table' },
  { slug:'slow-afternoons', type:'photo', cat:'onboard', cs:2, rs:3, w:675, h:900,
    title:'Slow afternoons',
    alt:'Guest relaxing in a hammock on the foredeck of a sailing yacht at anchor in Greece' },
  { slug:'dusk-under-the-boom', type:'photo', cat:'golden', cs:2, rs:4, w:1205, h:1600,
    title:'Dusk, under the boom',
    alt:'View under the boom of a yacht towards a catamaran silhouetted on a mirror-calm sea at dusk' },
  { slug:'sunset-at-anchor', type:'photo', cat:'golden', cs:4, rs:4, w:1600, h:1200,
    title:'Sunset at anchor',
    alt:'Sailing yacht silhouetted at anchor on a hazy golden sea at sunset in the Ionian Islands' }
];

/* six frames for the home-page teaser, all shown at the same size */
export const GALLERY_TEASER = ['olive-framed-cove','sea-cave-from-the-bow','pastel-dawn-anchorage','skipper-at-the-helm','harbour-blue-hour','sea-cave-swim-stop'];

export const GALLERY_FILTERS = [
  { id:'all',      label:'All' },
  { id:'coves',    label:'Hidden coves' },
  { id:'golden',   label:'Golden hour' },
  { id:'islands',  label:'Island life' },
  { id:'onboard',  label:'On board' },
  { id:'sailing',  label:'Under sail' },
  { id:'films',    label:'Films' }
];

/* ---------------- FLEET GROUPS ----------------
   The fleet page renders one block per group, in this order. A yacht
   joins a group through its `owner` field. A group with no yachts still
   renders, with the note below in place of the grid — so the structure
   is visible while the listings are being filled in.            */
export const FLEET_GROUPS = [
  { id: 'own',     label: 'Our Fleet',
    intro: 'Yachts owned and operated by AIyachts — maintained through the winter by the same team that hands them over in the summer.',
    empty: 'Our own yachts are being added to the site. Ask us what is available on your dates and we will send the details by return.' },
  { id: 'partner', label: 'Partners’ Yachts',
    intro: 'Yachts we know boat by boat, run with owners and operators we have worked with for years. Booked, briefed and supported by us exactly as our own.',
    empty: 'Partner yachts are being added to the site.' }
];

/* ---------------- EXPERIENCES ----------------
   The four charter formats. Each opens on the Experiences page.  */
export const EXPERIENCE_TYPES = [
  {
    id: 'one-day', label: 'One day charters', kicker: 'A day on the water',
    img: 'assets/gallery/turquoise-from-the-bow',
    alt: 'Looking forward over the bow of a charter yacht into a shallow turquoise bay before a swim stop',
    paras: ['We offer one-day charters from Lefkada to nearby beaches and scenic spots, ideal for guests who want a taste of sailing and a relaxing day on the water.']
  },
  {
    id: 'retreats', label: 'Two–three day Retreats & Sailing excursions', kicker: 'Two to three days',
    img: 'assets/gallery/meganisi-anchorage',
    alt: 'Yachts anchored off a pine-covered headland and pebble beach in the Ionian Sea, Greece',
    paras: [
      'We offer a selection of three-day retreats focused on themes such as meditation, psychotherapy, astronavigation, and music gatherings.',
      'We also organise two- to three-day sailing excursions on shorter curated routes, inspired by the itinerary examples provided in sample itineraries.'
    ]
  },
  {
    id: 'one-week', label: 'One week charters', kicker: 'Seven days',
    img: 'assets/gallery/under-sail-with-guests',
    alt: 'Charter sailing yacht underway with guests relaxing on the side deck, mountains of the Ionian behind',
    paras: [
      'Our sample itineraries are designed for skippered charters, giving you a sense of what a week of sailing in the Ionian, Saronic, or Cyclades can look like.',
      'For your bareboat charter, we tailor the itinerary entirely to your needs — your preferred pace, the islands you want to explore, and the experiences you value most.'
    ]
  },
  {
    id: 'two-week', label: 'Two week charters', kicker: 'Fourteen days',
    img: 'assets/gallery/sunset-at-anchor',
    alt: 'Sailing yacht silhouetted at anchor on a hazy golden sea at sunset in the Ionian Islands',
    paras: [
      'A two-week charter opens up the full breadth of the Aegean and Ionian, giving you time to explore more islands, slower rhythms, and hidden anchorages that shorter trips can’t reach. These extended routes are ideal for guests who want a deeper sailing experience, combining well-known destinations with quieter bays and lesser-visited villages.',
      'Our sample routes are designed for skippered charters, but if you’re sailing bareboat, we’ll shape a personalised two-week itinerary based on your experience, interests, and the kind of adventure you want to create.'
    ]
  }
];

/* ---------------- YACHTS FOR SALE (brokerage) ----------------
   Empty until AIyachts supply the listings. Each entry:

     { slug:'jeanneau-sun-odyssey-449', name:'Jeanneau Sun Odyssey 449',
       builder:'Jeanneau', year:'2016', type:'Monohull',
       cabins:4, guests:8, berths:8, heads:2,
       loa:'13.76 m', beam:'4.24 m', draft:'2.15 m', engine:'Yanmar 45 hp',
       lying:'Lefkas, Greece', price:'€ 165,000', vat:'VAT paid',
       blurb:'One sentence on the boat.',
       photo:'assets/brokerage/jeanneau-sun-odyssey-449',   // -800/-1600 .jpg + .webp
       photos:[{slug:'…', alt:'…'}]                          // assets/brokerage/gallery/
     }

   Add entries here and the brokerage listing grid, the spec tables and
   the price line all populate. Prices are printed exactly as written. */
export const FOR_SALE = [];

/* ---------------- SPECIAL OFFERS ----------------
   Empty until AIyachts supply them. Each entry:

     { slug:'lagoon-40', label:'Late September, Lefkas base',
       was:'€ 5,400 / week', now:'€ 3,900 / week',
       dates:'20 – 27 September 2026',
       note:'Bareboat, VAT and end cleaning included.' }

   `slug` points at a yacht in FLEET, so the photograph, the cabin count
   and the link to the yacht page all come from there. A yacht that is
   not in FLEET can carry its own name/photo/specs instead.       */
export const SPECIAL_OFFERS = [];
