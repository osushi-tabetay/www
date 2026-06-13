# Deployment Guide

This project is configured for Cloudflare Pages plus a separate contact Worker.

## Static Site

The Astro site uses static output.

- Build command: `pnpm build`
- Output directory: `dist`
- Wrangler config: `wrangler.jsonc`
- Site URL in Astro config: `https://www.tabetay.com`

The Cloudflare Pages project has been created as `osushi-gallary`. Wrangler can
deploy the built `dist` directory to that project, but the `www.tabetay.com`
custom domain must be attached to the Pages project from Cloudflare Dashboard:

1. Open Workers & Pages > `osushi-gallary` > Custom domains.
2. Add `www.tabetay.com`.
3. Point `www.tabetay.com` to `osushi-gallary.pages.dev` with a CNAME record if
   Cloudflare does not create the record automatically.

## Temporary Page Authentication

Pages are protected by `functions/_middleware.ts` and require these Pages
secrets:

- `BASIC_AUTH_USERNAME`
- `BASIC_AUTH_PASSWORD`

Set them for Cloudflare Pages:

```sh
pnpm exec wrangler pages secret put BASIC_AUTH_USERNAME --project-name osushi-gallary
pnpm exec wrangler pages secret put BASIC_AUTH_PASSWORD --project-name osushi-gallary
```

For local Pages Functions testing, create a local-only `.dev.vars` file with
the same keys, then run `pnpm build` and `pnpm exec wrangler pages dev dist`.
If either secret is missing, Pages Functions returns `503`.

Deploy the site:

```sh
pnpm deploy:site
```

Cloudflare Pages can also deploy directly from the repository using the same build command and output directory.

## Contact Worker

The contact form posts JSON to `PUBLIC_CONTACT_ENDPOINT` when set, or `/contact` by default.

The Worker lives in `workers/contact.ts` and is configured by `wrangler.contact.jsonc`.

Deploy the Worker:

```sh
pnpm deploy:contact
```

Local Worker development:

```sh
pnpm dev:contact
```

## Email Sending

The contact Worker uses Cloudflare Email Sending through a `send_email` binding:

- Binding name: `EMAIL`
- Recipient: `osushi@tabetay.com`
- Sender: `contact@tabetay.com`

The Worker expects these variables:

- `CONTACT_TO`
- `CONTACT_FROM`
- `CONTACT_WORKER_SECRET`
- `ALLOWED_ORIGIN`

`ALLOWED_ORIGIN` is a comma-separated allowlist. The production site origin is configured in `wrangler.contact.jsonc`.
The Pages project and contact Worker must share the same `CONTACT_WORKER_SECRET`.
The public form posts to the Pages `/contact` Function, which forwards to
`https://contact.tabetay.com/contact` with the secret header.

## Production Checklist

- Verify the Email Sending sender domain and destination address in Cloudflare.
- Set `PUBLIC_CONTACT_ENDPOINT` for the Pages environment if the Worker is deployed at a separate route.
- Confirm the contact route accepts `POST /contact`.
- Run `pnpm build` before deploy.
- Run `pnpm deploy:contact:dry-run` after changing Worker bindings.
