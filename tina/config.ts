import { defineConfig } from 'tinacms';

// The branch Tina reads/writes. Defaults to main (your production branch).
const branch =
  process.env.TINA_BRANCH ||
  process.env.GITHUB_BRANCH ||
  process.env.HEAD ||
  'main';

export default defineConfig({
  branch,
  // Both come from your TinaCloud project (app.tina.io). Set them in .env
  // locally and in the Cloudflare build environment for production.
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',

  build: {
    outputFolder: 'admin', // admin SPA is generated into public/admin/
    publicFolder: 'public',
  },
  media: {
    tina: {
      // Whole images folder, so ALL existing site images (aircraft, cockpit,
      // team, partners, etc.) are visible and selectable in the media manager.
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'faq',
        label: 'FAQ',
        path: 'src/data/faq',
        format: 'json',
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: 'object',
            name: 'items',
            label: 'Questions',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.question || 'Question' }),
            },
            fields: [
              { type: 'string', name: 'question', label: 'Question' },
              { type: 'string', name: 'answer', label: 'Answer', ui: { component: 'textarea' } },
            ],
          },
        ],
      },
      {
        name: 'reviews',
        label: 'Reviews / Testimonials',
        path: 'src/data/reviews',
        format: 'json',
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: 'object',
            name: 'items',
            label: 'Reviews',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.author || 'Review' }),
            },
            fields: [
              { type: 'string', name: 'author', label: 'Name' },
              { type: 'number', name: 'rating', label: 'Star rating (1-5)' },
              { type: 'string', name: 'text', label: 'Review', ui: { component: 'textarea' } },
              { type: 'string', name: 'source', label: 'Source', description: 'e.g. "Google"' },
            ],
          },
        ],
      },
      {
        name: 'fleet',
        label: 'Fleet (Aircraft)',
        path: 'src/data/fleet',
        format: 'json',
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'number', name: 'instructionRate', label: 'Flight Instruction Rate ($/hr)' },
          {
            type: 'object',
            name: 'simulator',
            label: 'Elite Simulator',
            fields: [
              { type: 'string', name: 'name', label: 'Name' },
              { type: 'number', name: 'hourlyRate', label: 'Hourly Rate ($)' },
              { type: 'string', name: 'note', label: 'Note', description: 'e.g. "Instructor included."' },
              { type: 'string', name: 'specs', label: 'Details / specs', description: 'Configurations, avionics, visuals — add one per item.', list: true },
            ],
          },
          {
            type: 'object',
            name: 'aircraft',
            label: 'Aircraft',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.tailNumber || 'Aircraft' }),
            },
            fields: [
              { type: 'string', name: 'tailNumber', label: 'Tail Number' },
              { type: 'string', name: 'makeModel', label: 'Make / Model', description: 'e.g. "Cessna 172", "Diamond DA-42"' },
              { type: 'string', name: 'type', label: 'Type', description: 'e.g. "Single-Engine"' },
              { type: 'number', name: 'hourlyRate', label: 'Hourly Rate ($, wet)' },
              { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
              { type: 'image', name: 'photo', label: 'Photo' },
              { type: 'string', name: 'specs', label: 'Details / specs (shown on hover)', description: 'Avionics, engine, seats, etc. — add one per item.', list: true },
            ],
          },
        ],
      },
      {
        name: 'atpctp',
        label: 'ATP-CTP Page',
        path: 'src/data/atpctp',
        format: 'json',
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: 'object',
            name: 'groundSchoolDates',
            label: 'Ground School Dates',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.date || 'Date' }) },
            fields: [
              { type: 'string', name: 'date', label: 'Date(s)' },
              { type: 'string', name: 'note', label: 'Note' },
            ],
          },
          {
            type: 'object',
            name: 'simulatorDates',
            label: 'Simulator Dates',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.date || 'Sim date' }) },
            fields: [
              { type: 'string', name: 'date', label: 'Date(s)' },
              { type: 'string', name: 'location', label: 'Location' },
              { type: 'number', name: 'slotsTotal', label: 'Total slots (usually 2)' },
              { type: 'number', name: 'slotsLeft', label: 'Slots left' },
            ],
          },
          {
            type: 'object',
            name: 'simPhotos',
            label: 'A320 Simulator Photos',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.caption || 'Photo' }),
            },
            fields: [
              { type: 'image', name: 'image', label: 'Photo' },
              { type: 'string', name: 'caption', label: 'Caption' },
            ],
          },
          {
            type: 'object',
            name: 'reviews',
            label: 'Client Reviews',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.author || 'Review' }),
            },
            fields: [
              { type: 'string', name: 'quote', label: 'Review', ui: { component: 'textarea' } },
              { type: 'string', name: 'author', label: 'Name' },
            ],
          },
        ],
      },
      {
        name: 'team',
        label: 'Team & Graduates',
        path: 'src/data/team',
        format: 'json',
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: 'object',
            name: 'instructors',
            label: 'Instructors / Staff',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || 'Person' }),
            },
            fields: [
              { type: 'string', name: 'name', label: 'Name' },
              { type: 'string', name: 'role', label: 'Role / Title' },
              { type: 'image', name: 'photo', label: 'Photo' },
              { type: 'string', name: 'bio', label: 'Bio', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object',
            name: 'graduates',
            label: 'Graduate Spotlights',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || 'Graduate' }),
            },
            fields: [
              { type: 'string', name: 'name', label: 'Name' },
              { type: 'string', name: 'achievement', label: 'Now flying / Achievement' },
              { type: 'image', name: 'photo', label: 'Photo' },
              { type: 'string', name: 'bio', label: 'Bio', ui: { component: 'textarea' } },
            ],
          },
        ],
      },
      {
        name: 'partners',
        label: 'Partners',
        path: 'src/data/partners',
        format: 'json',
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: 'object',
            name: 'items',
            label: 'Partners',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || 'Partner' }),
            },
            fields: [
              { type: 'string', name: 'name', label: 'Name' },
              { type: 'image', name: 'logo', label: 'Logo' },
              { type: 'string', name: 'wordmark', label: 'Wordmark', description: 'Text shown if there is no logo (e.g. "MSU DENVER").' },
              { type: 'string', name: 'meta', label: 'Tagline / meta line' },
              { type: 'string', name: 'blurb', label: 'Description', ui: { component: 'textarea' } },
              { type: 'string', name: 'url', label: 'Website URL' },
              { type: 'boolean', name: 'airlinePartner', label: 'Show logo in home page "Airline Partners" strip' },
            ],
          },
        ],
      },
      {
        name: 'scholarships',
        label: 'Scholarships',
        path: 'src/data/scholarships',
        format: 'json',
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: 'object',
            name: 'items',
            label: 'Scholarships',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.organization || 'Scholarship' }),
            },
            fields: [
              { type: 'string', name: 'organization', label: 'Organization' },
              { type: 'string', name: 'award', label: 'Award' },
              { type: 'string', name: 'eligibility', label: 'Eligibility' },
              { type: 'string', name: 'notes', label: 'Notes', ui: { component: 'textarea' } },
              { type: 'string', name: 'url', label: 'Website URL' },
              { type: 'image', name: 'logo', label: 'Logo' },
            ],
          },
        ],
      },
      {
        name: 'home',
        label: 'Home Page',
        path: 'src/data/home',
        format: 'json',
        // Singleton: owners edit the one Home Page doc, can't create/delete it.
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: 'object',
            name: 'heroImages',
            label: 'Hero Carousel Images',
            description: 'Full-width photos that rotate at the top of the home page. Add a few landscape (wide) shots.',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.image || 'Photo' }),
            },
            fields: [
              { type: 'image', name: 'image', label: 'Photo' },
            ],
          },
          {
            type: 'object',
            name: 'gallery',
            label: 'Photo Gallery (bottom of home page)',
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.caption || 'Photo' }),
            },
            fields: [
              { type: 'image', name: 'image', label: 'Photo' },
              { type: 'string', name: 'caption', label: 'Caption' },
              {
                type: 'string',
                name: 'focus',
                label: 'Crop focus',
                description: 'Which part of the photo to keep when it is cropped to fit its tile. Choose "Top" for group photos so faces are not cut off. Defaults to Top.',
                options: [
                  { value: 'top', label: 'Top (keep heads / faces)' },
                  { value: 'center', label: 'Center' },
                  { value: 'bottom', label: 'Bottom' },
                  { value: 'left', label: 'Left' },
                  { value: 'right', label: 'Right' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'src/content/blog',
        format: 'md',
        // Fields mirror the Astro content collection in src/content.config.ts.
        // Keep the two in sync if you add/rename a field.
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            description: 'Short summary shown on the blog list and in search results.',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'datetime',
            name: 'pubDate',
            label: 'Publish Date',
            required: true,
          },
          {
            type: 'string',
            name: 'author',
            label: 'Author',
          },
          {
            type: 'image',
            name: 'heroImage',
            label: 'Hero Image',
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Draft (hide from the live site)',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
        ui: {
          // "View" link in the CMS points at the live post.
          router: ({ document }) => `/blog/${document._sys.filename}`,
        },
      },
    ],
  },
});
