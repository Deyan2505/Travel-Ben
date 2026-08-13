# Travel Ben â€” Netlify

Netlify-ready static Next.js version of the Travel Ben website.

## Local preview

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The deployable static website is generated in `out/`.

## Netlify settings

- Build command: `npm run build`
- Publish directory: `out`
- Node version: `22`

The included `netlify.toml` configures these settings automatically.

After Netlify assigns the final domain, set the environment variable
`NEXT_PUBLIC_SITE_URL` to the full production URL and redeploy.

