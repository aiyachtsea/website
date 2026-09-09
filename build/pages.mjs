import { SITE, FLEET, GALLERY, GALLERY_TEASER, TEAM, FLEET_GROUPS, EXPERIENCE_TYPES, FOR_SALE, SPECIAL_OFFERS } from './site.mjs';
import { fleetCards, galleryTiles, galleryFilters, lightbox, teamCards, yachtGallery, equipmentBlock, specTable, listingCards, emptyState, abs, esc } from './components.mjs';

const enquire = (subject) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;

/* =======================================================================
   SHARED BLOCKS
   ======================================================================= */
const greeceMap = (r) => `<div class="greece-map-wrap reveal" id="greeceMap" data-active="ionian">
        <div class="sea-switch" role="group" aria-label="Choose a sea to highlight on the map">
          <span class="sea-switch-thumb" aria-hidden="true"></span>
          <button type="button" class="sea-switch-opt" data-sea="ionian" aria-pressed="true">Ionian</button>
          <button type="button" class="sea-switch-opt" data-sea="aegean" aria-pressed="false">Aegean</button>
        </div>
        <svg class="greece-map" viewBox="0 0 990 980" role="img" aria-label="Map of Greece showing the Ionian and Aegean sailing regions served by AIyachts">
          <defs>
            <radialGradient id="ionianGrad" cx="18%" cy="42%" r="62%">
              <stop offset="0%" stop-color="var(--teal-2)" stop-opacity=".55"/>
              <stop offset="100%" stop-color="var(--teal-2)" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="aegeanGrad" cx="78%" cy="62%" r="68%">
              <stop offset="0%" stop-color="var(--brass)" stop-opacity=".45"/>
              <stop offset="100%" stop-color="var(--brass)" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect class="sea-zone ionian" data-sea="ionian" x="0" y="0" width="430" height="980" fill="url(#ionianGrad)" tabindex="0" role="button" aria-label="Highlight the Ionian Sea"/>
          <rect class="sea-zone aegean" data-sea="aegean" x="430" y="0" width="560" height="980" fill="url(#aegeanGrad)" tabindex="0" role="button" aria-label="Highlight the Aegean Sea"/>
          <image class="landmass-img" href="${r}assets/greece-map.webp" x="0" y="0" width="990" height="980" preserveAspectRatio="xMidYMid meet" pointer-events="none"/>
          <image class="island-overlay ionian" href="${r}assets/greece-map-ionian.webp" x="0" y="0" width="990" height="980" preserveAspectRatio="xMidYMid meet" pointer-events="none"/>
          <image class="island-overlay aegean" href="${r}assets/greece-map-aegean.webp" x="0" y="0" width="990" height="980" preserveAspectRatio="xMidYMid meet" pointer-events="none"/>
          <g class="sea-label ionian-label" aria-hidden="true"><text x="55" y="46">IONIAN</text></g>
          <g class="sea-label aegean-label" aria-hidden="true"><text x="55" y="46">AEGEAN</text></g>
        </svg>

        <a class="sea-card ionian" data-sea="ionian" href="${r}destinations/ionian-sailing.html">
          <p class="eyebrow">Destination · Ionian Sea</p>
          <h3 class="display">Lefkas Base</h3>
          <p>Calm waters, gentle afternoon winds and short, easy distances — ideal for first-time sailors and families. Emerald bays, sheltered anchorages and the quiet charm of Meganisi, Kalamos and Paxos.</p>
          <span class="sea-card-cta">Sail the Ionian <span class="arrow" aria-hidden="true">→</span></span>
        </a>

        <a class="sea-card aegean" data-sea="aegean" href="${r}destinations/aegean-sailing.html">
          <p class="eyebrow">Destination · Aegean Sea</p>
          <h3 class="display">Athens Base</h3>
          <p>Bright white villages, dramatic coastlines and stronger winds for confident sailors. From the Saronic Gulf to the iconic Cyclades — a route through Greece's most recognisable imagery.</p>
          <span class="sea-card-cta">Sail the Aegean <span class="arrow" aria-hidden="true">→</span></span>
        </a>
      </div>`;

const bookingBar = (r) => `<div class="wrap" id="booking">
    <form class="booking" id="bookingForm" action="${r}contact.html" method="get" aria-label="Charter enquiry">
      <div class="b-field">
        <label for="destination">Destination</label>
        <select id="destination" name="destination">
          <option>Either sea</option>
          <option>Ionian — Lefkas base</option>
          <option>Aegean — Athens base</option>
        </select>
      </div>
      <div class="b-field">
        <label for="dateStart">Dates</label>
        <div class="b-dates">
          <input type="date" id="dateStart" name="start" aria-label="Start date">
          <input type="date" id="dateEnd" name="end" aria-label="End date">
        </div>
      </div>
      <div class="b-field">
        <label for="guestCount">Guests</label>
        <div class="b-guests">
          <div class="stepper">
            <button type="button" id="guestMinus" aria-label="Decrease guests">−</button>
            <output id="guestCount" name="guests" for="guestMinus guestPlus">2</output>
            <input type="hidden" name="guests" id="guestsField" value="2">
            <button type="button" id="guestPlus" aria-label="Increase guests">+</button>
          </div>
        </div>
      </div>
      <div class="b-submit" id="bSubmit">
        <button type="submit">Enquire</button>
      </div>
    </form>
  </div>`;

const ctaBand = (r, {eyebrow, title, text, primary, primaryHref, secondary, secondaryHref}) =>
`<section class="cta-band">
    <div class="wrap reveal">
      <p class="eyebrow">${eyebrow}</p>
      <h2 class="display">${title}</h2>
      <p>${text}</p>
      <div class="cta-actions">
        <a class="btn" href="${r}${primaryHref}">${primary} <span class="arrow" aria-hidden="true">→</span></a>
        ${secondary ? `<a class="btn ghost dark" href="${r}${secondaryHref}">${secondary}</a>` : ''}
      </div>
    </div>
  </section>`;

/* =======================================================================
   HOME
   ======================================================================= */
const home = {
  slug: 'index.html', depth: 0, nav: 'index.html', file: 'index.html',
  title: 'AIyachts | Yacht Charter in Greece — Ionian & Aegean Sailing',
  description: 'Bareboat and skippered yacht charter in Greece — sailing yachts and catamarans from our Lefkas and Athens bases across the Ionian and Aegean seas.',
  ogImage: 'assets/img/og-cover.jpg',
  ogAlt: 'Sailing yacht anchored in a turquoise Ionian cove',
  h1: 'Set sail. Live unforgettable.',
  bodyClass: 'home intro-lock',
  extraHead: `<link rel="preload" as="image" href="assets/hero-poster.jpg" fetchpriority="high">
<script>try{if(sessionStorage.getItem('aiy-intro')){document.documentElement.setAttribute('data-intro','done');}else{sessionStorage.setItem('aiy-intro','1');}}catch(e){}</script>`,
  preBody: `<div id="introSplash" aria-hidden="true">
  <img class="intro-logo" src="assets/logo.png" alt="" width="560" height="442" fetchpriority="high">
</div>`,
  schema: [{
    '@type':'ItemList', name:'AIyachts services', itemListElement:[
      {'@type':'ListItem', position:1, name:'Bareboat & skippered yacht charter', url: abs('fleet.html')},
      {'@type':'ListItem', position:2, name:'Yacht management & maintenance', url: abs('services.html')},
      {'@type':'ListItem', position:3, name:'Yacht brokerage & management', url: abs('brokerage.html')}
    ]
  }],
  body: (r) => `
  <section class="hero">
    <div class="hero-photo-wrap">
      <video class="hero-photo" autoplay muted loop playsinline poster="${r}assets/hero-poster.jpg" aria-hidden="true">
        <source src="${r}assets/hero-video.mp4" type="video/mp4">
      </video>
    </div>
    <div class="hero-body">
      <div class="hero-inner wrap">
        <h1 class="hero-h1">
          <span class="line">Set sail.</span>
          <span class="line">Live <em>unforgettable</em>.</span>
        </h1>
        <p class="lede">From the deep blues of the Aegean to the emerald bays of the Ionian — hidden coves, timeless island life, and sunsets that feel almost unreal.</p>
        <div class="hero-actions">
          <a href="#booking" class="btn pill">Plan your voyage <span class="arrow" aria-hidden="true">→</span></a>
          <a href="${r}fleet.html" class="hero-link">See the fleet <span class="arrow" aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
  </section>

  ${bookingBar(r)}

  <section id="about">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">About AIyachts</p>
        <h2 class="display">Two seas. One philosophy.</h2>
      </div>
      <div class="about-grid">
        <div class="about-copy reveal">
          <p>AIyachts brings together the spirit of the Aegean and Ionian seas with a modern, guest-centred approach to sailing. We operate across Greece — from Athens and Lefkas to Corfu and Paros — offering seamless chartering, brokerage and yacht-management services supported by a network of trusted local partners.</p>
          <p>What sets us apart is the blend of decades of hands-on maritime experience with academic expertise in tourism and customer experience — a company culture that is professional, warm, and deeply committed to the craft of sailing.</p>
          <div class="quote-block">
            <p>“Our mission is simple: to make every connection — guest, partner, or owner — feel valued, supported, and inspired by our love for the sea.”</p>
            <cite>AIyachts, founding principle</cite>
          </div>
          <p class="about-more"><a class="inline-link" href="${r}about.html">More about who we are <span class="arrow" aria-hidden="true">→</span></a></p>
        </div>
      </div>
    </div>
  </section>

  <section id="bases" class="band-raised">
    <div class="wrap reveal">
      <div class="section-head">
        <p class="eyebrow">Two Bases, Two Characters</p>
        <h2 class="display">Choose your sea.</h2>
        <p>Two very different sailing grounds, ninety minutes apart by road. Switch the map to explore where we sail — then open the sea that suits your crew.</p>
      </div>
      ${greeceMap(r)}
      <p class="section-foot"><a class="inline-link" href="${r}destinations.html">Compare both destinations in detail <span class="arrow" aria-hidden="true">→</span></a></p>
    </div>
  </section>

  <section id="fleet">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Bareboat &amp; Skippered Charters</p>
        <h2 class="display">Our fleet</h2>
        <p>From nimble two-cabin cruisers to spacious catamarans — every yacht is maintained to a standard worth trusting with your holiday.</p>
      </div>
    </div>
    <div class="fleet-band reveal">
      <img src="${r}assets/img/fleet-band.jpg" alt="AIyachts charter yachts moored stern-to on a Greek island quay" width="1500" height="1500" loading="lazy" decoding="async">
      <p class="fleet-band-cap">Our own boats, in our own waters</p>
    </div>
    <div class="wrap">
      <div class="fleet-grid reveal-stagger">
        ${fleetCards(FLEET.filter(f => ['lagoon-40','lagoon-450-f','bavaria-51-1','jeanneau-sun-odyssey-469','beneteau-oceanis-50-family','bavaria-40-cruiser'].includes(f.slug)), 0)}
      </div>
      <div class="fleet-cta">
        <a href="${r}fleet.html" class="btn">View all 14 yachts <span class="arrow" aria-hidden="true">→</span></a>
      </div>
    </div>
  </section>

  <section id="experiences" class="band-raised xg-section">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Gallery of Experiences</p>
        <h2 class="display">Life aboard.</h2>
        <p>Unfiltered moments from real charters — the coves, the crew, and the guests who came back for more.</p>
      </div>
      <div class="xg-grid xg-teaser reveal-stagger" data-fallback="experiences.html">
        ${galleryTiles(GALLERY_TEASER.map(s => GALLERY.find(g => g.slug === s)), 0, {spans:{cs:2,rs:3}})}
      </div>
      <div class="fleet-cta">
        <a href="${r}experiences.html" class="btn">Open the full gallery <span class="arrow" aria-hidden="true">→</span></a>
      </div>
    </div>
  </section>

  <section id="services">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Our Services</p>
        <h2 class="display">Charter, manage, maintain.</h2>
        <p>Three things we do properly — and a set of details around them that we plan with you before you fly.</p>
      </div>
      <div class="service-grid reveal-stagger">
        <div class="service-card">
          <svg class="service-icon" viewBox="0 0 40 40" aria-hidden="true"><path d="M6 30h28l-4 6H10l-4-6Z"/><path d="M20 4v26M20 8l10 22M20 8L10 30"/></svg>
          <h3>Chartering</h3>
          <p>We guide you to the yacht that suits your budget, your crew and your destination — from classic, affordable boats to modern premium vessels.</p>
        </div>
        <div class="service-card">
          <svg class="service-icon" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="9"/><path d="M20 4v6M20 30v6M4 20h6M30 20h6"/></svg>
          <h3>Management</h3>
          <p>Full management of your yacht — chartering, berthing, services and maintenance under a plan built with you, and reported transparently.</p>
        </div>
        <div class="service-card">
          <svg class="service-icon" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 6v28M8 13l24 14M32 13L8 27"/></svg>
          <h3>Maintenance</h3>
          <p>Antifouling, hull polishing, engine servicing, windlass maintenance and sail care — winterisation that leaves the boat ready for the season.</p>
        </div>
      </div>
      <p class="section-foot"><a class="inline-link" href="${r}services.html">All of our services <span class="arrow" aria-hidden="true">→</span></a></p>
    </div>
  </section>

  <section id="brokerage" class="band-raised">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Brokerage &amp; Management</p>
        <h2 class="display">For owners &amp; investors.</h2>
      </div>
      <div class="split reveal">
        <div class="split-panel">
          <p class="eyebrow">B2C · Private buyers &amp; sellers</p>
          <h3 class="display">Investment &amp; Brokerage</h3>
          <p>A curated selection of well-maintained sailing and motor yachts, handpicked through trusted owner relationships.</p>
          <ul class="split-list">
            <li><b>Yachts for sale</b><span>Curated listings</span></li>
            <li><b>Buyer support</b><span>Selection to paperwork</span></li>
            <li><b>Seller representation</b><span>Listing to close</span></li>
          </ul>
          <a href="${r}brokerage.html" class="btn ghost dark">Explore brokerage</a>
        </div>
        <div class="split-panel">
          <p class="eyebrow">B2B · Charter companies &amp; owners</p>
          <h3 class="display">Yacht Management</h3>
          <p>Year-round support for owners — from berthing and on-season operations to winterisation and deliveries.</p>
          <ul class="split-list">
            <li><b>Pontoon berthing</b><span>Private, managed</span></li>
            <li><b>Operational support</b><span>On-season</span></li>
            <li><b>Yacht deliveries</b><span>Greece &amp; Mediterranean</span></li>
            <li><b>Winterisation</b><span>Off-season care</span></li>
          </ul>
          <a href="${r}brokerage.html" class="btn ghost dark">Partner with us</a>
        </div>
      </div>
    </div>
  </section>

  ${ctaBand(r, {
    eyebrow:'Ready when you are',
    title:'Tell us where you’d like to wake up.',
    text:'Send us your dates and the size of your crew. We will come back with the yachts that fit, the route we would sail, and an honest price.',
    primary:'Start an enquiry', primaryHref:'contact.html',
    secondary:'Browse the fleet', secondaryHref:'fleet.html'
  })}
`
};


