import type { Metadata } from 'next'
import { Instrument_Serif, Manrope } from 'next/font/google'
import './globals.css'
import { SiteFooter } from '@/components/siteFooter'
import { SiteNav } from '@/components/siteNav'
import { portfolio } from '@/data/portfolio'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
})

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
    <html
      lang="en"
      className={`${manrope.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
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
