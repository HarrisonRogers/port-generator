import { useSyncExternalStore } from 'react'

export type ResolvedTheme = 'light' | 'dark'

function getResolvedTheme(): ResolvedTheme {
  if (typeof document === 'undefined') {
    return 'light'
  }

  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function subscribeToResolvedTheme(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const observer = new MutationObserver(onStoreChange)

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'data-theme', 'style'],
  })
  mediaQuery.addEventListener('change', onStoreChange)

  return () => {
    observer.disconnect()
    mediaQuery.removeEventListener('change', onStoreChange)
  }
}

export function useResolvedTheme(): ResolvedTheme {
  return useSyncExternalStore(
    subscribeToResolvedTheme,
    getResolvedTheme,
    () => 'light',
  )
}
