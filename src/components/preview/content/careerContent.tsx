import type { Career } from '../data'
import { careers } from '../data'

export function CareerContent() {
  const sortedCareers = [...careers].sort((a, b) =>
    a.endDate === 'Present'
      ? -1
      : b.endDate === 'Present'
        ? 1
        : new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  )

  return (
    <div>
      <h1 className="mb-8 font-serif text-5xl font-normal tracking-wide">
        Career
      </h1>

      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {sortedCareers.map((career) => (
          <CareerTimelineItem
            key={`${career.company}-${career.startDate}`}
            career={career}
          />
        ))}
      </ol>
    </div>
  )
}

function CareerTimelineItem({ career }: { career: Career }) {
  return (
    <li className="mb-10 ms-4">
      <div className="absolute -inset-s-1.5 mt-1.5 size-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700" />

      <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {formatDate(career.startDate)} - {formatDate(career.endDate)}
      </time>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {career.title}
      </h3>
      <a
        href={career.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400"
      >
        {career.company}
      </a>
    </li>
  )
}

function formatDate(dateString: string) {
  if (dateString === 'Present') return 'Present'

  return new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}
