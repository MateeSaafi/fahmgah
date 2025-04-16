import { redirect } from 'next/navigation'
import React, { FC, ReactNode } from 'react'
import { getMeUser } from '@/utilities/getMeUser'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const { token } = await getMeUser()
  if (!token) {
    redirect('/login')
    return null
  }
  return <>{children}</>
}

export default Layout
