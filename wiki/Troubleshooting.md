# Troubleshooting

Common problems and fixes. If yours isn't here, search
[issues](https://github.com/imirfanul/structyl/issues) or ask in
[Discussions](https://github.com/imirfanul/structyl/discussions).

## Styles aren't applying / components look unstyled

- Make sure you added the Tailwind preset to `tailwind.config.ts`:
  ```ts
  import preset from '@structyl/styled/tailwind-preset';
  export default { presets: [preset], content: ['./src/**/*.{ts,tsx}'] };
  ```
- Check your `content` globs include the files where you use structyl components.
- Confirm your app is wrapped in `<ThemeProvider>` from `@structyl/themes`.

## Flash of wrong theme / colors on first paint (FOUC)

Add `<ThemeScript>` from `@structyl/themes` inside your `<head>`, **before**
`<ThemeProvider>`. It sets the theme attributes before hydration.

## Hydration warning: "did not match" on `<html>`

Add `suppressHydrationWarning` to your `<html>` element. The theme system writes
`data-theme` / `data-mode` attributes that would otherwise mismatch SSR.

## `'use client'` / Server Component errors

Components that use React hooks are client components. Import and render them in a
client boundary, or mark your file with `'use client'`. Layout primitives and
purely presentational pieces are RSC-safe.

## Colors don't change with the theme

Use the token utility classes (`bg-primary`, `text-fg`, `border-border`) rather
than hardcoded Tailwind colors (`bg-blue-500`). Tokens are CSS variables that the
theme system updates at runtime.

## DataTable types are missing (`has no exported member ...`)

Ensure `@structyl/data-table` is built before your app. In this monorepo, build
from the **repo root** with `pnpm build` (Turborepo builds dependencies first) —
building inside an app directory skips the dependency build.

## TypeScript: `size` prop type error on `Input`

The styled `Input`'s `size` is a variant (`'sm' | 'md' | 'lg'`), not the native
HTML numeric `size`. If you spread native input attributes, omit `size`:
`Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>`.

## Still stuck?

Open a [bug report](https://github.com/imirfanul/structyl/issues/new?template=bug_report.yml)
with a minimal reproduction (StackBlitz/CodeSandbox).
