'use server'

import React, { ReactElement } from 'react'
import { redirect } from 'next/navigation'
import LoginForm from './components/LoginForm'
import { getMeUser } from '@/utilities/getMeUser'

export default async function Page(): Promise<ReactElement> {
  const { user } = await getMeUser()

  if (user) {
    redirect('/dashboard')
    return <></>
  }

  return (
    <div className="container">
      <LoginForm />
    </div>
  )
}
