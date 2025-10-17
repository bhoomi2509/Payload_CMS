import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Hero Blocks',
  },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text', required: false },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: false },
    { name: 'ctaLabel', type: 'text', required: false },
    { name: 'ctaUrl', type: 'text', required: false },

    { name: 'x', type: 'number', admin: { step: 1 }, required: false },
    { name: 'y', type: 'number', admin: { step: 1 }, required: false },
    { name: 'w', type: 'number', admin: { step: 1 }, required: false },
    { name: 'h', type: 'number', admin: { step: 1 }, required: false },
  ],
}
