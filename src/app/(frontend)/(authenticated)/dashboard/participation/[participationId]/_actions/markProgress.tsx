'use server'

import { getMeUser } from '@/utilities/getMeUser'
import { Participation } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function markProgress(participation: Participation) {
  const payload = await getPayload({ config: configPromise })
  const { user } = await getMeUser()

  if (!participation || typeof participation.progress !== 'number') {
    console.error('Participation not found or progress is not set')
    return null
  }

  const nextProgress = participation.progress + 1
  try {
    const updateRes = await payload.update({
      collection: 'participation',
      id: participation.id,
      data: {
        progress: nextProgress,
      },
      overrideAccess: false,
      user: user,
    })

    return updateRes
  } catch (error) {
    console.error('Error updating participation progress:', error)
    return null
  }
}
