'use server'
import configPromise from '@payload-config'

import { getPayload } from 'payload'
import { getMeUser } from '@/utilities/getMeUser'

export async function participate(courseId: number) {
  const payload = await getPayload({ config: configPromise })

  // get the user
  const { user } = await getMeUser()

  if (!user) {
    throw new Error('User not found')
  }

  // create participation
  const createdParticipation = await payload.create({
    collection: 'participation',
    data: {
      users: user.id,
      course: courseId,
      progress: 0,
    },
  })

  return createdParticipation
}
