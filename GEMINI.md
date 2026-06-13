# Osushi Gallery Agent Context

<!-- derived-from ./.codex/skills/osushi-gallery-maintenance/SKILL.md -->

This repository is an Astro + TypeScript illustrator portfolio. For content and visual maintenance tasks, read the repository-local skill first:

- `.codex/skills/osushi-gallery-maintenance/SKILL.md`

Use that skill when the user asks to:

- add or remove Works artwork
- add or remove blog notes
- update the profile/about copy
- change the site color palette

Keep edits scoped to the requested content or styling change. Do not overwrite unrelated uncommitted changes.

Validation commands:

```sh
prek run --files <changed-files>
pnpm build
```
