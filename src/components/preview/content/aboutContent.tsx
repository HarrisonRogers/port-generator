import { Link } from '@tanstack/react-router'
import { profile, techStack } from '../data'

export function AboutContent() {
  return (
    <div>
      <h1 className="mb-7 font-serif text-5xl font-normal tracking-wide">
        About
      </h1>
      <article className="space-y-4">
        <p className="text-base leading-7">
          I am an Engineer from Agartha. I currently work at{' '}
          <Link
            to={profile.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            {profile.company}
          </Link>{' '}
          as a Senior Software Engineer. Gosh I love building and creating new
          things here in Agartha to convince my king to let me live and give my
          family buttered toast
        </p>
        <p className="text-base leading-7">
          When I am creating and tinkering I tend to use the tech stack below.
        </p>
      </article>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <TechStackCard
          title="Languages"
          icon="🌐"
          technologies={techStack.languages}
          className="sm:col-span-2"
        />
        <TechStackCard
          title="Frontend"
          icon="🚀"
          technologies={techStack.frontend}
        />
        <TechStackCard
          title="Backend"
          icon="🛠"
          technologies={techStack.backend}
        />
      </div>
    </div>
  )
}

type TechStackCardProps = {
  title: string
  icon: string
  technologies: Array<string>
  className?: string
}

function TechStackCard({
  title,
  icon,
  technologies,
  className = '',
}: TechStackCardProps) {
  return (
    <section
      className={[
        'w-full rounded-lg border border-neutral-200 text-card-foreground shadow-sm dark:border-neutral-800',
        className,
      ].join(' ')}
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold tracking-normal">
          {icon} {title}
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-base leading-7 text-neutral-700 dark:text-neutral-300">
          {technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
