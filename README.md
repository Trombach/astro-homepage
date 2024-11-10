<!--markdownlint-disable MD033 MD041-->

<div align=center>
  <img src="https://lukastrombach.dev/og/landing.png" alt="logo" width="500">
</div>

<br>

<div align=center>

[![Checks](https://github.com/Trombach/astro-homepage/actions/workflows/pr-checks.yml/badge.svg)](https://github.com/Trombach/astro-homepage/actions/workflows/pr-checks.yml)
![Staging](https://img.shields.io/github/deployments/Trombach/astro-homepage/Production?logo=vercel&label=Staging)
[![Lighthouse tests](https://github.com/Trombach/astro-homepage/actions/workflows/lighthouse.yml/badge.svg?event=schedule)](https://github.com/Trombach/astro-homepage/actions/workflows/lighthouse.yml)

</div>

# My personal homepage

This is my personal homepage built with [Astro](https://astro.build), [Svelte](https://svelte.dev) and [Tailwind](https://tailwindcss.com).

View it [here](https://lukastrombach.dev) or read more about it [here](https://www.lukastrombach.dev/projects/homepage).

## 🧞 Commands

This project uses `pnpm` and `corepack` for package management. Please install `node` and enable corepack by running

```bash
corepack enable
```

All commands are run from the root of the project, from a terminal:

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `pnpm install`      | Installs dependencies                            |
| `pnpm dev`          | Starts local dev server at `localhost:4321`      |
| `pnpm build`        | Build your production site to `./dist/`          |
| `pnpm preview`      | Preview your build locally, before deploying     |
| `pnpm astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro --help` | Get help using the Astro CLI                     |
