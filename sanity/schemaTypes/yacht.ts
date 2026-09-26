import { defineType, defineField, defineArrayMember } from 'sanity';

// The yacht document. Fields map 1:1 to the FLEET shape consumed by
// build/site.mjs -> build/pages.mjs. Photos are LOCAL repo files keyed
// by slug (assets/fleet/<slug>.jpg and assets/fleet/gallery/<slug>-*.{jpg,webp});
// Sanity stores the data, the image pipeline stays in the repo.

const TYPES = [
  { title: 'Monohull', value: 'Monohull' },
  { title: 'Catamaran', value: 'Catamaran' }
];

export const yacht = defineType({
  name: 'yacht',
  title: 'Yacht',
  type: 'document',
  groups: [
    { name: 'details', title: 'Details', default: true },
    { name: 'specs', title: 'Specifications' },
    { name: 'photos', title: 'Photos' },
    { name: 'website', title: 'Website' }
  ],
  fields: [
    defineField({
      name: 'name', title: 'Name', type: 'string', group: 'details',
      description: 'e.g. "Bavaria 46 Cruiser"',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug', group: 'details',
      description: 'URL + fallback image key. Keep stable once set.',
      options: { source: 'name', maxLength: 64 },
      validation: (r) => r.required()
    }),
    defineField({
      name: 'mainImage', title: 'Main photo', type: 'image', group: 'details',
      description: 'The card + hero photo shown on the site. Uploaded here and served from Sanity.',
      options: { hotspot: true },
      validation: (r) => r.required()
    }),
    defineField({
      name: 'builder', title: 'Builder', type: 'string', group: 'details',
      description: 'e.g. "Bavaria Yachts", "Jeanneau", "Lagoon Catamarans"',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'year', title: 'Model year', type: 'string', group: 'details',
      description: 'Build year as text, e.g. "2018"',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'type', title: 'Type', type: 'string', group: 'details',
      options: { list: TYPES, layout: 'radio' },
      initialValue: 'Monohull',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'category', title: 'Category label', type: 'string', group: 'details',
      description: 'Shown on cards, e.g. "3 Cabins" or "Catamaran"',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'owner', title: 'Ownership', type: 'string', group: 'details',
      options: {
        list: [
          { title: 'Our fleet', value: 'own' },
          { title: "Partner's yacht", value: 'partner' }
        ],
        layout: 'radio'
      },
      initialValue: 'partner',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'tag', title: 'Short tag', type: 'string', group: 'details',
      description: 'One-line positioning, e.g. "The all-rounder"',
      validation: (r) => r.required()
    }),
    defineField({
      name: 'blurb', title: 'Blurb', type: 'text', rows: 4, group: 'details',
      description: 'The descriptive paragraph on the yacht page.',
      validation: (r) => r.required().min(40)
    }),
    defineField({
      name: 'highlights', title: 'Highlights', type: 'array', group: 'details',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Three short bullet points ("What she is good at").',
      validation: (r) => r.required().min(1).max(6)
    }),

    // ---- Capacity ----
    defineField({ name: 'cabins', title: 'Cabins', type: 'number', group: 'details', validation: (r) => r.required().integer().min(0) }),
    defineField({ name: 'guests', title: 'Guests', type: 'number', group: 'details', validation: (r) => r.required().integer().min(0) }),
    defineField({ name: 'berths', title: 'Berths', type: 'number', group: 'details', validation: (r) => r.required().integer().min(0) }),
    defineField({ name: 'heads', title: 'Heads', type: 'number', group: 'details', validation: (r) => r.required().integer().min(0) }),

    // ---- Specifications (all optional, printed only when present) ----
    defineField({
      name: 'specs', title: 'Technical specification', type: 'object', group: 'specs',
      description: 'Optional. Any field left blank is hidden on the spec table.',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'loa', title: 'Length overall', type: 'string' }),
        defineField({ name: 'beam', title: 'Beam', type: 'string' }),
        defineField({ name: 'draft', title: 'Draft', type: 'string' }),
        defineField({ name: 'displacement', title: 'Displacement', type: 'string' }),
        defineField({ name: 'engine', title: 'Engine', type: 'string' }),
        defineField({ name: 'fuel', title: 'Fuel', type: 'string' }),
        defineField({ name: 'water', title: 'Water', type: 'string' }),
        defineField({ name: 'mainsail', title: 'Mainsail', type: 'string' }),
        defineField({ name: 'headsail', title: 'Headsail', type: 'string' })
      ]
    }),
    defineField({
      name: 'equipment', title: 'Equipment groups', type: 'array', group: 'specs',
      description: 'Optional. Each group becomes a titled list in the "Equipment" block.',
      of: [defineArrayMember({
        type: 'object',
        name: 'equipmentGroup',
        fields: [
          defineField({ name: 'title', title: 'Group title', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'items', title: 'Items', type: 'array', of: [defineArrayMember({ type: 'string' })], validation: (r) => r.required().min(1) })
        ],
        preview: {
          select: { title: 'title', items: 'items' },
          prepare: ({ title, items }) => ({ title, subtitle: (items || []).length + ' items' })
        }
      })]
    }),

    // ---- Photos (local files keyed by slug) ----
    defineField({
      name: 'photos', title: 'Gallery photos', type: 'array', group: 'photos',
      description: 'Gallery frames. Each "photo slug" must exist as assets/fleet/gallery/<photo slug>-800.jpg / -1600.jpg (+ .webp). The main card/hero image is assets/fleet/<yacht slug>.jpg and is not listed here.',
      of: [defineArrayMember({
        type: 'object',
        name: 'photo',
        fields: [
          defineField({ name: 'slug', title: 'Photo slug (file name, no extension)', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: (r) => r.required() }),
          defineField({
            name: 'cat', title: 'Category', type: 'string',
            options: { list: [{ title: 'Exterior', value: 'exterior' }, { title: 'Interior', value: 'interior' }], layout: 'radio' },
            initialValue: 'exterior'
          }),
          defineField({ name: 'title', title: 'Caption (optional)', type: 'string' })
        ],
        preview: {
          select: { title: 'slug', subtitle: 'cat' },
          prepare: ({ title, subtitle }) => ({ title, subtitle })
        }
      })]
    }),

    // ---- Website ----
    defineField({
      name: 'showOnWebsite', title: 'Show on website', type: 'boolean', group: 'website',
      description: 'Turn off to remove the yacht from the site on next publish.',
      initialValue: true
    }),
    defineField({
      name: 'order', title: 'Sort order', type: 'number', group: 'website',
      description: 'Lower numbers appear first within their group. Leave blank to sort by name.'
    })
  ],

  preview: {
    select: { title: 'name', subtitle: 'category', owner: 'owner', show: 'showOnWebsite' },
    prepare: ({ title, subtitle, owner, show }) => ({
      title: (show === false ? '(hidden) ' : '') + title,
      subtitle: [subtitle, owner === 'own' ? 'Our fleet' : 'Partner'].filter(Boolean).join(' · ')
    })
  }
});