/* =======================================================================
   ABOUT
   ======================================================================= */
const about = {
  slug: 'about.html', depth: 0, nav: 'about.html', file: 'about.html',
  title: 'About us | AIyachts — Greek Yacht Charter & Brokerage',
  description: 'AIyachts is a Greek company with a long background in yachting — chartering, brokerage and yacht maintenance, run by Afroditi Kazakou and Ilias Tzannetoulakos.',
  ogImage: 'assets/img/og-about.jpg',
  crumbs: [{label:'About us', href:'about.html'}],
  h1: 'Two seas. One philosophy.',
  hero: {
    img: 'assets/gallery/ionian-catamaran-anchorage',
    eyebrow: 'About us',
    h1: 'Two seas.<br>One philosophy.',
    lede: 'A Greek company with great background in the yachting business. Offering high-quality services in chartering, brokerage and yacht maintenance.'
  },
  schema: [
    {
      '@type':'AboutPage', '@id': abs('about.html') + '#aboutpage',
      name: 'About AIyachts', mainEntity: { '@id': SITE.origin + '/#organization' }
    },
    ...TEAM.map(m => ({
      '@type':'Person', '@id': abs('about.html') + '#' + m.slug,
      name: m.name, jobTitle: m.role,
      image: abs('assets/team/' + m.slug + '-800.jpg'),
      worksFor: { '@id': SITE.origin + '/#organization' }
    }))
  ],
  body: (r) => `
  <section class="prose-section">
    <div class="wrap">
      <div class="prose reveal">
        <p class="lead">A Greek company with great background in the yachting business. Offering high-quality services in chartering, brokerage and yacht maintenance.</p>
        <p class="motto">&ldquo;Set Sail for Unforgettable Memories&rdquo;</p>
        <p>AIyachts brings together the spirit of the Aegean and Ionian seas with a modern, guest-centred approach to sailing. We operate across Greece &mdash; from Athens and Lefkas to Corfu and Paros &mdash; offering seamless chartering, brokerage and yacht-management services supported by a network of trusted local partners.</p>
        <p>What sets us apart is the blend of decades of hands-on maritime experience with academic expertise in tourism and customer experience. That combination shapes everything: how a yacht is prepared before you arrive, how a briefing is given, how quickly a phone is answered when you are three islands away from base. It is a company culture that is professional, warm, and deeply committed to the craft of sailing.</p>
        <div class="quote-block">
          <p>&ldquo;Our mission is simple: to make every connection &mdash; guest, partner, or owner &mdash; feel valued, supported, and inspired by our love for the sea.&rdquo;</p>
          <cite>AIyachts, founding principle</cite>
        </div>
      </div>
    </div>
  </section>

  <section class="band-raised">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">The name</p>
        <h2 class="display">What the &ldquo;AI&rdquo; stands for.</h2>
      </div>
      <div class="name-split reveal">
        <div class="name-card">
          <p class="eyebrow">Two seas</p>
          <h3 class="display">Aegean &amp; Ionian</h3>
          <p>The two sailing grounds we work in, and the two bases we run &mdash; Athens for the Aegean, Lefkas for the Ionian.</p>
        </div>
        <div class="name-card">
          <p class="eyebrow">Two people</p>
          <h3 class="display">Afroditi &amp; Ilias</h3>
          <p>The two founders behind the company. The initials are a coincidence we decided to keep.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="team">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Who we are</p>
        <h2 class="display">The people behind AIyachts.</h2>
      </div>
      <div class="cv-list">
        ${teamCards(0)}
      </div>
    </div>
  </section>

  <section class="band-raised">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">What we do</p>
        <h2 class="display">Three ways we work with the sea.</h2>
        <p>Charter, brokerage and maintenance are three sides of the same business. The yachts we look after are the yachts we charter, and the standard is the same either way.</p>
      </div>
      <div class="pillar-grid reveal-stagger">
        <article class="pillar">
          <span class="pillar-num" aria-hidden="true">01</span>
          <h3 class="display">Chartering</h3>
          <p>Bareboat and skippered charters on sailing yachts and catamarans, from two-cabin cruisers to five-cabin flagships. Ionian departures from Lefkas, Aegean departures from Athens.</p>
          <a class="inline-link" href="${r}fleet.html">See the fleet <span class="arrow" aria-hidden="true">&rarr;</span></a>
        </article>
        <article class="pillar">
          <span class="pillar-num" aria-hidden="true">02</span>
          <h3 class="display">Management</h3>
          <p>Full management of privately owned yachts &mdash; chartering, berthing, services and maintenance, planned with the owner and delivered with consistency and transparency.</p>
          <a class="inline-link" href="${r}services.html">Our services <span class="arrow" aria-hidden="true">&rarr;</span></a>
        </article>
        <article class="pillar">
          <span class="pillar-num" aria-hidden="true">03</span>
          <h3 class="display">Brokerage</h3>
          <p>A curated list of sailing and motor yachts for sale, and guidance for owners and new investors building a plan for a yacht of their own.</p>
          <a class="inline-link" href="${r}brokerage.html">Brokerage &amp; investment <span class="arrow" aria-hidden="true">&rarr;</span></a>
        </article>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="feature-split reveal">
        <div class="feature-media">
          <picture>
            <source type="image/webp" srcset="${r}assets/gallery/skipper-at-the-helm-800.webp 800w, ${r}assets/gallery/skipper-at-the-helm-1600.webp 1600w" sizes="(max-width:900px) 100vw, 50vw">
            <img src="${r}assets/gallery/skipper-at-the-helm-800.jpg" alt="AIyachts skipper at the wheel of a charter yacht under the bimini" width="1600" height="1200" loading="lazy" decoding="async">
          </picture>
        </div>
        <div class="feature-copy">
          <p class="eyebrow">The difference</p>
          <h2 class="display">Small enough to know your name.</h2>
          <p>Large fleets run on scripts. We run on relationships &mdash; with the guests who come back, with the owners who trust us with their boats, and with the local partners who make a week ashore as good as the week afloat.</p>
          <ul class="tick-list">
            <li>Yachts maintained by the same people who charter them</li>
            <li>Honest advice about which sea and which boat suits your crew</li>
            <li>A briefing that respects your experience, whatever level it is</li>
            <li>Someone reachable while you are out there, not just before you book</li>
            <li>A network of trusted partners across the Ionian and the Aegean</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  ${ctaBand(r, {
    eyebrow:'Say hello',
    title:'Come and sail with us.',
    text:'Tell us your dates and your crew, and we will tell you honestly which of our yachts — and which of our seas — will make the best week.',
    primary:'Contact the team', primaryHref:'contact.html',
    secondary:'Where we sail', secondaryHref:'destinations.html'
  })}
`
};

/* =======================================================================
   DESTINATIONS (hub)
   ======================================================================= */
