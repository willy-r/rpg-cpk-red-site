# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Next.js Version Warning

This project uses **Next.js 16.2.6**, which has breaking changes from the version in training data. Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`. Heed all deprecation notices — APIs, conventions, and file structure may differ significantly.

## Commands

Node is managed via **nvm**. Prefix all commands with the nvm bin path:

```bash
export PATH="$HOME/.nvm/versions/node/v22.15.0/bin:$PATH"
```

```bash
pnpm dev          # start dev server at localhost:3000
pnpm build        # static export to out/ (uses output: "export")
pnpm lint         # eslint
```

No test suite exists in this project.

## Architecture

**Static site** — `next.config.ts` sets `output: "export"` and `trailingSlash: true`. The build produces flat HTML in `out/`. No server-side rendering, no API routes.

### Routing

Six content sections, each a single `page.tsx` under `src/app/`:
- `/cenario` `/personagem` `/combate` `/equipamentos` `/netrunning` `/economia`

One dynamic route: `/personagem/[role]/page.tsx` renders 7 static pages (one per Role). It uses `generateStaticParams()` driven by `src/data/roles.ts`.

### Data Layer

All game content lives in `src/data/*.ts` as typed arrays/objects — no database, no fetch calls. Adding or editing game content means editing these files directly. The TypeScript interfaces for all data shapes are in `src/lib/types.ts`; always update types there first, then the data files.

### Component Hierarchy

- `src/components/ui/` — primitive building blocks: `NeonCard`, `SectionHeader`, `Table`, `Tag`, `TerminalBox`, `GlitchText`
- `src/components/sections/` — domain-specific cards/displays that consume data types from `src/lib/types.ts`
- `src/components/layout/` — `Header` (client component, uses `usePathname`), `Footer`, `Sidebar`
- `src/components/home/` — homepage-only components

`NeonCard` is the primary container pattern used across every page — it accepts a `color` prop (`"cyan" | "green" | "purple" | "pink" | "yellow"`) that determines border and glow color.

### Styling

**Tailwind CSS v4** — configuration is done entirely in `src/app/globals.css` via the `@theme` block (not `tailwind.config.ts`). Custom design tokens live there:
- Colors: `bg-bg-primary`, `bg-bg-elevated`, `text-neon-cyan`, etc.
- Fonts: `font-display` (Orbitron, headings) and `font-mono` (Share Tech Mono, body/data)
- CSS animations: `.glitch-text`, `.neon-pulse`, `.flicker` are defined as keyframes in `globals.css`

Neon glow effects use inline `style` or raw hex values in Tailwind arbitrary classes (e.g. `border-[#00f5ff33]`). The `@theme` tokens are available as Tailwind utilities.

The only `"use client"` component is `src/app/equipamentos/page.tsx` (cyberware category filter) and `Header.tsx` (mobile nav + active link detection). Everything else is React Server Components.
