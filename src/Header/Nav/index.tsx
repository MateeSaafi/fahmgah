import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { NavAuthLinks } from './NavAuthLinks'
export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="py-5 bg-white dark:bg-black/50 backdrop-blur-sm border-b border-b-primary/10 dark:border-b-primary/20 sticky mb-24 top-0 z-50">
      <div className="container flex justify-between gap-3 items-center">
        <div className="flex gap-3 items-center">
          <Link href="/">
            <Logo loading="eager" priority="high" className="invert dark:invert-0" />
          </Link>
          {navItems.map(({ link }, i) => {
            return <CMSLink key={i} {...link} appearance="link" />
          })}
        </div>
        <div className="flex items-center gap-4">
          <NavAuthLinks />
          <Link href="/search">
            <span className="sr-only">Search</span>
            <SearchIcon className="w-5 text-primary" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
