# @structyl/api-client

A lightweight, framework-agnostic API calling wrapper built on top of **TanStack Query v5** and **Axios**. Works identically in React (Vite/CRA), Next.js App Router, Next.js Pages Router, Remix, Astro, and React Native — under 5 kb gzipped (peers are not bundled).

---

## Install

```bash
# pnpm (recommended)
pnpm add @structyl/api-client @tanstack/react-query axios

# npm
npm install @structyl/api-client @tanstack/react-query axios

# yarn
yarn add @structyl/api-client @tanstack/react-query axios
```

---

## 60-second Quick Start

```tsx
// 1. Create a client (once, at app root level)
import { createApiClient, ApiProvider, useApiQuery, useApiMutation } from '@structyl/api-client';

const api = createApiClient({
  baseURL: 'https://api.example.com',
  getAuthToken: () => localStorage.getItem('token'),
});

// 2. Wrap your app
export default function App() {
  return (
    <ApiProvider client={api}>
      <UserList />
    </ApiProvider>
  );
}

// 3. Query data
function UserList() {
  const { data, isLoading, error } = useApiQuery<User[]>('/users');
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <ul>{data?.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// 4. Mutate data
function CreateUser() {
  const { mutate, isPending } = useApiMutation<User, { name: string }>('/users', {
    method: 'POST',
    invalidates: [['/users']],
  });
  return (
    <button disabled={isPending} onClick={() => mutate({ name: 'Alice' })}>
      Create User
    </button>
  );
}
```

---

## API Reference

### `createApiClient(config)`

Creates a new `ApiClient` instance wrapping an Axios instance.

```ts
const api = createApiClient({
  baseURL: 'https://api.example.com',   // required
  headers: { 'X-App-Version': '1.0' }, // optional extra headers
  timeout: 15_000,                      // default: 10 000 ms
  getAuthToken: () => localStorage.getItem('token'), // optional, sync or async
});
```

| Option | Type | Default | Description |
|---|---|---|---|
| `baseURL` | `string` | — | Base URL for all requests |
| `headers` | `Record<string, string>` | `{}` | Additional default headers |
| `timeout` | `number` | `10000` | Request timeout in milliseconds |
| `getAuthToken` | `() => string \| null \| Promise<string \| null>` | — | Called before every request; result is attached as `Authorization: Bearer <token>` |

The returned `ApiClient` exposes its raw Axios instance at `.instance` for advanced usage.

---

### `<ApiProvider client queryClient?>`

SSR-safe React context provider. No "use client" directive — safe to render in any React tree.

```tsx
<ApiProvider
  client={api}
  queryClient={optionalQueryClient} // pass your own for SSR dehydration patterns
>
  {children}
</ApiProvider>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `client` | `ApiClient` | — | Required. The `ApiClient` from `createApiClient` |
| `queryClient` | `QueryClient` | auto-created | Provide your own for dehydration/hydration patterns |
| `children` | `ReactNode` | — | Your app tree |

**SSR behaviour:** When rendered on the server (`typeof window === 'undefined'`), a fresh `QueryClient` is created for every request. On the browser, a singleton is used.

---

### `useApiQuery(url, options?)`

#### Signature 1 — URL shorthand

```ts
const { data, isLoading, error, refetch } = useApiQuery<User[]>('/users');
```

The URL is used as both the query key and the fetch URL.

#### Signature 2 — Explicit key + URL or fetcher

```ts
// Explicit key + URL
const result = useApiQuery<User>(['user', userId], `/users/${userId}`);

// Explicit key + custom fetcher
const result = useApiQuery<User>(
  ['user', userId],
  (instance) => instance.get(`/users/${userId}`).then(r => r.data),
);
```

#### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `enabled` | `boolean` | `true` | Set to `false` to skip fetching |
| `staleTime` | `number` | `60000` | How long (ms) data is considered fresh |
| `gcTime` | `number` | TanStack default | Garbage collection time in ms |
| `retry` | `number \| boolean` | `1` | Number of retries on failure |
| `refetchOnWindowFocus` | `boolean` | `true` | Refetch when window regains focus |
| `pollInterval` | `number` | — | Polling interval in ms (`refetchInterval`) |
| `select` | `(data: TData) => TData` | — | Transform / select from the result |
| `queryOptions` | `Record<string, unknown>` | — | Escape hatch: pass any TanStack Query option |

Returns a full `UseQueryResult<TData, ApiError>`.

---

### `useApiMutation(urlOrFn, options?)`

```ts
const { mutate, mutateAsync, isPending, isError, error } =
  useApiMutation<ResponseType, VariablesType>('/users', {
    method: 'POST',
    onSuccess: (data, variables) => console.log('Created', data),
    onError: (error) => console.error(error.message),
    invalidates: [['/users']],
    optimistic: {
      queryKey: ['/users'],
      updater: (old, newUser) => [...(old ?? []), newUser],
    },
  });

