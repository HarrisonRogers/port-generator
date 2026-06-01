import { strToU8, zipSync } from 'fflate'

import aboutPageTemplate from '../../templates/portfolio/app/about/page.tsx?raw'
import careerPageTemplate from '../../templates/portfolio/app/career/page.tsx?raw'
import globalsTemplate from '../../templates/portfolio/app/globals.css?raw'
import layoutTemplate from '../../templates/portfolio/app/layout.tsx?raw'
import homePageTemplate from '../../templates/portfolio/app/page.tsx?raw'
import projectsPageTemplate from '../../templates/portfolio/app/projects/page.tsx?raw'
import siteFooterTemplate from '../../templates/portfolio/components/siteFooter.tsx?raw'
import siteNavTemplate from '../../templates/portfolio/components/siteNav.tsx?raw'
import techStackCardTemplate from '../../templates/portfolio/components/techStackCard.tsx?raw'
import eslintConfigTemplate from '../../templates/portfolio/eslint.config.mjs?raw'
import portfolioUtilsTemplate from '../../templates/portfolio/lib/portfolioUtils.ts?raw'
import nextConfigTemplate from '../../templates/portfolio/next.config.ts?raw'
import packageTemplate from '../../templates/portfolio/package.json?raw'
import postcssConfigTemplate from '../../templates/portfolio/postcss.config.mjs?raw'
import tsconfigTemplate from '../../templates/portfolio/tsconfig.json?raw'
import type { GeneratedPortfolio } from './portfolioSchema'

type ExportFile = {
  path: string
  content: string
}

const gitignoreTemplate = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`

const nextEnvTemplate = `/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
`

export function downloadPortfolioNextApp(portfolio: GeneratedPortfolio) {
  const files = createPortfolioNextAppFiles(portfolio)
  const zip = zipSync(
    Object.fromEntries(files.map((file) => [file.path, strToU8(file.content)])),
  )
  const url = URL.createObjectURL(new Blob([zip], { type: 'application/zip' }))
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = `${getProjectSlug(portfolio)}.zip`
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

function createPortfolioNextAppFiles(
  portfolio: GeneratedPortfolio,
): Array<ExportFile> {
  const projectSlug = getProjectSlug(portfolio)

  return [
    {
      path: '.gitignore',
      content: gitignoreTemplate,
    },
    {
      path: 'README.md',
      content: createReadme(portfolio),
    },
    {
      path: 'app/about/page.tsx',
      content: aboutPageTemplate,
    },
    {
      path: 'app/career/page.tsx',
      content: careerPageTemplate,
    },
    {
      path: 'app/globals.css',
      content: globalsTemplate,
    },
    {
      path: 'app/layout.tsx',
      content: layoutTemplate,
    },
    {
      path: 'app/page.tsx',
      content: homePageTemplate,
    },
    {
      path: 'app/projects/page.tsx',
      content: projectsPageTemplate,
    },
    {
      path: 'components/siteFooter.tsx',
      content: siteFooterTemplate,
    },
    {
      path: 'components/siteNav.tsx',
      content: siteNavTemplate,
    },
    {
      path: 'components/techStackCard.tsx',
      content: techStackCardTemplate,
    },
    {
      path: 'data/portfolio.ts',
      content: createPortfolioDataSource(portfolio),
    },
    {
      path: 'eslint.config.mjs',
      content: eslintConfigTemplate,
    },
    {
      path: 'lib/portfolioUtils.ts',
      content: portfolioUtilsTemplate,
    },
    {
      path: 'next-env.d.ts',
      content: nextEnvTemplate,
    },
    {
      path: 'next.config.ts',
      content: nextConfigTemplate,
    },
    {
      path: 'package.json',
      content: createPackageJson(projectSlug),
    },
    {
      path: 'postcss.config.mjs',
      content: postcssConfigTemplate,
    },
    {
      path: 'tsconfig.json',
      content: tsconfigTemplate,
    },
  ]
}

function createPortfolioDataSource(portfolio: GeneratedPortfolio) {
  return `export type SocialLink = {
  label: 'GitHub' | 'X' | 'LinkedIn'
  url: string
}

export type Project = {
  title: string
  description: string
  url: string
  sourceCode: string
  stars: number
  updatedAt: string
}

export type Career = {
  title: string
  company: string
  startDate: string
  endDate: string
  url: string
  confidence: 'high' | 'medium' | 'low'
}

export type GeneratedPortfolio = {
  profile: {
    name: string
    username: string
    headline: string
    location: string
    bio: string
    avatarUrl: string
    githubUrl: string
    websiteUrl: string
    socialLinks: Array<SocialLink>
  }
  home: {
    intro: string
    highlights: Array<string>
  }
  about: {
    paragraphs: Array<string>
  }
  techStack: {
    languages: Array<string>
    frontend: Array<string>
    backend: Array<string>
  }
  projects: Array<Project>
  careers: Array<Career>
  notes: {
    projectSelection: string
    careerInference: string
  }
}

export const portfolio = ${serializeJs(portfolio)} satisfies GeneratedPortfolio
`
}

function createPackageJson(projectSlug: string) {
  const parsedValue = JSON.parse(packageTemplate) as Record<string, unknown>

  return `${JSON.stringify({ ...parsedValue, name: projectSlug }, null, 2)}\n`
}

function createReadme(portfolio: GeneratedPortfolio) {
  const displayName = portfolio.profile.name || portfolio.profile.username

  return `# ${displayName} Portfolio

This is a standalone Next.js portfolio exported from PortGen. It is organized so the portfolio content is easy to find, review, and edit.

## Set Up

Install the packages first. This creates the \`node_modules\` folder the app needs to run and build.

\`\`\`bash
npm install
\`\`\`

## Initialize Git

Create a new Git repository for this exported project and make your first commit.

\`\`\`bash
git init
git add .
git commit -m "Initial portfolio"
\`\`\`

Push the repository to GitHub, GitLab, or Bitbucket so Vercel can import it.

## Deploy on Vercel

1. Go to [Vercel](https://vercel.com/new).
2. Import the Git repository for this portfolio.
3. Keep the default Next.js settings.
4. Click **Deploy**.

Vercel will install dependencies, build the app, and give you a live URL.

## Edit the Portfolio

Most portfolio content lives in \`data/portfolio.ts\`. The pages are clearly split across the \`app\` folder:

- \`app/page.tsx\` controls the home page.
- \`app/about/page.tsx\` controls the about page.
- \`app/projects/page.tsx\` controls the projects page.
- \`app/career/page.tsx\` controls the career page.

You can ask an AI coding assistant to edit specific sections of the portfolio. For example, ask it to update the project descriptions, rewrite the about page, add a new career entry, or adjust the styling.

Run \`npm run build\` before deploying changes to confirm the portfolio still builds successfully.
`
}

function serializeJs(value: GeneratedPortfolio) {
  return JSON.stringify(value, null, 2)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

function getProjectSlug(portfolio: GeneratedPortfolio) {
  const slug =
    `${portfolio.profile.username || portfolio.profile.name || 'portfolio'}-portfolio`
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-{2,}/g, '-')

  return slug || 'portfolio'
}
