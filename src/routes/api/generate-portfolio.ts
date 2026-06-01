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

const systemPrompt = [
  'You analyze public GitHub profile data and return a concise portfolio JSON object.',
  'Use only evidence in the supplied GitHub data and optional personal context.',
  'Do not invent employers, dates, projects, social links, or technologies.',
  'All schema keys are required. Use an empty string for unknown URL, location, avatar, website, date, or source fields, and use 0 for unknown star counts.',
  'If career history is not clearly supported, return an empty careers array and explain the limitation in notes.careerInference.',
  'Projects must come from the provided project list only. Keep the order provided, because it already represents pinned repos or the fallback selection.',
  'For each generated project, set sourceCode to the raw project.url GitHub repository URL.',
  'For each generated project, set url only to a separate live homepage/demo from the raw homepage field. If there is no homepage/demo, url must be an empty string. Never duplicate the repository URL into url.',
  'Never put project selection labels such as pinned, owned-repo, or recent-contribution into url or sourceCode.',
  'Return variables-friendly values that can be copied into source code later.',
].join('\n')

const writingInstructions = [
  'Write the portfolio in fresh, human-sounding language rather than copying the GitHub bio, README, repo descriptions, or optional context.',
  'Treat GitHub text as notes to synthesize from: extract facts, infer themes from repeated evidence, then rewrite the final copy in new wording.',
  'Do not reuse a full sentence from the README or repo descriptions. Avoid distinctive README phrases unless they are proper nouns, product names, company names, or technology names.',
  'Make the copy sound like a polished personal portfolio: specific, confident, plain-spoken, and not marketing-heavy.',
  'Prefer active verbs and concrete outcomes. Avoid filler phrases such as "passionate about", "leveraging cutting-edge", "seamlessly", "robust", and "innovative solutions" unless the source data makes them unavoidable.',
  'Use first person for home.intro and about.paragraphs when it reads naturally. Use third person only if the supplied context clearly uses that voice.',
  'Keep profile.headline as a short role-style noun phrase that fits after "I\'m a".',
  'Keep home.intro to 1-2 sentences, about.paragraphs to 1-3 short paragraphs, highlights to short scannable bullets, and each project description to one short paragraph.',
  'For project descriptions, explain what the project appears to do and why it matters in 1-2 concise sentences; do not just repeat the repository description.',
  'Before returning the final JSON, internally revise the copy once for originality, flow, and readability while preserving the evidence.',
].join('\n')

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
          system: systemPrompt,
          prompt: [
            'Create a generated portfolio from this raw GitHub data.',
            writingInstructions,
            'The projectSelectionSource field tells you whether projects are pinned, recent contributions, or owned repos.',
            'For notes.projectSelection, say whether pinned projects were used or which fallback was used.',
            'For techStack, combine repo languages, repo topics, profile README mentions, and optional personal context. Put applicable tools into frontend or backend instead of creating a separate tools category.',
            'For profile.socialLinks, include only the user GitHub profile, X/Twitter profile, and LinkedIn profile when found. Do not include websites, email, project pages, repositories, employers, or any other links.',
            'For career data, inspect company, profile README, bio, and optional context for explicit current or past workplaces.',
            JSON.stringify(rawPortfolio, null, 2),
          ].join('\n\n'),
        })

        return result.toTextStreamResponse()
      },
    },
  },
})