mutate({ name: 'Bob' });
// or
await mutateAsync({ name: 'Bob' });
```

**Custom fetcher:**

```ts
const { mutate } = useApiMutation(
  (instance, variables: FormData) =>
    instance.post('/upload', variables, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(r => r.data),
);
```

#### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `method` | `'POST' \| 'PUT' \| 'PATCH' \| 'DELETE'` | `'POST'` | HTTP verb when using URL string |
| `onSuccess` | `(data, variables) => void \| Promise<void>` | — | Callback after a successful mutation |
| `onError` | `(error: ApiError) => void` | — | Callback on mutation failure |
| `invalidates` | `QueryKey[]` | — | Query keys to invalidate on success |
| `optimistic` | `OptimisticConfig<TData, TVariables>` | — | Optimistic update config (see below) |
| `mutationOptions` | `Record<string, unknown>` | — | Escape hatch: any TanStack mutation option |

#### Optimistic updates

```ts
optimistic: {
  queryKey: ['/users'],                  // cache key to update
  updater: (old, variables) => [...],    // receives current cache + mutation variables
}
```

On error, the previous cache value is automatically restored.

Returns a full `UseMutationResult<TData, ApiError, TVariables>`.

---

### `prefetchApiQuery(queryClient, apiClient, keyOrUrl, urlOrFn?, options?)`

Server-side prefetch utility. Import from `@structyl/api-client/server`.

```ts
import { prefetchApiQuery, QueryClient } from '@structyl/api-client/server';

const queryClient = new QueryClient();
const api = createApiClient({ baseURL: process.env.API_URL! });

await prefetchApiQuery(queryClient, api, '/users');
// or with a separate key
await prefetchApiQuery(queryClient, api, ['users', page], `/users?page=${page}`);
// or with a custom fetcher
await prefetchApiQuery(queryClient, api, ['users'], inst =>
  inst.get('/users').then(r => r.data),
);
```

| Parameter | Type | Description |
|---|---|---|
| `queryClient` | `QueryClient` | The server-side query client |
| `apiClient` | `ApiClient` | The API client to make requests with |
| `keyOrUrl` | `string \| QueryKey` | Query key (or URL used as key when no `urlOrFn`) |
| `urlOrFn` | `string \| ((inst) => Promise<TData>)` | Optional: URL string or custom fetcher |
| `options.staleTime` | `number` | Default: `60000` |

---

## Error Shape

All Axios errors are normalised into `ApiError`:

```ts
interface ApiError {
  status: number;   // HTTP status code; 0 = no response; -1 = request setup error
  message: string;  // Human-readable message
  data?: unknown;   // Raw response body (if available)
}
```

---

## Framework-Specific Setup

### React + Vite

```tsx
// main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createApiClient, ApiProvider } from '@structyl/api-client';
import App from './App';

const api = createApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  getAuthToken: () => localStorage.getItem('token'),
});

createRoot(document.getElementById('root')!).render(
  <ApiProvider client={api}>
    <App />
  </ApiProvider>,
);
```

---

### Next.js App Router

**Step 1 — Create a providers component (client component)**

```tsx
// app/providers.tsx
'use client';

import { createApiClient, ApiProvider } from '@structyl/api-client';

const api = createApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  getAuthToken: () =>
    typeof window !== 'undefined' ? localStorage.getItem('token') : null,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApiProvider client={api}>{children}</ApiProvider>;
}
```

**Step 2 — Add to root layout**

```tsx
// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

**Step 3 — Server prefetch in RSC pages**

```tsx
// app/todos/page.tsx  (Server Component)
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { createApiClient } from '@structyl/api-client';
import { prefetchApiQuery, QueryClient } from '@structyl/api-client/server';
import { TodoList } from './TodoList';

export default async function Page() {
  const queryClient = new QueryClient();
  const api = createApiClient({ baseURL: process.env.API_URL! });
  await prefetchApiQuery(queryClient, api, '/todos');

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TodoList />
    </HydrationBoundary>
  );
}
```

```tsx
// app/todos/TodoList.tsx  (Client Component)
'use client';
import { useApiQuery } from '@structyl/api-client';

export function TodoList() {
  const { data, isLoading } = useApiQuery<Todo[]>('/todos');
  if (isLoading) return <p>Loading...</p>;
  return <ul>{data?.map(t => <li key={t.id}>{t.title}</li>)}</ul>;
}
```

---

### Next.js Pages Router

