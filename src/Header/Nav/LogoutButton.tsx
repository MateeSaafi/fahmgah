'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { logout } from '@/utilities/logout'

export function LogoutButton() {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    setIsPending(true)

    const result = await logout()

    setIsPending(false)

    if (result.success) {
      router.push('/')
      console.log('Logout successful')
    } else {
      console.log(result.error || 'Logout failed')
    }
  }

  return (
    <>
      <Button
        onClick={handleLogout}
        className="h-8"
        size="sm"
        disabled={isPending}
        variant="destructive"
      >
        {isPending ? 'Logging out...' : 'Logout'}
      </Button>
    </>
  )
}
