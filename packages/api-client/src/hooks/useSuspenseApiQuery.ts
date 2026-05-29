import { useSyncExternalStore } from 'react';
import { serializeKey } from '../cache';
import { useApiContext } from '../provider';
import type { UseApiQueryOptions, SuspenseApiQueryResult } from '../types';
import { withRetry, toApiError } from '../utils';

export function useSuspenseApiQuery<TData = unknown>(
  url: string,
  options?: Pick<UseApiQueryOptions<TData>, 'staleTime' | 'retry'>,
): SuspenseApiQueryResult<TData> {
  const { apiClient, queryClient } = useApiContext();

  const serializedKey = serializeKey([url]);
  const retries = options?.retry === false ? 0 : (options?.retry ?? 1);
  const staleTime = options?.staleTime ?? 60_000;

  const entry = useSyncExternalStore(
    (notify) => queryClient.cache.subscribe(serializedKey, notify),
    () => queryClient.cache.get<TData>(serializedKey),
    () => queryClient.cache.get<TData>(serializedKey),
  );

  if (!entry || entry.status === 'loading' || (entry.status === 'idle' && !entry.data)) {
    // Check for existing in-flight promise
    const existing = queryClient.cache.getInFlight(serializedKey);
    if (existing) {
      throw existing; // Suspense re-catches
    }

    // Start a new fetch synchronously (render-time, not useEffect)
    const gen = queryClient.cache.bumpGeneration(serializedKey);
    queryClient.cache.setLoading(serializedKey);

    const p = withRetry(
      () => apiClient.instance.get<TData>(url).then((r) => r.data),
      retries,
    )
      .then((data) => {
        if (queryClient.cache.getGeneration(serializedKey) === gen) {
          queryClient.cache.setData(serializedKey, data, staleTime);
        }
      })
      .catch((err: unknown) => {
        if (queryClient.cache.getGeneration(serializedKey) === gen) {
          const apiError = toApiError(err);
          queryClient.cache.setError(serializedKey, apiError);
          throw apiError;
        }
      });

    queryClient.cache.setInFlight(serializedKey, p);
    throw p; // Suspense catches this
  }

  if (entry.status === 'error') {
    throw entry.error; // ErrorBoundary catches this
  }

  // entry.status === 'success' at this point
  // Background re-fetch: does NOT throw a new Promise (no Suspense on re-fetch)
  const refetch = () => {
    queryClient.cache.clearInFlight(serializedKey);
    const gen = queryClient.cache.bumpGeneration(serializedKey);

    const p = withRetry(
      () => apiClient.instance.get<TData>(url).then((r) => r.data),
      retries,
    )
      .then((data) => {
        if (queryClient.cache.getGeneration(serializedKey) === gen) {
          queryClient.cache.setData(serializedKey, data, staleTime);
        }
      })
      .catch((err: unknown) => {
        if (queryClient.cache.getGeneration(serializedKey) === gen) {
          queryClient.cache.setError(serializedKey, toApiError(err));
        }
      });

    queryClient.cache.setInFlight(serializedKey, p);
  };

  return {
    data: entry.data as TData,
    isFetching: false,
    isRefetching: false,
    isSuccess: true,
    refetch,
  };
}
