import { openai } from '@ai-sdk/openai'
import { createFileRoute } from '@tanstack/react-router'
import { Output, streamText } from 'ai'
import { z } from 'zod'

import { fetchRawGitHubPortfolio } from '#/lib/githubPortfolio'
import { generatedPortfolioSchema } from '#/lib/portfolioSchema'

const requestSchema = z.object({
  username: z.string().min(1),
  about: z.string().optional().default(''),
})

const model = process.env.OPENAI_MODEL ?? 'gpt-5.4-nano'

export const Route = createFileRoute('/api/generate-portfolio')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!process.env.OPENAI_API_KEY) {
          return Response.json(
            { error: 'OPENAI_API_KEY is required to generate a portfolio.' },
            { status: 500 },
          )
        }

        const body: unknown = await request.json()
        const { username, about } = requestSchema.parse(body)
        const rawPortfolio = await fetchRawGitHubPortfolio(username, about)

        const result = streamText({
          model: openai(model),
          output: Output.object({
            schema: generatedPortfolioSchema,
          }),
          system: [
            'You analyze public GitHub profile data and return a concise portfolio JSON object.',
            'Use only evidence in the supplied GitHub data and optional personal context.',
            'Do not invent employers, dates, projects, social links, or technologies.',
            'All schema keys are required. Use an empty string for unknown URL, location, avatar, website, date, or source fields, and use 0 for unknown star counts.',
            'If career history is not clearly supported, return an empty careers array and explain the limitation in notes.careerInference.',
            'Projects must come from the provided project list only. Keep the order provided, because it already represents pinned repos or the fallback selection.',
            'Keep copy professional, concise, and suitable for a personal portfolio.',
            'Return variables-friendly values that can be copied into source code later.',
          ].join('\n'),
          prompt: [
            'Create a generated portfolio from this raw GitHub data.',
            'The projectSelectionSource field tells you whether projects are pinned, recent contributions, or owned repos.',
            'For notes.projectSelection, say whether pinned projects were used or which fallback was used.',
            'For techStack, combine repo languages, repo topics, profile README mentions, and optional personal context.',
            'For social links, include GitHub and any public website, X/Twitter, LinkedIn, email, or other professional links found in the raw data.',
            'For career data, inspect company, profile README, bio, and optional context for explicit current or past workplaces.',
            JSON.stringify(rawPortfolio, null, 2),
          ].join('\n\n'),
        })

        return result.toTextStreamResponse()
      },
    },
  },
})
