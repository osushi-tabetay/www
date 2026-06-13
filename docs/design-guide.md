# Portfolio Design Guide

## Purpose

This site is an Astro + TypeScript portfolio for an illustrator. The current visual direction is `muted character archive`: gray-lavender, soft linework, subtle mystery, and sparse copy.

## Information Architecture

- `Hero`: first impression, icon identity, and sparse CTAs.
- `Stats`: compact archive indicators.
- `Works`: filterable two-row horizontal rail with detail dialog.
- `Notes`: latest blog entries linking into `/blog/`.
- `Profile`: artist positioning and specialties.

For content editing, see [Content Guide](./content-guide.md).

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
- The Works rail should remain two rows. Horizontal scrolling is allowed; stacking into a single long column is not.

## Interaction Rules

- Work filters are client-side and update `aria-selected`.
- Work cards open a native `dialog` for details.
- `Escape`, backdrop click, and close button must all dismiss the dialog.
- Works scroll controls should reflect rail state: left disabled at the start, right disabled at the end.
- Keep interactions dependency-free unless a new workflow truly needs a library.

For Cloudflare configuration and contact mail deployment, see [Deployment Guide](./deployment.md).
