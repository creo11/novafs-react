# Deploying the React app to Cloudflare at `/react-app/`

## OneDrive users

Keep this repo **outside OneDrive sync** if possible, or exclude `node_modules` and `deploy/` from sync.

**Do not** copy build output into `react-app/` on your PC — that confuses OneDrive (mass delete prompts).

Use `npm run build:cloudflare` — it only writes to `deploy/react-app/` at the repo root.

---

## Production build (required)

Dev `react-app/index.html` loads `/src/main.tsx`. Production must serve built JS from `/react-app/assets/`.

| Command | When |
|---------|------|
| `npm run dev` | Local development |
| `npm run build` | Compile only → `react-app/dist/` |
| `npm run build:cloudflare` | Build + copy to `deploy/react-app/` (safe for deploy) |

---

## Cloudflare Pages build settings

Use a **repository root** deploy with the legacy static site + React subfolder.

**Build command:**

```bash
cd react-app && npm ci && npm run build:cloudflare && cd .. && cp -r deploy/react-app/* react-app/
```

**Build output directory:** `/` (repository root)

The final `cp` runs on Cloudflare’s servers (not your laptop), placing built files in `react-app/` for the URL `/react-app/`.

Root `_redirects`:

```
/react-app/*  /react-app/index.html  200
```

---

## Verify locally

```bash
cd react-app
npm run build:cloudflare
```

Open `deploy/react-app/index.html` — script src should be `/react-app/assets/….js`, not `/src/main.tsx`.

Preview:

```bash
npm run preview
# http://localhost:4173/react-app/
```

---

## If the React app is the only site (no `/react-app/` path)

Set `base: '/'` in `vite.config.ts`, build output `react-app/dist`, and open the site at the domain root.
