import type { AxiosInstance } from 'axios';
import { QueryClient } from './cache';
import type { CacheEntry } from './cache';
import type { ApiClient } from './client';

export interface DehydratedState {
  entries: Record<string, CacheEntry>;
}

export interface PrefetchApiQueryOptions {
  staleTime?: number;
}

/** Serialize successful cache entries for SSR hydration. */
export function dehydrate(queryClient: QueryClient): DehydratedState {
  return { entries: queryClient.cache.snapshot() };
}

/** Restore a dehydrated state into a QueryClient. */
export function hydrate(queryClient: QueryClient, state: DehydratedState): void {
  queryClient.cache.restore(state.entries);
}

/**
 * Prefetch a query on the server (Next.js App Router, Pages Router, Remix loaders).
 * After prefetching, call `dehydrate(queryClient)` and pass the result to
 * `<ApiProvider hydratedState={...}>` on the client to avoid a loading flicker.
 */
export async function prefetchApiQuery<TData = unknown>(
  queryClient: QueryClient,
  apiClient: ApiClient,
  keyOrUrl: string | unknown[],
  urlOrFn?: string | ((instance: AxiosInstance) => Promise<TData>),
  options?: PrefetchApiQueryOptions,
): Promise<void> {
  const queryKey = typeof keyOrUrl === 'string' ? [keyOrUrl] : keyOrUrl;

  const queryFn =
    typeof urlOrFn === 'function'
      ? () => urlOrFn(apiClient.instance)
      : typeof urlOrFn === 'string'
        ? () => apiClient.instance.get<TData>(urlOrFn).then((r) => r.data)
        : () => apiClient.instance.get<TData>(keyOrUrl as string).then((r) => r.data);

  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime: options?.staleTime ?? 60_000,
  });
}

// Re-exported so server files only need one import
export { QueryClient };
