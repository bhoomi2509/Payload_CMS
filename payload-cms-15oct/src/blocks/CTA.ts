import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'CTA',
    plural: 'CTA Blocks',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: false },
    { name: 'buttonLabel', type: 'text', required: false },
    { name: 'buttonUrl', type: 'text', required: false },
    { name: 'image', type: 'upload', relationTo: 'media', required: false },

    { name: 'x', type: 'number', admin: { step: 1 }, required: false },
    { name: 'y', type: 'number', admin: { step: 1 }, required: false },
    { name: 'w', type: 'number', admin: { step: 1 }, required: false },
    { name: 'h', type: 'number', admin: { step: 1 }, required: false },
  ],
}
