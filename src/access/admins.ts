import type { AccessArgs, FieldAccess } from 'payload'

import type { User } from '@/payload-types'

type Access = (args: AccessArgs<User>) => boolean

export const admins: Access = ({ req: { user } }) => {
  return Boolean(user && user?.roles?.includes('admin'))
}

export const adminsField: FieldAccess = ({ req: { user } }) => {
  return Boolean(user && user?.roles?.includes('admin'))
}
