import type { CollectionConfig, PayloadRequest } from 'payload'
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
    create: ({ req }: { req: PayloadRequest }) => Boolean(req?.user && ((req.user as any).role === 'admin' || (req.user as any).role === 'editor')),
    update: ({ req }: { req: PayloadRequest }) => Boolean(req?.user && ((req.user as any).role === 'admin' || (req.user as any).role === 'editor')),
    delete: ({ req }: { req: PayloadRequest }) => Boolean(req?.user && (req.user as any).role === 'admin'),
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
      access: {
        // Only admins can set or change status (controls publishing)
        create: ({ req }: { req: PayloadRequest }) => Boolean(req?.user && (req.user as any).role === 'admin'),
        update: ({ req }: { req: PayloadRequest }) => Boolean(req?.user && (req.user as any).role === 'admin'),
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [TextBlock, HeroBlock, CTABlock],
    },
  ],
}