```tsx
// pages/index.tsx
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { createApiClient } from '@structyl/api-client';
import { prefetchApiQuery } from '@structyl/api-client/server';
import { useApiQuery } from '@structyl/api-client';
import type { GetServerSideProps } from 'next';

function Todos() {
  const { data, isLoading } = useApiQuery<Todo[]>('/todos');
  if (isLoading) return <p>Loading...</p>;
  return <ul>{data?.map(t => <li key={t.id}>{t.title}</li>)}</ul>;
}

export default function Page({ dehydratedState }: { dehydratedState: unknown }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Todos />
    </HydrationBoundary>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  const api = createApiClient({ baseURL: 'https://api.example.com' });
  await prefetchApiQuery(queryClient, api, '/todos');
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
```

Wrap `_app.tsx` with `ApiProvider` (same pattern as the Pages Router `_app.tsx` wrapping TanStack's `QueryClientProvider`):

```tsx
// pages/_app.tsx
import { createApiClient, ApiProvider } from '@structyl/api-client';

const api = createApiClient({ baseURL: process.env.NEXT_PUBLIC_API_URL! });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApiProvider client={api}>
      <Component {...pageProps} />
    </ApiProvider>
  );
}
```

---

### Remix

```tsx
// app/root.tsx — wrap the app with ApiProvider
import { createApiClient, ApiProvider } from '@structyl/api-client';

const api = createApiClient({ baseURL: process.env.API_URL! });

export default function App() {
  return (
    <ApiProvider client={api}>
      <Outlet />
    </ApiProvider>
  );
}
```

```tsx
// app/routes/todos.tsx — prefetch in loader
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { createApiClient } from '@structyl/api-client';
import { prefetchApiQuery } from '@structyl/api-client/server';
import { useApiQuery } from '@structyl/api-client';

export async function loader() {
  const queryClient = new QueryClient();
  const api = createApiClient({ baseURL: 'https://api.example.com' });
  await prefetchApiQuery(queryClient, api, '/todos');
  return json({ dehydratedState: dehydrate(queryClient) });
}

function Todos() {
  const { data, isLoading } = useApiQuery<Todo[]>('/todos');
  if (isLoading) return <p>Loading...</p>;
  return <ul>{data?.map(t => <li key={t.id}>{t.title}</li>)}</ul>;
}

export default function TodosPage() {
  const { dehydratedState } = useLoaderData<typeof loader>();
  return (
    <HydrationBoundary state={dehydratedState}>
      <Todos />
    </HydrationBoundary>
  );
}
```

---

### React Native / Expo

```tsx
// App.tsx
import { createApiClient, ApiProvider } from '@structyl/api-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = createApiClient({
  baseURL: 'https://api.example.com',
  getAuthToken: () => AsyncStorage.getItem('token'),
});

export default function App() {
  return (
    <ApiProvider client={api}>
      <NavigationContainer>
        {/* your screens */}
      </NavigationContainer>
    </ApiProvider>
  );
}
```

No server-side utilities are needed for React Native — the client singleton is used automatically.

---

## Migrating from Raw Axios

### Before (raw Axios)

```ts
// auth.ts — manual token injection
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// useUsers.ts — manual loading state, no caching
const [data, setData] = useState<User[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  setIsLoading(true);
  axios.get('/users')
    .then(r => setData(r.data))
    .catch(e => setError(e.message))
    .finally(() => setIsLoading(false));
}, []);

// createUser.ts — manual invalidation, no optimistic updates
const create = async (name: string) => {
  await axios.post('/users', { name });
  // manually refetch...
};
```

### After (@structyl/api-client)

```ts
// client.ts — one-time setup
export const api = createApiClient({
  baseURL: 'https://api.example.com',
  getAuthToken: () => localStorage.getItem('token'), // auto-injected
});

// useUsers.ts — automatic caching, deduplication, background refresh
const { data, isLoading, error } = useApiQuery<User[]>('/users');

// createUser.ts — invalidation, optimistic updates, typed errors
const { mutate } = useApiMutation<User, { name: string }>('/users', {
  method: 'POST',
  invalidates: [['/users']],        // auto-invalidates on success
  optimistic: {
    queryKey: ['/users'],
    updater: (old, newUser) => [...(old ?? []), newUser],
  },
});
```

---

## TypeScript

All types are exported from the main entry point:

```ts
import type {
  ApiError,
  ApiClientConfig,
  ApiProviderProps,
  UseApiQueryOptions,
  UseApiMutationOptions,
  OptimisticConfig,
  ApiQueryResult,
  ApiMutationResult,
} from '@structyl/api-client';
```

---

## Bundle Size

All peer dependencies (`react`, `axios`, `@tanstack/react-query`) are externalized and not bundled. The package itself is under 5 kb gzipped.

---

## License

MIT
