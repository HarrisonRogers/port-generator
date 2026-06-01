const generateAboutStorageKey = 'portfolioGenerator.about'
const shouldGenerateStorageKey = 'portfolioGenerator.shouldGenerate'

export function storeGenerateAbout(about: string) {
  if (typeof window === 'undefined') return

  const trimmedAbout = about.trim()

  try {
    if (trimmedAbout) {
      window.sessionStorage.setItem(generateAboutStorageKey, about)
      return
    }

    window.sessionStorage.removeItem(generateAboutStorageKey)
  } catch {
    // Storage can be unavailable in restricted browser contexts.
  }
}

export function storeShouldGeneratePortfolio() {
  if (typeof window === 'undefined') return

  try {
    window.sessionStorage.setItem(shouldGenerateStorageKey, '1')
  } catch {
    // Storage can be unavailable in restricted browser contexts.
  }
}

export function consumeShouldGeneratePortfolio() {
  if (typeof window === 'undefined') return false

  try {
    const shouldGenerate =
      window.sessionStorage.getItem(shouldGenerateStorageKey) === '1'
    window.sessionStorage.removeItem(shouldGenerateStorageKey)

    return shouldGenerate
  } catch {
    return false
  }
}

export function consumeStoredGenerateAbout() {
  if (typeof window === 'undefined') return ''

  try {
    const about = window.sessionStorage.getItem(generateAboutStorageKey) ?? ''
    window.sessionStorage.removeItem(generateAboutStorageKey)

    return about
  } catch {
    return ''
  }
}
