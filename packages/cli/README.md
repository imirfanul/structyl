# @structyl/cli

> Scaffold structyl projects and copy styled components straight into your codebase.

![npm](https://img.shields.io/npm/v/@structyl/cli)
![license](https://img.shields.io/npm/l/@structyl/cli)

A shadcn-style command-line tool for [structyl](https://github.com/imirfanul/structyl). Instead of installing a monolithic component package, you copy the source of the components you want directly into your project, where you fully own and can customize them. The CLI handles project setup, lists what's available, and resolves the registry and npm dependencies each component needs.

## Installation

You typically run the CLI on demand with your package runner, so a global install is optional.

```bash
# pnpm
pnpm dlx @structyl/cli init

# npm
npx @structyl/cli init

# yarn
yarn dlx @structyl/cli init
```

To add it as a project dev dependency:

```bash
# pnpm
pnpm add -D @structyl/cli

# npm
npm install -D @structyl/cli

# yarn
yarn add -D @structyl/cli
```

Once installed, the `structyl` binary is available.

## Usage

Initialize structyl in your project. This prompts for a base theme and a components directory, then writes a `structyl.config.json`:

```bash
npx structyl init
```

List every component available in the registry:

```bash
npx structyl list
```

Add one or more components. Dependencies are resolved automatically — for example, adding `date-picker` also pulls in `calendar` and `button`:

```bash
npx structyl add button
npx structyl add date-picker dialog toast
```

Each component's styled source is written into the directory configured in `structyl.config.json`. When a component requires external npm packages (such as the DataTable's TanStack dependencies), the CLI prints the exact install command to run afterward.

### Options for `add`

```bash
# Run against a different working directory
npx structyl add button --cwd ./apps/web

# Point at a local @structyl/styled/src checkout for inlining
npx structyl add button --source ../structyl/packages/styled/src
```

## Features

- **Project initialization** — interactive `init` command that scaffolds `structyl.config.json` with your chosen theme and components directory.
- **Component registry** — `list` surfaces the full catalog of available structyl components.
- **Copy-into-project workflow** — `add` inlines styled component source into your codebase so you own and can edit it, no runtime package lock-in.
- **Automatic dependency resolution** — transitively resolves registry dependencies between components (e.g. `date-time-picker` → `calendar`, `button`, `time-picker`).
- **npm dependency hints** — reports any external packages (like `@tanstack/react-table`) a component needs, with a ready-to-run install command.
- **Configurable target** — `--cwd` and `--source` flags adapt the command to monorepos and local development.

## Commands

| Command | Description |
| --- | --- |
| `structyl init` | Initialize structyl in your project and write `structyl.config.json`. |
| `structyl list` | List all components available in the registry. |
| `structyl add <components...>` | Add one or more components, resolving their dependencies. |

### `add` flags

| Flag | Description | Default |
| --- | --- | --- |
| `--cwd <path>` | Working directory for the command. | `process.cwd()` |
| `--source <path>` | Path to `@structyl/styled/src` to inline component source from. | `node_modules/@structyl/styled/src` |

## Part of structyl

This package is part of [structyl](https://github.com/imirfanul/structyl) — see the full documentation at [www.structyl.com](https://www.structyl.com).

## License

MIT
