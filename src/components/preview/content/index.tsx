import type { ReactNode } from 'react'

import type { PreviewTab } from '../types'
import { AboutContent } from './aboutContent'
import { CareerContent } from './careerContent'
import { HomeContent } from './homeContent'
import { ProjectsContent } from './projectsContent'

export function PreviewContent({ activeTab }: { activeTab: PreviewTab }) {
  const content = {
    home: <HomeContent />,
    about: <AboutContent />,
    projects: <ProjectsContent />,
    career: <CareerContent />,
  } satisfies Record<PreviewTab, ReactNode>

  return <section>{content[activeTab]}</section>
}
