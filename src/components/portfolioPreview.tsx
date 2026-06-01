import { PreviewContent } from '#/components/preview/content'
import { defaultPortfolioData } from '#/components/preview/data'
import { Link } from '@tanstack/react-router'

export function PortfolioPreview() {
  return (
    <section className="z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-7 pb-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-normal sm:text-5xl">
            Portfolio preview
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            See what your portfolio will look like
          </p>
        </div>
        <Link to="/preview" className="z-20">
          Open preview
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-white p-3 shadow-2xl dark:bg-background z-20">
        <div className="min-h-136 overflow-y-auto overflow-x-hidden rounded-xl border border-border dark:bg-background">
          <div className="min-h-full origin-top scale-90">
            <PreviewContent variant="card" data={defaultPortfolioData} />
          </div>
        </div>
      </div>
    </section>
  )
}
