import { CreatePortfolioSection } from '#/components/createPortfolioSection'
import { Ferrofluid } from '#/components/Ferrofluid'
import { PortfolioPreview } from '#/components/portfolioPreview'
import { useResolvedTheme } from '#/hooks/useResolvedTheme'
import { cn } from '#/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

const DARK_FERROFLUID_COLORS = ['#ffffff', '#e2e8f0', '#f8fafc']
const LIGHT_FERROFLUID_COLORS = ['#0f172a', '#334155', '#1e293b']

function App() {
  const theme = useResolvedTheme()
  const isDark = theme === 'dark'
  const ferrofluidColors = isDark
    ? DARK_FERROFLUID_COLORS
    : LIGHT_FERROFLUID_COLORS

  return (
    <main
      className={cn(
        'relative isolate min-h-screen overflow-hidden',
        isDark ? 'bg-[#02040a] text-white' : 'bg-[#f4f6f8] text-foreground',
      )}
    >
      <Ferrofluid className="z-0" colors={ferrofluidColors} />
      <div className="relative z-10 mb-40">
        <CreatePortfolioSection />
        <PortfolioPreview />
      </div>
    </main>
  )
}
