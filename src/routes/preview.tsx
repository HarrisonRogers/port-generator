import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'

import { PreviewContent } from '@/components/preview/content'
import { Footer } from '@/components/preview/footer'
import { Navbar } from '@/components/preview/navbar'
import type { PreviewTab } from '@/components/preview/types'

export const Route = createFileRoute('/preview')({
  component: PreviewPortfolio,
})

function PreviewPortfolio() {
  const [activeTab, setActiveTab] = React.useState<PreviewTab>('home')

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <main className="mx-4 mt-8 flex-auto px-2 pb-1 md:px-0 lg:mx-auto lg:max-w-xl">
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
        <PreviewContent activeTab={activeTab} />
        <Footer />
      </main>
    </div>
  )
}
