import { TechStackCard } from '@/components/techStackCard'
import { portfolio } from '@/data/portfolio'

export default function About() {
  return (
    <div>
      <h1 className="mb-7 font-serif text-5xl font-normal tracking-wide">
        About
      </h1>
      <article className="space-y-4">
        {portfolio.about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-base leading-7">
            {paragraph}
          </p>
        ))}
      </article>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <TechStackCard
          title="Languages"
          technologies={portfolio.techStack.languages}
          className="sm:col-span-2"
        />
        <TechStackCard
          title="Frontend"
          technologies={portfolio.techStack.frontend}
        />
        <TechStackCard
          title="Backend"
          technologies={portfolio.techStack.backend}
        />
      </div>
    </div>
  )
}
