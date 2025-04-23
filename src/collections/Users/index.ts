import type { CollectionConfig } from 'payload'

import { admins, adminsField } from '@/access/admins'
import { adminOrTeacher } from '@/access/adminOrTeacher'
import { adminOrSelf } from '@/access/adminOrSelf'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: adminOrTeacher,
    create: admins,
    delete: admins,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 7, // 7 days
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Teacher',
          value: 'teacher',
        },
        {
          label: 'Student',
          value: 'student',
        },
      ],
      hasMany: true,
      saveToJWT: true,
      defaultValue: ['student'],
      access: {
        create: adminsField,
        update: adminsField,
      },
    },
  ],
  timestamps: true,
}
