import { portfolio } from '@/data/portfolio'

export default function Home() {
  return (
    <div>
      <h1 className="font-serif text-6xl font-normal tracking-wide">
        {portfolio.profile.name}
      </h1>
      <p className="mt-7 text-base leading-7">
        I&apos;m a {portfolio.profile.headline}.
      </p>
      <p className="mt-5 text-base leading-7">{portfolio.home.intro}</p>
      {portfolio.home.highlights.length > 0 ? (
        <ul className="mt-5 list-disc space-y-1 pl-6 text-base leading-7 text-neutral-700 dark:text-neutral-300">
          {portfolio.home.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
