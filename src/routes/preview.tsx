import { PreviewContent } from '#/components/preview/content'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/preview')({
  component: PreviewPortfolio,
})

function PreviewPortfolio() {
  return <PreviewContent />
}
