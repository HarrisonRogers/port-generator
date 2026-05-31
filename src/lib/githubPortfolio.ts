type GitHubUser = {
  login: string
  name: string | null
  bio: string | null
  blog: string | null
  company: string | null
  email: string | null
  html_url: string
  avatar_url: string
  location: string | null
  twitter_username: string | null
}

type GitHubRepo = {
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  fork: boolean
  archived: boolean
  stargazers_count: number
  pushed_at: string | null
  updated_at: string | null
  language: string | null
  topics?: Array<string>
}

type GitHubEvent = {
  type: string
  repo?: {
    name: string
  }
}

type GitHubReadme = {
  content: string
  encoding: string
}

type GitHubLanguages = Record<string, number>

type PinnedRepoNode = {
  name: string
  nameWithOwner: string
  description: string | null
  url: string
  homepageUrl: string | null
  stargazerCount: number
  pushedAt: string | null
  updatedAt: string | null
  isArchived: boolean
  isFork: boolean
  primaryLanguage: { name: string } | null
  repositoryTopics: {
    nodes: Array<{ topic: { name: string } }>
  }
  languages: {
    edges: Array<{ size: number; node: { name: string } }>
  }
}

export type RawGitHubProject = {
  name: string
  fullName: string
  description: string
  url: string
  homepage?: string
  stars: number
  pushedAt?: string
  updatedAt?: string
  languages: Array<string>
  topics: Array<string>
  source: 'pinned' | 'recent-contribution' | 'owned-repo'
}

export type RawGitHubPortfolio = {
  user: {
    username: string
    name: string
    bio: string
    blog?: string
    company?: string
    email?: string
    githubUrl: string
    avatarUrl: string
    location?: string
    twitterUsername?: string
  }
  profileReadme: string
  projects: Array<RawGitHubProject>
  allRepoLanguages: Array<string>
  personalAbout: string
  projectSelectionSource: 'pinned' | 'recent-contribution' | 'owned-repo'
}

const GITHUB_API_URL = 'https://api.github.com'
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'
const PROJECT_LIMIT = 4

export async function fetchRawGitHubPortfolio(
  usernameInput: string,
  personalAbout: string,
) {
  const username = normalizeGitHubUsername(usernameInput)

  if (!username) {
    throw new Error('Enter a GitHub username or profile URL.')
  }

  const user = await fetchGitHubJson<GitHubUser>(
    `${GITHUB_API_URL}/users/${username}`,
  )

  if (!user) {
    throw new Error(`Could not find a GitHub user named "${username}".`)
  }

  const profileReadme = await fetchProfileReadme(user.login)
  const pinnedProjects = await fetchPinnedProjects(user.login)
  const recentProjects =
    pinnedProjects.length > 0
      ? []
      : await fetchRecentContributionProjects(user.login)
  const ownedProjects =
    pinnedProjects.length > 0 || recentProjects.length > 0
      ? []
      : await fetchOwnedRepoProjects(user.login)
  const projects = [
    ...pinnedProjects,
    ...recentProjects,
    ...ownedProjects,
  ].slice(0, PROJECT_LIMIT)

  return {
    user: {
      username: user.login,
      name: user.name ?? user.login,
      bio: user.bio ?? '',
      blog: user.blog || undefined,
      company: user.company || undefined,
      email: user.email || undefined,
      githubUrl: user.html_url,
      avatarUrl: user.avatar_url,
      location: user.location || undefined,
      twitterUsername: user.twitter_username || undefined,
    },
    profileReadme,
    projects,
    allRepoLanguages: uniqueStrings(
      projects.flatMap((project) => project.languages),
    ),
    personalAbout,
    projectSelectionSource:
      pinnedProjects.length > 0
        ? 'pinned'
        : recentProjects.length > 0
          ? 'recent-contribution'
          : 'owned-repo',
  } satisfies RawGitHubPortfolio
}

function normalizeGitHubUsername(input: string) {
  const value = input.trim()

  if (!value) return ''

  try {
    const url = new URL(value.includes('://') ? value : `https://${value}`)

    if (url.hostname.toLowerCase().endsWith('github.com')) {
      return url.pathname.split('/').filter(Boolean)[0] ?? ''
    }
  } catch {
    return value.replace(/^@/, '')
  }

  return value.replace(/^@/, '')
}

async function fetchProfileReadme(username: string) {
  const readme = await fetchGitHubJson<GitHubReadme>(
    `${GITHUB_API_URL}/repos/${username}/${username}/readme`,
  )

  if (!readme || readme.encoding !== 'base64') return ''

  return decodeBase64(readme.content)
}

