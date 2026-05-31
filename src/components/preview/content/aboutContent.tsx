import type { GeneratedPortfolio } from '#/lib/portfolioSchema'

export function AboutContent({ data }: { data: GeneratedPortfolio }) {
  return (
    <div>
      <h1 className="mb-7 font-serif text-5xl font-normal tracking-wide">
        About
      </h1>
      <article className="space-y-4">
        {data.about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-base leading-7">
            {paragraph}
          </p>
        ))}
      </article>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <TechStackCard
          title="Languages"
          technologies={data.techStack.languages}
          className="sm:col-span-2"
        />
        <TechStackCard
          title="Frontend"
          technologies={data.techStack.frontend}
        />
        <TechStackCard title="Backend" technologies={data.techStack.backend} />
        <TechStackCard title="Tools" technologies={data.techStack.tools} />
      </div>
    </div>
  )
}

type TechStackCardProps = {
  title: string
  technologies: Array<string>
  className?: string
}

function TechStackCard({
  title,
  technologies,
  className = '',
}: TechStackCardProps) {
  if (technologies.length === 0) return null

  return (
    <section
      className={[
        'w-full rounded-lg border border-neutral-200 text-card-foreground shadow-sm dark:border-neutral-800',
        className,
      ].join(' ')}
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold tracking-normal">{title}</h2>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-base leading-7 text-neutral-700 dark:text-neutral-300">
          {technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
