import { ReactElement } from 'react'
import SignupForm from './components/SignupForm'
import { redirect } from 'next/navigation'
import { getMeUser } from '@/utilities/getMeUser'

export default async function page(): Promise<ReactElement> {
  const { token } = await getMeUser()

  if (token) {
    redirect('/dashboard')
    return <></>
  }

  return (
    <div className="container">
      <SignupForm />
    </div>
  )
}
