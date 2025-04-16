import { CollectionConfig } from 'payload'

export const Participation: CollectionConfig = {
  slug: 'participation',
  fields: [
    {
      name: 'users',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
    },
    {
      name: 'completed',
      type: 'checkbox',
    },
    {
      name: 'progress',
      type: 'number',
    },
  ],
}
