import type { User } from '@/payload-types'
import { AccessArgs } from 'payload'

type Access = (args: AccessArgs<User>) => boolean

export const teachers: Access = ({ req: { user } }) => {
  return Boolean(user && user?.roles?.includes('teacher'))
}
