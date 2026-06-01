import * as React from 'react'

import { defaultPortfolioData } from '#/components/preview/data'
import type { GeneratedPortfolio } from '#/lib/portfolioSchema'
import { parseGeneratedPortfolio } from '#/lib/portfolioSchema'

const STORAGE_KEY = 'port-generator:generated-portfolio'
const STORAGE_EVENT = 'port-generator:generated-portfolio-updated'

export function useGeneratedPortfolio() {
  const storedPortfolio = useStoredGeneratedPortfolio()

  return storedPortfolio ?? defaultPortfolioData
}

export function useStoredGeneratedPortfolio() {
  const [portfolio, setPortfolio] = React.useState<GeneratedPortfolio | null>(
    readStoredGeneratedPortfolio,
  )

  React.useEffect(() => {
    setPortfolio(readStoredGeneratedPortfolio())

    function handleGeneratedPortfolioUpdated(event: Event) {
      const customEvent = event as CustomEvent<GeneratedPortfolio>
      setPortfolio(customEvent.detail)
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        setPortfolio(readStoredGeneratedPortfolio())
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

function readStoredGeneratedPortfolio() {
  if (typeof window === 'undefined') return null

  const rawValue = window.localStorage.getItem(STORAGE_KEY)

  if (!rawValue) return null

  try {
    const parsedValue: unknown = JSON.parse(rawValue)

    return parseGeneratedPortfolio(parsedValue)
  } catch {
    return null
  }
}
