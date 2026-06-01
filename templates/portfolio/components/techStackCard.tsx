type TechStackCardProps = {
  title: string
  technologies: Array<string>
  className?: string
}

export function TechStackCard({
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
