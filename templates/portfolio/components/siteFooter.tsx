import { portfolio } from '@/data/portfolio'
import { getFooterLinks } from '@/lib/portfolioUtils'

export function SiteFooter() {
  const footerLinks = getFooterLinks(portfolio)

  return (
    <footer className="mb-16 flex items-center justify-between">
      <p className="mt-8 text-neutral-600 dark:text-neutral-300">
        {new Date().getFullYear()} {portfolio.profile.name}
      </p>
      <div className="mt-8 flex items-center gap-4">
        {footerLinks.map((link) => (
          <a
            key={`${link.label}-${link.url}`}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            className="text-sm text-neutral-600 underline underline-offset-2 transition-colors hover:text-black hover:no-underline dark:text-neutral-300 dark:hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
