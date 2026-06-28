# FromEdwin Web App

Microfrontend shell application built with [ShellUI](https://shellui.com/). Production builds are deployed to GitHub Pages at [app.fromedwin.com](https://app.fromedwin.com).

## Prerequisites

- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/) 10+ (`corepack enable` if needed)

## Development

```bash
pnpm install
pnpm start
```

The dev server runs on port **4000** (see `shellui.config.ts`).

## Build

```bash
pnpm run build
```

Output is written to `dist/`, including SPA fallbacks (`404.html`, route folders) and a service worker. Static files from `static/` (favicon, logo, `CNAME`, etc.) are copied into `dist/` during the build.

## Authentication

All navigation routes require sign-in. Authentication uses the ShellUI identity service at [id.shellui.com](https://id.shellui.com) (company ID `3`), configured in `shellui.config.ts` via `backend.type: 'shellui'`. Unauthenticated visitors are redirected to `/login` and returned to their original URL after signing in.

Sign-in is GitHub OAuth only (`backend.login` in `shellui.config.ts`). Provider details are also validated against the identity service at runtime.

## Backend API

The embedded React app calls the FromEdwin Django API using the ShellUI JWT (`settings.accessToken`) as a Bearer token.

| Variable | Development | Production |
|----------|-------------|------------|
| `VITE_BACKEND_URL` | `http://localhost:8000` | `https://fromedwin.com` |

Defaults are set in `app/.env.development` and `app/.env.production`. Override at build time (see `.github/workflows/deploy.yml`).

Use `app/src/lib/api.js` (`apiFetch`) and `app/src/hooks/useBackendUser.js` as references when adding API calls.

## Configuration

| File | Purpose |
|------|---------|
| `shellui.config.ts` | App title, layout, navigation, auth backend, and other ShellUI options |
| `app/.env.development` / `app/.env.production` | `VITE_BACKEND_URL` for the FromEdwin API |
| `static/` | Assets served at the site root (`/favicon.svg`, `/logo.svg`, …) |

See the [ShellUI documentation](https://shellui.com/) for available config options.

## Deployment

Pushes to `main` trigger [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the app and publishes `dist/` to GitHub Pages.

### GitHub repository settings

1. **Settings → Pages** — set **Source** to **GitHub Actions**.
2. **Custom domain** — set `app.fromedwin.com` (or rely on the `CNAME` file in `static/`).

### DNS

Add a `CNAME` record pointing `app` to `fromedwin.github.io`, then enable HTTPS in the Pages settings once DNS has propagated.

You can also run the workflow manually from the **Actions** tab (**Deploy to GitHub Pages → Run workflow**).

## Project structure

```
.
├── .github/workflows/deploy.yml   # GitHub Pages deploy
├── shellui.config.ts                # ShellUI configuration
├── static/                          # Static assets (copied to dist on build)
├── package.json
└── pnpm-lock.yaml
```

## License

See [LICENSE](LICENSE).
