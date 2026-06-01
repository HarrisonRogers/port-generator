import type { Metadata } from 'next'
import './globals.css'
import { SiteFooter } from '@/components/siteFooter'
import { SiteNav } from '@/components/siteNav'
import { portfolio } from '@/data/portfolio'

export const metadata: Metadata = {
  title: `${portfolio.profile.name} Portfolio`,
  description: portfolio.profile.bio,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-white text-black dark:bg-black dark:text-white">
        <main className="mx-4 mt-8 lg:mx-auto lg:max-w-[630px]">
          <SiteNav />
          {children}
          <SiteFooter />
        </main>
      </body>
    </html>
  )
}
