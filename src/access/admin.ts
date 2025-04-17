import type { AccessArgs, FieldAccess } from 'payload'

import type { User } from '@/payload-types'

type Access = (args: AccessArgs<User>) => boolean

export const admin: Access = ({ req: { user } }) => {
  return Boolean(user && user?.roles?.includes('admin'))
}

export const adminField: FieldAccess = ({ req: { user } }) => {
  return Boolean(user && user?.roles?.includes('admin'))
}
