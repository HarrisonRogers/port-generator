import type { GeneratedPortfolio } from '#/lib/portfolioSchema'

type FooterLink = {
  label: 'GitHub' | 'X' | 'LinkedIn'
  url: string
}

function parseUrl(url: string) {
  try {
    return new URL(url.includes('://') ? url : `https://${url}`)
  } catch {
    return null
  }
}

function isSingleSegmentProfileUrl(url: URL) {
  return url.pathname.split('/').filter(Boolean).length === 1
}

function getFooterLinks(data: GeneratedPortfolio) {
  const links: Array<FooterLink> = []
  const seenLabels = new Set<FooterLink['label']>()

  const addLink = (link: FooterLink) => {
    if (seenLabels.has(link.label)) return

    seenLabels.add(link.label)
    links.push(link)
  }

  const githubUrl = parseUrl(data.profile.githubUrl)

  if (
    githubUrl &&
    githubUrl.hostname.toLowerCase().endsWith('github.com') &&
    isSingleSegmentProfileUrl(githubUrl)
  ) {
    addLink({ label: 'GitHub', url: data.profile.githubUrl })
  }

  data.profile.socialLinks.forEach((link) => {
    const parsedUrl = parseUrl(link.url)

    if (!parsedUrl) return

    const hostname = parsedUrl.hostname.toLowerCase()

    if (
      (hostname === 'x.com' || hostname === 'twitter.com') &&
      isSingleSegmentProfileUrl(parsedUrl)
    ) {
      addLink({ label: 'X', url: link.url })
      return
    }

    if (
      hostname.endsWith('linkedin.com') &&
      parsedUrl.pathname.split('/').filter(Boolean)[0] === 'in'
    ) {
      addLink({ label: 'LinkedIn', url: link.url })
    }
  })

  return links
}

export function Footer({ data }: { data: GeneratedPortfolio }) {
  const footerLinks = getFooterLinks(data)

  return (
    <footer className="mb-16 flex items-center justify-between">
      <p className="mt-8 text-neutral-600 dark:text-neutral-300">
        {new Date().getFullYear()} {data.profile.name}
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
