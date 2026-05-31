import { PreviewContent } from '#/components/preview/content'
import { Link } from '@tanstack/react-router'

export function PortfolioPreview() {
  return (
    <section className="z-10 mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-4xl font-normal tracking-wide sm:text-5xl">
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

      <div className="overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-2xl">
        <div className="h-136 overflow-hidden rounded-xl border border-border bg-white dark:bg-black">
          <div className="origin-top scale-90">
            <PreviewContent variant="card" />
          </div>
        </div>
      </div>
    </section>
  )
}
