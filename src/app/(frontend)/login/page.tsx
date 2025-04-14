'use server'

import React, { ReactElement } from 'react'
import { redirect } from 'next/navigation'
import LoginForm from './components/LoginForm'
import { getUser } from '../(authenticated)/actions/getUser'

export default async function Page(): Promise<ReactElement> {
  const user = await getUser()

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
