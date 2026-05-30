type CareerItemProps = {
  date: string
  title: string
  description: string
}

export function CareerItem({ date, title, description }: CareerItemProps) {
  return (
    <article className="flex flex-col space-x-0 md:flex-row md:space-x-2">
      <p className="w-[100px] shrink-0 tabular-nums text-neutral-600 dark:text-neutral-400">
        {date}
      </p>
      <div>
        <h2 className="text-base font-normal tracking-tight text-neutral-900 dark:text-neutral-100">
          {title}
        </h2>
        <p className="mt-1 text-base leading-7 text-neutral-700 dark:text-neutral-300">
          {description}
        </p>
      </div>
    </article>
  )
}
