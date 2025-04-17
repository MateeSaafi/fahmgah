'use server'

import { getMeUser } from '@/utilities/getMeUser'
import { Participation } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function markProgress(participation: Participation) {
  const payload = await getPayload({ config: configPromise })

  console.log('markProgress', participation)

  // check if participation exists and it has progress
  if (!participation || typeof participation.progress !== 'number') {
    console.error('Participation not found or progress is not set')
    return null
  }

  // increase the progress by 1
  const newProgress = participation.progress + 1
  // update the participation
  const updatedParticipation = await payload.update({
    collection: 'participation',
    id: participation.id,
    data: {
      progress: newProgress,
    },
    user: await getMeUser(),
    overrideAccess: false,
  })

  return updatedParticipation
}
