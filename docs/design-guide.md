# Portfolio Design Guide

<!-- derived-from ../src/pages/index.astro -->
<!-- derived-from ../src/styles/global.css -->

## Purpose

This site is an Astro + TypeScript portfolio for an illustrator. The current visual direction is `muted character archive`: gray-lavender, soft linework, subtle mystery, and sparse copy.

## Information Architecture

- `Hero`: first impression, icon identity, and sparse CTAs.
- `Stats`: compact archive indicators.
- `Works`: filterable portfolio grid with detail dialog.
- `Notes`: latest blog entries linking into `/blog/`.
- `Profile`: artist positioning and specialties.

## Content Model

Portfolio data lives in `src/data/portfolio.ts`.

- `category` drives filtering.
- `palette` drives card and dialog accent color.
- `summary` is the scannable grid text.
- `detail` is the dialog text.
- `tags` appear as chips in the dialog.

Keep real artwork metadata in this data file first, then add dedicated detail pages only when SEO or deep linking is needed.

Blog posts live in `src/content/blog/*.md`.

- `/blog/` lists every post.
- `/blog/[slug]/` renders individual posts.
- Frontmatter requires `title`, `description`, `date`, and optional `tags`.

## Theme Surface

Primary visual tokens are CSS custom properties in `src/styles/global.css`.

- `--color-ink`: main text, borders, and playful hard shadows.
- `--color-paper`: muted gray-lavender page background.
- `--color-surface`: card and dialog surfaces.
- `--color-primary`: CTA and sunny accent.
- `--color-secondary`: cool accent for contact and balance.
- `--color-berry`: secondary highlight.
- `--radius-card`: portfolio card and dialog radius. Keep at `8px` or lower unless the whole identity changes.
- `--shadow-soft`: large image shadow.

To change the atmosphere, edit tokens first. Avoid rewriting section structure for purely visual changes. The current palette intentionally uses gray-lavender, muted pink, and a small lime accent to match darker character-art samples.

## Layout Rules

- Keep the first viewport focused on the brand, hero image, headline, and CTAs.
- Keep copy short. Avoid language that reads like commission sales copy unless a real contact flow is added.
- Use full-width sections with constrained inner content; avoid nesting cards inside cards.
- Cards are only for repeated works, process steps, dialogs, or framed functional UI.
- Buttons and filters must keep stable height so text changes do not shift layout.
- The hero image should remain a real bitmap artwork, not a decorative gradient.

## Interaction Rules

- Work filters are client-side and update `aria-selected`.
- Work cards open a native `dialog` for details.
- `Escape`, backdrop click, and close button must all dismiss the dialog.
- Keep interactions dependency-free unless a new workflow truly needs a library.

## Cloudflare Notes

The project is configured for static Astro output.

- Build command: `pnpm build`
- Output directory: `dist`
- Wrangler config: `wrangler.jsonc`
- Cloudflare Pages can deploy the repository directly or via `pnpm deploy`.
- The contact form posts JSON to `PUBLIC_CONTACT_ENDPOINT` or `/contact` by default.
- The contact Worker lives in `workers/contact.ts` and deploys with `pnpm deploy:contact`.
- Email sending uses the Cloudflare Email Service `send_email` binding named `EMAIL`.
- The Worker sends contact mail to `karin+osushi-gallary@manj.io`.

If the site later needs server-side personalization, forms, authenticated previews, or edge middleware, reassess whether to add a Cloudflare adapter or Pages Functions.
