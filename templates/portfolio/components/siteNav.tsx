import Link from 'next/link'

const navItems = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/projects', label: 'projects' },
  { href: '/career', label: 'career' },
]

export function SiteNav() {
  return (
    <aside className="mb-16 ml-[-8px] tracking-tight">
      <nav className="fade relative flex flex-row items-start px-0 pb-0">
        <div className="flex flex-row pr-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative m-1 flex items-center px-2 py-1 align-middle text-neutral-500 transition-all hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  )
}
