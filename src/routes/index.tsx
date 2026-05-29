import { BubbleBackground } from '#/components/animate-ui/components/backgrounds/bubble'
import { TypingText } from '#/components/animate-ui/primitives/texts/typing'
import { Input } from '#/components/ui/input'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

const TEXTS = [
  'Create Your Portfolio',
  'Showcase Your Work',
  'Land Your Dream Job',
]

function App() {
  return (
    <BubbleBackground
      interactive
      className="absolute inset-0 flex justify-center"
    >
      <div className="container mx-auto flex flex-col items-center justify-center z-10">
        <TypingText
          text={TEXTS}
          loop
          holdDelay={2000}
          className="text-5xl tracking-wider font-serif"
        />
        <Input type="text" className="w-full max-w-md" />
      </div>
    </BubbleBackground>
  )
}
