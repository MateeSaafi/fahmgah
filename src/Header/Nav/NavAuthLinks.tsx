import React from 'react'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LogoutButton } from '@/Header/Nav/LogoutButton'
import { getMeUser } from '@/utilities/getMeUser'

export const NavAuthLinks: React.FC = async () => {
  const { user } = await getMeUser()
  return (
    <>
      {user === null ? (
        <Button size="sm" className="h-8">
          <Link href="/login">Login</Link>
        </Button>
      ) : (
        <LogoutButton />
      )}
    </>
  )
}
