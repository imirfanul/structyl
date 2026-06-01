# Changelog

## 1.0.1

### Patch Changes

- Add package metadata and publish with npm provenance.

  Every package now declares `author` (Mohammed Irfanul Alam Tanveer), `repository` (with monorepo `directory`), `homepage` (https://www.structyl.com), and `bugs`. Releases are now published with npm provenance. No runtime/code changes.

## 0.1.0 — Initial release

### Added

- `createApiClient` — factory for a pre-configured Axios instance with automatic auth header injection and normalised error shape
- `ApiProvider` — universal SSR-safe React context provider; no framework-specific imports, works in React, Next.js, Remix, Astro, and React Native
- `useApiQuery` — TanStack Query `useQuery` wrapper with sensible defaults (1 min stale time, 1 retry, refetch on window focus) and two call signatures: shorthand URL string or explicit `[key, url/fetcher]`
- `useApiMutation` — `useMutation` wrapper supporting POST/PUT/PATCH/DELETE, automatic query invalidation, and first-class optimistic updates with automatic rollback on error
- `prefetchApiQuery` — server-side prefetch utility exported from `@structyl/api-client/server`; compatible with Next.js App Router RSC pages, Pages Router `getServerSideProps`, and Remix loaders
- Full TypeScript generics: `ApiQueryResult<TData>`, `ApiMutationResult<TData, TVariables>`, `OptimisticConfig`, and all option interfaces are publicly exported
- `sideEffects: false` for full tree-shaking
- Dual ESM + CJS build via tsup
