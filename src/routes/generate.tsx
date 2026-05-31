import { experimental_useObject as useObject } from '@ai-sdk/react'
import { createFileRoute } from '@tanstack/react-router'
import {
  AlertCircle,
  CheckCircle2,
  Github,
  LoaderCircle,
  Sparkles,
} from 'lucide-react'
import * as React from 'react'

import { Button } from '#/components/animate-ui/components/buttons/button'
import { PreviewContent } from '#/components/preview/content'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Textarea } from '#/components/ui/textarea'
import { storeGeneratedPortfolio } from '#/hooks/useGeneratedPortfolio'
import { generatedPortfolioSchema } from '#/lib/portfolioSchema'

export const Route = createFileRoute('/generate')({
  validateSearch: (search) => ({
    github: typeof search.github === 'string' ? search.github : '',
    about: typeof search.about === 'string' ? search.about : '',
    generate: search.generate === '1' ? '1' : '',
  }),
  component: GeneratePortfolio,
})

function GeneratePortfolio() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const [github, setGithub] = React.useState(search.github)
  const [about, setAbout] = React.useState(search.about)
  const hasSubmittedSearch = React.useRef(false)
  const { object, submit, isLoading, error } = useObject({
    api: '/api/generate-portfolio',
    schema: generatedPortfolioSchema,
  })
  const generatedPortfolio = React.useMemo(() => {
    const result = generatedPortfolioSchema.safeParse(object)

    return result.success ? result.data : null
  }, [object])

  React.useEffect(() => {
    if (search.generate !== '1' || !search.github || hasSubmittedSearch.current)
      return

    hasSubmittedSearch.current = true
    navigate({
      replace: true,
      search: { github: search.github, about: search.about, generate: '' },
    })
    submit({
      username: search.github,
      about: search.about,
    })
  }, [navigate, search.about, search.generate, search.github, submit])

  React.useEffect(() => {
    if (!generatedPortfolio || isLoading) return

    storeGeneratedPortfolio(generatedPortfolio)
  }, [generatedPortfolio, isLoading])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submit({ username: github, about })
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[360px_1fr]">
        <section className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-md border border-border bg-background">
              <Github className="size-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-normal">
                Generate portfolio
              </h1>
              <p className="text-sm text-muted-foreground">
                Fetch GitHub, analyze it, then preview the result.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="github">GitHub username</Label>
              <Input
                id="github"
                value={github}
                onChange={(event) => setGithub(event.target.value)}
                placeholder="e.g. torvalds"
                autoComplete="username"
                className="bg-background text-foreground placeholder:text-muted-foreground autofill:[-webkit-text-fill-color:var(--foreground)]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">Optional personal context</Label>
              <Textarea
                id="about"
                value={about}
                onChange={(event) => setAbout(event.target.value)}
                placeholder="Past roles, preferred title, social links, or context GitHub will not know..."
                className="min-h-32 bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              Generate
            </Button>
          </form>

          {error ? (
            <div className="mt-5 flex gap-3 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <p>
                Sorry there was an error generating your portfolio. Please try
                again.
              </p>
            </div>
          ) : null}

          <GenerationSteps object={object} isLoading={isLoading} />
        </section>

        <section className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-3 shadow-sm">
            <div className="min-h-136 overflow-y-auto overflow-x-hidden rounded-md border border-border bg-background">
              {generatedPortfolio ? (
                <div className="min-h-full origin-top scale-90">
                  <PreviewContent variant="card" data={generatedPortfolio} />
                </div>
              ) : (
                <div className="flex min-h-136 items-center justify-center p-8 text-center text-muted-foreground">
                  {isLoading
                    ? 'Generating portfolio preview...'
                    : 'Submit a GitHub username to generate a portfolio preview.'}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

type GenerationStepsProps = {
  object: PartialGeneratedPortfolio | undefined
  isLoading: boolean
}

type PartialGeneratedPortfolio = {
  home?: {
    intro?: string
  }
  about?: {
    paragraphs?: Array<string | undefined>
  }
  projects?: Array<unknown>
  careers?: Array<unknown>
}

function GenerationSteps({ object, isLoading }: GenerationStepsProps) {
  const steps = [
    { label: 'Home page', complete: Boolean(object?.home?.intro) },
    {
      label: 'About page',
      complete: Boolean(object?.about?.paragraphs?.length),
    },
    { label: 'Projects page', complete: Boolean(object?.projects?.length) },
    { label: 'Careers page', complete: Boolean(object?.careers) },
  ]

  return (
    <div className="mt-6 space-y-3">
      {steps.map((step) => (
        <div
          key={step.label}
          className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2"
        >
          <span className="text-sm">{step.label}</span>
          {step.complete ? (
            <CheckCircle2 className="size-4 text-emerald-600" />
          ) : isLoading ? (
            <LoaderCircle className="size-4 animate-spin text-muted-foreground" />
          ) : (
            <span className="size-4 rounded-full border border-border" />
          )}
        </div>
      ))}
    </div>
  )
}
