import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';
import { serializeKey } from '../cache';
import type { CacheEntry } from '../cache';
import { useApiContext } from '../provider';
import type { ApiError, UseApiQueryOptions, ApiQueryResult, ApiQueryConfig } from '../types';
import { withRetry, toApiError } from '../utils';

export function useApiQueries<TData = unknown, TSelected = TData>(
  queries: ApiQueryConfig<TData, TSelected>[],
): ApiQueryResult<TSelected>[] {
  const { apiClient, queryClient } = useApiContext();

  // Serialize all keys
  const keys = queries.map((q) => serializeKey(q.key ?? [q.url]));
  const keysJoined = keys.join(',');

  // Stable snapshot reference to avoid spurious re-renders
  const prevSnapshotRef = useRef<(CacheEntry | undefined)[]>([]);

  // keepPreviousData: track last non-undefined data per slot index
  // Indexed by position (not cache key) so data persists when the key changes mid-load
  const previousDataRef = useRef<(TSelected | undefined)[]>([]);

  const getSnapshot = useCallback((): (CacheEntry | undefined)[] => {
    const next = keys.map((k) => queryClient.cache.get(k));
    if (
      next.length === prevSnapshotRef.current.length &&
      next.every((e, i) => e === prevSnapshotRef.current[i])
    ) {
      return prevSnapshotRef.current; // same references → no re-render
    }
    prevSnapshotRef.current = next;
    return next;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keysJoined, queryClient]);

  // Stable subscribe that covers all keys
  const subscribe = useCallback(
    (notify: () => void) => {
      const unsubs = keys.map((k) => queryClient.cache.subscribe(k, notify));
      return () => unsubs.forEach((u) => u());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [keysJoined, queryClient],
  );

  const entries = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  // Per-query fetch extracted so refetch() can call it directly with force=true
  const doFetchOne = useCallback(
    (query: ApiQueryConfig<TData, TSelected>, key: string, force = false) => {
      const opts = query.options;
      if (!force && !queryClient.cache.isStale(key)) return;
      if (queryClient.cache.getInFlight(key)) return;

      const retries = opts?.retry === false ? 0 : (opts?.retry ?? 1);
      const st = opts?.staleTime ?? 60_000;

      queryClient.cache.setLoading(key);
      const gen = queryClient.cache.bumpGeneration(key);

      const promise = withRetry(
        () => apiClient.instance.get(query.url).then((r) => r.data),
        retries,
      );
      queryClient.cache.setInFlight(key, promise);

      void promise
        .then((data) => {
          if (queryClient.cache.getGeneration(key) !== gen) return;
          queryClient.cache.setData(key, data, st);
        })
        .catch((err: unknown) => {
          if (queryClient.cache.getGeneration(key) !== gen) return;
          const apiError = toApiError(err);
          queryClient.cache.setError(key, apiError);
        });
    },
    [apiClient, queryClient],
  );

  // Fire individual fetches when keys change
  useEffect(() => {
    queries.forEach((query, i) => {
      if (query.options?.enabled === false) return;
      doFetchOne(query, keys[i]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keysJoined, queryClient, apiClient, doFetchOne]);

  return entries.map((entry, i) => {
    const query = queries[i];
    const opts = query?.options as UseApiQueryOptions<TData, TSelected> | undefined;
    const key = keys[i];

    const rawData = entry?.data as TData | undefined;
    let data: TSelected | undefined =
      opts?.select !== undefined && rawData !== undefined
        ? opts.select(rawData)
        : (rawData as unknown as TSelected | undefined);

    // placeholderData: show placeholder while loading and no data yet
    let isPlaceholderData = false;
    if (data === undefined && entry?.status === 'loading' && opts?.placeholderData !== undefined) {
      data = opts.placeholderData;
      isPlaceholderData = true;
    }

    // keepPreviousData: return last non-undefined data when data is undefined
    if (data !== undefined) {
      previousDataRef.current[i] = data;
    } else if (opts?.keepPreviousData && previousDataRef.current[i] !== undefined) {
      data = previousDataRef.current[i];
    }

    return {
      data,
      isLoading: entry?.status === 'loading' && entry?.data === undefined,
      isRefetching: entry?.status === 'loading' && entry?.data !== undefined,
      isFetching: entry?.status === 'loading',
      isPlaceholderData,
      isSuccess: entry?.status === 'success',
      isError: entry?.status === 'error',
      error: (entry?.error ?? null) as ApiError | null,
      status: entry?.status ?? 'idle',
      refetch: () => {
        if (!key || !query) return;
        doFetchOne(query, key, true);
      },
    };
  });
}
