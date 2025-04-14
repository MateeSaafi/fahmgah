import { ReactElement } from 'react'
import SignupForm from './components/SignupForm'
import { getUser } from '../(authenticated)/actions/getUser'
import { redirect } from 'next/navigation'

export default async function page(): Promise<ReactElement> {
  const user = await getUser()

  if (user) {
    redirect('/dashboard')
    return <></>
  }

  return (
    <div className="container">
      <SignupForm />
    </div>
  )
}
