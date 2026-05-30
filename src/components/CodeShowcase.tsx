import { CodeBlock } from '#/components/animate-ui/primitives/animate/code-block'

const COUNTER_CODE = `import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="counter">
      <button onClick={() => setCount((c) => c - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  )
}
`

export function CodeShowcase() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-4 py-24 z-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="font-serif text-4xl font-normal tracking-wide sm:text-5xl">
          Built by developers, for developers
        </h2>
        <p className="max-w-xl text-muted-foreground">
          Clean, modern code under the hood — just like the portfolios we
          generate.
        </p>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-border bg-[#0d1117] shadow-lg">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="size-3 rounded-full bg-red-500/80" />
          <span className="size-3 rounded-full bg-yellow-500/80" />
          <span className="size-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-white/50">Counter.tsx</span>
        </div>
        <CodeBlock
          code={COUNTER_CODE}
          lang="tsx"
          theme="dark"
          writing
          duration={4000}
          inView
          inViewMargin="-100px"
          className="overflow-x-auto p-5 text-sm [&_pre]:bg-transparent! [&_pre]:m-0!"
        />
      </div>
    </section>
  )
}
