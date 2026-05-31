import { z } from 'zod'

export const socialLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().min(1),
})

export const profileSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  headline: z.string().min(1),
  location: z.string(),
  bio: z.string().min(1),
  avatarUrl: z.string(),
  githubUrl: z.string().min(1),
  websiteUrl: z.string(),
  socialLinks: z.array(socialLinkSchema),
})

export const techStackSchema = z.object({
  languages: z.array(z.string()),
  frontend: z.array(z.string()),
  backend: z.array(z.string()),
  tools: z.array(z.string()),
})

export const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  url: z.string(),
  sourceCode: z.string(),
  languages: z.array(z.string()),
  stars: z.number(),
  updatedAt: z.string(),
})

export const careerSchema = z.object({
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
    intro: z.string().min(1),
    highlights: z.array(z.string()).max(4),
  }),
  about: z.object({
    paragraphs: z.array(z.string()).min(1).max(3),
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
