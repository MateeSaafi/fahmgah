import type { AccessArgs, FieldAccess, Where } from 'payload'

import type { User } from '@/payload-types'

type Access = (args: AccessArgs<User>) => boolean | Where

export const adminOrSelf: Access = ({ req: { user } }) => {
  if (user) {
    if (user.roles?.includes('admin')) {
      return true
    }

    return {
      id: {
        equals: user.id,
      },
    }
  }

  return false
}
export const adminOrSelfField: FieldAccess = ({ req: { user } }) => {
  return Boolean(user && user?.roles?.includes('admin'))
}
