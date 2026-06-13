# Content Guide

This document describes how to update portfolio content without changing the site structure.

## Works

Works are defined in `src/data/portfolio.ts`.

Each work has:

- `id`: stable identifier used by the detail dialog.
- `title`: card and dialog title.
- `category`: one of `character`, `scene`, `series`, or `objects`.
- `year`: display year.
- `client`: currently placeholder archive text.
- `palette`: card and dialog accent color.
- `summary`: short card copy.
- `detail`: dialog body copy.
- `tags`: dialog chips.

Keep `summary` short enough for the card. Put longer context in `detail`.

## Categories

Categories also live in `src/data/portfolio.ts`.

When adding a category:

- Add it to the `WorkCategory` union.
- Add a matching entry to `categories`.
- Use the same category value in each work item.

The filter UI is generated from `categories`, and the count in the hero statistics is computed from real data.

## Notes

Notes are Markdown files in `src/content/blog/`.

Each file needs frontmatter:

```md
---
title: "記事タイトル"
description: "一覧と meta description に出る短い説明。"
date: 2026-06-13
tags: ["note"]
---
```

Routes are generated automatically:

- `/blog/` lists all notes.
- `/blog/[slug]/` renders each note.
- The home page shows the latest three notes.

Use concise article titles and descriptions. The site is intentionally low-copy, so notes should read like production memos rather than announcements.

## Assets

Place public images in `public/assets/`.

Current assets:

- `icon.jpg`: favicon, header mark, and social image.
- `hero-coc-bright.png`: hero artwork.

Prefer real or generated bitmap artwork for main visuals. Avoid replacing artwork slots with CSS-only decorations.
