import { z } from 'zod'

const socialLinkSchema = z.object({
  label: z
    .enum(['GitHub', 'X', 'LinkedIn'])
    .describe('Only GitHub, X, or LinkedIn profile links belong here.'),
  url: z.string().min(1),
})

const profileSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  headline: z
    .string()
    .min(1)
    .describe(
      'A short role-style noun phrase that reads naturally after "I\'m a".',
    ),
  location: z.string(),
  bio: z
    .string()
    .min(1)
    .describe(
      'A fresh one-sentence professional summary synthesized from the raw GitHub data, not copied from the GitHub bio or README.',
    ),
  avatarUrl: z.string(),
  githubUrl: z.string().min(1),
  websiteUrl: z.string(),
  socialLinks: z
    .array(socialLinkSchema)
    .max(3)
    .describe(
      'Only include the user GitHub profile, X/Twitter profile, and LinkedIn profile. Do not include websites, emails, project pages, repositories, employers, or any other links.',
    ),
})

const techStackSchema = z.object({
  languages: z.array(z.string()),
  frontend: z.array(z.string()),
  backend: z.array(z.string()),
})

const projectSchema = z.object({
  title: z.string().min(1),
  description: z
    .string()
    .min(1)
    .describe(
      'One short paragraph explaining what the project appears to do and why it matters; do not repeat the repository description verbatim.',
    ),
  url: z
    .string()
    .describe(
      'The absolute live website or demo URL for this project. Use an empty string if the project has no separate homepage/demo; never put a GitHub repository URL here.',
    ),
  sourceCode: z
    .string()
    .describe(
      'The absolute GitHub repository URL for this project, copied from the raw project url field. Use an empty string if unknown; never use selection labels such as pinned, owned-repo, or recent-contribution.',
    ),
  stars: z.number(),
  updatedAt: z.string(),
})

const careerSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  url: z.string(),
  confidence: z.enum(['high', 'medium', 'low']),
})

export const generatedPortfolioSchema = z.object({
  profile: profileSchema,
  home: z.object({
    intro: z
      .string()
      .min(1)
      .describe(
        'One or two human-sounding sentences that introduce the person in new wording based on the evidence.',
      ),
    highlights: z
      .array(
        z
          .string()
          .describe(
            'A short, scannable highlight written in fresh language from supported facts.',
          ),
      )
      .max(4),
  }),
  about: z.object({
    paragraphs: z
      .array(
        z
          .string()
          .describe(
            'A short paragraph that synthesizes supported GitHub and personal context into original portfolio prose.',
          ),
      )
      .min(1)
      .max(3),
  }),
  techStack: techStackSchema,
  projects: z.array(projectSchema).max(4),
  careers: z.array(careerSchema),
  notes: z.object({
    projectSelection: z.string().min(1),
    careerInference: z.string().min(1),
  }),
})

export type GeneratedPortfolio = z.infer<typeof generatedPortfolioSchema>
export type Project = GeneratedPortfolio['projects'][number]
export type Career = GeneratedPortfolio['careers'][number]

export function parseGeneratedPortfolio(value: unknown) {
  const result = generatedPortfolioSchema.safeParse(
    normalizeGeneratedPortfolio(value),
  )

  return result.success ? result.data : null
}

function normalizeGeneratedPortfolio(value: unknown) {
  if (!isRecord(value)) return value

  const profile = value.profile

  if (!isRecord(profile)) return value

  return {
    ...value,
    projects: normalizeProjects(value.projects),
    profile: {
      ...profile,
      socialLinks: normalizeSocialLinks(profile.socialLinks),
    },
  }
}

function normalizeProjects(value: unknown) {
  if (!Array.isArray(value)) return value

  return value.map((project) => {
    if (!isRecord(project)) return project

    const url = typeof project.url === 'string' ? project.url : ''
    const sourceCode =
      typeof project.sourceCode === 'string' ? project.sourceCode : ''
    const hasGitHubRepoInUrl = isGitHubRepoUrl(url)

    return {
      ...project,
      url: isAbsoluteHttpUrl(url) && !hasGitHubRepoInUrl ? url : '',
      sourceCode: isAbsoluteHttpUrl(sourceCode)
        ? sourceCode
        : hasGitHubRepoInUrl
          ? url
          : '',
    }
  })
}

function normalizeSocialLinks(value: unknown) {
  if (!Array.isArray(value)) return []

  const links: Array<{ label: 'GitHub' | 'X' | 'LinkedIn'; url: string }> = []
  const seenLabels = new Set<string>()

  value.forEach((item) => {
    if (!isRecord(item) || typeof item.url !== 'string') return

    const label = getSocialLinkLabel(item.label, item.url)

    if (!label || seenLabels.has(label)) return

    seenLabels.add(label)
    links.push({ label, url: item.url })
  })

  return links.slice(0, 3)
}

function getSocialLinkLabel(label: unknown, url: string) {
  const normalizedLabel = typeof label === 'string' ? label.toLowerCase() : ''
  const hostname = getHostname(url)

  if (normalizedLabel === 'github' || hostname.endsWith('github.com')) {
    return 'GitHub'
  }

  if (
    normalizedLabel === 'x' ||
    normalizedLabel === 'twitter' ||
    hostname === 'x.com' ||
    hostname === 'twitter.com'
  ) {
    return 'X'
  }

  if (normalizedLabel === 'linkedin' || hostname.endsWith('linkedin.com')) {
    return 'LinkedIn'
  }

  return null
}

function getHostname(url: string) {
  try {
    return new URL(
      url.includes('://') ? url : `https://${url}`,
    ).hostname.toLowerCase()
  } catch {
    return ''
  }
}

function isAbsoluteHttpUrl(value: string) {
  try {
    const url = new URL(value)

    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function isGitHubRepoUrl(value: string) {
  try {
    const url = new URL(value)
    const pathParts = url.pathname.split('/').filter(Boolean)

    return (
      url.hostname.toLowerCase().endsWith('github.com') && pathParts.length >= 2
    )
  } catch {
    return false
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value))
}
