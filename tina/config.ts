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
            type: 'image',
            name: 'heroImageLight',
            label: 'Hero Background — Light mode',
            description: 'Big background photo at the top of the home page (shown in light mode).',
          },
          {
            type: 'image',
            name: 'heroImageDark',
            label: 'Hero Background — Dark mode',
            description: 'Background photo shown when a visitor uses dark mode.',
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
