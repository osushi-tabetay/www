---
name: osushi-gallery-maintenance
description: "Use this repository-local skill when maintaining Osushi Gallery content or visual identity: add or remove Works artwork, add or remove blog notes, update the profile/about copy, or change the site color palette."
---

# Osushi Gallery Maintenance

<!-- derived-from ../../../docs/design-guide.md -->
<!-- derived-from ../../../docs/content-guide.md -->

This skill updates the Astro portfolio without changing the site structure. Keep edits small, preserve the current `muted character archive` direction unless the user explicitly asks for a different identity, and run `pnpm build` or the focused `prek` hooks before reporting completion.

## Orientation

- Works data: `src/data/portfolio.ts`
- Work images: `public/assets/works/`
- Blog notes: `src/content/blog/*.md`
- Blog schema: `src/content.config.ts`
- Profile copy: `src/pages/index.astro`, section `id="profile"`
- Theme tokens: `src/styles/global.css`, top-level `:root`
- Design/content references: `docs/design-guide.md`, `docs/content-guide.md`

Before editing, inspect the target file and current git status. Do not overwrite unrelated user changes.

## Add Artwork

Required inputs: image source, title, category, year, summary. If missing, infer safe defaults from the artwork only when obvious; otherwise ask for the missing field.

1. Create a stable kebab-case `id` from the title.
2. Copy the image into `public/assets/works/{id}.{ext}`. Preserve `.jpg`, `.png`, or `.webp`.
3. Add a `PortfolioWork` object to `works` in `src/data/portfolio.ts`.
4. Use category `character`, `scene`, `series`, or `objects` unless the user also asked to add a category.
5. Set `image` to `/assets/works/{id}.{ext}` and choose a muted `palette` hex that fits the image.
6. Keep `summary` short for cards; put longer Japanese copy in `detail`; use 2-4 concise tags.

Example:

```ts
{
  id: "deep-forest",
  title: "Deep Forest",
  category: "scene",
  year: "2026",
  client: "Archive",
  palette: "#5b7d6a",
  summary: "森の奥の静かな光。",
  detail: "木陰と小道の温度を抑えめの色でまとめたシーン習作です。",
  tags: ["scene", "forest", "light"],
  image: "/assets/works/deep-forest.jpg",
}
```

## Remove Artwork

1. Find the work by `id`, title, or image path in `src/data/portfolio.ts`.
2. Remove exactly that object from `works`; keep surrounding array syntax valid.
3. Remove the matching file from `public/assets/works/` only when it is not referenced anywhere else.
4. If removing the last work in a category, keep the category unless the user explicitly asks to remove it.

## Add Blog Note

1. Create `src/content/blog/{slug}.md` with a kebab-case slug.
2. Use frontmatter matching `src/content.config.ts`:

```md
---
title: "記事タイトル"
description: "一覧と meta description に出る短い説明。"
date: 2026-06-13
tags:
  - note
---
```

3. Write concise body copy. The site tone is production memo, not announcement copy.
4. Home page and `/blog/` update automatically from the content collection.

## Remove Blog Note

1. Match the requested note by slug or title in `src/content/blog/`.
2. Delete the Markdown file.
3. Check for links to that slug before deletion; update or report any references found.

## Update Profile

The profile is in `src/pages/index.astro`:

- Main copy: paragraph inside `<section class="section profile" id="profile">`
- Specialty chips: `.profile__list`
- Navigation label usually stays `About`

Keep the copy short and atmospheric. If the user provides direct wording, preserve it unless it breaks layout or tone. Avoid adding new profile fields unless requested.

## Change Palette

Edit CSS custom properties in `src/styles/global.css` first:

- `--color-ink`: main text, borders, hard shadows
- `--color-muted`: secondary text
- `--color-paper`: page background
- `--color-surface`: cards/dialogs
- `--color-line`: subtle borders
- `--color-primary`: main CTA accent
- `--color-primary-ink`: text on primary
- `--color-secondary`: cool accent
- `--color-berry`: secondary highlight
- `--color-fog`: quiet neutral

Adjust body background gradients only when tokens alone do not fit the requested mood. Keep contrast readable, card radius at or below `8px`, and avoid turning the UI into a one-hue palette.

## Validation

Prefer focused checks while editing:

```sh
prek run --files <changed-files>
```

Run the full build before finishing content or theme changes:

```sh
pnpm build
```

For visual changes, start `pnpm dev` and inspect the home page at desktop and mobile widths when feasible.
