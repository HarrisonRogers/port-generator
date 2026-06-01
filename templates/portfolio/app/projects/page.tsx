import type { Project } from '@/data/portfolio'
import { portfolio } from '@/data/portfolio'
import { isAbsoluteUrl } from '@/lib/portfolioUtils'

export default function Projects() {
  return (
    <div>
      <h1 className="mb-7 font-serif text-5xl font-normal tracking-wide">
        Projects
      </h1>
      <ProjectList projectList={portfolio.projects} title="Personal" />
      <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
        {portfolio.notes.projectSelection}
      </p>
    </div>
  )
}

type ProjectListProps = {
  projectList: Array<Project>
  title: string
}

function ProjectList({ projectList, title }: ProjectListProps) {
  if (projectList.length === 0) return null

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
        {title}
      </h2>
      <div>
        {projectList.map((project) => (
          <article key={project.title} className="mb-5 flex flex-col space-y-1">
            <div className="flex w-full flex-col items-start justify-between gap-2 sm:flex-row sm:items-start">
              <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 sm:w-36 sm:shrink-0">
                {isAbsoluteUrl(project.url) ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black underline underline-offset-2 transition hover:no-underline dark:text-white"
                  >
                    <h3 className="text-base font-normal tracking-normal">
                      {project.title}
                    </h3>
                  </a>
                ) : (
                  <h3 className="text-base font-normal tracking-normal text-black dark:text-white">
                    {project.title}
                  </h3>
                )}

                {isAbsoluteUrl(project.sourceCode) ? (
                  <a
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-500 transition hover:opacity-70 dark:text-neutral-400"
                  >
                    (
                    <span className="underline underline-offset-2 hover:no-underline">
                      Source Code
                    </span>
                    )
                  </a>
                ) : null}
              </div>
              <p className="max-w-[44ch] leading-7 tracking-tight text-neutral-600 dark:text-neutral-400">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
