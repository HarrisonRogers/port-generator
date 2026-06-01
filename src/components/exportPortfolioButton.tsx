import { Download, LoaderCircle } from 'lucide-react'
import * as React from 'react'

import { Button } from '#/components/animate-ui/components/buttons/button'
import { downloadPortfolioNextApp } from '#/lib/exportPortfolio'
import type { GeneratedPortfolio } from '#/lib/portfolioSchema'

type ExportPortfolioButtonProps = {
  portfolio: GeneratedPortfolio | null
  className?: string
}

export function ExportPortfolioButton({
  portfolio,
  className,
}: ExportPortfolioButtonProps) {
  const [isExporting, setIsExporting] = React.useState(false)

  function handleExport() {
    if (!portfolio || isExporting) return

    setIsExporting(true)

    try {
      downloadPortfolioNextApp(portfolio)
    } finally {
      window.setTimeout(() => setIsExporting(false), 300)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className={className}
      disabled={!portfolio || isExporting}
      onClick={handleExport}
    >
      {isExporting ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <Download className="size-4" />
      )}
      Export Next.js zip
    </Button>
  )
}
