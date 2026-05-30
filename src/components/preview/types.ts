export const previewTabs = ['home', 'about', 'projects', 'career'] as const

export type PreviewTab = (typeof previewTabs)[number]
