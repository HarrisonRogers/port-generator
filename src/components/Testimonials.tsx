type Testimonial = {
  quote: string
  name: string
  role: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'I had a polished portfolio live in minutes. It pulled everything from my GitHub and made me look way more put together than I am.',
    name: 'Ava Chen',
    role: 'Frontend Engineer',
  },
  {
    quote:
      'The generated site landed me three interviews in a week. I just pasted my username and a few notes about myself.',
    name: 'Marcus Lee',
    role: 'Full-Stack Developer',
  },
  {
    quote:
      'Easily the fastest way to go from "I should build a portfolio" to actually having one. The design is gorgeous out of the box.',
    name: 'Priya Nair',
    role: 'ML Engineer',
  },
]

export function Testimonials() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 px-4 py-24 z-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="font-serif text-4xl font-normal tracking-wide sm:text-5xl">
          Loved by developers
        </h2>
        <p className="max-w-xl text-muted-foreground">
          Join thousands who turned their GitHub into a portfolio that gets them
          hired.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-card p-6 text-left shadow-sm"
          >
            <blockquote className="text-pretty leading-relaxed text-card-foreground">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-auto">
              <div className="font-medium text-card-foreground">
                {testimonial.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {testimonial.role}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
