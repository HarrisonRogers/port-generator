import type { ReactNode } from 'react'

import type { PreviewTab } from '../types'
import { AboutContent } from './aboutContent'
import { CareerContent } from './careerContent'
import { HomeContent } from './homeContent'
import { ProjectsContent } from './projectsContent'
import React from 'react'
import { Navbar } from '../navbar'
import { Footer } from './footer'

type PreviewContentProps = {
  variant?: 'page' | 'card'
}

export function PreviewContent({ variant = 'page' }: PreviewContentProps) {
  const [activeTab, setActiveTab] = React.useState<PreviewTab>('home')
  const content = {
    home: <HomeContent />,
    about: <AboutContent />,
    projects: <ProjectsContent />,
    career: <CareerContent />,
  } satisfies Record<PreviewTab, ReactNode>
  const isCard = variant === 'card'

  return (
    <div
      className={[
        'bg-white text-black dark:bg-black dark:text-white',
        isCard
          ? 'h-full overflow-hidden rounded-xl [&_aside]:mb-8 [&_button]:text-sm [&_footer]:mb-0 [&_footer]:text-xs [&_h1]:mb-5 [&_h1]:text-xl [&_p]:text-sm [&_p]:leading-6'
          : 'min-h-screen',
      ].join(' ')}
    >
      <main
        className={[
          'flex-auto px-2 pb-1 md:px-0',
          isCard ? 'mx-auto max-w-xl py-8' : 'mx-4 mt-8 lg:mx-auto lg:max-w-xl',
        ].join(' ')}
      >
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
        <section>{content[activeTab]}</section>
        <Footer />
      </main>
    </div>
  )
}
