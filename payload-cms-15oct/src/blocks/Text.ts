import type { Block } from 'payload'

export const TextBlock: Block = {
  slug: 'text',
  labels: {
    singular: 'Text',
    plural: 'Text Blocks',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: false,
    },
    { name: 'x', type: 'number', admin: { step: 1 }, required: false },
    { name: 'y', type: 'number', admin: { step: 1 }, required: false },
    { name: 'w', type: 'number', admin: { step: 1 }, required: false },
    { name: 'h', type: 'number', admin: { step: 1 }, required: false },
  ],
}
