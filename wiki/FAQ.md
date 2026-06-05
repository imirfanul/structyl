# Frequently Asked Questions

## What is structyl?

An open-source, TypeScript-first React component library. It combines WAI-ARIA
compliant **headless primitives**, a **Tailwind-styled** component layer, a
**runtime theming** system, and a **first-class DataTable** — shipped as
independently-versioned `@structyl/*` npm packages.

## How is it different from shadcn/ui?

structyl ships as **real npm packages** (`pnpm add @structyl/styled`) rather than
copy-paste snippets, and adds runtime theming (switch themes with no reload), a
feature-complete DataTable, and more components out of the box. You can also use
the CLI to copy source in shadcn-style if you prefer.

## How does it compare to Radix UI?

structyl builds on the same headless-first philosophy as Radix but adds a full
Tailwind-styled layer, runtime theming, dark mode, and a DataTable. Radix is
primitives-only; structyl is a complete library ready to use.

## Does it work with Next.js App Router / RSC?

Yes. Components that use hooks are marked `'use client'`, and the library is
SSR-safe and compatible with Next.js 15 App Router and React Server Components.

## Does it support dark mode?

Yes — via `ThemeProvider` with `system`, `light`, and `dark` modes. Switches
happen instantly with CSS custom properties, with no flash of unstyled content
when you include `<ThemeScript>`.

## Is it TypeScript-first?

Yes. Built in strict mode; all components export their prop types; no `any` in
the public API.

## Which package do I install?

Most apps need `@structyl/styled` + `@structyl/themes`. Add `@structyl/data-table`
for the data grid, `@structyl/icons` for icons, and `@structyl/hooks` for the
React hooks. See [Packages](https://github.com/imirfanul/structyl#packages).

## Is it free?

Yes — MIT licensed and free. All packages are published under the `@structyl`
scope on npm.

## How do I report a bug or request a feature?

- [Bug report](https://github.com/imirfanul/structyl/issues/new?template=bug_report.yml)
- [Feature request](https://github.com/imirfanul/structyl/issues/new?template=feature_request.yml)
- For questions, use [Discussions](https://github.com/imirfanul/structyl/discussions)

## How do I report a security issue?

Privately, via a [security advisory](https://github.com/imirfanul/structyl/security/advisories/new).
Never in a public issue. See [SECURITY.md](https://github.com/imirfanul/structyl/blob/master/SECURITY.md).
