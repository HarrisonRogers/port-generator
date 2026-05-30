import { previewTabs } from '../types'
import type { PreviewTab } from '../types'

type NavbarProps = {
  activeTab: PreviewTab
  onTabChange: (tab: PreviewTab) => void
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <aside className="ml-[-8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="fade relative flex flex-row items-start px-0 pb-0 md:relative md:overflow-auto md:scroll-pr-6"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {previewTabs.map((tab) => {
              const isActive = activeTab === tab

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => onTabChange(tab)}
                  className={[
                    'relative m-1 flex items-center px-2 py-1 align-middle transition-all',
                    isActive
                      ? 'text-neutral-950 dark:text-neutral-50'
                      : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200',
                  ].join(' ')}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
