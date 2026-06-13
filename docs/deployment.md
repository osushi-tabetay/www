# Deployment Guide

This project is configured for Cloudflare Pages plus a separate contact Worker.

## Static Site

The Astro site uses static output.

- Build command: `pnpm build`
- Output directory: `dist`
- Wrangler config: `wrangler.jsonc`
- Site URL in Astro config: `https://osushi-gallary.pages.dev`

Deploy the site:

```sh
pnpm deploy
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
- Recipient: `karin+osushi-gallary@manj.io`
- Sender: `osushi-gallary@manj.io`

The Worker expects these variables:

- `CONTACT_TO`
- `CONTACT_FROM`
- `ALLOWED_ORIGIN`

`ALLOWED_ORIGIN` is a comma-separated allowlist. The current local and Pages origins are configured in `wrangler.contact.jsonc`.

## Production Checklist

- Verify the Email Sending sender domain and destination address in Cloudflare.
- Set `PUBLIC_CONTACT_ENDPOINT` for the Pages environment if the Worker is deployed at a separate route.
- Confirm the contact route accepts `POST /contact`.
- Run `pnpm build` before deploy.
- Run `pnpm exec wrangler deploy --config wrangler.contact.jsonc --dry-run` after changing Worker bindings.
