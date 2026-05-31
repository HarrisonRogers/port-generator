export const profile = {
  name: 'Harrison Rogers',
  title: 'AI Integrated Software Engineer',
  company: 'New Tech Company',
  companyUrl: 'https://www.harrisonrogers.dev/',
}

export const techStack = {
  languages: ['TypeScript', 'React', 'Rust'],
  frontend: ['React', 'Next.js', 'Tailwind CSS', 'React Native', 'Expo'],
  backend: ['PostgreSQL', 'SQLite', 'Prisma', 'GraphQL', 'Convex', 'Supabase'],
}

export type Project = {
  title: string
  description: string
  url?: string
  sourceCode?: string
  personal: boolean
}

export const projects: Project[] = [
  {
    title: 'Portfolio Generator',
    description: 'Generate clean personal portfolios from GitHub profiles',
    url: '',
    sourceCode: 'https://github.com/example/portfolio-generator',
    personal: true,
  },
  {
    title: 'First Table',
    description: 'Restaurant booking platform for discounted meals',
    url: 'https://www.firsttable.co.nz/',
    sourceCode: '',
    personal: false,
  },
  {
    title: 'Launch Base Tokens',
    description: 'Launch sepolia base crypto tokens',
    url: 'https://launch-base-tokens.vercel.app/',
    sourceCode: 'https://github.com/example/launch-base-tokens',
    personal: true,
  },
]

export type Career = {
  title: string
  company: string
  startDate: string
  endDate: string
  url?: string
}

export const careers: Career[] = [
  {
    title: 'Senior Software Engineer',
    company: 'New Tech Company',
    startDate: '2025-05-01',
    endDate: 'Present',
  },
  {
    title: 'Intermediate Developer',
    company: 'Tech Company',
    startDate: '2022-03-09',
    endDate: '2025-03-08',
  },
  {
    title: 'Junior Software Engineer',
    company: 'Tech Company',
    startDate: '2020-09-09',
    endDate: '2022-02-28',
  },
]