const destinations = {
  slug: 'destinations.html', depth: 0, nav: 'destinations.html', file: 'destinations.html',
  title: 'Destinations & Itineraries | Sailing the Ionian & Aegean',
  description: 'Sail the Ionian from Lefkas or the Aegean from Athens. Compare the winds, the distances and the islands on each route, and pick the base that suits your crew.',
  ogImage: 'assets/img/og-destinations.jpg',
  crumbs: [{label:'Destinations & Itineraries', href:'destinations.html'}],
  h1: 'Destinations & itineraries.',
  hero: {
    img: 'assets/gallery/hillside-harbour-view',
    eyebrow: 'Destinations & Itineraries',
    h1: 'Destinations<br>&amp; itineraries.',
    lede: 'Two very different sailing grounds, ninety minutes apart by road. One is sheltered, green and forgiving. The other is bright, open and windy. Both come with a sample route you can sail as written, or take apart and rebuild with us.'
  },
  schema: [{
    '@type':'FAQPage', '@id': abs('destinations.html') + '#faq',
    mainEntity: [
      {'@type':'Question', name:'Is the Ionian or the Aegean better for a first bareboat charter?',
       acceptedAnswer:{'@type':'Answer', text:'The Ionian. Distances between anchorages are short, the islands shelter you from open sea, and the afternoon breeze is usually a comfortable force 3–5 that dies away in the evening. The Aegean rewards crews who already have miles behind them.'}},
      {'@type':'Question', name:'When is the best time to sail in Greece?',
       acceptedAnswer:{'@type':'Answer', text:'May, June, September and early October give warm water, lighter winds and quieter anchorages. July and August are hottest and busiest, and in the Aegean bring the meltemi — a strong, steady north wind that can blow for days.'}},
      {'@type':'Question', name:'How far do you sail in a typical day?',
       acceptedAnswer:{'@type':'Answer', text:'In the Ionian, two to four hours of sailing is normal — often 10 to 20 nautical miles between anchorages. In the Aegean, passages between island groups are longer, typically 25 to 40 nautical miles.'}},
      {'@type':'Question', name:'Do I need a sailing licence to charter a yacht in Greece?',
       acceptedAnswer:{'@type':'Answer', text:'For a bareboat charter Greek regulations require a recognised skipper qualification and a second competent crew member. If you do not hold a licence, or simply prefer not to be responsible for the boat, we can provide a professional skipper.'}}
    ]
  }],
  body: (r) => `
  <section>
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">The map</p>
        <h2 class="display">Where we sail.</h2>
        <p>Switch the map between the two seas, then open the region that fits your week. Both bases are supported by the same team, the same fleet standards and the same local network.</p>
      </div>
      ${greeceMap(r)}
    </div>
  </section>

  <section class="band-raised">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Side by side</p>
        <h2 class="display">Ionian or Aegean?</h2>
        <p>The honest comparison we give on the phone, written down.</p>
      </div>
      <div class="compare reveal">
        <table class="compare-table">
          <caption class="sr-only">Comparison of sailing conditions in the Ionian and Aegean seas</caption>
          <thead>
            <tr><th scope="col">&nbsp;</th><th scope="col">Ionian · from Lefkas</th><th scope="col">Aegean · from Athens</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">Wind</th><td>Afternoon sea breeze, typically force 3–5, calm mornings and evenings</td><td>Meltemi from the north in high summer, force 4–7 for days at a time</td></tr>
            <tr><th scope="row">Distances</th><td>Short hops, 10–20 nautical miles between anchorages</td><td>Longer passages, 25–40 nautical miles between island groups</td></tr>
            <tr><th scope="row">Landscape</th><td>Green hills, cypress and olive, white pebble coves</td><td>Bare rock, white cubic villages, dazzling light</td></tr>
            <tr><th scope="row">Water</th><td>Emerald and turquoise, often glassy in the morning</td><td>Deep cobalt blue, livelier surface</td></tr>
            <tr><th scope="row">Best for</th><td>First-timers, families with children, relaxed crews</td><td>Experienced sailors, crews who want miles and iconic islands</td></tr>
            <tr><th scope="row">Season</th><td>May to October, gentle through the shoulder months</td><td>May to October, windiest in July and August</td></tr>
          </tbody>
        </table>
      </div>
      <div class="dest-cards reveal-stagger">
        <a class="dest-card" href="${r}destinations/ionian-sailing.html">
          <picture>
            <source type="image/webp" srcset="${r}assets/gallery/emerald-bay-anchorage-800.webp 800w, ${r}assets/gallery/emerald-bay-anchorage-1600.webp 1600w" sizes="(max-width:820px) 100vw, 50vw">
            <img src="${r}assets/gallery/emerald-bay-anchorage-800.jpg" alt="Yacht anchored in an emerald Ionian bay framed by trees" width="1600" height="900" loading="lazy" decoding="async">
          </picture>
          <div class="dest-card-body">
            <p class="eyebrow">Lefkas base</p>
            <h3 class="display">Sailing the Ionian</h3>
            <p>Meganisi, Kalamos, Kastos, Ithaca, Kefalonia, Paxos — sheltered water, short distances and a taverna quay at the end of every day.</p>
            <span class="sea-card-cta">Open the Ionian guide <span class="arrow" aria-hidden="true">→</span></span>
          </div>
        </a>
        <a class="dest-card" href="${r}destinations/aegean-sailing.html">
          <picture>
            <source type="image/webp" srcset="${r}assets/gallery/pastel-dawn-anchorage-800.webp 800w, ${r}assets/gallery/pastel-dawn-anchorage-1600.webp 1600w" sizes="(max-width:820px) 100vw, 50vw">
            <img src="${r}assets/gallery/pastel-dawn-anchorage-800.jpg" alt="Yachts at anchor at dawn in a calm Greek bay" width="1528" height="1528" loading="lazy" decoding="async">
          </picture>
          <div class="dest-card-body">
            <p class="eyebrow">Athens base</p>
            <h3 class="display">Sailing the Aegean</h3>
            <p>The Saronic Gulf for a gentle first week, the Cyclades for the Greece of the postcards — Hydra, Serifos, Sifnos, Paros, Naxos.</p>
            <span class="sea-card-cta">Open the Aegean guide <span class="arrow" aria-hidden="true">→</span></span>
          </div>
        </a>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Before you book</p>
        <h2 class="display">Questions we are asked every week.</h2>
      </div>
      <div class="faq reveal">
        <details><summary>Is the Ionian or the Aegean better for a first bareboat charter?</summary><p>The Ionian. Distances between anchorages are short, the islands shelter you from open sea, and the afternoon breeze is usually a comfortable force 3–5 that dies away in the evening. The Aegean rewards crews who already have miles behind them.</p></details>
        <details><summary>When is the best time to sail in Greece?</summary><p>May, June, September and early October give warm water, lighter winds and quieter anchorages. July and August are hottest and busiest, and in the Aegean bring the meltemi — a strong, steady north wind that can blow for days.</p></details>
        <details><summary>How far do you sail in a typical day?</summary><p>In the Ionian, two to four hours of sailing is normal — often 10 to 20 nautical miles between anchorages. In the Aegean, passages between island groups are longer, typically 25 to 40 nautical miles, so the days have more sailing in them.</p></details>
        <details><summary>Do I need a sailing licence to charter a yacht in Greece?</summary><p>For a bareboat charter Greek regulations require a recognised skipper qualification and a second competent crew member. If you do not hold a licence, or simply prefer not to be responsible for the boat, we can provide a professional skipper — many of our guests do exactly that on their first week.</p></details>
        <details><summary>Can we sail one way, from one base to the other?</summary><p>Ask us. One-way itineraries between sailing areas are possible on some yachts and some dates, and we will tell you straight away whether it works for the week you have in mind.</p></details>
      </div>
    </div>
  </section>

  ${ctaBand(r, {
    eyebrow:'Not sure yet?',
    title:'Tell us your crew, we’ll tell you the sea.',
    text:'Send us the dates, the number of people and how much sailing you actually want to do. We will recommend the base, the yacht and the route.',
    primary:'Ask for a recommendation', primaryHref:'contact.html',
    secondary:'See the fleet', secondaryHref:'fleet.html'
  })}
`
};

/* =======================================================================
   FLEET (hub)
   ======================================================================= */
const fleetFilters = [
  { id:'all',       label:'All yachts' },
  { id:'catamaran', label:'Catamarans' },
  { id:'small',     label:'2–3 cabins' },
  { id:'mid',       label:'4 cabins' },
  { id:'large',     label:'5 cabins' }
];
const fleetGroup = y => y.type === 'Catamaran' ? 'catamaran' : (y.cabins <= 3 ? 'small' : y.cabins === 4 ? 'mid' : 'large');

const fleet = {
  slug: 'fleet.html', depth: 0, nav: 'fleet.html', file: 'fleet.html',
  title: 'Yacht Charter Fleet in Greece | Sailing Yachts & Catamarans',
  description: 'Fourteen sailing yachts and catamarans for bareboat or skippered charter in Greece — from a two-cabin cruiser to five-cabin flagships and Lagoon catamarans.',
  ogImage: 'assets/img/og-fleet.jpg',
  crumbs: [{label:'Fleet', href:'fleet.html'}],
  h1: 'The fleet',
  hero: {
    img: 'assets/gallery/marina-line-up',
    eyebrow: 'Bareboat & Skippered Charters',
    h1: 'The fleet.',
    lede: 'A selection of yachts ranging from two-cabin to five-cabin cruiser monohulls, plus a flybridge catamaran that sleeps twelve. Each one is maintained by the very people who charter it.'
  },
  schema: [{
    '@type':'ItemList', '@id': abs('fleet.html') + '#fleet',
    name: 'AIyachts charter fleet', numberOfItems: FLEET.length,
    itemListElement: FLEET.map((y,i) => ({
      '@type':'ListItem', position: i+1, name: y.name, url: abs('fleet/' + y.slug + '.html')
    }))
  }],
  body: (r) => `
  <section class="fleet-intro">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">The boats</p>
        <h2 class="display">Choose the yacht, then the sea.</h2>
        <p>Monohulls for crews who want to sail, catamarans for guests who want space. Filter by size, or tell us your request and we will recommend the best option for you.</p>
      </div>
      <div class="xg-filters fleet-filters reveal" role="group" aria-label="Filter the fleet" id="fleetFilters">
        ${fleetFilters.map((f,i) => `<button type="button" class="xg-chip" data-filter="${f.id}" aria-pressed="${i===0}">${f.label}</button>`).join('\n        ')}
      </div>
    </div>
  </section>

  ${FLEET_GROUPS.map((g, gi) => {
    const boats = FLEET.filter(y => (y.owner || 'partner') === g.id);
    return `<section class="fleet-group${gi % 2 ? ' band-raised' : ''}" data-fleet-group="${g.id}" id="${g.id === 'own' ? 'our-fleet' : 'partner-yachts'}">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">${gi === 0 ? '01' : '02'} · ${boats.length ? `${boats.length} ${boats.length === 1 ? 'yacht' : 'yachts'}` : 'Coming soon'}</p>
        <h2 class="display">${g.label}</h2>
        <p>${g.intro}</p>
      </div>
      ${boats.length ? `<div class="fleet-grid full reveal-stagger" data-fleet-grid>
        ${boats.map(y => `<article class="yacht-card" data-cat="${fleetGroup(y)}">
      <a class="yacht-link" href="${r}fleet/${y.slug}.html">
        <div class="yacht-art">
          <img src="${r}assets/fleet/${y.slug}.jpg" alt="${esc(y.name)} — ${esc(y.cat.toLowerCase())} charter yacht available with AIyachts in Greece" width="640" height="380" loading="lazy" decoding="async">
          <span class="yacht-flag">${esc(y.type)}</span>
        </div>
        <div class="yacht-body">
          <p class="yacht-cat">${esc(y.cat)} · ${y.year}</p>
          <h3 class="display">${esc(y.name)}</h3>
          <p class="yacht-tag">${esc(y.tag)}</p>
          <div class="yacht-specs"><span>${y.guests} guests</span><span>${y.berths} berths</span><span>${y.heads} ${y.heads>1?'heads':'head'}</span></div>
          <span class="yacht-more">View yacht <span class="arrow" aria-hidden="true">→</span></span>
        </div>
      </a>
    </article>`).join('\n        ')}
      </div>
      <p class="fleet-group-empty" data-fleet-empty hidden>No yachts in this category match that filter.</p>` : emptyState({
        title: 'Being added', text: g.empty, cta: 'Ask what is available', href: 'contact.html', depth: 0
      })}
    </div>
  </section>`;
  }).join('\n\n  ')}

  <section>
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">How chartering works</p>
        <h2 class="display">From enquiry to sail away.</h2>
      </div>
      <ol class="steps reveal-stagger">
        <li><span class="step-num">01</span><h3>Tell us your week</h3><p>Dates, crew size, experience level and whether you want to sail hard or swim a lot. We answer with the yachts that genuinely fit — not the one we most want to fill.</p></li>
        <li><span class="step-num">02</span><h3>Choose bareboat or skippered</h3><p>Bareboat if you hold a recognised licence and a competent second. Skippered if you would rather learn, relax, or hand the responsibility to someone who knows every bay.</p></li>
        <li><span class="step-num">03</span><h3>Plan the extras</h3><p>Provisioning, transfers, a hostess, a route worth following. We agree it all before you fly, so the first day is spent swimming rather than shopping.</p></li>
        <li><span class="step-num">04</span><h3>Board and go</h3><p>A proper handover at the base, a briefing pitched at your experience, and a number that a real person answers for the whole week you are away.</p></li>
      </ol>
    </div>
  </section>

  ${ctaBand(r, {
    eyebrow:'Availability',
    title:'Ask us what is free on your dates.',
    text:'Send the dates and the number of guests. We will come back with the yachts still available, the difference between them, and what each one costs.',
    primary:'Check availability', primaryHref:'contact.html',
    secondary:'Special offers', secondaryHref:'special-offers.html'
  })}
`
};

/* =======================================================================
   EXPERIENCES — the gallery
   ======================================================================= */
