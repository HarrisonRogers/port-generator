const generateAboutStorageKey = 'portfolioGenerator.about'

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
