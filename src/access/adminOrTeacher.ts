import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type Access = (args: AccessArgs<User>) => boolean

export const adminOrTeacher: Access = ({ req: { user } }) => {
  return Boolean(user && (user?.roles?.includes('admin') || user?.roles?.includes('teacher')))
}
