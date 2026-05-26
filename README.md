# DevCard Generator

<p align="center">
  <strong>Create beautiful, customizable GitHub developer profile cards — export as PNG in seconds.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#requirements">Requirements</a> ·
  <a href="#installation">Installation</a> ·
  <a href="#usage">Usage</a> ·
  <a href="#deployment">Deployment</a> ·
  <a href="#project-structure">Structure</a>
</p>

<!-- Add a screenshot after your first run: save as public/screenshot.png -->
![DevCard Generator Screenshot](https://i.ibb.co/abc123/devcard.png)

---

## Overview

**DevCard Generator** is a single-page web app that fetches public GitHub profile data, renders a polished developer card, and lets you customize themes, colors, layout, and visibility — then download the result as a high-resolution PNG.

No GitHub token or backend required for basic usage. Built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**.

---

## Features

### Core
- Fetch any public GitHub profile via the [GitHub REST API](https://docs.github.com/en/rest/users/users)
- Live card preview with responsive scaling (mobile-friendly)
- One-click **PNG export** (`devcard-{username}.png`)
- Shareable URLs: `?username=torvalds`
- Recent searches (last 5, stored in `localStorage`)
- Demo card when no username is entered

### 12 card themes
| Theme | Style |
|-------|--------|
| Minimal Light | Clean white |
| Midnight Dark | Slate + indigo |
| Gradient Purple | Violet / fuchsia gradient |
| Cyber Green | Terminal-inspired |
| Sunset Orange | Warm gradient |
| Ocean Blue | Sky / indigo gradient |
| Rose Gold | Rose / amber |
| Graphite | Monochrome dark |
| Aurora | Teal / violet / emerald |
| GitHub Dark | Official GitHub dark palette |
| Candy Pink | Playful pink / yellow |
| Forest Moss | Deep green |

### Customization panel
- **10 accent colors** — avatar ring, links, stats, language pills
- **3 export sizes** — Square (1080×1080), Wide (1200×630), Compact (600×900)
- **Corner radius** — Sharp → 3XL
- **Avatar shape** — Square, rounded, circle
- **Font scale** — Compact / default / large
- **Shadow** — None / soft / strong
- **Background patterns** — None, dots, grid, noise
- **Display toggles** — stats, bio, meta, join date, languages, repos, footer
- **Custom footer text**
- **Data density** — 3 or 5 top repos, 4 or 6 top languages
- **Reset** all options to defaults
- Settings persisted in `localStorage`

### UX & quality
- Skeleton loading (no bare spinner)
- Clear error messages (404, rate limit, network, partial repo failure)
- Page light/dark mode (separate from card theme)
- Accessible labels and ARIA attributes

---

## Requirements

Before you begin, make sure you have:

| Requirement | Minimum version | Notes |
|-------------|-----------------|-------|
| **Node.js** | 18.x or higher | [nodejs.org](https://nodejs.org/) — LTS 20+ recommended |
| **npm** | 9.x or higher | Ships with Node.js |
| **Git** | Any recent version | Optional, for cloning |

### Optional (recommended for production)
- **GitHub Personal Access Token** — not required, but increases API rate limit from ~60 to 5,000 requests/hour if you add server-side fetching later
- **Vercel / Netlify account** — for one-click deployment

### Browser support
- Chrome, Edge, Firefox, Safari (latest)
- PNG export uses `html-to-image` (Canvas) — works best in Chromium-based browsers

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/devcard-generator.git
cd devcard-generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure GitHub link (optional)

Update the repository URL shown in the navbar:

```ts
// lib/constants.ts
export const GITHUB_REPO_URL = "https://github.com/YOUR_USERNAME/devcard-generator";
```

### 4. Add a screenshot (optional, for README)

Run the app, generate a card, take a screenshot, and save it as:

```
public/screenshot.png
```

---

## Usage

### Development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

### Generate a card

1. Enter a GitHub username (e.g. `vercel`, `torvalds`, `sindresorhus`)
2. Click **Generate Card** or press **Enter**
3. Customize theme, accent, layout, and toggles in the left panel
4. Click **Download PNG**

### Share via URL

```
https://your-domain.com/?username=gaearon
```

The app auto-generates the card when opened with a `username` query parameter.

### Example usernames

`torvalds` · `gaearon` · `sindresorhus` · `vercel` · `octocat`

---

## GitHub API & rate limits

This app uses the **public** GitHub API without authentication:

| Endpoint | Purpose |
|----------|---------|
| `GET /users/{username}` | Profile data |
| `GET /users/{username}/repos?sort=updated&per_page=100` | Repos, stars, languages |

**Unauthenticated limit:** ~60 requests/hour per IP.

If you hit the limit, you'll see: *"GitHub API rate limit reached…"*

**Workarounds:**
- Wait an hour or switch network/VPN
- (Future) Add optional `GITHUB_TOKEN` for server-side requests

---

## Deployment

### Vercel (recommended)

1. Push the repo to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Framework preset: **Next.js**
4. Deploy — no environment variables required

```bash
npm i -g vercel
vercel
```

### Docker (manual)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

> Note: Enable `output: 'standalone'` in `next.config.ts` for the Docker example above.

### Static hosting

This app uses client-side GitHub fetching and Next.js App Router. **Vercel** or **Node** hosting is recommended. Pure static export is not the default setup.

---

## Project structure

```
devcard-generator/
├── app/
│   ├── layout.tsx          # Root layout, metadata, theme script
│   ├── page.tsx            # Home route (+ ?username= support)
│   └── globals.css         # Tailwind + global styles
├── components/
│   ├── HomePage.tsx        # Main app state & layout
│   ├── DevCard.tsx         # Card renderer
│   ├── CustomizePanel.tsx  # All customization controls
│   ├── CardPreview.tsx     # Responsive scaled preview
│   ├── Hero.tsx            # Landing hero + form
│   ├── Navbar.tsx
│   └── ...
├── lib/
│   ├── github.ts           # API fetch + stats helpers
│   ├── themes.ts           # 12 card themes + sizes
│   ├── customization.ts    # Accent, toggles, persistence
│   ├── storage.ts          # localStorage helpers
│   └── constants.ts        # Repo URL, app name
├── types/
│   └── github.ts           # TypeScript interfaces
├── public/
│   └── logo.svg            # Favicon
├── README.md
└── LICENSE
```

---

## Tech stack

| Technology | Role |
|------------|------|
| [Next.js 16](https://nextjs.org/) | App Router, SSR shell |
| [React 19](https://react.dev/) | UI |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [html-to-image](https://github.com/bubkoo/html-to-image) | PNG export |
| [Lucide React](https://lucide.dev/) | Icons |

---

## Customization reference

Settings are saved under `devcard-customization` in `localStorage`.

| Option | Values |
|--------|--------|
| Accent | violet, blue, cyan, emerald, amber, rose, orange, fuchsia, slate, red |
| Border radius | none, md, xl, 2xl, 3xl |
| Avatar | square, rounded, circle |
| Font scale | compact, default, large |
| Shadow | none, soft, strong |
| Pattern | none, dots, grid, noise |
| Top repos | 3 or 5 |
| Top languages | 4 or 6 |

---

## Roadmap

- [ ] Optional `GITHUB_TOKEN` for higher rate limits
- [ ] URL params for theme & accent sharing
- [ ] SVG / JPEG export
- [ ] Contribution graph snippet
- [ ] Pinned repos selector
- [ ] i18n

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m "Add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

Please run `npm run lint` and `npm run build` before submitting.

---

## License

[MIT](./LICENSE) © DevCard Generator

---

<p align="center">
  <strong>If you like this project, consider giving it a star.</strong>
</p>
