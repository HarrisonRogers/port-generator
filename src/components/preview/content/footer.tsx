import type { GeneratedPortfolio } from '#/lib/portfolioSchema'
import { Link } from '@tanstack/react-router'

export function Footer({ data }: { data: GeneratedPortfolio }) {
  return (
    <footer className="mb-16 flex items-center justify-between">
      <p className="mt-8 text-neutral-600 dark:text-neutral-300">
        {new Date().getFullYear()} {data.profile.name}
      </p>
      <div className="mt-8 flex items-center gap-4">
        {data.profile.socialLinks.map((link) => (
          <Link
            key={`${link.label}-${link.url}`}
            to={link.url}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            className="text-sm text-neutral-600 underline underline-offset-2 transition-colors hover:text-black hover:no-underline dark:text-neutral-300 dark:hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  )
}
