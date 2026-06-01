import type { Career } from '@/data/portfolio'
import { portfolio } from '@/data/portfolio'
import {
  formatCareerDate,
  isAbsoluteUrl,
  sortCareers,
} from '@/lib/portfolioUtils'

export default function Career() {
  const sortedCareers = [...portfolio.careers].sort(sortCareers)

  return (
    <div>
      <h1 className="mb-8 font-serif text-5xl font-normal tracking-wide">
        Career
      </h1>

      {sortedCareers.length > 0 ? (
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {sortedCareers.map((career) => (
            <CareerTimelineItem
              key={`${career.company}-${career.startDate}`}
              career={career}
            />
          ))}
        </ol>
      ) : (
        <p className="text-base leading-7 text-neutral-700 dark:text-neutral-300">
          Public GitHub data did not include enough evidence to infer career
          history.
        </p>
      )}
      <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
        {portfolio.notes.careerInference} Review and edit these career entries
        before publishing the downloaded source.
      </p>
    </div>
  )
}

function CareerTimelineItem({ career }: { career: Career }) {
  const company = isAbsoluteUrl(career.url) ? (
    <a
      href={career.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-2 text-base font-normal text-gray-500 underline underline-offset-2 hover:no-underline dark:text-gray-400"
    >
      {career.company}
    </a>
  ) : (
    <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
      {career.company}
    </p>
  )

  return (
    <li className="mb-10 ms-4">
      <div className="absolute -inset-s-1.5 mt-1.5 size-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700" />

      <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {formatCareerDate(career.startDate)} -{' '}
        {formatCareerDate(career.endDate)}
      </time>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {career.title}
      </h3>
      {company}
    </li>
  )
}
