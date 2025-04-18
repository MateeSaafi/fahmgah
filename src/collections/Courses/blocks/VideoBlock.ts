import { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'video',
  labels: {
    singular: 'Video',
    plural: 'Videos',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
    },
    {
      name: 'videoUrl',
      type: 'text',
      required: true,
    },
  ],
}
