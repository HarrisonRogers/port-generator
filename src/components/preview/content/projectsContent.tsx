import { projects } from '../data'

export function ProjectsContent() {
  return (
    <>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Projects</h1>
      <div>
        {projects.map((project) => (
          <article key={project.title} className="mb-6 flex flex-col space-y-1">
            <div className="flex w-full flex-col space-x-0 md:flex-row md:space-x-2">
              <p className="w-[100px] tabular-nums text-neutral-600 dark:text-neutral-400">
                {project.year}
              </p>
              <div>
                <h2 className="text-base font-normal tracking-tight text-neutral-900 dark:text-neutral-100">
                  {project.title}
                </h2>
                <p className="mt-1 text-base leading-7 text-neutral-700 dark:text-neutral-300">
                  {project.summary}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
