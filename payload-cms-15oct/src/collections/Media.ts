import type { CollectionConfig, PayloadRequest } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req }: { req: PayloadRequest }) => Boolean(req?.user && ((req.user as any).role === 'admin' || (req.user as any).role === 'editor')),
    update: ({ req }: { req: PayloadRequest }) => Boolean(req?.user && ((req.user as any).role === 'admin' || (req.user as any).role === 'editor')),
    delete: ({ req }: { req: PayloadRequest }) => Boolean(req?.user && (req.user as any).role === 'admin'),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
