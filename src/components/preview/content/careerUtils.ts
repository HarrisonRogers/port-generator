import type { Career } from '#/lib/portfolioSchema'

export function sortCareers(a: Career, b: Career) {
  if (a.endDate === 'Present') return -1
  if (b.endDate === 'Present') return 1

  return dateScore(b.startDate) - dateScore(a.startDate)
}

export function formatCareerDate(dateString: string) {
  if (dateString === 'Present') return 'Present'
  if (dateString === 'Past') return 'Past'
  if (dateString === 'Unknown') return 'Unknown'

  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) return dateString

  return new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function dateScore(dateString: string) {
  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) return 0

  return date.getTime()
}
