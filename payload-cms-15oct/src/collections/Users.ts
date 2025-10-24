import type { CollectionConfig, PayloadRequest } from 'payload'

export const Users: CollectionConfig = {
  slug: 'payload-users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      admin: {
        position: 'sidebar',
        description: 'User role. Admins can publish/delete; Editors can create/update.',
      },
      access: {
        // Only admins can set or change roles
        create: ({ req }: { req: PayloadRequest }) => Boolean(req?.user && (req.user as any).role === 'admin'),
        update: ({ req }: { req: PayloadRequest }) => Boolean(req?.user && (req.user as any).role === 'admin'),
      },
    },
  ],
}
