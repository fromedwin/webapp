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

## Configuration

| File | Purpose |
|------|---------|
| `shellui.config.ts` | App title, layout, navigation, theme, and other ShellUI options |
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
