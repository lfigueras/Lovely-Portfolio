# Lovely Joy Figueras - Portfolio

A static portfolio built with **React, TypeScript, and Vite**, ready for GitHub
Pages. The original Home, About, Skills, Projects, and Contact sections, project
screenshots, links, portrait, and downloadable resume are preserved.

**GitHub Pages URL:** https://lfigueras.github.io/

## Features

- Responsive single-page layout with smooth section navigation.
- Mobile menu and active-section indicators powered by React.
- Four projects with project imagery, source links, and live demos or APKs.
- Downloadable PDF resume and an email-draft contact form.
- Keyboard navigation, accessible labels, and reduced-motion support.
- Automated tests, strict TypeScript checks, and GitHub Pages deployment.

## Tech Stack

| Area | Tools |
|------|-------|
| UI | React 19, TypeScript, Lucide icons |
| Styling | Responsive CSS, Manrope typography |
| Build | Vite |
| Tests | Vitest, React Testing Library, jsdom |
| Hosting | GitHub Pages via GitHub Actions |

## Local Development

Use Node.js 22.12 or newer in the Node 22 release line, or Node.js 24 LTS.
Ruby, a database, and API keys are not required for the React site.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite, normally http://127.0.0.1:5173.

```bash
npm test          # Component and interaction tests
npm run build    # Strict TypeScript checks and production build
npm run preview  # Serve the production build locally
```

Only the generated `dist/` directory is deployed. Relative build URLs support
both repository Pages sites and root/custom-domain sites without changing the
Vite base path. Navigation uses section hashes, so no SPA routing fallback is
needed.

## GitHub Pages

1. In the GitHub repository, open **Settings > Pages** and set **Source** to
  **GitHub Actions**.
2. Push updates to `main`, including `package-lock.json` when dependencies change.
3. Open **Actions > React portfolio / GitHub Pages** to follow deployment. Choose
  **Run workflow** if the initial push ran before Pages was enabled.
4. After deployment succeeds, open
  https://lfigueras.github.io/.

The workflow installs locked dependencies, runs tests, checks TypeScript, builds
the site, and deploys to Pages. Pull requests run tests and build without
deploying. Subsequent pushes to `main` deploy automatically. The repository must
be eligible for GitHub Pages under your GitHub plan; public repositories support
free Pages hosting.

## Contact

GitHub Pages cannot run Rails, SMTP, or server-side email delivery. The contact
form validates the visitor's details and opens their configured email app with a
draft addressed to lovelyfigueras@gmail.com. The visitor must send the email;
the site does not claim it was delivered. A direct email link is also available.

To send directly from the page in the future, connect a hosted form service or
separate backend. Never place SMTP passwords, Resend keys, or other secrets in
frontend code or `VITE_*` variables, which are public in the browser.

## Editing Content

- `src/App.tsx`: page components, biography, navigation, and contact form.
- `src/data.ts`: project descriptions, links, skills, and tool groups.
- `src/styles.css`: responsive styling and reduced-motion support.
- `app/assets/images/`: existing image sources imported by React.
- `public/Lovely-Joy-Figueras-Resume.pdf`: résumé PDF imported into the static build.
- `public/resume.html`: editable résumé source. Run `npm run resume:pdf` to regenerate the PDF with Google Chrome installed. Set `CHROME_PATH` if Chrome is installed elsewhere.

Vite processes only the explicitly referenced static assets. It does not copy
the Rails public directory or old compiled assets into the deployed site.

## Existing Rails and Android Code

The original Rails application, deployment configuration, Rails CI, and Android
project remain intact for reference and existing deployments. They are not
required by the React build or deployed by the Pages workflow. `bin/dev` still
starts the legacy Rails app; `npm run dev` starts the React app.

## License

Copyright Lovely Joy Figueras. All rights reserved.

