# @structyl/api-client

> Framework-agnostic React data fetching — an Axios client with a built-in query cache.

![npm](https://img.shields.io/npm/v/@structyl/api-client)
![license](https://img.shields.io/npm/l/@structyl/api-client)

`@structyl/api-client` is a lightweight data-fetching layer for React. It pairs a configured Axios client with its own query cache and a set of hooks for queries, mutations, infinite lists, and Suspense — no separate query library required. It works identically in Vite/CRA, Next.js (App and Pages Router), Remix, Astro, and React Native, and is part of the [structyl](https://github.com/imirfanul/structyl) ecosystem.

## Installation

```bash
# pnpm
pnpm add @structyl/api-client axios

# npm
npm install @structyl/api-client axios

# yarn
yarn add @structyl/api-client axios
```

`axios` and `react` (18 or 19) are peer dependencies and are not bundled.

## Usage

```tsx
import {
  createApiClient,
  ApiProvider,
  useApiQuery,
  useApiMutation,
} from '@structyl/api-client';

// 1. Create a client once, at the app root.
const api = createApiClient({
  baseURL: 'https://api.example.com',
  getAuthToken: () => localStorage.getItem('token'),
});

// 2. Provide it to your tree.
export default function App() {
  return (
    <ApiProvider client={api}>
      <UserList />
      <CreateUser />
    </ApiProvider>
  );
}

// 3. Query data.
type User = { id: string; name: string };

function UserList() {
  const { data, isLoading, error } = useApiQuery<User[]>('/users');

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

// 4. Mutate data and invalidate the cache.
function CreateUser() {
  const { mutate, isPending } = useApiMutation<User, { name: string }>('/users', {
    method: 'POST',
    invalidates: [['/users']],
  });

  return (
    <button disabled={isPending} onClick={() => mutate({ name: 'Alice' })}>
      Create user
    </button>
  );
}
```

### Server-side prefetching (SSR)

The `@structyl/api-client/server` entry point lets you prefetch on the server and hydrate the client to avoid a loading flicker.

```tsx
import { QueryClient, prefetchApiQuery, dehydrate } from '@structyl/api-client/server';

const queryClient = new QueryClient();
await prefetchApiQuery(queryClient, api, '/users');

// Pass dehydrate(queryClient) to <ApiProvider hydratedState={...}> on the client.
const hydratedState = dehydrate(queryClient);
```

## Features

- **Configured Axios client** — `createApiClient` with `baseURL`, custom headers, timeout, bearer-token injection (`getAuthToken`), and automatic 401 token refresh (`refreshToken`).
- **Built-in query cache** — request deduplication, stale-while-revalidate, garbage collection, and external invalidation. No separate query library to install.
- **Complete hook set** — queries, mutations, infinite/cursor pagination, parallel queries, Suspense, and prefetching.
- **Smart fetching** — `staleTime`/`gcTime`, retries, polling, refetch-on-focus, debouncing, `keepPreviousData`, `placeholderData`, and `select` transforms.
- **Optimistic mutations** — apply optimistic updates with automatic rollback on error, plus upload-progress reporting.
- **SSR-ready** — prefetch, dehydrate, and hydrate via the `/server` entry; safe in the Next.js App Router.
- **Devtools** — an optional cache inspector via the `/devtools` entry.
- **Typed and tree-shakeable** — first-class TypeScript types, ESM + CJS builds, no side effects.

## API

### Core (`@structyl/api-client`)

| Export | Description |
| --- | --- |
| `createApiClient(config)` | Creates an Axios-backed `ApiClient` with auth, refresh, and timeout handling. |
| `ApiClient` | The client class wrapping the configured Axios instance. |
| `ApiProvider` | Context provider that supplies the client and query cache to hooks. |
| `useApiClient()` / `useApiContext()` | Access the `ApiClient` / full context from within the provider. |
| `useApiQuery(key, urlOrFn?, options?)` | Fetch and cache data, with retries, polling, focus refetch, and `select`. |
| `useApiMutation(urlOrFn, options?)` | POST/PUT/PATCH/DELETE with cache invalidation and optimistic updates. |
| `useInfiniteApiQuery(...)` | Cursor/page-based infinite queries. |
| `useApiQueries(...)` | Run multiple queries in parallel. |
| `useSuspenseApiQuery(...)` | Suspense-enabled query with non-nullable data. |
| `usePrefetch()` | Imperatively warm the cache for a query. |
| `persistCache(queryClient, config)` | Persist and restore the cache to any storage backend. |
| `QueryClient` | The query cache instance used by the provider. |

### Server (`@structyl/api-client/server`)

| Export | Description |
| --- | --- |
| `prefetchApiQuery(queryClient, apiClient, keyOrUrl, urlOrFn?, options?)` | Prefetch a query on the server. |
| `dehydrate(queryClient)` / `hydrate(queryClient, state)` | Serialize/restore cache state for SSR. |
| `QueryClient` | Re-exported for server usage. |

### Devtools (`@structyl/api-client/devtools`)

| Export | Description |
| --- | --- |
| `ApiDevTools` | Floating cache inspector component for development. |

Exported types include `ApiError`, `ApiClientConfig`, `UseApiQueryOptions`, `UseApiMutationOptions`, `OptimisticConfig`, `ApiQueryResult`, `ApiMutationResult`, `QueryStatus`, `QueryClientConfig`, `UseInfiniteApiQueryOptions`, `InfiniteData`, `InfiniteApiQueryResult`, `ApiQueryConfig`, `SuspenseApiQueryResult`, `PersistenceConfig`, and `PersistenceStorage`.

## Part of structyl

Part of the [structyl](https://github.com/imirfanul/structyl) component library. Read the full docs at [structyl.dev](https://structyl.dev).

## License

MIT
