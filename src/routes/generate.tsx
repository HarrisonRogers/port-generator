import { experimental_useObject as useObject } from '@ai-sdk/react'
import { createFileRoute } from '@tanstack/react-router'
import type { DeepPartial } from 'ai'
import { AlertCircle, ExternalLink, Sparkles } from 'lucide-react'
import * as React from 'react'

import { Button } from '#/components/animate-ui/components/buttons/button'
import { ExportPortfolioButton } from '#/components/exportPortfolioButton'
import { PreviewContent } from '#/components/preview/content'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Link } from '#/components/ui/link'
import { Textarea } from '#/components/ui/textarea'
import {
  storeGeneratedPortfolio,
  useStoredGeneratedPortfolio,
} from '#/hooks/useGeneratedPortfolio'
import type { GeneratedPortfolio } from '#/lib/portfolioSchema'
import {
  generatedPortfolioSchema,
  parseGeneratedPortfolio,
} from '#/lib/portfolioSchema'

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
  const storedPortfolio = useStoredGeneratedPortfolio()
  const { object, submit, isLoading, error } = useObject({
    api: '/api/generate-portfolio',
    schema: generatedPortfolioSchema,
  })
  const generatedPortfolio = React.useMemo(() => {
    return parseGeneratedPortfolio(object)
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

  const previewPortfolio = isLoading
    ? null
    : (generatedPortfolio ?? storedPortfolio)
  const generationMessage = getGenerationMessage(object, isLoading)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submit({ username: github, about })
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 lg:px-6">
      <div className="mx-auto grid w-full max-w-[1500px] gap-5 xl:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="rounded-lg border border-border bg-card p-5 shadow-sm xl:sticky xl:top-6 xl:h-fit">
          <div>
            <h2 className="text-lg font-semibold tracking-normal">Generate</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Add a GitHub profile and optional context.
            </p>
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
              <Sparkles className="size-4" />
              Generate
            </Button>
          </form>

          <GenerationStatus portfolio={previewPortfolio} />

          {error ? (
            <div className="mt-5 flex gap-3 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <p>
                Sorry there was an error generating your portfolio. Please try
                again.
              </p>
            </div>
          ) : null}
        </aside>

        <section className="flex min-h-[calc(100vh-3rem)] flex-col">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="flex min-h-14 items-center justify-between gap-4 border-b border-border px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="size-2.5 rounded-full bg-destructive" />
                <span className="size-2.5 rounded-full bg-chart-2" />
                <span className="size-2.5 rounded-full bg-chart-3" />
                {!isLoading ? (
                  <p className="truncate text-sm text-muted-foreground">
                    {generationMessage}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="min-h-136 flex-1 overflow-y-auto overflow-x-hidden bg-background">
              {previewPortfolio ? (
                <div className="min-h-full origin-top scale-95 sm:scale-100">
                  <PreviewContent variant="card" data={previewPortfolio} />
                </div>
              ) : (
                <div className="flex min-h-full items-center justify-center p-8 text-center">
                  <div className="max-w-sm space-y-3">
                    <p className="text-base text-muted-foreground">
                      {generationMessage}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

type GenerationStatusProps = {
  portfolio: GeneratedPortfolio | null
}

function GenerationStatus({ portfolio }: GenerationStatusProps) {
  return (
    <>
      <div className="mt-4 grid gap-2">
        {portfolio ? (
          <Link to="/preview" variant="outline" className="w-full">
            <ExternalLink className="size-4" />
            Open full preview
          </Link>
        ) : null}
        <ExportPortfolioButton portfolio={portfolio} className="w-full" />
      </div>
    </>
  )
}

function getGenerationMessage(
  object: DeepPartial<GeneratedPortfolio> | undefined,
  isLoading: boolean,
): string {
  if (!isLoading) {
    return object
      ? 'Portfolio preview is ready.'
      : 'Submit a GitHub username to generate a portfolio preview.'
  }

  if (!object?.profile?.name) {
    return 'Reading the GitHub profile and planning the portfolio...'
  }

  if (!object.home?.intro) {
    return 'Writing the home page...'
  }

  if (!object.about?.paragraphs?.length) {
    return 'Building the about page...'
  }

  if (!object.projects?.length) {
    return 'Selecting projects and writing the projects page...'
  }

  if (!object.careers) {
    return 'Building the career timeline...'
  }

  const notes = object.notes

  if (!notes || !notes.projectSelection || !notes.careerInference) {
    return 'Checking project and career details...'
  }

  return 'Finalizing the portfolio preview...'
}
