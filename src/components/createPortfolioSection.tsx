import { Shine } from '#/components/animate-ui/primitives/effects/shine'
import { Button } from '#/components/animate-ui/components/buttons/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Textarea } from '#/components/ui/textarea'
import {
  storeGenerateAbout,
  storeShouldGeneratePortfolio,
} from '#/lib/generateContextStorage'
import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import * as React from 'react'

type FormStep = 'github' | 'about'

type SlideAnimation = {
  direction: number
  distance: number
}

const slideVariants = {
  enter: ({ direction, distance }: SlideAnimation) => ({
    x: -direction * distance,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: ({ direction, distance }: SlideAnimation) => ({
    x: direction * distance,
    opacity: 0,
  }),
}

function isGithubProfileUrl(value: string) {
  try {
    const url = new URL(value)
    const hostname = url.hostname.replace(/^www\./, '').toLowerCase()
    const pathSegments = url.pathname.split('/').filter(Boolean)

    return hostname === 'github.com' && pathSegments.length === 1
  } catch {
    return false
  }
}

export function CreatePortfolioSection() {
  const navigate = useNavigate()
  const [githubUrl, setGithubUrl] = React.useState('')
  const [about, setAbout] = React.useState('')
  const [step, setStep] = React.useState<FormStep>('github')
  const [direction, setDirection] = React.useState(1)
  const shouldReduceMotion = useReducedMotion()

  function showAboutStep() {
    setDirection(1)
    setStep('about')
  }

  function showGithubStep() {
    setDirection(-1)
    setStep('github')
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (step === 'github') {
      showAboutStep()
      return
    }

    storeGenerateAbout(about)
    storeShouldGeneratePortfolio()
    navigate({ to: '/generate', search: { githubUrl } })
  }

  const slideAnimation: SlideAnimation = {
    direction,
    distance: shouldReduceMotion ? 0 : 72,
  }

  return (
    <section className="z-10 mx-auto flex min-h-[calc(100svh-2rem)] w-full max-w-3xl flex-col items-center justify-center gap-5 px-4 py-12 sm:min-h-screen sm:gap-6 sm:px-6 sm:py-16">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="max-w-2xl text-balance font-serif text-5xl leading-[0.95] font-normal tracking-wide sm:text-6xl md:text-7xl">
          Build Your Portfolio
        </h1>
        <p className="max-w-sm text-pretty text-muted-foreground sm:max-w-none">
          Just enter your GitHub profile URL then download your portfolio and
          follow the readme
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full overflow-hidden rounded-xl border border-black/10 bg-white/70 p-4 shadow-2xl backdrop-blur-md sm:rounded-2xl sm:p-6 dark:border-white/20 dark:bg-white/10"
      >
        <AnimatePresence initial={false} mode="wait" custom={slideAnimation}>
          {step === 'github' ? (
            <motion.div
              key="github"
              custom={slideAnimation}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: shouldReduceMotion ? 0 : 0.32,
                ease: 'easeOut',
              }}
              className="flex flex-col gap-4 sm:gap-5"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="github">GitHub profile URL</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="github"
                    type="url"
                    placeholder="https://github.com/torvalds"
                    value={githubUrl}
                    onChange={(event) => setGithubUrl(event.target.value)}
                    autoComplete="url"
                    className="h-11 px-3 sm:h-10"
                    required
                  />
                  <Button
                    type="submit"
                    size="icon-lg"
                    className="size-11 sm:size-10"
                    disabled={!isGithubProfileUrl(githubUrl)}
                    aria-label="Continue to optional details"
                  >
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="about"
              custom={slideAnimation}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: shouldReduceMotion ? 0 : 0.32,
                ease: 'easeOut',
              }}
              className="flex flex-col gap-4 sm:gap-5"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="about" className="flex-wrap gap-2">
                  About you
                  <span className="rounded-full border border-black/10 px-2 py-0.5 text-xs font-normal text-muted-foreground dark:border-white/20">
                    Optional
                  </span>
                </Label>
                <Textarea
                  id="about"
                  placeholder="Share a few optional facts about yourself, your interests, and what you build..."
                  value={about}
                  onChange={(event) => setAbout(event.target.value)}
                  className="min-h-28 px-3 sm:min-h-32"
                  autoFocus
                />
                <p className="text-xs text-muted-foreground">
                  Leave this blank if your GitHub already tells the story.
                </p>
              </div>

              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={showGithubStep}
                  aria-label="Back to GitHub profile URL"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </Button>
                <Shine asChild loop duration={2000} loopDelay={1500}>
                  <Button type="submit" size="lg" className="w-full">
                    <Sparkles className="size-4" />
                    {about.trim() ? 'Generate Portfolio' : 'Skip & Generate'}
                  </Button>
                </Shine>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <motion.a
        href="#portfolio-preview"
        aria-label="Scroll to portfolio preview"
        className="flex flex-col items-center gap-0.5 rounded-md px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 1.5, ease: 'easeInOut', repeat: Infinity }
        }
      >
        <span>Preview</span>
        <ChevronDown className="size-4" aria-hidden="true" />
      </motion.a>
    </section>
  )
}
