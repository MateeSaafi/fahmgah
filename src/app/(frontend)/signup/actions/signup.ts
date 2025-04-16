'use server'

import { User } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'

interface SignupParams {
  email: string
  password: string
}

export interface SignupResponse {
  success: boolean
  error?: string
}

type Result = {
  exp?: number
  token?: string
  user?: User
}

export async function signup({ email, password }: SignupParams): Promise<SignupResponse> {
  const payload = await getPayload({ config })
  try {
    await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        role: 'student',
      },
    })

    const result: Result = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    })

    if (result.token) {
      let cookieStore = await cookies()
      cookieStore.set({
        name: 'payload-token',
        value: result.token,
        httpOnly: true,
        path: '/',
      })
      return { success: true }
    } else {
      return { success: false, error: 'Login failed' }
    }
  } catch (error) {
    return { success: false, error: 'Signup failed' }
  }
}
