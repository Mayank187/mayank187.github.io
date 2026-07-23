# mayank187.github.io — Personal Portfolio

Personal portfolio for **Mayank Khandelwal**, Senior AI/ML Engineer.

> **Internal notes:** planning, content-gap, and changelog docs live in a local
> `docs/` folder that is git-ignored on purpose (it contains internal notes and
> should not ship to the public repo).

## Design Philosophy

Dark, nerdy, system-inspired aesthetic — terminal cues, grid backgrounds, modular cards, and mono-font labels. Designed to feel like a portfolio built by someone who ships production AI systems. Balances technical depth with recruiter-friendly readability.

## Tech Stack

- **React 19** + **TypeScript** — component architecture
- **Vite 7** — build tooling
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — scroll animations and transitions
- **Lucide React** — icon system
- Static data files — no backend, no database

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview  # test locally
```

## Content Editing

All content lives in `src/data/`:

| File | Content |
|------|---------|
| `profile.ts` | Name, title, positioning, about, honest highlights, availability, social links |
| `experience.ts` | Work history — employer, optional `client`, domain, ownership bullets |
| `skills.ts` | Capability-led groups (description, technologies, proficiency, proof points) |
| `projects.ts` | Case studies — structured `Project` model with `tier`, `evidenceStatus`, `contentTodo` |
| `publications.ts` | Research (framed by year) |
| `certifications.ts` | Certifications & awards |
| `navigation.ts` | Navbar sections |
| `theme.ts` | Colors, fonts — single-file theme config |

### Adding / editing a case study

Add an entry to `src/data/projects.ts`. Flagships use `tier: 'flagship'`; the
narrative fields (`problem`, `ownership`, `scale`, `constraints`, `approach`,
`architecture`, `decisions`, `evaluation`, `outcome`, `lessons`) render only when
present. Keep outcomes honest: if a number isn't verified, leave it qualitative,
set `evidenceStatus: 'requires-verification'`, and record what's missing in
`contentTodo` (internal only — never shown to visitors). Flip to `'verified'` and
remove `contentTodo` once real figures are in.

### Replacing the Resume

Replace `public/resume.pdf` with your actual PDF file.

### Replacing the Favicon

Replace `public/favicon.svg`.

## Theme Configuration

Edit `src/data/theme.ts` to change colors, fonts, and spacing across the entire site.

## Asset Optimization

```bash
npm run optimize
```

This runs the Vite build with production optimizations (minification, tree-shaking, code splitting).

## Deployment (GitHub Pages)

This project includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

1. Push to `main` branch of `mayank187.github.io` repo
2. Go to repo **Settings → Pages → Source → GitHub Actions**
3. The workflow auto-builds and deploys on every push

The site will be live at `https://mayank187.github.io`.

## Project Structure

```
src/
  components/    # Reusable UI (Navbar, Badge, Modal, etc.)
  sections/      # Page sections (Hero, About, Experience, etc.)
  data/          # Static content & theme config
  hooks/         # Custom React hooks
  utils/         # Utility functions
public/
  resume.pdf     # Your resume (replace this)
  favicon.svg    # Site favicon
.github/
  workflows/
    deploy.yml   # GitHub Pages deployment
```

## Future Improvements

- Add blog/writing section
- Dark/light theme toggle
- Command palette navigation (Cmd+K)
- Project detail subpages
- Analytics integration
- i18n support