const experiences = {
  slug: 'experiences.html', depth: 0, nav: 'experiences.html', file: 'experiences.html',
  title: 'Charter Experiences in Greece | Day Sails to Two-Week Charters',
  description: 'One-day charters, two- and three-day retreats, one-week and two-week sailing itineraries in the Ionian and Aegean — plus photographs and films from real charters.',
  ogImage: 'assets/img/og-gallery.jpg',
  crumbs: [{label:'Experiences', href:'experiences.html'}],
  h1: 'Life aboard.',
  bodyClass: 'has-gallery',
  hero: {
    img: 'assets/gallery/sea-cave-from-the-bow',
    eyebrow: 'Charter Experiences',
    h1: 'Life aboard.',
    lede: 'A day on the water, a themed retreat, a week between the islands or a fortnight that reaches the quiet ones. Four ways to sail with us — and the photographs to go with them.'
  },
  schema: [
    {
      '@type':'ImageGallery', '@id': abs('experiences.html') + '#gallery',
      name: 'AIyachts gallery of experiences',
      description: 'Photographs and films from AIyachts sailing charters in the Ionian Sea, Greece.',
      associatedMedia: GALLERY.filter(g => g.type === 'photo').map(g => ({
        '@type':'ImageObject',
        contentUrl: abs('assets/gallery/' + g.slug + '-1600.jpg'),
        thumbnailUrl: abs('assets/gallery/' + g.slug + '-800.jpg'),
        name: g.title, caption: g.alt, description: g.alt,
        width: g.w, height: g.h, creditText: SITE.name,
        copyrightNotice: '© ' + SITE.name, acquireLicensePage: abs('contact.html')
      }))
    },
    ...GALLERY.filter(g => g.type === 'video').map(g => ({
      '@type':'VideoObject',
      name: g.title + ' — AIyachts, Ionian Sea',
      description: g.alt,
      thumbnailUrl: [abs('assets/gallery/' + g.slug + '-poster-1600.jpg')],
      contentUrl: abs('assets/gallery/' + g.slug + '.mp4'),
      uploadDate: '2026-08-12',
      duration: g.duration,
      publisher: { '@id': SITE.origin + '/#organization' }
    }))
  ],
  body: (r) => `
  <section id="formats">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Four ways to sail</p>
        <h2 class="display">Choose the length of your week.</h2>
        <p>Open any of the four to see what it involves. Every one of them can be sailed bareboat or with one of our skippers.</p>
      </div>
      <div class="formats reveal-stagger">
        ${EXPERIENCE_TYPES.map((x, i) => `<details class="format" id="${x.id}"${i === 0 ? ' open' : ''}>
          <summary>
            <span class="format-n" aria-hidden="true">${String(i+1).padStart(2,'0')}</span>
            <span class="format-heads">
              <span class="format-kicker">${esc(x.kicker)}</span>
              <span class="format-title display">${esc(x.label)}</span>
            </span>
            <span class="format-chev" aria-hidden="true"></span>
          </summary>
          <div class="format-body">
            <div class="format-media">
              <picture>
                <source type="image/webp" srcset="${r}${x.img}-800.webp 800w, ${r}${x.img}-1600.webp 1600w" sizes="(max-width:820px) 100vw, 42vw">
                <img src="${r}${x.img}-800.jpg" alt="${esc(x.alt)}" width="1600" height="1200" loading="lazy" decoding="async">
              </picture>
            </div>
            <div class="format-copy">
              ${x.paras.map(t => `<p>${t}</p>`).join('\n              ')}
              <div class="format-actions">
                <a class="btn ghost dark" href="${r}contact.html">Enquire about this <span class="arrow" aria-hidden="true">→</span></a>
                <a class="inline-link" href="${r}destinations.html">Sample itineraries <span class="arrow" aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
        </details>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="xg-section band-raised">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">${GALLERY.length} frames · Ionian Sea</p>
        <h2 class="display">Real charters, real weather, real people.</h2>
        <p>Filter the wall, or open any frame full screen. Films play in the viewer.</p>
      </div>
      ${galleryFilters()}
      <div class="xg-grid reveal-stagger" id="xgGrid">
        ${galleryTiles(GALLERY, 0)}
      </div>
      <p class="xg-empty" id="xgEmpty" hidden>Nothing in this category yet.</p>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">What you are looking at</p>
        <h2 class="display">A week, roughly.</h2>
        <p>Most of these frames come from the same stretch of the southern Ionian — the water between Lefkas, Meganisi, Kalamos and Ithaca, where the coves are deep, the sea caves are cool, and the villages light up at dusk.</p>
      </div>
      <div class="pillar-grid reveal-stagger">
        <article class="pillar">
          <span class="pillar-num" aria-hidden="true">01</span>
          <h3 class="display">Mornings are glass</h3>
          <p>The wind sleeps until noon. That is when you swim off the stern, run the tender ashore for bread, and motor a couple of miles to the next bay before anyone else wakes up.</p>
        </article>
        <article class="pillar">
          <span class="pillar-num" aria-hidden="true">02</span>
          <h3 class="display">Afternoons are sailing</h3>
          <p>The sea breeze arrives around one o'clock and builds through the afternoon — enough to switch the engine off, sheet in, and cover the distance to the evening's anchorage properly under sail.</p>
        </article>
        <article class="pillar">
          <span class="pillar-num" aria-hidden="true">03</span>
          <h3 class="display">Evenings are ashore</h3>
          <p>Stern-to on a village quay, or anchored alone with a line to a tree. Either way the light goes gold, then pink, and the day ends at a table twenty metres from the boat.</p>
        </article>
      </div>
    </div>
  </section>

  ${ctaBand(r, {
    eyebrow:'Your turn',
    title:'This could be your photo roll.',
    text:'Pick a week, pick a yacht, and we will handle everything between the airport and the anchorage.',
    primary:'Plan your charter', primaryHref:'contact.html',
    secondary:'Browse the fleet', secondaryHref:'fleet.html'
  })}

  ${lightbox()}
`
};

/* =======================================================================
   SERVICES
   ======================================================================= */
const services = {
  slug: 'services.html', depth: 0, nav: 'services.html', file: 'services.html',
  title: 'Our Services | Chartering, Yacht Management & Maintenance',
  description: 'Chartering, full yacht management and winterisation in Greece — plus private charters, provisioning and airport transfers, arranged before you fly.',
  ogImage: 'assets/img/og-services.jpg',
  crumbs: [{label:'Services', href:'services.html'}],
  h1: 'Our services.',
  hero: {
    img: 'assets/gallery/under-sail-with-guests',
    eyebrow: 'Services',
    h1: 'Our services.',
    lede: 'Three things we do properly: we charter yachts, we manage them for their owners, and we look after them through the winter.'
  },
  schema: [
    {'@type':'Service', name:'Yacht chartering', serviceType:'Yacht charter',
     provider:{'@id': SITE.origin + '/#organization'}, areaServed:{'@type':'Country', name:'Greece'},
     description:'Bareboat and skippered yacht charter in the Ionian and Aegean, matched to budget, crew size and destination.'},
    {'@type':'Service', name:'Yacht management', serviceType:'Yacht management',
     provider:{'@id': SITE.origin + '/#organization'}, areaServed:{'@type':'Country', name:'Greece'},
     description:'Full management of privately owned yachts in Greece — chartering, berthing, services and maintenance under a tailored management plan.'},
    {'@type':'Service', name:'Yacht maintenance and winterisation', serviceType:'Yacht maintenance',
     provider:{'@id': SITE.origin + '/#organization'}, areaServed:{'@type':'Country', name:'Greece'},
     description:'Antifouling, hull polishing, engine servicing, windlass maintenance and sail handling for yachts wintering in Greece.'},
    {'@type':'Service', name:'Yacht provisioning', serviceType:'Provisioning',
     provider:{'@id': SITE.origin + '/#organization'}, areaServed:{'@type':'Country', name:'Greece'},
     description:'Fresh provisioning tailored to guest preferences and delivered aboard before embarkation.'},
    {'@type':'Service', name:'Airport transfers', serviceType:'Transfer',
     provider:{'@id': SITE.origin + '/#organization'}, areaServed:{'@type':'Country', name:'Greece'},
     description:'Private transfers from Aktion, Corfu and Athens airports directly to the yacht, timed around the guest’s arrival.'}
  ],
  body: (r) => `
  <section>
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">What we do</p>
        <h2 class="display">Three services, one team.</h2>
      </div>
      <div class="triptych reveal-stagger">
        <article class="tri">
          <div class="tri-media">
            <picture>
              <source type="image/webp" srcset="${r}assets/gallery/service-chartering-800.webp 800w, ${r}assets/gallery/service-chartering-1600.webp 1600w" sizes="(max-width:900px) 100vw, 33vw">
              <img src="${r}assets/gallery/service-chartering-800.jpg" alt="Charter yachts anchored off a pine-covered headland in the Ionian Sea, Greece" width="1600" height="1600" loading="lazy" decoding="async">
            </picture>
          </div>
          <div class="tri-body">
            <h3 class="display">Chartering</h3>
            <p>Depending on your budget, the number of guests, and the destination you wish to explore, we guide you toward the yacht that truly suits your needs.</p>
            <p>Our offering always includes multiple options &mdash; from more affordable, classic yachts to modern, premium vessels &mdash; so you can choose the level of comfort and style that fits your trip.</p>
            <a class="inline-link" href="${r}fleet.html">See the fleet <span class="arrow" aria-hidden="true">&rarr;</span></a>
          </div>
        </article>
        <article class="tri">
          <div class="tri-media">
            <picture>
              <source type="image/webp" srcset="${r}assets/gallery/service-management-800.webp 800w, ${r}assets/gallery/service-management-1600.webp 1600w" sizes="(max-width:900px) 100vw, 33vw">
              <img src="${r}assets/gallery/service-management-800.jpg" alt="Wheel and cockpit of a managed sailing yacht under way on open blue water" width="1600" height="1600" loading="lazy" decoding="async">
            </picture>
          </div>
          <div class="tri-body">
            <h3 class="display">Management</h3>
            <p>We undertake the full management of your yacht. In coordination with the owners, we create a tailored management plan that includes chartering, berthing, services, and maintenance &mdash; ensuring your vessel is cared for with consistency, transparency, and professional oversight.</p>
            <a class="inline-link" href="${r}brokerage.html#management-plan">Management plan &amp; investment <span class="arrow" aria-hidden="true">&rarr;</span></a>
          </div>
        </article>
        <article class="tri">
          <div class="tri-media">
            <picture>
              <source type="image/webp" srcset="${r}assets/gallery/service-maintenance-800.webp 800w, ${r}assets/gallery/service-maintenance-1600.webp 1600w" sizes="(max-width:900px) 100vw, 33vw">
              <img src="${r}assets/gallery/service-maintenance-800.jpg" alt="AIyachts technician in protective overalls sanding a yacht hull during winter maintenance" width="614" height="1023" loading="lazy" decoding="async">
            </picture>
          </div>
          <div class="tri-body">
            <h3 class="display">Maintenance &amp; winterisation</h3>
            <p>Together with our dedicated maintenance team, we undertake all essential winterisation and technical care for your yacht. Services include antifouling, hull polishing, engine servicing, windlass maintenance, and sail handling (removal, inspection, and storage). We ensure your vessel is protected, serviced, and ready for the next season.</p>
            <a class="inline-link" href="#winterisation">What winterisation covers <span class="arrow" aria-hidden="true">&rarr;</span></a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="band-raised">
    <div class="wrap">
      <div class="service-detail reveal" id="private-charters">
        <div class="service-detail-head">
          <svg class="service-icon big" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="14" r="7"/><path d="M8 34c0-8 5-13 12-13s12 5 12 13"/></svg>
          <div>
            <p class="eyebrow">01 · Private charters &amp; Experience co-creation</p>
            <h2 class="display">A week shaped around the people on board.</h2>
          </div>
        </div>
        <p>Your charter becomes a private journey shaped around the people on board. We listen to what you want from your week &mdash; quiet bays, lively nights, cultural stops, or simply time to reconnect &mdash; and we design the experience with you.</p>
        <p>From choosing the right yacht to crafting a route that fits your pace, we help you create a sailing holiday that feels personal, thoughtful, and genuinely yours. Whether it&rsquo;s a family escape, a celebration, or a week of pure exploration, we make sure every detail supports the moments you want to live.</p>
        <p>Your charter becomes a co-created journey, guided by our local knowledge and tailored to your crew.</p>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="service-detail reveal" id="provisioning">
        <div class="service-detail-head">
          <svg class="service-icon big" viewBox="0 0 40 40" aria-hidden="true"><path d="M12 8h16l-2 24H14L12 8Z"/><path d="M12 16h16"/></svg>
          <div>
            <p class="eyebrow">02 · Provisioning</p>
            <h2 class="display">Aboard before you are.</h2>
          </div>
        </div>
        <p>We prepare your yacht with everything you need before you arrive, so your first day on board feels effortless. From fresh produce and local specialties to beverages, snacks and personal preferences, we handle the shopping, delivery and stowage with care.</p>
        <p>You share your list &mdash; dietary needs, favourite brands, quantities, or simply the mood you want on board &mdash; and we make sure the yacht is stocked accordingly. Thoughtful provisioning that saves you time, avoids last-minute errands, and lets you step on board ready to enjoy your charter.</p>
      </div>
    </div>
  </section>

  <section class="band-raised">
    <div class="wrap">
      <div class="service-detail reveal" id="transfers">
        <div class="service-detail-head">
          <svg class="service-icon big" viewBox="0 0 40 40" aria-hidden="true"><path d="M6 26h28M9 26l3-10h16l3 10M13 26v4M27 26v4"/><circle cx="13" cy="26" r="2"/><circle cx="27" cy="26" r="2"/></svg>
          <div>
            <p class="eyebrow">03 · Airport transfers</p>
            <h2 class="display">From the gate to the gangway.</h2>
          </div>
        </div>
        <p>Your journey starts the moment you land. We arrange private transfers from the airport directly to your yacht, timed around your arrival so you never have to wait. Whether you&rsquo;re flying into Aktion, Corfu, or Athens, we coordinate the logistics, the driver, and the timing, ensuring a smooth transition from travel to sea.</p>
        <p>Clear communication, reliable partners, and a service that feels effortless &mdash; so you begin your charter relaxed, not rushed.</p>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="service-detail reveal" id="winterisation">
        <div class="service-detail-head">
          <svg class="service-icon big" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 6v28M8 13l24 14M32 13L8 27"/></svg>
          <div>
            <p class="eyebrow">04 · Winterisation &amp; maintenance</p>
            <h2 class="display">Off-season care, scheduled and supervised.</h2>
          </div>
        </div>
        <p>Our team handles the full off-season care of your yacht, ensuring it is protected, serviced, and ready for the next year. Beyond the essential winterisation tasks, we coordinate a wider range of technical and cosmetic services:</p>
        <ul class="tick-list">
          <li>Hull preparation and antifouling</li>
          <li>Polishing and gelcoat care</li>
          <li>Engine and generator servicing</li>
          <li>Windlass and anchor system checks</li>
          <li>Sail removal, inspection and storage</li>
          <li>Battery and electrical system monitoring</li>
          <li>Plumbing and safety-equipment checks</li>
          <li>Any additional work required by your vessel&rsquo;s condition</li>
        </ul>
        <p>Everything is scheduled, supervised and delivered with consistency, so your yacht remains in excellent shape throughout the winter months and returns to the water fully prepared for the season ahead.</p>
      </div>
    </div>
  </section>

  <section class="band-raised">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">The shape of a week</p>
        <h2 class="display">What we handle, and when.</h2>
      </div>
      <ol class="steps reveal-stagger">
        <li><span class="step-num">Before</span><h3>Planning</h3><p>Yacht selection, route, provisioning list, crew, transfers, and any occasion worth marking. All agreed by email or phone before you fly.</p></li>
        <li><span class="step-num">Day 1</span><h3>Embarkation</h3><p>Transfer to the base, a proper handover and safety briefing, provisions already stowed, and a route plan built around the week's forecast.</p></li>
        <li><span class="step-num">Aboard</span><h3>The week</h3><p>Reservations along the way, technical support if anything needs attention, and honest advice on where to be when the wind changes.</p></li>
        <li><span class="step-num">After</span><h3>Disembarkation</h3><p>An unhurried morning, transfer to the airport, and — if the week worked — a conversation about next year before you have landed.</p></li>
      </ol>
    </div>
  </section>

  ${ctaBand(r, {
    eyebrow:'Tell us how you travel',
    title:'The details are the holiday.',
    text:'Send us your dates and the things that matter to your crew. We will build the week around them.',
    primary:'Start planning', primaryHref:'contact.html',
    secondary:'See the fleet', secondaryHref:'fleet.html'
  })}
`
};

/* =======================================================================
   BROKERAGE
   ======================================================================= */
const brokerage = {
  slug: 'brokerage.html', depth: 0, nav: 'brokerage.html', file: 'brokerage.html',
  title: 'Yacht Brokerage & Yacht Management in Greece | AIyachts',
  description: 'A curated list of sailing and motor yachts for sale in Greece, plus yacht management, winterisation and a management plan for owners and new investors.',
  ogImage: 'assets/img/og-brokerage.jpg',
  crumbs: [{label:'Brokerage', href:'brokerage.html'}],
  h1: 'For owners & investors.',
  hero: {
    img: 'assets/gallery/pastel-dawn-anchorage',
    eyebrow: 'Brokerage & Management',
    h1: 'For owners<br>&amp; investors.',
    lede: 'The same team that prepares our charter fleet looks after privately owned yachts — and finds the right boat for people who are ready to own one.'
  },
  schema: [
    {'@type':'Service', name:'Yacht brokerage', serviceType:'Yacht brokerage',
     provider:{'@id': SITE.origin + '/#organization'}, areaServed:{'@type':'Country', name:'Greece'},
     description:'Curated brokerage of sailing and motor yachts in Greece, representing both private buyers and sellers.'},
    {'@type':'Service', name:'Yacht management', serviceType:'Yacht management',
     provider:{'@id': SITE.origin + '/#organization'}, areaServed:{'@type':'Country', name:'Greece'},
     description:'Year-round yacht management for owners and charter companies: pontoon berthing, on-season operations, deliveries across Greece and the Mediterranean, and winterisation.'},
    {'@type':'Service', name:'Yacht investment and management planning', serviceType:'Yacht investment advisory',
     provider:{'@id': SITE.origin + '/#organization'}, areaServed:{'@type':'Country', name:'Greece'},
     description:'Management plans and investment guidance for yacht owners: operational organisation, seasonal planning, cost control, charter potential and realistic revenue scenarios.'},
    ...(FOR_SALE.length ? [{
      '@type':'ItemList', '@id': abs('brokerage.html') + '#for-sale',
      name: 'Yachts for sale — AIyachts brokerage', numberOfItems: FOR_SALE.length,
      itemListElement: FOR_SALE.map((y,i) => ({'@type':'ListItem', position: i+1, name: y.name}))
    }] : [])
  ],
  body: (r) => `
  <section id="for-sale">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">01 · Brokerage</p>
        <h2 class="display">Yachts for sale.</h2>
        <p>Our company is now launching a curated list of yachts for sale, featuring both sailing and motor vessels of every type. From performance cruisers and family monohulls to catamarans and selected motor yachts, we connect buyers with well-maintained boats from trusted owners across Greece.</p>
        <p>Each listing is handled with care, transparency and accurate information, ensuring a smooth process whether you&rsquo;re buying or selling.</p>
      </div>
      ${FOR_SALE.length
        ? `<div class="listing-grid reveal-stagger">
        ${listingCards(FOR_SALE, 0, {kind:'sale'})}
      </div>`
        : emptyState({
            title: 'The first listings are being prepared',
            text: 'Photographs, specifications and prices for each yacht go live here as owners sign with us. Tell us what you are looking for and we will send you what is coming before it is published.',
            cta: 'Register your search', href: 'contact.html', depth: 0
          })}
    </div>
  </section>

  <section class="band-raised">
    <div class="wrap">
      <div class="split reveal">
        <div class="split-panel" id="buy">
          <p class="eyebrow">B2C · Private buyers &amp; sellers</p>
          <h2 class="display">Buying &amp; selling</h2>
          <p>A curated selection of well-maintained sailing and motor yachts, handpicked through trusted owner relationships. We would rather show you three boats worth seeing than thirty listings you have already scrolled past.</p>
          <ul class="split-list">
            <li><b>Yachts for sale</b><span>Curated listings</span></li>
            <li><b>Buyer support</b><span>Selection to paperwork</span></li>
            <li><b>Seller representation</b><span>Listing to close</span></li>
            <li><b>Condition guidance</b><span>Survey &amp; sea trial</span></li>
            <li><b>Charter-income advice</b><span>If the boat must earn</span></li>
          </ul>
          <a href="${enquire('Brokerage enquiry — AIyachts')}" class="btn ghost dark">Talk to a broker</a>
        </div>
        <div class="split-panel" id="manage">
          <p class="eyebrow">B2B · Charter companies &amp; owners</p>
          <h2 class="display">Yacht Management</h2>
          <p>Year-round support for owners — from berthing and on-season operations to winterisation and deliveries. Your boat is looked after by people who are on the water every day, not by a subcontractor you never meet.</p>
          <ul class="split-list">
            <li><b>Pontoon berthing</b><span>Private, managed</span></li>
            <li><b>Operational support</b><span>On-season</span></li>
            <li><b>Yacht deliveries</b><span>Greece &amp; Mediterranean</span></li>
            <li><b>Winterisation</b><span>Off-season care</span></li>
            <li><b>Guest handovers</b><span>Briefings &amp; turnarounds</span></li>
          </ul>
          <a href="${enquire('Yacht management enquiry — AIyachts')}" class="btn ghost dark">Discuss management</a>
        </div>
      </div>
    </div>
  </section>

  <section id="management-plan">
    <div class="wrap">
      <div class="feature-split reveal">
        <div class="feature-media">
          <picture>
            <source type="image/webp" srcset="${r}assets/gallery/service-management-800.webp 800w, ${r}assets/gallery/service-management-1600.webp 1600w" sizes="(max-width:900px) 100vw, 50vw">
            <img src="${r}assets/gallery/service-management-800.jpg" alt="Wheel and instruments of a managed sailing yacht under way in Greece" width="1600" height="1600" loading="lazy" decoding="async">
          </picture>
        </div>
        <div class="feature-copy">
          <p class="eyebrow">02 · Management Plan &amp; Yacht Investment</p>
          <h2 class="display">A plan for the boat, and for the money.</h2>
          <p>We support owners and new investors in building a clear, sustainable plan for their yacht &mdash; from day-one decisions to long-term strategy. Each vessel has its own profile, and we shape its management around real needs: operational organisation, seasonal planning, cost control, and charter potential.</p>
          <p>For those exploring yacht ownership as an investment, we provide insight into market trends, vessel categories, expected annual commitments, and realistic revenue scenarios. Our role is to help you understand the full picture and make choices that align with both your lifestyle and your financial expectations.</p>
          <ul class="tick-list">
            <li>Operational organisation and seasonal planning</li>
            <li>Cost control and transparent reporting</li>
            <li>Charter potential and realistic revenue scenarios</li>
            <li>Market trends and vessel categories</li>
            <li>Expected annual commitments, stated honestly</li>
          </ul>
          <a href="${enquire('Management plan & yacht investment — AIyachts')}" class="btn ghost dark">Ask for a plan</a>
        </div>
      </div>
    </div>
  </section>

  <section class="band-raised">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Buying a yacht in Greece</p>
        <h2 class="display">How a purchase actually goes.</h2>
        <p>No two boats are the same, but the path is. This is what working with us looks like from first call to first sail.</p>
      </div>
      <ol class="steps reveal-stagger">
        <li><span class="step-num">01</span><h3>Brief</h3><p>What the boat is for — family cruising, charter income, a long-term liveaboard plan — and what you actually want to spend once running costs are honest.</p></li>
        <li><span class="step-num">02</span><h3>Shortlist</h3><p>We go through the market and our owner network, and come back with the few boats worth your flight, including the ones that are not publicly listed.</p></li>
        <li><span class="step-num">03</span><h3>Inspection</h3><p>Viewings, sea trial and an independent survey. We tell you what is a negotiating point and what is a reason to walk away.</p></li>
        <li><span class="step-num">04</span><h3>Close</h3><p>Negotiation, contract, registration and flag paperwork — coordinated with the specialists who do this for a living.</p></li>
        <li><span class="step-num">05</span><h3>Afterwards</h3><p>Berthing, management, winterisation and, if you want the boat to earn, a place in a charter programme run to the same standard as our own fleet.</p></li>
      </ol>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="feature-split reverse reveal">
        <div class="feature-media">
          <picture>
            <source type="image/webp" srcset="${r}assets/gallery/harbour-blue-hour-800.webp 800w, ${r}assets/gallery/harbour-blue-hour-1600.webp 1600w" sizes="(max-width:900px) 100vw, 50vw">
            <img src="${r}assets/gallery/harbour-blue-hour-800.jpg" alt="Greek island harbour at blue hour with moored yachts and lit tavernas" width="1600" height="1200" loading="lazy" decoding="async">
          </picture>
        </div>
        <div class="feature-copy">
          <p class="eyebrow">For owners</p>
          <h2 class="display">A boat left alone is a boat that ages twice as fast.</h2>
          <p>Greek summers are hard on yachts and Greek winters are harder on the ones nobody visits. Our management contracts exist so that your boat is checked, run, cleaned and cared for whether you are here in July or in London in February.</p>
          <ul class="tick-list">
            <li>Managed pontoon berthing at our own facilities</li>
            <li>Regular checks, engine runs and system testing off season</li>
            <li>Winterisation, antifoul, and spring recommissioning</li>
            <li>Deliveries anywhere in Greece and across the Mediterranean</li>
            <li>Guest handovers and turnarounds if the yacht charters</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  ${ctaBand(r, {
    eyebrow:'Owners & investors',
    title:'Let’s talk about the boat.',
    text:'Whether you are buying your first yacht, selling one you have loved, or looking for someone reliable to look after it — start with a conversation.',
    primary:'Contact us', primaryHref:'contact.html',
    secondary:'About us', secondaryHref:'about.html'
  })}
`
};

/* =======================================================================
   SPECIAL OFFERS
   ======================================================================= */
const specialOffers = {
  slug: 'special-offers.html', depth: 0, nav: 'special-offers.html', file: 'special-offers.html',
  title: 'Special Offers | Yacht Charter Deals in Greece — AIyachts',
  description: 'Reduced weekly rates on sailing yachts and catamarans in the Ionian and Aegean — late availability, shoulder-season weeks and one-way repositioning deals.',
  ogImage: 'assets/img/og-fleet.jpg',
  crumbs: [{label:'Special offers', href:'special-offers.html'}],
  h1: 'Special offers.',
  hero: {
    img: 'assets/gallery/sea-cave-swim-stop',
    eyebrow: 'Reduced Weeks',
    h1: 'Special offers.',
    lede: 'Weeks we would rather see sailed than sitting on the pontoon. Each yacht below carries a price for the dates shown.'
  },
  schema: SPECIAL_OFFERS.length ? [{
    '@type':'ItemList', '@id': abs('special-offers.html') + '#offers',
    name: 'AIyachts special offers', numberOfItems: SPECIAL_OFFERS.length,
    itemListElement: SPECIAL_OFFERS.map((o,i) => ({'@type':'ListItem', position: i+1, name: o.name || (FLEET.find(f=>f.slug===o.slug)||{}).name || 'Special offer'}))
  }] : [],
  body: (r) => `
  <section>
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Current offers</p>
        <h2 class="display">Priced weeks, ready to book.</h2>
        <p>Late availability, shoulder-season weeks and the occasional one-way. Prices are per week for the yacht, and we will tell you exactly what is and is not included before you commit.</p>
      </div>
      ${SPECIAL_OFFERS.length
        ? `<div class="listing-grid reveal-stagger">
        ${listingCards(SPECIAL_OFFERS, 0, {kind:'offer'})}
      </div>`
        : emptyState({
            title: 'No offers running this minute',
            text: 'Offers appear here as dates open up — usually late availability inside six weeks, and shoulder-season weeks in May, June, September and October. Send us your dates and we will tell you the moment something fits.',
            cta: 'Tell us your dates', href: 'contact.html', depth: 0
          })}
    </div>
  </section>

  <section class="band-raised">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">How the offers work</p>
        <h2 class="display">Nothing hidden in the small print.</h2>
      </div>
      <div class="pillar-grid reveal-stagger">
        <article class="pillar">
          <span class="pillar-num" aria-hidden="true">01</span>
          <h3 class="display">The price is the yacht</h3>
          <p>Every price is for the yacht for the week shown. Skipper, hostess, provisioning, transfers and fuel are quoted separately so you can see what each one costs.</p>
        </article>
        <article class="pillar">
          <span class="pillar-num" aria-hidden="true">02</span>
          <h3 class="display">Fixed dates</h3>
          <p>Offers are tied to the dates printed on them. If you want the same yacht in a different week, ask — we will price it honestly rather than pretend the offer still applies.</p>
        </article>
        <article class="pillar">
          <span class="pillar-num" aria-hidden="true">03</span>
          <h3 class="display">Same standard</h3>
          <p>A reduced week is not a reduced boat. The handover, the briefing and the support while you are out there are exactly what they would be at full price.</p>
        </article>
      </div>
    </div>
  </section>

  ${ctaBand(r, {
    eyebrow:'Flexible on dates?',
    title:'Tell us when you can go.',
    text:'The best prices go to crews who can move a week either way. Send us your window and we will come back with what it buys.',
    primary:'Send your dates', primaryHref:'contact.html',
    secondary:'Browse the fleet', secondaryHref:'fleet.html'
  })}
`
};

/* =======================================================================
   CONTACT
   ======================================================================= */
const contact = {
  slug: 'contact.html', depth: 0, nav: 'contact.html', file: 'contact.html',
  title: 'Contact AIyachts | Yacht Charter Enquiries in Greece',
  description: 'Enquire about a yacht charter in the Ionian or Aegean. Call our Athens or Lefkas team, email us, or send your dates and crew size and we will reply within a day.',
  ogImage: 'assets/img/og-contact.jpg',
  crumbs: [{label:'Contact', href:'contact.html'}],
  h1: 'Let’s set a course.',
  hero: {
    compact: true,
    img: 'assets/gallery/harbour-blue-hour',
    eyebrow: 'Contact & Enquiries',
    h1: 'Let’s set a course.',
    lede: 'Tell us where you would like to sail, and one of our team will reply personally — usually within a day.'
  },
  schema: [{
    '@type':'ContactPage', '@id': abs('contact.html') + '#contactpage',
    name: 'Contact AIyachts', mainEntity: {'@id': SITE.origin + '/#organization'}
  }],
  body: (r) => `
  <section class="contact-section">
    <div class="wrap">
      <div class="contact-layout">
        <div class="contact-form-wrap reveal">
          <p class="eyebrow">Charter enquiry</p>
          <h2 class="display">Send us the week you have in mind.</h2>
          <p class="form-note">Nothing is booked by this form — it opens an email to our team with your details filled in, so you can add anything else before you send it.</p>
          <form class="enquiry" id="enquiryForm" novalidate>
            <div class="f-row">
              <div class="f-field">
                <label for="fName">Your name</label>
                <input id="fName" name="name" type="text" autocomplete="name" required>
              </div>
              <div class="f-field">
                <label for="fEmail">Email</label>
                <input id="fEmail" name="email" type="email" autocomplete="email" required>
              </div>
            </div>
            <div class="f-row">
              <div class="f-field">
                <label for="fDestination">Destination</label>
                <select id="fDestination" name="destination">
                  <option>Either sea — advise me</option>
                  <option>Ionian — Lefkas base</option>
                  <option>Aegean — Athens base</option>
                </select>
              </div>
              <div class="f-field">
                <label for="fYacht">Yacht of interest</label>
                <select id="fYacht" name="yacht">
                  <option>No preference yet</option>
                  ${FLEET.map(y => `<option>${esc(y.name)}</option>`).join('\n                  ')}
                </select>
              </div>
            </div>
            <div class="f-row">
              <div class="f-field">
                <label for="fStart">From</label>
                <input id="fStart" name="start" type="date">
              </div>
              <div class="f-field">
                <label for="fEnd">To</label>
                <input id="fEnd" name="end" type="date">
              </div>
              <div class="f-field narrow">
                <label for="fGuests">Guests</label>
                <input id="fGuests" name="guests" type="number" min="1" max="12" value="2" inputmode="numeric">
              </div>
            </div>
            <div class="f-field">
              <label for="fCharterType">Charter type</label>
              <select id="fCharterType" name="charter">
                <option>Bareboat — we hold licences</option>
                <option>Skippered — please provide a skipper</option>
                <option>Skippered with hostess</option>
                <option>Not sure yet</option>
              </select>
            </div>
            <div class="f-field">
              <label for="fMessage">Anything else we should know?</label>
              <textarea id="fMessage" name="message" rows="4" placeholder="Sailing experience, children aboard, dietary preferences, a special occasion…"></textarea>
            </div>
            <button class="btn" type="submit">Send the enquiry <span class="arrow" aria-hidden="true">→</span></button>
            <p class="form-fallback">Or write to us directly at <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
          </form>
        </div>

        <aside class="contact-aside reveal">
          <div class="contact-block">
            <h2 class="foot-h">Speak to us</h2>
            ${SITE.phones.map(p => `<a class="contact-line" href="tel:${p.replace(/[^\d+]/g,'')}">${p}</a>`).join('\n            ')}
            <a class="contact-line" href="mailto:${SITE.email}">${SITE.email}</a>
          </div>
          <div class="contact-block">
            <h2 class="foot-h">Athens base</h2>
            <p class="contact-line">Alexandroupoleos 20<br>11527 Athens, Greece</p>
            <p class="contact-meta">Aegean departures — Saronic Gulf, Cyclades and the Dodecanese.</p>
            <a class="inline-link" href="${r}destinations/aegean-sailing.html">Sailing the Aegean <span class="arrow" aria-hidden="true">→</span></a>
          </div>
          <div class="contact-block">
            <h2 class="foot-h">Lefkas base</h2>
            <p class="contact-line">Tsoukalades<br>31100 Lefkas Island, Greece</p>
            <p class="contact-meta">Ionian departures — Meganisi, Kalamos, Ithaca, Kefalonia and Paxos.</p>
            <a class="inline-link" href="${r}destinations/ionian-sailing.html">Sailing the Ionian <span class="arrow" aria-hidden="true">→</span></a>
          </div>
          <div class="contact-block">
            <h2 class="foot-h">Response time</h2>
            <p class="contact-meta">Enquiries are answered personally, usually within one working day. In peak season we reply to availability questions first — if your dates are close, call rather than write.</p>
          </div>
        </aside>
      </div>
    </div>
  </section>
`
};

/* =======================================================================
   PRIVACY / 404
   ======================================================================= */
const privacy = {
  slug: 'privacy.html', depth: 0, nav: '', file: 'privacy.html',
  title: 'Privacy Policy | AIyachts',
  description: 'How AIyachts collects, uses and protects the personal data you share when you enquire about a yacht charter, brokerage or yacht management in Greece.',
  crumbs: [{label:'Privacy Policy', href:'privacy.html'}],
  h1: 'Privacy Policy',
  hero: { compact: true, img: 'assets/gallery/pastel-dawn-anchorage', eyebrow:'Legal', h1:'Privacy Policy',
          lede:'What we collect, why we collect it, and what you can ask us to do about it.' },
  body: (r) => `
  <section class="prose-section">
    <div class="wrap">
      <div class="prose reveal">
        <p class="lead">AIyachts respects your privacy. This page explains what personal data we handle when you contact us or use this website, and the rights you have under the EU General Data Protection Regulation (GDPR).</p>

        <h2>Who we are</h2>
        <p>AIyachts operates yacht chartering, brokerage and yacht-management services in Greece, with bases at Alexandroupoleos 20, 11527 Athens and Tsoukalades, 31100 Lefkas Island. For any privacy question, write to <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>

        <h2>What we collect</h2>
        <ul class="tick-list">
          <li><b>Enquiry details</b> — your name, email address, telephone number, dates, crew size and anything else you choose to tell us when you contact us.</li>
          <li><b>Booking information</b> — the details required to prepare a charter contract, including skipper qualifications where a bareboat charter applies.</li>
          <li><b>Correspondence</b> — the emails and messages you exchange with us.</li>
        </ul>
        <p>This website does not use advertising cookies or third-party analytics trackers. Forms on this site open an email in your own mail application; they do not transmit your details to a third-party service.</p>

        <h2>Why we use it</h2>
        <p>To answer your enquiry, prepare and perform a charter or brokerage agreement, meet our legal obligations as a Greek charter operator, and — only where you have asked for it — send occasional news about our fleet and destinations.</p>

        <h2>How long we keep it</h2>
        <p>Enquiries that do not lead to a booking are kept only as long as they are useful to the conversation. Booking and financial records are kept for as long as Greek tax and maritime law requires.</p>

        <h2>Who we share it with</h2>
        <p>Only with the partners needed to deliver your charter — for example a provisioning supplier, transfer provider or skipper — and with authorities where the law requires it. We never sell your data.</p>

        <h2>Your rights</h2>
        <p>You may ask us for a copy of the data we hold about you, ask us to correct or delete it, object to its use, or withdraw consent to marketing at any time. Write to <a href="mailto:${SITE.email}">${SITE.email}</a> and we will respond within one month. You also have the right to complain to the Hellenic Data Protection Authority.</p>

        <h2>Changes to this policy</h2>
        <p>If this policy changes we will update this page. Please check back occasionally.</p>
      </div>
    </div>
  </section>
`
};

const notFound = {
  slug: '404.html', depth: 0, nav: '', file: '404.html', noindex: true,
  title: 'Page not found | AIyachts',
  description: 'That page is not at this address. Head back to the AIyachts fleet, the Ionian and Aegean destination guides, or the gallery of experiences.',
  h1: 'Off the chart.',
  hero: { compact: true, img: 'assets/gallery/dusk-under-the-boom', eyebrow:'Error 404', h1:'Off the chart.',
          lede:'This page is not at this address — it may have been renamed, or the link that brought you here may be out of date.' },
  body: (r) => `
  <section>
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Try one of these</p>
        <h2 class="display">Back to the water.</h2>
      </div>
      <div class="pillar-grid reveal-stagger">
        <article class="pillar"><span class="pillar-num" aria-hidden="true">01</span><h3 class="display">The fleet</h3><p>Fourteen sailing yachts and catamarans, from two cabins to five.</p><a class="inline-link" href="${r}fleet.html">Open the fleet <span class="arrow" aria-hidden="true">→</span></a></article>
        <article class="pillar"><span class="pillar-num" aria-hidden="true">02</span><h3 class="display">Destinations</h3><p>The Ionian from Lefkas, the Aegean from Athens — compared honestly.</p><a class="inline-link" href="${r}destinations.html">Where we sail <span class="arrow" aria-hidden="true">→</span></a></article>
        <article class="pillar"><span class="pillar-num" aria-hidden="true">03</span><h3 class="display">Experiences</h3><p>Day sails, retreats, one- and two-week charters — and the photographs.</p><a class="inline-link" href="${r}experiences.html">Charter experiences <span class="arrow" aria-hidden="true">→</span></a></article>
      </div>
    </div>
  </section>
`
};


/* =======================================================================
   DESTINATION GUIDES (depth 1)
   ======================================================================= */
const islandList = (items) => `<div class="island-grid reveal-stagger">
        ${items.map((i,n) => `<article class="island">
          <span class="island-num" aria-hidden="true">${String(n+1).padStart(2,'0')}</span>
          <h3 class="display">${i.name}</h3>
          <p>${i.text}</p>
        </article>`).join('\n        ')}
      </div>`;

const routeList = (rows) => `<ol class="route reveal-stagger">
        ${rows.map(x => `<li><span class="route-day">${x.day}</span><div><h3>${x.leg}</h3><p>${x.text}</p></div></li>`).join('\n        ')}
      </ol>`;

const ionian = {
  slug: 'destinations/ionian-sailing.html', depth: 1, nav: 'destinations.html', file: 'destinations/ionian-sailing.html',
  title: 'Sailing the Ionian Islands | Yacht Charter from Lefkas, Greece',
  description: 'A guide to sailing the southern Ionian from our Lefkas base — Meganisi, Kalamos, Kastos, Ithaca, Kefalonia and Paxos, with winds, distances and a seven-day route.',
  ogImage: 'assets/img/og-destinations.jpg',
  crumbs: [{label:'Destinations & Itineraries', href:'destinations.html'}, {label:'Sailing the Ionian', href:'destinations/ionian-sailing.html'}],
  h1: 'Sailing the Ionian',
  hero: {
    img: 'assets/gallery/emerald-bay-anchorage',
    eyebrow: 'Destination · Lefkas Base',
    h1: 'Sailing the Ionian.',
    lede: 'Green islands, short distances and a breeze that arrives after lunch and leaves before dinner. The friendliest sailing ground in Greece — and the one we would put a first-time crew on every time.'
  },
  schema: [{
    '@type':'FAQPage', '@id': abs('destinations/ionian-sailing.html') + '#faq',
    mainEntity: [
      {'@type':'Question', name:'What are the winds like in the Ionian Sea?',
       acceptedAnswer:{'@type':'Answer', text:'The Ionian runs on a thermal sea breeze. Mornings are usually calm, a north-westerly fills in around one o’clock and builds to force 4–5 through the afternoon, then fades away at sunset. It is predictable enough to plan a whole week around.'}},
      {'@type':'Question', name:'How long is a typical day’s sailing in the Ionian?',
       acceptedAnswer:{'@type':'Answer', text:'Two to four hours. Most anchorages are 10 to 20 nautical miles apart, which leaves the morning free for swimming and gets you onto a village quay in good time for the evening.'}},
      {'@type':'Question', name:'Is the Ionian suitable for families with young children?',
       acceptedAnswer:{'@type':'Answer', text:'Yes — it is the sailing area we recommend most for families. The islands shelter the water, the swims are short and shallow, the passages are brief, and there is a taverna within walking distance of almost every anchorage.'}}
    ]
  }],
  body: (r) => `
  <section class="prose-section">
    <div class="wrap">
      <div class="prose reveal">
        <p class="lead">The southern Ionian is a pocket of sea about thirty miles across, ringed by islands that shelter it from everything. Within that pocket sit Lefkada, Meganisi, Kalamos, Kastos, Ithaca and Kefalonia — close enough that you can see tomorrow's anchorage from today's, and separated by water that rarely gets rough.</p>
        <p>That geography is the whole appeal. You sail in the afternoon because you want to, not because you have to cover ground. Mornings are for swimming off the stern in water so clear you can count the links of your own anchor chain. Evenings are for a village quay, a walk of two hundred metres, and dinner at a table close enough to keep an eye on the boat.</p>
      </div>
    </div>
  </section>

  <section class="band-raised">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Conditions</p>
        <h2 class="display">A breeze you can set your watch by.</h2>
      </div>
      <div class="stat-grid reveal-stagger">
        <div class="stat"><span class="stat-k">Wind</span><span class="stat-v">F3–5 NW</span><p>A thermal sea breeze that fills in after midday and dies at sunset. Mornings are typically flat calm.</p></div>
        <div class="stat"><span class="stat-k">Day's run</span><span class="stat-v">10–20 nm</span><p>Two to four hours between anchorages. Nothing in the southern Ionian is far from anything else.</p></div>
        <div class="stat"><span class="stat-k">Water</span><span class="stat-v">23–27 °C</span><p>Warm from June to October, and sheltered enough to stay glassy on most mornings.</p></div>
        <div class="stat"><span class="stat-k">Season</span><span class="stat-v">May–Oct</span><p>May, June, September and early October are the quiet months — same water, half the boats.</p></div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">The islands</p>
        <h2 class="display">Where a week actually goes.</h2>
        <p>You will not fit all of this into seven days, and you should not try. Pick five, and go slowly.</p>
      </div>
      ${islandList([
        {name:'Meganisi', text:'Three villages and a coastline of deep, narrow inlets — Spartochori on its cliff, Vathy around the corner, and the quiet fingers of Porto Atheni and Abelike where you drop anchor and take a line ashore. The great sea cave on the west coast is worth the detour.'},
        {name:'Kalamos', text:'A steep, wooded island with one small harbour on its eastern side, a handful of tavernas and very little else. Famous among Ionian sailors for the welcome on the quay and for evenings that end early and well.'},
        {name:'Kastos', text:'The smallest inhabited island in the group: one village, one quay, a windmill on the hill and a walk to a beach you will probably have to yourself. The definition of doing nothing, properly.'},
        {name:'Ithaca', text:'Odysseus’ island, and still one of the least developed. Kioni and Frikes are two of the prettiest small harbours in Greece; Vathy sits at the head of a long, protected bay that feels like an inland lake.'},
        {name:'Kefalonia', text:'The big one. Fiskardo is the smart Venetian-coloured harbour everybody wants a berth in; Assos sits below a ruined fortress on a green isthmus; Agia Efimia is calmer and easier if you want a quiet night.'},
        {name:'Lefkada', text:'Your base island. Sivota is a deep, sheltered inlet lined with tavernas; Vasiliki catches the afternoon wind and fills with windsurfers; the canal north takes you to Preveza and the vast Amvrakikos Gulf.'},
        {name:'Paxos &amp; Antipaxos', text:'A longer hop north, and a change of character: Gaios, Lakka and Loggos are Venetian and green, and Antipaxos has water so bright it looks retouched. Best on a ten-day charter or a fast week.'},
        {name:'Palairos &amp; the mainland', text:'The eastern shore is often overlooked. Palairos and Vounaki offer easy berthing and a straightforward run home, and the mountains behind them turn gold in the last hour of light.'}
      ])}
    </div>
  </section>

  <section class="band-raised">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Sample itinerary · Ionian South route</p>
        <h2 class="display">Seven days from Lefkas.</h2>
        <p>A route that works for most crews in most weeks — comfortable distances, a mix of quays and quiet anchorages, and no day that eats the whole afternoon.</p>
      </div>
      ${routeList([
        {day:'Day 1', leg:'Lefkas → Kalamos', text:'On our way to the quiet island of Kalamos, we stop at the idyllic Asprogialli beach for a refreshing swim. Later, we arrive at the picturesque port of Kalamos, where you can enjoy authentic Greek food in a local taverna and settle in for a peaceful night.'},
        {day:'Day 2', leg:'Kalamos → Kastos / Atokos → Ithaca (Vathi)', text:'Leaving the port of Kalamos, we head towards Vathi in Ithaca, with a swim stop either on Kastos or the stunning Atokos island. We then settle into the charming harbour of Vathi for the night.'},
        {day:'Day 3', leg:'Ithaca (Vathi) → Ithaca (Kioni)', text:'Leaving Vathi, we sail towards the white-sand Gidaki beach or the popular Filiatro beach for a swim in crystal-clear waters. In the afternoon, we continue to Kioni, where the three iconic ruined windmills mark the entrance to this tiny, picturesque harbour to spend the night.'},
        {day:'Day 4', leg:'Ithaca (Kioni) → Kefalonia (Fiskardo)', text:'Departing from Kioni, we sail towards the striking Afales beach on the north-west coast of Ithaca for a swim in its deep-blue waters. Later, we continue to Fiskardo, Kefalonia’s prettiest and most atmospheric harbour, where we spend the night surrounded by colourful Venetian-style houses and lively waterfront tavernas.'},
        {day:'Day 5', leg:'Kefalonia (Fiskardo) → Kefalonia (South)', text:'Departing from Fiskardo, we head south along the coast of Kefalonia, stopping at Foki beach or another hidden gem in the area for a swim and a slow, nature-filled afternoon. We spend the night at anchor, surrounded by calm waters and starlit skies — an ideal moment to disconnect and enjoy the wild beauty of Kefalonia.'},
        {day:'Day 6', leg:'Kefalonia → Lefkas (Syvota)', text:'From our anchorage in Kefalonia, we enjoy a final swim stop before sailing north towards Lefkas. We spend the night in the beautiful bay of Syvota, where you can savour authentic Greek food and relaxed cocktails along the waterfront.'},
        {day:'Day 7', leg:'Lefkas (Syvota) → Meganisi → back to base', text:'From Syvota, we sail towards the famous Papanikolis Cave on Meganisi for a memorable swim inside its impressive cavern. We then continue around Thilia Island and explore the beautiful coastline of Meganisi before making our way back to base in Lefkas.'}
      ])}
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Good to know</p>
        <h2 class="display">Ionian questions.</h2>
      </div>
      <div class="faq reveal">
        <details><summary>What are the winds like in the Ionian Sea?</summary><p>The Ionian runs on a thermal sea breeze. Mornings are usually calm, a north-westerly fills in around one o'clock and builds to force 4–5 through the afternoon, then fades away at sunset. It is predictable enough to plan a whole week around.</p></details>
        <details><summary>How long is a typical day's sailing?</summary><p>Two to four hours. Most anchorages are 10 to 20 nautical miles apart, which leaves the morning free for swimming and gets you onto a village quay in good time for the evening.</p></details>
        <details><summary>Is the Ionian suitable for families with young children?</summary><p>Yes — it is the area we recommend most for families. The islands shelter the water, the passages are brief, the swims are shallow and warm, and there is a taverna within walking distance of almost every anchorage.</p></details>
        <details><summary>Do we have to moor stern-to every night?</summary><p>Not at all. Many crews spend half the week at anchor with a long line ashore, which is quieter, cooler and free. We show you how at the briefing.</p></details>
        <details><summary>Can we reach Paxos or Corfu in a week?</summary><p>You can, but it makes the week about passages rather than places. We usually suggest Paxos and Corfu for ten days or more — or as a one-way with a Corfu finish, if the dates allow.</p></details>
      </div>
    </div>
  </section>

  ${ctaBand(r, {
    eyebrow:'Lefkas base',
    title:'Start your week in the Ionian.',
    text:'Send us your dates and crew size and we will tell you which yachts are free, and sketch a route for the forecast you are likely to get.',
    primary:'Check Ionian availability', primaryHref:'contact.html',
    secondary:'See the fleet', secondaryHref:'fleet.html'
  })}
`
};

const aegean = {
  slug: 'destinations/aegean-sailing.html', depth: 1, nav: 'destinations.html', file: 'destinations/aegean-sailing.html',
  title: 'Sailing the Aegean & Cyclades | Yacht Charter from Athens',
  description: 'A guide to sailing the Aegean from our Athens base — the sheltered Saronic Gulf, the Cyclades, the meltemi wind, distances and two sample routes.',
  ogImage: 'assets/img/og-destinations.jpg',
  crumbs: [{label:'Destinations & Itineraries', href:'destinations.html'}, {label:'Sailing the Aegean', href:'destinations/aegean-sailing.html'}],
  h1: 'Sailing the Aegean',
  hero: {
    img: 'assets/gallery/sunset-at-anchor',
    eyebrow: 'Destination · Athens Base',
    h1: 'Sailing the Aegean.',
    lede: 'Bare rock, white villages and a hard blue sea. The Aegean asks more of a crew than the Ionian — and gives back the Greece everyone pictures.'
  },
  schema: [{
    '@type':'FAQPage', '@id': abs('destinations/aegean-sailing.html') + '#faq',
    mainEntity: [
      {'@type':'Question', name:'What is the meltemi and when does it blow?',
       acceptedAnswer:{'@type':'Answer', text:'The meltemi is a dry northerly wind that dominates the Aegean from roughly mid-June to mid-September. It can blow force 5–7 for several days at a time, sometimes more between the islands. It is a fine sailing wind for an experienced crew, and the reason we suggest the Saronic Gulf to everyone else in high summer.'}},
      {'@type':'Question', name:'Can you sail the Cyclades in one week?',
       acceptedAnswer:{'@type':'Answer', text:'You can reach the western Cyclades — Kea, Kythnos, Serifos and Sifnos — comfortably in a week from Athens. A full circuit taking in Paros, Naxos and Mykonos is better suited to ten days or more, because the meltemi can pin you in a harbour for a day.'}},
      {'@type':'Question', name:'Which Aegean route suits a first charter?',
       acceptedAnswer:{'@type':'Answer', text:'The Saronic Gulf. Aegina, Poros, Hydra, Ermioni and Spetses are close together, sheltered from the worst of the meltemi, and full of harbours — a week there is relaxed even in August.'}}
    ]
  }],
  body: (r) => `
  <section class="prose-section">
    <div class="wrap">
      <div class="prose reveal">
        <p class="lead">Leaving Athens, you have a choice to make within the first two hours. Turn south-west into the Saronic Gulf and you get a gentle, harbour-rich week among pine-covered islands an hour apart. Turn south-east and you are pointed at the Cyclades — bare, bright, windy and unforgettable.</p>
        <p>Both start from our Athens base. Both are sailed in deeper blue water than the Ionian, with longer passages, stronger wind and villages that look like the photographs. The Aegean is where you go when the sailing itself is part of the point.</p>
      </div>
    </div>
  </section>

  <section class="band-raised">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Conditions</p>
        <h2 class="display">The meltemi decides.</h2>
      </div>
      <div class="stat-grid reveal-stagger">
        <div class="stat"><span class="stat-k">Wind</span><span class="stat-v">F4–7 N</span><p>The meltemi blows from the north through high summer, often for days. Shoulder months are lighter and more variable.</p></div>
        <div class="stat"><span class="stat-k">Day's run</span><span class="stat-v">25–40 nm</span><p>Longer legs between island groups. Plan for real sailing days, and start early when it is blowing.</p></div>
        <div class="stat"><span class="stat-k">Saronic</span><span class="stat-v">10–20 nm</span><p>The sheltered alternative — short hops between Aegina, Poros, Hydra and Spetses.</p></div>
        <div class="stat"><span class="stat-k">Season</span><span class="stat-v">May–Oct</span><p>May, June, September and October are the kindest. July and August are the windiest and the busiest.</p></div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">The islands</p>
        <h2 class="display">Two very different weeks.</h2>
      </div>
      ${islandList([
        {name:'Aegina', text:'An hour and a half from base, and the easiest first night of any Aegean charter. Pistachio groves, a working town harbour, and the fishing village of Perdika on the south-west corner for a quieter evening.'},
        {name:'Poros', text:'Separated from the mainland by a channel a few hundred metres wide, with a clock tower above tiers of terracotta roofs. Sheltered whatever the wind does, and a favourite for a relaxed second night.'},
        {name:'Hydra', text:'No cars, no scooters — donkeys and stone. A perfect stone amphitheatre of a harbour that fills early in summer, so arrive at lunchtime or anchor outside and take the tender in.'},
        {name:'Spetses &amp; Ermioni', text:'The southern end of the Saronic. Spetses has grand old captains’ houses and horse-drawn carriages; Ermioni, opposite, is a quiet mainland peninsula with tavernas on both shores.'},
        {name:'Kea &amp; Kythnos', text:'The gateway to the Cyclades. Vourkari on Kea is a smart, sheltered inlet; Kythnos hides one of the best anchorages in Greece at Kolona, a sandbar with sea on both sides.'},
        {name:'Serifos &amp; Sifnos', text:'Serifos rises to a white village stacked on a cone of rock above the port. Sifnos, its neighbour, is the food island of the Cyclades — and Vathi bay on its south coast is a fine, protected night stop.'},
        {name:'Milos', text:'Volcanic and strange, with cliffs the colour of bone at Kleftiko and coloured fishing garages cut into the rock. Further south, and worth the extra day it costs you.'},
        {name:'Paros, Naxos &amp; Mykonos', text:'The heart of the Cyclades: Naoussa’s little fishing port, Naxos’ marble gate above the harbour, the ancient site of Delos, and Mykonos when you want one loud night in the middle of a quiet week.'}
      ])}
    </div>
  </section>

  <section class="band-raised">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Sample itinerary · Saronic &amp; the Cyclades</p>
        <h2 class="display">Seven days in the Saronic &amp; the Cyclades.</h2>
        <p>The route we recommend for skippered charters sailing the Aegean for the first time.</p>
      </div>
      ${routeList([
        {day:'Day 1', leg:'Athens → Aegina (Perdika or anchorage)', text:'Sail to Aegina. Spend the night either moored in Perdika or anchored in one of the calm bays around the village.'},
        {day:'Day 2', leg:'Aegina → Poros', text:'Sail down the Peloponnese coast towards the narrow channel of Poros. Enjoy a swim stop before entering the channel, then settle in on Poros island for the night, with its waterfront tavernas and relaxed island vibe.'},
        {day:'Day 3', leg:'Poros → Serifos', text:'Cross into the Cyclades with a longer but rewarding passage. Arrive in Serifos, known for its rugged hills, whitewashed villages, and crystal-clear bays perfect for anchoring.'},
        {day:'Day 4', leg:'Serifos → Sifnos', text:'A short hop to Sifnos, one of the Cyclades’ most elegant islands. Explore its calm coves, swim in turquoise waters, and enjoy dinner in one of the island’s exceptional tavernas.'},
        {day:'Day 5', leg:'Sifnos → Milos or Koufonisia', text:'Depending on weather and group preference, head either to Milos island, famous for its coastline and hidden coves, or to the more remote Koufonisia island for pristine beaches and a slower, island-life feel.'},
        {day:'Day 6', leg:'Milos → Spetses or Hydra', text:'Sail north again, re-entering the Saronic region. Choose between Spetses, with its elegant neoclassical mansions, or Hydra, with its iconic stone harbour and car-free charm. If timing allows, make a detour ashore to visit the ancient theatre of Epidaurus.'},
        {day:'Day 7', leg:'Return to Athens', text:'A relaxed final sail back towards Athens, with optional swim stops along the Peloponnese coast before returning to base.'}
      ])}
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Good to know</p>
        <h2 class="display">Aegean questions.</h2>
      </div>
      <div class="faq reveal">
        <details><summary>What is the meltemi and when does it blow?</summary><p>The meltemi is a dry northerly wind that dominates the Aegean from roughly mid-June to mid-September. It can blow force 5–7 for several days at a time, sometimes more between the islands. It is a fine sailing wind for an experienced crew, and the reason we suggest the Saronic Gulf to everyone else in high summer.</p></details>
        <details><summary>Can you sail the Cyclades in one week?</summary><p>You can reach the western Cyclades — Kea, Kythnos, Serifos and Sifnos — comfortably in a week from Athens. A full circuit taking in Paros, Naxos and Mykonos is better suited to ten days or more, because the meltemi can pin you in a harbour for a day.</p></details>
        <details><summary>Which route suits a first Aegean charter?</summary><p>The Saronic Gulf. Aegina, Poros, Hydra, Ermioni and Spetses are close together, sheltered from the worst of the meltemi, and full of harbours — a week there is relaxed even in August.</p></details>
        <details><summary>Is a catamaran a good idea in the Aegean?</summary><p>For comfort at anchor, yes — and the shallow draft opens up bays a monohull cannot use. In a strong meltemi a catamaran is more affected by windage when berthing, so we would usually put a skipper aboard for a first Aegean week.</p></details>
      </div>
    </div>
  </section>

  ${ctaBand(r, {
    eyebrow:'Athens base',
    title:'Sail out of Athens.',
    text:'Tell us your dates, your crew and how much wind you actually want. We will match you with the right yacht and the right route.',
    primary:'Check Aegean availability', primaryHref:'contact.html',
    secondary:'Compare both seas', secondaryHref:'destinations.html'
  })}
`
};

/* =======================================================================
   YACHT PAGES (depth 1, generated)
   ======================================================================= */
const yachtPage = (y) => {
  /* three companions: same type first, then topped up from the rest of the fleet */
  const sameType = FLEET.filter(f => f.slug !== y.slug && f.type === y.type);
  const rest = FLEET.filter(f => f.slug !== y.slug && f.type !== y.type)
                    .sort((a,b) => Math.abs(a.guests - y.guests) - Math.abs(b.guests - y.guests));
  const more = sameType.concat(rest).slice(0,3);
  return {
    slug: `fleet/${y.slug}.html`, depth: 1, nav: 'fleet.html', file: `fleet/${y.slug}.html`,
    title: `${y.name} Yacht Charter Greece | AIyachts`,
    description: `Charter the ${y.name} (${y.year}) in Greece — ${y.cabins} cabins, ${y.guests} guests, ${y.heads} ${y.heads>1?'heads':'head'}. Bareboat or skippered from our Lefkas and Athens bases.`,
    ogImage: `assets/fleet/${y.slug}.jpg`,
    ogType: 'product',
    crumbs: [{label:'Fleet', href:'fleet.html'}, {label:y.name, href:`fleet/${y.slug}.html`}],
    h1: y.name,
    schema: [{
      '@type':'Product', '@id': abs(`fleet/${y.slug}.html`) + '#yacht',
      name: y.name, brand: {'@type':'Brand', name: y.builder},
      category: y.type === 'Catamaran' ? 'Catamaran charter' : 'Sailing yacht charter',
      image: abs(`assets/fleet/${y.slug}.jpg`),
      description: y.blurb,
      productionDate: y.year,
      additionalProperty: [
        {'@type':'PropertyValue', name:'Cabins', value: y.cabins},
        {'@type':'PropertyValue', name:'Guests', value: y.guests},
        {'@type':'PropertyValue', name:'Berths', value: y.berths},
        {'@type':'PropertyValue', name:'Heads', value: y.heads},
        {'@type':'PropertyValue', name:'Year', value: y.year},
        {'@type':'PropertyValue', name:'Type', value: y.type}
      ]
    }],
    body: (r) => `
  <section class="yacht-hero">
    <div class="wrap">
      <div class="yacht-hero-grid">
        <div class="yacht-hero-media reveal">
          <img src="${r}assets/fleet/${y.slug}.jpg" alt="${esc(y.name)} ${esc(y.type.toLowerCase())} available for charter with AIyachts in Greece" width="1280" height="760" fetchpriority="high" decoding="async">
          <span class="yacht-flag big">${esc(y.type)}</span>
        </div>
        <div class="yacht-hero-copy reveal">
          <p class="eyebrow">${esc(y.builder)} · ${y.year} · ${(y.owner || 'partner') === 'own' ? 'Our fleet' : 'Partner yacht'}</p>
          <h1 class="display">${esc(y.name)}</h1>
          <p class="yacht-tagline">${esc(y.tag)}</p>
          <p class="yacht-blurb">${esc(y.blurb)}</p>
          <dl class="spec-strip">
            <div><dt>Cabins</dt><dd>${y.cabins}</dd></div>
            <div><dt>Guests</dt><dd>${y.guests}</dd></div>
            <div><dt>Berths</dt><dd>${y.berths}</dd></div>
            <div><dt>Heads</dt><dd>${y.heads}</dd></div>
          </dl>
          <div class="yacht-actions">
            <a class="btn" href="${r}contact.html?yacht=${encodeURIComponent(y.name)}">Enquire about this yacht <span class="arrow" aria-hidden="true">→</span></a>
            <a class="inline-link" href="${r}fleet.html">Back to the fleet</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="band-raised">
    <div class="wrap">
      <div class="two-col reveal">
        <div>
          <p class="eyebrow">Why this one</p>
          <h2 class="display">What she is good at.</h2>
          <ul class="tick-list">
            ${y.highlights.map(h => `<li>${esc(h)}</li>`).join('\n            ')}
          </ul>
        </div>
        <div>
          <p class="eyebrow">Specification</p>
          <h2 class="display">The numbers.</h2>
          ${specTable(y, [['Charter','Bareboat or skippered'], ['Bases','Lefkas (Ionian) · Athens (Aegean)']])}
          <p class="spec-note">Full technical details, sail wardrobe, equipment list and pricing for your dates are sent with every quotation.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="yacht-gallery-section">
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Photographs</p>
        <h2 class="display">${esc(y.name)}, inside and out.</h2>
        <p>Interior and exterior frames of this yacht. Open any of them full screen.</p>
      </div>
      ${yachtGallery(y, 1)}
    </div>
  </section>

  ${equipmentBlock(y) ? `<section class="band-raised">
    <div class="wrap">
      ${equipmentBlock(y)}
    </div>
  </section>` : ''}

  <section>
    <div class="wrap">
      <div class="section-head reveal">
        <p class="eyebrow">Also worth seeing</p>
        <h2 class="display">Other yachts in the fleet.</h2>
      </div>
      <div class="fleet-grid reveal-stagger">
        ${fleetCards(more, 1)}
      </div>
    </div>
  </section>

  ${y.photos && y.photos.length ? lightbox(y.photos.length) : ''}

  ${ctaBand(r, {
    eyebrow:'Availability',
    title:`Is the ${esc(y.name)} free on your dates?`,
    text:'Send us the week you have in mind and the size of your crew. We will confirm availability, price it honestly, and suggest an alternative if this one is taken.',
    primary:'Enquire now', primaryHref:'contact.html',
    secondary:'See all yachts', secondaryHref:'fleet.html'
  })}
`
  };
};

export const ROOT_PAGES = [home, about, destinations, fleet, experiences, services, brokerage, specialOffers, contact, privacy, notFound];
export const SUB_PAGES = [ionian, aegean, ...FLEET.map(yachtPage)];
export const ALL_PAGES = [...ROOT_PAGES, ...SUB_PAGES];
