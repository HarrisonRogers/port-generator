import * as React from 'react'

import { defaultPortfolioData } from '#/components/preview/data'
import type { GeneratedPortfolio } from '#/lib/portfolioSchema'
import { generatedPortfolioSchema } from '#/lib/portfolioSchema'

const STORAGE_KEY = 'port-generator:generated-portfolio'
const STORAGE_EVENT = 'port-generator:generated-portfolio-updated'

export function useGeneratedPortfolio() {
  const [portfolio, setPortfolio] =
    React.useState<GeneratedPortfolio>(defaultPortfolioData)

  React.useEffect(() => {
    setPortfolio(readGeneratedPortfolio())

    function handleGeneratedPortfolioUpdated(event: Event) {
      const customEvent = event as CustomEvent<GeneratedPortfolio>
      setPortfolio(customEvent.detail)
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        setPortfolio(readGeneratedPortfolio())
      }
    }

    window.addEventListener(STORAGE_EVENT, handleGeneratedPortfolioUpdated)
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener(STORAGE_EVENT, handleGeneratedPortfolioUpdated)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  return portfolio
}

export function storeGeneratedPortfolio(portfolio: GeneratedPortfolio) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio))
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: portfolio }))
}

function readGeneratedPortfolio() {
  const rawValue = window.localStorage.getItem(STORAGE_KEY)

  if (!rawValue) return defaultPortfolioData

  try {
    const parsedValue: unknown = JSON.parse(rawValue)
    const result = generatedPortfolioSchema.safeParse(parsedValue)

    return result.success ? result.data : defaultPortfolioData
  } catch {
    return defaultPortfolioData
  }
}
