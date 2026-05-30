import { BubbleBackground } from '#/components/animate-ui/components/backgrounds/bubble'
import { Shine } from '#/components/animate-ui/primitives/effects/shine'
import { CodeShowcase } from '#/components/CodeShowcase'
import { Testimonials } from '#/components/Testimonials'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Textarea } from '#/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [github, setGithub] = React.useState('')
  const [about, setAbout] = React.useState('')

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log({ github, about })
  }

  return (
    <main>
      <BubbleBackground
        interactive
        className="flex flex-col w-full items-center justify-center p-4"
      >
        <section className="z-10 flex w-full max-w-lg flex-col h-screen justify-center items-center gap-6">
          <h1 className="font-serif tracking-wider font-normal text-6xl">
            Build Your Portfolio
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-full rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
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
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="about">About you</Label>
                <Textarea
                  id="about"
                  placeholder="Share a few facts about yourself, your interests, and what you build..."
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
        <Testimonials />
        <CodeShowcase />
      </BubbleBackground>
    </main>
  )
}
