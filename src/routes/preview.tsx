import { PreviewContent } from '#/components/preview/content'
import { ExportPortfolioButton } from '#/components/exportPortfolioButton'
import { useGeneratedPortfolio } from '#/hooks/useGeneratedPortfolio'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/preview')({
  component: PreviewPortfolio,
})

function PreviewPortfolio() {
  const portfolio = useGeneratedPortfolio()

  return (
    <div>
      <div className="mx-4 mt-4 flex justify-end lg:mx-auto lg:max-w-[630px]">
        <ExportPortfolioButton portfolio={portfolio} />
      </div>
      <PreviewContent data={portfolio} />
    </div>
  )
}
