# Portfolio

This is a standalone Next.js portfolio exported from PortGen. It is organized so the portfolio content is easy to find, review, and edit.

## Set Up

Install the packages first. This creates the `node_modules` folder the app needs to run and build.

```bash
npm install
```

## Initialize Git

Create a new Git repository for this exported project and make your first commit.

```bash
git init
git add .
git commit -m "Initial portfolio"
```

Push the repository to GitHub, GitLab, or Bitbucket so Vercel can import it.

## Deploy on Vercel

1. Go to [Vercel](https://vercel.com/new).
2. Import the Git repository for this portfolio.
3. Keep the default Next.js settings.
4. Click **Deploy**.

Vercel will install dependencies, build the app, and give you a live URL.

## Edit the Portfolio

Most portfolio content lives in `data/portfolio.ts`. The pages are clearly split across the `app` folder:

- `app/page.tsx` controls the home page.
- `app/about/page.tsx` controls the about page.
- `app/projects/page.tsx` controls the projects page.
- `app/career/page.tsx` controls the career page.

You can ask an AI coding assistant to edit specific sections of the portfolio. For example, ask it to update the project descriptions, rewrite the about page, add a new career entry, or adjust the styling.

Run `npm run build` before deploying changes to confirm the portfolio still builds successfully.
