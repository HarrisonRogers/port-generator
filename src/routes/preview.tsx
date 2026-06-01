import { PreviewContent } from '#/components/preview/content'
import { Button } from '#/components/animate-ui/components/buttons/button'
import { ExportPortfolioButton } from '#/components/exportPortfolioButton'
import { useGeneratedPortfolio } from '#/hooks/useGeneratedPortfolio'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/preview')({
  component: PreviewPortfolio,
})

function PreviewPortfolio() {
  const navigate = Route.useNavigate()
  const portfolio = useGeneratedPortfolio()

  function handleBack() {
    if (window.history.length > 1) {
      window.history.back()
      return
    }

    navigate({ to: '/generate' })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-[630px] items-center justify-between gap-3 px-4 pt-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Go back"
          onClick={handleBack}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <ExportPortfolioButton portfolio={portfolio} className="min-w-0" />
      </div>
      <PreviewContent data={portfolio} />
    </div>
  )
}
