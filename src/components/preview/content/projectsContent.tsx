import type { Project } from '../data'
import { projects } from '../data'

export function ProjectsContent() {
  const personalProjects = projects.filter((project) => project.personal)
  const workProjects = projects.filter((project) => !project.personal)

  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="mb-7 font-serif text-5xl font-normal tracking-wide">
          Projects
        </h1>
      </div>
      <ProjectList projectList={workProjects} title="Work" />
      <ProjectList projectList={personalProjects} title="Personal" />
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
            <div className="flex w-full flex-col items-start justify-between space-y-1 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                {project.url ? (
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

                {project.sourceCode ? (
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
              <p className="text-neutral-600 tracking-tight dark:text-neutral-400">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
