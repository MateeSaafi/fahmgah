import type { CollectionConfig } from 'payload'

import { VideoBlock } from './blocks/VideoBlock'
import { QuizBlock } from './blocks/QuizBlock'
import { slugField } from '@/fields/slug'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const Courses: CollectionConfig = {
  slug: 'courses',
  versions: {
    drafts: true,
  },
  access: {
    create: ({ req: { user } }) => {
      return user?.collection === 'users'
    },
    read: authenticatedOrPublished,
    update: ({ req: { user } }) => {
      return user?.collection === 'users'
    },
    delete: ({ req: { user } }) => {
      return user?.collection === 'users'
    },
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'curriculum',
      type: 'blocks',
      blocks: [VideoBlock, QuizBlock],
    },
    ...slugField(),
  ],
}
