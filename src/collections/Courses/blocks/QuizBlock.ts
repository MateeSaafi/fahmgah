import { Block } from 'payload'

export const QuizBlock: Block = {
  slug: 'quiz',
  labels: {
    singular: 'Quiz',
    plural: 'Quizzes',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'questions',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answers',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'answer',
              type: 'text',
              required: true,
            },
            {
              name: 'correct',
              type: 'checkbox',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
