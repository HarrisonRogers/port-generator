import { FooterLink } from './footerLink'

export function Footer() {
  return (
    <footer className="mb-16">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <FooterLink href="#rss">rss</FooterLink>
        </li>
        <li>
          <FooterLink href="https://github.com/vercel/next.js">
            github
          </FooterLink>
        </li>
        <li>
          <FooterLink href="https://vercel.com/templates/next.js/portfolio-starter-kit">
            view source
          </FooterLink>
        </li>
      </ul>
      <p className="mt-8 text-neutral-600 dark:text-neutral-300">
        Copyright {new Date().getFullYear()} MIT Licensed
      </p>
    </footer>
  )
}
