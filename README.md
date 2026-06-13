# Osushi Gallery

<!-- derived-from ./docs/design-guide.md -->
<!-- derived-from ./docs/content-guide.md -->
<!-- derived-from ./docs/deployment.md -->

Astro + TypeScript で作る、イラストレーター向けの軽量ポートフォリオサイトです。

現在の方向性は、仄暗いキャラクターアーカイブ。短いコピー、くすんだ色、2 rows の横スクロール Works、Note 一覧、問い合わせフォームを持ちます。

## Stack

- Astro static output
- TypeScript
- Cloudflare Pages
- Cloudflare Workers Email Sending for contact mail
- pnpm

## Commands

```sh
pnpm install
pnpm dev
pnpm build
pnpm preview
```

Pre-commit hooks:

```sh
prek install
prek run --all-files
```

Contact Worker のローカル確認:

```sh
pnpm dev:contact
```

Deploy:

```sh
pnpm deploy:site
pnpm deploy:contact
```

## Project Map

- `src/pages/index.astro`: home page, Works, Notes, Profile, contact dialog
- `src/data/portfolio.ts`: Works data and categories
- `src/content/blog/`: Note articles
- `src/scripts/portfolio.ts`: client-side filters, dialogs, contact form
- `src/styles/global.css`: theme tokens and layout
- `workers/contact.ts`: contact mail Worker
- `public/assets/`: icon and visual assets

## Documentation

- [Design Guide](./docs/design-guide.md): visual direction, layout rules, interaction rules
- [Content Guide](./docs/content-guide.md): Works and Notes update flow
- [Deployment Guide](./docs/deployment.md): Cloudflare Pages and Email Sending setup

## Notes

The package and Cloudflare project currently use `osushi-gallary` spelling to match the initialized project. User-facing labels use `Osushi Gallery`.
