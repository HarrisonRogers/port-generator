export function AboutContent() {
  const techStack = [
    {
      title: 'Frontend',
      items: [
        '⚡ React dashboards',
        '🚗 Vehicle interfaces',
        '🛰️ Real-time telemetry',
      ],
    },
    {
      title: 'Backend',
      items: [
        '🚀 Mission systems',
        '🤖 Automation services',
        '☁️ Distributed infrastructure',
      ],
    },
    {
      title: 'Languages',
      items: ['🧠 Python', '🛠️ C++', '📊 SQL'],
    },
  ]

  return (
    <>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">About</h1>
      <p className="mb-4 text-base leading-7">
        I build clean, practical interfaces with a bias toward fast iteration,
        readable code, and simple product surfaces. My work sits between design
        taste and implementation detail, where small decisions compound into a
        product that feels calm and useful.
      </p>
      <p className="mb-4 text-base leading-7">
        I like tools that remove friction: strong types, focused components,
        clear content models, and pages that make the important thing obvious.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {techStack.map((stack) => (
          <section
            key={stack.title}
            className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800"
          >
            <h2 className="mb-3 text-sm font-semibold tracking-normal">
              {stack.title}
            </h2>
            <ul className="space-y-2 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
              {stack.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}
