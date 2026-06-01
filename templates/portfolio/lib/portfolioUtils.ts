import type { Career, GeneratedPortfolio, SocialLink } from '@/data/portfolio'

type FooterLink = Pick<SocialLink, 'label' | 'url'>

export function sortCareers(a: Career, b: Career) {
  if (a.endDate === 'Present') return -1
  if (b.endDate === 'Present') return 1

  return dateScore(b.startDate) - dateScore(a.startDate)
}

export function formatCareerDate(dateString: string) {
  if (dateString === 'Present') return 'Present'
  if (dateString === 'Past') return 'Past'
  if (dateString === 'Unknown') return 'Unknown'

  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) return dateString

  return new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function getFooterLinks(data: GeneratedPortfolio) {
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

export function isAbsoluteUrl(value: string) {
  try {
    const url = new URL(value)

    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function dateScore(dateString: string) {
  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) return 0

  return date.getTime()
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
