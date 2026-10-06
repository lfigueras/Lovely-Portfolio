# Lovely Joy Figueras — Portfolio

My personal portfolio site — a single-page experience with full-viewport sections,
scroll-snap navigation, a working contact form, and a downloadable résumé.

**Live sections:** Home · About · Skills · Projects · Contact

Built with the modern Rails "Omakase" stack: **Ruby on Rails 8**, **Hotwire (Turbo + Stimulus)**,
and **Tailwind CSS** — no SPA framework, minimal JavaScript.

## Features

- **Full-viewport sections** with CSS scroll-snapping and smooth scrolling
- **Left-side bullet indicator** that tracks the active section (Stimulus + IntersectionObserver)
- **Responsive navbar** with an animated hamburger menu on small screens
- **Skills & Tools** cards and **Projects** showcase (with GitHub / live links)
- **Working contact form** that emails me via Gmail SMTP, with an auto-dismissing flash message
- **Downloadable résumé** (`/Lovely-Joy-Figueras-Resume.pdf`, generated from `public/resume.html`)

## Tech Stack

| Area | Tools |
|------|-------|
| Framework | Ruby on Rails 8 |
| Frontend | Hotwire (Turbo + Stimulus), Tailwind CSS v4, Importmap |
| Assets | Propshaft |
| Mail | Action Mailer + Gmail SMTP |
| Background/Infra | In-process cache, async jobs, async Action Cable in production |
| Deploy | Docker + Kamal |
| Quality | RuboCop (Omakase), Brakeman |

## Requirements

- Ruby 3.3.6
- Bundler

## Getting Started

```bash
# install dependencies
bundle install

# run the app (Rails server + Tailwind watcher)
bin/dev
```

Then open http://localhost:3000.

> Use `bin/dev` (not just `bin/rails server`) so Tailwind recompiles on change.

## Contact Form Setup

In development, the contact form sends through Gmail SMTP. Credentials are read
from Rails encrypted credentials or environment variables; no secrets are committed.

1. Enable 2-Step Verification on the Gmail account and create an **App Password**.
2. Add them to encrypted credentials:

   ```bash
   EDITOR="code --wait" bin/rails credentials:edit
   ```

   ```yaml
   gmail:
     user: your-email@gmail.com
     app_password: your-16-char-app-password
   ```

3. Restart the server. (Alternatively, set `GMAIL_USER` and `GMAIL_APP_PASSWORD` env vars.)

## Updating the Résumé

The résumé source lives at `public/resume.html`. After editing it, regenerate the PDF:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PWD/public/Lovely-Joy-Figueras-Resume.pdf" \
  "http://localhost:3000/resume.html"
```

## Deployment

### Render

The repository includes a `render.yaml` Blueprint for a database-free Docker
web service in Singapore. In Render, create a new Blueprint from this repository
and provide `RAILS_MASTER_KEY` when prompted. Commits to `main` trigger deploys.
Cache, background jobs, and Action Cable use in-process adapters; no database or
persistent disk is required.

In production, the contact form sends through Resend. Configure `RESEND_API_KEY`
and a verified `RESEND_FROM_EMAIL` sender address in Render.

The Blueprint uses Render's free web-service plan for an initial deployment.
The free instance may spin down during inactivity. Gmail credentials are needed
only if you want to test the contact form in development.

### Kamal

The app can also be deployed via [Kamal](https://kamal-deploy.org). Update the
placeholder values in `config/deploy.yml` (image, server IP, host), set
`RAILS_MASTER_KEY` and registry credentials, then:

```bash
bin/kamal setup   # first time
bin/kamal deploy  # subsequent deploys
```

## License

© Lovely Joy Figueras. All rights reserved.

