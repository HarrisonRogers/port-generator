import { Shine } from '#/components/animate-ui/primitives/effects/shine'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Link } from '#/components/ui/link'
import { Textarea } from '#/components/ui/textarea'
import { Sparkles } from 'lucide-react'
import * as React from 'react'

export function CreatePortfolioSection() {
  const [github, setGithub] = React.useState('')
  const [about, setAbout] = React.useState('')

  return (
    <section className="z-10 mx-auto flex h-screen w-full max-w-3xl flex-col items-center justify-center gap-6">
      <h1 className="text-6xl font-normal">Build Your Portfolio</h1>
      <p className="text-muted-foreground">Just enter your Github username</p>

      <form className="w-full rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="github">GitHub username</Label>
            <Input
              id="github"
              type="text"
              placeholder="e.g. torvalds"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="about">About you</Label>
            <Textarea
              id="about"
              placeholder="Share a few optional facts about yourself, your interests, and what you build..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="min-h-32"
            />
          </div>

          <Shine asChild loop duration={2000} loopDelay={1500}>
            <Link
              to="/generate"
              search={{ github, about, generate: '1' }}
              size="lg"
              className="w-full"
            >
              <Sparkles className="size-4" />
              Generate Portfolio
            </Link>
          </Shine>
        </div>
      </form>
    </section>
  )
}
