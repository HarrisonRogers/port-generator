import type { ReactNode } from 'react'

import type { PreviewTab } from '../types'
import type { GeneratedPortfolio } from '#/lib/portfolioSchema'
import { AboutContent } from './aboutContent'
import { CareerContent } from './careerContent'
import { HomeContent } from './homeContent'
import { ProjectsContent } from './projectsContent'
import React from 'react'
import { Navbar } from '../navbar'
import { Footer } from './footer'
import { useGeneratedPortfolio } from '#/hooks/useGeneratedPortfolio'

type PreviewContentProps = {
  variant?: 'page' | 'card'
  data?: GeneratedPortfolio
}

export function PreviewContent({
  variant = 'page',
  data,
}: PreviewContentProps) {
  const [activeTab, setActiveTab] = React.useState<PreviewTab>('home')
  const storedPortfolio = useGeneratedPortfolio()
  const portfolio = data ?? storedPortfolio
  const content = {
    home: <HomeContent data={portfolio} />,
    about: <AboutContent data={portfolio} />,
    projects: <ProjectsContent data={portfolio} />,
    career: <CareerContent data={portfolio} />,
  } satisfies Record<PreviewTab, ReactNode>
  const isCard = variant === 'card'

  return (
    <div
      className={[
        'text-black dark:text-white',
        isCard
          ? 'min-h-full rounded-xl [&_aside]:mb-8 [&_button]:text-base [&_footer]:mb-0 [&_footer]:text-xs [&_h1]:mb-5 [&_h1]:text-3xl [&_p]:text-sm [&_p]:leading-6'
          : '',
      ].join(' ')}
    >
      <main
        className={[
          'flex-auto px-2 pb-1 md:px-0',
          isCard
            ? 'mx-auto max-w-xl py-8'
            : 'mx-4 mt-8 lg:mx-auto lg:max-w-[630px]',
        ].join(' ')}
      >
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
        <section>{content[activeTab]}</section>
        <Footer data={portfolio} />
      </main>
    </div>
  )
}
