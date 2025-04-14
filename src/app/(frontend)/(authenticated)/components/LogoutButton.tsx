'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { logout } from '../actions/logout'
import { Button } from '@/components/ui/button'

export default function LogoutButton() {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    setIsPending(true)

    const result = await logout()

    setIsPending(false)

    if (result.success) {
      router.push('/')
    } else {
      console.log(result.error || 'Logout failed')
    }
  }

  return (
    <>
      <Button onClick={handleLogout} size="sm" disabled={isPending}>
        {isPending ? 'Logging out...' : 'Logout'}
      </Button>
    </>
  )
}
