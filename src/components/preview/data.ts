import type { GeneratedPortfolio } from '#/lib/portfolioSchema'

export type Project = GeneratedPortfolio['projects'][number]
export type Career = GeneratedPortfolio['careers'][number]

export const defaultPortfolioData: GeneratedPortfolio = {
  profile: {
    name: 'Harrison Rogers',
    username: 'HarrisonRogers',
    headline: 'AI Integrated Software Engineer',
    location: 'New Zealand',
    bio: 'Full-stack engineer focused on AI-assisted products, polished developer experiences, and practical automation.',
    avatarUrl: '',
    githubUrl: 'https://github.com/HarrisonRogers',
    websiteUrl: 'https://www.harrisonrogers.dev/',
    socialLinks: [
      { label: 'GitHub', url: 'https://github.com/HarrisonRogers' },
      { label: 'X', url: 'https://x.com/hrogerzzz' },
      { label: 'LinkedIn', url: 'https://linkedin.com' },
    ],
  },
  home: {
    intro:
      'I build practical software products with a full-stack toolkit and a strong interest in applied AI workflows.',
    highlights: [
      'Full-stack product engineering',
      'AI tooling and automation',
      'React and TypeScript applications',
    ],
  },
  about: {
    paragraphs: [
      'I am a full-stack engineer focused on AI-assisted products, polished developer experiences, and useful automation.',
      'When I am creating and tinkering, I tend to reach for TypeScript, React, React Native, Rust, and pragmatic backend tools.',
    ],
  },
  techStack: {
    languages: ['TypeScript', 'React', 'Rust'],
    frontend: ['React', 'Next.js', 'Tailwind CSS', 'React Native', 'Expo'],
    backend: [
      'PostgreSQL',
      'SQLite',
      'Prisma',
      'GraphQL',
      'Convex',
      'Supabase',
      'AI tooling',
      'Automation',
    ],
  },
  projects: [
    {
      title: 'Portfolio Generator',
      description: 'Generate clean personal portfolios from GitHub profiles.',
      url: '',
      sourceCode: 'https://github.com/example/portfolio-generator',
      stars: 0,
      updatedAt: '',
    },
    {
      title: 'First Table',
      description: 'Restaurant booking platform for discounted meals.',
      url: 'https://www.firsttable.co.nz/',
      sourceCode: '',
      stars: 0,
      updatedAt: '',
    },
    {
      title: 'Launch Base Tokens',
      description: 'Launch sepolia base crypto tokens.',
      url: 'https://launch-base-tokens.vercel.app/',
      sourceCode: 'https://github.com/example/launch-base-tokens',
      stars: 0,
      updatedAt: '',
    },
  ],
  careers: [
    {
      title: 'Senior Software Engineer',
      company: 'New Tech Company',
      startDate: '2025-05-01',
      endDate: 'Present',
      url: '',
      confidence: 'high',
    },
    {
      title: 'Intermediate Developer',
      company: 'Tech Company',
      startDate: '2022-03-09',
      endDate: '2025-03-08',
      url: '',
      confidence: 'high',
    },
    {
      title: 'Junior Software Engineer',
      company: 'Tech Company',
      startDate: '2020-09-09',
      endDate: '2022-02-28',
      url: '',
      confidence: 'high',
    },
  ],
  notes: {
    projectSelection: 'Default preview projects are hand-authored examples.',
    careerInference:
      'Default preview career entries are hand-authored examples.',
  },
}
