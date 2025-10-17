import type { CollectionConfig } from 'payload'
import { TextBlock } from '../blocks/Text'
import { HeroBlock } from '../blocks/Hero'
import { CTABlock } from '../blocks/CTA'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'path',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path for this page, e.g., /about or /products/widget',
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Optional. If left blank, set manually later or we can auto-generate via a hook.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [TextBlock, HeroBlock, CTABlock],
    },
  ],
}
