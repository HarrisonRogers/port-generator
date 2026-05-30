import { CareerItem } from './careerItem'

export function CareerContent() {
  return (
    <>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Career</h1>
      <div className="space-y-6">
        <CareerItem
          date="2025 - Now"
          title="Product Engineer"
          description="Designing and shipping full-stack product flows with React, TypeScript, and pragmatic backend integrations."
        />
        <CareerItem
          date="2023 - 2025"
          title="Frontend Developer"
          description="Built reusable UI systems, improved page performance, and collaborated closely with design on production interfaces."
        />
        <CareerItem
          date="2021 - 2023"
          title="Software Developer"
          description="Worked across application features, internal tools, and content-driven pages for fast-moving teams."
        />
      </div>
    </>
  )
}
