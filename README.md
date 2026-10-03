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
- PostgreSQL

## Getting Started

```bash
# install dependencies
bundle install

# set up the database
bin/rails db:prepare

# run the app (Rails server + Tailwind watcher)
bin/dev
```

Then open http://localhost:3000.

> Use `bin/dev` (not just `bin/rails server`) so Tailwind recompiles on change.

## Contact Form Setup

The contact form sends email through Gmail SMTP. Credentials are read from Rails
encrypted credentials (or environment variables) — nothing secret is committed.

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

The repository includes a `render.yaml` Blueprint for a Docker web service and
PostgreSQL database in Singapore. In Render, create a new Blueprint from this
repository and provide `RAILS_MASTER_KEY` when prompted. The portfolio uses the
database for Rails startup/schema preparation; cache, background jobs, and cable
use in-process adapters, so no separate Solid service databases are needed.

The Blueprint uses Render's free web and PostgreSQL plans for an initial setup.
Render's free PostgreSQL database is temporary, so upgrade it to a paid plan for
a persistent production deployment. The contact form also
needs the Gmail credentials from Rails encrypted credentials (decrypted by
`RAILS_MASTER_KEY`) or the `GMAIL_USER` / `GMAIL_APP_PASSWORD` environment vars.

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

