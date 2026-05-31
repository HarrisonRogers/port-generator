import { profile } from '../data'

export function HomeContent() {
  return (
    <div>
      <h1 className="font-serif text-6xl font-normal tracking-wide">
        {profile.name}
      </h1>
      <p className="mt-7 text-base leading-7">
        I&apos;m an {profile.title} with a full-stack background, specializing
        in TypeScript, React, React Native, and Rust.
      </p>
      <p className="mt-5 text-base leading-7">
        I am a passionate AI tinkerer and am constantly building and toying with
        the latest features, tools, applications, and automations.
      </p>
    </div>
  )
}
