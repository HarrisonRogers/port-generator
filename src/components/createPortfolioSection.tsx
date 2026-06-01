import { Shine } from '#/components/animate-ui/primitives/effects/shine'
import { Button } from '#/components/animate-ui/components/buttons/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Textarea } from '#/components/ui/textarea'
import { storeGenerateAbout } from '#/lib/generateContextStorage'
import { useNavigate } from '@tanstack/react-router'
import { Sparkles } from 'lucide-react'
import * as React from 'react'

export function CreatePortfolioSection() {
  const navigate = useNavigate()
  const [githubUrl, setGithubUrl] = React.useState('')
  const [about, setAbout] = React.useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    storeGenerateAbout(about)
    navigate({ to: '/generate', search: { githubUrl, generate: '1' } })
  }

  return (
    <section className="z-10 mx-auto flex min-h-[calc(100svh-2rem)] w-full max-w-3xl flex-col items-center justify-center gap-5 px-4 py-12 sm:min-h-screen sm:gap-6 sm:px-6 sm:py-16">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="max-w-2xl text-balance text-4xl leading-tight font-normal sm:text-5xl md:text-6xl">
          Build Your Portfolio
        </h1>
        <p className="max-w-sm text-pretty text-muted-foreground sm:max-w-none">
          Just enter your GitHub profile URL then download your portfolio and
          follow the readme
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full rounded-xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md sm:rounded-2xl sm:p-6"
      >
        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="github">GitHub profile URL</Label>
            <Input
              id="github"
              type="url"
              placeholder="https://github.com/torvalds"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              autoComplete="url"
              className="h-11 px-3 sm:h-10"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="about" className="flex-wrap gap-2">
              About you
              <span className="rounded-full border border-white/20 px-2 py-0.5 text-xs font-normal text-muted-foreground">
                Optional
              </span>
            </Label>
            <Textarea
              id="about"
              placeholder="Share a few optional facts about yourself, your interests, and what you build..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="min-h-28 px-3 sm:min-h-32"
            />
          </div>

          <Shine asChild loop duration={2000} loopDelay={1500}>
            <Button type="submit" size="lg" className="w-full">
              <Sparkles className="size-4" />
              Generate Portfolio
            </Button>
          </Shine>
        </div>
      </form>
    </section>
  )
}
