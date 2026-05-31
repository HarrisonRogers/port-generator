import { Button } from '#/components/animate-ui/components/buttons/button'
import { Shine } from '#/components/animate-ui/primitives/effects/shine'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Textarea } from '#/components/ui/textarea'
import * as React from 'react'

export function CreatePortfolioSection() {
  const [github, setGithub] = React.useState('')
  const [about, setAbout] = React.useState('')

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log({ github, about })
  }

  return (
    <section className="z-10 mx-auto flex h-screen w-full max-w-lg flex-col items-center justify-center gap-6">
      <h1 className="font-serif text-6xl font-normal tracking-wider">
        Build Your Portfolio
      </h1>
      <p>Just enter your Github username</p>

      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl"
      >
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
            <Button type="submit" size="lg" className="w-full">
              Generate Portfolio
            </Button>
          </Shine>
        </div>
      </form>
    </section>
  )
}