async function fetchPinnedProjects(username: string) {
  const token = process.env.GITHUB_TOKEN

  if (!token) return []

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query PinnedRepos($login: String!) {
        user(login: $login) {
          pinnedItems(first: 4, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                nameWithOwner
                description
                url
                homepageUrl
                stargazerCount
                pushedAt
                updatedAt
                isArchived
                isFork
                primaryLanguage { name }
                repositoryTopics(first: 10) {
                  nodes { topic { name } }
                }
                languages(first: 6, orderBy: { field: SIZE, direction: DESC }) {
                  edges { size node { name } }
                }
              }
            }
          }
        }
      }`,
      variables: { login: username },
    }),
  })

  if (!response.ok) return []

  const body = (await response.json()) as {
    data?: {
      user?: {
        pinnedItems?: {
          nodes?: Array<PinnedRepoNode>
        }
      }
    }
  }

  return (
    body.data?.user?.pinnedItems?.nodes
      ?.filter((repo) => !repo.isArchived && !repo.isFork)
      .map((repo) => ({
        name: repo.name,
        fullName: repo.nameWithOwner,
        description: repo.description ?? '',
        url: repo.url,
        homepage: normalizeOptionalUrl(repo.homepageUrl),
        stars: repo.stargazerCount,
        pushedAt: repo.pushedAt ?? undefined,
        updatedAt: repo.updatedAt ?? undefined,
        languages: uniqueStrings([
          ...repo.languages.edges.map((edge) => edge.node.name),
          repo.primaryLanguage?.name ?? '',
        ]),
        topics: repo.repositoryTopics.nodes.map((node) => node.topic.name),
        source: 'pinned' as const,
      })) ?? []
  )
}

async function fetchRecentContributionProjects(username: string) {
  const events =
    (await fetchGitHubJson<Array<GitHubEvent>>(
      `${GITHUB_API_URL}/users/${username}/events/public?per_page=100`,
    )) ?? []
  const repoNames = uniqueStrings(
    events
      .filter((event) =>
        ['PushEvent', 'PullRequestEvent', 'CreateEvent'].includes(event.type),
      )
      .map((event) => event.repo?.name ?? ''),
  )
    .filter(Boolean)
    .slice(0, PROJECT_LIMIT * 2)
  const repos = await Promise.all(
    repoNames.map((repoName) =>
      fetchGitHubJson<GitHubRepo>(`${GITHUB_API_URL}/repos/${repoName}`).catch(
        () => null,
      ),
    ),
  )

  return mapReposToProjects(
    repos.filter((repo): repo is GitHubRepo => Boolean(repo)),
    'recent-contribution',
  )
}

async function fetchOwnedRepoProjects(username: string) {
  const repos =
    (await fetchGitHubJson<Array<GitHubRepo>>(
      `${GITHUB_API_URL}/users/${username}/repos?type=owner&sort=updated&per_page=100`,
    )) ?? []

  return mapReposToProjects(repos, 'owned-repo')
}

async function mapReposToProjects(
  repos: Array<GitHubRepo>,
  source: RawGitHubProject['source'],
) {
  const selectedRepos = repos
    .filter((repo) => !repo.fork && !repo.archived)
    .sort(
      (a, b) =>
        dateScore(b.pushed_at ?? b.updated_at) -
        dateScore(a.pushed_at ?? a.updated_at),
    )
    .slice(0, PROJECT_LIMIT)
  const projectEntries = await Promise.all(
    selectedRepos.map(async (repo) => {
      const languages =
        (await fetchGitHubJson<GitHubLanguages>(
          `${GITHUB_API_URL}/repos/${repo.full_name}/languages`,
        ).catch(() => null)) ?? {}

      return {
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description ?? '',
        url: repo.html_url,
        homepage: normalizeOptionalUrl(repo.homepage ?? ''),
        stars: repo.stargazers_count,
        pushedAt: repo.pushed_at ?? undefined,
        updatedAt: repo.updated_at ?? undefined,
        languages: topLanguages(languages, repo.language),
        topics: repo.topics ?? [],
        source,
      } satisfies RawGitHubProject
    }),
  )

  return projectEntries
}

async function fetchGitHubJson<T>(url: string): Promise<T | null> {
  const headers = new Headers({
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  })

  if (process.env.GITHUB_TOKEN) {
    headers.set('Authorization', `Bearer ${process.env.GITHUB_TOKEN}`)
  }

  const response = await fetch(url, { headers })

  if (response.status === 404) return null

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: response.statusText }))
    const message =
      typeof error.message === 'string' ? error.message : response.statusText

    throw new Error(`GitHub API request failed: ${message}`)
  }

  return response.json() as Promise<T>
}

function topLanguages(languages: GitHubLanguages, fallback: string | null) {
  return uniqueStrings([
    ...Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([language]) => language),
    fallback ?? '',
  ])
}

function uniqueStrings(values: Array<string>) {
  return values
    .map((value) => value.trim())
    .filter(Boolean)
    .filter(
      (value, index, array) =>
        array.findIndex(
          (existing) => existing.toLowerCase() === value.toLowerCase(),
        ) === index,
    )
}

function decodeBase64(value: string) {
  return Buffer.from(value.replace(/\s/g, ''), 'base64').toString('utf8')
}

function normalizeOptionalUrl(value: string | null) {
  if (!value?.trim()) return undefined

  try {
    return new URL(
      value.includes('://') ? value : `https://${value}`,
    ).toString()
  } catch {
    return undefined
  }
}

function dateScore(value?: string | null) {
  if (!value) return 0

  const date = new Date(value)

  return Number.isNaN(date.getTime()) ? 0 : date.getTime()
}
