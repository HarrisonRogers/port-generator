import type { ReactNode } from 'react'

import { ArrowIcon } from './arrowIcon'

type FooterLinkProps = {
  children: ReactNode
  href: string
}

export function FooterLink({ children, href }: FooterLinkProps) {
  return (
    <a
      className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
      rel="noopener noreferrer"
      target={href.startsWith('http') ? '_blank' : undefined}
      href={href}
    >
      <ArrowIcon />
      <p className="ml-2 h-7">{children}</p>
    </a>
  )
}
