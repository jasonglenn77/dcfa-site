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
      mediaRoot: 'images/uploads', // uploads land in public/images/uploads/
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
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
