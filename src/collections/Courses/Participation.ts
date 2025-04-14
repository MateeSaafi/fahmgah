import { CollectionConfig } from 'payload'

export const Participation: CollectionConfig = {
  slug: 'participation',
  fields: [
    {
      name: 'customers',
      type: 'relationship',
      relationTo: 'customers',
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
