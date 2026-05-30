import { StarsBackground } from '#/components/animate-ui/components/backgrounds/stars'
import { CreatePortfolioSection } from '#/components/createPortfolioSection'
import { PortfolioPreview } from '#/components/portfolioPreview'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main>
      <StarsBackground>
        <CreatePortfolioSection />
        <PortfolioPreview />
      </StarsBackground>
    </main>
  )
}
